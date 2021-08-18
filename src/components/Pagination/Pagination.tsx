import { UserDataType } from "@typings/types";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import Page from "./Page";

interface PaginationProps {
  size: number;
  list: UserDataType[];
  activePage: number;
  handleActivePage: (page: number) => void;
  onPageChange: (arr: Array<UserDataType>) => void;
}

function Pagination({
  list,
  size,
  onPageChange,
  activePage,
  handleActivePage,
}: PaginationProps): ReactElement {
  const [totalPages, setTotalPages] = useState<number[] | null>(null);

  useEffect(() => {
    /**
     * Calculate the total no. of pages from the
     * list and the pagination size (size prop)
     */
    const pages = Math.ceil(list.length / size);
    setTotalPages(
      Array(pages)
        .fill(1)
        .map((item, index) => index + 1)
    );
  }, [list, size]);

  useEffect(() => {
    onPageChange(list.slice(activePage * size - size, activePage * size));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, list]);

  const handlePageChange = (page: number) => {
    handleActivePage(page);
  };

  const handleGoToFirstPage = () => {
    handleActivePage(1);
  };

  const handleGoToLastPage = () => {
    if (totalPages) {
      handleActivePage(totalPages?.length);
    }
  };

  const handlePrevPageChange = () => {
    if (activePage > 1) {
      handleActivePage(activePage - 1);
    }
  };

  const handleNextPageChange = () => {
    if (totalPages && activePage !== totalPages.length) {
      handleActivePage(activePage + 1);
    }
  };

  return (
    <StyledPaginationWrapper>
      <Page
        text="<<"
        isActive={false}
        handleClick={handleGoToFirstPage}
        isDisabled={activePage === 1 ? true : false}
      />
      <Page
        text="<"
        isActive={false}
        handleClick={handlePrevPageChange}
        isDisabled={activePage === 1 ? true : false}
      />
      {totalPages != null &&
        totalPages.map((pageNo: number, index: number) => (
          <Page
            key={pageNo}
            text={pageNo}
            isActive={pageNo === activePage ? true : false}
            handleClick={() => handlePageChange(pageNo)}
          />
        ))}
      <Page
        text=">"
        isActive={false}
        handleClick={handleNextPageChange}
        isDisabled={
          totalPages && activePage === totalPages.length ? true : false
        }
      />
      <Page
        text=">>"
        isActive={false}
        handleClick={handleGoToLastPage}
        isDisabled={
          totalPages && activePage === totalPages.length ? true : false
        }
      />
    </StyledPaginationWrapper>
  );
}

export default Pagination;

const StyledPaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;
