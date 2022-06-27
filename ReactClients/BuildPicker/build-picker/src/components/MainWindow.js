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
                { label: 'Barrage Enhancement', code: 'BE' },        // 0
                { label: 'Berserker\'s Technique', code: 'BT' },     // 1
                { label: 'Blessed Aura', code: 'BA' },               // 2
                { label: 'Combat Readyness', code: 'CR' },           // 3  
                { label: 'Control', code: 'CON' },                   // 4 
                { label: 'Death Strike', code: 'DST' },              // 5 
                { label: 'Deathblow', code: 'DB' },                  // 6
                { label: 'Demonic Impulse', code: 'DI' },            // 7
                { label: 'Desperate Salvation', code: 'DSA' },       // 8
                { label: 'Energy Overflow', code: 'EO' },            // 9
                { label: 'Enhanced Weapon', code: 'EW' },            //10
                { label: 'Esoteric Flurry', code: 'EF' },            //11
                { label: 'Esoteric Skill Enhancement', code: 'ESE' },//12
                { label: 'Firepower Enhancement', code: 'FE' },      //13
                { label: 'First Intention', code: 'FI' },            //14
                { label: 'Gravity Training', code: 'GT' },           //15
                { label: 'Igniter', code: 'IGN' },                   //16
                { label: 'Judgement', code: 'JUD' },                 //17
                { label: 'Lone Knight', code: 'LK' },                //18
                { label: 'Loyal Companion', code: 'LC' },            //19
                { label: 'Mayhem', code: 'MAY' },                    //20
                { label: 'Peacemaker', code: 'PEA' },                //21
                { label: 'Perfect Suppression', code: 'PS' },        //22
                { label: 'Pinnacle', code: 'PIN' },                  //23
                { label: 'Pistoleer', code: 'PIS' },                 //24
                { label: 'Rage Hammer', code: 'RH' },                //25
                { label: 'Reflux', code: 'REF' },                    //26
                { label: 'Remaining Energy', code: 'RE' },           //27
                { label: 'Robust Spirit', code: 'RS' },              //28
                { label: 'Shock Training', code: 'ST' },             //29
                { label: 'Surge', code: 'SUR' },                     //30
                { label: 'Time to Hunt', code: 'TTH' },              //31
                { label: 'True Courage', code: 'TC' },               //32
                { label: 'Ultimate Skill: Taijutsu', code: 'UST' },  //33
            ]
        },
        { 
            label: 'Common Engravings', code: 'common',
            items: [
                { label: 'Adrenaline', code: 'ADR' },             // 0 Use Skill -> 1% AP, 6 stacks 15% crit (6 stacks max)
                { label: 'All-Out Attack', code: 'ALL' },         // 1 Holding or Casting -> 20% DMG 
                { label: 'Ambush Master', code: 'AM' },           // 2 Back Attack -> 25% DMG
                { label: 'Awakening', code: 'AWA' },              // 3
                { label: 'Barricade', code: 'BAR' },              // 4 Shielded -> 16% DMG
                { label: 'Broken Bone', code: 'BB' },             // 5 
                { label: 'Contender', code: 'CON' },              // 6 Kill Foe -> 2.5% AP (17.5% max)
                { label: 'Crisis Evasion', code: 'CE' },          // 7  
                { label: 'Crushing Fist', code: 'CF' },           // 8 on counter -> 20% AP (duration?)
                { label: 'Cursed Doll', code: 'CD' } ,            // 9 16% AP 25% (Reduced Healing)
                { label: 'Disrespect', code: 'DIS' },             //10 Enemy HP < 30% -> 36% DMG
                { label: 'Divine Protection', code: 'DP' },       //11 20% chance of 60% DR (10s CD)
                { label: 'Drops of Ether', code: 'DOE' },         //12 6 possible 30s buffs (10s CD)
                { label: 'Emergency Rescue', code: 'ER' },        //13 HP < 30% -> Shield for 50% MaxHP (3s) then heal for 50% of shield (180s CD)
                { label: 'Enhanced Shield', code: 'ES' },         //14 bad engraving
                { label: 'Ether Predator', code: 'EP' },          //15 On hit -> .5% AP 1% Def for 90s up to 30 stacks (orb CD 10s)
                { label: 'Expert', code: 'EXP' },                 //16 not computing Healing
                { label: 'Explosive Expert', code: 'EE' },        //17
                { label: 'Fortitude', code: 'FOR' },              //18 Low HP -> 30% DR
                { label: 'Grudge', code: 'GRU' },                 //19 20% DMG (20% more dmg taken)
                { label: 'Heavy Armor', code: 'HA' },             //20 100% defense
                { label: 'Hit Master', code: 'HM' },              //21 Not head or back attack -> 16% DMG 
                { label: 'Increase Mass', code: 'IM' },           //22 18% AP (-10% Atk Speed)
                { label: 'Keen Blunt Weapon', code: 'KBW' },      //23 50% Crit Dmg (10% chance of -20% DMG)
                { label: 'Lightning Fury', code: 'LF' },          //24 On hit (1s CD) -> 60% chance of orb (5 orbs explode for AOE damage amount??)
                { label: 'MP Efficiency Increase', code: 'MEI' }, //25 MP < 50% -> 12% DMG (30% MP Regen)
                { label: 'Magick Stream', code: 'MS' },           //26 Not hit for 3 sec -> 3% MP Regen, 5 stacks -> 10% CDR, On hit (10s CD) -> lose 1 stack
                { label: 'Master Brawler', code: 'MB' },          //27 Head Attack -> 25% DMG
                { label: 'Master of Escape', code: 'MOE' },       //28
                { label: 'Master\'s Tenacity', code: 'MT' },      //29 HP < 50% -> 16% DMG
                { label: 'Max MP Increase', code: 'MMI' },        //30 30% MP
                { label: 'Necromancy', code: 'Nec' },             //31 
                { label: 'Precise Dagger', code: 'PD' },          //32 20% Crit, -12% Crit Dmg
                { label: 'Preemptive Strike', code: 'PS' },       //33
                { label: 'Propulsion', code: 'PRO' },             //34 Use spacebar -> 16% DMG (5s)
                { label: 'Raid Captain', code: 'RC' },            //35 45% of movement bonus as % DMG (140% Move Speed -> 18% DMG)
                { label: 'Shield Piercing', code: 'SP' },         //36 Attacking shield -> 100% DMG 
                { label: 'Sight Focus', code: 'SF' },             //37 Say "!!!!!" in Normal Chat (30s CD) -> 28% DMG (6s) ... max uptime of 20%
                { label: 'Spirit Absorption', code: 'SA' },       //38 15% Atk Speed, 15% Move Speed
                { label: 'Stabilized Status', code: 'SS' },       //39 HP > 80% -> 16% DMG
                { label: 'Strong Will', code: 'SW' },             //40 Being pushed -> 30% DR
                { label: 'Super Charge', code: 'SC' },            //41 Charge -> 20% DMG, 40% Charging Speed
                { label: 'Vital Point Hit', code: 'VPH' },        //42 36% more stagger done
            ]
        },
    ];

    const [selectedEngravings, setSelectedEngravings]  = useState([
                                                                    engravings[0].items[26], // reflux
                                                                    engravings[1].items[0],  // adrenaline
                                                                    engravings[1].items[23], // keen blunt weapon
                                                                    engravings[1].items[35], // raid captain
                                                                    engravings[1].items[21], // hit master 
                                                                  ]);
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