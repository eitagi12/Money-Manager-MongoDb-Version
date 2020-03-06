import { notification } from "antd";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const successRegister = message => {
  notification.open({
    message: "Register Successfull",
    icon: <CheckIcon />
  });
};

const failRegister = message => {
  notification.open({
    message: "Register Failed",
    description: "Please check your infomation",
    icon: <ClearIcon />
  });
};

export { successRegister, failRegister };
