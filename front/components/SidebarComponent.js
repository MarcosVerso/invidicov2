import { BaseComponent } from "./BaseComponent.js";
import { Auth } from "../auth.js";

export class SidebarComponent extends BaseComponent {
    constructor() {
        super();
        this.nivel = 0;
        this.visible = true;
    }

    async connectedCallback() {
        super.connectedCallback();
        
        // Escuchar cambios de estado (Login/Logout)
        window.addEventListener("authStateChanged", () => this.cargarUI());
        
        // Carga inicial
        await this.cargarUI();
    }

    async cargarUI() {
        const authStatus = await Auth.isValid();
        
        // Lógica de visibilidad (No mostrar en login o si no hay sesión)
        const isLoginPage = window.location.pathname === "/login";
        //this.visible = authStatus.valid && !isLoginPage;

        if (authStatus.valid) {
            this.nivel = authStatus.user.roles.reduce((maxNivel, rol) => {
                return Math.max(maxNivel, Number(rol.nivel_acceso));
            }, 0);
        } else {
            this.nivel = 0;
        }

        const oldNav = this.shadowRoot.querySelector("nav");
        if (oldNav) oldNav.remove();

        // Creamos un contenedor temporal para convertir el string a DOM
        const temp = document.createElement('div');
        temp.innerHTML = this.html();
        const newNav = temp.querySelector('nav');

        if (newNav) {
            this.shadowRoot.appendChild(newNav);
        }

        //this.render(); // Re-renderiza con el nuevo nivel y visibilidad
    }

    style() {
        return `
            :host {
                display: ${this.visible ? 'block' : 'none'};
                width: 250px;
                background-color: #2c3e50;
                color: white;
                
            }
            nav ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            li {
                padding: 15px 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: background 0.3s;
            }
            li:hover {
                background-color: #34495e;
            }
            li img {
                width: 20px;
                height: 20px;
                
            }
            .admin-link {
                border-top: 1px solid #455a64;
                margin-top: 10px;
            }
        `;
    }

    html() {
        // Si no hay nivel suficiente para ver nada, podrías retornar vacío
        if (!this.visible) return ``;

        return `
            <nav>
                <ul>
                    <li onclick="window.router.navigate('/dashboard')">
                        <img src="/icons/resumen.png" alt=""> Resumen
                    </li>
                    <li onclick="window.router.navigate('/proyectos')">
                        <img src="/icons/folder.png" alt=""> Mis Proyectos
                    </li>
                    
                    ${this.nivel >= 3 ? `
                    <li onclick="window.router.navigate('/clientes')">
                        <img src="/icons/users.png" alt=""> Clientes
                    </li>` : ''}
                    
                    ${this.nivel >= 4 ? `
                    <li class="admin-link" onclick="window.router.navigate('/admin')">
                        <img src="/icons/settings.png" alt=""> Configuración
                    </li>` : ''}
                </ul>
            </nav>
        `;
    }
    
}

customElements.define("app-sidebar", SidebarComponent);