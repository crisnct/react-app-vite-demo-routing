import React from "react";
import { useSearchParams } from "react-router-dom";

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy");
  const category = searchParams.get("category");

  return (
    <div>
      <h2>
        Articles
        <p>
          SortBy: {sortBy}, Category: {category}
        </p>
      </h2>
      <button onClick={() => setSearchParams({ sortBy: "views", category })}>
        Sort by views
      </button>
    </div>
  );
};

export default Articles;
