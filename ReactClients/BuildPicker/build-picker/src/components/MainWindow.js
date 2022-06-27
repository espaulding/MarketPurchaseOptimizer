import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import NumberFormat from 'react-number-format';
import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { MultiSelect } from 'primereact/multiselect';
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

    const engravings = [
        { 
            label: 'Class Engravings', code: 'class',
            items: [
                { label: 'Barrage Enhancement', code: 'BE' },
                { label: 'Berserker\'s Technique', code: 'BT' },
                { label: 'Blessed Aura', code: 'BA' },
                { label: 'Combat Readyness', code: 'CR' },
                { label: 'Control', code: 'CON' },
                { label: 'Death Strike', code: 'DST' },
                { label: 'Deathblow', code: 'DB' },
                { label: 'Demonic Impulse', code: 'DI' },
                { label: 'Desperate Salvation', code: 'DSA' },
                { label: 'Energy Overflow', code: 'EO' },
                { label: 'Enhanced Weapon', code: 'EW' },
                { label: 'Esoteric Flurry', code: 'EF' },
                { label: 'Esoteric Skill Enhancement', code: 'ESE' },
                { label: 'Firepower Enhancement', code: 'FE' },
                { label: 'First Intention', code: 'FI' },
                { label: 'Gravity Training', code: 'GT' },
                { label: 'Igniter', code: 'IGN' },
                { label: 'Judgement', code: 'JUD' },
                { label: 'Lone Knight', code: 'LK' },
                { label: 'Loyal Companion', code: 'LC' },
                { label: 'Mayhem', code: 'MAY' },
                { label: 'Peacemaker', code: 'PEA' },
                { label: 'Perfect Suppression', code: 'PS' },
                { label: 'Pinnacle', code: 'PIN' },
                { label: 'Pistoleer', code: 'PIS' },
                { label: 'Rage Hammer', code: 'RH' },
                { label: 'Reflux', code: 'REF' },
                { label: 'Remaining Energy', code: 'RE' },
                { label: 'Robust Spirit', code: 'RS' },
                { label: 'Shock Training', code: 'ST' },
                { label: 'Surge', code: 'SUR' },
                { label: 'Time to Hunt', code: 'TTH' },
                { label: 'True Courage', code: 'TC' },
                { label: 'Ultimate Skill: Taijutsu', code: 'UST' },
            ]
        },
        { 
            label: 'Common Engravings', code: 'common',
            items: [
                { label: 'Adrenaline', code: 'ADR' },             // Use Skill -> 1% AP, 6 stacks 15% crit (6 stacks max)
                { label: 'All-Out Attack', code: 'ALL' },         // Holding or Casting -> 20% DMG 
                { label: 'Ambush Master', code: 'AM' },           // Back Attack -> 25% DMG
                { label: 'Awakening', code: 'AWA' },          
                { label: 'Barricade', code: 'BAR' },              // Shielded -> 16% DMG
                { label: 'Broken Bone', code: 'BB' },     
                { label: 'Contender', code: 'CON' },              // Kill Foe -> 2.5% AP (17.5% max)
                { label: 'Crisis Evasion', code: 'CE' },     
                { label: 'Crushing Fist', code: 'CF' },           // on counter -> 20% AP (duration?)
                { label: 'Cursed Doll', code: 'CD' } ,            // 16% AP 25% (Reduced Healing)
                { label: 'Disrespect', code: 'DIS' },             // Enemy HP < 30% -> 36% DMG
                { label: 'Divine Protection', code: 'DP' },       // 20% chance of 60% DR (10s CD)
                { label: 'Drops of Ether', code: 'DOE' },         // 6 possible 30s buffs (10s CD)
                { label: 'Emergency Rescue', code: 'ER' },        // HP < 30% -> Shield for 50% MaxHP (3s) then heal for 50% of shield (180s CD)
                { label: 'Enhanced Shield', code: 'ES' },         // bad
                { label: 'Ether Predator', code: 'EP' },          // On hit -> .5% AP 1% Def for 90s up to 30 stacks (orb CD 10s)
                { label: 'Expert', code: 'EXP' },                 // not computing Healing
                { label: 'Explosive Expert', code: 'EE' },      
                { label: 'Fortitude', code: 'FOR' },              // Low HP -> 30% DR
                { label: 'Grudge', code: 'GRU' },                 // 20% DMG (20% more dmg taken)
                { label: 'Heavy Armor', code: 'HA' },             // 100% defense
                { label: 'Hit Master', code: 'HM' },              // Not head or back attack -> 16% DMG 
                { label: 'Increase Mass', code: 'IM' },           // 18% AP (-10% Atk Speed)
                { label: 'Keen Blunt Weapon', code: 'KBW' },      // 50% Crit Dmg (10% chance of -20% DMG)
                { label: 'Lightning Fury', code: 'LF' },          // On hit (1s CD) -> 60% chance of orb (5 orbs explode for AOE damage amount??)
                { label: 'MP Efficiency Increase', code: 'MEI' }, // MP < 50% -> 12% DMG (30% MP Regen)
                { label: 'Magick Stream', code: 'MS' },           // Not hit for 3 sec -> 3% MP Regen, 5 stacks -> 10% CDR, On hit (10s CD) -> lose 1 stack
                { label: 'Master Brawler', code: 'MB' },          // Head Attack -> 25% DMG
                { label: 'Master of Escape', code: 'MOE' },
                { label: 'Master\'s Tenacity', code: 'MT' },      // HP < 50% -> 16% DMG
                { label: 'Max MP Increase', code: 'MMI' },        // 30% MP
                { label: 'Necromancy', code: 'Nec' },            
                { label: 'Precise Dagger', code: 'PD' },          // 20% Crit, -12% Crit Dmg
                { label: 'Preemptive Strike', code: 'PS' },
                { label: 'Propulsion', code: 'PRO' },             // Use spacebar -> 16% DMG (5s)
                { label: 'Raid Captain', code: 'RC' },            // 45% of movement bonus as % DMG (140% Move Speed -> 18% DMG)
                { label: 'Shield Piercing', code: 'SP' },         // Attacking shield -> 100% DMG 
                { label: 'Sight Focus', code: 'SF' },             // Say "!!!!!" in Normal Chat (30s CD) -> 28% DMG (6s) ... max uptime of 20%
                { label: 'Spirit Absorption', code: 'SA' },       // 15% Atk Speed, 15% Move Speed
                { label: 'Stabilized Status', code: 'SS' },       // HP > 80% -> 16% DMG
                { label: 'Strong Will', code: 'SW' },             // Being pushed -> 30% DR
                { label: 'Super Charge', code: 'SC' },            // Charge -> 20% DMG, 40% Charging Speed
                { label: 'Vital Point Hit', code: 'VPH' },        // 36% more stagger done
            ]
        },
    ];

    const [selectedEngravings, setSelectedEngravings]  = useState([]);
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
        if (t === 'physical') { classDef = data.defensePhysical }
        if (t === 'magical') { classDef = data.defenseMagical }
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

    const selectedEngravingTemplate = (option) => {
        if (option) {
            return (
                <div className="engraving engraving-value">
                    <div>{option.label}</div>
                </div>
            );
        }

        return "Select Engravings";
    };

    const groupedItemTemplate = (option) => {
        return (
            <div className="flex align-items-center engraving">
                <div>{option.label}</div>
            </div>
        );
    }

    const engravingTemplate = (option) => {
        return (
            <div className="engraving">
                <div>{option.label}</div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        const selectedItems = selectedEngravings;
        const length = selectedItems ? selectedItems.length : 0;
        return (
            <div className="py-2 px-3">
                <b>{length}</b> engraving{length > 1 ? 's' : ''} selected.
            </div>
        );
    };

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
            <MultiSelect 
                className="multiselect-custom"
                options={engravings} 
                itemTemplate={engravingTemplate}
                optionGroupTemplate={groupedItemTemplate}
                optionGroupChildren="items"
                selectedItemTemplate={selectedEngravingTemplate}
                panelFooterTemplate={panelFooterTemplate}
                value={selectedEngravings} 
                onChange={ (e) => setSelectedEngravings(e.value) } 
                optionLabel="label"
                optionGroupLabel='label'
                placeholder="Select Engravings" 
                filter />

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