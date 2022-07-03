import React from "react";
import { StyleSheet } from "react-native";
import NumberFormat from 'react-number-format';
import Table from 'react-bootstrap/Table'

import LostArkMath from '../calculations/Stats.js'

const ComputedStats = (props) => {

  const convertPercent = (number) => {
    return (number * 100).toFixed(2);
  }

  const characterData = props.data;
  const selectedEngravings = props.data.selectedEngravings;
  var mp = LostArkMath.computeMp(characterData);
  var mpEngrave = LostArkMath.computeMpWithEngravings(characterData, selectedEngravings);
  var mpRegen = LostArkMath.computeMpRegen(characterData);
  var mpRegenEngrave = LostArkMath.computeMpRegenWithEngravings(characterData, selectedEngravings);

  var hp = LostArkMath.computeHp(characterData);
  var hpEngrave = LostArkMath.computeHpWithEngravings(characterData, selectedEngravings);
  var defensePhysical = LostArkMath.computeDef(characterData, 'physical');
  var physDefEngrave = LostArkMath.computeDefWithEngravings(characterData, 'physical', selectedEngravings);
  var defenseMagical = LostArkMath.computeDef(characterData, 'magical');
  var magDefEngrave = LostArkMath.computeDefWithEngravings(characterData, 'magical', selectedEngravings);
  var physDr = LostArkMath.computeDr(characterData, 'physical');
  var physDrEngrave = LostArkMath.computeDrWithEngravings(characterData, 'physical', selectedEngravings);
  var magDr = LostArkMath.computeDr(characterData, 'magical');
  var magDrEngrave = LostArkMath.computeDrWithEngravings(characterData, 'magical', selectedEngravings);
  var physEffectiveHp = LostArkMath.computeEffectiveHp(characterData, 'physical');
  var magEffectiveHp = LostArkMath.computeEffectiveHp(characterData, 'magical');
  var physEffectiveHpEngrave = LostArkMath.computeEffectiveHpWithEngravings(characterData, 'physical', selectedEngravings);
  var magEffectiveHpEngrave = LostArkMath.computeEffectiveHpWithEngravings(characterData, 'magical', selectedEngravings);

  var atkSpeed = LostArkMath.computeAtkSpeed(characterData);
  var atkSpeedEngrave = LostArkMath.computeAtkSpeedEngrave(characterData, selectedEngravings);
  var moveSpeed = LostArkMath.computeMoveSpeed(characterData);
  var moveSpeedEngrave = LostArkMath.computeMoveSpeedEngrave(characterData, selectedEngravings);
  var cdr = LostArkMath.computeCdr(characterData);
  var cdrEngrave = LostArkMath.computeCdrEngrave(characterData, selectedEngravings);
  var critRate = LostArkMath.computeCritRate(characterData);
  var critRateEngrave = LostArkMath.computeCritRateEngrave(characterData, selectedEngravings);
  var critDmg = LostArkMath.computeCritDmg(characterData);
  var critDmgEngrave = LostArkMath.computeCritDmgEngrave(characterData, selectedEngravings);

  var ap = LostArkMath.computeAttackPower(characterData);
  var apEngrave = LostArkMath.computeAttackPowerWithEngravings(characterData, selectedEngravings);
  var baseDmg = LostArkMath.computeBaseDmg(characterData);
  var baseDmgEngrave = LostArkMath.computeBaseDmgEngrave(characterData, selectedEngravings)

  var dpsGainExpected = (baseDmgEngrave.expected/baseDmg) - 1;
  var dpsGainMaximum = (baseDmgEngrave.maximum/baseDmg) - 1;
  var buildDifficulty = baseDmgEngrave.difficulty;

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
              <td style={styles.labelCell}>MP</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={mpRegen}></NumberFormat>
                    (MP/s),
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={mp}></NumberFormat>
                    (MP)
                  </div>
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={mpRegenEngrave.maximum}></NumberFormat>
                    (MP/s),
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={mpEngrave.maximum}></NumberFormat>
                    (MP)
                  </div>
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>HP</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={hp}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={hpEngrave.maximum}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Effective HP (Physical)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={physEffectiveHp}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={physEffectiveHpEngrave.maximum}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Effective HP (Magical)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={magEffectiveHp}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={magEffectiveHpEngrave.maximum}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Defense</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={defensePhysical}></NumberFormat>
                    (Phys), 
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={defenseMagical}></NumberFormat>
                    (Mag)
                  </div>
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={physDefEngrave.maximum}></NumberFormat>
                    (Phys), 
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={magDefEngrave.maximum}></NumberFormat>
                    (Mag)
                  </div>
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Damage Reduction</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(physDr)}></NumberFormat>
                    (Phys), 
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(magDr)}></NumberFormat>
                    (Mag)
                  </div>
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(physDrEngrave.maximum)}></NumberFormat>
                    (Phys), 
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(magDrEngrave.maximum)}></NumberFormat>
                    (Mag)
                  </div>
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Critical (Rate/Dmg)</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(critRate)}></NumberFormat>
                    (Rate), 
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(critDmg)}></NumberFormat>
                    (Dmg)
                  </div>
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(critRateEngrave.maximum)}></NumberFormat>
                    (Rate), 
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(critDmgEngrave.maximum)}></NumberFormat>
                    (Dmg)
                  </div>
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Speed (Atk/Move)</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(atkSpeed)}></NumberFormat>
                    (Atk), 
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(moveSpeed)}></NumberFormat>
                    (Move)
                  </div>
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(atkSpeedEngrave.maximum)}></NumberFormat>
                    (Atk), 
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(moveSpeedEngrave.maximum)}></NumberFormat>
                    (Move)
                  </div>
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Cooldown Reduction</td>
              <td style={styles.numberCell}><NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(cdr)}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(cdrEngrave.maximum)}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Attack Power</td>
              <td style={styles.numberCell}><NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={ap}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={apEngrave.maximum}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Normalized (Base DMG)</td>
              <td style={styles.numberCell}><NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={baseDmg}></NumberFormat></td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={baseDmgEngrave.expected}></NumberFormat>
                    (Expected), 
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={baseDmgEngrave.maximum}></NumberFormat>
                    (Maximum)
                  </div>
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>DPS Gain (Expected/Maximum)</td>
              <td colSpan={2} style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} prefix={'+'} suffix={'%'} value={convertPercent(dpsGainExpected)}></NumberFormat>
                    (Expected), 
                  </div>
                  <div>
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} prefix={'+'} suffix={'%'} value={convertPercent(dpsGainMaximum)}></NumberFormat>
                    <span>(Maximum),&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <div>
                      Build Challenge:
                    <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={buildDifficulty}></NumberFormat>
                  </div>
                </div>
              </td>
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
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  inputCell: {
    width: '85px',
    paddingBottom: '3px',
  },
});

export default ComputedStats;