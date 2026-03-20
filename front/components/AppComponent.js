import { BaseComponent } from "./BaseComponent.js";

export class AppComponent extends BaseComponent{
    html(){
        return `
            <div id="app">
                <app-header></app-header>
            </div>
        `;
    }

    style(){
        return `
            #app{
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }
        `;
    }
}

customElements.define("app-root", AppComponent);