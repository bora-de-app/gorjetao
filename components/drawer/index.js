import { AnimatePresence, MotiView } from "moti";
import { MotiPressable } from "moti/interactions";

import { Dimensions } from "react-native";
import { Title, Value } from "../text";
import { PrimaryButton } from "../button";
import { useEffect, useMemo, useState } from "react";
import { PaymentCard } from "../card";
import { LayoutCenter, LayoutLeft } from "../container";
import { formatMoney } from "../../utils/formatMoney";

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

const DrawerValue = ({ visible, onClose, value, onValueChange }) => {
  return (
    <Drawer visible={visible} onBackdropPress={onClose}>
      <Title text="Total da conta" />

      <Value
        value={value}
        size="large"
        editable
        onValueChange={onValueChange}
      />

      <PrimaryButton label="Alterar Valor" onPress={onClose} />
    </Drawer>
  );
};

const DrawerPayment = ({
  visible,
  onClose,
  value,
  peopleAtTable,
  tipOption,
}) => {
  const [payments, setPayments] = useState([]);

  const totalValue = useMemo(() => {
    if (tipOption) {
      return value + (value * tipOption) / 100;
    }

    return value;
  }, [value, tipOption]);

  const pendingValue = payments.reduce((previousValue, currentValue) => {
    return !currentValue.paid
      ? previousValue + currentValue.value
      : previousValue;
  }, 0);

  const valueByPerson = useMemo(() => {
    return totalValue / peopleAtTable;
  }, [totalValue, peopleAtTable]);

  useEffect(() => {
    setPayments(
      Array(peopleAtTable).fill({ value: valueByPerson, paid: false })
    );
  }, [valueByPerson]);

  const togglePaidStatus = (index) => {
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
    <Drawer visible={visible} onBackdropPress={onClose} offsetY={80}>
      <LayoutCenter style={{ gap: 32 }}>
        <Title text="Resultado" />

        <Value value={totalValue} size="medium" />

        <LayoutLeft style={{ gap: 8 }}>
          <Title text="Valor por pessoa" />

          {payments.map((payment, index) => {
            return (
              <PaymentCard
                key={`payment-${index}`}
                value={payment.value}
                paid={payment.paid}
                onPress={() => {
                  console.log("on press", index);
                  togglePaidStatus(index);
                }}
              />
            );
          })}
        </LayoutLeft>
      </LayoutCenter>

      <LayoutCenter style={{ gap: 16 }}>
        <Title text="Valor pendente" />
        <PrimaryButton
          label={pendingValue === 0 ? "Finalizado" : formatMoney(pendingValue)}
          onPress={onClose}
        />
      </LayoutCenter>
    </Drawer>
  );
};

Drawer.Value = DrawerValue;
Drawer.Payment = DrawerPayment;

export default Drawer;
