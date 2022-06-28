import React from "react";
import { StyleSheet } from "react-native";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import subclassList from '../data/SubClasses';

const ClassChangeDD = (props) => {

  return (
    <div style={styles.panel}>
      <div style={styles.label}> | {props.data.subclass.label} | </div>
      <DropdownButton id="dropdown-basic-button" title="Change Class" variant="dark" menuVariant="dark">
        {
          Object
              .keys(subclassList)
              .map((name, index) => {
                  return (<Dropdown.Item onClick={() => {props.data.setSubclass(subclassList[name])}}>{subclassList[name].label}</Dropdown.Item>);
              })
        }
      </DropdownButton>
      
    </div>
    
  );
};

const styles = StyleSheet.create({
  panel: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center'
  },
  label: {
    paddingRight: '15px'
  }
});

export default ClassChangeDD;