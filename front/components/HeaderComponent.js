import { BaseComponent } from "./BaseComponent.js";

export class HeaderComponent extends BaseComponent{
    html(){
        return `
            <header>
                <h1>Invidico</h1>
                <div id="auth-zone">Cargando...</div>
            </header>
        `;
    }

    style(){
        return `
            header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                background-color: #333;
                color: #fff;
            }
            header h1{
                cursor: pointer;
            }
            .user-info{
                display: flex;
                align-items: center;
            }
            .user-info span{
                margin-right: 10px;
            }
            .user-info button{
                padding: 5px 10px;
                background-color: #555;
                color: #fff;
                border: none;
                cursor: pointer;
            }
            .user-info button:hover{
                background-color: #777;
            }
        `;
    }

    
}