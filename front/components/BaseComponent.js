export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.afterRender();
    }

    render() {
        const template = document.createElement("template");
        template.innerHTML = `
            <style>${this.style()}</style>
            ${this.html()}
        `;
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    style() { return ''; }
    html() { return ''; }
    afterRender() { }
}