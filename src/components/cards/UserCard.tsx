import { Link } from "react-router-dom";
import { User } from "../../types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function UserCard({ user, userID } : { user: User, userID: User["id"] }) {
    const siguiendo = user.followers.some(usuario => usuario.id === userID);
    
    return (
        <div className="bg-slate-50 dark:bg-zinc-800 border-2 border-indigo-100 dark:border-zinc-800 shadow-lg shadow-indigo-50 dark:shadow-zinc-950 rounded-lg m-5 p-3 space-y-2">
            <Link to={user.id === userID ? `/account` : `/profile/${user.id}`} className="font-bold">
                {user.name} {user.lastname} {user.id === userID && <span className="text-indigo-400">( Yo )</span>}
            </Link>
            <p className="text-sm text-slate-400 font-semibold">{user.email}</p>
        
            <div className="flex items-center justify-between">
                <div className="flex gap-1 items-center">
                    {siguiendo && <>
                        <CheckCircleIcon className="size-5"/>
                        <p className="text-sm font-semibold">Siguiendo</p>
                    </>}
                </div>
                <Link to={user.id === userID ? `/account` : `/profile/${user.id}`} className="self-end flex items-center gap-1 bg-indigo-400 py-1 px-2 rounded-full hover:scale-105">
                    <p className="md:text-sm font-bold text-white">{user.id === userID ? "Ver Mi Perfil" : "Ver Perfil"}</p>
                    <CheckCircleIcon className="size-5 text-white"/>
                </Link>
            </div> 
        </div>
    )
}