import React, { PropsWithoutRef, ReactElement } from "react";
import styled from "styled-components";

type HeadingProps = {
  title: string;
  props?: PropsWithoutRef<"h1">;
};

const Heading = ({ title, ...props }: HeadingProps): ReactElement => {
  return <StyledHeading {...props}>{title}</StyledHeading>;
};

export default Heading;

const StyledHeading = styled.h1`
  color: var(--primary-color, black);
`;
