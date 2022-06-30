import React from "react";
import { StyleSheet, TextInput, Text } from "react-native";

const StatInput = (props) => {

  return (
      <div style={styles.inputWrapper}>
        <div style={styles.baseText}>
          <Text style={styles.baseText}>{props.label}</Text>
        </div>
        <TextInput
          style={styles.input}
          onChangeText={props.setter}
          value={props.value}
          placeholder="enter value"
          keyboardType="numeric"
          maxLength={10}
        />
      </div>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'right',
    width: '100%',
    height: '30px',
    paddingRight: '15px',
  },
  input: {
    height: '30px',
    margin: 0,
    marginLeft: '12px',
    borderRadius: '20px',
    border: '1px solid #008b8b',
    padding: 10,
    boxSizing: 'border-box',
    color: 'cyan',
  },
  baseText: {
    paddingBottom: '14px',
    textAlign: 'right',
    color: 'white',
    minWidth: '140px',
    width: '140px',
    maxWidth: '140px',
  }
});

export default StatInput;