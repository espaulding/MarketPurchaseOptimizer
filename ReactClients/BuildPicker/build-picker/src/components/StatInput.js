import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text } from "react-native";

const StatInput = (props) => {
  const [number, onChangeNumber] = React.useState(props.value);

  return (
    <SafeAreaView>
      <Text style={styles.baseText}>{props.label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="enter value"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default StatInput;