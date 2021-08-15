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
import Button from "@components/Button";

type IProps = {
  data: UserDataType[] | undefined;
  onModify: (list: UserDataType[]) => void;
};

type SelectedUsersState = number[];

function SearchResults({ data, onModify }: IProps): ReactElement {
  const [selectedUsers, setSelectedUsers] = useState<SelectedUsersState>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkBox = event.target;

    if (checkBox.value !== "all") {
      setSelectedUsers((state) => {
        return [...state, +checkBox.value];
      });
    } else {
      if (checkBox.checked) {
        setIsCheckAll(true);

        if (data) {
          setSelectedUsers(data.map((item: any) => +item.id));
        }
      } else {
        setIsCheckAll(false);
      }
    }

    if (!checkBox.checked) {
      setSelectedUsers(
        selectedUsers.filter((item) => item !== +checkBox.value)
      );
    }
  };

  useEffect(() => {
    if (!isCheckAll) {
      setSelectedUsers([]);
    }
  }, [isCheckAll]);

  useEffect(() => {
    if (data) {
      if (selectedUsers.length === data.length) {
        setIsCheckAll(true);
      } else {
        setIsCheckAll(false);
      }
    }

    if (data?.length === 0) {
      setIsCheckAll(false);
    }
  }, [selectedUsers, data]);

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
      onModify(data.filter((item) => item.id !== id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedUsers && data) {
      let finalUsersCollection = [...data];

      selectedUsers.map((id, index) => {
        finalUsersCollection = [
          ...finalUsersCollection?.filter((user) => +user.id !== id),
        ];
      });
      /**
       * Remove the selected items from the array and
       * update the state with those values
       */
      onModify(finalUsersCollection);
      setSelectedUsers([]);
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
            isChecked={isCheckAll}
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
                isChecked={selectedUsers.includes(+id)}
                onEdit={handleEditRow}
                onDelete={handleDeleteRow}
                onCheck={handleCheckBoxChange}
              />
            </li>
          ))}
      </StyledList>
      <Button
        color="#b61919"
        text="Delete Selected Items"
        disabled={selectedUsers.length > 0 ? false : true}
        onClick={handleDeleteSelected}
        type="button"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
          fontSize: "0.85rem",
        }}
      >
        <span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </span>
        <span style={{ marginLeft: 5 }}>Delete Selected</span>
      </Button>
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
              <Button text="Update" type="submit" />
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
