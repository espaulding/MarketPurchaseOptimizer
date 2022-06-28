import React from "react";
import Stack from 'react-bootstrap/Stack'
import StatInput from './StatInput.js';

const CharacterInput = (props) => {

  var data = props.data;

  return (
    <div className="stat-input">
      <Stack gap={2}>
          <StatInput label={"HP"} value={data.hp} setter={data.setHp} />
          <StatInput label={"Physical Defense"} value={data.defensePhysical} setter={data.setDefensePhysical} />
          <StatInput label={"Magical Defense"} value={data.defenseMagical} setter={data.setDefenseMagical} />
          <StatInput label={"Weapon Damge"} value={data.wpnDmg} setter={data.setWpnDmg} />
          <StatInput label={data.subclass.stat} value={data.atkStat} setter={data.setAtkStat} />
          <StatInput label={"Crit Rate"} value={data.critRate} setter={data.setCritRate} />
          <StatInput label={"Crit Damage"} value={data.critDmg} setter={data.setCritDmg} />
          <StatInput label={"MP Regen"} value={data.mpRegen} setter={data.setMpRegen} />
          <StatInput label={"Movement Speed"} value={data.moveSpeed} setter={data.setMoveSpeed} />
      </Stack>                
    </div>
  );
};

export default CharacterInput;