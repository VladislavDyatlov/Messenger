import { SearchUsers } from "@/model/types"
import { Flex, Img, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface ParticleProps{
    particle: Array<SearchUsers>;
    removeParticle: (userId: string) => void;
}

export const Particle: React.FC<ParticleProps> = ({particle, removeParticle}) =>{
    return(
        <Flex mt={8} gap="10px" flexWrap="wrap">
            {particle?.map((par) =>(
                <Stack direction="row" align="center" bg="whiteAlpha.200" p="2" borderRadius={4}>
                    <Text>{par.username}</Text>
                    <Img src="https://cdn-icons-png.flaticon.com/512/58/58253.png" width="16px" height="16px" onClick={() => removeParticle(par.id)} />
                </Stack>
            ))}
        </Flex>
    )
}