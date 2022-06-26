import React, { useState } from 'react';
import { StyleSheet, Text } from "react-native";
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import NumberFormat from 'react-number-format';
import StatInput from './StatInput';

function MainWindow(props) {
    const subclassList = { 
        arcana : { label: 'Arcana', hpModifier : 2, defModifier : .95, stat: 'Intelligence'  },
        artillerist : { label: 'Artillerist', hpModifier : 2.1, defModifier : .95, stat: 'Dexterity' },
        artilleristFirepower : { label: 'Artillerist (Firepower)', hpModifier : 2.1*(1/.8), defModifier : .95, stat: 'Dexterity' },
        bard : { label: 'Bard', hpModifier : 1.9, defModifier : .9, stat: 'Intelligence' },
        berserker : { label: 'Berserker', hpModifier : 2.2, defModifier : 1.1, stat: 'Strength' },
        berserkerMayhem : { label: 'Berserker (Mayhem)', hpModifier : 2.2*(25/35), defModifier : 1.1, stat: 'Strength'  },
        deadeye : { label: 'Deadeye', hpModifier : 2, defModifier : .9, stat: 'Dexterity' },
        deathblade : { label: 'Deathblade', hpModifier : 2.2, defModifier : 1, stat: 'Dexterity'  },
        destroyer : { label: 'Destroyer', hpModifier : 2.3, defModifier : 1.15, stat: 'Strength' },
        glaiver : { label: 'Glavier', hpModifier : 2.2, defModifier : 1.05, stat: 'Strength' },
        gunlancer : { label: 'Gunlancer', hpModifier : 2.5, defModifier : 1.2, stat: 'Strength' }, 
        gunslinger : { label: 'Gunslinger', hpModifier : 2, defModifier : .9, stat: 'Dexterity' },
        paladin : { label: 'Paladin', hpModifier : 2.1, defModifier : 1.1, stat: 'Strength' },
        reaper : { label: 'Reaper', hpModifier : 2, defModifier : .9, stat: 'Dexterity'  },
        scouter : { label: 'Scouter', hpModifier : 2, defModifier : .9, stat: 'Dexterity'  },
        scrapper : { label: 'Scrapper', hpModifier : 2.3, defModifier : 1.1, stat: 'Strength' },
        sharpshooter : { label: 'Sharpshooter', hpModifier : 2.1, defModifier : .95, stat: 'Dexterity' },
        shadowhunter : { label: 'Shadowhunter', hpModifier : 2.1, defModifier : .95, stat: 'Dexterity'  },
        sorceress : { label: 'Sorceress', hpModifier : 2, defModifier : .95, stat: 'Intelligence'  },
        soulfist : { label: 'Soulfist', hpModifier : 2.1, defModifier : 1.05, stat: 'Strength' },
        striker : { label: 'Striker', hpModifier : 2.2, defModifier : 1.05, stat: 'Strength' },
        summoner : { label: 'Summoner', hpModifier : 2, defModifier : .95, stat: 'Intelligence'  },
        wardancer : { label: 'Wardancer', hpModifier : 2.2, defModifier : 1.1, stat: 'Dexterity' },
    }; 

    const [subclass, setSubclass] = useState(subclassList.sorceress);
    const [defensePhysical, setDefensePhysical] = useState(38557);
    const [defenseMagical, setDefenseMagical] = useState(39477);
    const [hp, setHp] = useState(91833);
    const [critRate, setCritRate] = useState(.5514);
    const [critDmg, setCritDmg] = useState(2.00);
    const [atkStat, setAtkStat] = useState(100777);
    const [wpnDmg, setWpnDmg] = useState(23400);
    const [mpRegen, setMpRegen] = useState(159);
    const [moveSpeed, setMoveSpeed] = useState(1.3);

    // wrap all the react hooks for character data into an object so it can be passed around as a single variable
    const characterData = {
        subclass : subclass, setSubclass : setSubclass,
        defensePhysical : defensePhysical, setDefensePhysical : setDefensePhysical,
        defenseMagical : defenseMagical, setDefenseMagical : setDefenseMagical,
        hp : hp, setHp : setHp,
        critRate : critRate, setCritRate : setCritRate,
        critDmg : critDmg, setCritDmg : setCritDmg,
        atkStat : atkStat, setAtkStat : setAtkStat,
        wpnDmg : wpnDmg, setWpnDmg : setWpnDmg,
        mpRegen : mpRegen, setMpRegen : setMpRegen,
        moveSpeed : moveSpeed, setMoveSpeed : setMoveSpeed
    }

    const convertPercent = (number) => {
        return (number * 100).toFixed(2);
    }

    // t -> type of defense
    // physical or magical
    // if neither take the average of physical and magical defense
    const computeDr = (data, t) => {
        var classDef = 0;
        if (t === 'physical') { classDef = data.defensePhysical * data.subclass.defModifier; }
        if (t === 'magical') { classDef = data.defenseMagical * data.subclass.defModifier; }
        return classDef / (classDef + 6500);
    }

    // t -> type of defense
    // physical or magical
    // if neither take the average of physical and magical defense
    const computeEffectiveHp = (data, t) => {
        return hp / (1 - computeDr(data, t));
    }

    const computeAttackPower = (data) => {
        return Math.floor(Math.sqrt(data.atkStat * data.wpnDmg / 6));
    }

    const adjustedAttackPower = (data) => {
        var ap = computeAttackPower(data);
        return (data.critRate * data.critDmg * ap) + (1 - data.critRate) * ap;
    }
    //gunlancer : { label: 'Gunlancer', hpModifier : 2.5, defModifier : 1.2, stat: 'Strength' }, 
    return (
        <div className="main-panel">
            <div className="class-engraving-picker">
            <DropdownButton id="dropdown-basic-button" title="Change Class" variant="dark" menuVariant="dark">
                {
                    Object
                        .keys(subclassList)
                        .map((name, index) => {
                            return (<Dropdown.Item onClick={() => {characterData.setSubclass(subclassList[name])}}>{subclassList[name].label}</Dropdown.Item>);
                        })
                }
            </DropdownButton>
            </div>
            <div className="stat-input">
                <h3>{subclass.label}, ( {subclass.hpModifier}, {subclass.defModifier} )</h3>
                <StatInput label={"HP"} value={hp} setter={setHp} />
                <StatInput label={"Physical Defense"} value={defensePhysical} setter={setDefensePhysical} />
                <StatInput label={"Magical Defense"} value={defenseMagical} setter={setDefenseMagical} />
                <StatInput label={"Weapon Damge"} value={wpnDmg} setter={setWpnDmg} />
                <StatInput label={subclass.stat} value={atkStat} setter={setAtkStat} />
                <StatInput label={"Crit Rate"} value={critRate} setter={setCritRate} />
                <StatInput label={"Crit Damage"} value={critDmg} setter={setCritDmg} />
                <StatInput label={"MP Regen"} value={mpRegen} setter={setMpRegen} />
                <StatInput label={"Movement Speed"} value={moveSpeed} setter={setMoveSpeed} />
            </div>
            <div className="stat-calc" style={styles.rightPanel}>
                <Table striped bordered variant="dark" size="sm">
                    <tbody>
                        <tr>
                            <td style={styles.tableCellRight}>Effective HP (Physical)</td>
                            <td><NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'physical')}></NumberFormat></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellRight}>Damage Reduction (Physical)</td>
                            <td><NumberFormat disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'physical'))}></NumberFormat></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellRight}>Effective HP (Magical)</td>
                            <td><NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'magical')}></NumberFormat></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellRight}>Damage Reduction (Magical)</td>
                            <td><NumberFormat disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'magical'))}></NumberFormat></td>
                        </tr>

                        <tr>
                            <td style={styles.tableCellRight}>Attack Power</td>
                            <td><NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={computeAttackPower(characterData)}></NumberFormat></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellRight}>Attack Power (Adjusted)</td>
                            <td><NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={adjustedAttackPower(characterData)}></NumberFormat></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    ); 
}

const styles = StyleSheet.create({
    rightPanel: {
        display: 'flex',
        flexDirection: 'column'
    },
    tableCellRight: {
        textAlign: 'right'
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