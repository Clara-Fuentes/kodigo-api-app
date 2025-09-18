import axios from 'axios';

// Obtenemos la URL base del backend.
const API_BASE_URL = 'http://localhost:3000';

// Creamos una instancia de Axios con la configuración base.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Exportamos la instancia para poder usarla en otros archivos.
export default apiClient;