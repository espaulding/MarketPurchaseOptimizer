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
    return data.hp / (1 - computeDr(data, t));
}

const computeAttackPower = (data) => {
    return Math.floor(Math.sqrt(data.atkStat * data.wpnDmg / 6));
}

const adjustedAttackPower = (data) => {
    var ap = computeAttackPower(data);
    return (data.critRate * data.critDmg * ap) + (1 - data.critRate) * ap;
}

export {computeDr, computeEffectiveHp, computeAttackPower, adjustedAttackPower};