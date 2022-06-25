import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text } from "react-native";

const StatInput = (props) => {
  const [number, onChangeNumber] = React.useState(props.value);

  return (
    <SafeAreaView>
      <div style={styles.inputWrapper}>
        <Text style={styles.baseText}>{props.label}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="enter value"
          keyboardType="numeric"
        />
      </div>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row'
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
    color: 'white'
  }
});

export default StatInput;