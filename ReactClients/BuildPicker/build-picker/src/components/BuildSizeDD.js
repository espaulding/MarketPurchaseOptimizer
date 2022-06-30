import React from "react";
import { StyleSheet } from "react-native";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const BuildSizeDD = (props) => {

  return (
    <div style={styles.panel}>
      <DropdownButton id="dropdown-basic-button" title={'Build for ' + props.buildLimit + ' Engravings'} variant="dark" menuVariant="dark">
        <Dropdown.Item key={2} onClick={() => { props.setBuildLimit(2); }}>2</Dropdown.Item>
        <Dropdown.Item key={3} onClick={() => { props.setBuildLimit(3); }}>3</Dropdown.Item>
        <Dropdown.Item key={4} onClick={() => { props.setBuildLimit(4); }}>4</Dropdown.Item>
        <Dropdown.Item key={5} onClick={() => { props.setBuildLimit(5); }}>5</Dropdown.Item>
        <Dropdown.Item key={6} onClick={() => { props.setBuildLimit(6); }}>6</Dropdown.Item>
        <Dropdown.Item key={7} onClick={() => { props.setBuildLimit(7); }}>7</Dropdown.Item>
        <Dropdown.Item key={8} onClick={() => { props.setBuildLimit(8); }}>8</Dropdown.Item>
        <Dropdown.Item key={9} onClick={() => { props.setBuildLimit(9); }}>9</Dropdown.Item>
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
      textAlign: 'center',
  },
  label: {
    paddingRight: '15px',
  },
});

export default BuildSizeDD;