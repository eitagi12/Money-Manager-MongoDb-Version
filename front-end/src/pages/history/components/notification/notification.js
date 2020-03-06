import { notification } from "antd";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";

const successEdit = message => {
  notification.open({
    message: "Edit Successfull",
    icon: <CheckIcon />
  });
};

const successDelete = message => {
  notification.open({
    message: "Delete Successfull",
    icon: <CheckIcon />
  });
};

export { successEdit, successDelete };
