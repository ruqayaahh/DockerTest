import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

type Props = {};

export default function LentOut({}: Props) {
  const library = [
    {
      _id: 1,
      name: "Testing",
      author: "Testing",
      edition: "Testing",
      in_custody: true,
      is_read: true,
      category: "Testing",
      review: "Testing",
      user_id: 1,
      photo: "Testing",
    },
  ];
  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Lent to</Th>
              <Th>Return Date</Th>
              <Th>In Custody</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Muna</Td>
              <Td>2022-11-03 20:44:00+00</Td>
              <Td>No</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Lent to</Th>
              <Th>Return Date</Th>
              <Th>In Custody</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}
