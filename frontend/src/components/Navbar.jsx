import React from 'react'
import { userAuthSore } from '../store/userAuthStore'
import { Link } from 'react-router-dom'
import { LogOut,  Settings, User } from 'lucide-react'


function Navbar() {
  const {logout, authUser} =userAuthSore()
  return (
   <header
   className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg items-center gap-8'
   >
    <div className='container mx-auto px-4 h-16'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex items-center gap-8'>
          <Link to='/' className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
          <div className='size-9 rounded-lg primary/10 flex items-center justify-center'>
            {/* <MessageSquare className='w-5 h-5 text-primary'/>
             */}
             <img className=" size-8" src={'mess.png'} alt="" />
          </div>
          <h1 className='text-lg font-bold text-green-400'>Talksy</h1>
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          <Link 
          to={'/settings'}
          className= {`btn btn-sm gap-2 transition-colors`}
          >
            <Settings className='w-4 h-4' />
            <span className='hidden sm:inline'>settings</span>
          </Link>
          {
            authUser &&(
              <>
              <Link to={'/profile'} className='btn btn-sm gap-2'>
                <User className='size-5' />
                <span className='hidden sm:inline'>profile</span>
              </Link>
              <Link 
              to={'/login'}>
              <button
               className='flex gap-2 items-center'onClick={logout}>
                
                <LogOut className='size-5' />
                <span className='hidden sm:inline'>Logout</span>
              </button>
              </Link>
              </>
            )
          }
        </div>
      </div>

    </div>

   </header>
  )
}

export default Navbar