import Companioncard from '@/components/Companioncard';
import Searchinput from '@/components/Searchinput';
import Subjectfilter from '@/components/Subjectfilter';
import { getallCompanions } from '@/lib/actions/companions.action';
import React from 'react';


const subjectColors: Record<string, string> = {
  Math: "#FDE68A",       
  Science: "#A7F3D0",   
  History: "#BFDBFE",    
  English: "#FBCFE8",    
  Geography: "#DDD6FE",  
  default: "#E5E7EB"     
};

interface SearchParams {
  searchParams: {
    subject?: string;
    topic?: string;
  };
}

const companionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject || "";
  const topic = filters.topic || "";

  const companions = await getallCompanions({ subject, topic });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1 className="text-2xl font-bold">Companion Library</h1>
        <div className="flex gap-4">
          <Searchinput />
          <Subjectfilter />
        </div>
      </section>

      <section className="companions-grid mt-6">
        {companions?.map((companion) => (
          <Companioncard
            key={companion.id}
            {...companion}
            color={subjectColors[companion.subject] || subjectColors.default}
          />
        ))}
      </section>
      
    </main>
  );
};

export default companionsLibrary;
