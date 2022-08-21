import React, { useState, useEffect } from "react";
import {
  Table,
  Pagination,
  Button,
  Dropdown,
  Checkbox,
  Segment,
  Icon,
  Popup,
  Modal,
  Label,
} from "semantic-ui-react";
import { variableNameToWords } from "../../utils/stringFormatter";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Table.scss";
import PageSizeSelect from "./PageSizeSelect";
import { changeSort } from "../../features/dataList/dataListSlice";
import moment from "moment";
import SkeletonComponent from "../skeleton/SkeletonComponent";
import { getTotalCountFormat } from "../../utils/common";

const DataTable = ({
  listData,
  columns,
  onChangeLimit,
  isLoading,
  searchKey,
  fetchDataPerPage,
  renderBodyRow,
  actionList,
  key,
  totalCount,
  sizeSelected,
  itemsPerPage,
  currentPage,
}) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const data = columns.map((data) => data.key);
  const [selection, setSelection] = useState(data);
  const [modal, setModal] = useState(false);

  let sortCol = useSelector(({ dataList }) => dataList.column || null);
  let sortDirection = useSelector(({ dataList }) => dataList.direction || null);
  const totalPages = totalCount && Math.ceil(totalCount / itemsPerPage);

  const [columnData, setColumn] = useState(columns);
  const fields = [];
  const childFields = [];

  useEffect(() => {
    if (currentPage && itemsPerPage) {
      history.push(
        encodeURI(
          `?page=${currentPage}&itemsPerPage=${itemsPerPage}&search?query=${searchKey}`
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, searchKey]);

  if (columnData.length > 0) {
    columnData.forEach((columnName) => {
      if (columnName.key && columnName.key.includes("hidden")) {
        fields.push({
          key: columnName.key,
          label:
            columnName.key === "actions" ? (
              <Dropdown
                item
                simple
                icon={
                  <Icon name="columns" link onClick={() => setModal(!modal)} />
                }
              >
                <Modal
                  open={modal}
                  size="mini"
                  style={{ padding: "15px", fontSize: "3rem" }}
                >
                  <Dropdown.Menu>
                    {columns
                      .filter(
                        (item) => item.key !== "index" && item.key !== "actions"
                      )
                      .map(({ key, label }) => {
                        return (
                          <Dropdown.Item key={key}>
                            <Checkbox
                              size="small"
                              label={variableNameToWords(label)}
                              value={key}
                              defaultChecked={
                                selection.includes(key) ? true : false
                              }
                              onChange={(e, data) => handleChange(e, data)}
                            />
                          </Dropdown.Item>
                        );
                      })}
                    <Dropdown.Item>
                      <Button
                        content={"Confirm"}
                        variant="outline"
                        shape="square"
                        size="medium"
                        style={{ backgroundColor: "#0d787a", color: "white" }}
                        floated="right"
                        onClick={(event) => {
                          confirmSelectColumn(event);
                        }}
                      />
                      <Button
                        content={"Cancel"}
                        variant="outline"
                        shape="square"
                        size="medium"
                        floated="right"
                        onClick={() => {
                          setModal(!modal);
                        }}
                      />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Modal>
              </Dropdown>
            ) : (
              variableNameToWords(columnName.label)
            ),
          colSpan: columnName.colSpan,
          rowSpan: columnName.rowSpan,
        });
        if (columnName.childHeader && columnName.childHeader.length > 0) {
          childFields.push(...columnName.childHeader);
        }
      } else {
        fields.push({
          key: columnName.key,
          label: columnName.label,
          colSpan: columnName.colSpan ? columnName.colSpan : 0,
          rowSpan: columnName.rowSpan ? columnName.rowSpan : 0,
        });
      }
    });
  }

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
      setModal(!modal);
    }
  };

  const handleActivePageChange = (event, data) => {
    const body = {
      skip: itemsPerPage * (data.activePage - 1),
      limit: itemsPerPage,
      search: searchKey,
    };
    fetchDataPerPage(data.activePage, itemsPerPage, body);
  };

  const onChange = (col) => {
    dispatch(changeSort(col.key));
  };

  const defaultRenderHeaderRow = () => {
    return (
      <>
        <Table.Row key={1}>
          {fields.map((col, index) => (
            <Table.HeaderCell
              key={index}
              colSpan={col.colSpan}
              rowSpan={col.rowSpan}
              sorted={sortCol === col.label ? sortDirection : null}
              onClick={() => onChange(col)}
            >
              {col.label}
            </Table.HeaderCell>
          ))}
        </Table.Row>
        <Table.Row key={2}>
          {childFields.map((item, index) => (
            <Table.HeaderCell key={index}>{item.label}</Table.HeaderCell>
          ))}
        </Table.Row>
      </>
    );
  };

  const defaultRenderBodyRow = (data, rowIndex) => {
    return {
      key: data.id || rowIndex + 1,
      cells: fields.map(({ key }, index) => {
        if (key === "index") {
          return (
            <Table.Cell key={index}>
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
                  actionList
                    .filter((a) => a.name !== "export")
                    .map((btn, index) => (
                      <Popup
                        key={index}
                        trigger={
                          <Button
                            icon
                            key={index}
                            onClick={() => btn.action(data)}
                          >
                            <Icon name={btn.icon} />
                          </Button>
                        }
                      >
                        {btn.label}
                      </Popup>
                    ))}
                {actionList &&
                  actionList
                    .filter((a) => a.name === "export")
                    .map((btn, index) => (
                      <Popup
                        key={index}
                        trigger={
                          <Button icon key={index}>
                            <a href={data.reportUrl} download>
                              <Icon name={btn.icon} />
                            </a>
                          </Button>
                        }
                      >
                        {btn.label}
                      </Popup>
                    ))}
              </Button.Group>
            </Table.Cell>
          );
        } else {
          let checkDate = moment(data[key], moment.ISO_8601, true).isValid();
          let headerName = columns.filter((c) => c.key === key)[0];
          return (
            <>
              <Table.Cell key={index}>
                {data[key] && data[key].length > 6 && checkDate
                  ? moment(new Date(data[key])).format("YYYY-MM-DD HH:mm")
                  : headerName?.format
                  ? headerName.format(data, index)
                  : data[key]}
              </Table.Cell>
            </>
          );
        }
      }),
    };
  };

  const renderRow = renderBodyRow || defaultRenderBodyRow;

  return (
    <>
      {!isLoading ? (
        <Segment>
          <div className="select-text" hidden={sizeSelected}>
            <Label size="large">
              <PageSizeSelect
                limit={itemsPerPage}
                onChangeLimit={onChangeLimit}
              />
            </Label>
            <Label size="large">
              Total Count:
              <Label.Detail>
                {totalCount ? getTotalCountFormat(totalCount) : 0}
              </Label.Detail>
            </Label>
          </div>
          {listData && listData ? (
            <div className="scroll-table">
              <Table
                key={key}
                celled
                unstackable
                headerRow={defaultRenderHeaderRow}
                renderBodyRow={renderRow}
                tableData={listData}
              />
              <Pagination
                key={key}
                totalPages={totalPages}
                activePage={currentPage}
                onPageChange={(event, data) =>
                  handleActivePageChange(event, data)
                }
              />
            </div>
          ) : (
            <div className="scroll-table">
              <Table
                key={key}
                celled
                unstackable
                headerRow={defaultRenderHeaderRow}
              />
            </div>
          )}
        </Segment>
      ) : (
        <SkeletonComponent
          count={itemsPerPage}
          columnData={columns}
          selectedPerPage
          className="skeleton-wrapper"
        />
      )}
    </>
  );
};

DataTable.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.object),
  renderBodyRow: PropTypes.func,
  fetchDataPerPage: PropTypes.func,
};

export default DataTable;
