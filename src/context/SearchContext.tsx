import useMembers from "@hooks/useMembers";
import { UserDataType } from "@typings/types";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type SearchContextProviderType = {
  children: React.ReactElement | React.ReactElement[];
};

export interface SearchContextInterface {
  users: UserDataType[] | [];
  setUser: any;
}

export const SearchContext = createContext<SearchContextInterface | null>(null);

const SearchContextProvider = ({ children }: SearchContextProviderType) => {
  const [users, setUser] = useState<UserDataType[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
      const data = await res.json();

      setUser(data);
    };

    getUserData();
  }, []);

  useEffect(() => {
    console.log("User collection", users);
  }, [users]);

  return (
    <SearchContext.Provider value={{ users, setUser }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
