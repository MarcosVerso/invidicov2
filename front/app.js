import { Header } from "./components/header.js";
import { Main } from "./components/main.js";

export function CargarUI(){

    const body = document.querySelector("body");
    body.appendChild(Header());
    body.appendChild(Main());

}