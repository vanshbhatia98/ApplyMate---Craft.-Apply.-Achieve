import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview';
import Loader from '../components/Loader';
import { ArrowLeftIcon } from 'lucide-react';
import api from '../configs/api';

const Preview = () => {
  const { resumeId } = useParams();
  
  const [isLoading, setIsLoading] = useState(true)
  const [ resumeData, setResumeData ] = useState(null)

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/public/' + resumeId)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResume()
  }, [])
  return resumeData ? (
    <div className='bg-slate-950 min-h-screen'>
        <div className='max-w-3xl mx-auto py-10 px-4'>
          <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes='py-4 bg-white shadow-2xl shadow-black/50 rounded-lg'/>
        </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Loader /> : (
        <div className='flex flex-col items-center justify-center h-screen bg-slate-950 px-4 text-center'>
          <p className='text-6xl text-slate-700 font-semibold'>404</p>
          <p className='text-xl text-slate-400 font-medium mt-2'>Resume not found</p>
          <a href="/" className='mt-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full px-6 h-10 shadow-lg shadow-emerald-500/25 flex items-center transition-all font-semibold'>
            <ArrowLeftIcon className='mr-2 size-4'/>Go to home page
          </a>
        </div>
    )}
    </div>
  )
}

export default Preview