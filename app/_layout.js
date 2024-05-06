import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { Container } from "../components/container";
import { StatusBar } from "expo-status-bar";
import ValueProvider from "../providers/valueProvider";

export default function Layout() {
  return (
    <ValueProvider>
      <Container>
        <StatusBar style="auto" />
        <SafeAreaView />
        <Slot />
      </Container>
    </ValueProvider>
  );
}
