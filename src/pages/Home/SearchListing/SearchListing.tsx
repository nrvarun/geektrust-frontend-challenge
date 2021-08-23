import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import SearchInput from "@components/SearchInput";

import SearchResults from "../SearchResults";
import Container from "@components/Container";
import Text from "@components/Text";
import { UserDataType } from "@typings/types";
import Pagination from "@components/Pagination";
import { EmptyState, ErrorState } from "@components/EmptyState";
import useMembers from "@hooks/useMembers";
import { debounce, set } from "lodash";

const PAGINATION_SIZE = 10;

type SearchListingProps = {};

function SearchListing({}: SearchListingProps): ReactElement {
  /**
   * Get the data from the React Query with the custom hook
   */
  const { data, isError, refetch } = useMembers();

  /**
   * Store the results and the search field value in the state
   */

  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState<UserDataType[] | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [collection, setCollection] = useState(data);

  useEffect(() => {
    if (data) {
      setCollection(data);
    }
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
        if (currentPage) {
          setCurrentPage((state) => state - 1);
        }
      }
    }
  }, [data, currentPage]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setCollection(
        collection.filter((item: UserDataType) => {
          return (
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
      );
    } else {
      setCollection(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const getPaginatedData = (list: UserDataType[]) => {
    if (list.length) {
      return list.slice(
        (currentPage - 1) * PAGINATION_SIZE,
        currentPage * PAGINATION_SIZE
      );
    } else {
      return [];
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
            onChange={debouncedSearch}
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
        <p>{`Found ${collection?.length} people, for the search Query ${searchQuery}.`}</p>
        {collection && !isError && collection.length !== 0 && (
          <SearchResults results={getPaginatedData(collection)} />
        )}
        {/**
         * Check if the list is empty and if so show an empty list
         */}
        {collection && collection.length === 0 && <EmptyState />}
        {/**
         * Render the pagination based on the users list and
         * pass a function to handle the page change events
         */}
        {collection &&
          collection.length > 0 &&
          collection.length > PAGINATION_SIZE && (
            <Pagination
              list={collection}
              activePage={currentPage}
              handleActivePage={setCurrentPage}
              size={PAGINATION_SIZE}
            />
          )}
      </Container>
    </section>
  );
}

export default SearchListing;
