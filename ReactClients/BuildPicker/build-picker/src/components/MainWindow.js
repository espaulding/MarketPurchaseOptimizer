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
    
    const [subclass, setSubclass] = useState(subclassList.sorceress);
    const [lockedEngravings, setLockedEngravings]  = useState(recommendations.sorc.lockedEngravings);
    const [possibleEngravings, setPossibleEngravings]  = useState(recommendations.sorc.possibleEngravings);
    const [selectedEngravings, setSelectedEngravings]  = useState([]);
    const [optimizerResults, setOptimizerResults]  = useState([]);
    const [defensePhysical, setDefensePhysical] = useState(cookies.physDefense); 
    const [defenseMagical, setDefenseMagical] = useState(cookies.magDefense);
    const [hp, setHp] = useState(cookies.hp);                  
    const [mp, setMp] = useState(cookies.mp);                  
    const [mpRegen, setMpRegen] = useState(cookies.mpRegen);        
    const [critRate, setCritRate] = useState(cookies.critRate);      
    const [critDmg, setCritDmg] = useState(cookies.critDmg);        
    const [atkStat, setAtkStat] = useState(cookies.atkStat);        
    const [wpnDmg, setWpnDmg] = useState(cookies.wpnDmg);          
    const [atkSpeed, setAtkSpeed] = useState(cookies.atkSpeed);      
    const [moveSpeed, setMoveSpeed] = useState(cookies.moveSpeed);    
    const [cdr, setCdr] = useState(cookies.cdr);                         
    const [cdrGem, setCdrGem] = useState(cookies.cdrGem);                       
    const [buildLimit, setBuildLimit] = useState(cookies.buildLimit); // the number of engravings to optimize for
    const numResults = 100; // the number of results returned by the optimizer

    // wrap all the react hooks for character data into an object so it can be passed around as a single variable
    const characterData = {
        buildLimit: buildLimit, 
        setBuildLimit : (e) => { 
            setBuildLimit(e); 
            setCookie('buildLimit', e, path); 
        },
        lockedEngravings : lockedEngravings, setLockedEngravings : setLockedEngravings,
        possibleEngravings : possibleEngravings, setPossibleEngravings : setPossibleEngravings,
        selectedEngravings : selectedEngravings, setSelectedEngravings : setSelectedEngravings,
        subclass : subclass, setSubclass : setSubclass,
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

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const calculateBuildsHandler = (e) => {
        e.target.disabled = true; // stop user from clicking the button again during optimization
        //setOptimizerResults([]); 
        optimizeBuild({
            data : characterData,
            numResults : numResults,
            buildLimit : buildLimit,
            lockedEngravings : lockedEngravings,
            possibleEngravings : possibleEngravings,
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
                                <div style={styles.spacer}><BuildSizeDD buildLimit={buildLimit} setBuildLimit={setBuildLimit}/></div>
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