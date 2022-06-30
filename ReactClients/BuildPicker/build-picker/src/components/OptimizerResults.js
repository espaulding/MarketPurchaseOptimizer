import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import NumberFormat from 'react-number-format';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

import LostArkMath from '../calculations/Stats.js'

const OptimizerResults = (props) => {
  const init = [
    {
      dpsGain: (LostArkMath.computeBaseDmgEngrave(props.data, props.selectedEngravings) / LostArkMath.computeBaseDmg(props.data)) - 1,
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
          return <tr key={index} style={styles.resultRow}>
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
                    <span>{engravingToText(r.engravings)}</span>
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
      <div className="optimizer-result-table">
        <Table striped bordered variant="dark" size="sm">
          <thead>
            <tr>
              <td>DPS Gain</td>
              <td>Engravings</td>
              <td style={styles.numberCell}>Apply Build</td>
            </tr>
          </thead>
          <tbody>
            {renderResults()}
          </tbody>
        </Table>          
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  apply: {
    height: '30px',
    padding: '0',
  },
  resultRow: {
    //height: '33.5px',
    //maxHeight: '65.5px',
  },
  btnCell: {
    //height: '30px',
  },
  labelCell: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignContent: 'center',
      textAlign: 'left',
      paddingTop: '4px',
      paddingLeft: '5px',
      paddingRight: '10px',
  },
  numberCell: {
    textAlignVertical: 'middle',
    width: '100px',
    maxWidth: '210px',
  },
  inputCell: {
    width: '90px',
    minWidth: '90px',
    maxWidth: '200px',
  },
});

export default OptimizerResults;