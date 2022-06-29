import React from "react";
import { StyleSheet } from "react-native";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import PopoverBody from 'react-bootstrap/PopoverBody';
import PopoverHeader from 'react-bootstrap/PopoverHeader';

import { MultiSelect } from 'primereact/multiselect';

import engravings from '../data/Engravings.js';
import { Popover } from "bootstrap";

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

  const removeEngraving = (option) => {
    let removed = props.selectedEngravings.filter(e => e.code !== option.code);
    props.setSelectedEngravings(removed);
  };

  const selectedEngravingTemplate = (option) => {
    if (option) {
        return (
            <OverlayTrigger 
              placement="bottom" 
              overlay={<Tooltip id="engraving-tooltip">{option.tooltip}</Tooltip>} 
              delay={{ show: 350, hide: 350 }}>
                <div className="engraving engraving-value">
                  {option.label} 
                  <button 
                    className="selected-engraving-remove p-multiselect-close-icon pi pi-times" 
                    onClick={()=>{ removeEngraving(option); }}/>
                </div>
            </OverlayTrigger>
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
      <OverlayTrigger 
        placement="right" 
        overlay={<Tooltip id="engraving-tooltip">{option.tooltip}</Tooltip>} 
        delay={{ show: 350, hide: 350 }}
      >
        <div className="engraving">
            <div>{option.label}</div>
        </div>
      </OverlayTrigger>  
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
      onChange={ (e) => { 
          if (props.selectedEngravings.length < 10) {
            props.setSelectedEngravings(e.value); 
          }
        } 
      } 
      optionLabel="label"
      optionGroupLabel='label'
      placeholder="Select Engravings" 
      filter />
  );
};

const styles = StyleSheet.create({
  engravingSelector: {
    width: '100%'
  }
});

export default EngravingSelector;