//react and css
import React, { useState, useEffect } from "react";
import s from "./sort_button.module.scss";

//external exports
import { Button, Menu, MenuItem, Avatar } from "@mui/material";

//internal imports

export default function SortButton({ sort }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={s.container}>
      <Button
        id="basic-button"
        startIcon={<Avatar src={"menu.svg"} />}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={s.box}
        size="small"
      >
        Sort
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => sort("name_a")}>By Name (Ascending)</MenuItem>
        <MenuItem onClick={() => sort("name_d")}>By Name (Descending)</MenuItem>
        <MenuItem onClick={() => sort("fp_a")}>
          By Floor Price (Ascending)
        </MenuItem>
        <MenuItem onClick={() => sort("fp_d")}>
          By Floor Price (Descending)
        </MenuItem>
        <MenuItem onClick={() => sort("delta_a")}>
          By Change (Ascending)
        </MenuItem>
        <MenuItem onClick={() => sort("delta_d")}>
          By Change (Descending)
        </MenuItem>
      </Menu>
    </div>
  );
}
