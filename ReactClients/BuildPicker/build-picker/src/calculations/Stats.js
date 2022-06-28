 // t -> type of defense
// physical or magical
const computeDr = (data, t) => {
  var classDef = 0;
  if (t === 'physical') { classDef = data.defensePhysical }
  if (t === 'magical') { classDef = data.defenseMagical }
  return classDef / (classDef + 6500);
}

// t -> type of defense
// physical or magical
const computeEffectiveHp = (data, t) => {
    var cards1 = .12;
    var cards2 = .16;
    var fort = .3;
    var HP = data.hp;
    var DR = (1 - computeDr(data, t))

    //DR = DR * (1 - cards1) * (1- cards2);
    //DR = DR * (1 - fort);

    //add in mayhem
    //HP = HP * .25;
    //DR = DR * (1 - .65);

    return (HP) / DR;
}

const computeAttackPower = (data) => {
    return Math.floor(Math.sqrt(data.atkStat * data.wpnDmg / 6));
}

const computeAdjustedAttackPower = (data) => {
    var ap = computeAttackPower(data);
    return (data.critRate * data.critDmg * ap) + (1 - data.critRate) * ap;
}

const computeAdjustedApEngravings = (ap, selectedEngravings) => {
    return ap;
};

export {computeDr, computeEffectiveHp, computeAttackPower, computeAdjustedAttackPower, computeAdjustedApEngravings};