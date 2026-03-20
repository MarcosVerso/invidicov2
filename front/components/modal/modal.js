export function Modal(titulo, contenido) {
    const modalExistente = document.querySelector('.modal-background');
    if(modalExistente) {
        modalExistente.remove();
    }

    if(!document.getElementById('modal-styles')){
        const link = document.createElement("link");
        link.id = "modal-styles";
        link.rel = "stylesheet";
        link.href = '/front/components/modal/modal.css';
        document.head.appendChild(link);
    }

    const modal = document.createElement('div');
    modal.classList.add('modal-background');
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${titulo}</h2>
                    <button class="close-button">&times;</button>
                </div>
                <div class="modal-body">
                    ${contenido}
                </div>
            </div>
        </div>
    `;

    modal.querySelector('.close-button').onclick = () => {
         modal.remove();
    }

    modal.onclick = (e) => {
        if(e.target === modal) {
            modal.remove();
        }
    }

    document.body.appendChild(modal);

    return modal;
}