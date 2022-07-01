const engravings = [
    { 
        label: 'Common Engravings', code: 'common',
        items: [
            { // 0
                label: 'Adrenaline', code: 'ADR',
                tooltip: 'Use Skill -> 1% Atk Power, 6 stacks -> +15% crit (6 stacks max)',
                impl: {
                    atk: (a) => { return a * 1.06; },
                    cr: (crit) => { return crit + .15; }
                }
            },             
            { // 1
                label: 'All-Out Attack', code: 'ALL', 
                tooltip: 'Holding or Casting skill -> +20% DMG, +20% Atk Speed',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.2; },
                    aspd: (s) => { return s + .2; }
                }
            },       
            { // 2
                label: 'Ambush Master', code: 'AM', 
                tooltip: 'Back Attack -> +25% DMG',
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
                tooltip: 'Your Shielded -> +16% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.16; }
                }
            },              
            { // 5
                label: 'Broken Bone', code: 'BB',
                tooltip: 'staggered enemy -> +40% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.4; }
                }
            },             
            { // 6
                label: 'Contender', code: 'CON',
                tooltip: 'Kill Foe -> +2.5% Atk Power per stack (+17.5% max)',
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
                tooltip: 'Counter Attack -> +20% Atk Power (duration???)',
                impl: {
                    atk: (a) => { return a * 1.2; }
                }
            },           
            { // 9
                label: 'Cursed Doll', code: 'CD',
                tooltip: '+16% Atk Power and -25% Healing Received',
                impl: {
                    atk: (a) => { return a * 1.16; }
                }
            } ,          
            { //10
                label: 'Disrespect', code: 'DIS',
                tooltip: 'Enemy HP < 30% -> +36% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.36; }
                }
            },              
            { //11
                label: 'Divine Protection', code: 'DP',
                tooltip: '20% chance of -60% Dmg Taken, cooldown (60/20/10) sec',
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
                tooltip: '6 possible 30s buffs, 10s CD for orbs. +15% crit, +10% atk power, +10% defense, +10% move speed, restore MP, restore HP',
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
                tooltip: 'On hit -> .5% Atk Power 1% Def for 90s up to 30 stacks (orb CD 10s)',
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
                tooltip: 'Low HP -> Damage Taken -30%',
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
                tooltip: '18% Atk Power (-10% Atk Speed)',
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
                tooltip: 'MP < 50% -> 12% DMG (+30% MP Regen)',
                impl: {
                    mpr: (m, base) => { return m + (base * .3); },
                    dmg: (d, mspd, aspd) => { return d * 1.12; }
                }
            }, 
            { //26
                label: 'Magick Stream', code: 'MS',
                tooltip: 'Not hit for 3 sec -> 3% MP Regen, 5 stacks -> 10% CDR, On hit (10s CD) -> lose 1 stack',
                impl: {
                    mpr: (m, base) => { return m + (base * .15); },
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
                    mprBase: (m) => { return m * 1.3; }
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
                tooltip: 'Use spacebar -> +16% DMG (5s)',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.16; }
                }
            },            
            { //35
                label: 'Raid Captain', code: 'RC',
                tooltip: '45% of movement bonus as % DMG (140% Move Speed = +18% DMG)',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * (((mspd - 1) * .45) + 1); }
                }
            },            
            { //36
                label: 'Shield Piercing', code: 'SP',
                tooltip: 'Attacking shielded enemy -> +100% DMG ',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 2; }
                }
            },        
            { //37 
                label: 'Sight Focus', code: 'SF',
                tooltip: 'Say "!!!!!" in Normal Chat (30s CD) -> +28% DMG (6s) ... max uptime of 20%',
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
                tooltip: 'Being pushed -> Damage Taken -30%',
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
                label: '(Artillerist) Barrage Enhancement', code: 'BE',
                tooltip: 'Barrage Skill Damage +40%. No Firepower Buff -> Firepower Meter +30%. On full Firepower Meter -> cooling effect removed',
                impl: { }
            },        
            { // 1
                label: '(Berserker) Berserker\'s Technique', code: 'BT',
                tooltip: 'During Burst +70% Crit Dmg (Negates Exhausion after burst)',
                impl: {
                    cd: (crit) => { return crit + .7; }
                }
            },    
            { // 2
                label: '(Paladin) Blessed Aura', code: 'BA',
                tooltip: 'With aura -> (10/15/20)% Damage Reduction, 2% HP restored every (2.5/2/1.5) seconds',
                impl: {
                    dr: (d) => { return 1 - (1 - d) * (1 - .2); }
                }
            },               
            { // 3
                label: '(Gunlancer) Combat Readiness', code: 'CR',
                tooltip: 'Normal skills +20% DMG, Shield amount +50%. Defensive stance -> hit by enemy -> +6% DMG (10s) up to 3 stacks',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.2 * 1.18; }
                }
            },           
            { // 4
                label: '(Glaivier) Control', code: 'CON',
                tooltip: 'Cannot use Focus stance. Flurry skills +36% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.36; }
                }
            },                   
            { // 5
                label: '(Sharpshooter) Death Strike', code: 'DST',
                tooltip: 'Use Last Rush -> Recover 50% Hawk Meter and Damage taken +(22/33/44)% for 8s',
                impl: {
                    dr: (d) => { return 1 - (1 - d) * 1.44; },
                }
            },              
            { // 6
                label: '(Striker) Deathblow', code: 'DB',
                tooltip: 'Max Orbs + 1, Esoteric skills consume all orbs for +35% DMG per orb',
                impl: { // huge burst but I'm on the fence as to a way to compute the time taken to buildup orbs
                    //dmg: (d, mspd, aspd) => { return d * 1.35; } 
                }
            },                  
            { // 7
                label: '(Shadowhunter) Demonic Impulse', code: 'DI',
                tooltip: 'Composure does not active when Demonize ends. Demoninze -> Demonic Skill CD is reset and +30% Crit Rate',
                impl: {
                    cr: (crit) => { return crit + .3; }
                }
            },           
            { // 8
                label: '(Bard) Desperate Salvation', code: 'DSA',
                tooltip: 'Recovery effect ends -> additional recovery (8/16/24)% of your Max HP',
                impl: { }
            },       
            { // 9
                label: '(Soulfist) Energy Overflow', code: 'EO',
                tooltip: 'Energy < 30% -> +15% DMG. Energy does not go below 1. Hype -> no longer recovers additional energy.',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.15; }
                }
            },            
            { //10
                label: '(Deadeye) Enhanced Weapon', code: 'EW',
                tooltip: 'Change stance -> +30% Crit Rate for 9s',
                impl: {
                    cr: (crit) => { return crit + .3; }
                }
            },            
            { //11
                label: '(Striker) Esoteric Flurry', code: 'EF',
                tooltip: 'Using Esoteric Skill -> only 1 orb consumed and +18% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.18; }
                }
            },            
            { //12
                label: '(Wardancer) Esoteric Skill Enhancement', code: 'ESE',
                tooltip: 'Max orbs + 1. Esoteric skill +12% per orb held',
                impl: { // how many orbs can a dancer have?
                    dmg: (d, mspd, aspd) => { return d * 1.36 ; }
                }
            },
            { //13
                label: '(Artillerist) Firepower Enhancement', code: 'FE',
                tooltip: 'Incoming damage -20% and Crit Rate +(30/35/40)% based on level of Firepower buff',
                impl: {
                    dr: (d) => { return 1 - (1 - d) * (1 - .2); },
                    cr: (crit) => { return crit + .4; }
                }
            },      
            { //14
                label: '(Wardancer) First Intention', code: 'FI',
                tooltip: 'Can no longer gain Esoteric Meter -> +32% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.32; }
                }
            },            
            { //15
                label: '(Destroyer) Gravity Training', code: 'GT',
                tooltip: 'Hypergravity mode -> +20% DMG. During Combat -> Meter recdover 2% every 1s. +30% Basic Atk and Vortex Gravity Crit Rate',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.2; },
                    cr: (crit) => { return crit + .3; }
                }
            },           
            { //16
                label: '(Sorceress) Igniter', code: 'IGN',
                tooltip: 'Magick Amplification -> Crit Rate +25% and Crit Dmg +50%. When Magic Amplification is triggered skills currently in cooldown -50% CD',
                impl: {
                    cr: (crit) => { return crit + .25; },
                    cd: (crit) => { return crit + .5; }
                }
            },                  
            { //17
                label: '(Paladin) Judgement', code: 'JUD',
                tooltip: 'Duration of Sacred Executioner +150%. Punishment DMG +15%. When Punishment hits -> Piety Gain +100%. ',
                impl: { }
            },                 
            { //18
                label: '(Gunlancer) Lone Knight', code: 'LK',
                tooltip: 'Gunlance skills -> +15% Crit Rate and +50% Crit DMG. Battlefield Shield cannot be used. Consumpiton of Shield Meter during Defensive Stance +100%',
                impl: {
                    cr: (crit) => { return crit + .15; },
                    cd: (crit) => { return crit + .5; }
                }
            },                
            { //19
                label: '(Sharpshooter) Loyal Companion', code: 'LC',
                tooltip: 'Mark of Death -> Foe DMG Taken + 14%. When hawk is summoned -> Atk Power +10%. Summons Silerhawk MK-II, allowing Move Speed +4%, Hawk\'s basic AoE range +60%, basic ATK DMG +300%, and summon duration +100%. Hawk inflicts Mark of Death.',
                impl: {
                    atk: (a) => { return a * 1.1; },
                    dmg: (d, mspd, aspd) => { return d * 1.14; }
                }
            },           
            { //20
                label: '(Berserker) Mayhem', code: 'MAY',
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
                label: '(Gunslinger) Peacemaker - Shotgun', code: 'PES',
                tooltip: 'Handgun -> Atk Speed +(8/12/16)%. Shotgun -> Crit Rate +(15/20/25)%. Rifle -> +10% DMG and if enemy HP < 50% -> +(10/20/30)% DMG for 9s',
                impl: { 
                    cr: (crit) => { return crit + .25; },
                } 
            },                
            { //22
                label: '(Gunslinger) Peacemaker - Rifle', code: 'PER',
                tooltip: 'Handgun -> Atk Speed +(8/12/16)%. Shotgun -> Crit Rate +(15/20/25)%. Rifle -> +10% DMG and if enemy HP < 50% -> +(10/20/30)% DMG for 9s',
                impl: { 
                    dmg: (d, mspd, aspd) => { return d * 1.1 * 1.3; },
                } 
            },  
            { //23
                label: '(Gunslinger) Peacemaker - Handgun', code: 'PEH',
                tooltip: 'Handgun -> Atk Speed +(8/12/16)%. Shotgun -> Crit Rate +(15/20/25)%. Rifle -> +10% DMG and if enemy HP < 50% -> +(10/20/30)% DMG for 9s',
                impl: { 
                    aspd: (s) => { return s + .16; }
                } 
            }, 
            { //24
                label: '(Shadowhunter) Perfect Suppression', code: 'PS',
                tooltip: 'Normal skill -> +30% DMG. Shadowburst Meter +50% for all skills. Disables Demonize',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.3; }
                }
            },        
            { //25
                label: '(Glaivier) Pinnacle (Flurry)', code: 'PFL',
                tooltip: 'Max Dual Meter and Change Stance then: Flurry -> +15% Atk Speed, +15% DMG, +25% Crit Rate. Focus -> +15% Move Speed, +20% DMG, +50% Crit DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.15; },
                    cr: (crit) => { return crit + .25; },
                    aspd: (s) => { return s + .15; }
                }
            },          
            { //26
                label: '(Glaivier) Pinnacle (Focus)', code: 'PFO',
                tooltip: 'Max Dual Meter and Change Stance then: Flurry -> +15% Atk Speed, +15% DMG, +25% Crit Rate. Focus -> +15% Move Speed, +20% DMG, +50% Crit DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.2; },
                    cd: (crit) => { return crit + .5; },
                    mspd: (s) => { return s + .15; }
                }
            },          
            { //27
                label: '(Deadeye) Pistoleer', code: 'PIS',
                tooltip: 'Can only use Handgun. Skill DMG +70%, Stagger +40%, Awakening skill DMG +30%',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.7; }
                }
            },                 
            { //28  
                label: '(Destroyer) Rage Hammer', code: 'RH', 
                tooltip: 'Use Gravity Release Skill -> +5% Crit Rate and 15% Crit Dmg based on Cores used',
                impl: { // does this buff stack up higher with more cores? how does it work?
                    cr: (crit) => { return crit + .05; },
                    cd: (crit) => { return crit + .15; },
                }
            },                
            { //29
                label: '(Sorceress) Reflux', code: 'REF', 
                tooltip: 'Disable Arcane Rupture, 16% DMG, 10% CDR (except Awakening and movement skills)',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.16; },
                    cdr: (c) => { return (1 - (1 - c) * (1 - .1)); }
                }
            },                    
            { //30
                label: '(Deathblade) Remaining Energy', code: 'RE',
                tooltip: 'Surge skill -> +12% Atk/Move Speed and +(12/24/36) Atk Power (30s). Art does not consume meter for 2s when activated',
                impl: {
                    atk: (a) => { return a * 1.36; },
                    aspd: (s) => { return s + .12; },
                    mspd: (s) => { return s + .12; }
                }
            },           
            { //31
                label: '(Soulfist) Robust Spirit', code: 'RS', 
                tooltip: 'Use Hype -> Enter lvl 3 immediately, Energy Recovery +200%, and +30% DMG',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.3; }
                }
            },              
            { //32
                label: '(Scrapper) Shock Training', code: 'ST',
                tooltip: 'Shock skill +20% DMG. 4% of Shock Energy recovered every 1s',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.2; }
                }
            },             
            { //33
                label: '(Deathblade) Surge', code: 'SUR',
                tooltip: 'Surge casts at max with empty orbs. Remaining Energy buff does not activtate. During Surge -> skill attacks stack up to 20. 1% Atk Power and Surge +6% DMG per stack. Death Trance ends -> 100% Death Orb Meter per Surge Enhancement',
                impl: {
                    atk: (a) => { return a * 1.2; }
                }
            },                    
            { //34
                label: '(Gunslinger) Time to Hunt', code: 'TTH',
                tooltip: 'Crit Rate +(20/30/40)%, but Shotgun disabled',
                impl: {
                    cr: (crit) => { return crit + .4; }
                }
            },             
            { //35
                label: '(Bard) True Courage', code: 'TC',
                tooltip: 'Serenade of Courage -> You gain +20% DMG and +10% Crit Rate',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.2; },
                    cr: (crit) => { return crit + .1; },
                }
            },            
            { //36
                label: '(Scrapper) Ultimate Skill: Taijutsu', code: 'UST',
                tooltip: 'Stamina Skills -> +65% DMG, Shock Skills -> -30% DMG, Stamina Energy recovery + 300%',
                impl: {
                    dmg: (d, mspd, aspd) => { return d * 1.65; }
                }
            }
        ]
    },
];

export default engravings;