import React from 'react';
import StatInput from './StatInput';

class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        class : 'sorceress',
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
    this.subclass = { 
        gunlancer : { hpModifier : 2.5, defModifier : 1.2 },
        destroyer : { hpModifier : 2.3, defModifier : 1.15 },
        artilleristFirepower : { hpModifier : 2.1*(1/.8), defModifier : .95 },
        scrapper : { hpModifier : 2.3, defModifier : 1.1 },
        berserker : { hpModifier : 2.2, defModifier : 1.1 },
        wardancer : { hpModifier : 2.2, defModifier : 1.1 },
        striker : { hpModifier : 2.2, defModifier : 1.05 },
        glaiver : { hpModifier : 2.2, defModifier : 1.05 },
        paladin : { hpModifier : 2.1, defModifier : 1.1 },
        deathblade : { hpModifier : 2.2, defModifier : 1 },
        soulfist : { hpModifier : 2.1, defModifier : 1.05 },
        artillerist : { hpModifier : 2.1, defModifier : .95 },
        shadowhunter : { hpModifier : 2.1, defModifier : .95 },
        sharpshooter : { hpModifier : 2.1, defModifier : .95 },
        arcana : { hpModifier : 2, defModifier : .95 },
        sorceress : { hpModifier : 2, defModifier : .95 },
        summoner : { hpModifier : 2, defModifier : .95 },
        deadeye : { hpModifier : 2, defModifier : .9 },
        gunslinger : { hpModifier : 2, defModifier : .9 },
        scouter : { hpModifier : 2, defModifier : .9 },
        reaper : { hpModifier : 2, defModifier : .9 },
        bard : { hpModifier : 1.9, defModifier : .9 },
        berserkerMayhem : { hpModifier : 2.2*(25/35), defModifier : 1.1 }
    }
  }

    render() {
        return (
            <div className="main-panel">
                <h1>class is {this.state.class}</h1>
                <StatInput label={"HP"} value={this.hp} />
            </div>
        );
    }
}

export default MainWindow;