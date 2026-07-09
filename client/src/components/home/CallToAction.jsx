import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div id='cta' className='border-y border-dashed border-slate-800 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-28'>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-800 py-16 sm:py-20 -mt-10 -mb-10 w-full">
                <p className="text-2xl font-semibold max-w-md text-white tracking-tight">Build a Professional Resume That Helps You Stand Out and Get Hired</p>
                <Link to='/app' className="flex items-center gap-2 rounded-full py-3 px-8 bg-emerald-500 hover:bg-emerald-400 transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-500/25 text-slate-950 font-semibold shrink-0">
                    <span>Get Started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
            </div>
        </div>
  )
}

export default CallToAction