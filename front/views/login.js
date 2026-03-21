//import { router } from "../index.js";
import { Auth } from "../auth.js";
import { BaseComponent } from "../components/BaseComponent.js";
//import { Router } from "../router.js";

export class LoginView extends BaseComponent{
    style(){
        return `
        .login-container {
            max-width: 400px;
            margin: 50px auto;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        form { display: flex; flex-direction: column; gap: 1rem; }
        input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
        button { background: #007bff; color: white; border: none; padding: 0.7rem; cursor: pointer; }
        `;
    }

    html(){
        
        return `
        <div class="login-container">
        <h1>Login</h1>
        <form id="loginForm">
            <input type="text" id="email" placeholder="Correo" required>
            <input type="password" id="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
    </div>
        `;
    }

    afterRender(){
        const form = this.shadowRoot.querySelector("#loginForm");
        //console.log(form);
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;

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
    }
}

customElements.define("login-view", LoginView);

/*export function login(container){
    container.innerHTML = `
        <h1>Login</h1>
        <form id="loginForm">
            <input type="text" id="email" placeholder="correo" required>
            <input type="password" id="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
    `;

const form = container.querySelector("#loginForm");
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;

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
}*/