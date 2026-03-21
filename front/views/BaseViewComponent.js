import { BaseComponent } from "../components/BaseComponent.js";

export class BaseViewComponent extends BaseComponent{
    constructor(){
        super();
        this.user = null;
    }

    setUser(userData){
        this.user = userData;
        this.onUserLoaded();
        //this.render();
    }

    onUserLoaded(){}

    get userLevel(){
        if (!this.user || !this.user.roles) return 0;
        return this.user.roles.reduce((max, rol) => Math.max(max, Number(rol.nivel_acceso)), 0);
    }
}