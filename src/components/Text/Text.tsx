import { DEVICE_BREAKPOINTS } from "@libs/constants";
import React, { PropsWithoutRef, ReactElement } from "react";
import styled from "styled-components";

type TextTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

type HeadingProps = {
  title: string;
  type: TextTypes;
  props?: PropsWithoutRef<"h1">;
};

const Heading = ({ title, type, ...props }: HeadingProps): ReactElement => {
  switch (type) {
    case "h1":
      return <StyledHeading1 {...props}>{title}</StyledHeading1>;
    case "h2":
      return <StyledHeading2 {...props}>{title}</StyledHeading2>;
    case "h3":
      return <StyledHeading3 {...props}>{title}</StyledHeading3>;
    case "h4":
      return <StyledHeading4 {...props}>{title}</StyledHeading4>;
    case "h5":
      return <StyledHeading5 {...props}>{title}</StyledHeading5>;
    case "h6":
      return <StyledHeading6 {...props}>{title}</StyledHeading6>;
    case "p":
      return <StyledParagraph {...props}>{title}</StyledParagraph>;

    default:
      return <StyledParagraph {...props}>{title}</StyledParagraph>;
  }
};

export default Heading;

const StyledHeading1 = styled.h1`
  color: var(--primary-color, black);
  font-size: 1.5rem;

  @media (min-width: ${DEVICE_BREAKPOINTS.tablet}) {
    font-size: 2rem;
  }

  @media (min-width: ${DEVICE_BREAKPOINTS.desktop}) {
    font-size: 3rem;
  }
`;

const StyledHeading2 = styled.h2`
  color: var(--primary-color, black);

  font-size: 1.25rem;

  @media (min-width: ${DEVICE_BREAKPOINTS.tablet}) {
    font-size: 1.75rem;
  }

  @media (min-width: ${DEVICE_BREAKPOINTS.desktop}) {
    font-size: 2.5rem;
  }
`;

const StyledHeading3 = styled.h3`
  color: var(--primary-color, black);
`;

const StyledHeading4 = styled.h4`
  color: var(--primary-color, black);
`;

const StyledHeading5 = styled.h5`
  color: var(--primary-color, black);
`;

const StyledHeading6 = styled.h6`
  color: var(--primary-color, black);
`;

const StyledParagraph = styled.p`
  color: var(--primary-color, black);
  font-size: 0.75rem;

  @media (min-width: ${DEVICE_BREAKPOINTS.tablet}) {
    font-size: 1rem;
  }

  @media (min-width: ${DEVICE_BREAKPOINTS.desktop}) {
    font-size: 1.25rem;
  }
`;
