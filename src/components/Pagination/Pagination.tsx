import { UserDataType } from "@typings/types";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import Page from "./Page";

interface Props {
  size: number;
  list: UserDataType[];
  onPageChange: (arr: Array<UserDataType>) => void;
}

function Pagination({ list, size, onPageChange }: Props): ReactElement {
  const [page, setPage] = useState(1);
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
    onPageChange(list.slice(page * size - size, page * size));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, list]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleGoToFirstPage = () => {
    setPage(1);
  };

  const handleGoToLastPage = () => {
    if (totalPages) {
      setPage(totalPages?.length);
    }
  };

  const handlePrevPageChange = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPageChange = () => {
    if (totalPages && page !== totalPages.length) {
      setPage(page + 1);
    }
  };

  return (
    <StyledPaginationWrapper>
      <Page
        text="<<"
        isActive={false}
        handleClick={handleGoToFirstPage}
        isDisabled={page === 1 ? true : false}
      />
      <Page
        text="<"
        isActive={false}
        handleClick={handlePrevPageChange}
        isDisabled={page === 1 ? true : false}
      />
      {totalPages != null &&
        totalPages.map((pageNo: number, index: number) => (
          <Page
            key={pageNo}
            text={pageNo}
            isActive={pageNo === page ? true : false}
            handleClick={() => handlePageChange(pageNo)}
          />
        ))}
      <Page
        text=">"
        isActive={false}
        handleClick={handleNextPageChange}
        isDisabled={totalPages && page === totalPages.length ? true : false}
      />
      <Page
        text=">>"
        isActive={false}
        handleClick={handleGoToLastPage}
        isDisabled={totalPages && page === totalPages.length ? true : false}
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
