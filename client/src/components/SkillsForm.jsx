import { Plus, X, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

const SkillsForm = ({data, onChange}) => {
    const [newSill, setNewSkill] = useState("");

    const addSkill = () => {
        if(newSill.trim() && !data.includes(newSill.trim())){
            onChange([...data, newSill.trim()]);
            setNewSkill("");
        }
    }

    const removeSkill = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            addSkill();
        }
    }
  return (
    <div className='space-y-4'>
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-white'>Skills</h3>
            <p className='text-sm text-slate-400'> Add your technical and soft skills</p>
        </div>
        <div className='flex gap-2'>
            <input type="text" placeholder='Enter a skill (e.g., JavaScript, Project Management)' className='flex-1 px-3 py-2.5 text-sm' onChange={(e)=>setNewSkill(e.target.value)}
            value={newSill} onKeyDown={handleKeyPress}
            />
            <button onClick={addSkill} disabled={!newSill.trim} className='flex items-center gap-2 px-4 text-sm font-medium bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                <Plus className='size-4'/> Add
            </button>
        </div>
        {data.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
                {data.map((skill, index)=> (
                    <span key={index} className='flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-medium'>
                        {skill}
                        <button onClick={() => removeSkill(index)} className='ml-1 hover:bg-emerald-500/20 rounded-full p-0.5 transition-colors'>
                            <X className = "w-3 h-3" />
                        </button>
                    </span>
                ))}
            </div>
        ) : (
            <div className='text-center py-8 text-slate-500 border border-dashed border-slate-700 rounded-xl'>
                <Sparkles className='w-9 h-9 mx-auto mb-2 text-slate-600'/>
                <p className='text-slate-400'>No skills added yet.</p>
                <p className='text-sm mt-0.5'>Add your technical and soft skills above.</p>
            </div>
        )
    }
    <div className='bg-emerald-500/10 p-3.5 rounded-lg border border-emerald-500/20'>
        <p className='text-sm text-emerald-300'><strong>Tip:</strong> Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).</p>
    </div>
    </div>
  )
}

export default SkillsForm