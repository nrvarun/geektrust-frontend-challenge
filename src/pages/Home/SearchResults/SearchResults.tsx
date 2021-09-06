import React, {
  ChangeEvent,
  memo,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

import Modal from "@components/Modal";
import UserItem from "@components/UserItem";
import Button from "@components/Button";
import { UserDataType } from "@typings/types";
import { SearchContext, SearchContextInterface } from "context/SearchContext";
import useWindowSize from "@hooks/useWindowSize";

type IProps = {
  results: UserDataType[];
};

type SelectedUsersState = number[];

function SearchResults({ results }: IProps): ReactElement {
  const [selectedUsers, setSelectedUsers] = useState<SelectedUsersState>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const { width } = useWindowSize();

  const { users, setUser } = useContext(
    SearchContext
  ) as SearchContextInterface;

  const handleCheckBoxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checkBox = event.target;

      if (checkBox.value !== "all") {
        if (checkBox.checked) {
          setSelectedUsers((state) => {
            return [...state, +checkBox.value];
          });
        } else {
          setSelectedUsers(
            selectedUsers.filter((item) => item !== +checkBox.value)
          );
        }
      } else {
        setIsCheckAll(checkBox.checked);

        if (checkBox.checked) {
          if (results) {
            setSelectedUsers(results.map((item: any) => +item.id));
          }
        } else {
          setSelectedUsers([]);
        }
      }
    },
    [results, selectedUsers]
  );

  useEffect(() => {
    if (results) {
      if (selectedUsers.length === results.length) {
        setIsCheckAll(true);
      } else {
        setIsCheckAll(false);
      }
    }
  }, [selectedUsers, results]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<UserDataType | null>(null);
  const [editFormFields, setEditFormFields] = useState({
    name: "",
    role: "",
    email: "",
  });

  const toggleModal = useCallback(() => {
    setIsModalVisible((state) => !state);
  }, []);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      setEditFormFields({
        ...editFormFields,
        [e.target.name]: e.target.value,
      });
    },
    [editFormFields]
  );

  const handleFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (editItem) {
        const editedData = {
          id: editItem.id,
          ...editFormFields,
        };

        if (results && users) {
          setUser(
            users.map((user: UserDataType) =>
              user.id === editItem.id ? editedData : user
            )
          );
          toggleModal();
        }
      }
    },
    [editFormFields, editItem, results, toggleModal, users]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      if (results) {
        const activeItem = results.filter((item) => item.id === id)[0];

        setEditItem(activeItem);
        setEditFormFields(activeItem);

        toggleModal();
      }
    },
    [results, toggleModal]
  );

  const handleDeleteRow = useCallback(
    (id: string) => {
      if (results && users) {
        setUser(users.filter((item: UserDataType) => item.id !== id));
      }
    },
    [results, users]
  );

  const handleDeleteSelected = useCallback(() => {
    if (selectedUsers && users) {
      let finalUsersCollection = [...users];

      selectedUsers.map((id, index) => {
        finalUsersCollection = [
          ...finalUsersCollection?.filter((user) => +user.id !== id),
        ];
      });
      /**
       * Remove the selected items from the array and
       * update the state with those values
       */
      setUser(finalUsersCollection);
      setSelectedUsers([]);
    }
  }, [selectedUsers, users]);

  return (
    <section>
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
        <span style={{ marginLeft: 5 }}>{`(${selectedUsers.length})`}</span>
      </Button>
      <StyledList>
        <li>
          <UserItem
            isHeader
            id={"0"}
            role={width && width > 767 ? "Role" : ""}
            email={width && width > 767 ? "email" : ""}
            name={width && width > 767 ? "Name" : ""}
            isChecked={isCheckAll}
            onCheck={handleCheckBoxChange}
            onEdit={handleEditRow}
            onDelete={handleDeleteRow}
          />
        </li>
        {results &&
          results.map(({ id, role, email, name }, index) => (
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
  padding: 0 0 1rem 0;

  li {
    width: 100%;
    margin: 0 0 10px 0;
    border-bottom: 1px solid #a2dbfa;

    &:last-child {
      border-color: transparent;
    }
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
