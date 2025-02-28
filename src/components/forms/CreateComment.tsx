import { useForm } from "react-hook-form"
import { createComment } from "../../api/PostAPI";
import { CommentFormData, Post } from "../../types";
import { toast } from "react-toastify";

type CreateCommentProps = {
    postID: Post["id"];
    afterOperation: () => void;
}

export default function CreateComment({ postID, afterOperation }: CreateCommentProps) {
    const { register, handleSubmit, formState:{ errors }, reset } = useForm<CommentFormData>();

    const handleCreateComment = async (formdata: CommentFormData) => {
        const data : CommentFormData = {
            post: postID,
            content: formdata.content
        }
        const respuesta = await createComment(data);
        if( respuesta?.data.success ) {
            toast.success(respuesta.data.message);
            reset();
            afterOperation();
            return;
        }
        
        toast.error("Ops! Algo salio mal, intentalo nuevamente");
    }

    return (
        <form
            onSubmit={handleSubmit(handleCreateComment)}
            className="flex gap-2"
        >
            <input 
                id="content"
                className={`w-full font-normal bg-indigo-100 dark:bg-zinc-950 text-sm p-2 rounded-lg outline-indigo-600 ${errors.content && "outline-red-500"}`}
                placeholder="Comparte tu opinión sobre el post"
                type="text"
                {...register("content", { required: true })}
            />

            <input 
                className='bg-indigo-400 py-2 px-4 rounded-lg text-white font-bold cursor-pointer hover:bg-amber-400 transition-colors ease-in duration-500'
                type="submit"
                value="Enviar"
            />             
        </form>
    )
}