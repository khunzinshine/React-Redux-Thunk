import React from "react";
import {
  Route,
  Switch,
  Redirect,
  HashRouter as Router,
} from "react-router-dom";
import "./scss/style.scss";
import { AuthProvider } from "./context/authContext";
import { ToastProvider } from "./context/toastContext";
import { routWithFetchProvider as FetchProvider } from "./context/fetchContext";
import Page404 from "./views/pages/page404/Page404";
import Spinner from "./assets/images/loading.gif";

const loading = (
  <div className="ui center aligned container">
    <img
      alt="spinner"
      className="ui centered image"
      src={Spinner}
      style={{ opacity: 0.2 }}
    />
  </div>
);

// Containers
const TheLayout = React.lazy(
  async () => await import("./containers/TheLayout")
);

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));

const AppRoutes = () => {
  return (
    <React.Suspense fallback={loading}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/admin/dashboard" />
        </Route>
        <Route
          path="/admin"
          name="Home"
          render={(props) => <TheLayout {...props} />}
        />
        <Route
          path="/auth/login"
          name="Login Page"
          render={(props) => <Login {...props} />}
        />
        <Route
          exact
          path="*"
          name="404 - Not Found"
          render={(props) => <Page404 {...props} />}
        />
      </Switch>
    </React.Suspense>
  );
};

const App = () => {
  return (
    <ToastProvider>
      <Router>
        <AuthProvider>
          <FetchProvider>
            <AppRoutes />
          </FetchProvider>
        </AuthProvider>
      </Router>
    </ToastProvider>
  );
};

export default App;
