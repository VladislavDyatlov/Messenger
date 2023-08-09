import { Box, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth"
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { Modals } from "../modal/modal";
import {ConversationPopulated} from '../../../../../backend/src/util/types'

interface ConverstationListProps{
    session: Session;
    converstations: Array<ConversationPopulated>;
}

export const ConverstationList:React.FC<ConverstationListProps> = ({session, converstations}) =>{
    const [isOpen, setIsOpen] = useState(false);
    
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    
    const convert = converstations?.map((conv) => conv.participants)   
    const conv = convert?.map((convs) => convs?.map( conv => conv?.user))
    const maps = conv.map((conv) => conv?.map((cont) => cont.username));


    return(
        <Box>
            <Box py={2} px={4} mb={4} bg="blackAlpha.300" borderRadius={4} cursor="pointer" onClick={onOpen}>
                <Text textAlign="center" color="white" fontWeight={500}>Find or start a converstation</Text>
            </Box>
            <Modals session={session} isOpen={isOpen} onClose={onClose} />
            {maps?.map((convert) => (
                <Stack p={4} _hover={{bg: "whiteAlpha.200"}} borderRadius={4}>
                    <Text>{convert}</Text>
                </Stack>
            ))}
        </Box>
    )
}