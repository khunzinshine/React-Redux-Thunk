import React, { useState } from "react";
import { Menu, Icon, Header } from "semantic-ui-react";
import TopSearch from "./TopSearch";
import HeaderMenu from "./HeaderMenu";
import { system, toggleMenu } from "../../features/system/systemSlice";
import { useDispatch, useSelector } from "react-redux";
import "./TopMenu.scss";

const TopMenu = () => {
  const [activeItem, setActiveItem] = useState("inbox");
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  const dispatch = useDispatch();
  const { smallMenu } = useSelector(system);

  return (
    <Menu pointing secondary className="top-menu">
      <Menu.Menu className="center menu">
        <Menu.Item
          className="no-border"
          onClick={() => dispatch(toggleMenu({ smallMenu: !smallMenu }))}
        >
          <Header as="h2" style={{ color: "#fff" }}>
            <Icon.Group style={{ marginRight: "1rem" }}>
              <Icon
                style={{
                  color: "#fff",
                  fontSize: "25px",
                }}
                name="bars"
              />
            </Icon.Group>
            React - Thunk
          </Header>
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item>
          <TopSearch />
        </Menu.Item>
        <Menu.Item name="setting" value={activeItem} onClick={handleItemClick}>
          <HeaderMenu />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default TopMenu;
