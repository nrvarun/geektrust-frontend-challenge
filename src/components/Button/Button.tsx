import React, {
  CSSProperties,
  FormEvent,
  PropsWithoutRef,
  ReactElement,
} from "react";
import styled from "styled-components";

interface Props {
  text: string;
  color?: string;
  disabled?: boolean;
  style?: CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
  type: "submit" | "button" | "reset";
  props?: PropsWithoutRef<HTMLButtonElement>;
}

function Button({
  text,
  type = "button",
  disabled,
  children,
  onClick,
  ...props
}: Props): ReactElement {
  return (
    <StyledButton type={type} disabled={disabled} onClick={onClick} {...props}>
      {!children && <span>{text}</span>}
      {children}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  box-shadow: none;
  border-radius: 2px;
  font-size: 0.85rem;
  padding: 0.5rem;
  color: ${({ color, disabled }) =>
    color ? (disabled ? "#d2d2d2" : color) : "var(--primary-color, #01ade5)"};
  border: 1px solid
    ${({ color, disabled }) =>
      color ? (disabled ? "#d2d2d2" : color) : "var(--primary-color, #01ade5)"};

  svg {
    width: 20px;
    height: 20px;
  }
`;
