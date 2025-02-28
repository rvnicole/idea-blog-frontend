import { UserIcon } from "@heroicons/react/24/solid";
import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
    attributes?: InputHTMLAttributes<HTMLInputElement>;
}

type BotonProps = {
    attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
    children?: ReactNode;
    values: { title: string, quantity: number };
}

export function BotonSubmit({ attributes }: InputProps) {
    return (
        <input 
            className='w-full p-2 rounded-lg bg-indigo-400  text-white font-bold cursor-pointer hover:bg-amber-400 transition-colors ease-in duration-500'
            type="submit"
            {...attributes}
        /> 
    )
}

export function BotonPrimario({ attributes, children }: Pick<BotonProps, "attributes"|"children">) {
    return (
        <button 
            className='w-full p-2 rounded-lg bg-indigo-400  text-white font-bold cursor-pointer hover:bg-amber-400 transition-colors ease-in duration-500'
            {...attributes}
        >
            {children}
        </button> 
    )
}

export function BotonSeguidor({ attributes, values }: Pick<BotonProps, "attributes"|"values">) {
    return (
        <button
            className="flex items-center gap-1 py-1 px-2 border border-indigo-100 dark:border-zinc-800 rounded-full hover:scale-105 hover:border-indigo-500"
            {...attributes}
        >
            <span className="flex items-center text-sm font-semibold">
                {values.quantity}
                <UserIcon className="size-3"/>
            </span>
            <span className="text-sm font-semibold">{values.title}</span>
        </button>
    )
}