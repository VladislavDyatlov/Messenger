import { Session } from "next-auth"
import React from "react";
import { Header } from "../Header/Header"
import { Converstation } from "./converstation/converstation"
import {FeedWork}  from "./feed/feed";
import { Flex } from "@chakra-ui/react";

interface ChatProps {
    session: Session;
}

export const Chat: React.FC<ChatProps> = ({session}) =>{
    return(
        <>
        <Header />
        <div>
        <Flex height="100vh">
            <div><Converstation session={session} /></div>
            <div><FeedWork session={session} /></div>   
        </Flex>           
        </div>    
        </>
    )
}