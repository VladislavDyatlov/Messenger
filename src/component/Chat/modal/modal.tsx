import { CreateConverstationData, CreateConverstationInput, SearchUsers, SearchUsersData, SearchUsersInput } from '@/model/types';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Stack,
    Input,
    Button
  } from '@chakra-ui/react'
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import UserOperations from "../../../../graphql/operations/user"
import ConverstationOperations from "../../../../graphql/operations/converstation"
import { Particle } from './particle';
import UserSearch from './useSearchList';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';

  interface ModalProps{
    session: Session;
    isOpen: boolean;
    onClose: () => void;
  }

  export const Modals: React.FC<ModalProps> = ({isOpen, onClose, session}) => {
    const router = useRouter();
    const {user: {id: userId}} = session;
    const [username, setUsername] = useState("");
    const [searchUsers, {data, loading, error}] = useLazyQuery<SearchUsersData, SearchUsersInput>(UserOperations.Queries.createUsers)
    const [createConverstation, {loading: converstation}] = useMutation<CreateConverstationData, CreateConverstationInput>(ConverstationOperations.Mutations.createConverstation) 
    const [particle, setParticle] = useState<Array<SearchUsers>>([])

    const unSumbit = async (e: React.FormEvent) =>{
        e.preventDefault();
        searchUsers({variables: {username}})
    }

    const addParticle = (user: SearchUsers) =>{
      setParticle(prev => [...prev, user])
    }

    const removeParticle = (userId: string) =>{
      setParticle(prev => prev.filter(p => p.id !== userId))
    }

    const CreateConverstation = async () =>{
      const particleIds = [userId, ...particle.map(p => p.id)]
      try{
        const {data} = await createConverstation({
          variables:{
            particleIds
          }
        })

        if(!data?.createConverstation){
          throw new Error('Failed to create converterstation');
        }

        const {createConverstation : {converstationId}} = data;
        console.log(data)

        router.push({query: {converstationId}});

        setParticle([]);
        setUsername('');
        onClose();

      } catch(e: any){
        console.log(e?.message)
        toast.error(e?.message)
      }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="#2d2d2d" color="white">
            <ModalHeader>Create converstation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={unSumbit}>
                <Stack spacing={4}>
                    <Input placeholder="Enter a username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Button type="submit" disabled={!username} color="black" bg="lightgray" isLoading={loading}>
                        Search
                    </Button>
                </Stack>
              </form>
              {data?.searchUsers && <UserSearch users={data?.searchUsers} addParticle={addParticle} />}
              {particle?.length !== 0 && <Particle particle={particle} removeParticle={removeParticle} />} 
              <Button bg="rgb(20, 81, 212)" width="100%" mt={6} _hover={{bg: "brand.100"}} isLoading={converstation} onClick={CreateConverstation}>Create converstation</Button>
            </ModalBody>
          </ModalContent>       
        </Modal>
    )
  }