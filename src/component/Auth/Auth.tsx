import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { Header } from "../Header/Header";
import UserOperations from '../../../graphql/operations/user'
import { CreateUsernameData, CreateUsernameVariables } from "@/model/types";
import toast from 'react-hot-toast';

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}


export const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");
  const [createUsername, {data, loading, error}] = useMutation<CreateUsernameData, CreateUsernameVariables>(UserOperations.Mutations.createUsername)
  console.log(data, loading, error)

  const onSumbit = async () =>{
    if(!username) return;


    try{
      const {data} = await createUsername({variables: {username}})

      if(!data?.createUsername){
        throw new Error();
      }
  
      if(data.createUsername.error){
        const {createUsername: {error}} = data;
        throw new Error(error)
      }

      toast.success("Username successfully created")
  
      reloadSession()
    } catch(err: any){
        toast.error(err?.message)
    }
  }

  return (
    <>
    <Header />
    <Center height="100vh">
      <Stack spacing={8} align="center">
        {session?.user ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
            />
            <Button width="100%" onClick={onSumbit} isLoading={loading}>
                Save
            </Button>
          </>
        ) : (
          <>
            <Image height={100} src="https://logos-download.com/wp-content/uploads/2016/09/Facebook_Messenger_logo_gradient.png" />
            <Text fontSize="4xl">MessengerQL</Text>
            <Text width="70%" align="center">
              Sign in with Google to send unlimited free messages to your
              friends
            </Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={<Image height="20px" src="https://agro-sfera.com/wp-content/uploads/2021/04/google.png" />}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>   
    </>
  );
};