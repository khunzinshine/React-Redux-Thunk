import React from "react";
import { Modal, Button, Icon, Segment } from "semantic-ui-react";
import "./Modal.scss";

const ModalComponent = ({
  title,
  modal,
  setModal,
  actions,
  size,
  closeIcon,
  footer,
  bodyData,
  ...otherProps
}) => {
  return (
    <Modal
      dimmer={"inverted"}
      className="modal-wrapper"
      size={size}
      open={modal}
      onClose={() => setModal(!modal)}
      closeIcon={closeIcon}
      closeOnDimmerClick={false}
    >
      <Modal.Header className="modalHeader ui center aligned">
        {title}
      </Modal.Header>
      <Modal.Content>{otherProps.children}</Modal.Content>
      <Modal.Actions
        className="ui center aligned"
        style={{ alignItem: "center" }}
      >
        {actions &&
          actions.length > 0 &&
          actions.map((item, index) =>
            item.value === "confirm" ? (
              <Button
                color="green"
                key={index}
                onClick={() => item.action(bodyData)}
              >
                <Icon name="check"></Icon>
                {item.label}
              </Button>
            ) : item.value === "download" ? (
              <Button
                color="green"
                key={index}
                onClick={() => item.action && item.action(bodyData)}
              >
                <Icon name="check"></Icon>
                {item.label}
              </Button>
            ) : item.value === "export" ? (
              item.downloadUrl ? (
                <a href={item.downloadUrl} download>
                  <Button
                    color="green"
                    key={index}
                    onClick={() => item.action && item.action(bodyData)}
                  >
                    <Icon name="check"></Icon>
                    {item.label}
                  </Button>
                </a>
              ) : (
                <Button
                  color="green"
                  key={index}
                  onClick={() => item.action && item.action(bodyData)}
                  disabled
                >
                  <Icon name="check"></Icon>
                  {item.label}
                </Button>
              )
            ) : item.value === "report" ? (
              <a href={item.itemValue && item.itemValue} download>
                <Button
                  color="blue"
                  key={index}
                  onClick={() => item.action(bodyData)}
                >
                  <Icon name="check"></Icon>
                  {item.label}
                </Button>
              </a>
            ) : (
              <Button
                color="danger"
                onClick={() => setModal(!modal)}
                key={index}
              >
                <Icon name="close"></Icon>
                {item.label}
              </Button>
            )
          )}
      </Modal.Actions>
      {footer && (
        <Segment style={{ backgroundColor: "#E0DFDF" }}>
          {footer.props.children}
        </Segment>
      )}
    </Modal>
  );
};

export default ModalComponent;
