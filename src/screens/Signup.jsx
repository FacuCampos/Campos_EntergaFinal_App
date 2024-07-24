import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { SubmitButton, InputForm } from "../components";
import { colors } from "../global/colors";
import { useSignUpMutation } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";
import { signupSchema } from "../validations/singupSchema";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const [triggerSignUp, result] = useSignUpMutation();

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId
        })
      );
    }
  }, [result]);

  const onSubmit = () => {
    try {
      setErrorMail("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      signupSchema.validateSync({
        email,
        password,
        confirmPassword,
      });
      triggerSignUp({ email, password, returnSecureToken: true });
    } catch (error) {
      switch (error.path) {
        case "email":
          setErrorMail(error.message);
          break;
        case "password":
          setErrorPassword(error.message);
          break;
        case "confirmPassword":
          setErrorConfirmPassword(error.message);
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>
        <View style={styles.hr}></View>
        <InputForm label={"Email"} onChange={setEmail} error={errorMail} />
        <InputForm
          label={"Password"}
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={"Confirm password"}
          onChange={setConfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />

        <SubmitButton onPress={onSubmit} title="Enviar" />
        <Text style={styles.sub}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;

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
