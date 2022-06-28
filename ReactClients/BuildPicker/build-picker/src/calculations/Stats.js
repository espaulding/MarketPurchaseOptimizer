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

    // selectedEngravings.forEach(function (e) {
    //     if(e.code === 'EP')  { classDef *= 1.3; }  //On hit -> .5% AP 1% Def for 90s up to 30 stacks (orb CD 10s)
    //     if(e.code === 'HA')  { classDef *= 2; }  //100% defense
    // });

    var percentReduction = defense / (defense + 6500);

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.dr !== undefined) {
            percentReduction = e.impl.dr(percentReduction);
        }
    });

    // selectedEngravings.forEach(function (e) {
    //     if(e.code === 'GRU') { DR = 1 - (1 - DR) * 1.2; } //20% DMG (20% more dmg taken)
    //     if(e.code === 'FOR') { DR = 1 - (1 - DR) * .7; }  //Low HP -> 30% DR
    //     if(e.code === 'MAY') { DR = 1 - (1 - DR) * .35; } // Mayhem 65% DR
    // });

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

    // selectedEngravings.forEach(function (e) {
    //     if(e.code === 'ADR') { ap *= 1.06; }  //Use Skill -> 1% AP, 6 stacks 15% crit (6 stacks max)
    //     //if(e.code === 'CON') { ap *= 1.175; } //Kill Foe -> 2.5% AP (17.5% max)
    //     //if(e.code === 'CF')  { ap *= 1.20; }  //on counter -> 20% AP (duration?)
    //     if(e.code === 'CD')  { ap *= 1.16; }  //16% AP 25% (Reduced Healing)
    //     if(e.code === 'EP')  { ap *= 1.15; }  //On hit -> .5% AP 1% Def for 90s up to 30 stacks (orb CD 10s)
    //     if(e.code === 'IM')  { ap *= 1.18; }  //18% AP (-10% Atk Speed)
    // });

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

    return critRate;
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

    return cooldownReduction;
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

    return moveSpeed;
}

const computeBaseDmgEngrave = (data, selectedEngravings) => {
    var critRate = computeCritRateEngrave(data, selectedEngravings);
    var critDmg = computeCritDmgEngrave(data, selectedEngravings);
    var cdr = computeCdrEngrave(data, selectedEngravings);
    var moveSpeed = computeMoveSpeedEngrave(data, selectedEngravings);
    var atkSpeed = computeAtkSpeedEngrave(data, selectedEngravings);
    var ap = computeAttackPowerWithEngravings(data, selectedEngravings);

    // selectedEngravings.forEach(function (e) {
    //     if(e.code === 'ADR') { critRate = critRate + 0.15; } //Use Skill -> 1% AP, 6 stacks 15% crit (6 stacks max)
    //     if(e.code === 'KBW') { critDmg = critDmg + 0.50; }   //50% Crit Dmg (10% chance of -20% DMG)
    //     if(e.code === 'PD') {                               
    //         critDmg = critDmg - 0.12; //20% Crit, -12% Crit Dmg
    //         critRate = critRate + 0.2;
    //     }
    // });

    var baseDmgEngrave = normalizeCrit(ap, critRate, critDmg);
    baseDmgEngrave = normalizeCdr(baseDmgEngrave, cdr);

    selectedEngravings.forEach(function (e) {
        if(e.impl !== undefined && e.impl.dmg !== undefined) {
            ap = e.impl.dmg(baseDmgEngrave, moveSpeed, atkSpeed);
        }
    });
    
    // selectedEngravings.forEach(function (e) {
    //     if(e.code === 'ALL') { dmg *= 1.20; } //Holding or Casting -> 20% DMG
    //     if(e.code === 'AM')  { dmg *= 1.25; } //Back Attack -> 25% DMG
    //     if(e.code === 'BAR') { dmg *= 1.16; } //Shielded -> 16% DMG
    //     //if(e.code === 'DIS') { dmg *= 1.36; } //Enemy HP < 30% -> 36% DMG
    //     if(e.code === 'HM')  { dmg *= 1.16; } //Not head or back attack -> 16% DMG
    //     if(e.code === 'KBW') { dmg = (.9 * dmg) + (.1 * .8 * dmg); } //50% Crit Dmg (10% chance of -20% DMG)
    //     if(e.code === 'MEI') { dmg *= 1.12; } //MP < 50% -> 12% DMG (30% MP Regen)
    //     if(e.code === 'AM')  { dmg *= 1.25; } //Head/Frontal Attack -> 25% DMG
    //     if(e.code === 'MT')  { dmg *= 1.16; } //HP < 50% -> 16% DMG
    //     if(e.code === 'PRO') { dmg *= 1.16; } //Use spacebar -> 16% DMG (5s)
    //     if(e.code === 'RC')  { dmg *= (((data.moveSpeed - 1) * .45) + 1); } //45% of movement bonus as % DMG (140% Move Speed -> 18% DMG)
    //     if(e.code === 'SS') { dmg *= 1.16; } //HP > 80% -> 16% DMG
    //     if(e.code === 'SC') { dmg *= 1.20; } //Charge -> 20% DMG, 40% Charging Speed

    //     if(e.code === 'REF') { dmg *= 1.16; } // reflux
    //     if(e.code === 'MAY') { dmg *= 1.16; } // mayhem
    // });

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