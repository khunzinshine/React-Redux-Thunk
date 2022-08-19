import React, { createContext, useState } from "react";

import Toaster from "../components/Toaster";
import { Grid } from "semantic-ui-react";

const ToastContext = createContext();
const { Provider } = ToastContext;

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({});

  const addToast = (title, message, type, color) => {
    setToast({
      ...toast,
      title: title,
      message: message,
      type: type,
      show: true,
      color: color,
    });
  };

  return (
    <Provider
      value={{
        addToast,
      }}
    >
      <Grid.Row>
        <Grid.Column sm="12" lg="6">
          <Toaster
            title={toast.title}
            body={toast.message}
            type={toast.type}
            show={toast.show}
            color={toast.color}
          />
        </Grid.Column>
      </Grid.Row>
      {children}
    </Provider>
  );
};

export { ToastContext, ToastProvider };
