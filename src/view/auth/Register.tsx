import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { NewAccountFormData } from "../../types";
import { toast } from "react-toastify";
import { createAccount } from "../../api/AuthAPI";
import { BotonSubmit } from "../../components/ui/Botones";

export default  function Register() {
    const { register, handleSubmit, formState:{ errors }, reset} = useForm<NewAccountFormData>();
    const navigate = useNavigate();

    const handleCreateAccount = async (formData: NewAccountFormData) => {
        if(formData.password.length < 8 ) {
            toast.error("La contraseñas debe contener 8 caracteres como minimo");
            return;
        }

        if(formData.password !== formData.confirm_password) {
            toast.error("Las contraseñas no son iguales");
            return;
        }

        const respuesta = await createAccount(formData);
        
        if(respuesta?.data.success) {
            toast.success(respuesta?.data.message);
            reset();
            navigate(`/auth/confirm-account/${respuesta.data.data.user}`);
            return;
        } else if(respuesta?.data.message) {
            toast.error(respuesta?.data.message);
            return;
        }

        toast.error("Ops! Algo salio mal, intentalo nuevamente");
    }

    return (
        <div className="w-full md:w-[95vw] lg:w-[70vw] md:h-screen xl:h-[80%] p-5 md:p-0 flex justify-center">
            <div className="md:h-[85%] flex bg-slate-50 dark:bg-zinc-800 border-2 border-indigo-100 dark:border-zinc-800 shadow-lg shadow-indigo-50 dark:shadow-zinc-950 rounded-xl">
                <div className="hidden md:flex w-1/2 justify-center items-center bg-gradient-to-br from-indigo-200 to-indigo-500 rounded-xl">
                    <img src="/register.png" className="size-80 object-cover"/>
                </div>
                
                <div className="p-5">
                    <h2 className="font-bold text-lg text-center mb-2">Crea una cuenta</h2>
                    <form 
                        onSubmit={handleSubmit(handleCreateAccount)}
                        className="md:h-[80%] flex flex-col justify-between gap-4 rounded-lg"
                    >
                        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:max-h-[300px] md:overflow-y-auto p-2">
                            <label className="flex flex-col gap-1 font-semibold">Nombre(s):
                                <input 
                                    className={`w-full font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.name && "outline-red-500"}`} 
                                    id="name"
                                    type="text"
                                    placeholder="Nombre(s)"
                                    {...register("name", { required: true })}
                                />
                            </label>

                            <label className="flex flex-col gap-1 font-semibold">Apellidos:
                                <input 
                                    className={`w-full font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.lastname && "outline-red-500"}`}
                                    id="lastname"
                                    type="text"
                                    placeholder="Apellidos"
                                    {...register("lastname", { required: true })}
                                />
                            </label>

                            <label className="col-span-2 flex flex-col gap-1 font-semibold">E-mail:
                                <input 
                                    className={`w-full font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.email && "outline-red-500"}`}
                                    id="email"
                                    type="email"
                                    placeholder="E-mail"
                                    {...register("email", { required: true })}
                                />
                            </label>

                            <label className="flex flex-col gap-1 font-semibold">Contraseña:
                                <input 
                                    className={`w-full font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.password && "outline-red-500"}`}
                                    id="password"
                                    type="password"
                                    minLength={8}
                                    placeholder="Contraseña (min. 8 caracteres)"
                                    {...register("password", { required: true })}
                                />
                            </label>

                            <label className="flex flex-col gap-1 font-semibold">Confirmar Contraseña:
                                <input 
                                    className={`w-full font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.confirm_password && "outline-red-500"}`}
                                    id="confirm_password"
                                    type="password"
                                    minLength={8}
                                    placeholder="Confirmar contraseña"
                                    {...register("confirm_password", { required: true })}
                                />
                            </label>

                            <label className="col-span-2 flex flex-col gap-1 font-semibold">Cuéntanos sobre ti:
                                <span className="text-xs text-slate-500 dark:text-slate-300">Nota: Esta información se mostrará en tu perfil, por lo que cualquier persona que lo visite podrá conocerte un poco mejor.  Procura ser breve.</span>
                                <textarea 
                                    className={`h-48 md:h-40 w-full font-normal bg-indigo-100 dark:bg-zinc-900 text-sm p-2 rounded-lg outline-indigo-600 ${errors.description && "outline-red-500"}`}
                                    id="description"
                                    maxLength={300}
                                    {...register("description", { required: true })}
                                />
                            </label>
                        </div>

                        <BotonSubmit attributes={{ value:"Registrarte" }} />
                    </form>

                    <Link to="/auth/login" className="block font-semibold text-sm text-center m-3 hover:opacity-85">
                        ¿Ya tienes cuenta? Inicia Sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}