import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import SearchInput from "@components/SearchInput";
import useUserData from "@hooks/useMembers";
import SearchResults from "../SearchResults";
import Container from "@components/Container";
import Text from "@components/Text";
import { UserDataType } from "@typings/types";
import Pagination from "@components/Pagination";
import { EmptyState, ErrorState } from "@components/EmptyState";

const PAGINATION_SIZE = 5;

type SearchListingProps = {};

function SearchListing({}: SearchListingProps): ReactElement {
  /**
   * Get the data from the React Query with the custom hook
   */
  const { data, isError } = useUserData();

  /**
   * Store the results and the search field value in the state
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState<UserDataType[] | null>();
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Every time the data changes, check if there is data and
   * check the length and then update the results state with that.
   */
  useEffect(() => {
    if (data && data.length > 0) {
      console.log("So this is where the shit is getting real pal");
      console.log(data, currentPage, currentPage * PAGINATION_SIZE);
      /**
       * 0,5
       * 5,10
       * 10,15
       * ....
       */
      console.log(
        data.slice(
          currentPage === 1 ? 0 : (currentPage - 1) * PAGINATION_SIZE,
          currentPage === 1 ? PAGINATION_SIZE : currentPage * PAGINATION_SIZE
        )
      );
      /**
       * Initialize the state with the first page contents
       */
      const filteredResults = data.slice(
        currentPage === 1 ? 0 : (currentPage - 1) * PAGINATION_SIZE,
        currentPage === 1 ? PAGINATION_SIZE : currentPage * PAGINATION_SIZE
      );

      setResults(filteredResults);
    }
  }, [data, currentPage]);

  useEffect(() => {
    console.log("Data changed", results);

    if (results && results.length === 0) {
      console.log(
        "Looks like it is time to go back by one page",
        currentPage,
        currentPage - 1
      );
      // setCurrentPage((state) => {
      //   console.log(state, state - 1);
      //   return state - 1;
      // });
      console.log(
        data.slice(currentPage * PAGINATION_SIZE, currentPage * PAGINATION_SIZE)
      );
      // setCurrentPage(currentPage - 1);
    }
  }, [results, currentPage]);

  const handlePageChange = (list: UserDataType[]) => {
    setResults(list);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const globalFilter = (list: UserDataType[]) => {
    if (searchQuery === "") {
      return list;
    } else {
      if (list && searchQuery)
        return list.filter(
          (item: UserDataType) =>
            item.name.toLowerCase().includes(searchQuery) ||
            item.email.toLowerCase().includes(searchQuery) ||
            item.role.toLowerCase().includes(searchQuery)
        );
    }
  };

  return (
    <section>
      <Container>
        <Text type="h1" title="Admin UI" />
        <form>
          <SearchInput
            id="searchInput"
            name="search-input"
            placeholder="Search by Name, email or role..."
            onChange={handleSearch}
          />
        </form>
        {/**
         * Check if there has been an error in processing the request and
         * if so show the error.
         */}
        {isError && <ErrorState />}
        {/**
         * Check if there is data, and that no error has happened.
         * If so then show the users list
         */}
        {results && !isError && results.length !== 0 && (
          <SearchResults results={globalFilter(results)} />
        )}
        {/**
         * Check if the list is empty and if so show an empty list
         */}
        {results && results.length === 0 && <EmptyState />}
        {/**
         * Render the pagination based on the users list and
         * pass a function to handle the page change events
         */}
        {data && data.length > 0 && data.length > PAGINATION_SIZE && (
          <Pagination
            list={data}
            activePage={currentPage}
            handleActivePage={setCurrentPage}
            onPageChange={handlePageChange}
            size={PAGINATION_SIZE}
          />
        )}
      </Container>
    </section>
  );
}

export default SearchListing;
