import React, { FC } from "react";
import { PER_PAGE } from "util/utils";
import Link from "next/link";
interface TPaginationProps {
  total: number;
  page: number;
}

const Pagination: FC<TPaginationProps> = ({ total, page }) => {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <div className="pagination-container">
      <div>
        {page > 1 && (
          <Link href={`/events?page=${page - 1}`}>
            <span className="btn-secondary">Prev</span>
          </Link>
        )}
      </div>
      <div>
        {page < lastPage && (
          <Link href={`/events?page=${page + 1}`}>
            <span className="btn-secondary">Next</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
