import { Modal } from "../components/modal/modal.js";
import { Pagination } from "../components/pagination.js";

let paginaActual = 1;

export function ProyectosComponent(container, user) {
    const maximoNivel = user.maximo_acceso;
    
    container.innerHTML = `
        <div class="content-wrapper">
            <div class="section-header">
                <h2>Gestión de Proyectos</h2>
                ${maximoNivel >= 3 ? `<button id="btnNuevoProyecto" class="btn-primary">+ Nuevo Proyecto</button>` : ''}
            </div>

            <div id="form-container" class="hidden">
                <form id="proyectoForm" class="card">
                    <div class="form-grid">
                        <input type="text" id="nombreProyecto" placeholder="Nombre del Proyecto" required>
                        <select id="selectCliente" required>
                            <option value="">Seleccione un Cliente...</option>
                        </select>
                        <input type="date" id="fechaEntrega" required>
                    </div>
                    <div class="form-grid mt-10">
                        <input type="number" id="disenosAsignados" placeholder="Diseños Asignados" min="0" value="0">
                        <input type="number" id="videosAsignados" placeholder="Videos Asignados" min="0" value="0">
                    </div>
                    <div class="form-actions mt-10">
                        <button type="submit" class="btn-save">Guardar Proyecto</button>
                        <button type="button" class="btn-cancel" onclick="document.getElementById('form-container').classList.add('hidden')">Cancelar</button>
                    </div>
                </form>
            </div>

            <div class="card mt-20">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Proyecto</th>
                            <th>Cliente</th>
                            ${maximoNivel >= 3 ? '<th>Miembros</th>' : ''}
                            <th>Progreso Total</th>
                            <th>Entrega</th>
                            ${maximoNivel >= 3 ? '<th>Acciones</th>' : ''}
                        </tr>
                    </thead>
                    <tbody id="lista-proyectos">
                        <tr><td colspan="5">Cargando proyectos...</td></tr>
                    </tbody>
                </table>
                <div id="paginacion-proyectos"></div>
            </div>
        </div>
    `;

    // Lógica para mostrar formulario y cargar clientes para el select
    const btnNuevo = document.getElementById("btnNuevoProyecto");
    if (btnNuevo) {
        btnNuevo.onclick = async () => {
            document.getElementById('form-container').classList.remove('hidden');
            await cargarClientesSelect();
        };
    }

    // Evento Guardar
    document.getElementById('proyectoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const proyectoData = {
            nombre_proyecto: document.getElementById('nombreProyecto').value,
            id_cliente: document.getElementById('selectCliente').value,
            fecha_destino: document.getElementById('fechaEntrega').value,
            diseños_asignados: document.getElementById('disenosAsignados').value,
            videos_asignados: document.getElementById('videosAsignados').value
        };

        const response = await fetch('/api/insertarProyecto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proyectoData)
        });

        const data = await response.json();
        if (!data.error) {
            document.getElementById('proyectoForm').reset();
            document.getElementById('form-container').classList.add('hidden');
            renderProyectos(user);
        } else {
            alert("Error: " + data.error);
        }
    });

    renderProyectos(user);
}

async function cargarClientesSelect() {
    const select = document.getElementById("selectCliente");
    // Usamos tu API de clientes pero con porPagina 0 para traer todos
    const response = await fetch('/api/obtenerClientes', {
        method: 'POST',
        body: JSON.stringify({})
    });
    const data = await response.json();
    
    select.innerHTML = '<option value="">Seleccione un Cliente...</option>' + 
        data.clientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
}

