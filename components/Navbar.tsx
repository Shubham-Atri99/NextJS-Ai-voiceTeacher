import React from 'react'
import Link from 'next/link'
import NavItems from './NavItems'
import { Button } from './ui/button'
const Navbar = () => {
  return (
    <nav className=' navbar'>
        <Link href="/">
        <div className='  flex items-center  gap-2.5  cursor-pointer'>
            <img src="/images/logo.svg" alt="Logo" className='w-8 h-8' />
            <span className='text-xl font-bold'>SaaS App</span>
        </div>
        </Link>
        <div className=' items-center flex  gap-8'>
          <NavItems/>
          <Link href={"/sign-in"} className='text-gray-700 hover:text-black font-medium transition-colors cursor-pointer'>
          <Button className=' cursor-pointer'> sign-in</Button>
          </Link>

        </div>
    </nav>
  )
}

export default Navbar