import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchPosts } from "../api/PostAPI";
import { Post as PostType, User } from "../types";
import Post from "../components/cards/Post";
import { searchUsers } from "../api/UserAPI";
import UserCard from "../components/cards/UserCard";
import { useAuthStore } from "../store";

type GetPostProps = {
    filtro: "title"|"author"|"category";
    valor: string;
}

export default function Search() {
    const { user } = useAuthStore();
    const [posts, setPosts] = useState<PostType []>([]);
    const [users, setUsers] = useState<User []>([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        const getUsers = async (user: string) => {
            const respuesta = await searchUsers(user);
            setUsers(respuesta || []);
            setPosts([]);
        }

        const getPosts = async ({filtro, valor}: GetPostProps) => {
            const respuesta = await searchPosts({[filtro]: valor});
            setPosts(respuesta || []);
            setUsers([]);
        }

        const user = params.get("user");
        if(user) {
          getUsers(user);
          return
        }

        const title = params.get("title");
        if( title ) {
            getPosts({filtro:"title", valor: title});
            return;
        }

        const author = params.get("author");
        if( author ) {
            getPosts({filtro:"author", valor: author});
            return;
        }

        const category = params.get("category");
        if( category ) {
            getPosts({filtro:"category", valor: category});
            return;
        }
    },[location]);

    if( user ) return (
        <div className="w-full md:w-[700px] xl:w-[900px] m-auto mb-20">
            { posts.length > 0 &&
                <>
                    <div className="m-5 flex items-center justify-between">
                        <p className="text-lg text-center md:text-left font-bold">Publicaciones</p>
                        <p className="text-center md:text-left font-semibold">{posts.length} Resultados</p>
                    </div>
                    <div className="w-full">
                        { posts.map(post => (
                            <Post key={post.id} post={post} userID={user.id}/>
                        ))} 
                    </div>
                </>
            }

            { users.length > 0 &&
                <>
                    <div className="m-5 flex items-center justify-between">
                        <p className="text-lg text-center md:text-left font-bold">Usuarios</p>
                        <p className="text-center md:text-left font-semibold">{users.length} Resultados</p>
                    </div>
                    <div className="w-full">
                        { users.map(usuario => (
                            <UserCard key={usuario.id} user={usuario} userID={user.id}/>
                        ))}
                    </div>
                </>
            }

            {(posts.length === 0 && users.length === 0) && 
                <div className="m-5 flex items-center justify-center">
                    <p className="text-lg md:text-left font-bold">Sin Resultados</p>
                </div>
            }
        </div>
    )
}