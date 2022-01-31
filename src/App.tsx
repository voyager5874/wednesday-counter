import React, {useEffect} from 'react';
import './App.css';
import {MainDisplay} from "./components/MainDisplay";
import {Button} from "./components/Button";
import {Settings} from "./components/Settings";
import styled from "styled-components";

import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {
    applySettingsAC,
    keepMaxToSetAC,
    keepMinToSetAC,
    SettingsStateType,
    toggleSettingsVisibilityAC
} from "./state/settingsReducer";
import {CounterStateType, incrementAC, resetAC, setErrorAC, setValueAC} from "./state/counterReducer";

function App() {
    const counterState = useSelector<RootStateType, CounterStateType>(state => state.counterState)
    const settings = useSelector<RootStateType, SettingsStateType>(state => state.settings)
    const dispatch = useDispatch()


    useEffect(() => {
        // dispatch(getStateFromStorageAC())
        let savedMax = localStorage.getItem("maxValue")
        let savedMin = localStorage.getItem("minValue")
        let savedCounter = localStorage.getItem('counterValue')
        if(savedMax && savedMin && savedCounter) {
            let max = Number(savedMax)
            let min = Number(savedMin)
            let counter = Number(savedCounter)
            dispatch(applySettingsAC(max, min))
            dispatch(setValueAC(counter))
            dispatch(keepMaxToSetAC(max))
            dispatch(keepMinToSetAC(min))
        }

    }, [])

    const incrementCounter = () => {
        if (!settings.visible && counterState.counterValue < counterState.currentMax) {
            dispatch(setErrorAC(''))
            dispatch(setValueAC(counterState.counterValue + 1))
        }
        if (settings.visible) {
            dispatch(setErrorAC('set your counter'))
            setTimeout(() => dispatch(setErrorAC('')), 1500)
        }
    }

    const resetCounter = () => {
        dispatch(resetAC())
    }

    const toggleSettingsVisibility = () => {
        if (settings.visible) {
            dispatch(applySettingsAC(settings.maxToSet, settings.minToSet))
            dispatch(toggleSettingsVisibilityAC(false))
            dispatch(resetAC())
        } else {
            dispatch(toggleSettingsVisibilityAC(true))
        }
    }

    useEffect(() => {
        // debugger
        localStorage.setItem('maxValue', JSON.stringify(counterState.currentMax))
        localStorage.setItem('minValue', JSON.stringify(counterState.currentMin))
        localStorage.setItem('counterValue', JSON.stringify(counterState.counterValue))
    }, [counterState.currentMax, counterState.currentMin, counterState.counterValue])

    const validateNewMax = (newMax: number) => {
        if (newMax > settings.minToSet && newMax > 0) {
            dispatch(setErrorAC(''))
            dispatch(keepMaxToSetAC(newMax))
            // debugger

        } else {
            newMax <= settings.minToSet ? dispatch(setErrorAC('max must be above the min'))
                : dispatch(setErrorAC('negative values not allowed'))
            setTimeout(() => dispatch(setErrorAC('')), 1000)
        }
    }

    const validateNewMin = (newMin: number) => {
        if (newMin < settings.maxToSet && newMin >= 0) {
            dispatch(setErrorAC(''))
            dispatch(keepMinToSetAC(newMin))

        } else {
            newMin >= settings.maxToSet ? dispatch(setErrorAC('min must be less than the max'))
                : dispatch(setErrorAC('negative values not allowed'))
            setTimeout(() => dispatch(setErrorAC('')), 1000)
        }
    }


    return (
        <CounterWrapper>
            <Settings validateNewMax={validateNewMax}
                      validateNewMin={validateNewMin}


            />
            <MainBoardWrapper>
                <MainDisplay value1={counterState.currentMax} value2={counterState.currentMin} value1Label={"max"}
                             value2Label={"start"} finish={counterState.counterValue === counterState.currentMax}/>
                <ControlsWrapper>
                    <Button
                        disabled={counterState.counterValue === counterState.currentMax || Boolean(counterState.error)}
                        name={"inc"}
                        callback={incrementCounter}
                    />
                    <Button
                        disabled={counterState.counterValue === counterState.currentMin || Boolean(counterState.error)}
                        name={"reset"}
                        callback={resetCounter}
                    />
                    <Button disabled={Boolean(counterState.error)}
                            name={"set"}
                            callback={toggleSettingsVisibility}
                    />
                </ControlsWrapper>
            </MainBoardWrapper>
        </CounterWrapper>

    )
}


const CounterWrapper = styled.div`
  /*border: 2px solid black;*/
  width: 330px;
  height: 500px;
  display: flex;
  flex-direction: column;
  /*flex-wrap: wrap;*/
  justify-content: center;
  align-items: center;

`

const MainBoardWrapper = styled.div`
  z-index: 3;
  width: 300px;
  height: 200px;
  border: 3px solid #8ecccc;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: #3a4042;
  /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
`

const ControlsWrapper = styled.div`
  border: 3px solid #8ecccc;
  margin-top: 20px;
  border-radius: 10px;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`

export default App;
