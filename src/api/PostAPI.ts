import api from "../lib/axios";
import { AxiosResponse } from "axios";
import { Post, PostFormData, CommentFormData, RespuestaAPI, DeletePostFormData, Comment } from "../types";
import { PostSchema, PostsSchema } from "../schemas";

export async function createPost(formData: PostFormData): Promise<AxiosResponse<RespuestaAPI> | undefined> {
    try {
        const respuesta = await api.post('/posts/create-post', formData);
        return respuesta;
    }
    catch(error) {
        console.log("Error:", error);
    }
}

export async function getMyPosts() {
    try {
        const respuesta: RespuestaAPI = await api.get(`/posts/`);
        
        if( respuesta.data.success ) {
            const {success, data, error } = PostsSchema.safeParse(respuesta.data.data);
            if( success ) {
                return data;
            }
            error.issues.forEach((issue: any) => console.log("Error Data Schema", issue));
        }        
    }
    catch(error) {
        console.log("Error:", error);
    }
}

export async function getPostsByAuthor(authorID: number)  {
    try {
        const respuesta: RespuestaAPI = await api.get(`/posts/get-posts-author/${authorID}`);

        if( respuesta.data.success ) {
            const {success, data, error } = PostsSchema.safeParse(respuesta.data.data);
            if( success ) {
                return data;
            }
            error.issues.forEach((issue: any) => console.log("Error Data Schema", issue));
        }
        
    }
    catch(error) {
        console.log("Error:", error);
    }
}

export async function getPostById(postID: Post['id']) {
    try {
        const respuesta: RespuestaAPI = await api.get(`/posts/${postID}`);

        if( respuesta.data.success ) {
            const {success, data, error } = PostSchema.safeParse(respuesta.data.data);
            if( success ) {
                return data;
            }
            error.issues.forEach((issue: any) => console.log("Error Data Schema", issue));
        }
        
    }
    catch(error) {
        console.log("Error:", error);
    }
}

export async function editPost(post: Post): Promise<AxiosResponse<RespuestaAPI> | undefined> {
    try {
        const respuesta = await api.put(`/posts/edit-post/${post.id}`, { 
            title: post.title,
            category: post.category,
            excerpt: post.excerpt,
            content: post.content 
        });
        return respuesta;        
    }
    catch(error) {
        console.log("Error:", error);
    }
}

export async function deletePost({postID, password}: DeletePostFormData ): Promise<AxiosResponse<RespuestaAPI> | undefined> {
    try {
        const respuesta = await api.post(`/posts/delete-post/${postID}`, { password });
        return respuesta;        
    }
    catch(error) {
        console.log("Error:", error);
    }
}

export async function registerLikePost(postID: Post['id']): Promise<AxiosResponse<RespuestaAPI> | undefined> {
    try {
        const respuesta = await api.post(`/posts/like-post/${postID}`);
        return respuesta;        
    }
    catch(error) {
        console.log("Error:", error);
    }
}

export async function registerViewPost(postID: Post['id']): Promise<AxiosResponse<RespuestaAPI> | undefined> {
    try {
        const respuesta = await api.put(`/posts/views-post/${postID}`);
        return respuesta;        
    }
    catch(error) {
        console.log("Error:", error);
    }
}

export async function createComment(formData: CommentFormData): Promise<AxiosResponse<RespuestaAPI> | undefined> {
    try {
        const respuesta = await api.post("/comments/create-comment", formData);
        return respuesta;        
    }
    catch(error) {
        console.log("Error:", error);
    }
}

export async function deleteComment(id: Comment["id"]): Promise<AxiosResponse<RespuestaAPI> | undefined> {
    try {
        const respuesta = await api.delete(`/comments/delete-comment/${id}`);
        return respuesta;        
    }
    catch(error) {
        console.log("Error:", error);
    }
}

export async function searchPosts({title, author, category}:{title?:string, author?:string, category?:string}) {
    try {
        const filtros: any = {};
        if( title ) filtros.title = title;
        if( author ) filtros.author = author;
        if( category ) filtros.category = category;

        const respuesta = await api.get("/posts/search", {
            params: filtros,
        });

        if( respuesta.data.success ) {
            const {success, data, error } = PostsSchema.safeParse(respuesta.data.data);
            if( success ) {
                return data;
            }
            error.issues.forEach((issue: any) => console.log("Error Data Schema", issue));
        }    
    }
    catch(error) {
        console.log("Error:", error);
    }
}

export async function getFeed() {
    try {
        const respuesta: RespuestaAPI = await api.get("/posts/get-feed");
        
        if( respuesta.data.success ) {
            const {success, data, error } = PostsSchema.safeParse(respuesta.data.data);
            if( success ) {
                return data;
            }
            error.issues.forEach((issue: any) => console.log("Error Data Schema", issue));
        }       
    }
    catch(error) {
        console.log("Error:", error);
    }
}