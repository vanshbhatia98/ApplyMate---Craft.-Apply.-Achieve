import { BriefcaseBusiness, Globe, Icon, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({data, onChange, removeBackground, setRemoveBackground}) => {

    const handleChange = (field, value) => {
        onChange({...data, [field]: value})
    }

    const fields = [
        {key: "full_name", label: "Full Name", icon: User, type: "text", required: true},
        {key: "email", label: "Email Address", icon: Mail, type: "email", required: true},
        {key: "phone", label: "Phone Number", icon: Phone, type: "tel"},
        {key: "location", label: "Location", icon: MapPin, type: "text"},
        {key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text"},
        {key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url"},
        {key: "website", label: "Personal Website", icon: Globe, type: "url"}
    ]
  return (
    <div>
        <h3 className='text-lg font-semibold text-white'>Personal Information</h3>
        <p className='text-sm text-slate-400 mt-0.5'>Get started with the personal information</p>
        <div className='flex items-center gap-2'>
            <label>
                {data.image ? (
                    <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="user-image" className='w-16 h-16 rounded-full object-cover mt-5 ring-2 ring-slate-700 hover:opacity-80 cursor-pointer transition-opacity'/>
                ) : (
                    <div className='inline-flex items-center gap-2 mt-5 text-sm text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors'>
                        <User className='size-10 p-2.5 border border-slate-700 rounded-full'/>
                        Upload user image
                    </div>
                )}
                <input type="file" accept='image/jpeg, image/png' className='hidden' onChange={(e)=>handleChange("image", e.target.files[0])}/>
            </label>
            {typeof data.image === 'object' && (
                <div className='flex flex-col gap-1 pl-4 text-sm mt-5'>
                    <p className='text-slate-300'>Remove Background</p>
                    <label className='relative inline-flex items-center cursor-pointer text-slate-100 gap-3'>
                        <input type="checkbox" className='sr-only peer' onChange={()=>setRemoveBackground(prev => !prev)} checked={removeBackground}/>
                        <div className='w-9 h-5 bg-slate-700 rounded-full peer peer-checked:bg-emerald-600 transition-colors duration-200'>
                        </div>
                        <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4 shadow-sm'>
                        </span>
                    </label>
                </div>
            )}
        </div>
        {fields.map((field) => {
            const Icon = field.icon;
            return (
                <div key={field.key} className='space-y-1 mt-5'>
                    <label className='flex flex-col gap-1.5 text-sm font-medium text-slate-300'>
                        <span className='flex items-center gap-1.5'>
                            <Icon className='size-4 text-slate-500'/>
                            {field.label}
                            {field.required && <span className='text-red-400'>*</span>}
                        </span>
                        <input type={field.type} value={data[field.key] || ""} onChange={(e) =>handleChange(field.key, e.target.value)} className='w-full px-3 py-2.5 text-sm' placeholder={`Enter your ${field.label.toLowerCase()}`} required = {field.required}/>
                    </label>
                </div>
            )
        })}
    </div>
  )
}

export default PersonalInfoForm