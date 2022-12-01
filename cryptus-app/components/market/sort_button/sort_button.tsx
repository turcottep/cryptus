//react and css
import React, { useState, useEffect } from "react";
import s from "./sort_button.module.scss";

//external exports
import { Button, Menu, MenuItem, Avatar } from "@mui/material";
import { Sort } from "@mui/icons-material";
//import FilterListIcon from "@mui/icons-material/FilterList";

//internal imports

export default function SortButton(props: {
  // newPropCollectionFavorite;
  // setnewPropCollectionFavorite;
  // newPropCollectionMarket;
  // setnewPropCollectionMarket;
  // view;
  callback: Function;
}) {
  // const {
  //   newPropCollectionFavorite,
  //   setnewPropCollectionFavorite,
  //   newPropCollectionMarket,
  //   setnewPropCollectionMarket,
  // } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [filter, setFilter] = useState("fp_d");

  const onItemClick = (filter) => {
    setFilter(filter);
    setAnchorEl(null);
    // console.log("filter", filter);
    props.callback(filter);
  };

  // useEffect(() => {
  //   // Insert fake backend call here, and use setFIltter to update the state
  //   const [a, b] = sort_market_collections(
  //     filter,
  //     props.view,
  //     newPropCollectionFavorite,
  //     newPropCollectionMarket
  //   );
  //   setnewPropCollectionFavorite(a);
  //   setnewPropCollectionMarket(b);
  //   console.log("useEffect", filter);
  // }, [filter]);

  return (
    <div className={s.container}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        className={s.box}
        size="small"
        // <FilterListIcon /> on line above </Button>
      >
        <Sort />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => onItemClick("name_a")}>
          By Name (Ascending)
        </MenuItem>
        <MenuItem onClick={() => onItemClick("name_d")}>
          By Name (Descending)
        </MenuItem>
        <MenuItem onClick={() => onItemClick("fp_a")}>
          By Floor Price (Ascending)
        </MenuItem>
        <MenuItem onClick={() => onItemClick("fp_d")}>
          By Floor Price (Descending)
        </MenuItem>
        <MenuItem onClick={() => onItemClick("delta_a")}>
          By Change (Ascending)
        </MenuItem>
        <MenuItem onClick={() => onItemClick("delta_d")}>
          By Change (Descending)
        </MenuItem>
      </Menu>
    </div>
  );
}
