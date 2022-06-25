import React, { useState } from 'react';
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
    const [defensePhysical, setDefensePhysical] = useState(40000);
    const [defenseMagical, setDefenseMagical] = useState(40000);
    const [hp, setHp] = useState(91833);
    const [critRate, setCritRate] = useState(.5514);
    const [critDmg, setCritDmg] = useState(2.00);
    const [atkStat, setAtkStat] = useState(100000);
    const [wpnDmg, setWpnDmg] = useState(24000);
    const [mpRegen, setMpRegen] = useState(159);
    const [moveSpeed, setMoveSpeed] = useState(1.3);

    return (
        <div className="main-panel">
            <div className="class-engraving-picker">

            </div>
            <div className="stat-input">
                <h1>{subclass.label}, hp {subclass.hpModifier}, def {subclass.defModifier}</h1>
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
            <div className="stat-calc">

            </div>
        </div>
    );
}

export default MainWindow;
