import { Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({data, onChange}) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: ""
        };
        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

  return (
    <div>
        <div>
            <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-white'> Projects </h3>
                <p className='text-sm text-slate-400'>Add your projects</p>
            </div>
            <button onClick={addProject} className='flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors'>
                <Plus className='size-4'/>
                Add Project
            </button>
        </div>
        </div>

            {data.length === 0 ? (
                <div className='text-center py-10 text-slate-500 border border-dashed border-slate-700 rounded-xl mt-6'>
                    <p className='text-slate-400'>No projects added yet.</p>
                    <p className='text-sm mt-0.5'>Click "Add Project" to get started.</p>
                </div>
            ) : (
            <div className='space-y-4 mt-6'>
                {data.map((project, index) => (
                    <div key={index} className='p-4 border border-slate-800 rounded-xl space-y-3 bg-slate-800/30 hover:border-slate-700 transition-colors'>
                        <div className='flex justify-between items-start'>
                            <h4 className='text-sm font-semibold text-slate-200'>Project #{index + 1}</h4>
                            <button onClick={()=> removeProject(index)} className='text-slate-500 hover:text-red-400 transition-colors'>
                                <Trash2 className='size-4'/>
                            </button>
                        </div>

                        <div className='grid gap-3'>
                            <input value={project.name || ""} onChange={(e)=>updateProject(index, "name", e.target.value)} type="text" placeholder='Project Name' className='px-3 py-2 text-sm'/>
                            <input value={project.type || ""} onChange={(e)=>updateProject(index, "type", e.target.value)} type="text" placeholder='Project Type' className='px-3 py-2 text-sm'/>
                            <textarea rows={4} value={project.description || ""} onChange={(e)=>updateProject(index, "description", e.target.value)} placeholder='Describe your project...' className='w-full px-3 py-2 text-sm'/>
                        </div>
                    </div>
                ))}
            </div>
            )}
    </div>
  )
}

export default ProjectForm
