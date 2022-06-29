import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import NumberFormat from 'react-number-format';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

import { computeBaseDmg, computeBaseDmgEngrave } from '../calculations/Stats.js';

const OptimizerResults = (props) => {
  const init = [
    {
      dpsGain: (computeBaseDmgEngrave(props.data, props.selectedEngravings)/computeBaseDmg(props.data)) - 1,
      engravings: props.selectedEngravings
    }
  ];

  const convertPercent = (number) => {
    return (number * 100).toFixed(2);
  };

  const engravingToText = (engravings) => {
    return engravings.map((e) => { return e.label; }).join(', ');
  };

  const renderResults = () => {
    var results = init;
    if(props.optimizerResults.length > 0) { results = props.optimizerResults; }

    return(
      results.map(
        (r, index) => {
          return <tr key={index}>
                  <td style={styles.numberCell}>
                    <NumberFormat 
                      style={styles.inputCell}
                      className="stats" 
                      disabled={true} 
                      thousandSeparator={','} 
                      prefix={'+'} 
                      suffix={'%'} 
                      value={convertPercent(r.dpsGain)}/>
                  </td>
                  <td style={styles.labelCell}>
                    {engravingToText(r.engravings)}
                  </td>
                  <td style={styles.btnCell}>
                    <Button 
                      style={styles.apply} 
                      variant="link" 
                      onClick={() => { 
                        props.setSelectedEngravings(r.engravings);
                        document.querySelector("[data-rr-ui-event-key='BuildExplorer']").click();
                      }}>
                        Apply</Button>
                  </td>
                </tr>
        }
      )
    );
  };

  return (
    <div className="stat-calc">
      <Table striped bordered variant="dark" size="sm">
        <thead>
          <tr>
            <td>DPS Gain</td>
            <td>Engravings</td>
            <td>Apply Build</td>
          </tr>
        </thead>
        <tbody>
          {renderResults()}
        </tbody>
      </Table>          
    </div>
  );
}

const styles = StyleSheet.create({
  apply: {
    height: '30px',
    padding: '0',
  },
  btnCell: {
    height: '30px',
  },
  labelCell: {
      display: 'flex',
      justifyContent: 'right',
      minWidth: '500x',
      height: '32px',
      paddingTop: '4px',
      //paddingBottom: '7px',
      paddingLeft: '5px',
      paddingRight: '10px',
  },
  numberCell: {
    //paddingTop: '10px',
    width: '100px',
    height: '30px',
    minWidth: '100px',
    maxWidth: '210px',
  },
  inputCell: {
    width: '90px',
    minWidth: '90px',
    maxWidth: '200px',
    //paddingBottom: '3px',
  },
});

export default OptimizerResults;