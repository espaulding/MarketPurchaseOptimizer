import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import Stack from 'react-bootstrap/Stack'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import StatInput from './StatInput.js';
import EngravingSelector from './EngravingSelector.js';
import ComputedStats from './ComputedStats.js';

import subclassList from '../data/SubClasses';
import engravings from '../data/Engravings.js';

function MainWindow(props) {
    
    const [selectedEngravings, setSelectedEngravings]  = useState([
                                                                    engravings[1].items[26], // reflux
                                                                    engravings[0].items[0],  // adrenaline
                                                                    engravings[0].items[23], // keen blunt weapon
                                                                    engravings[0].items[35], // raid captain
                                                                    engravings[0].items[21], // hit master 
                                                                  ]);
    const [subclass, setSubclass] = useState(subclassList.sorceress);
    const [defensePhysical, setDefensePhysical] = useState(39927);
    const [defenseMagical, setDefenseMagical] = useState(39602);
    const [hp, setHp] = useState(93216);
    const [critRate, setCritRate] = useState(.5514);
    const [critDmg, setCritDmg] = useState(2.00);
    const [atkStat, setAtkStat] = useState(105603);
    const [wpnDmg, setWpnDmg] = useState(24241);
    const [mpRegen, setMpRegen] = useState(159);
    const [moveSpeed, setMoveSpeed] = useState(1.2066);
    const [cdr, setCdr] = useState(.2583 + .12); // character sheet + lvl 6 gem

    // wrap all the react hooks for character data into an object so it can be passed around as a single variable
    const characterData = {
        selectedEngravings : selectedEngravings, setSelectedEngravings : setSelectedEngravings,
        subclass : subclass, setSubclass : setSubclass,
        defensePhysical : defensePhysical, setDefensePhysical : setDefensePhysical,
        defenseMagical : defenseMagical, setDefenseMagical : setDefenseMagical,
        hp : hp, setHp : setHp,
        critRate : critRate, setCritRate : setCritRate,
        critDmg : critDmg, setCritDmg : setCritDmg,
        atkStat : atkStat, setAtkStat : setAtkStat,
        wpnDmg : wpnDmg, setWpnDmg : setWpnDmg,
        mpRegen : mpRegen, setMpRegen : setMpRegen,
        moveSpeed : moveSpeed, setMoveSpeed : setMoveSpeed,
        cdr : cdr, setCdr : setCdr
    }

    const convertPercent = (number) => {
        return (number * 100).toFixed(2);
    }

    return (
        <div className="main-panel">
            <div className="class-engraving-picker">
            {/* <DropdownButton id="dropdown-basic-button" title="Change Class" variant="dark" menuVariant="dark">
                {
                    Object
                        .keys(subclassList)
                        .map((name, index) => {
                            return (<Dropdown.Item onClick={() => {characterData.setSubclass(subclassList[name])}}>{subclassList[name].label}</Dropdown.Item>);
                        })
                }
            </DropdownButton>
            <hr/> */}
            <EngravingSelector selectedEngravings={selectedEngravings} setSelectedEngravings={setSelectedEngravings} />
            </div>
            <div className="stat-input">
                <h3>{subclass.label}, ( {subclass.hpModifier}, {subclass.defModifier} )</h3>
                <Stack gap={1}>
                    <StatInput label={"HP"} value={hp} setter={setHp} />
                    <StatInput label={"Physical Defense"} value={defensePhysical} setter={setDefensePhysical} />
                    <StatInput label={"Magical Defense"} value={defenseMagical} setter={setDefenseMagical} />
                    <StatInput label={"Weapon Damge"} value={wpnDmg} setter={setWpnDmg} />
                    <StatInput label={subclass.stat} value={atkStat} setter={setAtkStat} />
                    <StatInput label={"Crit Rate"} value={critRate} setter={setCritRate} />
                    <StatInput label={"Crit Damage"} value={critDmg} setter={setCritDmg} />
                    <StatInput label={"MP Regen"} value={mpRegen} setter={setMpRegen} />
                    <StatInput label={"Movement Speed"} value={moveSpeed} setter={setMoveSpeed} />
                </Stack>
            </div>
            <div className="stat-calc" style={styles.rightPanel}>
                <ComputedStats data={characterData}/>
            </div>
        </div>
    ); 
}

const styles = StyleSheet.create({
    rightPanel: {
        display: 'flex',
        flexDirection: 'column'
    },
    baseText: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10px',
        marginLeft: '10px',
        fontFamily: "Cochin",
        color: 'white',
        minWidth: '300px',
        width: '350px',
        maxWidth: '350px',
    }
});

export default MainWindow;