// t -> type of defense
// physical or magical
const computeDr = (data, t) => {
    var defense = 0;
    if (t === 'physical') { defense = +data.defensePhysical }
    if (t === 'magical') { defense = +data.defenseMagical }
    if(isNaN(defense)) { defense = 0; }

    var DR = 0;
    if (defense > 0) { DR = defense / (defense + 6500); }
    return DR;
}

// t -> type of defense
// physical or magical
const computeDefWithEngravings = (data, t, selectedEngravings) => {
    var defense = 0;
    if (t === 'physical') { defense = +data.defensePhysical }
    if (t === 'magical') { defense = +data.defenseMagical }
    const baseDefense = defense;
    if(isNaN(defense)) { defense = 0; }

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.def !== undefined) {
            defense = e.impl.def(defense, baseDefense);
        }
    });

    return defense;
}

// t -> type of defense
// physical or magical
const computeDrWithEngravings = (data, t, selectedEngravings) => {
    var defense = computeDefWithEngravings(data, t, selectedEngravings);
    var percentReduction = 0;
    if (defense > 0) { percentReduction = defense / (defense + 6500); }
    
    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.dr !== undefined) {
            percentReduction = e.impl.dr(percentReduction);
        }
    });

    return percentReduction;
}

const computeHpWithEngravings = (data, selectedEngravings) => {
    var HP = +data.hp; if(isNaN(HP)) { HP = 0; }

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.hp !== undefined) {
            HP = e.impl.hp(HP);
        }
    });

    return HP;
}

const computeMpWithEngravings = (data, selectedEngravings) => {
    var MP = +data.mp; if(isNaN(MP)) { MP = 0; }

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.mp !== undefined) {
            MP = e.impl.mp(MP);
        }
    });

    return MP;
}

const computeMpRegenWithEngravings = (data, selectedEngravings) => {
    var mpRegen = +data.mpRegen; if(isNaN(mpRegen)) { mpRegen = 0; }

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.mpr !== undefined) {
            mpRegen = e.impl.mpr(mpRegen);
        }
    });

    return mpRegen;
}

// t -> type of defense
// physical or magical
const computeEffectiveHp = (data, t) => {
    var hp = +data.hp; if(isNaN(hp)) { hp = 0; }
    var percentDamageTaken = (1 - computeDr(data, t))
    var effHP = 0;
    if(percentDamageTaken > 0 && hp > 0) {
        effHP = hp / percentDamageTaken;
    }

    return  effHP;
}

// t -> type of defense
// physical or magical
const computeEffectiveHpWithEngravings = (data, t, selectedEngravings) => {
    var hp = computeHpWithEngravings(data, selectedEngravings);
    var percentDamageTaken = (1 - computeDrWithEngravings(data, t, selectedEngravings))

    var effHP = 0;
    if(percentDamageTaken > 0 && hp > 0) {
        effHP = hp / percentDamageTaken;
    }

    return effHP;
}

const computeAttackPower = (data) => {
    var atkStat = +data.atkStat; if(isNaN(atkStat)) { atkStat = 0; }
    var wpnDmg = +data.wpnDmg; if(isNaN(wpnDmg)) { wpnDmg = 0; }

    var ap = 0;
    if(atkStat > 0 && wpnDmg > 0) {
        ap = Math.floor(Math.sqrt(atkStat * wpnDmg / 6));
    }

    return ap;
}

const computeAttackPowerWithEngravings = (data, selectedEngravings) => {
    var ap = computeAttackPower(data);

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.atk !== undefined) {
            ap = e.impl.atk(ap);
        }
    });

    return ap;
}

const normalizeCrit = (ap, critRate, critDmg) => {
    var dmg = ap;
    if(critRate > 0 && critDmg > 0) {
        dmg = (critRate * critDmg * ap) + (1 - critRate) * ap;
    }
    return dmg;
}

const normalizeCdr = (dmg, cdr) => {
    if(cdr > 0) { dmg /= (1 - cdr); }
    return dmg;
}

