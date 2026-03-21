import { CargarUI } from "./app.js";
import { Auth } from "./auth.js";
import { AppComponent } from "./components/AppComponent.js";
import { Router } from "./router.js";
import * as Views from "./views/index.js";

//document.addEventListener("DOMContentLoaded", async ()=>{
CargarUI();
const router = new Router();
window.router = router;
router.addRoute("/dashboard", new Views.DashboardComponent(), 1,2,3,4);
router.addRoute("/login", new Views.LoginView(), 0);
router.addRoute("/clientes", Views.ClientesComponent, 1,2,3,4);
router.addRoute("/proyectos", new Views.ProyectosComponent(), 1,2,3,4);


router.handleRouting();
//});
/*router.addRoute("/dashboard", (container, user)=>{
    alert("asd");
    Auth.isValid();
    container.innerHTML = `
        <h1>Bienvenido al Dashboard</h1>
        <p>Usuario: ${user.nombre}</p>
        
    `
}, 1,5);

router.addRoute("/login", (container)=>{
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
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json();
            console.log(data);
            if(data.success){
                Auth.login(data.token);
            }else{
                alert(data.error);
            }
        }catch(error){
            console.error("Error en el login:", error);
            alert("Error en el login");
        }
    });
    });

    router.handleRouting();
//});



*/