import { Pagination } from "../components/pagination.js";

let prevPagination = null;

export function ClientesComponent(container, user) {
    //user.maximo_acceso = 1; // estaba probando
    const maximoNivel = user.maximo_acceso;
    container.innerHTML = `
        <div class="content-wrapper">
            <div class="section-header">
                <h2>Gestión de Clientes</h2>
                ${maximoNivel >= 3 ? `<button id="btnNuevoCliente" class="btn-primary">+ Nuevo Cliente</button>` : ''}
            </div>

            <div id="form-container" class="hidden">
                <form id="clienteForm" class="card">
                    <input type="text" id="nombreCliente" placeholder="Nombre de la empresa o cliente" required>
                    <button type="submit">Guardar</button>
                    <button type="button" onclick="document.getElementById('form-container').classList.add('hidden')">Cancelar</button>
                </form>
            </div>

            <div class="card mt-20">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre del Cliente</th>
                            ${(maximoNivel >= 3) ? `<th>Acciones</th>` : ''}
                        </tr>
                    </thead>
                    <tbody id="lista-clientes">
                        <tr><td colspan="3">Cargando clientes...</td></tr>
                    </tbody>
                </table>
                <div id="paginacion-clientes"></div>
            </div>
        </div>
    `;

    // Lógica para mostrar/ocultar formulario
    const btnNuevo = document.getElementById("btnNuevoCliente");
    if(btnNuevo) {
        btnNuevo.onclick = () => document.getElementById('form-container').classList.remove('hidden');
    }

    // Cargar los datos inicialmente
    document.getElementById('form-container').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombreCliente').value;
        const response = await fetch('/api/insertarCliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        });
        const data = await response.json();
        if(data.error)
            alert('Error al insertar cliente: ' + data.error);
        else {
            alert('Cliente insertado con ID: ' + data.id);
            document.getElementById('clienteForm').reset();
            document.getElementById('form-container').classList.add('hidden');
            renderClientes(user); // recargar la lista
        }
    });
    renderClientes(user);
}

async function borrarCliente(user) {
    if(!confirm('¿Estás seguro de que quieres borrar este cliente?')) return;
    const response = await fetch('/api/eliminarCliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: user.id })
    });
    const data = await response.json();
    if(data.error)
        alert('Error al borrar cliente: ' + data.error);
    else {
        //alert('Cliente borrado con ID: ' + data.id);
        //renderClientes(user); // recargar la lista
    }
}

async function editarCliente(user) {
    const nuevoNombre = prompt("Ingrese el nuevo nombre del cliente:", user.nombre);
    if(!nuevoNombre) return;
    const response = await fetch('/api/actualizarCliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: user.id, nombre: nuevoNombre })
    });
    const data = await response.json();
    if(data.error)
        alert('Error al actualizar cliente: ' + data.error);
    else {
        //alert('Cliente actualizado con ID: ' + data.id);
        //renderClientes(user); // recargar la lista
    }
}

let paginaActual = 1;

async function renderClientes(user) {
    if(prevPagination!==null)
        prevPagination.remove();

    
    // Aquí harás el fetch a tu futura API
    // const clientes = await fetch('/api/clientes').then(r => r.json());
    const tbody = document.getElementById("lista-clientes");
    const containerPaginacion = document.getElementById("paginacion-clientes");
    // Simulando datos por ahora
    /*const mockClientes = [
        {id: 1, nombre: "Coca Cola"},
        {id: 2, nombre: "Pepsi Co"}
    ];*/
    const response = await fetch('/api/obtenerClientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pagina: paginaActual, porPagina: 5 }) // enviamos la página actual y el límite por página
    });
    //const mockClientes = await response.json();
    const {clientes, totalPaginas} = await response.json();

    console.log(clientes);
    console.log(totalPaginas);

    tbody.innerHTML = '';   
    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            ${user.maximo_acceso >= 3 ? `<td>
                <button id="editarCliente">✏️</button>
                <button id="borrarCliente">🗑️</button>
            </td>` : ''}
        `;
        tbody.appendChild(tr);
        const btnEditar = tr.querySelector('button[id^="editarCliente"]');
        const btnBorrar = tr.querySelector('button[id^="borrarCliente"]');

        btnEditar.addEventListener("click", async () => {
            await editarCliente(cliente);
            await renderClientes(user);
        });

        btnBorrar.addEventListener("click", async ()=>{
            if(clientes.length===1 && paginaActual > 1)
                paginaActual--;
            await borrarCliente(cliente);
            await renderClientes(user);
        });//.onclick = () => borrarCliente(cliente);
    });

    containerPaginacion.innerHTML = '';
    if(totalPaginas > 1){
        containerPaginacion.appendChild(Pagination(totalPaginas, paginaActual, (nuevaPagina) => {
            paginaActual = nuevaPagina;
            renderClientes(user);
        }));
    }
    /*tbody.innerHTML = mockClientes.map(c => `
        <tr>
            <td>${c.id}</td>
            <td>${c.nombre}</td>
            <td>
                ${user.maximo_acceso >= 3 ? `<button onclick="editarCliente(${c.id})">✏️</button>` : ''}
                ${user.maximo_acceso >=3 ? `<button onclick="borrarCliente(${c.id})">🗑️</button>` : ''}
            </td>
        </tr>
    `).join('');*/
}