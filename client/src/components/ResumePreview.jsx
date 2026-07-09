import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

const ResumePreview = ({data, template, accentColor, classes = ""}) => {

    const renderTemplate = () => {
        switch (template) {
            case "modern" :
                return <ModernTemplate data={data} accentColor={accentColor}/>
            case "minimal" :
                return <MinimalTemplate data={data} accentColor={accentColor}/>
            case "minimal-image" :
                return <MinimalImageTemplate data={data} accentColor={accentColor}/>
            default:
                return <ClassicTemplate data={data} accentColor={accentColor}/>  
        }
    }

  return (
    <div className='w-full bg-slate-900/60 border border-slate-800 rounded-xl p-2 sm:p-4'>
        <div id='resume-preview' className={`border border-slate-700/50 shadow-xl shadow-black/30 print:shadow-none print:border-none rounded-md overflow-hidden ${classes}`}>
            {renderTemplate()}
        </div>
        <style>
            {`
            @media print {
            @page{
               size: A4;
               margin: 0;
            }
            html, body{
               width: 100%;
               height: auto;
            }
            body * {
               visibility: hidden;
            }
            #resume-preview, #resume-preview * {
               visibility: visible;
               -webkit-print-color-adjust: exact;
               print-color-adjust: exact;
               color-adjust: exact;
            }
            #resume-preview {
               position: absolute;
               left: 0;
               top: 0;
               width: 100%;
               height: auto;
               margin: 0;
               padding: 0;
               box-shadow: none !important;
               border: none !important;
            }
            }
            `}
        </style>
    </div>
  )
}

export default ResumePreview