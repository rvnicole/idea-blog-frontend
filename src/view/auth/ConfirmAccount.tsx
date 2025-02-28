import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { confirmAccount, generateNewToken } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BotonPrimario } from "../../components/ui/Botones";

export default function ConfirmAccount() {
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    const id = parseInt(params.id!);

    const handleChange = (value: string) => {
        setToken(value);
    }

    const handleComplete = async (value: string) => {
        const respuesta = await confirmAccount({ token: value, id });

        if( respuesta?.data.success ) {
            toast.success(respuesta.data.message);
            navigate("/auth/login");
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

    const handleClick = async () => {
        setToken("");
        const respuesta = await generateNewToken({ id });

        if( respuesta?.data.success ) {
            toast.success(respuesta.data.message);
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

    return (
        <div className="w-full">
            <div className="flex flex-col w-96 m-auto p-5 bg-slate-50 dark:bg-zinc-800 border-2 border-indigo-100 dark:border-zinc-800 shadow-lg shadow-indigo-50 dark:shadow-zinc-950 rounded-xl">
                <h2 className="font-bold text-lg text-center mb-2">Confirma tu Cuenta</h2>
                <p className="font-semibold text-slate-500">Ingresa el código que recibiste por e-mail</p>
            
                <div className="flex gap-2 justify-center py-10">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 text-center align-middle bg-indigo-100 dark:bg-zinc-900 text-sm placeholder-indigo-100 dark:placeholder-zinc-900 outline-indigo-600 rounded-lg" />
                        <PinInputField className="w-10 h-10 p-3 text-center align-middle bg-indigo-100 dark:bg-zinc-900 text-sm placeholder-indigo-100 dark:placeholder-zinc-900 outline-indigo-600 rounded-lg" />
                        <PinInputField className="w-10 h-10 p-3 text-center align-middle bg-indigo-100 dark:bg-zinc-900 text-sm placeholder-indigo-100 dark:placeholder-zinc-900 outline-indigo-600 rounded-lg" />
                        <PinInputField className="w-10 h-10 p-3 text-center align-middle bg-indigo-100 dark:bg-zinc-900 text-sm placeholder-indigo-100 dark:placeholder-zinc-900 outline-indigo-600 rounded-lg" />
                        <PinInputField className="w-10 h-10 p-3 text-center align-middle bg-indigo-100 dark:bg-zinc-900 text-sm placeholder-indigo-100 dark:placeholder-zinc-900 outline-indigo-600 rounded-lg" />
                        <PinInputField className="w-10 h-10 p-3 text-center align-middle bg-indigo-100 dark:bg-zinc-900 text-sm placeholder-indigo-100 dark:placeholder-zinc-900 outline-indigo-600 rounded-lg" />
                    </PinInput>
                </div>

                <BotonPrimario attributes={{ onClick: handleClick }}>
                        Enviarme otro código
                </BotonPrimario>
            </div>
        </div>
    )
}