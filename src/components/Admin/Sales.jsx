import React from "react";
import useTodos from "../../hooks/useTodos";
import Loader from "./../Common/Loader";
import { useState } from "react";

const Sales = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { data: todos, error, isLoading } = useTodos(page, pageSize);

  return (
    <>
      <h3>Todos Page</h3>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {error && <em style={{ color: "red" }}>{error.message}</em>}
      {todos?.map((t, index) => (
        <li className="todos_item" key={t.id}>
          {(page - 1) * pageSize + index + 1}. {t.title}
        </li>
      ))}
      <button
        disabled={page === 1}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Previous
      </button>
      <p>Page {page}</p>
      <button
        disabled={page * pageSize >= 200}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
    </>
  );
};

export default Sales;
