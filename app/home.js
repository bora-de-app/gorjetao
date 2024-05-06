import {
  CircleButton,
  PrimaryButton,
  RoundedButton,
} from "../components/button";
import { LayoutCenter, LayoutLeft } from "../components/container";
import { useNavigation } from "expo-router";
import { Card } from "../components/card";
import { Title } from "../components/text";
import { FlatList, View, Text } from "react-native";
import { TextBold } from "../components/text/styles";
import { useState } from "react";
import Drawer from "../components/drawer";
import { useValueContext } from "../providers/valueProvider";

export default function Home() {
  const { value, setValue } = useValueContext();
  //const [value, setValue] = useState(100);

  const [selectedTipOption, setSelectedTipOption] = useState();
  const [peopleAtTable, setPeopleAtTable] = useState(1);
  const [valueDrawerVisible, setValueDrawerVisible] = useState(false);
  const [paymentDrawerVisible, setPaymentDrawerVisible] = useState(false);

  const toggleValueDrawer = () => {
    setValueDrawerVisible((prevValue) => !prevValue);
  };

  const togglePaymentDrawer = () => {
    setPaymentDrawerVisible((prevValue) => !prevValue);
  };

  const navigation = useNavigation();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const tipOptions = [2, 5, 10, 15, 20, 25, 30];

  return (
    <View style={{ flex: 1 }}>
      <LayoutCenter
        style={{
          flex: 1,
          justifyContent: "space-between",
          padding: 32,
        }}
      >
        <LayoutCenter style={{ gap: 32 }}>
          <Title text="Pagamento" />

          <Card subtitle="Total da conta" onPress={toggleValueDrawer} />

          <LayoutLeft style={{ gap: 32 }}>
            <LayoutLeft style={{ gap: 16 }}>
              <Title text="Gorjeta" />

              <FlatList
                data={tipOptions}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={<View style={{ width: 8 }}></View>}
                renderItem={({ item }) => {
                  const label = `${item}%`;
                  return (
                    <RoundedButton
                      label={label}
                      selected={item === selectedTipOption}
                      onPress={() => {
                        setSelectedTipOption(item);
                      }}
                    />
                  );
                }}
              />
            </LayoutLeft>

            <Title text="Pessoas na mesa" />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "stretch",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CircleButton
                label="-"
                onPress={() => {
                  if (peopleAtTable > 1) {
                    setPeopleAtTable(peopleAtTable - 1);
                  }
                }}
              />
              <TextBold fontSize={32}>{peopleAtTable}</TextBold>
              <CircleButton
                label="+"
                onPress={() => {
                  setPeopleAtTable(peopleAtTable + 1);
                }}
              />
            </View>
          </LayoutLeft>
        </LayoutCenter>

        <PrimaryButton label="Calcular" onPress={togglePaymentDrawer} />
      </LayoutCenter>

      <Drawer.Value visible={valueDrawerVisible} onClose={toggleValueDrawer} />

      <Drawer.Payment
        visible={paymentDrawerVisible}
        onClose={togglePaymentDrawer}
        tipOption={selectedTipOption}
        peopleAtTable={peopleAtTable}
      />
    </View>
  );
}
