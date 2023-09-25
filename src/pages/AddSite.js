import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Input } from "@mui/icons-material";
import "./Addsite.css";
import axiosInstance from "../services/axios";
import { useNavigate } from "react-router-dom";

const AddSite = () => {
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    name: null,
    address: null,
    remark: null,
    start_date: null,
    end_date: null,
  });
  const [state, setState] = React.useState({
    left: true,
    right: true,
    bootam: true,
    // top: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    if(open == false){
      navigate("/table")
    }
  };

  const onSubmit = async () => {
    try {
      const response = await axiosInstance.post("/sites/addSites", payload);
      if(response.data['success'] == true){
        // setToken(response.data.data);
        navigate("/table")
      }
    } catch (error) {
      console.log(error); // handle the error
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <div className="site">
        <h4>Add New Site</h4>
        <div>
          <form>
            <h6 className="he">Site Name</h6>
            <input className="in" type="text" name="name" placeholder="Enter Site Name" onChange={(e) => {
                  handleChange(e);
                }} />
            <h6 className="he ">Address</h6>
            <input className="in" type="text" name="address" placeholder="Enter Address" onChange={(e) => {
                  handleChange(e);
                }} />
            <h6 className="he">Start Date</h6>
            <input
              className="in"
              type="date" name="start_date"
              placeholder="Select Start Date "
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <h6 className="he">End Date</h6>
            <input className="in" type="date" name="end_date" placeholder="Select End Date" onChange={(e) => {
                  handleChange(e);
                }} />
            <h6 className="he ">Remark</h6>
            <input className="in" type="text" name="remark" placeholder="Enter Remark" onChange={(e) => {
                  handleChange(e);
                }} />
            <button className="he sa" type="submit" onClick={onSubmit}>
              Save
            </button>
          </form>
        </div>
      </div>
      {/* <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button className="btn" onClick={toggleDrawer(anchor, true)}>
            {anchor}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AddSite;
