import React from "react";
import { StyleSheet } from "react-native";

import { MultiSelect } from 'primereact/multiselect';

import engravings from '../data/Engravings.js';

const EngravingSelector = (props) => {

  const panelFooterTemplate = () => {
    const selectedItems = props.selectedEngravings;
    const length = selectedItems ? selectedItems.length : 0;
    return (
        <div className="py-2 px-3">
            <b>{length}</b> engraving{length > 1 ? 's' : ''} selected.
        </div>
    );
  };

  const selectedEngravingTemplate = (option) => {
    if (option) {
        return (
            <div className="engraving engraving-value">
                <div title={option.tooltip}>{option.label}</div>
            </div>
        );
    }
  
    return "Select Engravings";
  };
  
  const groupedItemTemplate = (option) => {
    return (
        <div className="flex align-items-center engraving">
            <div>{option.label}</div>
        </div>
    );
  }
  
  const engravingTemplate = (option) => {
    return (
        <div className="engraving">
            <div>{option.label}</div>
        </div>
    );
  };

  return (
    <MultiSelect 
      style={styles.engravingSelector}
      className="multiselect-custom"
      options={engravings} 
      itemTemplate={engravingTemplate}
      optionGroupTemplate={groupedItemTemplate}
      optionGroupChildren="items"
      selectedItemTemplate={selectedEngravingTemplate}
      panelFooterTemplate={panelFooterTemplate}
      value={props.selectedEngravings} 
      onChange={ (e) => props.setSelectedEngravings(e.value) } 
      optionLabel="label"
      optionGroupLabel='label'
      placeholder="Select Engravings" 
      filter />
  );
};

const styles = StyleSheet.create({
  engravingSelector: {
    width: '80%'
  }
});

export default EngravingSelector;