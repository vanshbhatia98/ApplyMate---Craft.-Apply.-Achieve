import { Briefcase, Loader2, Plus, Sparkle, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import api from '../configs/api'

const ExperienceForm = ({data, onChange}) => {

    const { token } = useSelector(state => state.auth)
    const [generatingIndex, setGeneratingIndex] = useState(-1)

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };
        onChange([...data, newExperience])
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

    const generateDescription = async (index) => {
        setGeneratingIndex(index)
        const experience = data[index]
        const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`

        try {
            const { data } = await api.post('/api/ai/enhance-job-desc', {userContent: prompt}, { headers: {Authorization: token}})
            updateExperience(index, "description", data.enhancedContent)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setGeneratingIndex(-1)
        }
    }

  return (
    <div className='space-y-6'>
        <div>
            <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-white'> Professional Experience </h3>
                <p className='text-sm text-slate-400'>Add your job experience</p>
            </div>
            <button onClick={addExperience} className='flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors'>
                <Plus className='size-4'/>
                Add Experience
            </button>
        </div>
        </div>

        {data.length === 0 ? (
            <div className='text-center py-10 text-slate-500 border border-dashed border-slate-700 rounded-xl'>
                <Briefcase className='w-10 h-10 mx-auto mb-3 text-slate-600' />
                <p className='text-slate-400'>No work experience added yet.</p>
                <p className='text-sm mt-0.5'>Click "Add Experience" to get started.</p>
            </div>
        ): (
            <div className='space-y-4'>
                {data.map((experience, index) => (
                    <div key={index} className='p-4 border border-slate-800 rounded-xl space-y-3 bg-slate-800/30 hover:border-slate-700 transition-colors'>
                        <div className='flex justify-between items-start'>
                            <h4 className='text-sm font-semibold text-slate-200'>Experience #{index + 1}</h4>
                            <button onClick={()=> removeExperience(index)} className='text-slate-500 hover:text-red-400 transition-colors'>
                                <Trash2 className='size-4'/>
                            </button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-3'>
                            <input value={experience.company || ""} onChange={(e)=>updateExperience(index, "company", e.target.value)} type="text" placeholder='Company Name' className='px-3 py-2 text-sm'/>
                            <input value={experience.position || ""} onChange={(e)=>updateExperience(index, "position", e.target.value)} type="text" placeholder='Job Title' className='px-3 py-2 text-sm'/>
                            <input value={experience.start_date || ""} onChange={(e)=>updateExperience(index, "start_date", e.target.value)} type="month" className='px-3 py-2 text-sm'/>
                            <input value={experience.end_date || ""} onChange={(e)=>updateExperience(index, "end_date", e.target.value)} type="month" disabled = {experience.is_current} className='px-3 py-2 text-sm disabled:opacity-50'/>
                        </div>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" checked={experience.is_current  || false} onChange={(e) => {updateExperience(index, "is_current", e.target.checked ? true : false); }} className='rounded border-slate-600 text-emerald-500 focus:ring-emerald-500'/>
                            <span className='text-sm text-slate-400'>Currently working here</span>
                        </label>
                        <div className='space-y-2' >
                            <div className='flex items-center justify-between'>
                                <label className='text-sm font-medium text-slate-400'>Job Description</label>
                                <button onClick={()=> generateDescription(index)} disabled={generatingIndex === index || !experience.position || !experience.company} className='flex items-center gap-1 px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-md hover:bg-purple-500/20 transition-colors disabled:opacity-50'>
                                    {generatingIndex === index ? (
                                        <Loader2 className='w-3 h-3 animate-spin'/>
                                    ): (<Sparkles className='w-3 h-3'/>)}
                                    Enhance with AI
                                </button>
                            </div>
                            <textarea value={experience.description || ""} onChange={(e)=> updateExperience(index, "description", e.target.value)} rows={4} className='w-full text-sm px-3 py-2' placeholder='Describe your key responsibilities and achievements...'/>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ExperienceForm