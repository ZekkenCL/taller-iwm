// Ejemplo en AuthService.js
export const login = async (username, password) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/login', {
            username,
            password
        });
        return response.data.access_token; // Asegúrate de que solo devuelvas el token si la respuesta es exitosa
    } catch (error) {
        throw error;
    }
};
