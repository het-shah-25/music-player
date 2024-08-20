import React from "react";
import { Modal, Button, Input } from "antd";

const CustomModal = ({
  visible,
  onClose,
  onSubmit,
  title = "Modal Title",
  children,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onSubmit}>
          Submit
        </Button>,
      ]}
      onOk={onSubmit}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
