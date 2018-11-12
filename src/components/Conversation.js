import React, { Component } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

class Conversation extends Component {
  goToChat = () => {
    this.props.navigate("Chat");
  };

  render() {
    const { conversation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}} style={styles.photo}>
          <Icon
            style={styles.userIcon}
            name="user-circle"
            size={50}
            color="#FF6600"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={this.goToChat} style={styles.chatIndex}>
          <Text style={styles.author}>{conversation.name}</Text>
          <Text style={styles.lastMessage}>{conversation.lastMessage}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },

  author: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1C2022"
  },

  lastMessage: {
    fontSize: 14,
    color: "#1C2022"
  },

  content: {
    fontSize: 15,
    lineHeight: 20,
    color: "#1C2022",
    marginVertical: 10
  },

  photo: {
    flexGrow: 1
  },

  chatIndex: {
    flexGrow: 3
  },

  userIcon: {
    marginLeft: 20
  }
});

export default Conversation;
