import { useEffect, useState } from "react";
import Post from "../components/cards/Post";
import Modal from "../components/modal/Modal";
import EditUser from "../components/forms/EditUser";
import FollwersAndFollowedList from "../components/FollowersAndFollowedList";
import { BotonPrimario, BotonSeguidor } from "../components/ui/Botones";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "../store";

export default function Account() {
    const { user, posts, getPosts } = useAuthStore();
    const [isOpenModal, setIsOpenModal] = useState<"editUser"|"following"|"followers"|false>(false);
    const closeModal = () => setIsOpenModal(false);

    useEffect(() => {
        getPosts();
    }, []);

    if( user ) return (
        <div className="flex flex-col md:flex-row">
            <div className="md:fixed md:w-80 my-3 mx-5 p-3 space-y-3 bg-white dark:bg-zinc-950 border-2 border-indigo-100 dark:border-zinc-800 shadow-lg shadow-indigo-50 dark:shadow-[#040405] rounded-lg">
                <h3 className="text-lg font-bold">Mi Perfil</h3>

                <div>
                    <p className="text-sm font-semibold text-slate-500">Nombre(s): </p>  
                    <p className="font-bold">{user.name}</p>  
                </div>

                <div>
                    <p className="text-sm font-semibold text-slate-500">Apellidos: </p>  
                    <p className="font-bold">{user.lastname}</p>  
                </div>

                <div>
                    <p className="text-sm font-semibold text-slate-500">E-mail: </p>  
                    <p className="font-bold">{user.email}</p>  
                </div>

                <div>
                    <p className="text-sm font-semibold text-slate-500">Descripción: </p>  
                    <p className="text-sm font-semibold">{user.description}</p>  
                </div>

                <div className="flex gap-3 py-2">
                    <BotonSeguidor
                        attributes={{ onClick: () => setIsOpenModal("following") }}
                        values={{ title: "Siguiendo", quantity: user.following.length }}
                    />

                    <BotonSeguidor
                        attributes={{ onClick: () => setIsOpenModal("followers") }}
                        values={{ title: "Seguidores", quantity: user.followers.length }}
                    />
                </div>

                <BotonPrimario
                    attributes={{ onClick: () => setIsOpenModal("editUser") }}
                >
                    <div className="flex items-center gap-1 justify-center">
                        <PencilIcon className="size-4"/>
                        <p className="">Editar</p> 
                    </div>                    
                </BotonPrimario>
            </div>

            <div className="m-auto">
                <p className="md:ml-96 text-lg text-center md:text-left font-bold pt-4 px-5">Publicaciones</p>
                <div className="md:ml-96 mb-20 xl:w-[900px]">
                    { posts.map(post => (
                        <Post key={post.id} post={post} userID={user.id}/>
                    ))} 
                </div>
            </div>

            <Modal isOpen={Boolean(isOpenModal)} onClose={closeModal}>
                { (isOpenModal === "following" || isOpenModal === "followers") && 
                    <FollwersAndFollowedList 
                        list={isOpenModal === "following" ? user.following : user.followers} 
                        type={isOpenModal}
                    />
                }

                { isOpenModal === "editUser" &&
                    <EditUser user={user} closeModal={closeModal} />
                }
            </Modal>  
        </div>
    )
}