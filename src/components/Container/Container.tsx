import React, { ReactElement } from "react";
import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../../libs";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children }: Props): ReactElement {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;

  @media (min-width: ${DEVICE_BREAKPOINTS.tablet}) {
    max-width: calc(var(--tablet-bp) - 5%);
  }

  @media (min-width: ${DEVICE_BREAKPOINTS.desktop}) {
    max-width: calc(var(--desktop-bp) - 15%);
  }
`;
