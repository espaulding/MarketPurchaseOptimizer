import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text } from "react-native";

const StatInput = (props) => {

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '301px',
    width: '301px',
    maxWidth: '301px',
  },
  input: {
    height: 40,
    margin: 12,
    border: '1px solid white',
    padding: 10,
    color: 'white'
  },
  baseText: {
    fontFamily: "Cochin",
    color: 'white',
    minWidth: '120px',
    width: '120px',
    maxWidth: '120px',
  }
});

export default StatInput;