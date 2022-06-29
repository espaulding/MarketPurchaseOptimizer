import React, { useState } from 'react';
import { StyleSheet } from "react-native";

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'

import CharacterInput from './CharacterInput.js';
import EngravingSelector from './EngravingSelector.js';
import ComputedStats from './ComputedStats.js';
import OptimizerResults from './OptimizerResults';
//import ClassChangeDD from './ClassChangeDD.js';

import subclassList from '../data/SubClasses';
import engravings from '../data/Engravings.js';
import { optimizeBuild } from '../calculations/Optimizer'

function MainWindow() {
    
    const [lockedEngravings, setLockedEngravings]  = useState([
        engravings[1].items[27], // reflux
        engravings[0].items[0],  // adrenaline
    ]);
    const [possibleEngravings, setPossibleEngravings]  = useState([
        engravings[0].items[9],   // cursed doll
        engravings[0].items[12],  // drops of ether
        engravings[0].items[15],  // ether predator
        engravings[0].items[19],  // grudge
        engravings[0].items[21],  // hit master
        engravings[0].items[22],  // increase mass
        engravings[0].items[23],  // keen blunt weapon
        engravings[0].items[25],  // mp efficiency increase
        engravings[0].items[26],  // magick stream
        engravings[0].items[32],  // precise dagger
        engravings[0].items[35],  // raid captain
        engravings[0].items[38],  // spirit absorbtion
    ]);
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

    const [optimizerResults, setOptimizerResults]  = useState([]);
    const [buildLimit, setBuildLimit] = useState(5);

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
            <Tabs unmountOnExit={true}>
                <Tab eventKey="BuildExplorer" title="Build Explorer">
                    <div style={styles.tabWindow}>
                        <div style={styles.topPanel}>
                            <div className="class-engraving-picker">
                                <EngravingSelector selectedEngravings={selectedEngravings} setSelectedEngravings={setSelectedEngravings} />
                            </div>
                        </div>
                        <div style={styles.bottomPanel}>
                            <CharacterInput data={characterData} />
                            <ComputedStats data={characterData} selectedEngravings={selectedEngravings}/>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="BuildOptimizer" title="Build Optimizer">
                    <div style={styles.tabWindow}>
                        <div style={styles.topPanel}>
                            <div className="class-engraving-picker">
                                <EngravingSelector 
                                    label={"Locked In Build: "} 
                                    maxItems={6}
                                    numItems={lockedEngravings.length}
                                    sibling={possibleEngravings}
                                    setSibling={setPossibleEngravings}
                                    selectedEngravings={lockedEngravings} 
                                    setSelectedEngravings={setLockedEngravings} />
                            </div>
                            <div className="class-engraving-picker">
                                <EngravingSelector 
                                    label={"Build Using: "} 
                                    maxItems={15}
                                    numItems={possibleEngravings.length}
                                    sibling={lockedEngravings}
                                    setSibling={setLockedEngravings}
                                    selectedEngravings={possibleEngravings} 
                                    setSelectedEngravings={setPossibleEngravings} />
                            </div>
                            <div className='calc-button'>
                                <div style={styles.spacer}>Build for 5 Engravings</div>
                                <div className='d-grid'>
                                    <Button 
                                        size="lg" 
                                        onClick={
                                                () => { optimizeBuild({
                                                    data : characterData,
                                                    buildLimit : buildLimit,
                                                    lockedEngravings : lockedEngravings,
                                                    possibleEngravings : possibleEngravings,
                                                    setOptimizerResults : setOptimizerResults
                                                }); }
                                            }>
                                            Calculate Top Builds!
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div style={styles.bottomPanel}>
                            <CharacterInput data={characterData} />
                            <OptimizerResults 
                                data={characterData} 
                                selectedEngravings={selectedEngravings}
                                setSelectedEngravings={setSelectedEngravings}
                                optimizerResults={optimizerResults} 
                                setOptimizerResults={setOptimizerResults}
                            />
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    ); 
}

const styles = StyleSheet.create({
    spacer: {
        display: 'flex',
        minWidth: '263px',
        height: '100%',
        fontSize: '20px',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
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
        //border: '1px solid darkcyan',
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
        alignItems: 'flex-start',
        width: '95%',
    }
});

export default MainWindow;