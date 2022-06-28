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
const computeDrWithEngravings = (data, t, selectedEngravings) => {
    var classDef = 0;
    if (t === 'physical') { classDef = data.defensePhysical }
    if (t === 'magical') { classDef = data.defenseMagical }

    selectedEngravings.forEach(function (e) {
        if(e.code === 'EP')  { classDef *= 1.3; }  //On hit -> .5% AP 1% Def for 90s up to 30 stacks (orb CD 10s)
        if(e.code === 'HA')  { classDef *= 2; }  //100% defense
    });

    var DR = classDef / (classDef + 6500);

    selectedEngravings.forEach(function (e) {
        if(e.code === 'GRU') { DR = 1 - (1 - DR) * 1.2; } //20% DMG (20% more dmg taken)
        if(e.code === 'FOR') { DR = 1 - (1 - DR) * .7; }  //Low HP -> 30% DR
        if(e.code === 'MAY') { DR = 1 - (1 - DR) * .35; } // Mayhem 65% DR
    });

    return DR;
  }

// t -> type of defense
// physical or magical
const computeEffectiveHp = (data, t) => {
    var HP = data.hp;
    var DR = (1 - computeDr(data, t))
    return (HP) / DR;
}

// t -> type of defense
// physical or magical
const computeEffectiveHpWithEngravings = (data, t, selectedEngravings) => {
    var HP = data.hp;
    var DR = (1 - computeDrWithEngravings(data, t, selectedEngravings))

    selectedEngravings.forEach(function (e) {
        if(e.code === 'MAY') { HP *= .25 } // Mayhem 25% HP
    });

    return (HP) / DR;
}

const computeAttackPower = (data) => {
    return Math.floor(Math.sqrt(data.atkStat * data.wpnDmg / 6));
}

const computeAttackPowerWithEngravings = (data, selectedEngravings) => {
    var atkStat = data.atkStat;
    var wpnDmg = data.wpnDmg;
    var ap = Math.floor(Math.sqrt(atkStat * wpnDmg / 6));

    selectedEngravings.forEach(function (e) {
        if(e.code === 'ADR') { ap *= 1.06; }  //Use Skill -> 1% AP, 6 stacks 15% crit (6 stacks max)
        //if(e.code === 'CON') { ap *= 1.175; } //Kill Foe -> 2.5% AP (17.5% max)
        //if(e.code === 'CF')  { ap *= 1.20; }  //on counter -> 20% AP (duration?)
        if(e.code === 'CD')  { ap *= 1.16; }  //16% AP 25% (Reduced Healing)
        if(e.code === 'EP')  { ap *= 1.15; }  //On hit -> .5% AP 1% Def for 90s up to 30 stacks (orb CD 10s)
        if(e.code === 'IM')  { ap *= 1.18; }  //18% AP (-10% Atk Speed)
    });

    return ap;
}

const computeAdjustedAttackPower = (data) => {
    var ap = computeAttackPower(data);
    return (data.critRate * data.critDmg * ap) + (1 - data.critRate) * ap;
}

const computeAdjustedApEngravings = (data, selectedEngravings) => {
    var critRate = data.critRate;
    var critDmg = data.critDmg;
    var ap = computeAttackPowerWithEngravings(data, selectedEngravings);

    selectedEngravings.forEach(function (e) {
        if(e.code === 'ADR') { critRate = critRate + 0.15; } //Use Skill -> 1% AP, 6 stacks 15% crit (6 stacks max)
        if(e.code === 'KBW') { critDmg = critDmg + 0.50; }   //50% Crit Dmg (10% chance of -20% DMG)
        if(e.code === 'PD') {                               
            critDmg = critDmg - 0.12; //20% Crit, -12% Crit Dmg
            critRate = critRate + 0.2;
        }
    });

    var dmg = (critRate * critDmg * ap) + (1 - critRate) * ap;
    
    selectedEngravings.forEach(function (e) {
        if(e.code === 'ALL') { dmg *= 1.20; } //Holding or Casting -> 20% DMG
        if(e.code === 'AM')  { dmg *= 1.25; } //Back Attack -> 25% DMG
        if(e.code === 'BAR') { dmg *= 1.16; } //Shielded -> 16% DMG
        //if(e.code === 'DIS') { dmg *= 1.36; } //Enemy HP < 30% -> 36% DMG
        if(e.code === 'HM')  { dmg *= 1.16; } //Not head or back attack -> 16% DMG
        if(e.code === 'KBW') { dmg = (.9 * dmg) + (.1 * .8 * dmg); } //50% Crit Dmg (10% chance of -20% DMG)
        if(e.code === 'MEI') { dmg *= 1.12; } //MP < 50% -> 12% DMG (30% MP Regen)
        if(e.code === 'AM')  { dmg *= 1.25; } //Head/Frontal Attack -> 25% DMG
        if(e.code === 'MT')  { dmg *= 1.16; } //HP < 50% -> 16% DMG
        if(e.code === 'PRO') { dmg *= 1.16; } //Use spacebar -> 16% DMG (5s)
        if(e.code === 'RC')  { dmg *= (((data.moveSpeed - 1) * .45) + 1); } //45% of movement bonus as % DMG (140% Move Speed -> 18% DMG)
        if(e.code === 'SS') { dmg *= 1.16; } //HP > 80% -> 16% DMG
        if(e.code === 'SC') { dmg *= 1.20; } //Charge -> 20% DMG, 40% Charging Speed

        if(e.code === 'REF') { dmg *= 1.16; } // reflux
        if(e.code === 'MAY') { dmg *= 1.16; } // mayhem
    });

    return dmg;
};

export {computeDr, computeEffectiveHp, computeAttackPower, computeAdjustedAttackPower,
        computeDrWithEngravings, computeEffectiveHpWithEngravings, computeAttackPowerWithEngravings, computeAdjustedApEngravings};