import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import SearchInput from "@components/SearchInput";
import useUserData from "@hooks/useUserData";
import SearchResults from "../SearchResults";
import Container from "@components/Container";
import Heading from "@components/Heading";
import { UserDataType } from "@typings/types";
import Pagination from "@components/Pagination";

const PAGINATION_SIZE = 5;

type Props = {};

function SearchListing({}: Props): ReactElement {
  const { data, isError, isLoading, isSuccess } = useUserData();

  const [results, setResults] = useState<UserDataType[] | null>();
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (data && data.length > PAGINATION_SIZE) {
      /**
       * Initialize the state with the first page contents
       */
      setResults(data.slice(0, PAGINATION_SIZE));
    }
  }, [data]);

  const handlePageChange = (page: number, list: UserDataType[]) => {
    console.log("Handle Page Change", page);
    setActivePage(page);
    setResults(list);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;

    if (searchQuery !== "" && results) {
      setResults(
        results.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery) ||
            item.email.toLowerCase().includes(searchQuery) ||
            item.role.toLowerCase().includes(searchQuery)
        )
      );
    } else {
      setResults(
        data.slice(
          activePage * PAGINATION_SIZE - PAGINATION_SIZE,
          activePage * PAGINATION_SIZE
        )
      );
    }
  };

  return (
    <section>
      <Container>
        <Heading title="Admin UI" />
        <form>
          <SearchInput
            id="searchInput"
            name="search-input"
            placeholder="Search by Name, email or role..."
            onChange={handleSearch}
          />
        </form>
        {results && (
          <SearchResults
            data={results}
            currentPage={activePage}
            onModify={handlePageChange}
          />
        )}
        {data && data.length > PAGINATION_SIZE && (
          <Pagination
            list={data}
            onPageChange={handlePageChange}
            size={PAGINATION_SIZE}
          />
        )}
      </Container>
    </section>
  );
}

export default SearchListing;
