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
          <Icon name="user-circle" size={50} color="#FF6600" />
        </TouchableOpacity>

        <TouchableOpacity onPress={this.goToChat} style={styles.chatIndex}>
          <Text style={styles.author}>{conversation.users[1].name}</Text>
          <Text style={styles.lastMessage}>
            {conversation.messages[conversation.messages.length - 1].message}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },

  author: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C2022"
  },

  lastMessage: {
    fontSize: 16,
    color: "#1C2022"
  },

  photo: {
    marginLeft: 20
  },

  chatIndex: {
    marginLeft: 25
  }
});

export default Conversation;
