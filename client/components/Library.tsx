import * as React from "react";
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spacer,
  Table,
  Textarea,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  deleteBook,
  lendOutBook,
  markBookAsRead,
  saveNewBook,
} from "../apis/requests";

type Book = {
  _id: number;
  title: string;
  author: string;
  edition?: string;
  in_custody: boolean;
  is_read?: boolean;
  category?: string;
  review?: string;
  user_id: number;
  photo?: string;
};

export type Library = {
  books: Book[];
};
type LibraryPropsType = {
  library: Library;
  userId: string;
  setRefetch: Function;
};

export default function Library({
  library: { books },
  userId,
  setRefetch,
}: LibraryPropsType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newBookData, setNewBookData] = React.useState({
    title: "",
    author: "",
  });
  const [lentBookData, setLentBookData] = React.useState({
    lent_to: "",
    date_of_return: "",
  });
  const [readBookData, setReadBookData] = React.useState({
    review: "",
  });
  const [readModal, setReadModal] = React.useState(false);
  const [lendModal, setLendModal] = React.useState(false);
  const [bookId, setBookId] = React.useState(null);

  const disabled = () => {
    if (lendModal) return !lentBookData.lent_to || !lentBookData.date_of_return;
    else if (readModal) return !readBookData.review;
    else return !newBookData.title || !newBookData.author;
  };

  const handleOnChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (lendModal) setLentBookData({ ...lentBookData, [name]: value });
    else if (readModal) setReadBookData({ ...readBookData, [name]: value });
    else setNewBookData({ ...newBookData, [name]: value });
  };

  const handleLendModal = (id: number | string) => {
    //set book id
    setBookId(id);
    //set lendModal to true so that modal opens with lendmodal content
    setLendModal(true);
    //set readModal to false
    setReadModal(false);
    //open the modal
    onOpen();
  };
  const handleReadModal = (id: number | string) => {
    //set book id
    setBookId(id);
    //set readModal to true so that modal opens with lendmodal content
    setReadModal(true);
    //set lendModal to false
    setLendModal(false);
    //open the modal
    onOpen();
  };

  const handleSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (lendModal) {
        const payload = { ...lentBookData, in_custody: false };
        const params = { user_id: userId, book_id: bookId };
        const result = await lendOutBook(params, payload);
        setRefetch(true);
        setLentBookData({
          lent_to: "",
          date_of_return: "",
        });
        setLendModal(false);
        onClose();
      } else if (readModal) {
        const payload = { ...readBookData, is_read: true };
        const params = { user_id: userId, book_id: bookId };
        const result = await markBookAsRead(params, payload);
        setRefetch(true);
        setReadBookData({
          review: "",
        });
        setReadModal(false);
        onClose();
      } else {
        const payload = { ...newBookData, is_read: false, in_custody: true };
        const result = await saveNewBook(userId, payload);
        setRefetch(true);
        setNewBookData({
          title: "",
          author: "",
        });
        onClose();
      }
      setLendModal(false);
      setReadModal(false);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      const params = { user_id: userId, book_id: id };
      const result = await deleteBook(params);
      setRefetch(true);
      setBookId(null);
    } catch (error) {
      console.log(error, "handledelete");
    }
  };
  return (
    <div>
      {books?.length > 0 ? (
        <>
          <Flex justifyContent="flex-end" mb="10px">
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="outline"
              onClick={onOpen}
            >
              Add a book to your library
            </Button>
          </Flex>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Book title</Th>
                  <Th>Author</Th>
                  <Th>In Custody</Th>
                  <Th>Read</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {books?.map((book, index: number) => (
                  <Tr key={index}>
                    <Td>{book.title}</Td>
                    <Td>{book.author}</Td>
                    <Td>
                      {book.in_custody ? (
                        <Flex alignItems="center">
                          <Text fontSize="md" mr={5}>
                            Yes
                          </Text>
                          <Button
                            size="sm"
                            colorScheme="teal"
                            variant="outline"
                            onClick={() => handleLendModal(book._id)}
                          >
                            Lend Out
                          </Button>
                        </Flex>
                      ) : (
                        <Text fontSize="md">No</Text>
                      )}
                    </Td>
                    <Td>
                      {book.is_read ? (
                        <Text fontSize="md">Yes</Text>
                      ) : (
                        <Flex alignItems="center">
                          <Text fontSize="md" mr={5}>
                            No
                          </Text>
                          <Button
                            size="sm"
                            colorScheme="teal"
                            variant="outline"
                            onClick={() => handleReadModal(book._id)}
                          >
                            Mark as Read
                          </Button>
                        </Flex>
                      )}
                    </Td>
                    <Td>
                      <DeleteIcon
                        onClick={() => handleDelete(book._id)}
                      ></DeleteIcon>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Book title</Th>
                  <Th>Author</Th>
                  <Th>In Custody</Th>
                  <Th>Read</Th>
                  <Th>Action</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
          onClick={onOpen}
        >
          Add a book to your library
        </Button>
      )}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {lendModal ? (
              <Text color="teal">
                Fill out name of rentee and return date for this book
              </Text>
            ) : null}
            {readModal ? (
              <Text color="teal">Drop your thoughts on the Book</Text>
            ) : null}
            {!lendModal && !readModal ? (
              <Text color="teal">
                Add a new Book to your personal online library
              </Text>
            ) : null}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              {lendModal ? (
                <>
                  <FormLabel>Lending to...</FormLabel>
                  <Input
                    placeholder="Name"
                    name="lent_to"
                    value={lentBookData.lent_to}
                    onChange={(e) => handleOnChange(e)}
                  />
                </>
              ) : null}
              {readModal ? (
                <>
                  <FormLabel>Review Time!</FormLabel>
                  <Textarea
                    placeholder="Share your thoughts..."
                    name="review"
                    value={readBookData.review}
                    onChange={(e) => handleOnChange(e)}
                  />
                </>
              ) : null}
              {!lendModal && !readModal ? (
                <>
                  <FormLabel>Book Title</FormLabel>
                  <Input
                    placeholder="Title"
                    name="title"
                    value={newBookData.title}
                    onChange={(e) => handleOnChange(e)}
                  />
                </>
              ) : null}
            </FormControl>

            <FormControl mt={4}>
              {lendModal ? (
                <>
                  <FormLabel>Return Date</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    type="datetime-local"
                    name="date_of_return"
                    value={lentBookData.date_of_return}
                    onChange={(e) => handleOnChange(e)}
                  />
                </>
              ) : null}
              {!lendModal && !readModal ? (
                <>
                  <FormLabel>Author</FormLabel>
                  <Input
                    placeholder="Author"
                    name="author"
                    value={newBookData.author}
                    onChange={(e) => handleOnChange(e)}
                  />
                </>
              ) : null}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup variant="outline" spacing="6">
              <Button
                colorScheme="teal"
                isDisabled={disabled()}
                onClick={(e) => handleSave(e)}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
