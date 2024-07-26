import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { colors } from "../global/colors";

import { InputForm, SubmitButton } from "../components";
import { useSignInMutation } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";
import { insertSession } from "../persistence";
import { loginSchema } from "../validations/loginSchema";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorCredentials, setErrorCredentials] = useState("");

  const [triggerSingIn, result] = useSignInMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (result?.data && result.isSuccess) {
        insertSession({
          localId: result.data.localId,
          email: result.data.email,
          token: result.data.idToken,
        }).then((response) => {
          dispatch(
            setUser({
              user: result.data.email,
              token: result.data.idToken,
              localId: result.data.localId,
            })
          );
        });
      }
    } catch (error) {
      console.log({ errorLoginIn: error });
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
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Inicia sesión</Text>
        <View style={styles.hr}></View>
        <InputForm label={"Email"} onChange={setEmail} />
        <InputForm label={"Password"} onChange={setPassword} isSecure={true} />
        
        {errorCredentials != "" && (
          <Text style={styles.errorCredenciales}>{errorCredentials}</Text>
        )}
        
        <SubmitButton onPress={onSubmit} title="Enviar" />
        
        <Text style={styles.sub}>¿No tiene una cuenta aún?</Text>

        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Regístrate</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.fondo,
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primario,
    gap: 15,
    padding: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 4,
  },
  title: {
    fontSize: 30,
    fontFamily: "TituloFont",
    color: colors.textoClaro,
  },
  hr: {
    height: 1,
    width: "95%",
    backgroundColor: "#000",
    opacity: 0.3,
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
  errorCredenciales: {
    paddintTop: 2,
    fontSize: 16,
    color: "white",
    fontFamily: "InputFont",
  },
});
