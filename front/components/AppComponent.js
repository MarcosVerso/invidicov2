import { BaseComponent } from "./BaseComponent.js";
import { SidebarComponent } from "./SidebarComponent.js";

export class AppComponent extends BaseComponent{
    html(){
        return `
            <app-header></app-header>
            <div class="content-wrapper">
                <app-sidebar></app-sidebar>
                <main id="main">
                    <slot></slot>
                </main>
            </div>
        `;
    }

    style(){
        return `
        :host {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            font-family: sans-serif;
        }

        .content-wrapper {
            display: flex;
            flex: 1;
        }

        #main {
            flex: 1;
            padding: 20px;
            background-color: #f4f4f4;
        }

        /* Estilo para cuando el sidebar deba ocultarse (ej. login) */
        :host([hide-sidebar]) app-sidebar {
            display: none;
        }
        `;
    }
}

customElements.define("app-root", AppComponent);