import { DEVICE_BREAKPOINTS } from "@libs/constants";
import styled from "styled-components";

import Image from "next/image";

import errorIcon from "@assets/icons/error.png";
import emptyIcon from "@assets/icons/empty.png";

export const EmptyState = () => {
  return (
    <StyledWrapper>
      <Image src={emptyIcon} alt="" />
      <p>I am so lonely 😶, There are not items to show...</p>
    </StyledWrapper>
  );
};

export const ErrorState = () => {
  return (
    <StyledWrapper>
      <Image src={errorIcon} alt="" />
      <p>I failed you, i could not fetch data 😞</p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 3rem 0;
  margin: 2rem 0 0 0;
  border-radius: 0.25rem;
  border: 1px dashed #999999;
  text-align: center;

  img {
    height: 3rem;
    width: auto;
  }

  @media (min-width: ${DEVICE_BREAKPOINTS.tablet}) {
    padding: 4rem 0;

    img {
      height: 4rem;
    }
  }

  @media (min-width: ${DEVICE_BREAKPOINTS.desktop}) {
    padding: 6rem 0;

    img {
      height: 5rem;
    }
  }

  p {
    font-size: 1rem;
    color: #999999;
  }
`;
