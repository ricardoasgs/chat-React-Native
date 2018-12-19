import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class InputBar extends Component {
  state = {
    text: "Teste"
  };

  render() {
    return (
      <View style={styles.inputBar}>
        <TextInput
          style={styles.textBox}
          multiline={true}
          defaultHeight={50}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <TouchableHighlight
          style={styles.sendButton}
          onPress={() => console.log("Teste")}
        >
          <Icon name="arrow-circle-right" size={42} color="#FF6600" />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingVertical: 1,
    backgroundColor: "#F1F0F3"
  },

  textBox: {
    borderRadius: 5,
    borderColor: "gray",
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10
  },

  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    marginLeft: 3,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: "#F1F0F3"
  }
});
