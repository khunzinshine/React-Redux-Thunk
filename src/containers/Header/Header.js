import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import './Header.scss';

class Header extends Component {
  render() {
    const menu = this.props.menu;

    return (
      <div className="header-container">
        {menu && (
          <>
            <h2 className="top-header">{menu.name}</h2>
            <div className="sub-header">
              <h5>
                <Icon name={menu.icon} />
                {menu.name} &emsp; / &emsp;
                <Icon name={menu.icon} />
                {menu.name}
              </h5>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Header;
