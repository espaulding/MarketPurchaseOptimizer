const engravings = [
    { 
        label: 'Common Engravings', code: 'common',
        items: [
            { // 0
                label: 'Adrenaline', code: 'ADR',
                tooltip: 'Use Skill -> 1% Atk Power, 6 stacks -> +15% crit (6 stacks max)',
                expUptime: .6, maxUptime: 1, difficulty: 3, 
                impl: {
                    atk: (uptime, a, base) => { 
                        var scaled = (uptime * .06);
                        return a + (base * scaled); 
                    },
                    cr: (uptime, crit) => { return crit + (uptime * .15); }
                }
            },             
            { // 1
                label: 'All-Out Attack', code: 'ALL', 
                tooltip: 'Holding or Casting skill -> +20% DMG, +20% Atk Speed',
                expUptime: 3/8, maxUptime: .8, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .12);
                        return d * (1 + scaled); 
                    },
                    //aspd: (uptime, s) => { return s + .2; } // only applies to a few skills so this is too much here
                }
            },       
            { // 2
                label: 'Ambush Master', code: 'AM', 
                tooltip: 'Back Attack -> +25% DMG',
                expUptime: 16/24, maxUptime: 1, difficulty: 5, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .25);
                        return d * (1 + scaled); 
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
                expUptime: .8, maxUptime: 1, difficulty: 2, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .16);
                        return d * (1 + scaled); 
                    }
                }
            },              
            { // 5
                label: 'Broken Bone', code: 'BB',
                tooltip: 'staggered enemy -> +40% DMG',
                expUptime: .1, maxUptime: .2, difficulty: 5, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .4);
                        return d * (1 + scaled); 
                    }
                }
            },             
            { // 6
                label: 'Contender', code: 'CON',
                tooltip: 'Kill Foe -> +2.5% Atk Power per stack (+17.5% max)',
                expUptime: .3, maxUptime: 1, difficulty: 5,  // situational uptime like chaos vs boss
                impl: {
                    atk: (uptime, a, base) => { 
                        var scaled = (uptime * .175);
                        return a + (base * scaled); 
                    }
                }
            },              
            { // 7
                label: 'Crisis Evasion', code: 'CE',
                tooltip: 'When taking fatal damage, become invincible for 3s. Then recover 50% of the damage taken during invincibility. Cooldown (15/12/9) minutes.',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: { }
            },         
            { // 8
                label: 'Crushing Fist', code: 'CF',
                tooltip: 'Counter Attack -> +20% Atk Power (duration???)',
                expUptime: .05, maxUptime: .1, difficulty: 10, 
                impl: {
                    atk: (uptime, a, base) => { 
                        var scaled = (uptime * .2);
                        return a + (base * scaled); 
                    }
                }
            },           
            { // 9
                label: 'Cursed Doll', code: 'CD',
                tooltip: '+16% Atk Power and -25% Healing Received',
                expUptime: 1, maxUptime: 1, difficulty: 3, 
                impl: {
                    atk: (uptime, a, base) => { 
                        var scaled = (uptime * .16);
                        return a + (base * scaled); 
                    }
                }
            } ,          
            { //10
                label: 'Disrespect', code: 'DIS',
                tooltip: 'Enemy HP < 30% -> +36% DMG',
                expUptime: .3, maxUptime: .5, difficulty: 2, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .36);
                        return d * (1 + scaled); 
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
                        //var adjusted = (.8 * d) + (.2 * dr) // normalize for 20% to proc if not on cooldown
                        return dr; // ignoring the cooldown makes this look better than it really is
                    }
                }
            },      
            { //12 
                label: 'Drops of Ether', code: 'DOE',
                tooltip: '6 possible 30s buffs, 10s CD for orbs. +15% crit, +10% atk power, +10% defense, +10% move speed, restore MP, restore HP',
                expUptime: .1, maxUptime: 1, difficulty: 7, 
                impl: {
                    def: (uptime, d, bd) => { return d + (bd * (uptime * .1)); },
                    atk: (uptime, a, base) => { 
                        var scaled = (uptime * .1);
                        return a + (base * scaled); 
                    },
                    cr: (uptime, crit) => { return crit + (uptime * .15); },
                    mspd: (uptime, s) => { return s + (uptime * .1); }
                }
            },         
            { //13
                label: 'Emergency Rescue', code: 'ER',
                tooltip: 'HP < 30% -> Shield for (20/30/50)% MaxHP (3s) then heal for 50% of shield cooldown (300/240/180) sec',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
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
                expUptime: .1, maxUptime: 1, difficulty: 7, 
                impl: {
                    def: (uptime, d, bd) => { return d + (bd * (uptime * .3)); },
                    atk: (uptime, a, base) => { 
                        var scaled = (uptime * .15);
                        return a + (base * scaled); 
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
                expUptime: 1, maxUptime: 1, difficulty: 1, 
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
                expUptime: 1, maxUptime: 1, difficulty: 3, 
                impl: {
                    dr: (uptime, d) => { return 1 - (1 - d) * 1.2; },
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .2);
                        return d * (1 + scaled); 
                    }
                }
            },                
            { //20
                label: 'Heavy Armor', code: 'HA',
                tooltip: 'defense +(20/50/100)%',
                expUptime: 1, maxUptime: 1, difficulty: -1, 
                impl: {
                    def: (uptime, d, bd) => { return d + bd; }
                } 
            },            
            { //21
                label: 'Hit Master', code: 'HM',
                tooltip: 'Not front or back attack -> 16% DMG (excluding Awakening skills)',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .16);
                        return d * (1 + scaled); 
                    }
                }
            },              
            { //22
                label: 'Increase Mass', code: 'IM',
                tooltip: '18% Atk Power (-10% Atk Speed)',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: {
                    atk: (uptime, a, base) => { 
                        var scaled = (uptime * .18);
                        return a + (base * scaled); 
                    },
                    aspd: (uptime, s) => { return s - (uptime * .1); }
                }
            },           
            { //23
                label: 'Keen Blunt Weapon', code: 'KBW',
                tooltip: '50% Crit Dmg (10% chance of -20% DMG)',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return (.9 * d) + (.1 * .8 * d); },
                    cd: (uptime, crit) => { return crit + .5; }
                }
            },      
            { //24
                label: 'Lightning Fury', code: 'LF',
                tooltip: 'On hit (1s CD) -> 60% chance of orb (5 orbs explode for base damage)',
                expUptime: .1, maxUptime: .2, difficulty: 1, 
                impl: { }
            },          
            { //25
                label: 'MP Efficiency Increase', code: 'MEI',
                tooltip: 'MP < 50% -> 12% DMG (+30% MP Regen)',
                expUptime: .5, maxUptime: 1, difficulty: 5, 
                impl: {
                    mpr: (uptime, m, base) => { return m + (base * (uptime * .3)); },
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .12);
                        return d * (1 + scaled); 
                    }
                }
            }, 
            { //26
                label: 'Magick Stream', code: 'MS',
                tooltip: 'Not hit for 3 sec -> 3% MP Regen, 5 stacks -> 10% CDR, On hit (10s CD) -> lose 1 stack',
                expUptime: .3, maxUptime: 1, difficulty: 10, 
                impl: {
                    mpr: (uptime, m, base) => { return m + (base * (uptime * .15)); },
                    cdr: (uptime, c) => { return (1 - (1 - c) * (1 - (uptime * .1))); }
                }
            },           
            { //27
                label: 'Master Brawler', code: 'MB',
                tooltip: 'Frontal Attack -> 25% DMG',
                expUptime: .7, maxUptime: 1, difficulty: 2, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .25);
                        return d * (1 + scaled); 
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
                expUptime: .5, maxUptime: 1, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .16);
                        return d * (1 + scaled); 
                    }
                }
            },      
            { //30
                label: 'Max MP Increase', code: 'MMI',
                tooltip: '30% MP',
                expUptime: 1, maxUptime: 1, difficulty: 0, 
                impl: {
                    mp: (uptime, m) => { return m * 1.3; },
                    mprBase: (uptime, m) => { return m * 1.3; }
                }
            },       
            { //31
                label: 'Necromancy', code: 'Nec',
                tooltip: 'On hit -> summon slow moving homing bomb (Cooldown 75/30/15 sec)',
                expUptime: .1, maxUptime: .2, difficulty: 1, 
                impl: { }
            },            
            { //32
                label: 'Precise Dagger', code: 'PD',
                tooltip: '20% Crit, -12% Crit Dmg',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: {
                    cr: (uptime, crit) => { return crit + .2; },
                    cd: (uptime, crit) => { return crit - .12; },
                }
            },          
            { //33
                label: 'Preemptive Strike', code: 'PS',
                tooltip: 'Enemy full HP -> 100% Crit Chance and +160% DMG',
                expUptime: .05, maxUptime: 1, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * 1.6);
                        return d * (1 + scaled); 
                    },
                    cr: (uptime, crit) => { return crit + (uptime * 1); }
                }
            },       
            { //34
                label: 'Propulsion', code: 'PRO',
                tooltip: 'Use spacebar -> +16% DMG (5s)',
                expUptime: .3, maxUptime: 1, difficulty: 5, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .16);
                        return d * (1 + scaled); 
                    }
                }
            },            
            { //35
                label: 'Raid Captain', code: 'RC',
                tooltip: '45% of movement bonus as % DMG (140% Move Speed = +18% DMG)',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * (((mspd - 1) * .45) + 1); }
                }
            },            
            { //36
                label: 'Shield Piercing', code: 'SP',
                tooltip: 'Attacking shielded enemy -> +100% DMG ',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * 2; }
                }
            },        
            { //37 
                label: 'Sight Focus', code: 'SF',
                tooltip: 'Say "!!!!!" in Normal Chat (30s CD) -> +28% DMG (6s) ... max uptime of 20%',
                expUptime: .1, maxUptime: .2, difficulty: 7, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .28);
                        return d * (1 + scaled); 
                    }
                }
            },             
            { //38
                label: 'Spirit Absorption', code: 'SA',
                tooltip: '15% Atk Speed, 15% Move Speed',
                expUptime: 1, maxUptime: 1, difficulty: -1, 
                impl: {
                    aspd: (uptime, s) => { return s + .15; },
                    mspd: (uptime, s) => { return s + .15; }
                }
            },        
            { //39
                label: 'Stabilized Status', code: 'SS',
                tooltip: 'HP > 80% -> 16% DMG',
                expUptime: .4, maxUptime: 1, difficulty: 3, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .16);
                        return d * (1 + scaled); 
                    }
                }
            },       
            { //40
                label: 'Strong Will', code: 'SW',
                tooltip: 'Being pushed -> Damage Taken -30%',
                expUptime: .5, maxUptime: 1, difficulty: 1, 
                impl: {
                    dr: (uptime, d) => { return 1 - (1 - d) * (1 - (uptime * .3)); }
                }
            },             
            { //41
                label: 'Super Charge', code: 'SC',
                tooltip: 'Charge Skill -> 20% DMG, 40% Charging Speed',
                expUptime: 3/8, maxUptime: .8, difficulty: -1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .2);
                        return d * (1 + scaled); 
                    },
                    //aspd: (uptime, s) => { return s + .4; }
                }
            },            
            { //42
                label: 'Vital Point Hit', code: 'VPH',
                tooltip: '36% more stagger done',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
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
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: { }
            },        
            { // 1
                label: '(Berserker) Berserker\'s Technique', code: 'BT',
                tooltip: 'During Burst +70% Crit Dmg (Negates Exhausion after burst)',
                expUptime: .7, maxUptime: 1, difficulty: 1, 
                impl: {
                    cd: (uptime, crit) => { return crit + (uptime * .7); }
                }
            },    
            { // 2
                label: '(Paladin) Blessed Aura', code: 'BA',
                tooltip: 'With aura -> (10/15/20)% Damage Reduction, 2% HP restored every (2.5/2/1.5) seconds',
                expUptime: .1, maxUptime: 1, difficulty: -1, 
                impl: {
                    dr: (uptime, d) => { return 1 - (1 - d) * (1 - (uptime * .2)); }
                }
            },               
            { // 3
                label: '(Gunlancer) Combat Readiness', code: 'CR',
                tooltip: 'Normal skills +20% DMG, Shield amount +50%. Defensive stance -> hit by enemy -> +6% DMG (10s) up to 3 stacks',
                expUptime: .8, maxUptime: 1, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .18);
                        return d * 1.2 * (1 + scaled); 
                    }
                }
            },           
            { // 4
                label: '(Glaivier) Control', code: 'CON',
                tooltip: 'Cannot use Focus stance. Flurry skills +36% DMG',
                expUptime: .9, maxUptime: 1, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .36);
                        return d * (1 + scaled); 
                    }
                }
            },                   
            { // 5
                label: '(Sharpshooter) Death Strike', code: 'DST',
                tooltip: 'Use Last Rush -> Recover 50% Hawk Meter and Damage taken +(22/33/44)% for 8s',
                expUptime: 1, maxUptime: 1, difficulty: 4, 
                impl: {
                    dr: (uptime, d) => { return 1 - (1 - d) * 1.44; },
                }
            },              
            { // 6
                label: '(Striker) Deathblow', code: 'DB',
                tooltip: 'Max Orbs + 1, Esoteric skills consume all orbs for +35% DMG per orb',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: { // huge burst but I'm on the fence as to a way to compute the time taken to buildup orbs
                    //dmg: (uptime, d, mspd, aspd) => { return d * 1.35; } 
                }
            },                  
            { // 7
                label: '(Shadowhunter) Demonic Impulse', code: 'DI',
                tooltip: 'Composure does not active when Demonize ends. Demoninze -> Demonic Skill CD is reset and +30% Crit Rate',
                expUptime: .7, maxUptime: 1, difficulty: 3, 
                impl: {
                    cr: (uptime, crit) => { return crit + (uptime * .3); }
                }
            },           
            { // 8
                label: '(Bard) Desperate Salvation', code: 'DSA',
                tooltip: 'Recovery effect ends -> additional recovery (8/16/24)% of your Max HP',
                expUptime: 1, maxUptime: 1, difficulty: -1, 
                impl: { }
            },       
            { // 9
                label: '(Soulfist) Energy Overflow', code: 'EO',
                tooltip: 'Energy < 30% -> +15% DMG. Energy does not go below 1. Hype -> no longer recovers additional energy.',
                expUptime: .3, maxUptime: 1, difficulty: 5, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .15);
                        return d * (1 + scaled); 
                    }
                }
            },            
            { //10
                label: '(Deadeye) Enhanced Weapon', code: 'EW',
                tooltip: 'Change stance -> +30% Crit Rate for 9s',
                expUptime: .6, maxUptime: 1, difficulty: 4, 
                impl: {
                    cr: (uptime, crit) => { return crit + (uptime * .3); }
                }
            },            
            { //11
                label: '(Striker) Esoteric Flurry', code: 'EF',
                tooltip: 'Using Esoteric Skill -> only 1 orb consumed and +18% DMG',
                expUptime: .5, maxUptime: 1, difficulty: 3, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .18);
                        return d * (1 + scaled); 
                    }
                }
            },            
            { //12
                label: '(Wardancer) Esoteric Skill Enhancement', code: 'ESE',
                tooltip: 'Max orbs + 1. Esoteric skill +12% per orb held',
                expUptime: 1/3, maxUptime: 1, difficulty: 2, 
                impl: { // how many orbs can a dancer have?
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .36);
                        return d * (1 + scaled); 
                    }
                }
            },
            { //13
                label: '(Artillerist) Firepower Enhancement', code: 'FE',
                tooltip: 'Incoming damage -20% and Crit Rate +(30/35/40)% based on level of Firepower buff',
                expUptime: .75, maxUptime: 1, difficulty: 3, 
                impl: {
                    dr: (uptime, d) => { return 1 - (1 - d) * (1 - (uptime * .2)); },
                    cr: (uptime, crit) => { return crit + (uptime * .4); }
                }
            },      
            { //14
                label: '(Wardancer) First Intention', code: 'FI',
                tooltip: 'Can no longer gain Esoteric Meter -> +32% DMG',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .32);
                        return d * (1 + scaled); 
                    }
                }
            },            
            { //15
                label: '(Destroyer) Gravity Training', code: 'GT',
                tooltip: 'Hypergravity mode -> +20% DMG. During Combat -> Meter recdover 2% every 1s. +30% Basic Atk and Vortex Gravity Crit Rate',
                expUptime: .5, maxUptime: 1, difficulty: 3, 
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .2);
                        return d * (1 + scaled); 
                    },
                    cr: (uptime, crit) => { return crit + (uptime * .3); }
                }
            },           
            { //16
                label: '(Sorceress) Igniter', code: 'IGN',
                tooltip: 'Magick Amplification -> Crit Rate +25% and Crit Dmg +50%. When Magic Amplification is triggered skills currently in cooldown -50% CD',
                expUptime: .75, maxUptime: 1, difficulty: 5, 
                impl: {
                    cr: (uptime, crit) => { return crit + (uptime * .25); },
                    cd: (uptime, crit) => { return crit + (uptime * .5); }
                }
            },                  
            { //17
                label: '(Paladin) Judgement', code: 'JUD',
                tooltip: 'Duration of Sacred Executioner +150%. Punishment DMG +15%. When Punishment hits -> Piety Gain +100%. ',
                expUptime: .6, maxUptime: 1, difficulty: 1, 
                impl: { }
            },                 
            { //18
                label: '(Gunlancer) Lone Knight', code: 'LK',
                tooltip: 'Gunlance skills -> +15% Crit Rate and +50% Crit DMG. Battlefield Shield cannot be used. Consumpiton of Shield Meter during Defensive Stance +100%',
                expUptime: 1, maxUptime: 1, difficulty: 1, 
                impl: {
                    cr: (uptime, crit) => { return crit + (uptime * .15); },
                    cd: (uptime, crit) => { return crit + (uptime * .5); }
                }
            },                
            { //19
                label: '(Sharpshooter) Loyal Companion', code: 'LC',
                tooltip: 'Mark of Death -> Foe DMG Taken + 14%. When hawk is summoned -> Atk Power +10%. Summons Silerhawk MK-II, allowing Move Speed +4%, Hawk\'s basic AoE range +60%, basic ATK DMG +300%, and summon duration +100%. Hawk inflicts Mark of Death.',
                expUptime: .75, maxUptime: 1, difficulty: 1,
                impl: {
                    atk: (uptime, a, base) => { 
                        var scaled = (uptime * .1);
                        return a + (base * scaled); 
                    },
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .14);
                        return d * (1 + scaled); 
                    }
                }
            },           
            { //20
                label: '(Berserker) Mayhem', code: 'MAY',
                tooltip: '+16% DMG, +15% Atk and Move speed, 65% additional damage reduction, -75% Max HP, -60% healing received, -75% shield absorption',
                expUptime: 1, maxUptime: 1, difficulty: 2,
                impl: {
                    hp: (uptime, h) => { return h * .25; },
                    dr: (uptime, d) => { return 1 - (1 - d) * (1 - .65); },
                    dmg: (uptime, d, mspd, aspd) => { return d * 1.16; },
                    aspd: (uptime, s) => { return s + .15; },
                    mspd: (uptime, s) => { return s + .15; }
                }
            },                   
            { //21
                label: '(Gunslinger) Peacemaker - Shotgun', code: 'PES',
                tooltip: 'Handgun -> Atk Speed +(8/12/16)%. Shotgun -> Crit Rate +(15/20/25)%. Rifle -> +10% DMG and if enemy HP < 50% -> +(10/20/30)% DMG for 9s',
                expUptime: .5, maxUptime: 1, difficulty: 3,
                impl: { 
                    cr: (uptime, crit) => { return crit + .25; },
                } 
            },                
            { //22
                label: '(Gunslinger) Peacemaker - Rifle', code: 'PER',
                tooltip: 'Handgun -> Atk Speed +(8/12/16)%. Shotgun -> Crit Rate +(15/20/25)%. Rifle -> +10% DMG and if enemy HP < 50% -> +(10/20/30)% DMG for 9s',
                expUptime: .5, maxUptime: 1, difficulty: 3,
                impl: { 
                    dmg: (uptime, d, mspd, aspd) => { return d * 1.1 * 1.3; },
                } 
            },  
            { //23
                label: '(Gunslinger) Peacemaker - Handgun', code: 'PEH',
                tooltip: 'Handgun -> Atk Speed +(8/12/16)%. Shotgun -> Crit Rate +(15/20/25)%. Rifle -> +10% DMG and if enemy HP < 50% -> +(10/20/30)% DMG for 9s',
                expUptime: .5, maxUptime: 1, difficulty: 3,
                impl: { 
                    aspd: (uptime, s) => { return s + .16; }
                } 
            }, 
            { //24
                label: '(Shadowhunter) Perfect Suppression', code: 'PS',
                tooltip: 'Normal skill -> +30% DMG. Shadowburst Meter +50% for all skills. Disables Demonize',
                expUptime: 1, maxUptime: 1, difficulty: 1,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * 1.3; }
                }
            },        
            { //25
                label: '(Glaivier) Pinnacle (Flurry)', code: 'PFL',
                tooltip: 'Max Dual Meter and Change Stance then: Flurry -> +15% Atk Speed, +15% DMG, +25% Crit Rate. Focus -> +15% Move Speed, +20% DMG, +50% Crit DMG',
                expUptime: .75, maxUptime: 1, difficulty: 2,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * 1.15; },
                    cr: (uptime, crit) => { return crit + .25; },
                    aspd: (uptime, s) => { return s + .15; }
                }
            },          
            { //26
                label: '(Glaivier) Pinnacle (Focus)', code: 'PFO',
                tooltip: 'Max Dual Meter and Change Stance then: Flurry -> +15% Atk Speed, +15% DMG, +25% Crit Rate. Focus -> +15% Move Speed, +20% DMG, +50% Crit DMG',
                expUptime: .75, maxUptime: 1, difficulty: 2,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * 1.2; },
                    cd: (uptime, crit) => { return crit + .5; },
                    mspd: (uptime, s) => { return s + .15; }
                }
            },          
            { //27
                label: '(Deadeye) Pistoleer', code: 'PIS',
                tooltip: 'Can only use Handgun. Skill DMG +70%, Stagger +40%, Awakening skill DMG +30%',
                expUptime: 1, maxUptime: 1, difficulty: 1,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * 1.7; }
                }
            },                 
            { //28  
                label: '(Destroyer) Rage Hammer', code: 'RH', 
                tooltip: 'Use Gravity Release Skill -> +5% Crit Rate and 15% Crit Dmg based on Cores used',
                expUptime: .5, maxUptime: 1, difficulty: 5,
                impl: { // does this buff stack up higher with more cores? how does it work?
                    cr: (uptime, crit) => { return crit + (uptime * .05); },
                    cd: (uptime, crit) => { return crit + (uptime * .15); },
                }
            },                
            { //29
                label: '(Sorceress) Reflux', code: 'REF', 
                tooltip: 'Disable Arcane Rupture, 16% DMG, 10% CDR (except Awakening and movement skills)',
                expUptime: 1, maxUptime: 1, difficulty: 1,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { return d * 1.16; },
                    cdr: (uptime, c) => { return (1 - (1 - c) * (1 - .1)); }
                }
            },                    
            { //30
                label: '(Deathblade) Remaining Energy', code: 'RE',
                tooltip: 'Surge skill -> +12% Atk/Move Speed and +(12/24/36) Atk Power (30s). Art does not consume meter for 2s when activated',
                expUptime: .6, maxUptime: 1, difficulty: 3,
                impl: {
                    atk: (uptime, a, base) => { 
                        var scaled = (uptime * .36);
                        return a + (base * scaled); 
                    },
                    aspd: (uptime, s) => { return s + (uptime * .12); },
                    mspd: (uptime, s) => { return s + (uptime * .12); }
                }
            },           
            { //31
                label: '(Soulfist) Robust Spirit', code: 'RS', 
                tooltip: 'Use Hype -> Enter lvl 3 immediately, Energy Recovery +200%, and +30% DMG',
                expUptime: .75, maxUptime: 1, difficulty: 3,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .3);
                        return d * (1 + scaled); 
                    }
                }
            },              
            { //32
                label: '(Scrapper) Shock Training', code: 'ST',
                tooltip: 'Shock skill +20% DMG. 4% of Shock Energy recovered every 1s',
                expUptime: .9, maxUptime: 1, difficulty: 1,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .2);
                        return d * (1 + scaled); 
                    }
                }
            },             
            { //33
                label: '(Deathblade) Surge', code: 'SUR',
                tooltip: 'Surge casts at max with empty orbs. Remaining Energy buff does not activtate. During Surge -> skill attacks stack up to 20. 1% Atk Power and Surge +6% DMG per stack. Death Trance ends -> 100% Death Orb Meter per Surge Enhancement',
                expUptime: .5, maxUptime: 1, difficulty: 6,
                impl: {
                    atk: (uptime, a, base) => { 
                        var scaled = (uptime * .2);
                        return a + (base * scaled); 
                    }
                }
            },                    
            { //34
                label: '(Gunslinger) Time to Hunt', code: 'TTH',
                tooltip: 'Crit Rate +(20/30/40)%, but Shotgun disabled',
                expUptime: 1, maxUptime: 1, difficulty: 1,
                impl: {
                    cr: (uptime, crit) => { return crit + .4; }
                }
            },             
            { //35
                label: '(Bard) True Courage', code: 'TC',
                tooltip: 'Serenade of Courage -> You gain +20% DMG and +10% Crit Rate',
                expUptime: .5, maxUptime: 1, difficulty: 3,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .2);
                        return d * (1 + scaled); 
                    },
                    cr: (uptime, crit) => { return crit + (uptime * .1); },
                }
            },            
            { //36
                label: '(Scrapper) Ultimate Skill: Taijutsu', code: 'UST',
                tooltip: 'Stamina Skills -> +65% DMG, Shock Skills -> -30% DMG, Stamina Energy recovery + 300%',
                expUptime: .5, maxUptime: 1, difficulty: 3,
                impl: {
                    dmg: (uptime, d, mspd, aspd) => { 
                        var scaled = (uptime * .65);
                        return d * (1 + scaled); 
                    }
                }
            }
        ]
    },
];

export default engravings;