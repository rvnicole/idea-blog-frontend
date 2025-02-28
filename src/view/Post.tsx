import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById, registerLikePost, registerViewPost } from "../api/PostAPI";
import { categorias } from "../locales/data";
import { formatDate } from "../lib/date";
import { Post as PostType } from "../types";
import { toast } from "react-toastify";
import Modal from "../components/modal/Modal";
import CreateEditPost from "../components/forms/CreateEditPost";
import LikesList from "../components/LikesList";
import CreateComment from "../components/forms/CreateComment";
import Comment from "../components/cards/Comment";
import DeletePost from "../components/forms/DeletePost";
import { ChatBubbleLeftIcon, EyeIcon, HandThumbUpIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "../store";

export default function Post() {
    const { user } = useAuthStore();
    const [post, setPost] = useState<PostType>();
    const [viewRegistered, setViewRegistered] = useState(false);
    const likePost = useMemo(() => Boolean(post?.likes.find(like => like.user.id === user?.id)),[post]);
    const postID = parseInt(useParams().id!);
    const finalPost = useRef<HTMLDivElement>(null);

    const [isOpenModal, setIsOpenModal] = useState<"editPost"|"deletePost"|"likes"|false>(false);
    const closeModal = () => setIsOpenModal(false);

    const getPost = async () => {
        const publicacion = await getPostById(postID);
        setPost(publicacion);
    }

    useEffect(() => {
        getPost();

        const intervalID = setInterval(() => {
            getPost(); 
        }, 60000);

        return () => clearInterval(intervalID); 
    }, [postID]);

    useEffect(() => {
        const observador = new IntersectionObserver(items => {
                if(items[0].isIntersecting && !viewRegistered) {
                    const registerView = async () => {
                        setViewRegistered(true);  
                        await registerViewPost(postID);
                        getPost();                     
                    }
                    registerView();
                }
            }
        );

        if(finalPost.current) {
            observador.observe( finalPost.current );
        }

        return () => {
            if (finalPost.current) {
                observador.unobserve(finalPost.current);
            }
        };
    });

    const handleRegisterLike = async (postID: PostType['id']) => {
        const respuesta = await registerLikePost(postID);
        
        if( respuesta?.data.success ) {
            toast.success(respuesta.data.message);
            getPost();
            return;
        }
        toast.error("Ops! Algo salio mal, intentalo nuevamente"); 
    }

    if(post && user ) return (
        <div className="w-full md:w-[700px] px-3 md:px-0 md:mx-auto mt-10 mb-20 space-y-8">
            <div className="border-2 border-indigo-100 dark:border-zinc-800 shadow-lg shadow-indigo-50 dark:shadow-[#040405] rounded-xl">
                <div className="bg-cover bg-center h-60 w-full rounded-t-xl"  style={{backgroundImage: `url(/${post.category}.png)`}}>
                    <div className="p-5 h-60 w-full flex flex-col justify-between bg-zinc-900/50 rounded-t-xl">
                                
                        { post.author.id == user.id ?
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsOpenModal("editPost")}
                                        className="flex items-center gap-1 bg-white/20 hover:bg-white/30 font-semibold py-1 px-2 rounded-lg transition-colors ease-in duration-500"
                                    >
                                        <PencilIcon className="size-4 text-white/60"/>
                                        <p className="text-white/60">Editar</p>                        
                                    </button>

                                    <button
                                        onClick={() => setIsOpenModal("deletePost")}
                                        className="flex items-center gap-1 bg-rose-500/40 hover:bg-rose-500/60 font-semibold py-1 px-2 rounded-lg transition-colors ease-in duration-500"
                                    >
                                        <TrashIcon className="size-4 text-white/60"/>
                                        <p className="text-white/60">Eliminar</p>                        
                                    </button>
                                </div>

                                <p className="text-white text-end font-bold py-1">{categorias[post.category]}</p>
                            </div>
                            : <p className="text-white text-end font-bold py-1">{categorias[post.category]}</p>
                        }        

                        <div className="space-y-2">
                            <p className="text-white text-2xl font-bold">{post.title}</p>

                            <div className="flex flex-col md:flex-row gap-1 md:gap-5">
                                <p className="text-white text-sm font-semibold">Autor: 
                                    <Link to={`/profile/${post.author.id}`} className="font-bold mx-1">{post.author.name} {post.author.lastname}</Link>
                                </p>
                                <p className="text-white text-sm font-semibold">{formatDate(post.publishedDate)}</p>  
                            </div>

                            <div className="flex justify-between">
                                <div className="flex gap-5">
                                    <div className="flex items-center gap-1">                                
                                        <p className="text-white text-sm font-semibold">{post.views}</p>
                                        <EyeIcon className="size-4 text-white" />
                                    </div>

                                    <a 
                                        href="#comments"
                                        className="flex items-center gap-1"
                                    >                                
                                        <p className="text-white text-sm font-semibold cursor-pointer">{post.comments.length}</p>
                                        <ChatBubbleLeftIcon className="size-4 text-white" />
                                    </a>

                                    <div 
                                        onClick={() => setIsOpenModal("likes")}
                                        className="flex items-center gap-1 cursor-pointer"
                                    >                                
                                        <p className={`${likePost ? "text-amber-400" : "text-white"} text-sm font-semibold`}>{post.likes.length}</p>
                                        <HandThumbUpIcon className={`${likePost ? "text-amber-400" : "text-white"} size-4`}/>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleRegisterLike(post.id)}
                                    className={`${likePost ? "bg-white/20 hover:bg-white/30" : "bg-indigo-400 hover:bg-amber-400"} py-1 px-4 rounded-lg transition-colors ease-in duration-500`}
                                >
                                    { likePost ? 
                                        <div className="flex items-center gap-1">
                                            <p className="text-white/60 font-semibold">Me gusta</p>
                                            <HandThumbUpIcon className="size-5 text-white/60"/> 
                                        </div>
                                        :
                                        <div className="flex items-center gap-1">
                                            <p className="text-white font-semibold">Me gusta</p>
                                            <HandThumbUpIcon className="size-5 text-white"/> 
                                        </div>
                                    }                       
                                </button> 
                            </div>             
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-slate-50 dark:bg-zinc-800 rounded-b-xl">
                    {post.content}
                </div>
            </div>

            <div ref={finalPost} />

            <CreateComment postID={post.id} afterOperation={getPost}/>

            <div id="comments" className="space-y-3">
                { post.comments.map(comment => (
                    <Comment 
                        key={comment.id} 
                        comment={comment} 
                        isAuthor={Boolean(comment.user.id === user.id)} 
                    />
                ))}
            </div>

            <Modal isOpen={isOpenModal && true} onClose={closeModal}>
                { isOpenModal === "editPost" &&
                    <CreateEditPost post={post} closeModal={closeModal} afterOperation={getPost}/>
                }

                { isOpenModal === "likes" &&
                    <LikesList list={post.likes}/>
                }

                { isOpenModal === "deletePost" &&
                    <DeletePost postID={post.id}/>
                }
            </Modal>
        </div>
    )
}