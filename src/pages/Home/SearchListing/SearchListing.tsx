import React, { ReactElement, useEffect, useState } from "react";
import SearchInput from "../../../components/SearchInput";
import useUserData from "../../../hooks/useUserData";
import SearchResults from "../SearchResults";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import { UserDataType } from "../../../types";
import Pagination from "../../../components/Pagination";

const PAGINATION_SIZE = 5;

type Props = {};

function SearchListing({}: Props): ReactElement {
  const { data, isError, isLoading, isSuccess } = useUserData();

  const [results, setResults] = useState<UserDataType[] | null>();

  useEffect(() => {
    if (data && data.length > PAGINATION_SIZE) {
      /**
       * Initialize the state with the first page contents
       */
      setResults(data.slice(0, PAGINATION_SIZE));
    }
  }, [data]);

  const handlePageChange = (list: UserDataType[]) => {
    console.log("Handle Page Change");
    setResults(list);
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
          />
        </form>
        {results && <SearchResults data={results} />}
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
