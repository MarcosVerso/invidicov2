import { BaseViewComponent } from "./BaseViewComponent.js";

export class DashboardComponent extends BaseViewComponent{
    style(){
        return `
        .stats-grid {
            display: flex;
            gap: 20px;
            margin-top: 20px;
        }
        .card {
            flex: 1;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        .card h3 {
            margin-bottom: 10px;
        }
        .card .number {
            font-size: 2rem;
            font-weight: bold;
            color: #333;
        }
        .card.green .number {
            color: #28a745;
        }
        .card.purple .number {
            color: #6f42c1;
        }
        .recent-activity {
            margin-top: 40px;
        }
        .recent-activity h3 {
            margin-bottom: 20px;
        }
        `;
    }

    html(){
        //if(!this.user) return `<p>Cargando...</p>`;
        return `
            
        <h2>Bienvenido, ${this.user.nombre}</h2>
        <p>Panel de control - ${this.user.roles[0].nombre_cargo}</p>


    <div class="stats-grid">
        <div class="card">
            <h3>Proyectos</h3>
            <span class="number" id="count-proyectos">--</span>
            <p>Total asignados</p>
        </div>
        <div class="card green">
            <h3>Videos</h3>
            <span class="number" id="count-videos">--</span>
            <p>Listos para entrega</p>
        </div>
        <div class="card purple">
            <h3>Diseños</h3>
            <span class="number" id="count-disenos">--</span>
            <p>Pendientes</p>
        </div>
    </div>

    <div class="recent-activity">
        <h3>Actividad Reciente</h3>
        <div id="proyectos-preview">
            <p>Cargando últimos proyectos...</p>
        </div>
    </div>
        `;
    }

    async cargarResumen(userId) {
        // Aquí iría tu fetch a una API tipo /api/proyectos/resumen?id=userId
        //console.log("Cargando datos para el usuario:", userId);
        try {
            const response = await fetch('/api/obtenerEstadisticas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_usuario: userId })
            });
            const stats = await response.json();
    
            // Actualizamos los "---" por valores reales
            // Asumiendo que pusiste IDs a los elementos donde están los guiones
            this.shadowRoot.querySelector('#count-proyectos').innerText = stats.proyectos;
            this.shadowRoot.querySelector('#count-videos').innerText = stats.videos;
            this.shadowRoot.querySelector('#count-disenos').innerText = stats.disenos;
            
        } catch (error) {
            console.error("Error cargando dashboard:", error);
        }
        
        // Aquí también podrías llamar a una función para la "Actividad Reciente"
        //await cargarActividadReciente();
    }

    afterRender(){
        if(this.user && this.user.id){
            this.cargarResumen(this.user.id);
        }
    }
};

customElements.define("dashboard-view", DashboardComponent);

/*export function DashboardComponent(container, user) {
    // Calculamos el nivel máximo para la lógica de la interfaz
    const nivel = user.nivel_acceso;

    container.innerHTML = `
        
                    <h2>Bienvenido, ${user.nombre}</h2>
                    <p>Panel de control - ${user.roles[0].nombre_cargo}</p>
    

                <div class="stats-grid">
                    <div class="card">
                        <h3>Proyectos</h3>
                        <span class="number" id="count-proyectos">--</span>
                        <p>Total asignados</p>
                    </div>
                    <div class="card green">
                        <h3>Videos</h3>
                        <span class="number" id="count-videos">--</span>
                        <p>Listos para entrega</p>
                    </div>
                    <div class="card purple">
                        <h3>Diseños</h3>
                        <span class="number" id="count-disenos">--</span>
                        <p>Pendientes</p>
                    </div>
                </div>

                <div class="recent-activity">
                    <h3>Actividad Reciente</h3>
                    <div id="proyectos-preview">
                        <p>Cargando últimos proyectos...</p>
                    </div>
                </div>
      
    `;

    // Aquí podrías disparar un fetch para llenar los "--" con datos reales
    cargarResumen(user.id);
}

async function cargarResumen(userId) {
    // Aquí iría tu fetch a una API tipo /api/proyectos/resumen?id=userId
    //console.log("Cargando datos para el usuario:", userId);
    try {
        const response = await fetch('/api/obtenerEstadisticas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: userId })
        });
        const stats = await response.json();

        // Actualizamos los "---" por valores reales
        // Asumiendo que pusiste IDs a los elementos donde están los guiones
        document.querySelector('#count-proyectos').innerText = stats.proyectos;
        document.querySelector('#count-videos').innerText = stats.videos;
        document.querySelector('#count-disenos').innerText = stats.disenos;
        
    } catch (error) {
        console.error("Error cargando dashboard:", error);
    }
    
    // Aquí también podrías llamar a una función para la "Actividad Reciente"
    //await cargarActividadReciente();
}*/