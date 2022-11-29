//react and css
import React, { useState, useEffect } from "react";
import s from "./sort_button.module.scss";

//external exports
import { Button, Menu, MenuItem, Avatar } from "@mui/material";
//import FilterListIcon from "@mui/icons-material/FilterList";

//internal imports

export default function SortButton(props: {
  newPropCollectionFavorite;
  setnewPropCollectionFavorite;
  newPropCollectionMarket;
  setnewPropCollectionMarket;
  view;
}) {
  const {
    newPropCollectionFavorite,
    setnewPropCollectionFavorite,
    newPropCollectionMarket,
    setnewPropCollectionMarket,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [filter, setFilter] = useState("fp_d");

  const onItemClick = (filter) => {
    setFilter(filter);
    setAnchorEl(null);
    console.log("filter", filter);
  };

  useEffect(() => {
    // Insert fake backend call here, and use setFIltter to update the state
    const [a, b] = sort_market_collections(
      filter,
      props.view,
      newPropCollectionFavorite,
      newPropCollectionMarket
    );
    setnewPropCollectionFavorite(a);
    setnewPropCollectionMarket(b);
    console.log("useEffect", filter);
  }, [filter]);

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
        sx={{
          color: "grey",
          fontWeight: "light",
          fontSize: "14px",
        }} // <FilterListIcon /> on line above </Button>
      >
        <div className={s.sort_button_inner}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={s.sort_icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
            />
          </svg>
          <span className={s.sort_text}>SORT</span>
        </div>
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

export const sort_market_collections = (
  filter: string,
  view: string,
  newPropCollectionFavorite,
  newPropCollectionMarket
) => {
  const newPropCollectionFavoriteTemp = [];
  const newPropCollectionMarketTemp = [];
  newPropCollectionFavorite.forEach((val) =>
    newPropCollectionFavoriteTemp.push(Object.assign({}, val))
  );
  newPropCollectionMarket.forEach((val) =>
    newPropCollectionMarketTemp.push(Object.assign({}, val))
  );

  switch (filter) {
    case "name_a":
      newPropCollectionMarketTemp.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      newPropCollectionFavoriteTemp.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      break;
    case "name_d":
      newPropCollectionMarketTemp.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
      );
      newPropCollectionFavoriteTemp.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
      );
      break;
    case "fp_a":
      newPropCollectionMarketTemp.sort((a, b) =>
        a.floor_price > b.floor_price ? 1 : -1
      );
      newPropCollectionFavoriteTemp.sort((a, b) =>
        a.floor_price > b.floor_price ? 1 : -1
      );
      break;
    case "fp_d":
      newPropCollectionMarketTemp.sort((a, b) =>
        a.floor_price < b.floor_price ? 1 : -1
      );
      newPropCollectionFavoriteTemp.sort((a, b) =>
        a.floor_price < b.floor_price ? 1 : -1
      );
      break;
    case "delta_a":
      newPropCollectionMarketTemp.sort((a, b) =>
        a.floor_price_delta / a.floor_price <
        b.floor_price_delta / b.floor_price
          ? 1
          : -1
      );
      newPropCollectionFavoriteTemp.sort((a, b) =>
        a.floor_price_delta / a.floor_price <
        b.floor_price_delta / b.floor_price
          ? 1
          : -1
      );
      break;
    case "delta_d":
      newPropCollectionMarketTemp.sort((a, b) =>
        a.floor_price_delta / a.floor_price >
        b.floor_price_delta / b.floor_price
          ? 1
          : -1
      );
      newPropCollectionFavoriteTemp.sort((a, b) =>
        a.floor_price_delta / a.floor_price >
        b.floor_price_delta / b.floor_price
          ? 1
          : -1
      );
      break;

    default:
    // code block
  }

  const new_name = view + "-" + filter;
  console.log("view", view, "sort_market_collections", new_name);

  for (let i = 0; i < newPropCollectionMarketTemp.length; i++) {
    // console.log(newPropCollectionMarketTemp[i].name, i);

    newPropCollectionMarketTemp[i][new_name] = i;
  }

  console.log("supposed to be", newPropCollectionMarketTemp);

  return [newPropCollectionFavoriteTemp, newPropCollectionMarketTemp];
};
