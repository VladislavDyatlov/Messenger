import { Inter } from 'next/font/google'
import {getSession, signIn, signOut, useSession} from 'next-auth/react'
import { NextPageContext } from 'next'
import { Chat } from '../component/Chat/Chat'
import {Auth} from '../component/Auth/Auth'
import { Session } from 'next-auth'

export default function Home() {

  const {data} = useSession()
  const reloadSession = () =>{
    const event = new Event("visibilitychange")
    document.dispatchEvent(event)
  }

  return (
    <div>
      {data?.user?.username ? <Chat session={data} /> : <Auth session={data} reloadSession={reloadSession}/>}
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  return{
    props:{
      session,
    }
  }
}
