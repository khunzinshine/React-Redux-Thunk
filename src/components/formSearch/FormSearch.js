import React, { useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import "./formSearch.scss";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

const FormSearch = ({
  onSearchAction,
  onRefreshAction,
  attributes,
  column,
}) => {
  const [searchValue, setSearchValue] = useState({});

  const handleChange = (event) => {
    if (event.target) {
      setSearchValue({
        ...searchValue,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleChangeDate = (event, { name, value }) => {
    setSearchValue({
      ...searchValue,
      [name]: value,
    });
  };

  const handleSelect = (event, result) => {
    const { name, value } = result || event.target;
    if (event.target) {
      setSearchValue({ ...searchValue, [name]: value });
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    let value = { ...searchValue };
    onSearchAction(value);
  };

  const onRefreshSubmit = (e) => {
    e.preventDefault();
    setSearchValue({});
    onRefreshAction({});
  };

  return (
    <Form>
      <Grid columns={column} container doubling stackable>
        {attributes.map((item, index) => {
          if (item.type === "select") {
            return (
              <Grid.Column>
                <Form.Dropdown
                  key={index}
                  search={true}
                  placeholder={item.label}
                  fluid
                  name={item.name}
                  multiple={item.multi || false}
                  selection
                  options={item.option}
                  onChange={handleSelect}
                  value={
                    item.multi
                      ? searchValue[item.name] || []
                      : searchValue[item.name] || ""
                  }
                />
              </Grid.Column>
            );
          } else if (item.type === "date") {
            return (
              <SemanticDatepicker
                key={index}
                className="three wide"
                id={item.name}
                name={item.name}
                placeholder={item.label}
                format="YYYY-MM-DD"
                formatOptions={"YYYY-MM-DD"}
                onChange={handleChangeDate}
                value={searchValue[item.name] || ""}
                type="range"
              />
            );
          }
          return (
            <Grid.Column>
              <Form.Input
                fluid
                range="true"
                //  width={3}
                placeholder={item.label}
                name={item.name}
                type={item.type}
                key={index}
                value={searchValue[item.name] || ""}
                onChange={handleChange}
              />
            </Grid.Column>
          );
        })}
        <Grid.Column>
          <Button
            className="btn_search"
            size="small"
            type="submit"
            style={{ background: "#0d787a", color: "white" }}
            icon="search"
            content="Search"
            onClick={onSearch}
          ></Button>

          <Button
            className="btn_search"
            size="small"
            type="submit"
            icon="refresh"
            // labelPosition="left"
            content="Refresh"
            onClick={onRefreshSubmit}
          ></Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

export default FormSearch;
