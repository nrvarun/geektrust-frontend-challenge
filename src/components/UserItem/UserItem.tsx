import React, { memo, ReactElement } from "react";
import styled from "styled-components";
import { UserActionsType, UserDataType } from "@typings/types";

import Image from "next/image";

import editIcon from "@assets/icons/edit.png";
import trashIcon from "@assets/icons/trash.png";

import { DEVICE_BREAKPOINTS } from "@libs/constants";
import useWindowSize from "@hooks/useWindowSize";

type UserRowType = UserDataType & UserActionsType;

function UserItem({
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
  const { width } = useWindowSize();

  const UserContent = () => (
    <>
      <StyledUserName>{name}</StyledUserName>
      <StyledUserRole>{role}</StyledUserRole>
      <StyledUserEmail>{email}</StyledUserEmail>
    </>
  );

  return (
    <StyledUserRow
      data-item-id={id}
      id={id}
      style={{
        backgroundColor: !isHeader && isChecked ? "#EDEEF7" : "transparent",
      }}
    >
      <StyledInputWrapper>
        <input
          type="checkbox"
          name={name}
          value={!isHeader ? id : "all"}
          onChange={onCheck}
          checked={isChecked}
        />
      </StyledInputWrapper>
      {width && width > 767 ? (
        <UserContent />
      ) : (
        <div>
          <UserContent />
        </div>
      )}
      {isHeader ? (
        <p>{width && width > 767 ? "actions" : ""}</p>
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

export default UserItem;

const StyledInputWrapper = styled.div`
  display: inline-block;
`;

const StyledUserName = styled.p`
  font-size: 1rem;
  font-weight: 700 !important;
  margin: 0 0 0.85rem 0;

  @media (min-width: ${DEVICE_BREAKPOINTS.desktop}) {
    font-weight: 400 !important;
  }
`;

const StyledUserRole = styled.p`
  font-size: 0.85rem;
  font-weight: 600;

  @media (min-width: ${DEVICE_BREAKPOINTS.desktop}) {
    font-size: 1rem;
  }
`;

const StyledUserEmail = styled.p`
  font-size: 0.85rem;
  font-weight: 400 !important;

  @media (min-width: ${DEVICE_BREAKPOINTS.desktop}) {
    font-size: 1rem;
  }
`;

const StyledUserRow = styled.div`
  padding: 1rem;
  width: 100%;
  grid-template-columns: 0.5fr 1fr 0.75fr 1fr 0.5fr;
  justify-content: center;
  align-items: center;
  position: relative;
  display: grid;

  p {
    color: ${({ id }) => (id === "0" ? "#000000" : "#716f81")};
    text-transform: ${({ id }) => (id === "0" ? "capitalize" : "normal")};
    font-weight: ${({ id }) => (id === "0" ? "700" : "400")};
  }
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 30px;
  right: 0;
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
