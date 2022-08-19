import React from "react";
import { Dropdown } from "semantic-ui-react";

const limitOptions = [
  { key: "0", value: 5, text: "5" },
  { key: "1", value: 10, text: "10" }
];

const PageSizeSelect = ({
  limit,
  onChangeLimit,
}) => {

  const handleChangeLimit = (
    event, { value }
  ) => {
    onChangeLimit(value);
  };
  return (
    <React.Fragment>
      Selected per page : {' '}
      <Dropdown
        inline={false}
        options={limitOptions}
     //   defaultValue={limit.toString()}
        value={limit}
        onChange={handleChangeLimit}
      />
    </React.Fragment>
  );
};

export default PageSizeSelect
