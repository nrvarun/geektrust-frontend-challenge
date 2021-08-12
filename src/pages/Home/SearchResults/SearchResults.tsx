import React, { ReactElement } from "react";
import styled from "styled-components";
import UserItem from "../../../components/UserItem";
import { UserDataType } from "../../../types";

type IProps = {
  data: UserDataType[];
};

function SearchResults({ data }: IProps): ReactElement {
  return (
    <section>
      <StyledList>
        <li>
          <UserItem
            isHeader
            id={"0"}
            role={"Role"}
            email={"email"}
            name={"name"}
          />
        </li>
        {data.map(({ id, role, email, name }, index) => (
          <li key={id}>
            <UserItem id={id} role={role} email={email} name={name} />
          </li>
        ))}
      </StyledList>
    </section>
  );
}

export default SearchResults;

const StyledList = styled.ul`
  li {
    width: 100%;
    margin: 0 0 10px 0;
    border-bottom: 1px solid #dedede;
  }
`;
