import { db } from "../models/dashboardModels.mjs";

const createUser = async (userInfoArr) => {
  try {
    // if all keys are defined, save into db and save returned row into res.locals.user
    const createdUser = await db.query(
      "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      userInfoArr
    );
    return createdUser;
  } catch (error) {
    console.log(error, "error in createUser queries");
  }
};

const login = async (userInfoArr) => {
  try {
    // if all keys are defined, save into db and save returned row into res.locals.user
    const loggedInUser = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      userInfoArr
    );
    return loggedInUser.rows;
  } catch (error) {
    console.log(error, "error in login queries");
  }
};

const saveBook = async (bookInfoArr) => {
  try {
    // if all keys are defined, save into db and save returned row into res.locals.book
    const savedBook = await db.query(
      "INSERT INTO books (title, author, user_id, in_custody, is_read) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      bookInfoArr
    );
    return savedBook;
  } catch (error) {
    console.log(error, "error in saveBook queries");
  }
};

const fetchLibrary = async (userIdArr) => {
  try {
    // fetch all books in bd
    const fetchedBooks = await db.query(
      "SELECT * FROM books WHERE books.user_id = $1",
      userIdArr
    );
    console.log(fetchedBooks, "fetchedBooks");
    return fetchedBooks.rows;
  } catch (error) {
    console.log(error, "error in fetchLibrary queries");
  }
};

const deleteBook = async (bookInfoArr) => {
  try {
    // delete book of user
    //bookInfoArr = [book_id, user_id]
    //e.g DELETE FROM books WHERE _id = 23 AND user_id = 11 RETURNING *
    const deletedBook = await db.query(
      "DELETE FROM books WHERE _id = $1 AND user_id = $2 RETURNING *",
      bookInfoArr
    );
    return deletedBook.rows;
  } catch (error) {
    console.log(error, "error in deleteBook queries");
  }
};

const lendBookOut = async (bookInfoArr) => {
  try {
    // bookInfoArr = [book_id, user_id, in_custody, lent_to, returning]
    const lentBook = await db.query(
      "UPDATE books SET in_custody = $3, lent_to = $4, date_of_return = $5 WHERE _id = $1 AND user_id = $2 RETURNING *",
      bookInfoArr
    );
    return lentBook.rows;
  } catch (error) {
    console.log(error, "error in lendBookOut queries");
  }
};

const markAsRead = async (bookInfoArr) => {
  try {
    // bookInfoArr = [book_id, user_id, review, is_read]
    const lentBook = await db.query(
      "UPDATE books SET is_read = $4, review = $3 WHERE _id = $1 AND user_id = $2 RETURNING *",
      bookInfoArr
    );
    return lentBook.rows;
  } catch (error) {
    console.log(error, "error in markAsRead queries");
  }
};

export {
  createUser,
  deleteBook,
  fetchLibrary,
  lendBookOut,
  login,
  markAsRead,
  saveBook,
};
