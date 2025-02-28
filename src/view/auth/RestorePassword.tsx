import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import EditPassword from "../../components/forms/EditPassword";
import { BotonPrimario, BotonSubmit } from "../../components/ui/Botones";
import { sendTokenRestorePassword, validateToken } from "../../api/AuthAPI";
import { toast } from "react-toastify";


export default function RestorePassword() {
    const { register, handleSubmit, formState:{ errors }, watch } = useForm<{email: string}>();
    const [token, setToken] = useState("");
    const [sendEmail, setSendEmail] = useState(false);
    const [confirmUser, setConfirmUser] = useState(false);
    const emailValue = watch("email");
    const navigate = useNavigate();

    const handleChange = (value: string) => {
        setToken(value);
    }

    const handleComplete = async (value: string) => {
        const respuesta = await validateToken({ email: emailValue, token: value });

        if( respuesta?.data.success ) {
            toast.success(respuesta.data.message);
            setConfirmUser(true);
            return;
        }
        else {
            if(respuesta?.data.message) {
                toast.error(respuesta.data.message);
                setToken("");
                return;
            }
            toast.error("Ops! Algo salio mal, intentalo nuevamente");            
        }
    }

    const handleRenviarToken = async () => {
        const respuesta = await sendTokenRestorePassword({email: emailValue});
        
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

    const handleEnviarToken = async (formData: {email: string}) => {
        const respuesta = await sendTokenRestorePassword(formData);
        
        if( respuesta?.data.success ) {
            toast.success(respuesta.data.message);
            setSendEmail(true);
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
            <h2 className="font-bold text-lg text-center mb-2">Restablecer Contraseña</h2>   
                { sendEmail ?
                    confirmUser ? 
                        <>
                            <p className="font-semibold text-slate-500">Te enviaremos un código para restablecer tu contraseña.</p>
                            <EditPassword email={emailValue} afterOperation={() => navigate("/auth/login")} />
                        </>
                        :
                        <>
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

                            <BotonPrimario attributes={{ onClick: handleRenviarToken }}>
                                    Enviarme otro código
                            </BotonPrimario>
                        </>
                    : 
                    <>
                        <p className="font-semibold text-slate-500">Te enviaremos un código para restablecer tu contraseña.</p>
                        <form
                            onSubmit={handleSubmit(handleEnviarToken)}
                            className="space-y-4 mt-3"
                        >
                            <label className="flex flex-col gap-1 font-semibold text-left">E-mail:
                                <input
                                    className={`w-full font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.email && "outline-red-500"}`}
                                    id="email"
                                    type="email"
                                    placeholder="E-mail"
                                    {...register("email", { required: true })}
                                />
                            </label>

                            <BotonSubmit attributes={{ value:"Enviarme un código" }} />   
                        </form>
                    </>
                }
            </div>
        </div>
    )
}