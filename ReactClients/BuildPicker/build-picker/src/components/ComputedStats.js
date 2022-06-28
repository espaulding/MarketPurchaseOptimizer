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
              <td style={styles.labelCell}>Effective HP (Physical)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'physical')}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHpWithEngravings(characterData, 'physical', props.selectedEngravings)}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Damage Reduction (Physical)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'physical'))}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDrWithEngravings(characterData, 'physical', props.selectedEngravings))}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Effective HP (Magical)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'magical')}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHpWithEngravings(characterData, 'magical', props.selectedEngravings)}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Damage Reduction (Magical)</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'magical'))}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDrWithEngravings(characterData, 'magical', props.selectedEngravings))}></NumberFormat></td>
          </tr>

          <tr>
              <td style={styles.labelCell}>Attack Power</td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeAttackPower(characterData)}></NumberFormat></td>
              <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeAttackPowerWithEngravings(characterData, props.selectedEngravings)}></NumberFormat></td>
          </tr>
          <tr>
              <td style={styles.labelCell}>Crit Normalized (AP)</td>
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
      paddingTop: '14px',
      paddingBottom: '10px',
      paddingLeft: '5px',
      paddingRight: '10px',
  },
  numberCell: {
    paddingTop: '13px',
  }
});

export default ComputedStats;