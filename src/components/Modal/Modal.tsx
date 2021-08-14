import styled from "styled-components";

import closeIcon from "@assets/icons/close.svg";
import Image from "next/image";
import Portal from "@HOC/Portal";
import { ModalType } from "@typings/types";
import { DEVICE_BREAKPOINTS } from "@libs/constants";

const Modal = ({ title, visible, children, handleModal }: ModalType) => {
  return (
    <Portal selector="#modalPortal">
      <StyledModalWrapper aria-hidden={!visible}>
        <StyledModalContent>
          <StyledModalHeader>
            <h2>{title}</h2>
            <button onClick={handleModal}>
              <Image
                src={closeIcon}
                alt="close button"
                width="30"
                height="30"
              />
            </button>
          </StyledModalHeader>
          <StyledModalBody>{children}</StyledModalBody>
        </StyledModalContent>
        <StyledModalOverlay />
      </StyledModalWrapper>
    </Portal>
  );
};

export default Modal;

const StyledModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: #3837378f;
  z-index: 100;
`;

const StyledModalHeader = styled.header`
  padding: 0.85rem 1rem;
  position: relative;

  h1,
  h2,
  h3 {
    font-size: 1.25rem;
    color: var(--primary-color, #01ade5);
    margin: 0.5rem 0 0 0;
  }

  button {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    box-shadow: none;
    color: var(--primary-color, #01ade5);
  }
`;

const StyledModalBody = styled.div`
  padding: 0.85rem 1rem;
`;

const StyledModalContent = styled.div`
  margin: auto;
  min-width: 200px;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
  z-index: 110;

  @media (min-width: ${DEVICE_BREAKPOINTS.tablet}) {
    min-width: 350px;
  }
`;

const StyledModalOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
`;
