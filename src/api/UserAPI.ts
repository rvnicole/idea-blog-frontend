import { AxiosResponse } from "axios";
import api from "../lib/axios";
import { UserSchema, UsersSchema } from "../schemas";
import { RespuestaAPI } from "../types";

export async function getUserById(userID: number)  {
    try {
        const respuesta: RespuestaAPI = await api.get(`/user/get-user/${userID}`);
        console.log(respuesta.data);

        if( respuesta.data.success ) {
            const {success, data, error } = UserSchema.safeParse(respuesta.data.data);
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

export async function searchUsers(user: string) {
    try {
        const respuesta = await api.get("/user/search", {
            params: { user },
        });

        if( respuesta.data.success ) {
            const {success, data, error } = UsersSchema.safeParse(respuesta.data.data);
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

export async function registerFollowed(followedID: number): Promise<AxiosResponse<RespuestaAPI> | undefined> {
    try {
        const respuesta = await api.post(`/user/followed/${followedID}`);
        return respuesta;        
    }
    catch(error: any) {
        if (error.response) {
            return error.response;
        }

        console.log("Error:", error);
    }
}