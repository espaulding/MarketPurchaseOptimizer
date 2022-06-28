const engravings = [
    { 
        label: 'Common Engravings', code: 'common',
        items: [
            { // 0
                label: 'Adrenaline', code: 'ADR',
                tooltip: 'Use Skill -> 1% AP, 6 stacks 15% crit (6 stacks max)',
                impl: {
                    atk: (a) => { return a * 1.06; },
                    cr: (crit) => { return crit + .15; }
                }
            },             
            { // 1
                label: 'All-Out Attack', code: 'ALL', 
                tooltip: 'Holding or Casting -> 20% DMG, 20% Atk Speed',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.2; },
                    aspd: (s) => { return s + .2; }
                }
            },       
            { // 2
                label: 'Ambush Master', code: 'AM', 
                tooltip: 'Back Attack -> 25% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.25; }
                }
            },       
            { // 3
                label: 'Awakening', code: 'AWA', 
                tooltip: 'Awakening Skill -50% CDR and +3 uses',
                impl: { }
            },              
            { // 4
                label: 'Barricade', code: 'BAR',
                tooltip: 'Shielded -> 16% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.16; }
                }
            },              
            { // 5
                label: 'Broken Bone', code: 'BB',
                tooltip: 'staggered enemy -> 40% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.4; }
                }
            },             
            { // 6
                label: 'Contender', code: 'CON',
                tooltip: 'Kill Foe -> 2.5% AP per stack (17.5% max)',
                impl: {
                    atk: (a) => { return a * 1.175; }
                }
            },              
            { // 7
                label: 'Crisis Evasion', code: 'CE',
                tooltip: 'When taking fatal damage, become invincible for 3s. Then recover 50% of the damage taken during invincibility. Cooldown (15/12/9) minutes.',
                impl: { }
            },         
            { // 8
                label: 'Crushing Fist', code: 'CF',
                tooltip: 'on counter -> 20% AP (duration?)',
                impl: {
                    atk: (a) => { return a * 1.2; }
                }
            },           
            { // 9
                label: 'Cursed Doll', code: 'CD',
                tooltip: '16% AP and 25% (Reduced Healing)',
                impl: {
                    atk: (a) => { return a * 1.16; }
                }
            } ,          
            { //10
                label: 'Disrespect', code: 'DIS',
                tooltip: 'Enemy HP < 30% -> 36% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.36; }
                }
            },              
            { //11
                label: 'Divine Protection', code: 'DP',
                tooltip: '20% chance of 60% DR, cooldown (60/20/10) sec',
                impl: {
                    dr: (d) =>  {
                        var dr = 1 - (1 - d) * (1 - .6);    // reduction if 20% succeeds and not on cooldown
                        var adjusted = (.8 * d) + (.2 * dr) // normalize for 20% to proc if not on cooldown
                        return adjusted; // ignoring the cooldown makes this look better than it really is
                    }
                }
            },      
            { //12 
                label: 'Drops of Ether', code: 'DOE',
                tooltip: '6 possible 30s buffs, 10s CD for orbs. +15% crit, +10% atk power, +10% defense, +10% move speed, retore MP, restore HP',
                impl: {
                    def: (d, bd) => { return d + (bd * .1); },
                    atk: (a) => { return a * 1.1; },
                    cr: (crit) => { return crit + .15; },
                    mspd: (s) => { return s + .1; }
                }
            },         
            { //13
                label: 'Emergency Rescue', code: 'ER',
                tooltip: 'HP < 30% -> Shield for (20/30/50)% MaxHP (3s) then heal for 50% of shield cooldown (300/240/180) sec',
                impl: { }
            },        
            { //14
                label: 'Enhanced Shield', code: 'ES',
                tooltip: 'Shielded -> Immune to debuffs, but -(90/75/50)% shield and defensive stance amount',
                impl: { }
            },        
            { //15
                label: 'Ether Predator', code: 'EP',
                tooltip: 'On hit -> .5% AP 1% Def for 90s up to 30 stacks (orb CD 10s)',
                impl: {
                    def: (d, bd) => { return d + (bd * .3); },
                    atk: (a) => { return a * 1.15; }
                }
            },          
            { //16
                label: 'Expert', code: 'EXP',
                tooltip: 'Shield and Healing effectiveness +(6/14/24)%, if target HP < 50% -> +(3/7/12)% additional effectiveness',
                impl: { }
            },              
            { //17
                label: 'Explosive Expert', code: 'EE',
                tooltip: 'Bomb/grendade Battle Item carry limit +3',
                impl: { }
            },        
            { //18
                label: 'Fortitude', code: 'FOR',
                tooltip: 'Low HP -> 30% DR',
                impl: {
                    dr: (d) => { return 1 - (1 - d) * (1 - .3); }
                }
            },             
            { //19
                label: 'Grudge', code: 'GRU',
                tooltip: 'Attacking Boss -> 20% DMG, (20% more dmg taken from all sources)',
                impl: {
                    dr: (d) => { return 1 - (1 - d) * 1.2; },
                    dmg: (d, mspd, aspd) => { return d * 1.2; }
                }
            },                
            { //20
                label: 'Heavy Armor', code: 'HA',
                tooltip: 'defense +(20/50/100)%',
                impl: {
                    def: (d, bd) => { return d + bd; }
                } 
            },            
            { //21
                label: 'Hit Master', code: 'HM',
                tooltip: 'Not front or back attack -> 16% DMG (excluding Awakening skills)',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.16; }
                }
            },              
            { //22
                label: 'Increase Mass', code: 'IM',
                tooltip: '18% AP (-10% Atk Speed)',
                impl: {
                    atk: (a) => { return a * 1.18; },
                    aspd: (s) => { return s - .1; }
                }
            },           
            { //23
                label: 'Keen Blunt Weapon', code: 'KBW',
                tooltip: '50% Crit Dmg (10% chance of -20% DMG)',
                impl: {
                    dmg: (d, mspd, aspd) => { return (.9 * d) + (.1 * .8 * d); },
                    cd: (crit) => { return crit + .5; }
                }
            },      
            { //24
                label: 'Lightning Fury', code: 'LF',
                tooltip: 'On hit (1s CD) -> 60% chance of orb (5 orbs explode for base damage)',
                impl: { }
            },          
            { //25
                label: 'MP Efficiency Increase', code: 'MEI',
                tooltip: 'MP < 50% -> 12% DMG (30% MP Regen)',
                impl: {
                    mpr: (m) => { return m * 1.3; },
                    dmg: (d, mspd, aspd) => { return d * 1.12; }
                }
            }, 
            { //26
                label: 'Magick Stream', code: 'MS',
                tooltip: 'Not hit for 3 sec -> 3% MP Regen, 5 stacks -> 10% CDR, On hit (10s CD) -> lose 1 stack',
                impl: {
                    mpr: (m) => { return m * 1.15; },
                    cdr: (c) => { return (1 - (1 - c) * (1 - .1)); }
                }
            },           
            { //27
                label: 'Master Brawler', code: 'MB',
                tooltip: 'Frontal Attack -> 25% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.25; },
                }
            },          
            { //28
                label: 'Master of Escape', code: 'MOE',
                tooltip: 'Stand up Action Cooldown -25%',
                impl: { }
            },       
            { //29
                label: 'Master\'s Tenacity', code: 'MT',
                tooltip: 'HP < 50% -> 16% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.16; }
                }
            },      
            { //30
                label: 'Max MP Increase', code: 'MMI',
                tooltip: '30% MP',
                impl: {
                    mp: (m) => { return m * 1.3; },
                    mpr: (m) => { return m * 1.3; }
                }
            },       
            { //31
                label: 'Necromancy', code: 'Nec',
                tooltip: 'On hit -> summon slow moving homing bomb (Cooldown 75/30/15 sec)',
                impl: { }
            },            
            { //32
                label: 'Precise Dagger', code: 'PD',
                tooltip: '20% Crit, -12% Crit Dmg',
                impl: {
                    cr: (crit) => { return crit + .2; },
                    cd: (crit) => { return crit - .12; },
                }
            },          
            { //33
                label: 'Preemptive Strike', code: 'PS',
                tooltip: 'Enemy full HP -> 100% Crit Chance and +160% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 2.6; },
                    cr: (crit) => { return 1; }
                }
            },       
            { //34
                label: 'Propulsion', code: 'PRO',
                tooltip: 'Use spacebar -> 16% DMG (5s)',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.16; }
                }
            },            
            { //35
                label: 'Raid Captain', code: 'RC',
                tooltip: '45% of movement bonus as % DMG (140% Move Speed -> 18% DMG)',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * (((mspd - 1) * .45) + 1); }
                }
            },            
            { //36
                label: 'Shield Piercing', code: 'SP',
                tooltip: 'Attacking shield -> 100% DMG ',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 2; }
                }
            },        
            { //37 
                label: 'Sight Focus', code: 'SF',
                tooltip: 'Say "!!!!!" in Normal Chat (30s CD) -> 28% DMG (6s) ... max uptime of 20%',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.28; }
                }
            },             
            { //38
                label: 'Spirit Absorption', code: 'SA',
                tooltip: '15% Atk Speed, 15% Move Speed',
                impl: {
                    aspd: (s) => { return s + .15; },
                    mspd: (s) => { return s + .15; }
                }
            },        
            { //39
                label: 'Stabilized Status', code: 'SS',
                tooltip: 'HP > 80% -> 16% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.16; }
                }
            },       
            { //40
                label: 'Strong Will', code: 'SW',
                tooltip: 'Being pushed -> 30% DR',
                impl: {
                    dr: (d) => { return 1 - (1 - d) * (1 - .3); }
                }
            },             
            { //41
                label: 'Super Charge', code: 'SC',
                tooltip: 'Charge Skill -> 20% DMG, 40% Charging Speed',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.2; },
                    aspd: (s) => { return s + .4; }
                }
            },            
            { //42
                label: 'Vital Point Hit', code: 'VPH',
                tooltip: '36% more stagger done',
                impl: { }
            },      
        ]
    },
    { 
        label: 'Class Engravings', code: 'class',
        items: [
            { // 0
                label: 'Barrage Enhancement', code: 'BE',
                tooltip: 'Barrage Skill Damage +40%. No Firepower Buff -> Firepower Meter +30%. On full Firepower Meter -> cooling effect removed',
                impl: { }
            },        
            { // 1
                label: 'Berserker\'s Technique', code: 'BT',
                tooltip: 'During Bust +70% Crit Dmg (Negates Exhausion after burst)',
                impl: {
                    cd: (crit) => { return crit + .7; }
                }
            },    
            { // 2
                label: 'Blessed Aura', code: 'BA',
                tooltip: 'With aura -> (10/15/20)% Damage Reduction, 2% HP restored every (2.5/2/1.5) seconds',
                impl: {
                    dr: (d) => { return 1 - (1 - d) * (1 - .2); }
                }
            },               
            { // 3
                label: 'Combat Readyness', code: 'CR',
                tooltip: 'Normal skills +20% DMG, Shield amount +50%. Defensive stance -> hit by enemy -> +6% DMG (10s) up to 3 stacks',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.2 * 1.18; }
                }
            },           
            { // 4
                label: 'Control', code: 'CON',
                tooltip: 'Cannot use Focus stance. Flurry skills +36% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.36; }
                }
            },                   
            { // 5
                label: 'Death Strike', code: 'DST',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },              
            { // 6
                label: 'Deathblow', code: 'DB',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },                  
            { // 7
                label: 'Demonic Impulse', code: 'DI',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },           
            { // 8
                label: 'Desperate Salvation', code: 'DSA',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },       
            { // 9
                label: 'Energy Overflow', code: 'EO',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },            
            { //10
                label: 'Enhanced Weapon', code: 'EW',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },            
            { //11
                label: 'Esoteric Flurry', code: 'EF',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },            
            { //12
                label: 'Esoteric Skill Enhancement', code: 'ESE',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },
            { //13
                label: 'Firepower Enhancement', code: 'FE',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },      
            { //14
                label: 'First Intention', code: 'FI',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },            
            { //15
                label: 'Gravity Training', code: 'GT',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },           
            { //16
                label: 'Igniter', code: 'IGN',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },                  
            { //17
                label: 'Judgement', code: 'JUD',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },                 
            { //18
                label: 'Lone Knight', code: 'LK',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },                
            { //19
                label: 'Loyal Companion', code: 'LC',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },           
            { //20
                label: 'Mayhem', code: 'MAY',
                tooltip: '+16% DMG, +15% Atk and Move speed, 65% additional damage reduction, -75% Max HP, -60% healing received, -75% shield absorption',
                impl: {
                    hp: (h) => { return h * .25; },
                    dr: (d) => { return 1 - (1 - d) * (1 - .65); },
                    dmg: (d, mspd, aspd) => { return d * 1.16; },
                    aspd: (s) => { return s + .15; },
                    mspd: (s) => { return s + .15; }
                }
            },                   
            { //21
                label: 'Peacemaker', code: 'PEA',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },                
            { //22
                label: 'Perfect Suppression', code: 'PS',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },        
            { //23
                label: 'Pinnacle', code: 'PIN',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },                  
            { //24
                label: 'Pistoleer', code: 'PIS',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },                 
            { //25  
                label: 'Rage Hammer', code: 'RH', 
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },                
            { //26
                label: 'Reflux', code: 'REF', 
                tooltip: 'Disable Arcane Rupture, 16% DMG, 10% CDR (except Awakening and movement skills)',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.16; },
                    cdr: (c) => { return (1 - (1 - c) * (1 - .1)); }
                }
            },                    
            { //27
                label: 'Remaining Energy', code: 'RE',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },           
            { //28
                label: 'Robust Spirit', code: 'RS', 
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },              
            { //29
                label: 'Shock Training', code: 'ST',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },             
            { //30
                label: 'Surge', code: 'SUR',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },                    
            { //31
                label: 'Time to Hunt', code: 'TTH',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },             
            { //32
                label: 'True Courage', code: 'TC',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            },            
            { //33
                label: 'Ultimate Skill: Taijutsu', code: 'UST',
                tooltip: '',
                impl: {
                    hp: (h) => { return h; },
                    mp: (m) => { return m; },
                    mpr: (m) => { return m; },
                    def: (d) => { return d; },
                    dr: (d) => { return d; },
                    atk: (a) => { return a; },
                    dmg: (d, mspd, aspd) => { return d; },
                    cr: (crit) => { return crit; },
                    cd: (crit) => { return crit; },
                    aspd: (s) => { return s; },
                    mspd: (s) => { return s; },
                    cdr: (c) => { return c; },
                }
            }
        ]
    },
];

export default engravings;