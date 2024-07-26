import { object, string } from "yup";

export const loginSchema = object().shape({
  email: string()
    .required("Completa los campos")
    .email("Credenciales incorrectas"),
  password: string()
    .required("Completa los campos")
    .min(6, "Credenciales incorrectas"),
});
