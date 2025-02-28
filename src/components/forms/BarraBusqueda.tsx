import { ChangeEvent, useState, useRef, useEffect, FormEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { categorias } from "../../locales/data";
import { useNavigate } from "react-router-dom";

export function BarraBusqueda() {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState("title");
    const botonBuscar = useRef<HTMLButtonElement>(null);
    const inputQuery = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if( categorias[e.target.value]) {
            setSelected("category");
            setQuery(e.target.value);            
            return;
        }
        setSelected(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search?${selected}=${query}`);
    }

    useEffect(() => {
        if(selected === "category") {
            if( botonBuscar.current ) {
                if( inputQuery.current) {
                    inputQuery.current.value = "";
                }
                botonBuscar.current.click();
            }
        }
    }, [selected, query]);

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex gap-2 flex-col md:flex-row"
        >
            <select 
                className="w-40 text-sm p-2 outline-indigo-600 bg-indigo-50 dark:bg-zinc-800 rounded-lg"
                onChange={handleChange}
                defaultValue="title"
            >
                <optgroup label="General">
                    <option value="user">Usuario</option>
                </optgroup>
                <optgroup label="Post">
                    <option value="title">Titulo</option>
                    <option value="author">Autor</option>    
                </optgroup>            
                <optgroup label="Categoria">
                    <option value="tecnologia">Tecnología</option> 
                    <option value="creatividad-diseño">Creatividad y Diseño</option> 
                    <option value="educacion-aprendizaje">Educación y Aprendizaje</option> 
                    <option value="estiloVida">Estilo de Vida</option> 
                    <option value="opinion">Opinión</option> 
                    <option value="desarrolloPersonal">Desarrollo Personal</option> 
                    <option value="proyectos">Proyectos</option> 
                    <option value="noticias-actualidad">Noticias y Actualidad</option> 
                    <option value="culturaGeek">Cultura Geek</option> 
                    <option value="otro">Otro</option> 
                </optgroup>
            </select>

            <input
                ref={inputQuery}
                className="w-40 md:w-80 bg-indigo-50 dark:bg-zinc-800 text-sm p-2 rounded-lg outline-indigo-600" 
                placeholder="Buscar..."
                type="text"
                onChange={e => setQuery(e.target.value)}
                required = { selected !== "category" }
            />

            <button 
                type="submit"
                ref={botonBuscar} 
                className="absolute right-2 top-[52px] md:right-2 md:top-2 bg-indigo-50 dark:bg-zinc-800"
            >
                <MagnifyingGlassIcon className="size-5 text-indigo-600 hover:scale-105"/>
            </button>
        </form>
    )
} 