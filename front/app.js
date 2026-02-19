import { AppContainer } from "./components/appContainer.js";
import { Header } from "./components/header.js";
import { Main } from "./components/main.js";
import { Sidebar } from "./components/sidebar.js";

export function CargarUI(){
    const body = document.querySelector("body");
    body.appendChild(Header());
    const app = AppContainer();
    app.appendChild(Sidebar());
    app.appendChild(Main());
    body.appendChild(app);
        
}