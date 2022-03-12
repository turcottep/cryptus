import React, { useState, useEffect } from "react";
import s from "./dark_theme_setting.module.scss";
import Switch from "react-switch"



export default function DarkThemeSetting() {
    const [isToggled, setIsToggled] = useState(false);
    const onToggle = () => setIsToggled(!isToggled);
    const switchParams = {
        "width" : 48,
        "height" : 24,
        "onChange": onToggle,
        "checked": isToggled
    }
    return (
    <div className={s.container}>
        <div className={s.settingCol}>
            Dark Theme
            <Switch {...switchParams} /> 
        </div>
    </div>
  );
}

