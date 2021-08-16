import React, { ChangeEvent, ReactElement } from "react";
import styled from "styled-components";

interface Props {
  id: string | undefined;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

function SearchInput({
  placeholder,
  id = "",
  name,
  onChange,
}: Props): ReactElement {
  return (
    <StyledSearchWrapper htmlFor={id}>
      <input
        type="search"
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={onChange}
      />
    </StyledSearchWrapper>
  );
}

export default SearchInput;

const StyledSearchWrapper = styled.label`
  width: 100%;

  input {
    width: 100%;
    padding: 10px;
    font-family: var(--secondary-font);
    border: 1px solid #a2dbfa;

    &:focus,
    &:active {
      border: 1px solid #a2dbfa;
      outline: none;
    }
  }
`;
