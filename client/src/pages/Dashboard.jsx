import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, Upload, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../configs/api';
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

  const {user, token} = useSelector(state => state.auth)

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');//using this we can edit the title of resume

  const [ isLoading, setIsLoading ] = useState(false)
  const navigate = useNavigate()

  const loadAllResumes = async () =>{
    try {
      const { data } = await api.get('/api/users/resumes', {headers: {
        Authorization: token
      }})
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async(event) => {
    try {
      event.preventDefault()
      const {data} = await api.post('/api/resumes/create', {title}, {headers: {
        Authorization: token}})
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      // navigate(`/app/builder/${data.resume._id}`)
      if (data?.resume?._id) {
        navigate(`/app/builder/${data.resume._id}`)
      } else {
        toast.error("Resume ID not received")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async(event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      if(!resumeText || !resumeText.trim()){
        toast.error('Could not read any text from this PDF. It may be a scanned/image-based file — try a different one.')
        return
      }
      const { data } = await api.post('/api/ai/upload-resume', {title, resumeText}, {headers: {
        Authorization: token
      }})
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const editTitle = async(event) => {
    try {
      event.preventDefault(); 
      const {data} = await api.put(`/api/resumes/update`,{resumeId: editResumeId, resumeData: {title}} , {headers: {
        Authorization: token
      }})
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? {...resume, title} : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async(resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
    if(confirm){
      const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers: {
        Authorization: token
      }})
      setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
      toast.success(data.message)
    }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes();
  }, [])

  return (
    <div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
          <div className='mb-6 sm:hidden'>
            <p className='text-2xl font-semibold tracking-tight text-white'>Welcome back{user?.name ? `, ${user.name}` : ''}</p>
            <p className='text-sm text-slate-400 mt-1'>Manage and create your resumes</p>
          </div>
          <div className='hidden sm:block mb-6'>
            <p className='text-2xl font-semibold tracking-tight text-white'>Your Resumes</p>
            <p className='text-sm text-slate-400 mt-1'>Create a new resume or continue where you left off</p>
          </div>
          <div className='flex gap-4'>
            <button onClick={() => setShowCreateResume(true)} className='w-full bg-slate-900 sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-2xl gap-3 text-slate-400 border border-dashed border-slate-700 group hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-900/30 transition-all duration-300 cursor-pointer'>
              <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-full shadow-md shadow-indigo-900/40 group-hover:scale-105'/>
              <p className='text-sm font-medium group-hover:text-indigo-400 transition-all duration-300'>Create Resume</p>
            </button>
            <button onClick={() => setShowUploadResume(true)} className='w-full bg-slate-900 sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-2xl gap-3 text-slate-400 border border-dashed border-slate-700 group hover:border-purple-500 hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-300 cursor-pointer'>
              <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-full shadow-md shadow-purple-900/40 group-hover:scale-105'/>
              <p className='text-sm font-medium group-hover:text-purple-400 transition-all duration-300'>Upload Existing</p>
            </button>
          </div>

          <hr className='border-slate-800 my-8 sm:w-[305px]'/>
          {/* in this div we have to display the data in grid layout */}
          <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
            {allResumes?.map((resume, index) =>{
              const baseColor = colors[index % colors.length];
              return(
                <button onClick={()=>navigate(`/app/builder/${resume._id}`)} key={index} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-2xl gap-2 border group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer' style={{background:`linear-gradient(135deg, ${baseColor}26, ${baseColor}4d)`, borderColor: baseColor + '4d'}}>
                  <FilePenLineIcon className="size-7 group-hover:scale-105 transition-all" style={{color:baseColor}}/>
                  <p className='text-sm font-medium group-hover:scale-105 transition-all px-2 text-center' style={{color: baseColor}}>{resume.title}</p>
                  <p className='absolute bottom-2 text-[11px] text-slate-300 group-hover:text-white transition-all duration-300 px-2 text-center'>
                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div onClick={e => e.stopPropagation()} className='absolute top-1.5 right-1.5 group-hover:flex items-center hidden gap-0.5'>
                    <TrashIcon onClick={() => deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-slate-950/60 rounded-lg text-slate-100 transition-colors"/>
                    <PencilIcon onClick={() => {setEditResumeId(resume._id); setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-slate-950/60 rounded-lg text-slate-100 transition-colors"/>
                  </div>
                </button>
              )
            })}
          </div>

          {
            showCreateResume && (
              <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center p-4'>
                <div onClick={e => e.stopPropagation()} className='relative bg-slate-900 border border-slate-800 shadow-2xl shadow-black/40 rounded-2xl w-full max-w-sm p-6 animate-scale-in'>
                  <h2 className='text-xl font-semibold text-white mb-4'>Create a Resume</h2>
                  <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2.5 mb-4' required/>
                  <button className='w-full py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors'>Create Resume</button>
                  <XIcon className='absolute top-4 right-4 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors' onClick={()=>{setShowCreateResume(false), setTitle('')}}/>
                </div>
              </form>
            )
          }

          {showUploadResume && (
            <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center p-4'>
                <div onClick={e => e.stopPropagation()} className='relative bg-slate-900 border border-slate-800 shadow-2xl shadow-black/40 rounded-2xl w-full max-w-sm p-6 animate-scale-in'>
                  <h2 className='text-xl font-semibold text-white mb-4'>Upload Resume</h2>
                  <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2.5 mb-4' required/>
                  <div>
                    <label htmlFor="resume-input" className='block text-sm text-slate-300'>
                      Select resume file
                      <div className='flex flex-col items-center justify-center gap-2 border group text-slate-500 border-slate-700 border-dashed rounded-xl p-4 py-10 my-4 hover:border-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/5 cursor-pointer transition-colors'>
                        {resume ? (
                          <p className='text-emerald-400 font-medium'>{resume.name}</p>
                        ) : (
                          <>
                            <UploadCloud className='size-14 stroke-1'/>
                            <p>Upload resume</p>
                          </>
                        )}
                      </div>
                    </label>
                    <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e)=>setResume(e.target.files[0])}/>
                  </div>
                  <button disabled = {isLoading} className='w-full py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60'>
                    {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
                    {isLoading ? 'Uploading...' : 'Upload Resume'}</button>
                  <XIcon className='absolute top-4 right-4 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors' onClick={()=>{setShowUploadResume(false), setTitle('')}}/>
                </div>
              </form>
          )
          }

          {editResumeId && (
              <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center p-4'>
                <div onClick={e => e.stopPropagation()} className='relative bg-slate-900 border border-slate-800 shadow-2xl shadow-black/40 rounded-2xl w-full max-w-sm p-6 animate-scale-in'>
                  <h2 className='text-xl font-semibold text-white mb-4'>Edit Resume Title</h2>
                  <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2.5 mb-4' required/>
                  <button className='w-full py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors'>Update</button>
                  <XIcon className='absolute top-4 right-4 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors' onClick={()=>{setEditResumeId(''), setTitle('')}}/>
                </div>
              </form>
            )
          }
        </div>
    </div>
  )
}

export default Dashboard;