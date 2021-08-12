import React, { ReactElement } from "react";
import styled from "styled-components";
import { UserDataType } from "../../types";

import Image from "next/image";

import editIcon from "../../assets/icons/edit.png";
import trashIcon from "../../assets/icons/trash.png";

import { DEVICE_BREAKPOINTS } from "../../libs";

function UserItem({
  id,
  name,
  role,
  email,
  isHeader,
}: UserDataType): ReactElement {
  return (
    <StyledUserItem data-item-id={id} id={id}>
      <div>{!isHeader && <input type="checkbox" name={name} value={id} />}</div>
      <p>{name}</p>
      <p>{role}</p>
      <p>{email}</p>
      {isHeader ? (
        <p>actions</p>
      ) : (
        <StyledActions>
          <StyledButton>
            <Image width="20" height="20" src={editIcon} alt="edit button" />
          </StyledButton>
          <StyledButton>
            <Image width="20" height="20" src={trashIcon} alt="delete button" />
          </StyledButton>
        </StyledActions>
      )}
    </StyledUserItem>
  );
}

export default UserItem;

const StyledUserItem = styled.div`
  padding: 1rem;
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.75fr 1fr 0.5fr;
  justify-content: center;
  align-items: center;

  p {
    font-size: 0.75rem;
    color: ${({ id }) => (id === "0" ? "#000000" : "#716f81")};
    text-transform: ${({ id }) => (id === "0" ? "capitalize" : "normal")};
    font-weight: ${({ id }) => (id === "0" ? "700" : "400")};

    @media (min-width: ${DEVICE_BREAKPOINTS.tablet}) {
      font-size: 0.85rem;
    }

    @media (min-width: ${DEVICE_BREAKPOINTS.desktop}) {
      font-size: 1rem;
    }
  }
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  margin: 0 1rem 0 0;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: transparent;
    border: none;
  }
`;
