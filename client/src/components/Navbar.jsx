import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice';

const Navbar = () => {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logoutUser = () =>{
        navigate('/');
        dispatch(logout())
    }
  return (
    <div className='sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 py-3 text-slate-200 transition-all'>
            <Link to='/' className='shrink-0'>
               <img src="/logo.svg" alt="logo" className="h-8 w-auto" />
            </Link>
            <div className='flex items-center gap-3 sm:gap-4 text-sm'>
                <div className='hidden sm:flex items-center gap-2.5 pr-1'>
                    <div className='size-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-xs font-semibold uppercase shadow-sm shadow-emerald-900/40'>
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <p className='text-slate-400'>Hi, <span className='font-medium text-slate-100'>{user?.name}</span></p>
                </div>
                <button onClick={logoutUser} className='bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 px-5 py-1.5 rounded-full active:scale-95 transition-all text-sm font-medium'>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar