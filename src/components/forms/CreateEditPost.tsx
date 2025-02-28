import { useForm } from 'react-hook-form';
import { Post, PostFormData } from '../../types';
import { createPost, editPost } from '../../api/PostAPI';
import { toast } from 'react-toastify';
import { BotonSubmit } from '../ui/Botones';
import { useAuthStore } from '../../store';

type CreateEditPostProps = {
    post?: Post;
    closeModal: () => void;
    afterOperation?: () => void;
}

export default function CreateEditPost({ post, closeModal, afterOperation }: CreateEditPostProps) {
    const { getPosts } = useAuthStore();
    const { register, handleSubmit, formState:{ errors } } = useForm<Post>({defaultValues: post});

    const handleCrearPost = async (data: Pick<PostFormData, "title"|"category"|"excerpt"|"content">) => {    
        const newPost: PostFormData = {
            ...data,
            publishedDate: (new Date()).toISOString()
        }
        
        const respuesta = await createPost(newPost);
        if( respuesta?.data.success ) {
            closeModal();
            toast.success(respuesta.data.message);
            getPosts();
            return;
        }
        
        toast.error("Ops! Algo salio mal, intentalo nuevamente");        
    }

    const handleEditPost = async (post: Post) => {
        const respuesta = await editPost(post);
        if( respuesta?.data.success ) {
            closeModal();
            toast.success(respuesta.data.message);
            if(afterOperation) afterOperation();
            return;
        }
        
        toast.error("Ops! Algo salio mal, intentalo nuevamente"); 
    }

    return (
        <div>
            <h2 className="text-lg font-bold p-1">{post ? "Editar Post" : "Crear Nuevo Post"}</h2>
            <form 
                className='w-full space-y-3'
                onSubmit={handleSubmit(post ? handleEditPost : handleCrearPost)}
            >
                <div className='text-left space-y-3 px-3 overflow-y-auto max-h-[70vh]'>
                    <label className="flex flex-col gap-1 font-semibold">Titulo:
                        <input 
                            className={`font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.title && "outline-red-500"}`}
                            id="title"
                            type="text"
                            placeholder="Ej. Las mejores herramientas para programadores"
                            defaultValue={post?.title}
                            {...register("title", { required: true })}
                        />
                    </label>

                    <label className="flex flex-col gap-1 font-semibold">Categoria:
                        <select 
                            className={`font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.category && "outline-red-500"}`}
                            id="category"
                            defaultValue={post?.category}
                            {...register("category", { required: true })}
                        >
                            <option value="">-- Selecciona una categoria --</option>
                            <option value="tecnologia">Tecnología</option> 
                            <option value="creatividad-diseño">Creatividad y Diseño</option> 
                            <option value="educacion-aprendizaje">Educación y Aprendizaje</option> 
                            <option value="estiloVida">Estilo de Vida</option> 
                            <option value="opinion">Opinión</option> 
                            <option value="desarrolloPersonal">Desarrollo Personal</option> 
                            <option value="proyectos">Proyectos</option> 
                            <option value="noticias-actualidad">Noticias y Actualidad</option> 
                            <option value="culturaGeek">Cultura Geek</option> 
                            <option value="otro">Otro</option> 
                        </select>
                    </label>

                    <label className="flex flex-col gap-1 font-semibold">Resumen del Post: 
                        <span className="text-xs text-slate-500 dark:text-slate-300">Escribe un resumen breve y claro del contenido de tu post. Esto ayudará a los lectores a entender rápidamente de qué trata y captar su interés.</span>
                        <textarea 
                            className={`h-24 font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.excerpt && "outline-red-500"}`} 
                            id="excerpt"
                            defaultValue={post?.excerpt}
                            minLength={150}
                            maxLength={300}
                            placeholder='Ej. Descubre las herramientas que están revolucionando la forma de programar este año. Desde editores hasta plataformas de colaboración.'
                            {...register("excerpt", { required: true })}
                        />
                    </label>   

                    <label className="flex flex-col gap-1 font-semibold">Contenido del Post:
                        <textarea 
                            className={`h-80 font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.content && "outline-red-500"}`}
                            id="content"
                            defaultValue={post?.content}
                            minLength={150}
                            {...register("content", { required: true })}
                        />
                    </label> 
                </div>

                <BotonSubmit attributes={{ value: `${post ? "Guardar Cambios" : "Guardar"}`}}/> 
            </form>
        </div>
    )
}