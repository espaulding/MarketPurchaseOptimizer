import React from "react";
import { StyleSheet } from "react-native";
import NumberFormat from 'react-number-format';
import Table from 'react-bootstrap/Table'

import { 
  computeEffectiveHp, 
  computeDr,
  computeAttackPower,
  computeAdjustedAttackPower,
  computeAdjustedApEngravings
 } from '../calculations/Stats.js'

const ComputedStats = (props) => {

  const convertPercent = (number) => {
    return (number * 100).toFixed(2);
  }

  const characterData = props.data;
  var apAdjusted = computeAdjustedAttackPower(characterData);
  var apEngravings = computeAdjustedApEngravings(apAdjusted, props.selectedEngravings)

  return (
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
            <td style={styles.tableCellRight}>Effective HP (Physical)</td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'physical')}></NumberFormat></td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'physical')}></NumberFormat></td>
        </tr>
        <tr>
            <td style={styles.tableCellRight}>Damage Reduction (Physical)</td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'physical'))}></NumberFormat></td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'physical'))}></NumberFormat></td>
        </tr>
        <tr>
            <td style={styles.tableCellRight}>Effective HP (Magical)</td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'magical')}></NumberFormat></td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'magical')}></NumberFormat></td>
        </tr>
        <tr>
            <td style={styles.tableCellRight}>Damage Reduction (Magical)</td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'magical'))}></NumberFormat></td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'magical'))}></NumberFormat></td>
        </tr>

        <tr>
            <td style={styles.tableCellRight}>Attack Power</td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeAttackPower(characterData)}></NumberFormat></td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={computeAttackPower(characterData)}></NumberFormat></td>
        </tr>
        <tr>
            <td style={styles.tableCellRight}>Crit Normalized (AP)</td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={apAdjusted}></NumberFormat></td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} thousandSeparator={','} decimalScale={0} value={apEngravings}></NumberFormat></td>
        </tr>
        <tr>
            <td style={styles.tableCellRight}>DPS Gain (From Engravings)</td>
            <td style={styles.numberCell}></td>
            <td style={styles.numberCell}><NumberFormat className="stats" disabled={true} suffix={'%'} value={convertPercent((apEngravings/apAdjusted) - 1)}></NumberFormat></td>
        </tr>
      </tbody>
    </Table>
  );
};


const styles = StyleSheet.create({
  tableCellRight: {
      textAlign: 'right'
  },
  numberCell: {
    paddingTop: '13px',
  }
});

export default ComputedStats;