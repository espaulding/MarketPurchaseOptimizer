import React from "react";
import { StyleSheet } from "react-native";
import NumberFormat from 'react-number-format';
import Table from 'react-bootstrap/Table'

import { 
  computeEffectiveHp, 
  computeDr,
  computeAttackPower,
  computeAdjustedAttackPower,
  computeDrWithEngravings,
  computeEffectiveHpWithEngravings,
  computeAttackPowerWithEngravings,
  computeAdjustedApEngravings
 } from '../calculations/Stats.js'

const ComputedStats = (props) => {

  const convertPercent = (number) => {
    return (number * 100).toFixed(2);
  }

  const characterData = props.data;
  var apAdjusted = computeAdjustedAttackPower(characterData);
  var apEngravings = computeAdjustedApEngravings(characterData, props.selectedEngravings)

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
              <td style={styles.labelCell}>HP/MP</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={characterData.hp}></NumberFormat>
                  (HP), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={characterData.mp}></NumberFormat>
                  (MP)
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={characterData.hp}></NumberFormat>
                  (HP), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={characterData.mp}></NumberFormat>
                  (MP)
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>MP Regen</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={characterData.mpRegen}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={characterData.mpRegen}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Effective HP (Physical)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'physical')}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHpWithEngravings(characterData, 'physical', props.selectedEngravings)}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Effective HP (Magical)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'magical')}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHpWithEngravings(characterData, 'magical', props.selectedEngravings)}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Speed (Atk/Move)</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(characterData.atkSpeed)}></NumberFormat>
                  (Atk), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(characterData.moveSpeed)}></NumberFormat>
                  (Move)
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(characterData.atkSpeed)}></NumberFormat>
                  (Atk), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(characterData.moveSpeed)}></NumberFormat>
                  (Move)
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Damage Reduction</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'physical'))}></NumberFormat>
                  (Phys), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'magical'))}></NumberFormat>
                  (Mag)
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDrWithEngravings(characterData, 'physical', props.selectedEngravings))}></NumberFormat>
                  (Phys), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDrWithEngravings(characterData, 'magical', props.selectedEngravings))}></NumberFormat>
                  (Mag)
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Criticals (Rate/Dmg)</td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(characterData.critRate)}></NumberFormat>
                  (Rate), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(characterData.critDmg)}></NumberFormat>
                  (Dmg)
                </div>
              </td>
              <td style={styles.numberCell}>
                <div className="stats" style={styles.doubleCell}>
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(characterData.critRate)}></NumberFormat>
                  (Rate), 
                  <NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(characterData.critDmg)}></NumberFormat>
                  (Dmg)
                </div>
              </td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Cooldown Reduction</td>
              <td style={styles.numberCell}><NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(characterData.cdr)}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat style={styles.inputCell} className="stats" disabled={true} suffix={'%'} value={convertPercent(characterData.cdr)}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Attack Power</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeAttackPower(characterData)}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeAttackPowerWithEngravings(characterData, props.selectedEngravings)}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Normalized (Base DMG)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={apAdjusted}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={apEngravings}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>DPS Gain (From Engravings)</td>
              <td colspan={2} style={styles.numberCell}><NumberFormat className="stats" disabled={true} suffix={'%'} value={convertPercent((apEngravings/apAdjusted) - 1)}></NumberFormat></td>
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