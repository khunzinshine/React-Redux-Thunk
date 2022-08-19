import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TextIcon from "../../components/extension/TextIcon";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu, system } from "../../features/system/systemSlice";
import "./SideMenu.scss";
import MainContent from "../MainContent/MainContent";

const SideMenuBar = () => {
  const [expandState, setExpandState] = useState({
    name: "DashBoard",
    expand: false,
  });

  const dispatch = useDispatch();
  const { smallMenu } = useSelector(system);

  const menuList = [
    { name: "DashBoard", to: "/admin/dashboard", icon: "home" },
    { name: "Author", to: "/admin/list", icon: "user" },
  ];

  const handleItemClick = (e, { name }) => {
    setExpandState({
      ...expandState,
      name: name,
    });

    if (smallMenu) {
      dispatch(toggleMenu({ smallMenu: !smallMenu }));
    }
  };

  const getMenu = () => {
    return (
      <Menu
        fixed="left"
        borderless
        className={(smallMenu ? "small-side" : "") + " side"}
        vertical
      >
        {menuList &&
          menuList.map((menu, index) => {
            return (
              <Menu.Item
                as={Link}
                to={menu.to}
                name={menu.name}
                active={expandState.name === menu.name}
                key={index}
                onClick={handleItemClick}
              >
                <TextIcon
                  hideText={smallMenu}
                  name={menu.icon}
                  submenu={false}
                  size={"large"}
                >
                  {menu.name}
                </TextIcon>
              </Menu.Item>
            );
          })}
      </Menu>
    );
  };

  return (
    <div className="parent">
      <div className={(smallMenu ? "small-side " : "") + "side"}>
        {menuList && getMenu()}
      </div>
      <div className={(smallMenu ? "small-content " : "") + "body-content"}>
        <MainContent />
      </div>
    </div>
  );
};

export default SideMenuBar;
