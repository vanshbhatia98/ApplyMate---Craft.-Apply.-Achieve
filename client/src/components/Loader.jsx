import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-slate-950'>
        <div className='size-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin'></div>
    </div>
  )
}

export default Loader