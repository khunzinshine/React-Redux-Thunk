import React from "react";
import { Tab } from "semantic-ui-react";
import "./Tab.scss";

const color = "red";
const TabComponent = ({ panes, activeIndex, handleTabChange }) => {
  const handleChange = (e, { activeIndex }) => {
    e.preventDefault();
    handleTabChange(activeIndex);
  };

  return (
    <Tab
      menu={{
        className: "wrapped",
        color,
        inverted: false,
        attached: false,
        tabular: true,
        pointing: true,
      }}
      panes={panes}
      activeIndex={activeIndex}
      onTabChange={handleChange}
      renderActiveOnly={true}
    />
  );
};

export default TabComponent;
