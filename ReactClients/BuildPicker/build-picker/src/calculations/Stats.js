const LostArkMath = {
    computeHp: function(data) {
        var HP = +data.hp; if(isNaN(HP)) { HP = 0; }
        return HP;
    },
    
    computeHpWithEngravings: function(data, selectedEngravings) {
        var HP = this.computeHp(data);
    
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.hp !== undefined) {
                HP = e.impl.hp(HP);
            }
        });
    
        return Math.floor(HP);
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

        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.def !== undefined) {
                defense = e.impl.def(defense, baseDefense);
            }
        });

        return Math.floor(defense);
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
        var percentReduction = 0;
        var defense = this.computeDefWithEngravings(data, t, selectedEngravings);
        if (defense > 0) { percentReduction = defense / (defense + 6500); }
        
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.dr !== undefined) {
                percentReduction = e.impl.dr(percentReduction);
            }
        });

        return percentReduction;
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
        var hp = this.computeHpWithEngravings(data, selectedEngravings);
        var percentDamageTaken = (1 - this.computeDrWithEngravings(data, t, selectedEngravings));
        if(percentDamageTaken > 0 && hp > 0) { hp /= percentDamageTaken; }
        return  Math.floor(hp);
    },

    computeMp: function(data) {
        var MP = +data.mp; if(isNaN(MP)) { MP = 0; }
        return Math.floor(MP);
    },

    computeMpWithEngravings: function(data, selectedEngravings) {
        var MP = this.computeMp(data);

        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.mp !== undefined) {
                MP = e.impl.mp(MP);
            }
        });

        return Math.floor(MP);
    },

    computeMpRegen: function(data) {
        var mpRegen = +data.mpRegen; if(isNaN(mpRegen)) { mpRegen = 0; }
        return Math.floor(mpRegen);
    },

    computeMpRegenWithEngravings: function(data, selectedEngravings) {
        var mpRegen = this.computeMpRegen(data);
        var baseRegen = mpRegen;

        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.mprBase !== undefined) {
                baseRegen = e.impl.mprBase(baseRegen);
            }
        });
        mpRegen = Math.floor(baseRegen);

        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.mpr !== undefined) {
                mpRegen = e.impl.mpr(mpRegen, Math.floor(baseRegen) - 1);
            }
        });

        return Math.floor(mpRegen);
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
        var baseAP = ap;

        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.atk !== undefined) {
                ap = e.impl.atk(ap, baseAP);
            }
        });

        return Math.floor(ap);
    },

    computeCritRate: function(data) {
        var critRate = +data.critRate; if(isNaN(critRate)) { critRate = 0; }
        return critRate < 1 ? critRate : 1;
    },

    computeCritRateEngrave: function(data, selectedEngravings) {
        var critRate = this.computeCritRate(data);

        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.cr !== undefined) {
                critRate = e.impl.cr(critRate);
            }
        });

        return critRate < 1 ? critRate : 1;
    },

    computeCritDmg: function(data) {
        var critDmg = +data.critDmg; if(isNaN(critDmg)) { critDmg = 2; }; if(critDmg > 6) { critDmg = 6; }
        return critDmg;
    },

    computeCritDmgEngrave: function(data, selectedEngravings) {
        var critDmg = this.computeCritDmg(data);

        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.cd !== undefined) {
                critDmg = e.impl.cd(critDmg);
            }
        });

        return critDmg;
    },

    computeCdr: function(data) {
        var cooldownReduction = +data.cdr; if(isNaN(cooldownReduction)) { cooldownReduction = 0; }; if(cooldownReduction < 0) { cooldownReduction = 0; }
        var gemLvl = +data.cdrGem; if(gemLvl < 0) { gemLvl = 0; }; if(gemLvl > 10) { gemLvl = 10; }
        if(!isNaN(gemLvl) && gemLvl > 0) { cooldownReduction = 1 - ((1 - cooldownReduction) * (1 - (gemLvl * .02))); }

        return cooldownReduction < .75 ? cooldownReduction : .75; // 75% CDR is the cap in game
    },

    computeCdrEngrave: function(data, selectedEngravings) {
        var cooldownReduction = this.computeCdr(data);
        
        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.cdr !== undefined) {
                cooldownReduction = e.impl.cdr(cooldownReduction);
            }
        });

        return cooldownReduction < .75 ? cooldownReduction : .75; // 75% CDR is the cap in game
    },

    computeAtkSpeed: function(data) {
        var atkSpeed = +data.atkSpeed; if(isNaN(atkSpeed)) { atkSpeed = 1; }
        atkSpeed = atkSpeed > .5 ? atkSpeed : .5;
        return atkSpeed < 1.4 ? atkSpeed : 1.4;
    },

    computeAtkSpeedEngrave: function(data, selectedEngravings) {
        var atkSpeed = this.computeAtkSpeed(data);

        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.aspd !== undefined) {
                atkSpeed = e.impl.aspd(atkSpeed);
            }
        });

        atkSpeed = atkSpeed > .5 ? atkSpeed : .5;
        return atkSpeed < 1.4 ? atkSpeed : 1.4;
    },

    computeMoveSpeed: function(data) {
        var moveSpeed = +data.moveSpeed; if(isNaN(moveSpeed)) { moveSpeed = 1; }
        moveSpeed = moveSpeed > .5 ? moveSpeed : .5;
        return moveSpeed < 1.4 ? moveSpeed : 1.4;
    },

    computeMoveSpeedEngrave: function(data, selectedEngravings) {
        var moveSpeed = this.computeMoveSpeed(data);

        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.mspd !== undefined) {
                moveSpeed = e.impl.mspd(moveSpeed);
            }
        });

        moveSpeed = moveSpeed > .5 ? moveSpeed : .5;
        return moveSpeed < 1.4 ? moveSpeed : 1.4;
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
    // it's unreasonable to say that attack speed does not increase dps
    // but it's equally unreasonable to assume 100% of attack speed bonus is a dps increase
    // give up to a 60% boost for bonus atk speed based on CDR
    normalizeAtkSpeed: function(dmg, atkSpeed, cdr) {
        var percentBonusAtkSpeed = .1;
        var cdrCap = .75;
        var bonus = percentBonusAtkSpeed;
            bonus *= ((1 - cdr) / cdrCap); 
        var bonusAtkSpeed = (atkSpeed > 1) ? (atkSpeed - 1) : 0;
        //console.log('bonus before ' + bonus + ' speed: ' + bonusAtkSpeed);
        bonus = (bonus + 1) * bonusAtkSpeed;
        //console.log('dmg: ' + dmg);
        //console.log('bonus after ' + bonus);
        if (atkSpeed >= 1 && cdr > 0) { dmg *= (bonus / 3 + 1); }
        //console.log('dmg: ' + dmg);
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
        var baseDmgEngrave = this.normalizeCrit(ap, critRate, critDmg);
            baseDmgEngrave = this.normalizeCdr(baseDmgEngrave, cdr);
            baseDmgEngrave = this.normalizeAtkSpeed(baseDmgEngrave, atkSpeed, cdr);

        selectedEngravings.forEach(function (e) {
            if(e.impl !== undefined && e.impl.dmg !== undefined) {
                baseDmgEngrave = e.impl.dmg(baseDmgEngrave, moveSpeed, atkSpeed);
            }
        });

        return baseDmgEngrave;
    },
}

export default LostArkMath;