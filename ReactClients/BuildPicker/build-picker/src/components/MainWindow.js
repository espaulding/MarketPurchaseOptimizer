import React, { useState } from 'react';
import { StyleSheet } from "react-native";

import CharacterInput from './CharacterInput.js';
import EngravingSelector from './EngravingSelector.js';
import ComputedStats from './ComputedStats.js';
import ClassChangeDD from './ClassChangeDD.js';

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

    return (
        <div style={styles.mainPanel}>
            <div style={styles.topPanel}>
                <div className="class-engraving-picker">
                    <ClassChangeDD data={characterData} />
                    <hr/>
                    <EngravingSelector selectedEngravings={selectedEngravings} setSelectedEngravings={setSelectedEngravings} />
                    <hr />
                </div>
            </div>
            <div style={styles.bottomPanel}>
                <CharacterInput data={characterData} />
                <ComputedStats data={characterData} selectedEngravings={selectedEngravings}/>
            </div>
        </div>
    ); 
}

const styles = StyleSheet.create({
    mainPanel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100vw',
        height: '100vh'
    },
    topPanel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '10px'
    },
    bottomPanel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    }
});

export default MainWindow;