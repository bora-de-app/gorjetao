import { LayoutCenter } from "../container";
import { Subtitle, Value } from "../text";
import { TextBold } from "../text/styles";
import { CardContainer, PaymentCardContainer } from "./styles";

export const Card = ({ title, subtitle, onPress }) => {
  return (
    <CardContainer onPress={onPress}>
      <LayoutCenter>
        <Value value={title} size="medium" />
        <Subtitle text={subtitle} variant="light" />
      </LayoutCenter>
    </CardContainer>
  );
};

export const PaymentCard = ({ value, paid, onPress }) => {
  return (
    <PaymentCardContainer paid={paid} onPress={onPress}>
      <LayoutCenter>
        <Value value={value} size="small" paid={paid} />
        {paid && <TextBold paid={paid}>Pago</TextBold>}
      </LayoutCenter>
    </PaymentCardContainer>
  );
};
