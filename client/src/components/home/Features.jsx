import { Zap } from 'lucide-react';
import React from 'react'
import Title from './Title';

// simple process badge added
const Features = () => {
    const [isHover, setIsHover] = React.useState(false);
    return (
        <div id='features' className='flex flex-col items-center my-10 scroll-mt-12'>
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-1.5">
            <Zap width={14}/>
            <span>Simple Process</span>
        </div>
        <Title title = 'Build your resume' description='Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.'/>
            <div className="flex flex-col md:flex-row items-center xl:-mt-10">
                <img className="max-w-2xl w-full xl:-ml-32 opacity-90" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" />
                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className={`p-6 group-hover:bg-violet-500/10 border border-transparent group-hover:border-violet-500/30 flex gap-4 rounded-2xl transition-all duration-300 ${!isHover ? 'border-violet-500/30 bg-violet-500/10' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-violet-400 shrink-0"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                            <div className="space-y-1.5">
                                <h3 className="text-base font-semibold text-slate-100">Real-Time Analytics</h3>
                                <p className="text-sm text-slate-400 max-w-xs">Get instant insights into your finances with live dashboards.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-3">
                        <div className="p-6 group-hover:bg-emerald-500/10 border border-transparent group-hover:border-emerald-500/30 flex gap-4 rounded-2xl transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-emerald-400 shrink-0"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
                            <div className="space-y-1.5">
                                <h3 className="text-base font-semibold text-slate-100">Bank-Grade Security</h3>
                                <p className="text-sm text-slate-400 max-w-xs">End-to-end encryption, 2FA, compliance with GDPR standards.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-3">
                        <div className="p-6 group-hover:bg-amber-500/10 border border-transparent group-hover:border-amber-500/30 flex gap-4 rounded-2xl transition-all duration-300">
                            <svg className="size-6 stroke-amber-400 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
                            <div className="space-y-1.5">
                                <h3 className="text-base font-semibold text-slate-100">Customizable Reports</h3>
                                <p className="text-sm text-slate-400 max-w-xs">Export professional, audit-ready financial reports for tax or internal review.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
