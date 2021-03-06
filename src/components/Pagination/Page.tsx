import { isEqual } from "lodash";
import React, { memo, ReactElement } from "react";
import styled from "styled-components";

type PageType = "next" | "previous" | "normal";

interface PageProps {
  text: string | number;
  isActive?: boolean;
  type?: PageType;
  isDisabled?: boolean;
  handleClick: () => void;
}

function areEquals(prev: PageProps, next: PageProps) {
  return (
    isEqual(prev?.text, next?.text) &&
    isEqual(prev?.isActive, next?.isActive) &&
    isEqual(prev?.handleClick, next?.handleClick) &&
    isEqual(prev?.type, next?.type)
  );
}

function Page({
  text,
  type,
  isActive = false,
  isDisabled,
  handleClick,
}: PageProps): ReactElement {
  return (
    <StyledPage
      disabled={isDisabled}
      onClick={handleClick}
      style={{
        backgroundColor: isActive ? "var(--primary-color, #0ccbec)" : "#ffffff",
        color: isActive ? "#ffffff" : "var(--primary-color, #0ccbec)",
      }}
    >
      {text}
    </StyledPage>
  );
}

export default memo(Page, areEquals);

const StyledPage = styled.button`
  padding: 0.75rem;
  border: 1px solid var(--primary-color, #0ccbec);
  border-radius: 4px;
  font-size: 0.65rem;
  margin: 0 10px;
  cursor: pointer;
  box-shadow: none;
  transition: background-color 0.4s ease;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.3;
  }

  &:hover,
  &:focus {
    color: #ffffff;
    background-color: var(--primary-color, #0ccbec);
  }
`;
