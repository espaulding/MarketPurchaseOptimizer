import React, { useState } from 'react';
import { StyleSheet, Text } from "react-native";
import NumberFormat from 'react-number-format';
import StatInput from './StatInput';

function MainWindow(props) {
    const subclassList = { 
        gunlancer : { label: 'Gunlancer', hpModifier : 2.5, defModifier : 1.2, stat: 'Strength' }, 
        destroyer : { label: 'Destroyer', hpModifier : 2.3, defModifier : 1.15, stat: 'Strength' },
        artilleristFirepower : { label: 'Artillerist (Firepower)', hpModifier : 2.1*(1/.8), defModifier : .95, stat: 'Dexterity' },
        scrapper : { label: 'Scrapper', hpModifier : 2.3, defModifier : 1.1, stat: 'Strength' },
        berserker : { label: 'Berserker', hpModifier : 2.2, defModifier : 1.1, stat: 'Strength' },
        wardancer : { label: 'Wardancer', hpModifier : 2.2, defModifier : 1.1, stat: 'Dexterity' },
        striker : { label: 'Striker', hpModifier : 2.2, defModifier : 1.05, stat: 'Strength' },
        glaiver : { label: 'Glavier', hpModifier : 2.2, defModifier : 1.05, stat: 'Strength' },
        paladin : { label: 'Paladin', hpModifier : 2.1, defModifier : 1.1, stat: 'Strength' },
        deathblade : { label: 'Deathblade', hpModifier : 2.2, defModifier : 1, stat: 'Dexterity'  },
        soulfist : { label: 'Soulfist', hpModifier : 2.1, defModifier : 1.05, stat: 'Strength' },
        artillerist : { label: 'Artillerist', hpModifier : 2.1, defModifier : .95, stat: 'Dexterity' },
        shadowhunter : { label: 'Shadowhunter', hpModifier : 2.1, defModifier : .95, stat: 'Dexterity'  },
        sharpshooter : { label: 'Sharpshooter', hpModifier : 2.1, defModifier : .95, stat: 'Dexterity' },
        arcana : { label: 'Arcana', hpModifier : 2, defModifier : .95, stat: 'Intelligence'  },
        sorceress : { label: 'Sorceress', hpModifier : 2, defModifier : .95, stat: 'Intelligence'  },
        summoner : { label: 'Summoner', hpModifier : 2, defModifier : .95, stat: 'Intelligence'  },
        deadeye : { label: 'Deadeye', hpModifier : 2, defModifier : .9, stat: 'Dexterity' },
        gunslinger : { label: 'Gunslinger', hpModifier : 2, defModifier : .9, stat: 'Dexterity' },
        scouter : { label: 'Scouter', hpModifier : 2, defModifier : .9, stat: 'Dexterity'  },
        reaper : { label: 'Reaper', hpModifier : 2, defModifier : .9, stat: 'Dexterity'  },
        bard : { label: 'Bard', hpModifier : 1.9, defModifier : .9, stat: 'Intelligence' },
        berserkerMayhem : { label: 'Berserker (Mayhem)', hpModifier : 2.2*(25/35), defModifier : 1.1, stat: 'Strength'  }
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

    const convertPercent = (number) => {
        return (number * 100).toFixed(2);
    }

    // t -> type of defense
    // physical or magical
    // if neither take the average of physical and magical defense
    const computeDr = (t) => {
        var classDef = 0;
        if (t === 'physical') { classDef = defensePhysical * subclass.defModifier; }
        if (t === 'magical') { classDef = defenseMagical * subclass.defModifier; }
        return classDef / (classDef + 6500);
    }

    // t -> type of defense
    // physical or magical
    // if neither take the average of physical and magical defense
    const computeEffectiveHp = (t) => {
        return hp / (1 - computeDr(t));
    }

    const computeAttackPower = () => {
        return Math.floor(Math.sqrt(atkStat * wpnDmg / 6));
    }

    const adjustedAttackPower = () => {
        var ap = computeAttackPower();
        return (critRate * critDmg * ap) + (1 - critRate) * ap;
    }

    return (
        <div className="main-panel">
            <div className="class-engraving-picker">

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
                <Text style={styles.baseText}>Effective HP (Physical) <NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp('physical')}></NumberFormat></Text>
                <Text style={styles.baseText}>Damage Reduction (Physical) <NumberFormat disabled={true} suffix={'%'} value={convertPercent(computeDr('physical'))}></NumberFormat></Text>

                <hr/>
                <Text style={styles.baseText}>Effective HP (Magical) <NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp('magical')}></NumberFormat></Text>
                <Text style={styles.baseText}>Damage Reduction (Magical) <NumberFormat disabled={true} suffix={'%'} value={convertPercent(computeDr('magical'))}></NumberFormat></Text>

                <hr/>
                <Text style={styles.baseText}>Attack Power <NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={computeAttackPower()}></NumberFormat></Text>
                <Text style={styles.baseText}>Attack Power (Adjusted)<NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={adjustedAttackPower()}></NumberFormat></Text>
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