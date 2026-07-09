import React, { act, useEffect, useState } from 'react'
import { Link , useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Loader2, Share2Icon, Sparkles, User } from 'lucide-react'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {

  const {resumeId} = useParams()
  const {token} = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id:'',
    title:'',
    personal_info:{},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false
  })

  const loadExistingResume = async () => {
    try {
      const {data} = await api.get('/api/resumes/get/' + resumeId, {headers: {Authorization: token}})
      if(data.resume){
        setResumeData(data.resume)
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    {id: "personal", name: "Personal Info", icon: User},
    {id: "summary", name: "Summary", icon: FileText},
    {id: "experience", name: "Experience", icon: Briefcase},
    {id: "education", name: "Education", icon: GraduationCap},
    {id: "projects", name: "Projects", icon: FolderIcon},
    {id: "skills", name: "Skills", icon: Sparkles}
  ]

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume()
  }, [])

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({public: !resumeData.public}))

      const {data} = await api.put('/api/resumes/update', formData, {headers: {Authorization: token}})
      setResumeData({...resumeData, public: !resumeData.public})
      toast.success(data.message)
    } catch (error) {
      console.error("Error saving resume:", error)
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if(navigator.share){
      navigator.share({url: resumeUrl, text: "My Resume", })
    } else {
      alert('Share not supported on this browser.')
    }
  }

  const [isDownloading, setIsDownloading] = useState(false);

  const downloadResume = async () => {
    try {
      setIsDownloading(true);
      const element = document.getElementById('resume-preview');
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({ unit: 'in', format: 'letter' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfPageHeight;

      while (heightLeft > 0) {
        position -= pdfPageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfPageHeight;
      }

      pdf.save(`${resumeData.title || 'resume'}.pdf`);
    } catch (error) {
      toast.error('Failed to download resume');
    } finally {
      setIsDownloading(false);
    }
  }

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData)
      //remove image from updateResumeData
      if(typeof resumeData.personal_info.image === 'object'){
        delete updatedResumeData.personal_info.image
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId)
      formData.append('resumeData', JSON.stringify(updatedResumeData))
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image)

      const {data} = await api.put('/api/resumes/update', formData, {headers: {Authorization: token}})
      setResumeData(data.resume)
      toast.success(data.message)
    } catch (error) {
      console.error("Error saving resume", error)
    }
  }

  return (
    <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-400 hover:text-white transition-colors text-sm font-medium'>
            <ArrowLeftIcon className="size-4"/>Back to Dashboard
          </Link>
        </div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 pb-8'>
          <div className='grid lg:grid-cols-12 gap-8'>
            {/* Left Panel - Form */}
            <div className='relative lg:col-span-5 rounded-2xl overflow-hidden'>
              <div className='bg-slate-900 rounded-2xl shadow-xl shadow-black/20 border border-slate-800 p-6 pt-1'>
                {/*progress bar using activeSectionIndex */}
                <hr className='absolute top-0 left-0 right-0 border-2 border-slate-800'/>
                <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 border-none transition-all duration-500 rounded-r-full' style={{width:`${activeSectionIndex * 100 / (sections.length - 1)}%`}}/>
                {/*Section Navigation */}
                <div className='flex justify-between items-center mb-6 border-b border-slate-800 py-1'>
                  <div className='flex items-center gap-2'>
                    <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=>setResumeData(prev => ({...prev, template}))}/>
                    <ColorPicker selectedColor={resumeData.accent_color} onChange={(color)=>setResumeData(prev => ({...prev, accent_color : color}))}/>
                  </div>
                  <div className='flex items-center'>
                    {activeSectionIndex !== 0 && (
                      <button onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all' disabled = {activeSectionIndex === 0}>
                        <ChevronLeft className="size-4"/> Previous
                      </button>
                    )}
                    <button onClick={() => setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`} disabled = {activeSectionIndex === sections.length - 1}>
                      Next <ChevronRight className="size-4"/>
                      </button>
                  </div>
                </div>
                {/* Form Content */}
                <div className='space-y-6 animate-fade-in'>
                  {activeSection.id === 'personal' && (
                    <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({...prev, personal_info: data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
                  )}
                  {activeSection.id === 'summary' && (
                    <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({...prev, professional_summary: data}))} setResumeData={setResumeData}/>
                  )}
                  {activeSection.id === 'experience' && (
                    <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({...prev, experience: data}))}/>
                  )}
                  {activeSection.id === 'education' && (
                    <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({...prev, education: data}))}/>
                  )}
                  {activeSection.id === 'projects' && (
                    <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({...prev, project: data}))}/>
                  )}
                  {activeSection.id === 'skills' && (
                    <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({...prev, skills: data}))}/>
                  )}
                </div>

                <button onClick={() => {toast.promise(saveResume, {loading: 'Saving...'})}} className='bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm shadow-emerald-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 rounded-lg px-6 py-2.5 mt-6 text-sm font-semibold'>
                  Save Changes
                </button>

              </div>
            </div>
            {/* Right Panel - Preview */}
            <div className='lg:col-span-7 max-lg:mt-6'>
              <div className='relative w-full'>
                {/* --- buttons --- */}
                <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                  {resumeData.public && (
                    <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs font-medium bg-slate-900 text-blue-400 rounded-lg border border-blue-500/30 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all'>
                      <Share2Icon className='size-4'/> Share
                    </button>
                  )}
                  <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs font-medium bg-slate-900 text-purple-400 border border-purple-500/30 rounded-lg shadow-sm hover:shadow-md hover:border-purple-500/50 transition-all'>
                      {resumeData.public ? <EyeIcon className='size-4'/> :
                      <EyeOffIcon className='size-4' />
                      }
                      {resumeData.public ? 'Public' : 'Private'}
                  </button>
                  <button onClick={downloadResume} disabled={isDownloading} className='flex items-center gap-2 px-6 py-2 text-xs font-medium bg-emerald-500 text-slate-950 rounded-lg shadow-sm shadow-emerald-500/20 hover:bg-emerald-400 transition-all font-semibold disabled:opacity-50'>
                    {isDownloading ? <Loader2 className='size-4 animate-spin'/> : <DownloadIcon className='size-4'/>}
                    {isDownloading ? 'Downloading...' : 'Download'}
                  </button>
                </div>
              </div>

              {/* --- resume preview --- */}
              <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ResumeBuilder