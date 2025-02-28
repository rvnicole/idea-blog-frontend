import { Link } from "react-router-dom";
import { Post as PostType, User } from "../../types";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { formatDate } from "../../lib/date";
import { categorias } from "../../locales/data";

export default function Post({ post, userID } : { post: PostType, userID: User["id"] }) {
    return (
        <div className="bg-slate-50 dark:bg-zinc-800 border-2 border-indigo-100 dark:border-zinc-800 shadow-lg shadow-indigo-50 dark:shadow-zinc-950 rounded-lg m-5 p-3 space-y-2">
            <p className="text-right text-sm text-slate-400 font-semibold">{categorias[post.category]}</p>
            <Link to={`/post/${post.id}`} className="font-bold">{post.title}</Link>
            
            <p>{post.excerpt}</p>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
                    <p className="text-sm md:text-xs">Autor:
                        <Link to={post.author.id === userID ? "/account" : `/profile/${post.author.id}`} className="font-bold mx-1 text-indigo-400">
                            { post.author.id === userID ? "Yo" : `${post.author.name} ${post.author.lastname}`}
                        </Link>
                    </p>
                    <p className="text-sm md:text-xs">{formatDate(post.publishedDate)}</p>
                </div>

                <Link to={`/post/${post.id}`} className="self-end flex items-center gap-1 bg-indigo-400 py-1 px-2 rounded-full hover:scale-105">
                    <p className="md:text-sm font-bold text-white">Ver Post</p>
                    <ArrowRightCircleIcon className="size-5 text-white"/>
                </Link>
            </div>
        </div>
    )
}