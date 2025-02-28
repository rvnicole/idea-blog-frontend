import { Link } from "react-router-dom";
import type { Comment as CommenType } from "../../types";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteComment } from "../../api/PostAPI";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store";

type CommentProps = {
    comment: CommenType;
    isAuthor: boolean;
}
export default function Comment({ comment, isAuthor }: CommentProps) {
    const { getPosts } = useAuthStore();
    
    const handleDelete = async () => {
        const respuesta = await deleteComment(comment.id);

        if( respuesta?.data.success ) {
            toast.success(respuesta.data.message);
            getPosts();
            return;
        }
        toast.error("Ops! Algo salio mal, revisa tu contraseña e intentalo nuevamente");
    }

    return (
        <div className="bg-indigo-50 dark:bg-zinc-800 p-3 rounded-xl">
            <div className="flex justify-between">
                <div>
                    <Link
                        to={`/profile/${comment.user.id}`}
                        className="font-semibold text-indigo-400"
                    >
                        {comment.user.name} {comment.user.lastname}
                    </Link>
                    <p className="text-sm text-slate-400">{comment.user.email}</p>
                </div>

                { isAuthor &&
                    <button
                        onClick={handleDelete}
                        className="flex justify-center items-center gap-1 h-6 p-1 text-white bg-rose-500/50 hover:bg-rose-500/70 cursor-pointer rounded-full transition-colors ease-in duration-500"
                    >
                        <TrashIcon className="size-4" />
                        <p className="text-sm font-semibold">Eliminar</p>
                    </button>
                }
            </div>
            
            <p>{comment.content}</p>
        </div>
    )
}