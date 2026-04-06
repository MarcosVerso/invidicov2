import { BaseComponent } from "./BaseComponent";

export class PaginationComponent extends BaseComponent{
    set data({total, actual}){
        this._total = total;
        this._actual = actual;
        this.render();
    }

    /*render(){
        this.shadowRoot.innerHTML = `
        <style>
            .pagination-container { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
            button { padding: 5px 12px; cursor: pointer; border: 1px solid #ccc; background: white; border-radius: 4px; }
            button.active { background: #3b82f6; color: white; border-color: #3b82f6; }
            button:disabled { opacity: 0.5; cursor: not-allowed; }
        </style>
        <div class="pagination-container">
            <button id="prev" ${this._actual === 1 ? 'disabled' : ''}>Anterior</button>
            ${this._generatePageButtons()}
            <button id="next" ${this._actual === this._total ? 'disabled' : ''}>Siguiente</button>
        </div>
        `;

        this.shadowRoot.querySelector('#prev').onclick = () => this._changePage(this._actual - 1);
        this.shadowRoot.querySelector('#next').onclick = () => this._changePage(this._actual + 1);
        this.shadowRoot.querySelectorAll('.page-btn').forEach(btn => {
            btn.onclick = () => this._changePage(parseInt(btn.dataset.page));
        });
    }*/

    style(){
        return `
            .pagination-container { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
            button { padding: 5px 12px; cursor: pointer; border: 1px solid #ccc; background: white; border-radius: 4px; }
            button.active { background: #3b82f6; color: white; border-color: #3b82f6; }
            button:disabled { opacity: 0.5; cursor: not-allowed; }
        `;
    }

    html(){
        return `<div class="pagination-container">
        <button id="prev" ${this._actual === 1 ? 'disabled' : ''}>Anterior</button>
        ${this._generatePageButtons()}
        <button id="next" ${this._actual === this._total ? 'disabled' : ''}>Siguiente</button>
    </div>`;
    }

    afterRender(){
        this.shadowRoot.querySelector('#prev').onclick = () => this._changePage(this._actual - 1);
        this.shadowRoot.querySelector('#next').onclick = () => this._changePage(this._actual + 1);
        this.shadowRoot.querySelectorAll('.page-btn').forEach(btn => {
            btn.onclick = () => this._changePage(parseInt(btn.dataset.page));
        });
    }

    
};

customElements.define("app-pagination")