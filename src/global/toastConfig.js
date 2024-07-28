import { ErrorToast } from "react-native-toast-message";

const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 20,
        color: "#FF3333",
      }}
      text2Style={{
        fontSize: 16,
        color: "#050505",
      }}
      style={{
        backgroundColor: "#FAFAFA",
        borderLeftColor: "#FF3333",
      }}
    />
  ),
};

export default toastConfig