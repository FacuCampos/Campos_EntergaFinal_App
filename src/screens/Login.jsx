import { Platform, Pressable, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { colors } from "../global";
import { InputForm, SubmitButton, RegisterForm } from "../components";

import { useSignInMutation } from "../services/authServices";
import { setUser } from "../features/User/UserSlice";
import { insertSession } from "../persistence";
import { loginSchema } from "../validations/loginSchema";

import Toast from "react-native-toast-message";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorCredentials, setErrorCredentials] = useState("");

  const [triggerSingIn, result] = useSignInMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (result?.data && result.isSuccess) {

        if (Platform.OS !== "web") {
          insertSession({
            localId: result.data.localId,
            email: result.data.email,
            token: result.data.idToken,
          }).then((response) => {
            dispatch(
              setUser({
                email: result.data.email,
                idToken: result.data.idToken,
                localId: result.data.localId,
              })
            );
          });
        } else {
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            })
          );
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "¡Error!",
        text2: "Ha ocurrido un error al iniciar sesión",
        duration: 3000,
        position: "bottom",
      });
    }
  }, [result]);

  const onSubmit = () => {
    try {
      setErrorCredentials("");
      loginSchema.validateSync({
        email,
        password,
      });
      triggerSingIn({ email, password, returnSecureToken: true });
    } catch (error) {
      setErrorCredentials(error.message);
    }
  };

  return (
    <RegisterForm titulo={"Inicia sesión"}>
      <InputForm label={"Email"} onChange={setEmail} />
      <InputForm label={"Contraseña"} onChange={setPassword} isSecure={true} />
      {errorCredentials != "" && (
        <Text style={styles.errorCredenciales}>{errorCredentials}</Text>
      )}
      <SubmitButton onPress={onSubmit} title="Enviar" />
      <Text style={styles.sub}>¿No tiene una cuenta aún?</Text>
      <Pressable onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.subLink}>Regístrate</Text>
      </Pressable>
    </RegisterForm>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  errorCredenciales: {
    paddintTop: 2,
    fontSize: 16,
    color: "white",
    fontFamily: "InputFont",
  },
  sub: {
    fontSize: 14,
    color: colors.textoClaro,
  },
  subLink: {
    fontSize: 14,
    color: colors.textoClaro,
    textDecorationLine: "underline",
  },
});
