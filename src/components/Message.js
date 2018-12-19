import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class Message extends Component {
  render() {
    var leftSpacer =
      this.props.direction === "left" ? null : <View style={{ width: 70 }} />;
    var rightSpacer =
      this.props.direction === "left" ? <View style={{ width: 70 }} /> : null;

    var bubbleStyles =
      this.props.direction === "left"
        ? [styles.messageBubble, styles.messageBubbleLeft]
        : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle =
      this.props.direction === "left"
        ? styles.messageBubbleTextLeft
        : styles.messageBubbleTextRight;

    return (
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        {leftSpacer}
        <View style={bubbleStyles}>
          <Text style={bubbleTextStyle}>{this.props.text}</Text>
        </View>
        {rightSpacer}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageBubble: {
    flex: 1,
    borderRadius: 5,
    marginTop: 8,
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    minHeight: 50
  },

  messageBubbleLeft: {
    backgroundColor: "#d5d8d4"
  },

  messageBubbleTextLeft: {
    color: "black",
    fontSize: 17
  },

  messageBubbleRight: {
    backgroundColor: "#FF6600"
  },

  messageBubbleTextRight: {
    color: "white",
    fontSize: 17
  }
});
