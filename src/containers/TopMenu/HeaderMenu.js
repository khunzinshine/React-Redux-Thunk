import React, { useContext, useState } from 'react';
import { Dropdown, Icon, Button } from 'semantic-ui-react';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';

const trigger = (
  <span>
    <Icon name="user" /> User
  </span>
);

const options = [
  {
    key: 'user',
    text: (
      <span>
        Signed in as <strong>user</strong>
      </span>
    ),
    disabled: true,
    value: 'user',
  },
  {
    key: 'profile',
    text: (
      <Button
        style={{ background: 'none' }}
        as={Link}
        to="/admin/user/getProfile"
      >
        <Icon name="user circle"></Icon>Your profile
      </Button>
    ),
    value: 'profile',
  },
  {
    key: 'settings',
    text: <Icon name="setting"> Settings</Icon>,
    value: 'settings',
  },
  {
    key: 'sign-out',
    text: <Icon name="log out"> Log Out</Icon>,
    value: 'sign-out',
  },
];

const HeaderDropdown = () => {
  const auth = useContext(AuthContext);
  const [value, setValue] = useState();

  const handleChange = (e, data) => {
    if (data.value === 'sign-out') {
      auth.logout();
    }
    setValue(data.value);
  };

  return (
    <Dropdown
      options={options}
      trigger={trigger}
      value={value}
      onClick={handleChange}
      onChange={(event, data) => {
        handleChange(event, data);
      }}
    />
  );
};

export default HeaderDropdown;
