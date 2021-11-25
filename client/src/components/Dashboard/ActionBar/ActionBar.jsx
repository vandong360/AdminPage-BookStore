import React from 'react';
import './ActionBar.css'
import { BrowserRouter as Route, Link} from 'react-router-dom'
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ContactsIcon from "@mui/icons-material/Contacts";
import CategoryItem from "./MenuItem"

const iconStyle = {
  color: 'white',
}

const MenuItem = [
  { category: "giao-khoa", primary: "Sách Giáo Khoa" },
  { category: "van-hoc", primary: "Sách Văn Học" },
  { category: "kinh-te", primary: "Sách Kinh Tế" },
  { category: "kinh-te", primary: "Sách Thiếu Nhi" },
  { category: "tam-ly", primary: "Sách Tâm Lý" },
  { category: "lap-trinh", primary: "Sách Lập Trình" },
  { category: "khoa-hoc", primary: "Sách Khoa Học" },
];

export default function ActionBar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="menu-manage">
        <List
          sx={{ width: "100%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
                bgcolor: "#00293a",
                margin: "2rem 0",
              }}
              component="div"
              id="nested-list-subheader"
            >
              <h4>Dashboard</h4>
            </ListSubheader>
          }
        >
          <Link to="/dashboard/order" className="link-style">
            <ListItemButton>
              <ListItemIcon sx={iconStyle}>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary="Đơn hàng" />
            </ListItemButton>
          </Link>

          <Link to="/dashboard/products" className="link-style">
            <ListItemButton onClick={handleClick}>
              <ListItemIcon sx={iconStyle}>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Kho Sách" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </Link>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {MenuItem.map((item) => {
                return (<CategoryItem category={item.category} primary={item.primary}/>)
              })}
            </List>
          </Collapse>

          <Link to="/dashboard/users" className="link-style">
            <ListItemButton>
              <ListItemIcon sx={iconStyle}>
                <ContactsIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </Link>
        </List>
      </div>
    </div>
  );
}

