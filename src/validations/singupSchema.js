import { object, string, ref } from "yup";

export const signupSchema = object().shape(
  {
    confirmPassword: string()
      .oneOf([ref("password"), null], "Las contraseñas no coinciden"),
    password: string()
      .required("Campo obligatorio")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    email: string().required("Campo Obligatorio").email("Correo no válido"),
  }
);
