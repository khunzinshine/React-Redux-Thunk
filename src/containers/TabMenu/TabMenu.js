import React, { useEffect } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { activateMenu, system } from '../../features/system/systemSlice';
import { addToTab, removeTab } from '../../features/system/systemSlice';
import './TabMenu.scss';

const TabMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const searchParam = history.location.search;
  const pathName = history.location.pathname;
  const pathArray = pathName.split('/');
  let tabName = pathArray[pathArray.length - 1];

  const { tabs, menuList, activeMenu } = useSelector(system)
  const selectedMenu = [...menuList];

  const getSelectedTab = (pathName) => {
    if (pathName !== '/admin/dashboard') {
      return selectedMenu.find((menu) => menu.to === pathName);
    }
    return null;
  };

  useEffect(() => {
    let latestTab = tabs[tabs.length - 1];
    history.replace(latestTab.path);
    dispatch(activateMenu(latestTab.name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs.length]);

  useEffect(() => {
    // find Menu name by PathName
    const selectedMenuTab = getSelectedTab(pathName);
    if (selectedMenuTab) {
      const tabObj = {
        name: selectedMenuTab && selectedMenuTab.name,
        path: pathName.concat(searchParam),
        pathname: selectedMenuTab.to,
        key: tabName,
      };

      dispatch(addToTab(tabObj));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  const handleClick = (e, { name, to }) => {
    dispatch(activateMenu(name));
  };

  const deleteTab = (tab) => {
    dispatch(removeTab(tab));
  };

  return (
    <Menu color="large" inverted className="tabmenu" pointing secondary>
      {tabs.map((tab, index) => {
        return (
          <Menu.Item
            key={index}
            as={NavLink}
            exact
            to={tab.path}
            name={tab.name}
            active={activeMenu === tab.name}
            onClick={handleClick}
          >
            {tab.name}
            {tab.name !== 'Dashboard' && (
              <Icon name="right remove" onClick={() => deleteTab(tab)} />
            )}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default TabMenu;
