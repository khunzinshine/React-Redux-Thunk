import React from "react";
import { Segment, Table } from "semantic-ui-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonComponent = ({
  className,
  count,
  columnData,
  selectedPerPage,
  size,
}) => {
  const renderRows = () => {
    const rows = [];
    for (let index = 0; index < columnData; index++) {
      rows.push(
        <Table.Cell key={index}>
          <Skeleton
            count={count}
            style={{ marginTop: "25px" }}
            height={size ? size : 35}
          />
        </Table.Cell>
      );
    }
    return rows;
  };

  return (
    <>
      {selectedPerPage ? (
        <Segment className={className}>
          <Skeleton width={350} height={20} borderRadius={30} />
          <Table>{renderRows()}</Table>
          <Skeleton width={600} height={40} borderRadius={10} />
        </Segment>
      ) : (
        <Segment className={className}>
          <Table>{renderRows()}</Table>
        </Segment>
      )}
    </>
  );
};

export default SkeletonComponent;