async function renderProyectos(user) {
    const tbody = document.getElementById("lista-proyectos");
    const containerPaginacion = document.getElementById("paginacion-proyectos");

    const response = await fetch('/api/obtenerProyectos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pagina: paginaActual, porPagina: 5 })
    });

    const { proyectos, totalPaginas } = await response.json();

    tbody.innerHTML = '';
    proyectos.forEach(p => {
        // Cálculo de progreso
        const asignados = (parseInt(p.disenos_asignados) || 0) + (parseInt(p.videos_asignados) || 0);
        const listos = (parseInt(p.disenos_listos) || 0) + (parseInt(p.videos_listos) || 0);
        const porcentaje = asignados > 0 ? Math.round((listos / asignados) * 100) : 0;
        
        // Color de la barra según porcentaje
        const colorBarra = porcentaje === 100 ? '#10b981' : (porcentaje > 50 ? '#3b82f6' : '#f59e0b');

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${p.nombre_proyecto}</strong></td>
            <td><span class="badge-cliente">${p.nombre}</span></td>
            <td><span class="badge-miembros">${p.miembros || "Ninguno"}</span></td>
            <td>
                <div class="progress-wrapper">
                    <div class="progress-bg">
                        <div class="progress-fill" style="width: ${porcentaje}%; background-color: ${colorBarra}"></div>
                    </div>
                    <span class="progress-text">${porcentaje}%</span>
                </div>
                <small class="progress-sub">${listos} de ${asignados} tareas</small>
            </td>
            <td>${p.fecha_destino}</td>
            ${user.maximo_acceso >= 3 ? `
            <td>
                <button class="btn-icon btn-edit">✏️</button>
                <button class="btn-icon btn-delete">🗑️</button>
            </td>` : ''}
        `;
        tbody.appendChild(tr);

        if (user.maximo_acceso >= 3) {
            tr.querySelector('.btn-delete').onclick = async () => {
                if(confirm('¿Borrar proyecto?')) {
                    await fetch('/api/eliminarProyecto', { 
                        method: 'POST', 
                        body: JSON.stringify({id: p.id}) 
                    });
                    renderProyectos(user);
                }
            };

            tr.querySelector('.btn-edit').onclick = async () => {
                // Aquí podrías implementar la lógica para editar el proyecto
                //alert('Funcionalidad de edición no implementada aún.');
                Modal(`Proyecto ${p.nombre_proyecto}`, 
                    await obtenerContenidoGestionEquipo(p));
                
                const inputBusqueda = document.getElementById('busquedaUsuario');
                const resultados = document.getElementById('resultadosBusqueda');
                const listaMiembros = document.getElementById('listaMiembros');

                const renderMiembros = (miembros) => {
                    listaMiembros.innerHTML = miembros.map(m => `
                        <div class="pill">
                            ${m.nombre} <small>(${m.rol})</small>
                            <button onclick="eliminarMiembro(${m.id})">&times;</button>
                        </div>
                    `).join('');
                };

                inputBusqueda.oninput = async (e) => {
                    const query = e.target.value;
                    if (query.length < 2) { resultados.innerHTML = ''; return; }
            
                    // Fetch a tu API de usuarios
                    const resp = await fetch('/api/buscarUsuarios', {
                        method: 'POST',
                        body: JSON.stringify({ busqueda: query })
                    });
                    const users = await resp.json();
            
                    resultados.innerHTML = users.map(u => `
                        <div class="search-item" data-id="${u.id}" data-nombre="${u.nombre}">
                            ${u.nombre} - <span class="text-muted">${u.rol}</span>
                        </div>
                    `).join('');
                };
            
                // Evento al elegir un usuario de la búsqueda
                resultados.onclick = async (e) => {
                    const item = e.target.closest('.search-item');
                    if (item) {
                        const idUsuario = item.dataset.id;
                        // Llamada a tu API para asignar
                        await fetch('/api/asignarProyecto', {
                            method: 'POST',
                            body: JSON.stringify({ id_proyecto: p.id, id_usuario: idUsuario })
                        });
                        
                        alert('Usuario asignado');
                        inputBusqueda.value = '';
                        resultados.innerHTML = '';
                        // Aquí deberías refrescar la lista de miembros
                    }
                };
            };
        }
    });

    containerPaginacion.innerHTML = '';
    if(totalPaginas > 1) {
        containerPaginacion.appendChild(Pagination(totalPaginas, paginaActual, (n) => {
            paginaActual = n;
            renderProyectos(user);
        }));
    }
}

// Función auxiliar para generar el contenido del equipo
async function obtenerContenidoGestionEquipo(proyecto) {
    const response = await fetch('/api/obtenerMiembrosProyecto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_proyecto: proyecto.id })
    });
    
    // Asumimos que la API devuelve un array de miembros
    const data = await response.json();
    let miembros = [];
    if(data.success)
        miembros = data.miembros;

    // Creamos las "pills" antes de retornar el HTML
    const pillsHTML = miembros.length > 0 
        ? miembros.map(m => `
            <div class="pill" data-id="${m.id_usuario}">
                <span>${m.nombre} <small>(${m.rol || 'Miembro'})</small></span>
                <button class="btn-remove-member" data-id="${m.id_usuario}">&times;</button>
            </div>`).join('')
        : '<span class="text-muted">Sin miembros asignados</span>';

    return `
        <div class="gestion-equipo">
            <p>Gestionar personal para: <strong>${proyecto.nombre_proyecto}</strong></p>
            
            <div class="search-box">
                <input type="search" id="busquedaUsuario" placeholder="Buscar usuario para añadir..." class="form-control" autocomplete="off">
                <div id="resultadosBusqueda" class="resultados-busqueda"></div>
            </div>

            <div class="equipo-actual mt-20">
                <label>Miembros asignados:</label>
                <div id="listaMiembros" class="pills-container">
                    ${pillsHTML}
                </div>
            </div>

            <div class="form-actions mt-20">
                <button id="btnFinalizarEquipo" class="btn-save" onclick="this.closest('.modal-overlay').remove()">Finalizar</button>
            </div>
        </div>
    `;
}