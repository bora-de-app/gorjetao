import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { Container } from "../components/container";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <Container>
      <StatusBar style="auto" />
      <SafeAreaView />
      <Slot />
    </Container>
  );
}
