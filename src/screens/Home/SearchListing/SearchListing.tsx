import {
  ChangeEvent,
  memo,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import SearchInput from "@components/SearchInput";

import SearchResults from "../SearchResults";
import Container from "@components/Container";
import Text from "@components/Text";
import { UserDataType } from "@typings/types";
import Pagination from "@components/Pagination";
import { EmptyState } from "@components/EmptyState";
import { debounce, set } from "lodash";
import { SearchContext, SearchContextInterface } from "context/SearchContext";
import styled from "styled-components";

const PAGINATION_SIZE = 5;

type SearchListingProps = {};

function SearchListing({}: SearchListingProps): ReactElement {
  /**
   * Get the data from the React Query with the custom hook
   */
  const { users } = useContext(SearchContext) as SearchContextInterface;

  /**
   * Store the results and the search field value in the state
   */

  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState<UserDataType[]>();
  const [searchQuery, setSearchQuery] = useState("");
  const [collection, setCollection] = useState(users);

  useEffect(() => {
    if (users) {
      setCollection(users);
    }
  }, [users]);

  /**
   * Every time the data changes, check if there is data and
   * check the length and then update the results state with that.
   */
  useEffect(() => {
    if (users) {
      /**
       * Initialize the state with the first page contents
       */
      const filteredResults = users.slice(
        currentPage * PAGINATION_SIZE - PAGINATION_SIZE,
        currentPage * PAGINATION_SIZE
      );

      if (filteredResults.length) {
        setResults(filteredResults);
      }
    }
  }, [users, currentPage]);

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
      setCollection(users);
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
         * Check if there is data, and that no error has happened.
         * If so then show the users list
         */}
        <StyledSearchResult>
          found<StyledSearchTerm>{collection?.length}</StyledSearchTerm>
          people
          {searchQuery !== "" && (
            <>
              ,for the search query
              <StyledSearchTerm>{searchQuery}</StyledSearchTerm>
            </>
          )}
          .
        </StyledSearchResult>

        {/**
         * Show the search results in a table format
         */}
        {collection && collection.length > 0 && (
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

export default memo(SearchListing);

const StyledSearchTerm = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  margin: 0 0.2rem;
  text-decoration: underline;
`;

const StyledSearchResult = styled.p`
  font-size: 0.85rem;
  font-style: italic;
  font-weight: 300;
`;
