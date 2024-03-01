import { Schema } from "mongoose";
import { UserDocument } from "../../utils/types.utils";

const UserSchema = new Schema<UserDocument>({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v: string) {
                // Validar el formato del correo electrónico
                // Puedes usar una expresión regular o alguna otra lógica de validación
                // Este es solo un ejemplo básico
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} no es un formato de correo electrónico válido`
        }
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        validate: {
            validator: function (v: Date) { // Aquí especificamos el tipo de v como Date
                // Validar la fecha de nacimiento
                // Puedes implementar tu lógica de validación aquí
                // Este es solo un ejemplo básico
                return v instanceof Date && !isNaN(v.getTime()) && v < new Date();
            },
            message: props => `${props.value} no es una fecha de nacimiento válida`
        }
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: true
});

export default UserSchema;