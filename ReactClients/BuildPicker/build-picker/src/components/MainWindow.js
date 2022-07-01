import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { useCookies } from 'react-cookie';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

import CharacterInput from './CharacterInput.js';
import EngravingSelector from './EngravingSelector.js';
import ComputedStats from './ComputedStats.js';
import OptimizerResults from './OptimizerResults';
import BuildSizeDD from './BuildSizeDD.js';

import subclassList from '../data/SubClasses';
import recommendations from '../data/Recommended.js';
import { optimizeBuild } from '../calculations/Optimizer'

function MainWindow() {

    const [cookies, setCookie] = useCookies(['user']);
    const path = { path: '/' };

    const defaultVal = (input, alternative) => {
        return typeof input !== 'undefined' ? input : alternative;
    };
    
    const [subclass, setSubclass] = useState(defaultVal(cookies.subclass, subclassList.sorceress));
    const [lockedEngravings, setLockedEngravings]  = useState(defaultVal(cookies.lockedEngravings, recommendations.sorc.lockedEngravings));
    const [possibleEngravings, setPossibleEngravings]  = useState(defaultVal(cookies.possibleEngravings, recommendations.sorc.possibleEngravings));
    const [selectedEngravings, setSelectedEngravings]  = useState(defaultVal(cookies.selectedEngravings, []));
    const [optimizerResults, setOptimizerResults]  = useState(defaultVal([],[]));
    const [defensePhysical, setDefensePhysical] = useState(defaultVal(cookies.physDefense, 10000)); 
    const [defenseMagical, setDefenseMagical] = useState(defaultVal(cookies.magDefense,10000));
    const [hp, setHp] = useState(defaultVal(cookies.hp, 75000));    
    const [mp, setMp] = useState(defaultVal(cookies.mp, 3000));   
    const [mpRegen, setMpRegen] = useState(defaultVal(cookies.mpRegen, 159));        
    const [critRate, setCritRate] = useState(defaultVal(cookies.critRate, .2));      
    const [critDmg, setCritDmg] = useState(defaultVal(cookies.critDmg, 2));        
    const [atkStat, setAtkStat] = useState(defaultVal(cookies.atkStat, 95000));        
    const [wpnDmg, setWpnDmg] = useState(defaultVal(cookies.wpnDmg, 20000));          
    const [atkSpeed, setAtkSpeed] = useState(defaultVal(cookies.atkSpeed, 1));      
    const [moveSpeed, setMoveSpeed] = useState(defaultVal(cookies.moveSpeed, 1));    
    const [cdr, setCdr] = useState(defaultVal(cookies.cdr, .2583));                         
    const [cdrGem, setCdrGem] = useState(defaultVal(cookies.cdrGem, 7));                       
    const [buildLimit, setBuildLimit] = useState(defaultVal(cookies.buildLimit, 4)); // the number of engravings to optimize for
    const numResults = 100; // the number of results returned by the optimizer

    // wrap all the react hooks for character data into an object so it can be passed around as a single variable
    const characterData = {
        buildLimit: buildLimit, 
        setBuildLimit : (e) => { 
            setBuildLimit(e); 
            setCookie('buildLimit', e, path); 
        },
        lockedEngravings : lockedEngravings, 
        setLockedEngravings : (e) => { 
            setLockedEngravings(e); 
            //setCookie('lockedEngravings', e, path); 
        },
        possibleEngravings : possibleEngravings, 
        setPossibleEngravings : (e) => { 
            setPossibleEngravings(e); 
            //setCookie('possibleEngravings', e, path); 
        },
        selectedEngravings : selectedEngravings, 
        setSelectedEngravings : (e) => { 
            setSelectedEngravings(e); 
            //setCookie('selectedEngravings', e, path); 
        },
        subclass : subclass, 
        setSubclass : (e) => { 
            setSubclass(e); 
            //setCookie('subclass', e, path); 
        },
        defensePhysical : defensePhysical, 
        setDefensePhysical : (e) => { 
            setDefensePhysical(e); 
            setCookie('physDefense', e, path); 
        },
        defenseMagical : defenseMagical, 
        setDefenseMagical : (e) => { 
            setDefenseMagical(e); 
            setCookie('magDefense', e, path); 
        },
        hp : hp, 
        setHp : (e) => { 
            setHp(e); 
            setCookie('hp', e, path); 
        },
        mp : mp, 
        setMp : (e) => { 
            setMp(e); 
            setCookie('mp', e, path); 
        },
        mpRegen : mpRegen, 
        setMpRegen : (e) => { 
            setMpRegen(e); 
            setCookie('mpRegen', e, path); 
        },
        critRate : critRate, 
        setCritRate : (e) => { 
            setCritRate(e); 
            setCookie('critRate', e, path); 
        },
        critDmg : critDmg, 
        setCritDmg : (e) => { 
            setCritDmg(e); 
            setCookie('critDmg', e, path); 
        },
        atkStat : atkStat, 
        setAtkStat : (e) => { 
            setAtkStat(e); 
            setCookie('atkStat', e, path); 
        },
        wpnDmg : wpnDmg, 
        setWpnDmg : (e) => { 
            setWpnDmg(e); 
            setCookie('wpnDmg', e, path); 
        },
        atkSpeed : atkSpeed, 
        setAtkSpeed : (e) => { 
            setAtkSpeed(e); 
            setCookie('atkSpeed', e, path); 
        },
        moveSpeed : moveSpeed, 
        setMoveSpeed : (e) => { 
            setMoveSpeed(e); 
            setCookie('moveSpeed', e, path); 
        },
        cdr : cdr, 
        setCdr : (e) => { 
            setCdr(e); 
            setCookie('cdr', e, path); 
        },
        cdrGem : cdrGem, 
        setCdrGem : (e) => { 
            setCdrGem(e); 
            setCookie('cdrGem', e, path); 
        },
    }

    const calculateBuildsHandler = (e) => {
        e.target.disabled = true; // stop user from clicking the button again during optimization
        //setOptimizerResults([]); 
        optimizeBuild({
            data : characterData,
            numResults : numResults,
            setOptimizerResults : setOptimizerResults,
            //completeCallback : () => { e.target.disabled = false; }
        });
        e.target.disabled = false;
    };

    return (
        <div style={styles.mainPanel}>
            <Tabs unmountOnExit={true}>
                <Tab eventKey="BuildExplorer" title="Build Explorer">
                    <div style={styles.tabWindow}>
                        <div style={styles.topPanel}>
                            <div className="class-engraving-picker">
                                <EngravingSelector selectedEngravings={selectedEngravings} setSelectedEngravings={characterData.setSelectedEngravings} />
                            </div>
                        </div>
                        <div style={styles.bottomPanel}>
                            <CharacterInput data={characterData} />
                            <ComputedStats data={characterData} />
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
                                    setSibling={characterData.setPossibleEngravings}
                                    selectedEngravings={lockedEngravings} 
                                    setSelectedEngravings={characterData.setLockedEngravings} />
                            </div>
                            <div className="class-engraving-picker">
                                <EngravingSelector 
                                    label={"Build Using: "} 
                                    maxItems={15}
                                    numItems={possibleEngravings.length}
                                    sibling={lockedEngravings}
                                    setSibling={characterData.setLockedEngravings}
                                    selectedEngravings={possibleEngravings} 
                                    setSelectedEngravings={characterData.setPossibleEngravings} />
                            </div>
                            <div className='calc-button'>
                                <div style={styles.spacer}><BuildSizeDD buildLimit={buildLimit} setBuildLimit={characterData.setBuildLimit}/></div>
                                <div className='d-grid'>
                                    <Button 
                                        size="lg" 
                                        onClick={calculateBuildsHandler}>
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
                                setSelectedEngravings={characterData.setSelectedEngravings}
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
        marginBottom: '10px'
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