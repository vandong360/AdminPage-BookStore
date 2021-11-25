import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";

const CategoryItem = (props) => {
  const url = "/dashboard/products/";
  const category = props.category;
  const primary = props.primary;

  return (
    <Link to={url + category} className="link-style">
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <LabelImportantTwoToneIcon sx={{ color: "#eb8334" }} />
        </ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </Link>
  );
};

export default CategoryItem;
