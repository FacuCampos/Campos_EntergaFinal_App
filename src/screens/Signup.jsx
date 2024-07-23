import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { SubmitButton , InputForm } from "../components";
import { colors } from "../global/colors";
import { useSignUpMutation } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";

const Signup = ({ navigation }) => {
  
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const dispatch = useDispatch()
  const [triggerSignUp, result] = useSignUpMutation()

  useEffect(()=>{
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken
        })
      )
    }
  }, [result])
  
  const onSubmit = () => {
    triggerSignUp({email, password, returnSecureToken: true})
  };



  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>
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
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.terceario,
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "TituloMedium",
  },
  sub: {
    fontSize: 14,
    fontFamily: "SecundariaRegular",
    color: "black",
  },
  subLink: {
    fontSize: 14,
    color: "blue",
  },
});
