import { CargarUI } from "./app.js";
import { handleRouting } from "./router.js";

document.addEventListener("DOMContentLoaded", async ()=>{
    CargarUI();
    await handleRouting();
});
