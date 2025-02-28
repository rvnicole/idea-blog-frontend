import { useEffect, useState } from "react"
import { getFeed } from "../api/PostAPI"
import { useAuthStore } from "../store";
import Post from "../components/cards/Post";
import { Post as PostType } from "../types";
 
export default function Home() {
    const { user } = useAuthStore();
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            const posts = await getFeed();
            setPosts(posts || []);
        }

        getPosts();

        const intervalID = setInterval(() => {
            getPosts(); 
        }, 60000);

        return () => clearInterval(intervalID);
    }, []);

    if(user) return (
        <> 
            {posts.length > 0 ?
                <div className="w-full md:w-[700px] xl:w-[900px] m-auto mb-20">
                    <div className="w-full">
                        { posts.map(post => (
                            <Post key={post.id} post={post} userID={user.id}/>
                        ))} 
                    </div>                
                </div>
                :
                <div className="flex items-center justify-center h-[70vh]">
                    <div className="flex flex-col w-96">
                        <img src="/buscar.png" className="size-40 m-auto" />
                        <p className="text-center font-semibold">Busca posts sobre temas que te interesen; quizá coincidas con la perspectiva de otros usuarios. ¡Sigue a esos usuarios y mantente al tanto de sus publicaciones!</p>
                    </div>
                </div>
            }
        </>
    )
}