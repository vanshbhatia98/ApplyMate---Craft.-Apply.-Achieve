import { Check, Layout } from 'lucide-react';
import React, { useState } from 'react'

const TemplateSelector = ({selectedTemplate, onChange}) => {

    const [isOpen, setIsOpen] = useState(false);

    const templates = [
        {
            id: "classic",
            name: "Classic",
            preview: "A clean, traditional resume format with clear sections and professional typography"
        },
        {
            id: "modern",
            name: "Modern",
            preview: "Sleek design with strategic use of color and modern font choices"
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            preview: "Minimal design with a single image and clean typography"
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "Ultra-clean design that puts your content front and center"
        }
    ]

  return (
    <div className='relative'>
        <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1.5 text-sm font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-colors px-3 py-2 rounded-lg'>
            <Layout size={14}/> <span className='max-sm:hidden'>Template</span>
        </button>
        {isOpen && (
            <div className='absolute top-full w-xs p-3 mt-2 space-y-2.5 z-10 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl shadow-black/40 animate-scale-in'>
                {templates.map((template)=>(
                    <div key={template.id} onClick={() => {onChange(template.id);
                        setIsOpen(false)}} className={`relative p-3 border rounded-lg cursor-pointer transition-all ${selectedTemplate === template.id ? "border-blue-500/50 bg-blue-500/10" : "border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"}`}>
                            {selectedTemplate === template.id && (
                                <div className='absolute top-2 right-2'>
                                    <div className='size-5 bg-blue-500 rounded-full flex items-center justify-center'>
                                        <Check className='w-3 h-3 text-white'/>
                                    </div>
                                </div>
                            )}

                            <div className='space-y-1'>
                                <h4 className='font-medium text-slate-100 text-sm'>{template.name}</h4>
                                <div className='mt-2 p-2 bg-slate-800/60 rounded-md text-xs text-slate-400 italic'>{template.preview}</div>
                            </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default TemplateSelector