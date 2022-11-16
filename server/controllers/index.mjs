import {
  createUser,
  deleteBook,
  fetchLibrary,
  lendBookOut,
  login,
  markAsRead,
  saveBook,
} from "../queries/index.mjs";

const createNewUser = async (req, res, next) => {
  try {
    // destructure needed data
    const { firstname, lastname, email, password } = req.body;
    const userData = { firstname, lastname, email, password };
    // declare an array to store invalid keys
    const isNotDefined = [];
    // iterate through keys to check for and push undefineds into isNotDefined
    for (const key in userData) {
      if (!userData[key]) isNotDefined.push(key);
    }
    // if any key is undefined, throw error
    if (isNotDefined.length) {
      let invalids = "";
      isNotDefined.forEach((key) => (invalids += " " + key));
      return next({
        log: "Error caught in createUser middleware",
        status: 400,
        message: { err: `Invalid inputs: ${invalids}` },
      });
    }
    // make query to db with the values
    const user = await createUser([firstname, lastname, email, password]);
    // save returned result to res.locals.user
    res.locals.user = user.rows[0];
    // move on to the next middleware
    return next();
  } catch (error) {
    console.log(error);
    return next({
      log: "Error occured in createNewUser middleware",
      status: 400,
      message: "Will tell you soon. createNewUser",
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    // destructure needed data
    const { email, password } = req.body;
    const userData = { email, password };
    // declare an array to store invalid keys
    const isNotDefined = [];
    // iterate through keys to check for and push undefineds into isNotDefined
    for (const key in userData) {
      if (!userData[key]) isNotDefined.push(key);
    }
    // if any key is undefined, throw error
    if (isNotDefined.length) {
      let invalids = "";
      isNotDefined.forEach((key) => (invalids += " " + key));
      return next({
        log: "Error caught in loginUser middleware",
        status: 400,
        message: { err: `Invalid inputs: ${invalids}` },
      });
    }
    // make query to db with the values
    const user = await login([email, password]);
    // save returned result to res.locals.user
    res.locals.user = user[0];
    // move on to the next middleware
    return next();
  } catch (error) {
    console.log(error);
    return next({
      log: "Error occured in loginUser middleware",
      status: 400,
      message: "Will tell you soon. loginUser",
    });
  }
};

const saveNewBook = async (req, res, next) => {
  try {
    // destructure needed data
    const { title, author, in_custody, is_read } = req.body;
    const { user_id } = req.params;
    // make a new object for book data with them
    const bookData = { title, author, user_id, in_custody, is_read };
    // declare an array to store invalid keys
    const isNotDefined = [];
    // iterate through keys to check for and push undefineds into isNotDefined
    for (const key in bookData) {
      if (bookData[key] === "") isNotDefined.push(key);
    }
    // if any key is undefined, throw error
    if (isNotDefined.length) {
      let invalids = "";
      isNotDefined.forEach((key) => (invalids += " " + key));
      return next({
        log: "Error caught in saveNewBook middleware",
        status: 400,
        message: { err: `Invalid inputs: ${invalids}` },
      });
    }
    // make query to db with the values
    const book = await saveBook([title, author, user_id, in_custody, is_read]);
    // save returned result to res.locals.book
    res.locals.book = book.rows[0];
    // move on to the next middleware
    return next();
  } catch (error) {
    console.log(error, "book");
    return next({
      log: "Error occured in saveNewBook middleware",
      status: 400,
      message: `Will tell you soon. saveNewBook, ${error}`,
    });
  }
};

const fetchUserLibrary = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    if (!user_id)
      return next({
        log: "Error occured in fetchUserLibrary middleware",
        status: 400,
        message: "Request params not found.",
      });
    const allBooks = await fetchLibrary([user_id]);
    res.locals.library = allBooks;
    return next();
  } catch (error) {
    return next({
      log: "Error occured in fetchUserLibrary middleware",
      status: 400,
      message: "Will tell you soon fetchUserLibrary.",
    });
  }
};

const deleteUserBook = async (req, res, next) => {
  console.log(req.params.user_id, req.params.book_id, "params");
  try {
    const { book_id, user_id } = req.params;
    if (!book_id || !user_id)
      return next({
        log: "Error occured in deleteUserBook middleware",
        status: 400,
        message: "Request params not found.",
      });
    const deletedBook = await deleteBook([book_id, user_id]);
    console.log(deletedBook, "deletedBook");
    res.locals.deletedBook = deletedBook;
    return next();
  } catch (error) {
    return next({
      log: "Error occured in deleteUserBook middleware",
      status: 400,
      message: "Will tell you soon deleteUserBook.",
    });
  }
};

const lendUserBook = async (req, res, next) => {
  try {
    // {lent_to: 'Erin', returning: '2022-11-03T20:44'}lent_to: "Erin"returning: "2022-11-03T20:44"[[Prototype]]: Object

    const { book_id, user_id } = req.params;
    const { in_custody, lent_to, date_of_return } = req.body;
    if (!book_id || !user_id)
      return next({
        log: "Error occured in lendUserBook middleware",
        status: 400,
        message: "Request params not found.",
      });
    if (typeof in_custody !== "boolean" || !lent_to || !date_of_return)
      return next({
        log: "Error occured in lendUserBook middleware",
        status: 400,
        message: "Request body data incomplete.",
      });
    const lentBook = await lendBookOut([
      book_id,
      user_id,
      in_custody,
      lent_to,
      date_of_return,
    ]);
    res.locals.lentBook = lentBook[0];
    return next();
  } catch (error) {
    console.log(error, "lendUserBook");
    return next({
      log: "Error occured in lendUserBook middleware",
      status: 400,
      message: "Will tell you soon lendUserBook.",
    });
  }
};

const markBookAsRead = async (req, res, next) => {
  try {
    // {review: 'Loved it!', is_read: true}

    const { book_id, user_id } = req.params;
    const { review, is_read } = req.body;
    if (!book_id || !user_id)
      return next({
        log: "Error occured in markBookAsRead middleware",
        status: 400,
        message: "Request params not found.",
      });
    if (typeof is_read !== "boolean" || !review)
      return next({
        log: "Error occured in markBookAsRead middleware",
        status: 400,
        message: "Request body data incomplete.",
      });
    const readBook = await markAsRead([book_id, user_id, review, is_read]);
    res.locals.readBook = readBook[0];
    return next();
  } catch (error) {
    return next({
      log: "Error occured in markBookAsRead middleware",
      status: 400,
      message: "Will tell you soon markBookAsRead.",
    });
  }
};

export {
  createNewUser,
  deleteUserBook,
  fetchUserLibrary,
  lendUserBook,
  loginUser,
  markBookAsRead,
  saveNewBook,
};
