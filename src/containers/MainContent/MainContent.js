import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./MainContent.scss";
import routes from "../../routes";

const MainContent = (props) => {
  return (
    <div>
        <Switch>
          {routes.map(
            (route) =>
              route.component && (
                <Route
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => <route.component {...props} />}
                />
              )
          )}
        </Switch>

    </div>
  );
};

export default React.memo(MainContent);
