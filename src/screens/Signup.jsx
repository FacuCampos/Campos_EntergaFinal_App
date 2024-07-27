import { Pressable, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { SubmitButton, InputForm, RegisterForm } from "../components";
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
          localId: result.data.localId,
        })
      );
    }
  }, [result]);

  const onSubmit = () => {
    try {
      setErrorMail("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      signupSchema.validateSync({ email, password, confirmPassword });
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
      <RegisterForm titulo={'Crea una cuenta'}>
        <InputForm label={"Email"} onChange={setEmail} error={errorMail} />
        <InputForm
          label={"Contraseña"}
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={"Confirmar contraseña"}
          onChange={setConfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />

        <SubmitButton onPress={onSubmit} title="Enviar" />
        <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Ingresar</Text>
        </Pressable>
      </RegisterForm>
  );
};

export default Signup;

const styles = StyleSheet.create({
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
