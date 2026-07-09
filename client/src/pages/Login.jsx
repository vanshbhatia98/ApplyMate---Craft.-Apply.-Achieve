import React from 'react'
import {Lock, Mail, User2Icon} from 'lucide-react'
import api from '../configs/api';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authSlice';
import toast from 'react-hot-toast';

const Login = () => {

    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search);
    const urlState = query.get('state');
    const [state, setState] = React.useState(urlState ||"login")

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem('token', data.token);
            toast.success(data.message)
        } catch (error) {
            toast(error?.response?.data?.message || error.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-950 px-4 relative overflow-hidden'>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-0 size-96 bg-emerald-500 blur-[130px] opacity-10"></div>
        <form onSubmit={handleSubmit} className="sm:w-[380px] w-full text-center border border-slate-800 rounded-2xl px-8 bg-slate-900 shadow-2xl shadow-black/40 animate-scale-in relative z-10">
                <h1 className="text-white text-3xl mt-10 font-semibold tracking-tight">{state === "login" ? "Welcome back" : "Create an account"}</h1>
                <p className="text-slate-400 text-sm mt-2">Please {state} to continue</p>
                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-slate-800/60 border border-slate-700 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                        <User2Icon  size = {16} className='text-slate-500 shrink-0'/>
                        <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0 w-full h-full bg-transparent text-slate-100 placeholder-slate-500" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className="flex items-center w-full mt-4 bg-slate-800/60 border border-slate-700 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                    <Mail size={16} className='text-slate-500 shrink-0'/>
                    <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0 w-full h-full bg-transparent text-slate-100 placeholder-slate-500" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-4 w-full bg-slate-800/60 border border-slate-700 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                    <Lock size={16} className='text-slate-500 shrink-0'/>
                    <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0 w-full h-full bg-transparent text-slate-100 placeholder-slate-500" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mt-4 text-left text-emerald-400">
                    <button className="text-sm hover:text-emerald-300 transition-colors" type="reset">Forget password?</button>
                </div>
                <button type="submit" className="mt-3 w-full h-11 rounded-full text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5 active:translate-y-0 font-semibold">
                    {state === "login" ? "Login" : "Sign up"}
                </button>
                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-slate-400 text-sm mt-4 mb-11 cursor-pointer">{state === "login" ? "Don't have an account?" : "Already have an account?"} <a href="#" className="text-emerald-400 hover:underline font-medium">click here</a></p>
            </form>
    </div>
  )
}

export default Login