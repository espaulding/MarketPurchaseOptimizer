const engravings = [
    { 
        label: 'Common Engravings', code: 'common',
        items: [
            { // 0
                label: 'Adrenaline', code: 'ADR', 
                tooltip: 'Use Skill -> 1% Atk Power, 6 stacks -> +15% crit (6 stacks max)',
                expUptime: .6, maxUptime: 1, difficulty: 1, 
                impl: {
                    atk: (uptime, a, base) => { 
                        return a + (base * (uptime * .06)); 
                    },
                    cr: (uptime, crit) => { return crit + (uptime * .15); }
                }
            },             
            { // 1
                label: 'All-Out Attack', code: 'ALL', 
                tooltip: 'Holding or Casting skill -> +20% DMG, +20% Atk Speed',
                expUptime: 3/8, maxUptime: 7/8, difficulty: -1,  // how many holding + casting skills can be on the bar?
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .12)); 
                    },
                    aspd: (uptime, s) => { return s + (uptime * .2); } // only applies to a few skills
                }
            },       
            { // 2
                label: 'Ambush Master', code: 'AM', 
                tooltip: 'Back Attack -> +25% DMG',
                expUptime: 16/24, maxUptime: 1, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .25)); 
                    }
                }
            },       
            { // 3
                label: 'Awakening', code: 'AWA', 
                tooltip: 'Awakening Skill -50% CDR and +3 uses',
                expUptime: 1, maxUptime: 1, difficulty: -1, 
                impl: { }
            },              
            { // 4
                label: 'Barricade', code: 'BAR',
                tooltip: 'Your Shielded -> +16% DMG',
                expUptime: .8, maxUptime: 1, difficulty: 0, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .16)); 
                    }
                }
            },              
            { // 5
                label: 'Broken Bone', code: 'BB',
                tooltip: 'staggered enemy -> +40% DMG',
                expUptime: .1, maxUptime: .2, difficulty: 0, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .4)); 
                    }
                }
            },             
            { // 6
                label: 'Contender', code: 'CON',
                tooltip: 'Kill Foe -> +2.5% Atk Power per stack (+17.5% max)',
                expUptime: .4, maxUptime: 1, difficulty: 0,  // situational uptime like chaos dungeon (good), boss fight (bad)
                impl: {                                  
                    atk: (uptime, a, base) => { 
                        return a + (base * (uptime * .175)); 
                    }
                }
            },              
            { // 7
                label: 'Crisis Evasion', code: 'CE',
                tooltip: 'When taking fatal damage, become invincible for 3s. Then recover 50% of the damage taken during invincibility. Cooldown (15/12/9) minutes.',
                expUptime: 1, maxUptime: 1, difficulty: -1, 
                impl: { }
            },         
            { // 8
                label: 'Crushing Fist', code: 'CF',
                tooltip: 'Counter Attack -> +20% Atk Power (duration???)',
                expUptime: .05, maxUptime: .1, difficulty: 1,  //extremely low uptime unless you can counter a lot and even then low uptime.
                impl: {
                    atk: (uptime, a, base) => { 
                        return a + (base * (uptime * .2)); 
                    }
                }
            },           
            { // 9
                label: 'Cursed Doll', code: 'CD',
                tooltip: '+16% Atk Power and -25% Healing Received',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: {
                    atk: (uptime, a, base) => { 
                        return a + (base * (uptime * .16)); 
                    }
                }
            } ,          
            { //10
                label: 'Disrespect', code: 'DIS',
                tooltip: 'Enemy HP < 30% -> +36% DMG',
                expUptime: .3, maxUptime: .5, difficulty: 0,  //since bosses are much harder at low hp, perhaps deceptively good?
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .36)); 
                    }
                }
            },              
            { //11
                label: 'Divine Protection', code: 'DP',
                tooltip: '20% chance of -60% Dmg Taken, cooldown (60/20/10) sec',
                expUptime: .1, maxUptime: .2, difficulty: 0, 
                impl: {
                    dr: (uptime, d) =>  {
                        var dr = 1 - (1 - d) * (1 - (uptime * .6));    // reduction if 20% succeeds and not on cooldown
                        return dr; // ignoring the cooldown makes this look better than it really is
                    }
                }
            },      
            { //12 
                label: 'Drops of Ether', code: 'DOE',
                tooltip: '6 possible 30s buffs, 10s CD for orbs. +15% crit, +10% atk power, +10% defense, +10% move speed, restore MP, restore HP',
                expUptime: .1, maxUptime: 1, difficulty: 1, 
                impl: {
                    def: (uptime, d, bd) => { return d + (bd * (uptime * .1)); },
                    atk: (uptime, a, base) => { 
                        return a + (base * (uptime * .1)); 
                    },
                    cr: (uptime, crit) => { return crit + (uptime * .15); },
                    mspd: (uptime, s) => { return s + (uptime * .1); }
                }
            },         
            { //13
                label: 'Emergency Rescue', code: 'ER',
                tooltip: 'HP < 30% -> Shield for (20/30/50)% MaxHP (3s) then heal for 50% of shield cooldown (300/240/180) sec',
                expUptime: 1, maxUptime: 1, difficulty: -1, 
                impl: { }
            },        
            { //14
                label: 'Enhanced Shield', code: 'ES',
                tooltip: 'Shielded -> Immune to debuffs, but -(90/75/50)% shield and defensive stance amount',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: { }
            },        
            { //15
                label: 'Ether Predator', code: 'EP',
                tooltip: 'On hit -> .5% Atk Power 1% Def for 90s up to 30 stacks (orb CD 10s)',
                expUptime: .1, maxUptime: 1, difficulty: 1, 
                impl: {
                    def: (uptime, d, bd) => { return d + (bd * (uptime * .3)); },
                    atk: (uptime, a, base) => { 
                        return a + (base * (uptime * .15)); 
                    }
                }
            },          
            { //16
                label: 'Expert', code: 'EXP',
                tooltip: 'Shield and Healing effectiveness +(6/14/24)%, if target HP < 50% -> +(3/7/12)% additional effectiveness',
                expUptime: 1, maxUptime: 1, difficulty: -1, 
                impl: { }
            },              
            { //17
                label: 'Explosive Expert', code: 'EE',
                tooltip: 'Bomb/grendade Battle Item carry limit +3',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: { }
            },        
            { //18
                label: 'Fortitude', code: 'FOR',
                tooltip: 'Low HP -> Damage Taken -30%',
                expUptime: .2, maxUptime: 1, difficulty: 0, 
                impl: {
                    dr: (uptime, d) => { return 1 - (1 - d) * (1 - (uptime * .3)); }
                }
            },             
            { //19
                label: 'Grudge', code: 'GRU',
                tooltip: 'Attacking Boss -> 20% DMG, (20% more dmg taken from all sources)',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: {
                    dr: (uptime, d) => { return 1 - (1 - d) * 1.2; },
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .2)); 
                    }
                }
            },                
            { //20
                label: 'Heavy Armor', code: 'HA',
                tooltip: 'defense +(20/50/100)%',
                expUptime: 1, maxUptime: 1, difficulty: -1, 
                impl: {
                    def: (uptime, d, bd) => { return d + (uptime * bd); }
                } 
            },            
            { //21
                label: 'Hit Master', code: 'HM',
                tooltip: 'Not front or back attack -> 16% DMG (excluding Awakening skills)',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .16)); 
                    }
                }
            },              
            { //22
                label: 'Increase Mass', code: 'IM',
                tooltip: '18% Atk Power (-10% Atk Speed)',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: {
                    atk: (uptime, a, base) => { 
                        return a + (base * (uptime * .18)); 
                    },
                    aspd: (uptime, s) => { return s - (uptime * .1); }
                }
            },           
            { //23
                label: 'Keen Blunt Weapon', code: 'KBW',
                tooltip: '50% Crit Dmg (10% chance of -20% DMG)',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var kbwNormalized = (.9 * d) + (.1 * .8 * d);
                        return (uptime * kbwNormalized) + ((1 - uptime) * d);
                    },
                    cd: (uptime, crit) => { return crit + (uptime * .5); }
                }
            },      
            { //24
                label: 'Lightning Fury', code: 'LF',
                tooltip: 'On hit (1s CD) -> 60% chance of orb (5 orbs explode for base damage)',
                expUptime: .1, maxUptime: .2, difficulty: 0, 
                impl: { }
            },          
            { //25
                label: 'MP Efficiency Increase', code: 'MEI',
                tooltip: 'MP < 50% -> 12% DMG (+30% MP Regen)',
                expUptime: .5, maxUptime: 1, difficulty: 0, 
                impl: {
                    mpr: (uptime, m, base) => { return m + (base * (uptime * .3)); },
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .12)); 
                    }
                }
            }, 
            { //26
                label: 'Magick Stream', code: 'MS',
                tooltip: 'Not hit for 3 sec -> 3% MP Regen, 5 stacks -> 10% CDR, On hit (10s CD) -> lose 1 stack',
                expUptime: .3, maxUptime: 1, difficulty: 1, 
                impl: {
                    mpr: (uptime, m, base) => { return m + (base * (uptime * .15)); },
                    cdr: (uptime, c) => { return (1 - (1 - c) * (1 - (uptime * .1))); }
                }
            },           
            { //27
                label: 'Master Brawler', code: 'MB',
                tooltip: 'Frontal Attack -> 25% DMG',
                expUptime: .7, maxUptime: 1, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .25)); 
                    }
                }
            },          
            { //28
                label: 'Master of Escape', code: 'MOE',
                tooltip: 'Stand up Action Cooldown -25%',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: { }
            },       
            { //29
                label: 'Master\'s Tenacity', code: 'MT',
                tooltip: 'HP < 50% -> 16% DMG',
                expUptime: .5, maxUptime: 1, difficulty: 0, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .16)); 
                    }
                }
            },      
            { //30
                label: 'Max MP Increase', code: 'MMI',
                tooltip: '30% MP',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: {
                    mp: (uptime, m) => { return m * (1 + (uptime * .3)); },
                    mprBase: (uptime, m) => { return m * (1 + (uptime * .3)); }
                }
            },       
            { //31
                label: 'Necromancy', code: 'Nec',
                tooltip: 'On hit -> summon slow moving homing bomb (Cooldown 75/30/15 sec)',
                expUptime: .1, maxUptime: .2, difficulty: 0, 
                impl: { }
            },            
            { //32
                label: 'Precise Dagger', code: 'PD',
                tooltip: '20% Crit, -12% Crit Dmg',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: {
                    cr: (uptime, crit) => { return crit + (uptime * .2); },
                    cd: (uptime, crit) => { return crit - (uptime * .12); },
                }
            },          
            { //33
                label: 'Preemptive Strike', code: 'PS',
                tooltip: 'Enemy full HP -> 100% Crit Chance and +160% DMG',
                expUptime: .05, maxUptime: 1, difficulty: 0,  // only good in chaos dungeon
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * 1.6)); 
                    },
                    cr: (uptime, crit) => { return crit + (uptime * 1); }
                }
            },       
            { //34
                label: 'Propulsion', code: 'PRO',
                tooltip: 'Use spacebar -> +16% DMG (5s)',
                expUptime: .3, maxUptime: 1, difficulty: 1, // maybe with enough CDR on spacebar 100% uptime? seems like a huge pain for only 16% bonus
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .16)); 
                    }
                }
            },            
            { //35
                label: 'Raid Captain', code: 'RC',
                tooltip: '45% of movement bonus as % DMG (140% Move Speed = +18% DMG)',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var mv = (mspd > 1) ? (mspd - 1) : 0;
                        var dmgBonus = mv * .45;
                        return d * (1 + (uptime * dmgBonus)); }
                }
            },            
            { //36
                label: 'Shield Piercing', code: 'SP',
                tooltip: 'Attacking shielded enemy -> +100% DMG ',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * (1 + uptime); }
                }
            },        
            { //37 
                label: 'Sight Focus', code: 'SF',
                tooltip: 'Say "!!!!!" in Normal Chat (30s CD) -> +28% DMG (6s) ... max uptime of 20%',
                expUptime: .1, maxUptime: .2, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .28)); 
                    }
                }
            },             
            { //38
                label: 'Spirit Absorption', code: 'SA',
                tooltip: '15% Atk Speed, 15% Move Speed',
                expUptime: 1, maxUptime: 1, difficulty: -1, 
                impl: {
                    aspd: (uptime, s) => { return s + (uptime * .15); },
                    mspd: (uptime, s) => { return s + (uptime * .15); }
                }
            },        
            { //39
                label: 'Stabilized Status', code: 'SS',
                tooltip: 'HP > 80% -> 16% DMG',
                expUptime: .4, maxUptime: 1, difficulty: 0, //higher expected uptime with supports
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .16)); 
                    }
                }
            },       
            { //40
                label: 'Strong Will', code: 'SW',
                tooltip: 'Being pushed -> Damage Taken -30%',
                expUptime: .5, maxUptime: 1, difficulty: 0, // pvp engraving 
                impl: {
                    dr: (uptime, d) => { return 1 - (1 - d) * (1 - (uptime * .3)); }
                }
            },             
            { //41
                label: 'Super Charge', code: 'SC',
                tooltip: 'Charge Skill -> 20% DMG, 40% Charging Speed',
                expUptime: 3/8, maxUptime: 6/8, difficulty: -1,  // how many charge skills be on the bar?
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .2)); 
                    },
                    aspd: (uptime, s) => { return s + (uptime * .4); } //only applies to a few skills
                }
            },            
            { //42
                label: 'Vital Point Hit', code: 'VPH',
                tooltip: '36% more stagger done',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: { }
            },      
        ]
    },
    { 
        label: 'Class Engravings', code: 'class',
        items: [
            { // 0
                label: '(Artillerist) Barrage Enhancement', code: 'BE', subclass: 'art',
                tooltip: 'Barrage Skill Damage +40%. No Firepower Buff -> Firepower Meter +30%. On full Firepower Meter -> cooling effect removed',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: { }
            },        
            { // 1
                label: '(Berserker) Berserker\'s Technique', code: 'BT', subclass: 'ber',
                tooltip: 'During Burst +70% Crit Dmg (Negates Exhausion after burst)',
                expUptime: .7, maxUptime: 1, difficulty: 0, 
                impl: {
                    cd: (uptime, crit) => { return crit + (uptime * .7); }
                }
            },    
            { // 2
                label: '(Paladin) Blessed Aura', code: 'BA', subclass: 'pali',
                tooltip: 'With aura -> (10/15/20)% Damage Reduction, 2% HP restored every (2.5/2/1.5) seconds',
                expUptime: .1, maxUptime: 1, difficulty: 0, 
                impl: {
                    dr: (uptime, d) => { return 1 - (1 - d) * (1 - (uptime * .2)); }
                }
            },               
            { // 3
                label: '(Gunlancer) Combat Readiness', code: 'CR', subclass: 'gl',
                tooltip: 'Normal skills +20% DMG, Shield amount +50%. Defensive stance -> hit by enemy -> +6% DMG (10s) up to 3 stacks',
                expUptime: .8, maxUptime: 1, difficulty: 0, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * 1.2 * (1 + (uptime * .18)); 
                    }
                }
            },           
            { // 4
                label: '(Glaivier) Control', code: 'CON', subclass: 'lm',
                tooltip: 'Cannot use Focus stance. Flurry skills +36% DMG',
                expUptime: .9, maxUptime: 1, difficulty: 0, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .36)); 
                    }
                }
            },                   
            { // 5
                label: '(Sharpshooter) Death Strike', code: 'DST', subclass: 'sharp',
                tooltip: 'Use Last Rush -> Recover 50% Hawk Meter and Damage taken +(22/33/44)% for 8s',
                expUptime: .5, maxUptime: 1, difficulty: 0,  //how often will this be in effect? use Last Rush every 16s?
                impl: {
                    dr: (uptime, d) => { return 1 - (1 - d) * (1 + (uptime * .44)); },
                }
            },              
            { // 6
                label: '(Striker) Deathblow', code: 'DB', subclass: 'strike',
                tooltip: 'Max Orbs + 1, Esoteric skills consume all orbs for +35% DMG per orb',
                expUptime: 1/4, maxUptime: 1, difficulty: 0, //I'm estimating 1 in 4 attacks lands with an average of 2 orbs
                impl: { // huge burst but I'm on the fence as to a way to compute the time taken to buildup orbs
                    dmg: (uptime, d, mspd, aspd) => { 
                        var averageOrbCount = 2; 
                        return d * (1 + (uptime * .35 * averageOrbCount)); 
                    } 
                }
            },                  
            { // 7
                label: '(Shadowhunter) Demonic Impulse', code: 'DI', subclass: 'sh',
                tooltip: 'Composure does not active when Demonize ends. Demoninze -> Demonic Skill CD is reset and +30% Crit Rate',
                expUptime: .7, maxUptime: 1, difficulty: 0, //estimating in demonize about 70% of the time
                impl: {
                    cr: (uptime, crit) => { return crit + (uptime * .3); }
                }
            },           
            { // 8
                label: '(Bard) Desperate Salvation', code: 'DSA', subclass: 'bard',
                tooltip: 'Recovery effect ends -> additional recovery (8/16/24)% of your Max HP',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: { }
            },       
            { // 9
                label: '(Soulfist) Energy Overflow', code: 'EO', subclass: 'sf',
                tooltip: 'Energy < 30% -> +15% DMG. Energy does not go below 1. Hype -> no longer recovers additional energy.',
                expUptime: .3, maxUptime: 1, difficulty: 0, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .15)); 
                    }
                }
            },            
            { //10
                label: '(Deadeye) Enhanced Weapon', code: 'EW', subclass: 'dead',
                tooltip: 'Change stance -> +30% Crit Rate for 9s',
                expUptime: 9/12, maxUptime: 1, difficulty: 0, //estimating stance change every 12s on average
                impl: {
                    cr: (uptime, crit) => { return crit + (uptime * .3); }
                }
            },            
            { //11
                label: '(Striker) Esoteric Flurry', code: 'EF', subclass: 'strike',
                tooltip: 'Using Esoteric Skill -> only 1 orb consumed and +18% DMG',
                expUptime: 3/5, maxUptime: 1, difficulty: 0, //estimating that 3 out of 5 skills will have the boost
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .18)); 
                    }
                }
            },            
            { //12
                label: '(Wardancer) Esoteric Skill Enhancement', code: 'ESE', subclass: 'wd',
                tooltip: 'Max orbs + 1. Esoteric skill +12% per orb held',
                expUptime: 1/3, maxUptime: 1, difficulty: 0, 
                impl: { // how many orbs can a wardancer have?
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .36)); 
                    }
                }
            },
            { //13
                label: '(Artillerist) Firepower Enhancement', code: 'FE', subclass: 'art',
                tooltip: 'Incoming damage -20% and Crit Rate +(30/35/40)% based on level of Firepower buff',
                expUptime: .6, maxUptime: 1, difficulty: 0, //estimating 60% uptime and 40% movement
                impl: {
                    dr: (uptime, d) => { return 1 - (1 - d) * (1 - (uptime * .2)); },
                    cr: (uptime, crit) => { return crit + (uptime * .4); }
                }
            },      
            { //14
                label: '(Wardancer) First Intention', code: 'FI', subclass: 'wd',
                tooltip: 'Can no longer gain Esoteric Meter -> +32% DMG',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .32)); 
                    }
                }
            },            
            { //15
                label: '(Destroyer) Gravity Training', code: 'GT', subclass: 'destro',
                tooltip: 'Hypergravity mode -> +20% DMG. During Combat -> Meter recdover 2% every 1s. +30% Basic Atk and Vortex Gravity Crit Rate',
                expUptime: .5, maxUptime: 1, difficulty: 0, //anyone have an estimate on hypergravity mode uptime?
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .2)); 
                    },
                    cr: (uptime, crit) => { return crit + (uptime * .3); }
                }
            },           
            { //16
                label: '(Sorceress) Igniter', code: 'IGN', subclass: 'sorc',
                tooltip: 'Magick Amplification -> Crit Rate +25% and Crit Dmg +50%. When Magic Amplification is triggered skills currently in cooldown -50% CD',
                expUptime: 10/(15+60), maxUptime: 10/(10+30), difficulty: 1,//optimistic - estimate 30s to build meter and then 10s for skill rotation
                impl: {                                                    //pessimistic - estimate 60s to build meter and then 10s for skill rotation
                    cr: (uptime, crit) => { return crit + (uptime * .25); },
                    cd: (uptime, crit) => { return crit + (uptime * .5); },
                    dmg: (uptime, d, mspd, aspd, spec) => {  // there's some damage bonus here based on spec as well
                        var dmgDuringMA = (1 + (uptime * 1.00)); // estimating 100% damage bonus for average sorc with 1k spec
                                                                 // todo - take in spec and compute dmg bonus correctly
                        return d * dmgDuringMA;                  
                    }                                           
                }
            },                  
            { //17
                label: '(Paladin) Judgement', code: 'JUD', subclass: 'pali',
                tooltip: 'Duration of Sacred Executioner +150%. Punishment DMG +15%. When Punishment hits -> Piety Gain +100%. ',
                expUptime: .6, maxUptime: 1, difficulty: 0, //how long to charge piety? duration? % of punishment skills in build?
                impl: { 
                    dmg: (uptime, d, mspd, aspd) => {  
                        return d * (1 + (uptime * .15)); 
                    }
                }
            },                 
            { //18
                label: '(Gunlancer) Lone Knight', code: 'LK', subclass: 'gl',
                tooltip: 'Gunlance skills -> +15% Crit Rate and +50% Crit DMG. Battlefield Shield cannot be used. Consumpiton of Shield Meter during Defensive Stance +100%',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: {
                    cr: (uptime, crit) => { return crit + (uptime * .15); },
                    cd: (uptime, crit) => { return crit + (uptime * .5); }
                }
            },                
            { //19
                label: '(Sharpshooter) Loyal Companion', code: 'LC', subclass: 'sharp',
                tooltip: 'Mark of Death -> Foe DMG Taken + 14%. When hawk is summoned -> Atk Power +10%. Summons Silerhawk MK-II, allowing Move Speed +4%, Hawk\'s basic AoE range +60%, basic ATK DMG +300%, and summon duration +100%. Hawk inflicts Mark of Death.',
                expUptime: .75, maxUptime: 1, difficulty: 0,
                impl: {
                    atk: (uptime, a, base) => { 
                        return a + (base * (uptime * .1)); 
                    },
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .14)); 
                    }
                }
            },           
            { //20
                label: '(Berserker) Mayhem', code: 'MAY', subclass: 'ber',
                tooltip: '+16% DMG, +15% Atk and Move speed, 65% additional damage reduction, -75% Max HP, -60% healing received, -75% shield absorption',
                expUptime: 1, maxUptime: 1, difficulty: -1,
                impl: { // manual cancel of zerker mode heals hp to 50% roughly and can be used as a potion but ruins dps while zerker mode is on cd
                        // running arounding doing nothing for 20s is better than being dead though
                    hp: (uptime, h) => { return h * .25; }, 
                    dr: (uptime, d) => { return 1 - (1 - d) * (1 - (uptime * .65)); },
                    dmg: (uptime, d, mspd, aspd) => { return d * (1 + (uptime * .16)); },
                    aspd: (uptime, s) => { return s + (uptime * .15); },
                    mspd: (uptime, s) => { return s + (uptime * .15); }
                }
            },                   
            { //21
                label: '(Gunslinger) Peacemaker - Shotgun', code: 'PES', subclass: 'gs',
                tooltip: 'Handgun -> Atk Speed +(8/12/16)%. Shotgun -> Crit Rate +(15/20/25)%. Rifle -> +10% DMG and if enemy HP < 50% -> +(10/20/30)% DMG for 9s',
                expUptime: .5, maxUptime: 1, difficulty: 0,
                impl: { 
                    cr: (uptime, crit) => { return crit + (uptime * .25); },
                } 
            },                
            { //22
                label: '(Gunslinger) Peacemaker - Rifle', code: 'PER', subclass: 'gs',
                tooltip: 'Handgun -> Atk Speed +(8/12/16)%. Shotgun -> Crit Rate +(15/20/25)%. Rifle -> +10% DMG and if enemy HP < 50% -> +(10/20/30)% DMG for 9s',
                expUptime: .5, maxUptime: 1, difficulty: 0,
                impl: { 
                    dmg: (uptime, d, mspd, aspd) => { return d * (1 + (uptime * .1)) * (1 + (uptime / 2 * .3)); },
                } 
            },  
            { //23
                label: '(Gunslinger) Peacemaker - Handgun', code: 'PEH', subclass: 'gs',
                tooltip: 'Handgun -> Atk Speed +(8/12/16)%. Shotgun -> Crit Rate +(15/20/25)%. Rifle -> +10% DMG and if enemy HP < 50% -> +(10/20/30)% DMG for 9s',
                expUptime: .5, maxUptime: 1, difficulty: 0,
                impl: { 
                    aspd: (uptime, s) => { return s + (uptime * .16); }
                } 
            }, 
            { //24
                label: '(Shadowhunter) Perfect Suppression', code: 'PS', subclass: 'sh',
                tooltip: 'Normal skill -> +30% DMG. Shadowburst Meter +50% for all skills. Disables Demonize',
                expUptime: 1, maxUptime: 1, difficulty: 0,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * (1 + (uptime * .3)); }
                }
            },        
            { //25
                label: '(Glaivier) Pinnacle (Flurry)', code: 'PFL', subclass: 'lm',
                tooltip: 'Max Dual Meter and Change Stance then: Flurry -> +15% Atk Speed, +15% DMG, +25% Crit Rate. Focus -> +15% Move Speed, +20% DMG, +50% Crit DMG',
                expUptime: .75, maxUptime: 1, difficulty: 0,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * (1 + (uptime * .15)); },
                    cr: (uptime, crit) => { return crit + (uptime * .25); },
                    aspd: (uptime, s) => { return s + (uptime * .15); }
                }
            },          
            { //26
                label: '(Glaivier) Pinnacle (Focus)', code: 'PFO', subclass: 'lm',
                tooltip: 'Max Dual Meter and Change Stance then: Flurry -> +15% Atk Speed, +15% DMG, +25% Crit Rate. Focus -> +15% Move Speed, +20% DMG, +50% Crit DMG',
                expUptime: .75, maxUptime: 1, difficulty: 0,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * (1 + (uptime * .2)); },
                    cd: (uptime, crit) => { return crit + (uptime * .5); },
                    mspd: (uptime, s) => { return s + (uptime * .15); }
                }
            },          
            { //27
                label: '(Deadeye) Pistoleer', code: 'PIS', subclass: 'dead',
                tooltip: 'Can only use Handgun. Skill DMG +70%, Stagger +40%, Awakening skill DMG +30%',
                expUptime: 1, maxUptime: 1, difficulty: 0,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * (1 + (uptime * .7)); }
                }
            },                 
            { //28  
                label: '(Destroyer) Rage Hammer', code: 'RH', subclass: 'destro',
                tooltip: 'Use Gravity Release Skill -> +5% Crit Rate and 15% Crit Dmg based on Cores used',
                expUptime: .5, maxUptime: 1, difficulty: 0, //how often can use Gravity Release? Duration of buff?
                impl: { // does this buff stack up higher with more cores? how does it work?
                    cr: (uptime, crit) => { 
                        var averageNumCores = 2; // totally guessing here
                        return crit + (uptime * .05); 
                    },
                    cd: (uptime, crit) => { 
                        var averageNumCores = 2; // totally guessing here
                        return crit + (uptime * .15); 
                    },
                }
            },                
            { //29
                label: '(Sorceress) Reflux', code: 'REF',  subclass: 'sorc',
                tooltip: 'Disable Arcane Rupture, 16% DMG, 10% CDR (except Awakening and movement skills)',
                expUptime: 1, maxUptime: 1, difficulty: 0,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * (1 + (uptime * .16)); },
                    cdr: (uptime, c) => { return (1 - (1 - c) * (1 - (uptime * .1))); }
                }
            },                    
            { //30
                label: '(Deathblade) Remaining Energy', code: 'RE', subclass: 'db',
                tooltip: 'Surge skill -> +12% Atk/Move Speed and +(12/24/36) Atk Power (30s). Art does not consume meter for 2s when activated',
                expUptime: .6, maxUptime: 1, difficulty: 0,
                impl: {
                    atk: (uptime, a, base) => { 
                        return a + (base * (uptime * .36)); 
                    },
                    aspd: (uptime, s) => { return s + (uptime * .12); },
                    mspd: (uptime, s) => { return s + (uptime * .12); }
                }
            },           
            { //31
                label: '(Soulfist) Robust Spirit', code: 'RS', subclass: 'sf',
                tooltip: 'Use Hype -> Enter lvl 3 immediately, Energy Recovery +200%, and +30% DMG',
                expUptime: .75, maxUptime: 1, difficulty: 0,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .3)); 
                    }
                }
            },              
            { //32
                label: '(Scrapper) Shock Training', code: 'ST', subclass: 'scrap',
                tooltip: 'Shock skill +20% DMG. 4% of Shock Energy recovered every 1s',
                expUptime: .9, maxUptime: 1, difficulty: 0,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .2)); 
                    }
                }
            },             
            { //33
                label: '(Deathblade) Surge', code: 'SUR', subclass: 'db',
                tooltip: 'Surge casts at max with empty orbs. Remaining Energy buff does not activtate. During Surge -> skill attacks stack up to 20. 1% Atk Power and Surge +6% DMG per stack. Death Trance ends -> 100% Death Orb Meter per Surge Enhancement',
                expUptime: .5, maxUptime: 1, difficulty: 0,
                impl: {
                    atk: (uptime, a, base) => { 
                        return a + (base * (uptime * .2)); 
                    }
                }
            },                    
            { //34
                label: '(Gunslinger) Time to Hunt', code: 'TTH', subclass: 'gs',
                tooltip: 'Crit Rate +(20/30/40)%, but Shotgun disabled',
                expUptime: 1, maxUptime: 1, difficulty: 0,
                impl: {
                    cr: (uptime, crit) => { return crit + (uptime * .4); }
                }
            },             
            { //35
                label: '(Bard) True Courage', code: 'TC', subclass: 'bard',
                tooltip: 'Serenade of Courage -> You gain +20% DMG and +10% Crit Rate',
                expUptime: .5, maxUptime: 1, difficulty: 0,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .2)); 
                    },
                    cr: (uptime, crit) => { return crit + (uptime * .1); },
                }
            },            
            { //36
                label: '(Scrapper) Ultimate Skill: Taijutsu', code: 'UST', subclass: 'scrap',
                tooltip: 'Stamina Skills -> +65% DMG, Shock Skills -> -30% DMG, Stamina Energy recovery + 300%',
                expUptime: 2/3, maxUptime: 1, difficulty: 0, //estimate that 2/3 skills used will be stamina skills
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        return d * (1 + (uptime * .65)); 
                    }
                }
            }
        ]
    },
];

export default engravings;