import { AnimatePresence, MotiView } from "moti";
import { MotiPressable } from "moti/interactions";

import { Dimensions } from "react-native";
import { Title, Value } from "../text";
import { PrimaryButton } from "../button";
import { useEffect, useMemo, useState } from "react";
import { PaymentCard } from "../card";
import { LayoutCenter, LayoutLeft } from "../container";
import { formatMoney } from "../../utils/formatMoney";
import { useValueContext } from "../../providers/valueProvider";

const DRAWER_PADDING = 32;

const Drawer = ({ offsetY = 200, children, visible, onBackdropPress }) => {
  const { width, height } = Dimensions.get("screen");

  return (
    <AnimatePresence>
      {visible && (
        <>
          <MotiView
            key="drawer-backdrop"
            from={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.7,
            }}
            exit={{
              opacity: 0,
            }}
            style={{
              position: "absolute",
              width,
              height,
              backgroundColor: "#000000",
            }}
          >
            <MotiPressable
              onPress={onBackdropPress}
              style={{ position: "absolute", width, height }}
            />
          </MotiView>

          <MotiView
            key="drawer-content"
            from={{
              translateY: height,
            }}
            animate={{
              translateY: offsetY,
            }}
            exit={{
              translateY: height,
            }}
            transition={{
              type: "timing",
            }}
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              padding: DRAWER_PADDING,
              height: height - offsetY - DRAWER_PADDING / 2,
              width: width,
              position: "absolute",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {children}
          </MotiView>
        </>
      )}
    </AnimatePresence>
  );
};

const DrawerValue = ({ visible, onClose }) => {
  const { value, setValue } = useValueContext();

  return (
    <Drawer visible={visible} onBackdropPress={onClose}>
      <Title text="Total da conta" />

      <Value value={value} size="large" editable onValueChange={setValue} />

      <PrimaryButton label="Alterar Valor" onPress={onClose} />
    </Drawer>
  );
};

const DrawerPayment = ({ visible, onClose, tipOption, peopleAtTable }) => {
  const { value } = useValueContext();

  const totalValue = tipOption ? value + (value * tipOption) / 100 : value;

  const valueByPerson = totalValue / peopleAtTable;

  const [payments, setPayments] = useState([]);

  const pendingPayments = useMemo(() => {
    return payments.reduce(
      (prevValue, currentValue) =>
        !currentValue.paid ? prevValue + currentValue.value : prevValue,
      0
    );
  }, [payments]);

  useEffect(() => {
    setPayments(
      Array(peopleAtTable).fill({ paid: false, value: valueByPerson })
    );
  }, [valueByPerson, peopleAtTable]);

  const handlePayment = (index) => {
    setPayments((prevPayments) => {
      return prevPayments.map((prevPayment, prevPaymentIndex) => {
        if (prevPaymentIndex === index) {
          return { ...prevPayment, paid: !prevPayment.paid };
        }

        return prevPayment;
      });
    });
  };

  return (
    <Drawer offsetY={80} visible={visible} onBackdropPress={onClose}>
      <LayoutCenter style={{ gap: 32 }}>
        <Title text="Resultado" />

        <Value value={totalValue} size="medium" />

        <LayoutLeft style={{ gap: 16 }}>
          <Title text="Valor por pessoa" />

          {payments.map((item, index) => {
            return (
              <PaymentCard
                key={`payment-${index}`}
                value={item.value}
                paid={item.paid}
                onPress={() => {
                  handlePayment(index);
                }}
              />
            );
          })}
        </LayoutLeft>
      </LayoutCenter>

      <LayoutCenter style={{ gap: 16 }}>
        <Title text="Valor pendente" />

        <PrimaryButton
          label={
            pendingPayments > 0 ? formatMoney(pendingPayments) : "Finalizado"
          }
          onPress={onClose}
        />
      </LayoutCenter>
    </Drawer>
  );
};

Drawer.Value = DrawerValue;
Drawer.Payment = DrawerPayment;

export default Drawer;
