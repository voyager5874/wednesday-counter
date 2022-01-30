import React from 'react';
import s from "./Settings.module.css"
import {LimitValueInput} from "./LimitValueInput";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootStateType} from "../state/store";
import {CounterStateType} from "../state/counterActionsReducer";

type SettingsPropsType = {
    visible: boolean
    maxValue: number
    minValue: number
    validateNewMax: (max: number) => void
    validateNewMin: (min: number) => void
}

export const Settings = (props: SettingsPropsType) => {
    const counterState = useSelector<RootStateType, CounterStateType>(state => state.counterState)

    // debugger
    let visibility = `${props.visible ? s.settingsVisible : s.settingsInvisible}`

    return (
        <SettingsWrapper className={visibility}>
            <LimitValueInput label={"max value"} currentValue={counterState.maxToBeSet}
                             sendValueCallback={(newValue) => props.validateNewMax(newValue)}/>
            <LimitValueInput label={"min value"} currentValue={counterState.minToBeSet}
                             sendValueCallback={(newValue) => props.validateNewMin(newValue)}/>
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

