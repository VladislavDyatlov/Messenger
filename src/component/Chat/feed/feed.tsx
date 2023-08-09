import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth"
import { useRouter } from "next/router";
import React from "react";

interface FeedProps{
    session: Session;
}

export const FeedWork: React.FC<FeedProps> = ({session}) =>{
    const router = useRouter();

    const {converstationId} = router.query
    return(
        <Flex        
        display={{ base: converstationId ? "flex" : "none", md: "flex" }}
        direction="column"
        width="100%">
        {converstationId ? <Flex>
            {converstationId}
        </Flex> :
         <div>No converstation Selected</div>}
        </Flex>
    )
}