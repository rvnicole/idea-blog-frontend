import { useForm } from "react-hook-form";
import { EditPassFormData, User } from "../../types";
import { BotonSubmit } from "../ui/Botones";
import { editPassword } from "../../api/AuthAPI";
import { toast } from "react-toastify";

type EditPasswordProps = {
    email: User["email"];
    afterOperation?: () => void | Promise<void>;
}

export default function EditPassword({ email, afterOperation }: EditPasswordProps) {
    const { register, handleSubmit, formState:{ errors } } = useForm<EditPassFormData>({defaultValues: {
        email: email,
        password: "",
        confirm_password: ""
    }});

    const handleEditPassword = async (formData: EditPassFormData) => {
        const respuesta = await editPassword(formData);

        if( respuesta?.data.success ) {
            toast.success(respuesta.data.message);
            if(afterOperation) afterOperation();
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
        <form
            onSubmit={handleSubmit(handleEditPassword)}
            className="space-y-4 mt-3"
        >
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

            <BotonSubmit attributes={{ value:"Enviar" }} />   
        </form>
    )
}