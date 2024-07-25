import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { colors } from "../global/colors";

import { InputForm, SubmitButton } from "../components";
import { useSignInMutation } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";
import { insertSession } from "../persistence";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [triggerSingIn, result] = useSignInMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(result)
    if (result?.data && result.isSuccess) {
      insertSession({
        localId: result.data.localId,
        email: result.data.email,
        token: result.data.idToken,
      }).then((response) => {
        dispatch(
          setUser({
            localId: result.data.localId,
            email: result.data.email,
            idToken: result.data.idToken,
          })
        );
      });
    } else {
      console.log('error al logearse')
    }
  }, [result]);

  const onSubmit = () => {
    triggerSingIn({ email, password, returnSecureToken: true });
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Inicia sesión</Text>
        <View style={styles.hr}></View>
        <InputForm label={"Email"} onChange={setEmail} error={""} />
        <InputForm
          label={"Password"}
          onChange={setPassword}
          error={""}
          isSecure={true}
        />
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
});
