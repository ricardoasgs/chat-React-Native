import React, { Component } from "react";
import { connect } from "react-redux";
import socket from "../config/socket";
import {
  Keyboard,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

class InputBar extends Component {
  state = {
    text: "",
    emoji: false
  };

  sendMessage = () => {
    console.log("mandou mensagem");
    Keyboard.dismiss();
    const { userId, recipient } = this.props;
    const { text } = this.state;
    socket.emit("newMessage", userId, recipient._id, text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <View style={styles.inputBar}>
        <TouchableOpacity
          style={styles.emojiButton}
          onPress={() => this.setState({ emoji: true })}
        >
          <Icon name="smile-o" size={30} color="#FF6600" />
        </TouchableOpacity>
        <TextInput
          style={styles.textBox}
          placeholder="Digite aqui..."
          multiline={true}
          defaultHeight={50}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => this.sendMessage()}
        >
          <Ionicons name="md-send" size={35} color="#FF6600" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingBottom: 1,
    backgroundColor: "#FAFAFA"
  },

  textBox: {
    borderRadius: 5,
    borderColor: "gray",
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 15
  },

  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
    paddingRight: 18,
    borderRadius: 5,
    backgroundColor: "#FAFAFA"
  },
  emojiButton: {
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  userId: state.login.userId,
  recipient: state.chat.recipient,
  chat: state.chat.chat
});

export default connect(mapStateToProps)(InputBar);
