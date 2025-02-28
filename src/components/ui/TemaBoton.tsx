import { MouseEvent } from "react";

export default function TemaBoton() {
    const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();

        const body = document.querySelector("body")!;
        const isDarkMode = body.classList.contains("dark");
        if( isDarkMode ) {
            body.classList.remove("dark");
            localStorage.setItem("ideaBlogMode", "light");
        }
        else {
            body.classList.add("dark");
            localStorage.setItem("ideaBlogMode", "dark");
        }
    }
    
    return (
        <button className="p-2 hover:opacity-85" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                <path fill="rgb(100 116 139)" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-1.5v-17a8.5 8.5 0 0 1 0 17"/>
            </svg>
        </button>
    )
}