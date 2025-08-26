import Companioncard from '@/components/Companioncard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1 className='  text-2xl underline'>Popular companions</h1>
      <section className=' home-section'>
        <Companioncard 
        id="1"
        name="Companion 1"
        topic="Topic 1"
        subject="Subject 1"
        duration={30}
        color=" #BBF7D0"
        />
         <Companioncard 
        id="2"
        name="Companion 2"
        topic="Topic 2"
        subject="Subject 2"
        duration={30}
        color="#ffda6e"
        />
         <Companioncard 
        id="3"
        name="Companion 3"
        topic="Topic 3"
        subject="Subject 3"
        duration={30}
        color="#E9D5FF"
        />
        
         </section>
         <section className="home-section">
          <CompanionList 
          title="recently completed session"
          companions={recentSessions}
             classNames="w-2/3 max-lg:w-full"/>
          <CTA/>
         </section>
    </main>
  )
}

export default Page