// components/Pagination.js
export function Pagination(total, actual, onChange) {
    const nav = document.createElement("nav");
    nav.className = "pagination-container";

    let buttons = "";
    for (let i = 1; i <= total; i++) {
        buttons += `
            <button class="btn-page ${i === actual ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `;
    }

    nav.innerHTML = `
        <div class="pagination-flex">
            <button class="btn-nav" id="prevPage" ${actual === 1 ? 'disabled' : ''}>Anterior</button>
            <div class="page-numbers">${buttons}</div>
            <button class="btn-nav" id="nextPage" ${actual === total ? 'disabled' : ''}>Siguiente</button>
        </div>
    `;

    // Eventos
    nav.querySelectorAll('.btn-page').forEach(btn => {
        btn.onclick = () => onChange(parseInt(btn.dataset.page));
    });

    const btnPrev = nav.querySelector("#prevPage");
    const btnNext = nav.querySelector("#nextPage");

    if (btnPrev) btnPrev.onclick = () => onChange(actual - 1);
    if (btnNext) btnNext.onclick = () => onChange(actual + 1);

    return nav;
}