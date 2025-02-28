import { useForm } from "react-hook-form";
import { BotonSubmit } from "../ui/Botones";
import { AccountFormData, User } from "../../types";
import { editAccount } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store";

type EditUserProps = {
    user: User;
    closeModal: () => void;
}

export default function EditUser({ user, closeModal } : EditUserProps) {
    const { getMyUser } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm<AccountFormData>({
        defaultValues: {
            name: user.name,
            lastname: user.lastname,
            description: user.description
        }
    });

    const handleEditProfile = async (formData: AccountFormData) => {
        const respuesta = await editAccount(formData);

        if( respuesta?.data.success ) {
            closeModal();
            toast.success(respuesta.data.message);
            getMyUser();
            return;
        }
        
        toast.error("Ops! Algo salio mal, intentalo nuevamente"); 
    }

    return (
        <div>
            <h2 className="text-lg font-bold p-1">Editar Perfil</h2>
            <form 
                onSubmit={handleSubmit(handleEditProfile)}
                className='w-full space-y-3'
            >
                <div className='text-left space-y-3 px-3 overflow-y-auto max-h-[70vh]'>
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

                <BotonSubmit attributes={{ value: "Guardar Cambios"}}/>     
            </form>
        </div>
    )
}