import appDaos from "../model/DAOs/app.daos";
import { RegistrationData } from "./types.utils";

export const validationRegister = async (user: RegistrationData) => {
    let error: string | null = null;

    // Validar campos requeridos 
    if (!user.firstName.trim().trim() || !user.lastName.trim() || !user.email.trim() || !user.password.trim() || !user.address || !user.dateOfBirth || !user.phoneNumber.trim()) {
        error = 'Todos los campos requeridos deben estar presentes en la solicitud';
        return error;
    }

    // Verificar si todos los campos de la dirección están presentes
    const address = user.address;
    if (!address.street.trim() || !address.city.trim() || !address.state.trim() || !address.postalCode.trim() || !address.country.trim()) {
        error = 'Todos los campos de la dirección son requeridos';
        return error;
    }

    // Verificar duplicados de correo electrónico
    if (user.email) {
        const isDuplicateEmail = await checkDuplicateEmail(user.email);
        if (isDuplicateEmail) {
            error = 'El correo electrónico ya está registrado';
            return error;
        }
    }

    // Verificar formato de correo electrónico
    const isEmailValid = emailFormat(user.email);
    if (!isEmailValid) {
        error = 'El formato del correo electrónico no es válido';
        return error;
    }

    // Validar contraseña
    if (!isValidPassword(user.password)) {
        error = 'La contraseña debe tener entre 8 y 15 caracteres y contener caracteres difíciles de descifrar';
        return error;
    }

    

    // Validar longitud de campos
    if (user.firstName.length < 3 || user.firstName.length > 20) {
        error = 'El nombre debe tener entre 3 y 20 caracteres';
        return error;
    }

    if (user.lastName.length < 3 || user.lastName.length > 20) {
        error = 'El apellido debe tener entre 3 y 20 caracteres';
        return error;
    }

    if (address.city.length < 3 || address.city.length > 20) {
        error = 'La ciudad debe tener entre 3 y 20 caracteres';
        return error;
    }

    if (address.state.length < 3 || address.state.length > 20) {
        error = 'El estado debe tener entre 3 y 20 caracteres';
        return error;
    }

    if (address.postalCode.length < 5 || address.postalCode.length > 10) {
        error = 'El código postal debe tener entre 5 y 10 caracteres';
        return error;
    }

    if (user.phoneNumber.length < 10 || user.phoneNumber.length > 15) {
        error = 'El número de teléfono debe tener entre 10 y 15 caracteres';
        return error;
    }

    // Validar fecha de nacimiento
    if (user.dateOfBirth.getFullYear() < 1900 || user.dateOfBirth.getFullYear() > new Date().getFullYear()) {
        error = 'La fecha de nacimiento debe estar entre 1900 y el año actual';
        return error;
    }

    return error;
}

async function checkDuplicateEmail(email: string): Promise<boolean> {
    try {
        const user = await appDaos.getUserDB().findByEmail(email);
        return !!user; // Si el usuario existe, el correo electrónico es duplicado
    } catch (error) {
        console.error(`Error al verificar duplicado de correo electrónico: ${error}`);
        return false; // En caso de error, asumimos que no hay duplicados
    }
}

function emailFormat(email: string): boolean {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return false;
    }
    return true;
}

function isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,15}$/;
    return passwordRegex.test(password);
}