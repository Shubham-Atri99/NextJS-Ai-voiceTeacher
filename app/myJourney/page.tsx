import React from 'react'
import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { currentUser } from '@clerk/nextjs/server'
import { getrecentSessions, getuserCompanions } from '@/lib/actions/companions.action'
import CompanionList from '@/components/CompanionList'

const profilePage = async() => {

const user = await currentUser();
  const sessioncompelted = await getrecentSessions();
const companionCreated=await getuserCompanions(user?.id!);
const recentSessionsRaw = await getrecentSessions(10);

  // flatten so it's Session[]
  const recentSessions = recentSessionsRaw.flat();
  

  return (
   <main className="lg:w-3/4 w-full mx-auto p-4">
  <section className="flex justify-between items-center max-sm:flex-col max-sm:items-start gap-6">
    
    {/* Avatar */}
    <Image 
      src={user?.imageUrl || "/default-avatar.png"} 
      alt={user?.firstName || "User"} 
      width={100} 
      height={100} 
      className="rounded-full border shadow-sm"
    />
    
    {/* User Info */}
    <div className="flex-1">
      <h1 className="text-3xl font-bold">
        {user?.firstName} {user?.lastName}
      </h1>
      <p className="text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
    </div>
    
    {/* Stats */}
    <div className="flex gap-6">
  {/* Lessons Completed */}
  <div className="flex flex-col items-center px-6 py-4 border border-gray-300 rounded-2xl shadow-sm bg-white w-48">
    <div className="flex items-center gap-2 mb-2">
      <Image src="/icons/check.svg" alt="checkmark" width={22} height={22} />
      <span className="text-sm font-medium text-gray-600">Completed</span>
    </div>
    <div className="text-2xl font-bold text-gray-800">{sessioncompelted.length}</div>
    <div className="text-sm text-gray-500">Lessons Completed</div>
  </div>

  {/* Companions Created */}
  <div className="flex flex-col items-center px-6 py-4 border border-gray-300 rounded-2xl shadow-sm bg-white w-48">
    <div className="flex items-center gap-2 mb-2">
      <Image src="/icons/cap.svg" alt="graduation cap" width={22} height={22} />
      <span className="text-sm font-medium text-gray-600">Created</span>
    </div>
    <div className="text-2xl font-bold text-gray-800">{companionCreated.length}</div>
    <div className="text-sm text-gray-500">Companions Created</div>
  </div>
</div>

    
  </section>


    <Accordion type="multiple" >
  <AccordionItem value="recent">
    <AccordionTrigger className=' text-2xl font-bold'>Recent Sessions</AccordionTrigger>
    <AccordionContent>
      <CompanionList title='Recent Session' companions={recentSessions}/>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="recent">
    <AccordionTrigger className=' text-2xl font-bold'>Companions created</AccordionTrigger>
    <AccordionContent>
      <CompanionList title='Recent Session' companions={companionCreated}/>
    </AccordionContent>
  </AccordionItem>
</Accordion>
   </main>
  )
}

export default profilePage