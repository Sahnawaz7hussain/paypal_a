import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { getAllUsers, switchRole } from "../../utils/requests";
import Loading from "../../components/Loading";

const UsersContainer = () => {
  const [allUsers, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    setAllUser([]);
    getAllUsers()
      .then((res) => {
        setError(false);
        setIsLoading(false);
        setAllUser(res.data.users);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
        setAllUser([]);
      });
  }, [reload]);

  const handleOnClickSwitchRole = (id, role) => {
    const updateData = {
      role: role === "admin" ? "user" : "admin",
    };

    switchRole(id, updateData)
      .then((res) => {
        setReload((pre) => !pre);
      })
      .catch((err) => {
        setReload((pre) => !pre);
      });

    //console.log(updateData, "upate data");
  };
  // console.log("usrss ; ", allUsers);
  return (
    <Box border={"0px solid teal"}>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : error ? (
        <Text color={"red"}>Error</Text>
      ) : (
        <>
          <Box>
            <TableContainer>
              <Table
                minW="720px"
                variant="striped"
                colorScheme={useColorModeValue("teal", "green")}
              >
                <Thead bgColor={"rgb(4,15,57)"} color="white">
                  <Tr>
                    <Th color="white">Name</Th>
                    <Th color="white">Email</Th>
                    <Th color="white">Role</Th>
                    <Th color="white">Update Role</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {allUsers.map((user, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.role}</Td>
                        <Td>
                          <Button
                            onClick={() =>
                              handleOnClickSwitchRole(user._id, user.role)
                            }
                            minW="140px"
                            maxW="140px"
                          >
                            {user.role == "admin" ? "Make User" : "Make Admin"}
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UsersContainer;
