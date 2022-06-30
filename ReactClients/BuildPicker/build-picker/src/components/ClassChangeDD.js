import React from "react";
import { StyleSheet } from "react-native";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import subclassList from '../data/SubClasses';
import recommendations from '../data/Recommended.js';

const ClassChangeDD = (props) => {

  return (
    <div style={styles.panel}>
      <div style={styles.label}>{props.data.subclass.label}</div>
      <DropdownButton id="dropdown-basic-button" title="Change Class" variant="dark" menuVariant="dark">
        {
          Object
              .keys(subclassList)
              .map((name, index) => {
                  return (
                    <Dropdown.Item key={index} 
                      onClick={() => {
                        var subclass = subclassList[name];
                        props.data.setSubclass(subclass);
                        props.data.setLockedEngravings(recommendations[subclass.code].lockedEngravings);
                        props.data.setPossibleEngravings(recommendations[subclass.code].possibleEngravings);
                      }}>
                        {subclassList[name].label}
                    </Dropdown.Item>
                  );
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