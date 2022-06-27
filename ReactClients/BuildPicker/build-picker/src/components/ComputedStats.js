import React from "react";
import { StyleSheet } from "react-native";
import NumberFormat from 'react-number-format';
import Table from 'react-bootstrap/Table'

import { 
  computeEffectiveHp, 
  computeDr,
  computeAttackPower,
  adjustedAttackPower
 } from '../calculations/Stats.js'

const ComputedStats = (props) => {

  const convertPercent = (number) => {
    return (number * 100).toFixed(2);
  }

  const characterData = props.data;

  return (
    <Table striped bordered variant="dark" size="sm">
      <tbody>
        <tr>
            <td style={styles.tableCellRight}>Effective HP (Physical)</td>
            <td><NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'physical')}></NumberFormat></td>
        </tr>
        <tr>
            <td style={styles.tableCellRight}>Damage Reduction (Physical)</td>
            <td><NumberFormat disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'physical'))}></NumberFormat></td>
        </tr>
        <tr>
            <td style={styles.tableCellRight}>Effective HP (Magical)</td>
            <td><NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={computeEffectiveHp(characterData, 'magical')}></NumberFormat></td>
        </tr>
        <tr>
            <td style={styles.tableCellRight}>Damage Reduction (Magical)</td>
            <td><NumberFormat disabled={true} suffix={'%'} value={convertPercent(computeDr(characterData, 'magical'))}></NumberFormat></td>
        </tr>

        <tr>
            <td style={styles.tableCellRight}>Attack Power</td>
            <td><NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={computeAttackPower(characterData)}></NumberFormat></td>
        </tr>
        <tr>
            <td style={styles.tableCellRight}>Attack Power (Adjusted)</td>
            <td><NumberFormat disabled={true} thousandSeparator={','} decimalScale={0} value={adjustedAttackPower(characterData)}></NumberFormat></td>
        </tr>
      </tbody>
    </Table>
  );
};


const styles = StyleSheet.create({
  tableCellRight: {
      textAlign: 'right'
  }
});

export default ComputedStats;