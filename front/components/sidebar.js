import { Auth } from "../auth";

export function Sidebar() {
    const aside = document.createElement("aside");
    aside.className = "sidebar";

    

    aside.innerHTML = 'cargando...';

    const cargarUI = async () => {
        const authStatus = await Auth.isValid();
        const nivel = authStatus.valid ? authStatus.user.roles.reduce((maxNivel, rol) => {
            return Math.max(maxNivel, Number(rol.nivel_acceso));
        }, 0) : 0;
    aside.innerHTML = `
        <nav>
            <ul>
                <li onclick="window.router.navigate('/dashboard')">
                    <img src="/icons/resumen.png" alt=""> Resumen
                </li>
                <li onclick="window.router.navigate('/proyectos')">
                    <img src="/icons/folder.png" alt=""> Mis Proyectos
                </li>
                ${nivel >= 3 ? `
                <li onclick="window.router.navigate('/clientes')">
                    <img src="/icons/users.png" alt=""> Clientes
                </li>` : ''}
                ${nivel >= 4 ? `
                <li class="admin-link" onclick="window.router.navigate('/admin')">
                    <img src="/icons/settings.png" alt=""> Configuración
                </li>` : ''}
            </ul>
        </nav>
    `;
    /*aside.style.visibility = authStatus.valid ? "visible" : "hidden";
    if(window.location.pathname === "/login")
        aside.style.visibility = "hidden";*/
    };

    window.addEventListener("authStateChanged", cargarUI);
    cargarUI();

    return aside;
}