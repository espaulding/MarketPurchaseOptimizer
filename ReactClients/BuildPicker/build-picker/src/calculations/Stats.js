const LostArkMath = {
    mergeDifficulty: function(arrDiff) {
        var result = {};

        arrDiff.forEach((e) => {
            Object
                .keys(e)
                .map((name, index) => {
                    result[name] = e[name];
                });
        });
        
        return result;
    },

    sumDifficulty: function(d) {
        var difficulty = 0;
        Object
            .keys(d)
            .map((name, index) => {
                difficulty += d[name];
            });
        return difficulty;
    },

    computeHp: function(data) {
        var HP = +data.hp; if(isNaN(HP)) { HP = 0; }
        return HP;
    },
    
    computeHpWithEngravings: function(data, selectedEngravings) {
        var HP = this.computeHp(data);

        var difficulty = {};
        var expected = HP, maximum = HP;
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.hp !== undefined) {
                expected = e.impl.hp(e.expUptime, expected);
                maximum = e.impl.hp(e.maxUptime, maximum);
                difficulty[e.code] = e.difficulty;
            }
        });
    
        return { expected: Math.floor(expected), maximum: Math.floor(maximum), difficulty: difficulty };
    },

    // t -> type of defense 'physical' or 'magical'
    computeDef: function(data, t) {
        var defense = 0;
        if (t === 'physical') { defense = +data.defensePhysical }
        if (t === 'magical') { defense = +data.defenseMagical }
        if(isNaN(defense)) { defense = 0; }

        return Math.floor(defense);
    },

    // t -> type of defense 'physical' or 'magical'
    computeDefWithEngravings: function(data, t, selectedEngravings) {
        var defense = this.computeDef(data, t);
        const baseDefense = defense;

        var difficulty = {};
        var expected = defense, maximum = defense;
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.def !== undefined) {
                expected = e.impl.def(e.expUptime, expected, baseDefense);
                maximum = e.impl.def(e.maxUptime, maximum, baseDefense);
                difficulty[e.code] = e.difficulty;
            }
        });

        return { expected: Math.floor(expected), maximum: Math.floor(maximum), difficulty: difficulty };
    },

    // t -> type of defense 'physical' or 'magical'
    computeDr: function(data, t) {
        var DR = 0;
        var defense = this.computeDef(data, t);
        if (defense > 0) { DR = defense / (defense + 6500); }
        return DR;
    },

    // t -> type of defense 'physical' or 'magical'
    computeDrWithEngravings: function(data, t, selectedEngravings) {
        var expected = 0, maximum = 0;
        var objDefense = this.computeDefWithEngravings(data, t, selectedEngravings);
        if (objDefense.expected > 0) { expected = objDefense.expected / (objDefense.expected + 6500); }
        if (objDefense.maximum > 0) { maximum = objDefense.maximum / (objDefense.maximum + 6500); }
        
        var difficulty = objDefense.difficulty;
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.dr !== undefined) {
                expected = e.impl.dr(e.expUptime, expected);
                maximum = e.impl.dr(e.maxUptime, maximum);
                difficulty[e.code] = e.difficulty;
            }
        });

        return { expected: expected, maximum: maximum, difficulty: difficulty };
    },

    // t -> type of defense physical or magical
    computeEffectiveHp: function(data, t) {
        var hp = +data.hp; if(isNaN(hp)) { hp = 0; }
        var percentDamageTaken = (1 - this.computeDr(data, t));
        if(percentDamageTaken > 0 && hp > 0) { hp /= percentDamageTaken; }
        return  Math.floor(hp);
    },

    // t -> type of defense physical or magical
    computeEffectiveHpWithEngravings: function(data, t, selectedEngravings) {
        var objHp = this.computeHpWithEngravings(data, selectedEngravings);
        var objDr = this.computeDrWithEngravings(data, t, selectedEngravings);

        if((1 - objDr.expected) > 0 && objHp.expected > 0) { objHp.expected /= (1 - objDr.expected); }
        if((1 - objDr.maximum) > 0 && objHp.maximum > 0) { objHp.maximum /= (1 - objDr.maximum); }

        return { 
            expected: Math.floor(objHp.expected), 
            maximum: Math.floor(objHp.maximum), 
            difficulty: this.mergeDifficulty([objHp.difficulty, objDr.difficulty]) 
        };
    },

    computeMp: function(data) {
        var MP = +data.mp; if(isNaN(MP)) { MP = 0; }
        return Math.floor(MP);
    },

    computeMpWithEngravings: function(data, selectedEngravings) {
        var MP = this.computeMp(data);

        var difficulty = {};
        var expected = MP, maximum = MP;
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.mp !== undefined) {
                expected = e.impl.mp(e.expUptime, expected);
                maximum = e.impl.mp(e.maxUptime, expected);
                difficulty[e.code] = e.difficulty;
            }
        });

        return { expected: Math.floor(expected), maximum: Math.floor(maximum), difficulty: difficulty };
    },

    computeMpRegen: function(data) {
        var mpRegen = +data.mpRegen; if(isNaN(mpRegen)) { mpRegen = 0; }
        return Math.floor(mpRegen);
    },

    computeMpRegenWithEngravings: function(data, selectedEngravings) {
        var mpRegen = this.computeMpRegen(data);

        var bdifficulty = {};
        var bExpected = mpRegen, bMaximum = mpRegen;
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.mprBase !== undefined) {
                bExpected = e.impl.mprBase(e.expUptime, bExpected);
                bMaximum = e.impl.mprBase(e.maxUptime, bMaximum);
                bdifficulty[e.code] = e.difficulty;
            }
        });

        var difficulty = {};
        var expected = Math.floor(bExpected);
        var maximum = Math.floor(bMaximum);
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.mpr !== undefined) {
                expected = e.impl.mpr(e.expUptime, expected, Math.floor(bExpected) - 1);
                maximum = e.impl.mpr(e.maxUptime, maximum, Math.floor(bMaximum) - 1);
                difficulty[e.code] = e.difficulty;
            }
        });

        return { 
            expected: Math.floor(expected), 
            maximum: Math.floor(maximum), 
            difficulty: this.mergeDifficulty([bdifficulty, difficulty]) 
        };
    },

    computeAttackPower: function(data) {
        var ap = 0;
        var atkStat = +data.atkStat; if(isNaN(atkStat)) { atkStat = 0; }
        var wpnDmg = +data.wpnDmg; if(isNaN(wpnDmg)) { wpnDmg = 0; }
        
        if(atkStat > 0 && wpnDmg > 0) {
            ap = Math.floor(Math.sqrt(atkStat * wpnDmg / 6));
        }

        return Math.floor(ap);
    },

    computeAttackPowerWithEngravings: function(data, selectedEngravings) {
        var ap = this.computeAttackPower(data);
        const baseAP = ap;

        var difficulty = {};
        var expected = ap, maximum = ap;
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.atk !== undefined) {
                expected = e.impl.atk(e.expUptime, expected, baseAP);
                maximum = e.impl.atk(e.maxUptime, maximum, baseAP);
                difficulty[e.code] = e.difficulty;
            }
        });

        return { expected: Math.floor(expected), maximum: Math.floor(maximum), difficulty: difficulty };
    },

    computeCritRate: function(data) {
        var critRate = +data.critRate; if(isNaN(critRate)) { critRate = 0; }
        return critRate < 1 ? critRate : 1;
    },

    computeCritRateEngrave: function(data, selectedEngravings) {
        var critRate = this.computeCritRate(data);

        var difficulty = {};
        var expected = critRate, maximum = critRate;
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.cr !== undefined) {
                expected = e.impl.cr(e.expUptime, expected);
                maximum = e.impl.cr(e.maxUptime, maximum);
                difficulty[e.code] = e.difficulty;
            }
        });

        return { 
            expected: expected < 1 ? expected : 1, 
            maximum: maximum < 1 ? maximum : 1,
            difficulty: difficulty 
        };
    },

    computeCritDmg: function(data) {
        var critDmg = +data.critDmg; if(isNaN(critDmg)) { critDmg = 2; }; if(critDmg > 6) { critDmg = 6; }
        return critDmg;
    },

    computeCritDmgEngrave: function(data, selectedEngravings) {
        var critDmg = this.computeCritDmg(data);

        var difficulty = {};
        var expected = critDmg, maximum = critDmg;
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.cd !== undefined) {
                expected = e.impl.cd(e.expUptime, expected);
                maximum = e.impl.cd(e.maxUptime, maximum);
                difficulty[e.code] = e.difficulty;
            }
        });

        return { expected: expected, maximum: maximum, difficulty: difficulty };
    },

    computeCdr: function(data) {
        var cooldownReduction = +data.cdr; if(isNaN(cooldownReduction)) { cooldownReduction = 0; }; if(cooldownReduction < 0) { cooldownReduction = 0; }
        var gemLvl = +data.cdrGem; if(gemLvl < 0) { gemLvl = 0; }; if(gemLvl > 10) { gemLvl = 10; }
        if(!isNaN(gemLvl) && gemLvl > 0) { cooldownReduction = 1 - ((1 - cooldownReduction) * (1 - (gemLvl * .02))); }

        return cooldownReduction < .75 ? cooldownReduction : .75; // 75% CDR is the cap in game
    },

    computeCdrEngrave: function(data, selectedEngravings) {
        var cooldownReduction = this.computeCdr(data);
        
        var difficulty = {};
        var expected = cooldownReduction, maximum = cooldownReduction;
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.cdr !== undefined) {
                expected = e.impl.cdr(e.expUptime, expected);
                maximum = e.impl.cdr(e.maxUptime, maximum);
                difficulty[e.code] = e.difficulty;
            }
        });

        return { 
            expected: expected < .75 ? expected : .75, // 75% CDR is the cap in game
            maximum: maximum < .75 ? maximum : .75,
            difficulty: difficulty 
        };
    },

    computeAtkSpeed: function(data) {
        var atkSpeed = +data.atkSpeed; if(isNaN(atkSpeed)) { atkSpeed = 1; }
        atkSpeed = atkSpeed > .5 ? atkSpeed : .5;
        return atkSpeed < 1.4 ? atkSpeed : 1.4;
    },

    computeAtkSpeedEngrave: function(data, selectedEngravings) {
        var atkSpeed = this.computeAtkSpeed(data);

        var difficulty = {};
        var expected = atkSpeed, maximum = atkSpeed;
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.aspd !== undefined) {
                expected = e.impl.aspd(e.expUptime, expected);
                maximum = e.impl.aspd(e.maxUptime, maximum);
                difficulty[e.code] = e.difficulty;
            }
        });

        expected = expected > .5 ? expected : .5;
        maximum = maximum > .5 ? maximum : .5;
        return { 
            expected: expected < 1.4 ? expected : 1.4,
            maximum: maximum < 1.4 ? maximum : 1.4,
            difficulty: difficulty 
        };
    },

    computeMoveSpeed: function(data) {
        var moveSpeed = +data.moveSpeed; if(isNaN(moveSpeed)) { moveSpeed = 1; }
        moveSpeed = moveSpeed > .5 ? moveSpeed : .5;
        return moveSpeed < 1.4 ? moveSpeed : 1.4;
    },

    computeMoveSpeedEngrave: function(data, selectedEngravings) {
        var moveSpeed = this.computeMoveSpeed(data);

        var difficulty = {};
        var expected = moveSpeed, maximum = moveSpeed;
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.mspd !== undefined) {
                expected = e.impl.mspd(e.expUptime, expected);
                maximum = e.impl.mspd(e.maxUptime, maximum);
                difficulty[e.code] = e.difficulty;
            }
        });

        expected = expected > .5 ? expected : .5;
        maximum = maximum > .5 ? maximum : .5;
        return { 
            expected: expected < 1.4 ? expected : 1.4,
            maximum: maximum < 1.4 ? maximum : 1.4,
            difficulty: difficulty 
        };
    },

    normalizeCrit: function(ap, critRate, critDmg) {
        var dmg = ap;
        if(critRate > 0 && critDmg > 0) {
            dmg = (critRate * critDmg * ap) + (1 - critRate) * ap;
        }
        return dmg;
    },

    normalizeCdr: function(dmg, cdr) {
        if(cdr > 0) { dmg /= (1 - cdr); }
        return dmg;
    },

    // I'm taking inspiration from raid captain's 45% here as a form of tuning
    // because often cooldowns are the bottleneck or characters have to move and avoid stuff
    // however it's also unreasonable to say that attack speed does not increase dps
    // but it's equally unreasonable to assume 100% of attack speed bonus is not a dps increase
    normalizeAtkSpeed: function(dmg, atkSpeed, cdr) {
        var bonus = .45, cdrCap = .75;
            //bonus *= ((1 - cdr) / cdrCap); 
        var bonusAtkSpeed = (atkSpeed > 1) ? (atkSpeed - 1) : 0;
        //console.log('bonus before ' + bonus + ' speed: ' + bonusAtkSpeed);
        bonus = (bonus + 1) * bonusAtkSpeed;
        if (atkSpeed >= 1 && cdr > 0) { dmg *= (bonus / 4 + 1); }
        return dmg;
    },

    computeBaseDmg: function(data) {
        var critRate = this.computeCritRate(data);
        var critDmg = this.computeCritDmg(data);
        var atkSpeed = this.computeAtkSpeed(data);
        var cdr = this.computeCdr(data);
        var dmg = this.normalizeCrit(this.computeAttackPower(data), critRate, critDmg);
            dmg = this.normalizeCdr(dmg, cdr);
            dmg = this.normalizeAtkSpeed(dmg, atkSpeed, cdr);
        
        return dmg; 
    },

    computeBaseDmgEngrave: function(data, selectedEngravings) {
        var critRate = this.computeCritRateEngrave(data, selectedEngravings);
        var critDmg = this.computeCritDmgEngrave(data, selectedEngravings);
        var cdr = this.computeCdrEngrave(data, selectedEngravings);
        var moveSpeed = this.computeMoveSpeedEngrave(data, selectedEngravings);
        var atkSpeed = this.computeAtkSpeedEngrave(data, selectedEngravings);
        var ap = this.computeAttackPowerWithEngravings(data, selectedEngravings);
        var difficulty = this.mergeDifficulty([
            critRate.difficulty, 
            critDmg.difficulty,
            cdr.difficulty,
            moveSpeed.difficulty,
            atkSpeed.difficulty,
            ap.difficulty
        ]);

        var baseDmgEngraveExpected = this.normalizeCrit(ap.expected, critRate.expected, critDmg.expected);
            baseDmgEngraveExpected = this.normalizeCdr(baseDmgEngraveExpected, cdr.expected);
            baseDmgEngraveExpected = this.normalizeAtkSpeed(baseDmgEngraveExpected, atkSpeed.expected, cdr.expected);

        var baseDmgEngraveMaximum = this.normalizeCrit(ap.maximum, critRate.maximum, critDmg.maximum);
            baseDmgEngraveMaximum = this.normalizeCdr(baseDmgEngraveMaximum, cdr.maximum);
            baseDmgEngraveMaximum = this.normalizeAtkSpeed(baseDmgEngraveMaximum, atkSpeed.maximum, cdr.maximum);

        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.dmg !== undefined) {
                baseDmgEngraveExpected = e.impl.dmg(e.expUptime, baseDmgEngraveExpected, moveSpeed.expected, atkSpeed.expected);
                baseDmgEngraveMaximum = e.impl.dmg(e.maxUptime, baseDmgEngraveMaximum, moveSpeed.maximum, atkSpeed.maximum);
                difficulty[e.code] = e.difficulty;
            }
        });

        return { 
            expected: baseDmgEngraveExpected, 
            maximum: baseDmgEngraveMaximum, 
            difficulty: this.sumDifficulty(difficulty)
        };
    },
}

export default LostArkMath;
