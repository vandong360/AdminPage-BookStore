import React from "react";
import Alert from "@mui/material/Alert";

const PopupAlert = ({ info }) => {
  return info === null ? null : (
    <Alert variant="filled" severity={info.type}>
      {info.message}
    </Alert>
  );
};

export default PopupAlert;
