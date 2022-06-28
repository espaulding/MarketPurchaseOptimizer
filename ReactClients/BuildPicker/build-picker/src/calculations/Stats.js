// t -> type of defense
// physical or magical
const computeDr = (data, t) => {
    var defense = 0;
    if (t === 'physical') { defense = data.defensePhysical }
    if (t === 'magical') { defense = data.defenseMagical }
    return defense / (defense + 6500);
}

// t -> type of defense
// physical or magical
const computeDefWithEngravings = (data, t, selectedEngravings) => {
    var defense = 0;
    if (t === 'physical') { defense = data.defensePhysical }
    if (t === 'magical') { defense = data.defenseMagical }

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.def !== undefined) {
            defense = e.impl.def(defense);
        }
    });

    return defense;
}

// t -> type of defense
// physical or magical
const computeDrWithEngravings = (data, t, selectedEngravings) => {
    var defense = computeDefWithEngravings(data, t, selectedEngravings);
    var percentReduction = defense / (defense + 6500);

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.dr !== undefined) {
            percentReduction = e.impl.dr(percentReduction);
        }
    });

    return percentReduction;
}

const computeHpWithEngravings = (data, selectedEngravings) => {
    var HP = data.hp;

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.hp !== undefined) {
            HP = e.impl.hp(HP);
        }
    });

    return HP;
}

const computeMpWithEngravings = (data, selectedEngravings) => {
    var MP = data.mp;

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.mp !== undefined) {
            MP = e.impl.mp(MP);
        }
    });

    return MP;
}

const computeMpRegenWithEngravings = (data, selectedEngravings) => {
    var mpRegen = data.mpRegen;

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
    var PercentDamageTaken = (1 - computeDr(data, t))
    return data.hp / PercentDamageTaken;
}

// t -> type of defense
// physical or magical
const computeEffectiveHpWithEngravings = (data, t, selectedEngravings) => {
    var HP = computeHpWithEngravings(data, selectedEngravings);
    var PercentDamageTaken = (1 - computeDrWithEngravings(data, t, selectedEngravings))

    return HP / PercentDamageTaken;
}

const computeAttackPower = (data) => {
    return Math.floor(Math.sqrt(data.atkStat * data.wpnDmg / 6));
}

const computeAttackPowerWithEngravings = (data, selectedEngravings) => {
    var atkStat = data.atkStat;
    var wpnDmg = data.wpnDmg;
    var ap = Math.floor(Math.sqrt(atkStat * wpnDmg / 6));

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.atk !== undefined) {
            ap = e.impl.atk(ap);
        }
    });

    return ap;
}

const normalizeCrit = (ap, critRate, critDmg) => {
    return (critRate * critDmg * ap) + (1 - critRate) * ap;
}

const normalizeCdr = (dmg, cdr) => {
    return dmg / (1 - cdr);
}

const computeBaseDmg = (data) => {
    var dmg = normalizeCrit(computeAttackPower(data), data.critRate, data.critDmg);
        dmg = normalizeCdr(dmg, data.cdr);
    return dmg;
}

const computeCritRateEngrave = (data, selectedEngravings) => {
    var critRate = data.critRate;

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.cr !== undefined) {
            critRate = e.impl.cr(critRate);
        }
    });

    return critRate < 1 ? critRate : 1;
}

const computeCritDmgEngrave = (data, selectedEngravings) => {
    var critDmg = data.critDmg;

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.cd !== undefined) {
            critDmg = e.impl.cd(critDmg);
        }
    });

    return critDmg;
}

const computeCdrEngrave = (data, selectedEngravings) => {
    var cooldownReduction = data.cdr;

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.cdr !== undefined) {
            cooldownReduction = e.impl.cdr(cooldownReduction);
        }
    });

    return cooldownReduction < 1 ? cooldownReduction : 1;
}

const computeAtkSpeedEngrave = (data, selectedEngravings) => {
    var atkSpeed = data.atkSpeed;

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.aspd !== undefined) {
            atkSpeed = e.impl.aspd(atkSpeed);
        }
    });

    return atkSpeed;
}

const computeMoveSpeedEngrave = (data, selectedEngravings) => {
    var moveSpeed = data.moveSpeed;

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
    computeCdrEngrave, computeAtkSpeedEngrave, computeMoveSpeedEngrave,
    computeBaseDmg, computeBaseDmgEngrave
};