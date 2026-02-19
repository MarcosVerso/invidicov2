//import { router } from "../index.js";
import { Auth } from "../auth";

export function login(container){
    container.innerHTML = `
        <h1>Login</h1>
        <form id="loginForm">
            <input type="text" id="email" placeholder="correo" required>
            <input type="password" id="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
    `;

const form = document.getElementById("loginForm");
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const data = await Auth.login(email, password);
        console.log(data);
        if(data.success){
            //await Auth.login(email, password);
            window.router.navigate("/dashboard");
        }else{
            alert(data.error);
        }
    }catch(error){
        console.error("Error en el login:", error);
        alert("Error en el login");
    }
});

//router.handleRouting();
}