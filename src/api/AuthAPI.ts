import api from "../lib/axios";
import { AxiosResponse } from "axios";
import { 
    AccountFormData,
    EditPassFormData,
    LoginFormData, 
    NewAccountFormData, 
    RespuestaAPI 
} from "../types";

export async function createAccount(formData: NewAccountFormData): Promise<AxiosResponse<RespuestaAPI> | undefined>  {
    try {
        const respuesta = await api.post("/auth/create-account", formData);
        return respuesta;
    }
    catch(error: any) {
        if (error.response) {
            return error.response;
        }

        console.log("Error:", error);
    }
}

export async function confirmAccount(formData: { token: string, id: number }): Promise<AxiosResponse<RespuestaAPI> | undefined>  {
    try {
        const respuesta = await api.put("/auth/confirm-account", formData);
        return respuesta;
    }
    catch(error: any) {
        if (error.response) {
            return error.response;
        }

        console.log("Error:", error);
    }
}


export async function generateNewToken(formData: {id: number}): Promise<AxiosResponse<RespuestaAPI> | undefined>  {
    try {
        const respuesta = await api.post("/auth/new-token", formData);
        return respuesta;
    }
    catch(error: any) {
        if (error.response) {
            return error.response;
        }

        console.log("Error:", error);
    }
}

export async function authenticateUser(formData: LoginFormData) {
    try {
        const respuesta = await api.post("/auth/login", formData);
        localStorage.setItem("AUTH_TOKEN", respuesta.data);
    }
    catch(error: any) {
        if (error.response) {
            return error.response;
        }

        console.log("Error:", error);
    }
}

export async function getUser(): Promise<AxiosResponse<RespuestaAPI> | undefined>  {
    try {
        const respuesta = await api.get("/auth/user");
        return respuesta;
    }
    catch(error: any) {
        if (error.response) {
            return error.response;
        }

        console.log("Error:", error);
    }
}

export async function editAccount(formData: AccountFormData): Promise<AxiosResponse<RespuestaAPI> | undefined>  {
    try {
        const respuesta = await api.put("/auth/edit-account", formData);
        return respuesta;
    }
    catch(error: any) {
        if (error.response) {
            return error.response;
        }

        console.log("Error:", error);
    }
}

export async function sendTokenRestorePassword(formData: {email: string}): Promise<AxiosResponse<RespuestaAPI> | undefined>  {
    try {
        const respuesta = await api.post("/auth/send-token", formData);
        return respuesta;
    }
    catch(error: any) {
        if (error.response) {
            return error.response;
        }

        console.log("Error:", error);
    }
}

export async function validateToken(formData: {email: string, token: string}): Promise<AxiosResponse<RespuestaAPI> | undefined>  {
    try {
        const respuesta = await api.put("/auth/validate-token", formData);
        return respuesta;
    }
    catch(error: any) {
        if (error.response) {
            return error.response;
        }

        console.log("Error:", error);
    }
}

export async function editPassword(formData: EditPassFormData): Promise<AxiosResponse<RespuestaAPI> | undefined>  {
    try {
        const respuesta = await api.put("/auth/edit-password", formData);
        return respuesta;
    }
    catch(error: any) {
        if (error.response) {
            return error.response;
        }

        console.log("Error:", error);
    }
}