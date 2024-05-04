import { Image } from "react-native";
import { AppName, Subtitle } from "../components/text";

import Icon from "../assets/home-icon.png";
import { PrimaryButton } from "../components/button";
import { LayoutCenter } from "../components/container";
import { useNavigation } from "expo-router";

export default function App() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate("home");
  };

  return (
    <LayoutCenter
      style={{
        padding: 32,
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <LayoutCenter>
        <AppName />
        <Subtitle text="Calcule a gorjeta e divida a conta" />
      </LayoutCenter>

      <Image source={Icon} />

      <PrimaryButton label="Calcular" onPress={goToHome} />
    </LayoutCenter>
  );
}
