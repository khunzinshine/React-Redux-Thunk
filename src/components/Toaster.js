import React from "react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

import PropTypes from "prop-types";

const Toaster = ({ title, body, type, show, color }) => {
  setTimeout(() => {
    if (show) {
      toast({
        type: type,
        icon: "undefined",
        size: "mini",
        title: title,
        description: body,
        time: 5000,
        color: color,
        onDismiss: () => console.log("you have dismissed this toast"),
      });
    }
  }, 1000);

  return <SemanticToastContainer position="top-right" />;
};

Toaster.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default Toaster;
