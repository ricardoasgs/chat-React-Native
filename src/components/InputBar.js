import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateRoom } from "../actions/chatActions";
import socket from "../config/socket";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class InputBar extends Component {
  state = {
    text: ""
  };

  sendMessage = () => {
    const { userId, address } = this.props;
    const { text } = this.state;
    socket.emit("newMessage", userId, address._id, text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <View style={styles.inputBar}>
        <TextInput
          style={styles.textBox}
          placeholder="Digite aqui..."
          multiline={true}
          defaultHeight={50}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <TouchableHighlight
          style={styles.sendButton}
          onPress={() => this.sendMessage()}
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
    paddingBottom: 1,
    backgroundColor: "#FAFAFA"
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
    backgroundColor: "#FAFAFA"
  }
});

const mapStateToProps = state => ({
  userId: state.login.userId,
  address: state.chat.address,
  chat: state.chat.chat
});

export default connect(mapStateToProps)(InputBar);
