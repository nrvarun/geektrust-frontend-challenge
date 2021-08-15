import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

import Modal from "@components/Modal";
import UserItem from "@components/UserItem";
import { UserDataType } from "@typings/types";

type IProps = {
  data: UserDataType[] | undefined;
  currentPage: number;
  onModify: (page: number, list: UserDataType[]) => void;
};

function SearchResults({ data, currentPage, onModify }: IProps): ReactElement {
  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("user selected", event.target.value);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<UserDataType | null>(null);
  const [editFormFields, setEditFormFields] = useState({
    name: "",
    role: "",
    email: "",
  });

  const toggleModal = () => {
    setIsModalVisible((state) => !state);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    setEditFormFields({
      ...editFormFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    if (editItem) {
      const editedData = {
        id: editItem.id,
        ...editFormFields,
      };

      if (data) {
        onModify(
          currentPage,
          data.map((item) => (item.id === editItem.id ? editedData : item))
        );
        toggleModal();
      }
    }
  };

  const handleEditRow = (id: string) => {
    if (data) {
      const activeItem = data.filter((item) => item.id === id)[0];

      setEditItem(activeItem);
      setEditFormFields(activeItem);

      toggleModal();
    }
  };

  const handleDeleteRow = (id: string) => {
    if (data) {
      onModify(
        currentPage,
        data.filter((item) => item.id !== id)
      );
    }
  };

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
            onCheck={handleCheckBoxChange}
            onEdit={handleEditRow}
            onDelete={handleDeleteRow}
          />
        </li>
        {data &&
          data.map(({ id, role, email, name }, index) => (
            <li key={id}>
              <UserItem
                id={id}
                role={role}
                email={email}
                name={name}
                onEdit={handleEditRow}
                onDelete={handleDeleteRow}
                onCheck={handleCheckBoxChange}
              />
            </li>
          ))}
      </StyledList>
      {isModalVisible && (
        <Modal
          title={`Edit ${editItem?.name}'s Data`}
          visible={isModalVisible}
          handleModal={toggleModal}
        >
          <form id="update-user" onSubmit={handleFormSubmit}>
            <StyledFormGroup>
              <label htmlFor="name">
                <input
                  id="name"
                  required
                  aria-required="true"
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  value={editFormFields.name}
                />
              </label>
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="role">
                <select
                  id="role"
                  name="role"
                  required
                  aria-required="true"
                  onChange={handleInputChange}
                  value={editFormFields.role}
                >
                  <option value="admin">admin</option>
                  <option value="superviser">superviser</option>
                  <option value="member">member</option>
                </select>
              </label>
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="email">
                <input
                  value={editFormFields.email}
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Enter email"
                  required
                  aria-required="true"
                  onChange={handleInputChange}
                />
              </label>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledSubmitButton>Update</StyledSubmitButton>
            </StyledFormGroup>
          </form>
        </Modal>
      )}
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

const StyledFormGroup = styled.div`
  margin: 0 0 1rem 0;
  padding: 0 0 1rem 0;

  input,
  select,
  option {
    width: 100%;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    outline: none;
    border: 2px solid #eaeaea;

    &:focus,
    &:focus-visible,
    &:hover {
      border: 2px solid var(--primary-color);
    }
  }
`;

const StyledSubmitButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  box-shadow: none;
  border-radius: 2px;
  font-size: 0.85rem;
  padding: 0.5rem;
  color: var(--primary-color, #01ade5);
  border: 1px solid var(--primary-color, #01ade5);
`;
