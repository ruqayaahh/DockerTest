import * as React from "react";
import {
  Box,
  Flex,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import LentOut from "./LentOut";
import Library from "./Library";
import Read from "./Read";
import ToRead from "./ToRead";
import type { Library as LibraryType } from "./Library";
import { fetchLibrary } from "../apis/requests";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = React.useState(true);
  const [library, setLibrary] = React.useState<LibraryType | null>(null);
  const [refetch, setRefetch] = React.useState(false);
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const { user_id } = useParams();

  const fetchLibraryFunc = async () => {
    const fetchedLibrary = await fetchLibrary(user_id);
    setLibrary(fetchedLibrary);
    setLoading(false);
  };
  React.useEffect(() => {
    fetchLibraryFunc();
    setFirstname(localStorage.getItem("fname"));
    setLastname(localStorage.getItem("lname"));
  }, []);
  React.useEffect(() => {
    if (refetch) {
      fetchLibraryFunc();
      setRefetch(false);
    }
  }, [refetch]);

  return (
    <Box ml="100px" mt="100px" mr="100px">
      <Flex justifyContent="space-between" alignItems="center">
        <Text color="teal" fontWeight="bold" fontSize="36px">
          Dashboard
        </Text>
        <Text color="teal" fontWeight="medium" fontSize="24px">
          {firstname} {lastname}
        </Text>
      </Flex>

      {loading ? (
        <Spinner
          size="xl"
          color="teal"
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
        />
      ) : (
        <>
          <Tabs size="md" variant="enclosed">
            <TabList>
              <Tab>In Custody</Tab>
              <Tab>Lent Out</Tab>
              <Tab>Read</Tab>
              <Tab>To Read</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {library && (
                  <Library
                    library={library}
                    userId={user_id}
                    setRefetch={setRefetch}
                  />
                )}
              </TabPanel>
              <TabPanel>
                <LentOut />
              </TabPanel>
              <TabPanel>
                <Read />
              </TabPanel>
              <TabPanel>
                <ToRead />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </Box>
  );
}
