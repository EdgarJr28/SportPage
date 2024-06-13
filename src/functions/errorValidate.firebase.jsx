export function validateErrorFirebase(error) {
    if (error.code === 'auth/too-many-requests') {
        const error = 'Temporalmente inaccesible, haz hecho muchos intentos.';
        return error;
    }
    if (error.code === 'auth/invalid-email') {
        const error = 'Email no válido';
        return error
    }

    if (error.code === 'auth/user-not-found') {
        const error = 'Usuario no encontrado.';
        return error;
    }
    if (error.code === 'auth/wrong-password') {
        const error = 'Contraseña incorrecta.';
        return error;
    }
    if (error.code === 'auth/email-already-in-use') {
        const error = 'Email ya registrado.';
        return error;
    }

    if (error.code === 'auth/invalid-credential') {
        const error = 'Usuario y/o contraseña incorrectos.';
        return error;
    } else if (error.code === 'auth/network-request-failed') {
        const error = 'Error de red. Por favor, verifica tu conexión a internet.';
        return error
    } else {
        // Otro tipo de error
        return 'Ocurrió un error inesperado:';
    }

}