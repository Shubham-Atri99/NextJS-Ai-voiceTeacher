import { subjectsColors } from '@/constants'
import { getCompanionById } from '@/lib/actions/companions.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import CompanionSection from '@/components/CompanionSection'

interface CompanionSessionPageProps {
  params: { id: string }   // ✅ not a Promise
}

const Companion = async ({ params }: CompanionSessionPageProps) => {
  
  const { id } = params   // ✅ no await needed
  const companion = await getCompanionById(id)
  const{ name, subject, title, duration, topic }=companion;

  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }
  if (!name) {
    redirect('/companions')
  }

  const color = subjectsColors[subject] || "#E5E7EB" // ✅ use subject for lookup

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: color }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={48}
              height={48}
              className="rounded"
            />
          </div>
          <div className=' flex flex-col  gap-2'>
            <div className='flex items-center gap-2'>
              <p className='   font-bold text-2xl '>
                {name}
              </p>
            </div>
            <div className=' subject-badge max-sm:hidden'>
              {subject}
            </div>
            <p className=' text-lg'>{topic}</p>
          </div>
        </div>
      </article>
      <CompanionSection 
      {...companion}
      companionId={id}
      username={user.firstName}
      useImage={user.imageUrl}/>
    </main>
  )
}

export default Companion
