import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useSelector } from "react-redux";

const MyStatusBar = () => {
  const { user } = useSelector((state) => state.auth.value);
  return (
    <StatusBar
      barStyle={user ? 'light-content' : "dark-content"}
      translucent={true}
      backgroundColor="transparent"
    />
  );
};

export default MyStatusBar;
