import React, { ReactElement } from "react";
import styled from "styled-components";
import { UserActionsType, UserDataType } from "@typings/types";

import Image from "next/image";

import editIcon from "@assets/icons/edit.png";
import trashIcon from "@assets/icons/trash.png";

import { DEVICE_BREAKPOINTS } from "@libs/constants";

type UserRowType = UserDataType & UserActionsType;

function UserRow({
  id,
  name,
  role,
  email,
  isHeader,
  isChecked,
  onCheck,
  onEdit,
  onDelete,
}: UserRowType): ReactElement {
  return (
    <StyledUserRow data-item-id={id} id={id}>
      <div>
        <input
          type="checkbox"
          name={name}
          value={!isHeader ? id : "all"}
          onChange={onCheck}
          checked={isChecked}
        />
      </div>
      <p>{name}</p>
      <p>{role}</p>
      <p>{email}</p>
      {isHeader ? (
        <p>actions</p>
      ) : (
        <StyledActions>
          <StyledButton onClick={() => onEdit(id)}>
            <Image width="20" height="20" src={editIcon} alt="edit button" />
          </StyledButton>
          <StyledButton onClick={() => onDelete(id)}>
            <Image width="20" height="20" src={trashIcon} alt="delete button" />
          </StyledButton>
        </StyledActions>
      )}
    </StyledUserRow>
  );
}

export default UserRow;

const StyledUserRow = styled.div`
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
