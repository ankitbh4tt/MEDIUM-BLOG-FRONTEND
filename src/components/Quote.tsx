import React from 'react'

const Quote = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='font-semibold text-3xl'>
         "BREAK THE BORING: YOUR EASY, CRAZY, TECH-MAGIC BLOG JOURNEY STARTS HERE!"
      </div>
      <div className='flex  justify-end' >
        <div>
          <div className='font-bold'>
            ~ SomeoneYouKnow
          </div>
          <div className='pl-20 text-xs text-slate-500'>
            Dev,Koderr
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quote
