import { TextBold } from "../text/styles";
import {
  ButtonContainer,
  CircleButtonContainer,
  RoundedButtonContainer,
} from "./styles";

export const PrimaryButton = ({ label, onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <TextBold variant="light">{label}</TextBold>
    </ButtonContainer>
  );
};

export const RoundedButton = ({ label, onPress, selected }) => {
  return (
    <RoundedButtonContainer onPress={onPress} selected={selected}>
      <TextBold variant="light">{label}</TextBold>
    </RoundedButtonContainer>
  );
};

export const CircleButton = ({ label, onPress }) => {
  return (
    <CircleButtonContainer onPress={onPress}>
      <TextBold fontSize={32}>{label}</TextBold>
    </CircleButtonContainer>
  );
};
