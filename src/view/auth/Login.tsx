import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginFormData } from "../../types";
import { authenticateUser } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { BotonSubmit } from "../../components/ui/Botones";

export default function Login() {
    const { register, handleSubmit, formState:{ errors } } = useForm<LoginFormData>();
    const navigate = useNavigate();

    const handleLogin = async (formData: LoginFormData) => {
        const respuesta = await authenticateUser(formData);
        
        if(respuesta) {
            if(respuesta?.data.message) {
                toast.error(respuesta.data.message);
                return;
            }
            toast.error("Ops! Algo salio mal, intentalo nuevamente"); 
            return;           
        }

        navigate(0);
    } 

    return (
        <div className="w-full md:w-[70vw] md:h-screen flex justify-center p-5 md:p-0">
            <div className="md:h-[85%] flex bg-slate-50 dark:bg-zinc-800 border-2 border-indigo-100 dark:border-zinc-800 shadow-lg shadow-indigo-50 dark:shadow-zinc-950 rounded-xl">
                <div className="md:h-[85%] w-80 p-5 space-y-4 text-center rounded-xl">
                    <h2 className="font-bold text-lg ">Iniciar Sesión</h2>
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="space-y-4"
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

                        <label className="flex flex-col gap-1 font-semibold text-left">Contraseña:
                            <input
                                className={`w-full font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.password && "outline-red-500"}`}
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                                {...register("password", { required: true })}
                            />
                        </label>

                        <BotonSubmit attributes={{ value:"Iniciar" }} />   
                    </form>

                    <Link to="/auth/restore-password" className="block font-semibold text-sm text-center m-3 hover:opacity-85">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <Link to="/auth/register" className="block font-semibold text-sm text-center m-3 hover:opacity-85">
                        Crear una cuenta
                    </Link>
                </div>

                <div className="hidden md:flex w-80 justify-center items-center bg-gradient-to-br from-amber-200 to-amber-500 rounded-xl">
                    <img src="/login.png" className="h-full object-cover"/>
                </div>
            </div>
        </div>
    )
}