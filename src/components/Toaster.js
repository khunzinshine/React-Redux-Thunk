import React from "react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import PropTypes from "prop-types";

const Toaster = ({ title, body, type, show, color }) => {
  setTimeout(() => {
    if (show) {
      toast({
        type: type,
        icon: "earlybirds",
        size: "small",
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
  title: PropTypes.string,
  body: PropTypes.string,
};

export default Toaster;
