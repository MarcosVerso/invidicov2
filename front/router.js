import { Auth } from "./auth.js";
import { Header } from "./components/header.js";
import { Sidebar } from "./components/sidebar.js";

export class Router {
    constructor() {
        this.routes = {};
        this.mainContainer = document.getElementById("main");

        //const user = Auth.isValid();
        //console.log(user);
        //document.querySelector("header").innerHTML = Header(user.user).innerHTML;

        window.addEventListener("popstate", ()=> this.handleRouting());
    }

    addRoute(path, handler, ...levels) {
        if(levels.length === 0)
            levels = [0];
        this.routes[path] = {component: handler, levels};
        console.log(this.routes[path]);
    }

    navigate(path) {
        window.history.pushState({}, "", path);
        this.handleRouting();
    }

    async handleRouting(){
        this.mainContainer.innerHTML = 'Cargando...';
        const path = window.location.pathname;
        const route = this.routes[path];

        if(!route){
            this.mainContainer.innerHTML = "<h1>404 - Not Found</h1>";
            return;
        }

        let userData = null;
        const nivelMaximo = Math.max(...route.levels);
        if(nivelMaximo > 0){
            const authStatus = await Auth.isValid();
            //console.log(authStatus);
            if(!authStatus.valid){
                console.error("Token invalido o expirado");
                Auth.logout();
                return;
            }

            userData = authStatus.user;

            console.log(route.levels);
            //console.log(userData.roles);
            //aqui deberia chequear el nivel de cada uno de los cargos del usuario
            
            const tienePermiso = userData.roles.some(rol => 
                route.levels.includes(Number(rol.nivel_acceso))
            );
            if(!tienePermiso){
                console.error("Acceso denegado: nivel insuficiente");
                this.mainContainer.innerHTML = "<h1>403 - No tienes permiso para ver esto</h1>";
                return;
            }
        }

        //this.mainContainer.innerHTML = '';
        route.component(this.mainContainer, userData);
    }
}

/*export async function handleRouting(){
    const path = window.location.pathname;
    if(path==="/dashboard"){
        
        const autenticado = await Auth.isValid();

        if(!autenticado){
            console.error("Token invalido o expirado");
            Auth.logout();
            return;
        }
    }

    if(path==='/login'){
        const main = document.getElementById("main");
        main.innerHTML = `
            <h1>Login</h1>
            <form id="loginForm">
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" required>
                <br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <br>
                <button type="submit">Login</button>
            </form>
        `;

        document.getElementById("loginForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try{
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if(data.success){
                    Auth.login();
                }else{
                    alert("Login failed: " + data.error);
                }
            }catch(error){
                alert("An error occurred: " + error.message);
            }
        });
    }
}
*/