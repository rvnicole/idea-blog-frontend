import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import TemaBoton from "../components/ui/TemaBoton";
import Logo from "../components/ui/Logo";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "../store";


export default function AuthLayout() {
    const { user, isLoading, getMyUser } = useAuthStore();

    useEffect(() => {
        getMyUser();
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if( user ) return <Navigate to="/" />
    return (
        <div className="flex flex-col h-screen items-center">
            <div className="self-end p-2">
                <TemaBoton />
            </div>

            <Link to="/auth/login" className="flex items-center gap-2 mb-6 mt-[-10px]">
                <Logo className="size-10 text-amber-400"/>
                <h1 className="text-3xl font-bold">Idea Blog</h1>
            </Link>

            <Outlet />

            <ToastContainer theme="colored"/> 
        </div>
    )
}