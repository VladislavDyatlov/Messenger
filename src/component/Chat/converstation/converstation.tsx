import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import { ConverstationList } from "./converstationList";
import ConverstationOperation from '../../../../graphql/operations/converstation'
import { useQuery } from "@apollo/client";

interface ConverstationProps{
    session: Session;
}

export const Converstation: React.FC<ConverstationProps> = ({session}) =>{
    
    const {data: converstationData, error: converstationError, loading: converstationLoading, subscribeToMore} = useQuery(ConverstationOperation.Queries.converstation)

    const subscribeToNewConversations = () => {
        subscribeToMore({
          document: ConverstationOperation.Subscriptions.convertstationCreated,
          updateQuery: (
            prev,
            { subscriptionData }
          ) => {
            if (!subscriptionData.data) return prev;

            console.log("cc", subscriptionData);
    
            const newConversation = subscriptionData.data.conversationCreated;
    
            return Object.assign({}, prev, {
              conversations: [newConversation, ...prev.conversations],
            });
          },
        });
      };

      console.log('aa', converstationData)

    useEffect(() =>{
        subscribeToNewConversations();
    }, [])

    return(
        <Box width={{ base: "100%", md: "400px" }} height={{ base: "100%", md: "100vh"}} bg="blackAlpha.50" py={6} px={3}>
            <ConverstationList session={session} converstations={converstationData?.converstation} />
        </Box>
    )
}