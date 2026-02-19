
export const Auth = {
    login: async (email, password)=>{
        //localStorage.setItem("token", token);
        //window.location.href = "/dashboard";
        //history.pushState({}, "dashboard", "/dashboard");
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });
        const data = await response.json();
        //document.querySelector("header").innerHTML = Header().innerHTML;
        if(data.success){
            window.dispatchEvent(new Event("authStateChanged"));
        }
        return data;
    },
    logout: async () => {
        try{
            await fetch("/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });
            window.dispatchEvent(new Event("authStateChanged"));
            window.router.navigate("/login");
        }catch(error){
            console.error("Error al cerrar sesión:", error);
            
        }
    },
    isValid: async () => {
        //const token = Auth.getToken();
        //if(!token) return false;

        try{
            const response = await fetch("/api/validarToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });
            const data = await response.json();
            console.log(data);
            return data;
        }catch(error){
            return false;
        }
    }
};