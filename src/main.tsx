import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)


document.addEventListener("DOMContentLoaded", () => {
  const mode = localStorage.getItem("ideaBlogMode");
  const body = document.querySelector("body")!;

  if ( mode === "dark" ) {
    body.classList.add("dark");
  }
});