const computeBaseDmg = (data) => {
    var critRate = +data.critRate; if(isNaN(critRate)) { critRate = 0; }; if(critRate > 1) { critRate = 1; }
    var critDmg = +data.critDmg; if(isNaN(critDmg)) { critDmg = 2; }; if(critDmg > 6) { critDmg = 6; }
    var cdr = +data.cdr;
    if(isNaN(cdr)) { cdr = 0; }

    var dmg = normalizeCrit(computeAttackPower(data), critRate, critDmg);
        dmg = normalizeCdr(dmg, cdr);
    console.log(dmg);
    return dmg;
}

const computeCritRateEngrave = (data, selectedEngravings) => {
    var critRate = +data.critRate; if(isNaN(critRate)) { critRate = 0; }

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.cr !== undefined) {
            critRate = e.impl.cr(critRate);
        }
    });

    return critRate < 1 ? critRate : 1;
}

const computeCritDmgEngrave = (data, selectedEngravings) => {
    var critDmg = +data.critDmg; if(isNaN(critDmg)) { critDmg = 2; }; if(critDmg > 6) { critDmg = 6; }

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.cd !== undefined) {
            critDmg = e.impl.cd(critDmg);
        }
    });

    return critDmg;
}

const computeCdr = (data) => {
    var cooldownReduction = +data.cdr; if(isNaN(cooldownReduction)) { cooldownReduction = 0; }; if(cooldownReduction < 0) { cooldownReduction = 0; }
    var gemLvl = +data.cdrGem; if(gemLvl < 0) { gemLvl = 0; }; if(gemLvl > 10) { gemLvl = 10; }
    if(!isNaN(gemLvl) && gemLvl > 0) { cooldownReduction = 1 - ((1 - cooldownReduction) * (1 - (gemLvl * .02))); }

    return cooldownReduction;
};

const computeCdrEngrave = (data, selectedEngravings) => {
    var cooldownReduction = computeCdr(data);
    
    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.cdr !== undefined) {
            cooldownReduction = e.impl.cdr(cooldownReduction);
        }
    });

    return cooldownReduction < .75 ? cooldownReduction : .75; // 75% CDR is the cap in game
}

const computeAtkSpeedEngrave = (data, selectedEngravings) => {
    var atkSpeed = +data.atkSpeed; if(isNaN(atkSpeed)) { atkSpeed = 1; }

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.aspd !== undefined) {
            atkSpeed = e.impl.aspd(atkSpeed);
        }
    });

    return atkSpeed;
}

const computeMoveSpeedEngrave = (data, selectedEngravings) => {
    var moveSpeed = +data.moveSpeed; if(isNaN(moveSpeed)) { moveSpeed = 1; }

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.mspd !== undefined) {
            moveSpeed = e.impl.mspd(moveSpeed);
        }
    });

    return moveSpeed < 1.4 ? moveSpeed : 1.4;
}

const computeBaseDmgEngrave = (data, selectedEngravings) => {
    var critRate = computeCritRateEngrave(data, selectedEngravings);
    var critDmg = computeCritDmgEngrave(data, selectedEngravings);
    var cdr = computeCdrEngrave(data, selectedEngravings);
    var moveSpeed = computeMoveSpeedEngrave(data, selectedEngravings);
    var atkSpeed = computeAtkSpeedEngrave(data, selectedEngravings);
    var ap = computeAttackPowerWithEngravings(data, selectedEngravings);
    var baseDmgEngrave = normalizeCrit(ap, critRate, critDmg);
        baseDmgEngrave = normalizeCdr(baseDmgEngrave, cdr);

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.dmg !== undefined) {
            baseDmgEngrave = e.impl.dmg(baseDmgEngrave, moveSpeed, atkSpeed);
        }
    });

    return baseDmgEngrave;
};

export {
    computeDr, computeDrWithEngravings, computeDefWithEngravings,
    computeEffectiveHp, computeEffectiveHpWithEngravings, computeHpWithEngravings,
    computeMpWithEngravings, computeMpRegenWithEngravings,
    computeAttackPower, computeAttackPowerWithEngravings,
    computeCritRateEngrave, computeCritDmgEngrave,
    computeCdr, computeCdrEngrave, computeAtkSpeedEngrave, computeMoveSpeedEngrave,
    computeBaseDmg, computeBaseDmgEngrave
};