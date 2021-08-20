import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import SearchInput from "@components/SearchInput";

import SearchResults from "../SearchResults";
import Container from "@components/Container";
import Text from "@components/Text";
import { UserDataType } from "@typings/types";
import Pagination from "@components/Pagination";
import { EmptyState, ErrorState } from "@components/EmptyState";
import useMembers from "@hooks/useMembers";
import { filter } from "lodash";

const PAGINATION_SIZE = 5;

type SearchListingProps = {};

function SearchListing({}: SearchListingProps): ReactElement {
  /**
   * Store the results and the search field value in the state
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState<UserDataType[] | null>();
  const [searchQuery, setSearchQuery] = useState("");
  /**
   * Get the data from the React Query with the custom hook
   */
  const { data, isError } = useMembers();

  useEffect(() => {
    setResults(data);
  }, [data]);

  /**
   * Every time the data changes, check if there is data and
   * check the length and then update the results state with that.
   */
  useEffect(() => {
    if (data) {
      /**
       * Initialize the state with the first page contents
       */
      const filteredResults = data.slice(
        currentPage * PAGINATION_SIZE - PAGINATION_SIZE,
        currentPage * PAGINATION_SIZE - PAGINATION_SIZE + PAGINATION_SIZE
      );

      if (filteredResults.length) {
        setResults(filteredResults);
      } else {
        setCurrentPage((state) => state - 1);
      }
    }
  }, [data, currentPage]);

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
