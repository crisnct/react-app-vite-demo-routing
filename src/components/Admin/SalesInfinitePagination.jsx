import React, { useEffect, useState } from "react";
import Loader from "../Common/Loader";
import useSellers from "../../hooks/sellers/useSellers";
import useTodosInfinite from "./../../hooks/useTodosInfinite";

const SalesInfinitePagination = () => {
  const pageSize = 50;
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useTodosInfinite(pageSize);

  return (
    <>
      <h3>Todos Page</h3>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {error && <em style={{ color: "red" }}>{error.message}</em>}
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page?.map((t, index) => (
            <li className="todos_item" key={t.id}>
              {pageIndex * pageSize + index + 1}. {t.title}
            </li>
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <button disabled={isFetchingNextPage} onClick={fetchNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
};

export default SalesInfinitePagination;
