import React from 'react';
import { StyleSheet } from "react-native";
import NumberFormat from 'react-number-format';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';

import LostArkMath from '../calculations/Stats.js'

const OptimizerResults = (props) => {
  var baseDmg = LostArkMath.computeBaseDmg(props.data);
  var baseDmgEngrave = LostArkMath.computeBaseDmgEngrave(props.data, props.selectedEngravings);
  const init = [
    {
      dpsGainExpected: (baseDmgEngrave.expected / baseDmg) - 1,
      dpsGainMaximum: (baseDmgEngrave.maximum / baseDmg) - 1,
      difficulty: baseDmgEngrave.difficulty,
      engravings: props.selectedEngravings
    }
  ];

  const convertPercent = (number) => {
    return (number * 100).toFixed(2);
  };

  const engravingToText = (engravings) => {
    return engravings.map((e) => { return e.label; }).join(', ');
  };

  var columns = [
    {dataField: 'difficulty', text: 'Challenge', sort: true, sortValue: (cell, row) => { return +row.difficulty; } },
    {dataField: 'dpsGainExpected', text: '+Dps', sort: true, sortValue: (cell, row) => { return +row.dpsGainExpectedSort; } },
    {dataField: 'dpsGainMaximum', text: 'Max +Dps', sort: true, sortValue: (cell, row) => { return +row.dpsGainMaximumSort; } },
    {dataField: 'strEngravings', text: 'Engravings'},
    {dataField: 'link', text: 'Apply Build'}
  ];
  var tableData = [];

  var results = init;
  if(props.optimizerResults.length > 0) { results = props.optimizerResults; }
  
  results.map(
    (r, index) => {
      tableData.push(
        {
          key: index,
          difficulty: r.difficulty,
          dpsGainExpectedSort: r.dpsGainExpected,
          dpsGainExpected: <div style={styles.numberCell}><NumberFormat 
                            style={styles.inputCell}
                            className="stats" 
                            disabled={true} 
                            thousandSeparator={','} 
                            prefix={'+'} 
                            suffix={'%'} 
                            value={convertPercent(r.dpsGainExpected)}/></div>,
          dpsGainMaximumSort: r.dpsGainMaximum,                            
          dpsGainMaximum: <div style={styles.numberCell}><NumberFormat 
                            style={styles.inputCell}
                            className="stats" 
                            disabled={true} 
                            thousandSeparator={','} 
                            prefix={'+'} 
                            suffix={'%'} 
                            value={convertPercent(r.dpsGainMaximum)}/></div>,
          strEngravings: <div style={styles.labelCell}>{engravingToText(r.engravings)}</div>,
          link: <div style={styles.btnCell}><Button 
                  style={styles.apply} 
                  variant="link" 
                  onClick={() => { 
                    props.setSelectedEngravings(r.engravings);
                    document.querySelector("[data-rr-ui-event-key='BuildExplorer']").click();
                  }}>
                    Apply</Button></div>
        }
      );
    }
  );

  return (
    <div className="stat-calc">
      <div className="optimizer-result-table">
        <BootstrapTable 
            bootstrap4 condensed
            bordered={false} 
            keyField='key' data={ tableData } columns={ columns } 
            sort={ {
              dataField: 'dpsGainExpected',
              order: 'desc'
            } } />
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
  },
  btnCell: {
  },
  labelCell: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignContent: 'center',
      fontSize: '12px',
      height: '31.5px',
      textAlign: 'left',
      paddingTop: '6px',
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