import { Auth } from "./auth.js";

export async function handleRouting(){
    const path = window.location.pathname;
    if(path==="/dashboard"){
        /*solo para pruebas por los momentos*/
        const response = await fetch("/api/marico", {
            method: "GET"
        });
        const data = await response.json();
        console.log(data);
        const autenticado = await Auth.isValid();

        if(!autenticado){
            console.error("Token invalido o expirado");
            return;
        }
    }
}