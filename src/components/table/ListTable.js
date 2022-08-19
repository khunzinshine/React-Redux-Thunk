import React, { useState, useEffect } from "react";
import {
  Table,
  Pagination,
  Button,
  Dropdown,
  Checkbox,
  Loader,
  Icon,
  Segment,
  Dimmer,
} from "semantic-ui-react";
import PageSizeSelect from "./PageSizeSelect";
import _ from "lodash";
import {
  upperFirstLatterOfEachWord,
  variableNameToWords,
} from "../../utils/stringFormatter";
import moment from "moment";
import "./Table.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeSort } from "../../store/dataTable/action";
import PropTypes from "prop-types";

const ListTable = ({
  columns,
  currentPage,
  actionList,
  onChangeLimit,
  itemsPerPage,
  searchKey,
  fetchDataPerPage,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selection, setSelection] = useState(["index", "actions"]);

  const listData = useSelector(
    ({ dataTable }) => dataTable.dataList.data || []
  );
  const total = useSelector(({ dataTable }) => dataTable.dataList.total);
  let sortCol = useSelector(({ dataTable }) => dataTable.column || null);
  let sortDirection = useSelector(
    ({ dataTable }) => dataTable.direction || null
  );
  const totalPages = total && Math.ceil(total / itemsPerPage);
  const isLoading = useSelector(({ dataTable }) => dataTable.isLoading);

  const [columnData, setColumn] = useState(columns);

  const fields = [
    {
      key: "index",
      label: "No.",
    },
  ];

  if (columnData.length > 0) {
    columnData.forEach((columnName) => {
      if (!columnName.key.includes("hidden")) {
        fields.push({
          key: columnName.key,
          label:
            columnName.key === "actions" ? (
              <Dropdown item simple icon={"columns"}>
                <Dropdown.Menu>
                  {columns.map(({ key, label }) => (
                    <Dropdown.Item key={key}>
                      <Checkbox
                        size="small"
                        label={variableNameToWords(label)}
                        value={key}
                        defaultChecked={selection.includes(key) ? true : false}
                        onChange={(e, data) => handleChange(e, data)}
                      />
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item>
                    <Button
                      content={"Confirm"}
                      labelPosition="left"
                      variant="outline"
                      shape="square"
                      size="small"
                      onClick={(event) => {
                        confirmSelectColumn(event);
                      }}
                    />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              variableNameToWords(columnName.label)
            ),
        });
      } else {
        fields.push({
          key: columnName.key,
          label: columnName.label,
        });
      }
    });
  } else if (listData.length > 0) {
    Object.keys(listData[0]).forEach((columnName) => {
      fields.push({
        key: columnName,
        label: upperFirstLatterOfEachWord(columnName, "_"),
      });
    });
  }

  useEffect(() => {
    if (currentPage && itemsPerPage) {
      history.push(
        encodeURI(
          `?page=${currentPage}&itemsPerPage=${itemsPerPage}${
            searchKey ? `&${searchKey}` : ""
          }`
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, searchKey]);

  const handleChange = (e, { value, label, checked }) => {
    if (checked) {
      setSelection([...selection, value]);
    } else {
      setSelection(selection.filter((el) => el !== value));
    }
  };

  const confirmSelectColumn = (event) => {
    const filterCol = columns.filter((x) => selection.includes(x.key));
    if (filterCol.length > 0) {
      setColumn(filterCol);
    }
  };

  const onChange = (col) => {
    dispatch(changeSort(col.key));
  };

  const defaultRenderHeaderRow = (columns) => {
    return (
      <Table.Row>
        {columns.map((col, index) => (
          <Table.HeaderCell
            key={index}
            sorted={sortCol === col.label ? sortDirection : null}
            onClick={() => onChange(col)}
          >
            {col.label}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    );
  };

  const defaultRenderBodyRow = (rowIndex, colsWells, wellRow) => {
    return colsWells.map(({ key }, index) => {
      if (key === "index") {
        return (
          <Table.Cell key={index}>
            {" "}
            {itemsPerPage && currentPage
              ? rowIndex + 1 + itemsPerPage * (currentPage - 1)
              : rowIndex + 1}
          </Table.Cell>
        );
      } else if (key === "actions") {
        return (
          <Table.Cell key={index}>
            <Button.Group basic size="small" className="btn_gp">
              {actionList &&
                actionList.map((btn, index) => (
                  <Button icon key={index} onClick={() => btn.action(wellRow)}>
                    <Icon name={btn.icon} />
                  </Button>
                ))}
            </Button.Group>
          </Table.Cell>
        );
      }

      let checkDate = moment(wellRow[key], "YYYY-MM-DD HH:mm").isValid();
      return (
        <Table.Cell key={index}>
          {checkDate
            ? moment(new Date(wellRow[key])).format("YYYY-MM-DD HH:mm")
            : wellRow[key]}
        </Table.Cell>
      );
    });
  };

  const handleActivePageChange = (event, data) => {
    const body = {
      skip: itemsPerPage * (data.activePage - 1),
      limit: itemsPerPage,
      search: searchKey,
    };
    fetchDataPerPage(data.activePage, itemsPerPage, body);
  };

  return (
    <React.Fragment>
      <Segment>
        <Dimmer active={isLoading} inverted>
          <Loader size="medium" className="workaround"></Loader>
        </Dimmer>
        <PageSizeSelect limit={itemsPerPage} onChangeLimit={onChangeLimit} />
        Total count: {total}.
        <Table celled padded>
          <Table.Header>
            {fields && defaultRenderHeaderRow(fields)}
          </Table.Header>
          <Table.Body>
            {fields &&
              listData &&
              listData.map((well, index) => (
                <Table.Row key={index}>
                  {defaultRenderBodyRow(index, fields, well)}
                </Table.Row>
              ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={fields.length}>
                <Pagination
                  totalPages={totalPages}
                  activePage={currentPage}
                  onPageChange={(event, data) =>
                    handleActivePageChange(event, data)
                  }
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
    </React.Fragment>
  );
};

ListTable.propTypes = {
  fetchDataPerPage: PropTypes.func,
};

ListTable.defaultProps = {
  listData: [],
  columns: [],
};

export default ListTable;
