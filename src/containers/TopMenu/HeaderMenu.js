import React, { useContext, useState } from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import { AuthContext } from "../../context/authContext";

const trigger = (
  <Icon.Group style={{ color: "#fff" }}>
    <Icon size="big" name="circle outline" />
    <Icon name="user" />
  </Icon.Group>
);

const options = [
  {
    key: "user",
    text: (
      <span>
        Signed in as <strong>user</strong>
      </span>
    ),
    disabled: true,
    value: "user",
  },
  {
    key: "sign-out",
    text: <Icon name="log out"> Log Out</Icon>,
    value: "sign-out",
  },
];

const HeaderDropdown = () => {
  const auth = useContext(AuthContext);
  const [value, setValue] = useState();

  const handleChange = (e, data) => {
    if (data.value === "sign-out") {
      auth.logout();
    }
    setValue(data.value);
  };

  return (
    <Dropdown
      options={options}
      trigger={trigger}
      value={value}
      icon={null}
      onClick={handleChange}
      onChange={(event, data) => {
        handleChange(event, data);
      }}
    />
  );
};

export default HeaderDropdown;
