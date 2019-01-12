import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { selectRoom } from "../actions/chatActions";

class Conversation extends Component {
  goToChat = () => {
    this.props.dispatch(
      selectRoom(this.props.conversation, () => this.props.navigate("Chat"))
    );
  };

  getLastMessageUser = () => {
    const { conversation } = this.props;
    const lastConversationIndex = conversation.messages.length - 1;
    return conversation.messages[lastConversationIndex].userId ==
      this.props.userId
      ? "Você"
      : conversation.users[1].name;
  };

  render() {
    const { conversation } = this.props;
    console.log(conversation);
    const lastConversationIndex = conversation.messages.length - 1;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}} style={styles.photo}>
          <Icon name="user-circle" size={50} color="#FF6600" />
        </TouchableOpacity>

        <TouchableOpacity onPress={this.goToChat} style={styles.chatIndex}>
          <Text style={styles.author}>{conversation.users[1].name}</Text>
          <Text style={styles.lastMessage}>
            {this.getLastMessageUser()} :{" "}
            {conversation.messages[lastConversationIndex].message}
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
    padding: 10,
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
    marginLeft: 10
  },

  chatIndex: {
    flex: 1,
    marginLeft: 15
  }
});

const mapStateToProps = state => ({
  token: state.login.token,
  userId: state.login.userId,
  toastMessage: state.toaster.message,
  chat: state.chat.chat
});

export default connect(mapStateToProps)(Conversation);
