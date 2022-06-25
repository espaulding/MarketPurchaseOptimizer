import React from 'react';
import StatInput from './StatInput';

class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.subclass = { 
        gunlancer : { label: 'Gunlancer', hpModifier : 2.5, defModifier : 1.2, stat: 'Strength' }, 
        destroyer : { label: 'Destroyer', hpModifier : 2.3, defModifier : 1.15, stat: 'Strength' },
        artilleristFirepower : { label: 'Artillerist (Firepower)', hpModifier : 2.1*(1/.8), defModifier : .95, stat: 'Dexterity' },
        scrapper : { label: 'Scrapper', hpModifier : 2.3, defModifier : 1.1, stat: 'Strength' },
        berserker : { label: 'Berserker', hpModifier : 2.2, defModifier : 1.1, stat: 'Strength' },
        wardancer : { label: 'Wardancer', hpModifier : 2.2, defModifier : 1.1, stat: 'Dexterity' },
        striker : { label: 'Striker', hpModifier : 2.2, defModifier : 1.05, stat: 'Strength' },
        glaiver : { label: 'Glaiver', hpModifier : 2.2, defModifier : 1.05, stat: 'Strength' },
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
    this.state = {
        class : this.subclass.sorceress,
        defensePhysical : 40000,
        defenseMagical : 40000,
        hp : 91833,
        critRate : .5514,
        critDmg : 2.00,
        atkStat : 100000,
        wpnDmg : 24000,
        mpRegen : 159,
        moveSpeed : 1.4,
    };
    
  }

    render() {
        return (
            <div className="main-panel">
                <h1>class is {this.state.class}</h1>
                <StatInput label={"HP"} value={this.hp} />
                <StatInput label={this.state.class.stat} value={this.atkStat} />
                <StatInput label={"Crit Rate"} value={this.critRate} />
                <StatInput label={"Crit Damage"} value={this.critDmg} />
            </div>
        );
    }
}

export default MainWindow;