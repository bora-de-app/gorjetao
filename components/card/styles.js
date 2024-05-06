import styled from "styled-components/native";

export const CardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  border-radius: 8px;
  align-self: stretch;
  padding: 32px;
  background-color: #fafafa;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
`;

export const PaymentCardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  border-radius: 8px;
  align-self: stretch;
  padding: ${(props) => (props.paid ? "8px" : "16px")};
  background-color: #ffffff;
  border: 1px solid ${(props) => (props.paid ? "#4DBBA4" : "#F3F4F6")};
  justify-content: center;
  align-items: center;
`;
