import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ArrowRightStartOnRectangleIcon, Cog8ToothIcon, UserIcon } from '@heroicons/react/24/solid'
import { User } from '../../types';

type OpcionesPerfilProps = {
    user: User;
}

export default function OpcionesPerfil({ user }: OpcionesPerfilProps) {
    const letras = useMemo(() => user && `${user.name[0]}${user.lastname[0]}`, [user]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("AUTH_TOKEN");
        navigate("/auth/login");
    }
    
    return (
        <div className="bg-indigo-600 w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 cursor-pointer">
            <p className='absolute font-bold text-sm text-white'>{letras}</p>
            <Popover className="relative">
                <PopoverButton className="p-4"></PopoverButton>            
                <PopoverPanel className="z-20 mt-36 mr-32">
                    <div className="flex flex-col w-40 my-1 mx-3 p-3 bg-slate-50 dark:bg-zinc-800 border-2 border-indigo-100 dark:border-zinc-800 shadow shadow-indigo-50 dark:shadow-zinc-950 rounded-xl">
                        <Link to="/account" className='flex gap-2 p-1 items-center rounded-lg hover:bg-indigo-400/15'>
                            <UserIcon className='size-4'/>
                            <span className='font-semibold text-sm'>Mi Perfil</span>
                        </Link>
                        <Link to="/config" className='flex gap-2 p-1 items-center rounded-lg hover:bg-indigo-400/15'>
                            <Cog8ToothIcon className='size-4'/>
                            <span className='font-semibold text-sm'>Configuración</span>
                        </Link>
                        <div className='bg-indigo-100 dark:bg-zinc-900 p-[1px] my-1'/>
                        <button 
                            className='flex gap-2 p-1 items-center rounded-lg hover:bg-indigo-400/15'
                            onClick={handleLogout}
                        >
                            <ArrowRightStartOnRectangleIcon className='size-4'/>
                            <span className='font-semibold text-sm'>Cerrar Sesión</span>
                        </button>
                    </div>
                </PopoverPanel>
            </Popover>
        </div>
    )
}