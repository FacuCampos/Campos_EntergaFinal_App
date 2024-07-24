import { object, string, ref } from "yup";

export const signupSchema = object().shape({
  email: string().required("Campo Obligatorio").email("Correo no válido"),
  password: string()
    .required("Campo obligatorio")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: string()
  .required("Campo obligatorio")
  .oneOf([ref("password"), null], "Las contraseñas no coinciden"),
});
