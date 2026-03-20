import { BaseComponent } from "./BaseComponent.js";

export class AppComponent extends BaseComponent{
    html(){
        return `
            <div id="app"></div>
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