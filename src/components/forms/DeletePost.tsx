import { useForm } from "react-hook-form";
import { Post } from "../../types";
import { deletePost } from "../../api/PostAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type DeletePostProps = {
    postID: Post["id"];
}

export default function DeletePost({ postID }: DeletePostProps) {
    const { register, handleSubmit, formState:{ errors } } = useForm<{password: string}>();
    const navigate = useNavigate();

    const handleDeletePost = async (formData: {password: string}) => {
        const data = {
            postID,
            password: formData.password
        }

        const respuesta = await deletePost(data);
        console.log(respuesta)
        
        if( respuesta?.data.success ) {
            toast.success(respuesta.data.message);
            navigate("/");
            return;
        }

        toast.error("Ops! Algo salio mal, revisa tu contraseña e intentalo nuevamente");
    }
    
    return (
        <div>
            <h2 className="text-lg font-bold p-1">Eliminar Post</h2>
            <p className="text-slate-400">Confirma tu contraseña para eliminar el post</p>
            
            <form
                onSubmit={handleSubmit(handleDeletePost)}
                className="flex gap-2 mt-6"
            >
                <input 
                    id="password"
                    className={`w-full font-normal bg-indigo-100 dark:bg-zinc-950 text-sm p-2 rounded-lg outline-indigo-600 ${errors.password && "outline-red-500"}`}
                    placeholder="Escribe tu contraseña"
                    type="password"
                    {...register("password", { required: true })}
                />

                <input 
                    className='bg-red-500 py-2 px-4 rounded-lg text-white font-bold cursor-pointer hover:bg-red-600 transition-colors ease-in duration-500'
                    type="submit"
                    value="Eliminar Post"
                /> 
            </form>
        </div>
    )
}