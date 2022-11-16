import express from "express";
import {
  deleteUserBook,
  fetchUserLibrary,
  lendUserBook,
  markBookAsRead,
  saveNewBook,
} from "../controllers/index.mjs";
const router = express.Router();

// save new book
router.post("/:user_id/library", saveNewBook, (req, res) => {
  return res.status(200).json(res.locals.book);
});

// fetch books user has in custody
router.get("/:user_id/library", fetchUserLibrary, (req, res) => {
  return res.status(200).json({ books: res.locals.library });
});

// delete a selected book
router.delete("/:user_id/library/:book_id", deleteUserBook, (req, res) =>
  res.status(200).json(res.locals.deletedBook)
);

//lend out selected book: in_custody/not
router.patch("/:user_id/library/:book_id/lend", lendUserBook, (req, res) =>
  res.status(200).json(res.locals.lentBook)
);

//mark selected book as read
router.patch("/:user_id/library/:book_id/read", markBookAsRead, (req, res) =>
  res.status(200).json({ library: res.locals.readBook })
);

export default router;
