export const Auth = {
    getToken: () => localStorage.getItem("token"),
    login: (token)=>{
        localStorage.setItem("token", token);
    },
    logout: () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    },
    isValid: async () => {
        const token = Auth.getToken();
        if(!token) return false;

        try{
            const response = await fetch("/api/validarToken", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return response.ok;
        }catch(error){
            return false;
        }
    }
};