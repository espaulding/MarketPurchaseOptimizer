import React from "react";
import { StyleSheet } from "react-native";
import NumberFormat from 'react-number-format';
import Table from 'react-bootstrap/Table'

import { 
    computeDr, computeDrWithEngravings, computeDefWithEngravings,
    computeEffectiveHp, computeEffectiveHpWithEngravings, computeHpWithEngravings,
    computeMpWithEngravings, computeMpRegenWithEngravings,
    computeAttackPower, computeAttackPowerWithEngravings,
    computeCritRateEngrave, computeCritDmgEngrave,
    computeCdr, computeCdrEngrave, computeAtkSpeedEngrave, computeMoveSpeedEngrave,
    computeBaseDmg, computeBaseDmgEngrave
 } from '../calculations/Stats.js'

const ComputedStats = (props) => {

  const convertPercent = (number) => {
    return (number * 100).toFixed(2);
  }

  const characterData = props.data;
  var hp = +characterData.hp; if(isNaN(hp)) { hp = 0; }
  var hpEngrave = computeHpWithEngravings(characterData, props.selectedEngravings);
  var mp = +characterData.mp; if(isNaN(mp)) { mp = 0; }
  var mpEngrave = computeMpWithEngravings(characterData, props.selectedEngravings);
  var mpRegen = +characterData.mpRegen; if(isNaN(mpRegen)) { mpRegen = 0; }
  var mpRegenEngrave = computeMpRegenWithEngravings(characterData, props.selectedEngravings);
  var defensePhysical = +characterData.defensePhysical; if(isNaN(defensePhysical)) { defensePhysical = 0; }
  var physDefEngrave = computeDefWithEngravings(characterData, 'physical', props.selectedEngravings);
  var defenseMagical = +characterData.defenseMagical; if(isNaN(defenseMagical)) { defenseMagical = 0; }
  var magDefEngrave = computeDefWithEngravings(characterData, 'magical', props.selectedEngravings);
  var physDr = computeDr(characterData, 'physical');
  var magDr = computeDr(characterData, 'magical');
  var physDrEngrave = computeDrWithEngravings(characterData, 'physical', props.selectedEngravings);
  var magDrEngrave = computeDrWithEngravings(characterData, 'magical', props.selectedEngravings);
  var physEffectiveHp = computeEffectiveHp(characterData, 'physical');
  var magEffectiveHp = computeEffectiveHp(characterData, 'magical');
  var physEffectiveHpEngrave = computeEffectiveHpWithEngravings(characterData, 'physical', props.selectedEngravings);
  var magEffectiveHpEngrave = computeEffectiveHpWithEngravings(characterData, 'magical', props.selectedEngravings);
  var ap = computeAttackPower(characterData);
  var apEngrave = computeAttackPowerWithEngravings(characterData, props.selectedEngravings);
  var atkSpeed = +characterData.atkSpeed; if(isNaN(atkSpeed)) { atkSpeed = 1; }
  var atkSpeedEngrave = computeAtkSpeedEngrave(characterData, props.selectedEngravings);
  var moveSpeed = +characterData.moveSpeed; if(isNaN(moveSpeed)) { moveSpeed = 1; }
  var moveSpeedEngrave = computeMoveSpeedEngrave(characterData, props.selectedEngravings);
  var cdr = computeCdr(characterData);
  var cdrEngrave = computeCdrEngrave(characterData, props.selectedEngravings);
  var critRate = +characterData.critRate; if(isNaN(critRate)) { critRate = 0; }; if(critRate > 1) { critRate = 1; }
  var critRateEngrave = computeCritRateEngrave(characterData, props.selectedEngravings);
  var critDmg = +characterData.critDmg; if(isNaN(critDmg)) { critDmg = 2; }; if(critDmg > 6) { critDmg = 6; }
  var critDmgEngrave = computeCritDmgEngrave(characterData, props.selectedEngravings);
  var baseDmg = computeBaseDmg(characterData);
  var baseDmgEngrave = computeBaseDmgEngrave(characterData, props.selectedEngravings)

  return (
    <div className="stat-calc">
      <Table striped bordered variant="dark" size="sm">
        <thead>
          <tr>
            <td></td>
            <td>Base</td>
            <td>With Engravings</td>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td style={styles.labelCell}>MP Regen</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={mpRegen}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={mpRegenEngrave}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>HP/MP</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={hp}></NumberFormat>
                  (HP), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={mp}></NumberFormat>
                  (MP)
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={hpEngrave}></NumberFormat>
                  (HP), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={mpEngrave}></NumberFormat>
                  (MP)
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Effective HP (Physical)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={physEffectiveHp}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={physEffectiveHpEngrave}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Effective HP (Magical)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={magEffectiveHp}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={magEffectiveHpEngrave}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Defense</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={defensePhysical}></NumberFormat>
                  (Phys), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={defenseMagical}></NumberFormat>
                  (Mag)
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={physDefEngrave}></NumberFormat>
                  (Phys), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={magDefEngrave}></NumberFormat>
                  (Mag)
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Damage Reduction</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(physDr)}></NumberFormat>
                  (Phys), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(magDr)}></NumberFormat>
                  (Mag)
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(physDrEngrave)}></NumberFormat>
                  (Phys), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(magDrEngrave)}></NumberFormat>
                  (Mag)
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Critical (Rate/Dmg)</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(critRate)}></NumberFormat>
                  (Rate), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(critDmg)}></NumberFormat>
                  (Dmg)
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(critRateEngrave)}></NumberFormat>
                  (Rate), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(critDmgEngrave)}></NumberFormat>
                  (Dmg)
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Speed (Atk/Move)</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(atkSpeed)}></NumberFormat>
                  (Atk), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(moveSpeed)}></NumberFormat>
                  (Move)
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(atkSpeedEngrave)}></NumberFormat>
                  (Atk), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(moveSpeedEngrave)}></NumberFormat>
                  (Move)
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Cooldown Reduction</td>
              <td style={styles.numberCell}><NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(cdr)}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(cdrEngrave)}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Attack Power</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={ap}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={apEngrave}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Normalized (Base DMG)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={baseDmg}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={baseDmgEngrave}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>DPS Gain (From Engravings)</td>
              <td colSpan={2} style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} prefix={'+'} suffix={'%'} value={convertPercent((baseDmgEngrave/baseDmg) - 1)}></NumberFormat></td>
          </tr>
        </tbody>
      </Table>          
    </div>
  );
};


const styles = StyleSheet.create({
  labelCell: {
      display: 'flex',
      justifyContent: 'right',
      minWidth: '225px',
      paddingTop: '10px',
      paddingBottom: '7px',
      paddingLeft: '5px',
      paddingRight: '10px',
  },
  numberCell: {
    paddingTop: '6px',
  },
  doubleCell: {
    width: '250px',
  },
  inputCell: {
    width: '70px',
    paddingBottom: '3px',
  },
});

export default ComputedStats;