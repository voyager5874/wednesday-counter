import React from 'react';
import s from "./Settings.module.css"
import {LimitValueInput} from "./LimitValueInput";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootStateType} from "../state/store";
import {SettingsStateType} from "../state/settingsReducer";

type SettingsPropsType = {
    validateNewMax: (max: number) => void
    validateNewMin: (min: number) => void
}

export const Settings = (props: SettingsPropsType) => {
    const settings = useSelector<RootStateType, SettingsStateType>(state => state.settings)

    // debugger
    let visibility = `${settings.visible ? s.settingsVisible : s.settingsInvisible}`

    return (
        <SettingsWrapper className={visibility}>
            <LimitValueInput label={"max value"} currentValue={settings.maxToSet}
                             sendValueCallback={props.validateNewMax}/>
            <LimitValueInput label={"min value"} currentValue={settings.minToSet}
                             sendValueCallback={props.validateNewMin}/>
        </SettingsWrapper>
    );
};


const SettingsWrapper = styled.div`
  /*position: relative;*/
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #3a4042;
  width: 250px;
  heigth: 500px;
  border: 3px solid #8ecccc;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  //box-shadow: 0 4px 8px 0 rgb(33, 33, 33), 0 6px 20px 0 rgb(33, 33, 33);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
  rgba(0, 0, 0, 0.22) 0px 15px 12px;
  /*max-height: 0;*/
  /*overflow: hidden;*/
`

