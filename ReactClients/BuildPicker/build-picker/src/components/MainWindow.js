import React, { useState } from 'react';
import { StyleSheet } from "react-native";

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import CharacterInput from './CharacterInput.js';
import EngravingSelector from './EngravingSelector.js';
import ComputedStats from './ComputedStats.js';
import ClassChangeDD from './ClassChangeDD.js';

import subclassList from '../data/SubClasses';
import engravings from '../data/Engravings.js';

function MainWindow() {
    
    const [possibleEngravings, setPossibleEngravings]  = useState([]);
    const [lockedEngravings, setLockedEngravings]  = useState([]);
    const [selectedEngravings, setSelectedEngravings]  = useState([
                                                                    engravings[1].items[27], // reflux
                                                                    engravings[0].items[0],  // adrenaline
                                                                    engravings[0].items[23], // keen blunt weapon
                                                                    engravings[0].items[35], // raid captain
                                                                    engravings[0].items[21], // hit master 
                                                                  ]);
    const [subclass, setSubclass] = useState(subclassList.sorceress);
    const [defensePhysical, setDefensePhysical] = useState(19963);
    const [defenseMagical, setDefenseMagical] = useState(19800);
    const [hp, setHp] = useState(93216);
    const [mp, setMp] = useState(3594);
    const [mpRegen, setMpRegen] = useState(159);
    const [critRate, setCritRate] = useState(.5514);
    const [critDmg, setCritDmg] = useState(2.00);
    const [atkStat, setAtkStat] = useState(105603);
    const [wpnDmg, setWpnDmg] = useState(24241);
    const [atkSpeed, setAtkSpeed] = useState(1.2066);
    const [moveSpeed, setMoveSpeed] = useState(1.2066);
    const [cdr, setCdr] = useState(.2583); // 25.83%
    const [cdrGem, setCdrGem] = useState(7); // 25.83% + lvl 6 gem

    // wrap all the react hooks for character data into an object so it can be passed around as a single variable
    const characterData = {
        selectedEngravings : selectedEngravings, setSelectedEngravings : setSelectedEngravings,
        subclass : subclass, setSubclass : setSubclass,
        defensePhysical : defensePhysical, setDefensePhysical : setDefensePhysical,
        defenseMagical : defenseMagical, setDefenseMagical : setDefenseMagical,
        hp : hp, setHp : setHp,
        mp : mp, setMp : setMp,
        mpRegen : mpRegen, setMpRegen : setMpRegen,
        critRate : critRate, setCritRate : setCritRate,
        critDmg : critDmg, setCritDmg : setCritDmg,
        atkStat : atkStat, setAtkStat : setAtkStat,
        wpnDmg : wpnDmg, setWpnDmg : setWpnDmg,
        atkSpeed : atkSpeed, setAtkSpeed : setAtkSpeed,
        moveSpeed : moveSpeed, setMoveSpeed : setMoveSpeed,
        cdr : cdr, setCdr : setCdr,
        cdrGem : cdrGem, setCdrGem : setCdrGem
    }

    return (
        <div style={styles.mainPanel}>
            <Tabs unmountOnExit="true">
                <Tab style={styles.tabWindow} eventKey="BuildExplorer" title="Build Explorer">
                    <div style={styles.topPanel}>
                        <div className="class-engraving-picker">
                            <EngravingSelector selectedEngravings={selectedEngravings} setSelectedEngravings={setSelectedEngravings} />
                        </div>
                    </div>
                    <div style={styles.bottomPanel}>
                        <CharacterInput data={characterData} />
                        <ComputedStats data={characterData} selectedEngravings={selectedEngravings}/>
                    </div>
                </Tab>
                <Tab style={styles.tabWindow} eventKey="BuildOptimizer" title="Build Optimizer">
                    <div style={styles.topPanel}>
                        <div>
                            Locked : 
                            <div className="class-engraving-picker">
                                <EngravingSelector selectedEngravings={lockedEngravings} setSelectedEngravings={setLockedEngravings} />
                            </div>
                        </div>
                        <div>
                            Choose From : 
                            <div className="class-engraving-picker">
                                <EngravingSelector selectedEngravings={possibleEngravings} setSelectedEngravings={setPossibleEngravings} />
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    ); 
}

const styles = StyleSheet.create({
    engravingPicker: {
        display: 'flex',
        flexDirection: 'row',
    },
    tabWindow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        border: '1px solid darkcyan',
    },
    mainPanel: {
        textAlign: 'center',
        width: '100vw',
        height: '100vh'
    },
    topPanel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        maxHeight: '25%',
        marginBottom: '10px',
        overflow: 'auto'
    },
    bottomPanel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '95%',
    }
});

export default MainWindow;