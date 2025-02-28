import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/cards/Post";
import FollwersAndFollowedList from "../components/FollowersAndFollowedList";
import Modal from "../components/modal/Modal";
import { BotonSeguidor } from "../components/ui/Botones";
import { toast } from "react-toastify";
import { getUserById, registerFollowed } from "../api/UserAPI";
import { getPostsByAuthor } from "../api/PostAPI";
import { CheckIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import type { Post as PostType, User } from "../types";
import { useAuthStore } from "../store";

export default function Profile() {
    const { user } = useAuthStore();
    const [author, setAuthor] = useState<User>();    
    const [posts, setPosts] = useState<PostType[]>([]);
    const [soySeguidor, setSoySeguidor] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState<"following"|"followers"|false>(false);
    const navigate = useNavigate();
    
    const closeModal = () => setIsOpenModal(false);
    const authorID = parseInt( useParams().id! );

    if( authorID === user?.id  ) {
        navigate("/account");
        return;
    }

    useEffect(() => {
        const getPosts = async () => {
            const postsAuthor = await getPostsByAuthor(authorID);
            setPosts(postsAuthor || []);
        }

        const getUser = async () => {
            const author = await getUserById(authorID);
            setAuthor(author);
        }

        getUser();
        getPosts();      
    }, [authorID]);

    useEffect(() => {
        if (author) {
            const follower = author.followers.find(seguidor => seguidor.follower.id === user?.id);
            setSoySeguidor(Boolean(follower));
        }
    }, [author, user]);

    const handleRegisterFollowed = async (followedID: User['id']) => {
        const respuesta = await registerFollowed(followedID);
        
        if( respuesta?.data.success ) {
            toast.success(respuesta.data.message);
            setSoySeguidor(s => !s);
            return;
        }
        else {
            if(respuesta?.data.message) {
                toast.error(respuesta.data.message);
                return;
            }
            toast.error("Ops! Algo salio mal, intentalo nuevamente");            
        }
    }

    if( author && user ) return (
        <div className="flex flex-col md:flex-row">
            <div className="md:fixed md:w-80 my-3 mx-5 p-3 space-y-3 bg-white dark:bg-zinc-950 border-2 border-indigo-100 dark:border-zinc-800 shadow-lg shadow-indigo-50 dark:shadow-[#040405] rounded-lg">
                <p className="text-3xl font-bold text-indigo-400">{author.name} {author.lastname}</p>
                <p className="text-sm font-semibold text-slate-500">{author.email}</p>
                
                <div className="flex gap-3">
                    <BotonSeguidor
                        attributes={{ onClick: () => setIsOpenModal("following") }}
                        values={{ title: "Siguiendo", quantity: author.following.length }}
                    />

                    <BotonSeguidor
                        attributes={{ onClick: () => setIsOpenModal("followers") }}
                        values={{ title: "Seguidores", quantity: author.followers.length }}
                    />
                </div>

                <button
                    onClick={() => handleRegisterFollowed(author.id)}
                    className={`${ soySeguidor ? "bg-amber-400 hover:bg-indigo-400" : "bg-indigo-400 hover:bg-amber-400"} w-full text-white font-bold py-1 px-4 gap-2 rounded-lg transition-colors ease-in duration-500`}
                >
                    { soySeguidor ? 
                        <div className="flex items-center justify-center gap-1">
                            <CheckIcon className="size-5"/>
                            <p>Siguiendo</p>
                        </div>
                        : 
                        <div className="flex items-center justify-center gap-1">
                            <UserPlusIcon className="size-5"/>
                            <p>Seguir</p>
                        </div>
                    }
                </button>

                <div className="bg-indigo-100 dark:bg-zinc-900 p-[1px]"/>
                <p className="text-sm font-semibold text-slate-500">Conoce un poco sobre mí...</p>
                <p className="text-sm font-semibold mt-1">{author.description}</p>
            </div>

            <div className="m-auto">
                <p className="md:ml-96 text-lg text-center md:text-left font-bold pt-4 px-5">Publicaciones</p>
                <div className="md:ml-96 mb-20 xl:w-[900px]">
                    { posts.map(post => (
                        <Post key={post.id} post={post} userID={user!.id}/>
                    ))} 
                </div>
            </div>

            <Modal isOpen={isOpenModal && true} onClose={closeModal}>
                { isOpenModal && 
                    <FollwersAndFollowedList 
                        list={isOpenModal === "following" ? author.following : author.followers} 
                        type={isOpenModal}
                    />
                }
            </Modal> 
        </div>
    )
}