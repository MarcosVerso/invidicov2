import { Auth } from "../auth";

export function Header(){
    const header = document.createElement("header");
    header.innerHTML = `<h1>Invidico</h1><div id="auth-zone">Cargando...</div>`;

    const updateUI = async ()=>{
        const authStatus = await Auth.isValid();
        const authZone = header.querySelector("#auth-zone");
        //alert(authStatus.valid);
        if(authStatus.valid){
            authZone.innerHTML = `
                <div class="user-info">
                    <span>Hola, <strong>${authStatus.user.nombre}</strong></span>
                    <button id="logout">Cerrar Sesión</button>
                </div>
            `;
            document.getElementById("logout").addEventListener("click", ()=>{
                Auth.logout();
            }  );
        }else{
            authZone.innerHTML = `
            <button onclick="window.router.navigate('/login')">Iniciar sesión</button>
            `;
        }
    };

    window.addEventListener("authStateChanged", updateUI);
    updateUI();
    /*const authContent = userData ? `
        <div class="user-info">
            <span>Hola, <strong>${userData.email}</strong></span>
            <button id="logoutBtn">Cerrar Sesión</button>
        </div
    ` : `<button onclick="window.router.navigate('/login')">Iniciar sesion</button>`;

    header.innerHTML = `
        <h1 onclick="window.router.navigate('/dashboard')" style="cursor: pointer">Invidico</h1>
        <nav id="header-nav">
            ${authContent}
        </nav>
    `*/

    return header;
}