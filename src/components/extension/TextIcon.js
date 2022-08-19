import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import "./TextIcon";

const TextIcon = (props) => {
  const textIconStyle = {
    alignSelf: "center",
    paddingLeft: "4px",
    minWidth: "-webkit-fill-available",
  };

  return (
    <div
      className="menu-item"
      style={{
        whiteSpace: "nowrap",
        display: "flex",
        minWidth: "-webkit-fill-available",
      }}
    >
      <div>
        <Icon
          size={props.size}
          className="icon_color"
          color={props.color}
          name={props.name}
        />
      </div>
      <div style={textIconStyle} hidden={props.hideText}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ textAlign: "left" }}>{props.children}</div>
          <div style={{ paddingRight: "20px" }}>
            {props.submenu && (
              <Icon name={props.show ? "angle up" : "angle down"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TextIcon.propTypes = {
  name: PropTypes.string.isRequired,
  hideText: PropTypes.bool.isRequired,
  color: PropTypes.string,
  show: PropTypes.bool.isRequired,
};

export default TextIcon;
