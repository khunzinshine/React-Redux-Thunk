import React from 'react';
import {Pagination } from "semantic-ui-react";

const Paginator = ({
  totalCount,
  itemsPerPage,
  currentPage,
  searchKey,
  fetchDataPerPage,
}) => {

  const totalPages = totalCount && Math.ceil(totalCount / itemsPerPage);

  const handleActivePageChange = (event, data) => {
    const body = {
        skip: itemsPerPage * (data.activePage - 1),
        limit: itemsPerPage,
        search: searchKey,
    };
    fetchDataPerPage(data.activePage, itemsPerPage, body);
}
  return (
    <div className={'mt-2'}>
      <Pagination
        totalPages={totalPages}
        activePage={currentPage}
        onPageChange={(event, data) => handleActivePageChange(event, data)}
      />

      
    </div>
  );
};

export default Paginator;
