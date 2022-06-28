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
    height: '40px',
    paddingRight: '15px'
  },
  input: {
    height: 40,
    margin: 0,
    marginLeft: '12px',
    borderRadius: '20px',
    border: '1px solid cyan',
    padding: 10,
    boxSizing: 'border-box',
    color: 'cyan',
  },
  baseText: {
    paddingBottom: '14px',
    textAlign: 'right',
    color: 'white',
    minWidth: '120px',
    width: '120px',
    maxWidth: '120px',
  }
});

export default StatInput;