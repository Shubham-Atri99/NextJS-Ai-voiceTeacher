import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">start learning your way</div>
      <h2 className=' text-3xl  font-bold'>Build and Personalize learning companion and learn effectively</h2>
      <p>pick a name subject voice and personality-and start learning throught voice conversation that feels natural and fun</p>
      <Image src="images/cta.svg" alt="CTA Image" width={362} height={232}  />
      <button className="btn-primary">
        <Image src="/icons/plus.svg" alt="Plus Icon" width={12} height={12} />
        <Link href="/companions/new" >
        <p>build new companion</p>
        </Link>
      </button>
    </section>
  )
}

export default CTA