import Companionform from '@/components/Companionform'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'
import React from 'react'


const newCompanion = async() => {
  const {userId}=await auth();
  if(!userId){
    redirect('/sign-in')
  }
  return (
   <main className=' items-center justify-center min-lg:w-1/3 min-md:w-2/3'> 
    <article className='  w-full flex flex-col gap-4'>
      <h1>Companion Builder</h1>

      <Companionform/>
    </article>
   </main>
  )
}

export default newCompanion