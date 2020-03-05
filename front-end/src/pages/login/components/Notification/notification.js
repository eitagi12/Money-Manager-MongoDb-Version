import { notification } from "antd";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const successLoginNotification = message => {
  notification.open({
    message: "Login successfull",
    description: "Welcome to Money Manager",
    icon: <CheckIcon />
  });
};

const failLoginNotification = message => {
  notification.open({
    message: "Login Failed",
    description: "Please check your username and password",
    icon: <ClearIcon />
  });
};

export { successLoginNotification, failLoginNotification };
