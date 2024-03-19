import React from 'react'
import Link from 'next/link'

function line() {
  return (
    <>
    <div className="myline">
    <Link href='/line'>    <img src="/img/line.png" className='bounce' alt="line" /></Link>
    </div>
      
    </>
  )
}

export default line
