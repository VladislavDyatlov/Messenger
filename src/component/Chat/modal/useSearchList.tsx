import { SearchUsers } from "@/model/types";
import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";

interface UserSearchProps{
    users: Array<SearchUsers>; 
    addParticle: (user: SearchUsers) => void;  
}

const UserSearch: React.FC<UserSearchProps> = ({users, addParticle}) =>{
    console.log(users)
    return(
        <>
            { users.length === 0 ?(
                <>
                <Flex mt={6} justify="center">
                    <Text>No users found</Text>
                </Flex>
                </>
            ):(
                <Stack mt={4}>
                    {users?.map((user) =>(
                        <Stack direction="row" align="center" spacing={4} py={2} px={4} borderRadius={4} _hover={{bg: "whiteAlpha.200"}}>
                            <Avatar />
                            <Flex justify="space-between" align="center" width="100%">
                                <Text color="white">{user.username}</Text>
                                <Button bg="brand.100" _hover={{bg: "brand.200"}} color="black" onClick={() => addParticle(user)}>Select</Button>
                            </Flex>
                        </Stack>
                    ))}
                </Stack>
            )}
        </>
    )
}

export default UserSearch;