import { create } from "zustand";
import { Post, User } from "./types";
import { getUser } from "./api/AuthAPI";
import { getMyPosts } from "./api/PostAPI";

interface AuthStore {
    user: User | null;
    posts: Post[];
    isLoading: boolean;
    isError: boolean;
    getMyUser: () => Promise<void>;
    getPosts: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    posts: [],
    isLoading: true,
    isError: false,
    getMyUser: async () => {
        set({ isLoading: true });

        try {
            const respuesta = await getUser();
            if (respuesta?.data.success) {
                set({ user: respuesta.data.data, isLoading: false });
                return;
            }
        } 
        catch (error) {
            console.error("Error al obtener usuario:", error);
        }

        set({ user: null, isError: true, isLoading: false });
    },  
    getPosts: async () => {
        try {
            const respuesta = await getMyPosts();
            if (respuesta) {
                set({ posts: respuesta });
            }
        } 
        catch (error) {
            console.error("Error al obtener posts:", error);
        }
    },
}));