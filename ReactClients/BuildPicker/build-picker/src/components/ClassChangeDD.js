import React from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import subclassList from '../data/SubClasses';

const ClassChangeDD = (props) => {

  return (
    <DropdownButton id="dropdown-basic-button" title="Change Class" variant="dark" menuVariant="dark">
      {
        Object
            .keys(subclassList)
            .map((name, index) => {
                return (<Dropdown.Item onClick={() => {props.characterData.setSubclass(subclassList[name])}}>{subclassList[name].label}</Dropdown.Item>);
            })
      }
    </DropdownButton>
  );
};

export default ClassChangeDD;