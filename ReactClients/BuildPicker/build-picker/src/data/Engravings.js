const engravings = [
    { 
        label: 'Common Engravings', code: 'common',
        items: [
            { 
                label: 'Adrenaline', code: 'ADR', // 0 
                tooltip: 'Use Skill -> 1% AP, 6 stacks 15% crit (6 stacks max)',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a * 1.06; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit + .15; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },             
            { 
                label: 'All-Out Attack', code: 'ALL', // 1
                tooltip: 'Holding or Casting -> 20% DMG, 20% Atk Speed',
                impl: {
                    hp: (h) => { return h; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a * 1.06; },
                    dmg: (d) => { return d; },
                    cr: (crit) => { return crit + .15; },
                    cd: (crit) => { return crit; },
                }
            },         // 1 Holding or Casting -> 20% DMG 
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
            { label: 'Master Brawler', code: 'MB' },          //27 Head/Frontal Attack -> 25% DMG
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
];

export default engravings;