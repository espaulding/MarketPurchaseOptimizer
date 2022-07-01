// cooldown = baseSkillCooldown * (1 - CDR(swiftness,gemLvl, tripod, ));

// dmgReductionMod = 6500 if attacker and target are same lvl (iLvl)???
// suspect that this number 6500 can grow if the attacker is higher level
// however it does now go lower than 6500 if the defender is higher level

// enemyDamageReduction = enemyDefense / (enemyDefense + dmgReductionMod)
// most bosses in the game are reportely around 60% DR

// coefficient observations
  // the coefficient grows as the skill levels up
  // seems to vary by skill

// AP = Attack Power (as seen on character sheet)
// ttDmg = damage number seen on skill tooltip
// with a change in in game AtkPower like removing a ring
// coef = (ttDmg1 - ttDmg2) / (AP1 - AP2)

// skillFlatDmg = ttDmg - (AP * coefficient)

// baseDmgHit = (AP * coefficient) + skillFlatDmg // assumed to match up with number in game on skill
// finalDmgHit = baseDmg * DmgPercent(engraving,cards,buffs,tripods) * (1 - enemyDamageReduction)

// baseDmg = ??? 
// base damage is a flat amount added to the skill's dmg and grows as the skill levels up
// it may also be effected by iLvl

const skills = [
  { 
      label: 'Sorceress', code: 'sorc',
      skills: [
          { // 0
              label: 'Blaze',
              tooltip: '',
              impl: {
                  dmg: (ap, lvl)  => { return ap * (lvl + 2); } 
              }
          },             
    
      ]
  },
];

export default skills;

/*

ah, this post has come alive again. I have been working on figuring out how the "tooltip damage" is calculated for the past couple of weeks. I used this post as a starting point. It was a great starting point but now I am ready to push the curtain back a bit more. Do I have it completely worked out? Not quite, changes in damage due to skill level are turning out the be a bit daunting. I do, however, have a grasp of the basics for skill level 1.
So, let's start with the basic damage equation from this post:

Damage = skill coefficient * attack + flat damage

D=S*AP+FD

so this is the basic equation for the base damage that is currently in use.
The data that I have gathered paints a slightly different picture.

For Skill level 1,

D=S(AP+C)

where S is the skill coefficient and C is a class tuning constant for all skills of the same advanced class. For Sorceress, C = 60. For Glaivier, C = 46.
S can be rewritten as well,

S= SM *(1+ST), where SM is the skill multiplier (usually a whole number) and ST is the skill tuning. For example, Punishing Strike has SM = 27 and ST = 0.33% (or 0.0033).

putting it together,

D= SM*(1+ST)*(AP+C)

Note: This is for just skills at level 1. my current working model for all levels is

D= SM*(1+ST)*sqrt(SK(L))*(AP+C(L))

where SK(L) is a multiplier based on skill level, SK(1) =1, SK(2) is approx. 1.2, SK(11) is approx 2.
C(L) is more complex as it changes by class and level. For Sorceress c(1) = 60, C(2) is between 97 and 98. C(10) is around 183 and C(11) is around 168.
A lot more data will need to be acquired to figure out the exact values based on skill level.

I am currently only testing on Sorceress and Glaivier. I have no intention of gathering data on every skill for every class.
Thought that I would add my analysis to this discussion.

*/