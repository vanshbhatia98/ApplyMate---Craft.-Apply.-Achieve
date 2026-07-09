import { GraduationCap, Plus, PlusIcon, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({data, onChange}) => {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduaion_date: "",
            gpa: ""
        };
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

  return (
    <div className='space-y-6'>
        <div>
            <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-white'> Education </h3>
                <p className='text-sm text-slate-400'>Add your education details</p>
            </div>
            <button onClick={addEducation} className='flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors'>
                <Plus className='size-4'/>
                Add Education
            </button>
        </div>
        </div>

        {data.length === 0 ? (
            <div className='text-center py-10 text-slate-500 border border-dashed border-slate-700 rounded-xl'>
                <GraduationCap className='w-10 h-10 mx-auto mb-3 text-slate-600' />
                <p className='text-slate-400'>No education added yet.</p>
                <p className='text-sm mt-0.5'>Click "Add Education" to get started.</p>
            </div>
        ): (
            <div className='space-y-4'>
                {data.map((education, index) => (
                    <div key={index} className='p-4 border border-slate-800 rounded-xl space-y-3 bg-slate-800/30 hover:border-slate-700 transition-colors'>
                        <div className='flex justify-between items-start'>
                            <h4 className='text-sm font-semibold text-slate-200'>Education #{index + 1}</h4>
                            <button onClick={()=> removeEducation(index)} className='text-slate-500 hover:text-red-400 transition-colors'>
                                <Trash2 className='size-4'/>
                            </button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-3'>
                            <input value={education.institution || ""} onChange={(e)=>updateEducation(index, "institution", e.target.value)} type="text" placeholder='Institution Name' className='px-3 py-2 text-sm'/>
                            <input value={education.degree || ""} onChange={(e)=>updateEducation(index, "degree", e.target.value)} type="text" placeholder="Degree (e.g., Bachelor's, Master's)" className='px-3 py-2 text-sm'/>
                            <input value={education.field || ""} onChange={(e)=>updateEducation(index, "field", e.target.value)} type="text" className='px-3 py-2 text-sm' placeholder="Field of Study"/>
                            <input value={education.graduaion_date || ""} onChange={(e)=>updateEducation(index, "graduaion_date", e.target.value)} type="month" className='px-3 py-2 text-sm'/>
                        </div>
                        <input value={education.gpa || ""} onChange={(e)=>updateEducation(index, "gpa", e.target.value)} type="text" className='px-3 py-2 text-sm' placeholder='GPA (optional)'/>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default EducationForm
