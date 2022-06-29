import React from "react";
import { StyleSheet } from "react-native";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
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

  const removeEngraving = (option) => {
    let removed = props.selectedEngravings.filter(e => e.code !== option.code);
    props.setSelectedEngravings(removed);
  };

  const removeFromSibling = (selected) => {
    let removed = props.sibling.filter(e => !selected.includes(e));
    props.setSibling(removed);
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
                    onClick={(e) => { removeEngraving(option); e.stopPropagation(); }}/>
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

  var label = <div></div>;
  if(props.label !== undefined){
    label = <div style={styles.label}>{props.label}</div>;
  }

  var maxItems = 10; if(props.maxItems !== undefined) { maxItems = props.maxItems; }
  var numItems = props.selectedEngravings.length; if(props.numItems !== undefined) { numItems = props.numItems; }

  return (
    <div style={styles.wrapper}>
      {label}
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
            if (numItems < maxItems) {
              removeFromSibling(e.value);
              props.setSelectedEngravings(e.value); 
            }
          } 
        } 
        optionLabel="label"
        optionGroupLabel='label'
        placeholder="Select Engravings" 
        filter />  
    </div>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    //border: '1px solid cyan',
  },
  label: {
    //border: '1px solid cyan',
    display: 'flex',
    width: '320px',
    marginRight: '10px',
    alignItems: 'center',
    //alignContent: 'center',
    justifyContent: 'right',
  },
  engravingSelector: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px',
    borderRadius: '35px',
  }
});

export default EngravingSelector;