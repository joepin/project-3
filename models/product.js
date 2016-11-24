const db   = require('../db/db.js');
const auth = require('../lib/auth.js');

function getAllProducts (req, res, next) {
  const query = `SELECT * FROM post;`;

  db.any(query)
  .then((data) => res.rows = data)
  .then(() => next())
  .catch(err => next(err));
}

function getOneProduct (req, res, next) {
  const prod_id = req.params.id;

  const query = `SELECT * FROM post WHERE post_id = $1;`;
  const values = [prod_id];

  db.oneOrNone(query, values)
  .then((data) => res.rows = data)
  .then(() => next())
  .catch(err => next(err));
}

// createProduct is a middleware function that does many things: it gets the product info that the user submitted,
// inserts that into the post table, gets a post_id from that insert, inserts into the cross ref table, generates
// a base file name for uploaded images based on these values, and finally inserts the images into the db.
// TODO: split this into smaller functions
function createProduct (req, res, next) {
  // get fields
  const title = req.body.title;
  const description = req.body.description;
  const token = req.headers['token_authorization'] || req.body.token || req.params.token || req.query.token;
  let user_id = null;
  // get the user id from the token
  auth.getUserData(token)
  .then((user) => {
    user_id = user.data.user_id;
  })
  .then(() => {
    // we have the user id; we're ready to build and execute queries
    // first query is to the post table which will return the new post's id
    const queryOne = `
      INSERT INTO post
        (title, description, user_id)
      VALUES
        ($1, $2, $3)
      RETURNING post_id;
    `;

    // second query is to the user post cross ref table
    const queryTwo = `
      INSERT INTO user_post_ref
        (user_id, post_id)
      VALUES
        ($3, $4)
      ;
    `;

    // values originally has all the fields the user inputted, without the post id
    const values = [
      title,
      description,
      user_id,
    ];

    // execute the first query with the fields the user inputted
    db.one(queryOne, values)
    .then((inserted) => {
      // when successful, we'll get an object that has just the post id in it
      // store it as the last value in the values array
      values.push(parseInt(inserted.post_id));
      // execute the second query now that we have the post id
      db.none(queryTwo, values)
      .then(() => next())
      .catch(err => next(err));
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
}

function editProduct (req, res, next) {
  const prod_id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;

  const query = `UPDATE post SET title = $2, description = $3 WHERE post_id = $1 RETURNING *;`;
  const values = [
    prod_id,
    title,
    description,
  ];

  db.one(query, values)
  .then((data) => res.rows = data || 'yup')
  .then(() => next())
  .catch(err => next(err));
}

function deleteProduct (req, res, next) {
  const post_id = req.params.id;

  const query = `DELETE FROM user_post_ref WHERE post_id = $1; DELETE FROM post WHERE post_id = $1;`;
  const values = [post_id];

  db.none(query, values)
  .then(() => res.rows = 'Succesfully Deleted')
  .then(() => next())
  .catch(err => next(err));
}

function preparePicturesForUpload (req, res, next) {
  const file = req.body.testImage;
  console.log(file);
  console.log(req.body);
  next();
}

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  editProduct,
  deleteProduct,
  preparePicturesForUpload,
}
