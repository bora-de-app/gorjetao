import { formatMoney } from "../../utils/formatMoney";
import { TextBold, TextRegular } from "./styles";

export const AppName = () => {
  return <TextBold fontSize={24}>Gorjetão</TextBold>;
};

export const Title = ({ text }) => {
  return <TextBold>{text}</TextBold>;
};

export const Subtitle = ({ text, variant }) => {
  return <TextRegular variant={variant}>{text}</TextRegular>;
};

/**
 *
 * size -> large ou medium ou small
 */

const defaultValueSize = "medium";
export const Value = ({
  value,
  size = defaultValueSize,
  editable,
  onValueChange,
  paid,
}) => {
  const sizes = {
    large: 64,
    medium: 32,
    small: 24,
  };

  const currentSize = sizes[size] ?? sizes[defaultValueSize];

  const valueToShow = editable ? value : formatMoney(value);

  return (
    <TextBold
      fontSize={currentSize}
      editable={editable}
      paid={paid}
      keyboardType="numeric"
      onChangeText={(newText) => {
        onValueChange(parseFloat(newText));
      }}
    >
      {valueToShow}
    </TextBold>
  );
};
