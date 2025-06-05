import React from 'react'
import {useChatStore} from '../store/useChatStore.js'
// import { Sidebar } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'  
import NoChatSelected from '../components/NoChatSelected'

function HomePage() {
  const {selectedUser} =useChatStore()
  return (
    <div className='h-screen bg-base-300'>
      <div className='flex items-center justify-center pt-20 px-4'>
       <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">

          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar/>
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}


          </div>

        </div>
      </div>

    </div>
  )
}

export default HomePage