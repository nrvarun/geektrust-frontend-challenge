import useMembers from "@hooks/useMembers";
import { UserDataType } from "@typings/types";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type SearchContextProviderType = {
  data: UserDataType[] | [];
  children: React.ReactElement | React.ReactElement[];
};

export interface SearchContextInterface {
  users: UserDataType[] | [];
  setUsers: any;
}

export const SearchContext = createContext<SearchContextInterface | null>(null);

const SearchContextProvider = ({
  data,
  children,
}: SearchContextProviderType) => {
  const [users, setUsers] = useState<UserDataType[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (users) {
    return (
      <SearchContext.Provider value={{ users, setUsers }}>
        {children}
      </SearchContext.Provider>
    );
  }

  return (
    <div style={{ height: 300, display: "flex" }}>
      <p style={{ margin: "auto" }}>loading...</p>
    </div>
  );
};

export default SearchContextProvider;
