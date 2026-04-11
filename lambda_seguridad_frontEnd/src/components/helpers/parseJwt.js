
// Decodifica el payload del JWT para obtener datos del usuario en el frontend.
// No valida la firma, solo es útil para mostrar información, no para autorizar acciones críticas.
export const parseJwt  = (token) => {
    // Validación básica: token debe ser string y no vacío
    if (!token || typeof token !== 'string') {
        return null;
    }

    // Un JWT válido tiene al menos 2 partes (header.payload)
    const parts = token.split('.');
    if (parts.length < 2 || !parts[1]) {
        return null;
    }

    try {
        // Convertir Base64URL a Base64 estándar
        let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');

        // Agregar padding si falta
        const padding = base64.length % 4;
        if (padding) {
            base64 += '='.repeat(4 - padding);
        }

        // Decodificar el payload a string JSON
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        // Convertir string JSON a objeto
        return JSON.parse(jsonPayload);
    } catch (error) {
        // Si hay error de formato o decode, retornamos null
        return null;
    }
}



