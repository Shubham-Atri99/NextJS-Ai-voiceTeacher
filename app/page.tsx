import Companioncard from '@/components/Companioncard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { getallCompanions, getrecentSessions } from '@/lib/actions/companions.action'
import React from 'react'

const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
};

const Page = async () => {
  const companions = await getallCompanions({ limit: 3, page: 1 });
  const recentSessionsRaw = await getrecentSessions(10);

  // flatten so it's Session[]
  const recentSessions = recentSessionsRaw.flat();

  return (
    <main>
      <h1 className='text-2xl underline'>Popular companions</h1>
      <section className='home-section'>
        {companions?.map((companion: any) => (
          <Companioncard
            key={companion.id}
            {...companion}
            color={subjectsColors[companion.subject] || "#E5E7EB"}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionList
          title="recently completed session"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
}

export default Page;
