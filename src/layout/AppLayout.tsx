import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BarraBusqueda } from "../components/forms/BarraBusqueda";
import Logo from "../components/ui/Logo";
import TemaBoton from "../components/ui/TemaBoton";
import OpcionesPerfil from "../components/popover/OpcionesPerfil";
import Modal from "../components/modal/Modal";
import CreateEditPost from "../components/forms/CreateEditPost";
import { useAuthStore } from "../store";

export default function AppLayout() {
    const { user, isLoading, isError, getMyUser } = useAuthStore();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => setIsOpenModal(false);

    useEffect(() => {
        if (!user) getMyUser();
    }, []);
    
    if (isLoading) return <p>Cargando...</p>;
    if( isError ) return <Navigate to="/auth/login" />;
    if(user) return (
        <>
            <nav className="z-10 fixed top-0 right-0 left-0 flex justify-between p-3 bg-white shadow-lg shadow-indigo-100 dark:bg-zinc-900 dark:shadow-zinc-950">
                <Link to="/" className="flex gap-2 items-center hover:cursor-pointer">
                    <Logo className="size-11 md:size-7 text-amber-400"/>
                    <h1 className="text-xl font-bold">Idea Blog</h1>  
                </Link>

                <div className="flex items-center gap-2">
                    <BarraBusqueda />
                    <TemaBoton />
                    <OpcionesPerfil user={user}/>
                </div>
            </nav>

            <div className="mt-32 md:mt-24">
                <Outlet />
                <button 
                    onClick={() => setIsOpenModal(true)}
                    className="fixed right-5 bottom-5 bg-amber-400 flex items-center justify-between py-1 px-4 gap-2 rounded-full hover:scale-105 transition-colors ease-in duration-500"
                >
                    <p className="text-white font-bold text-2xl m-0">+</p>
                    <p className="text-white font-bold text-xl">Crear Post</p>
                </button>
            </div>   

            <Modal isOpen={isOpenModal} onClose={closeModal}>
                <CreateEditPost closeModal={closeModal}/>
            </Modal>     

            <ToastContainer theme="colored"/>    
        </>
    )
}