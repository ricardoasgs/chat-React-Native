import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList
} from "react-native";

import { selectRecipient, updateRoom } from "../actions/chatActions";
import socket from "../config/socket";
import Icon from "react-native-vector-icons/FontAwesome";
import InputBar from "../components/InputBar";
import Message from "../components/Message";
import ChatHeaderTitle from "../components/ChatHeaderTitle";

class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <ChatHeaderTitle />,
    headerStyle: {
      backgroundColor: "#FF6600"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerRight: (
      <TouchableOpacity onPress={() => {}}>
        <Icon
          style={{ marginRight: 15 }}
          name="ellipsis-h"
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
    )
  });

  state = {
    messages: []
  };

  getRecipient = () => {
    const { chat } = this.props;
    const { userId } = this.props;
    if (chat.users[0]._id === userId) {
      this.props.dispatch(selectRecipient(chat.users[1]));
    } else {
      this.props.dispatch(selectRecipient(chat.users[0]));
    }
  };

  componentDidMount() {
    this.getRecipient();
    this.subscribeToEvents();
    this.setState({ messages: this.props.chat.messages.reverse() });
  }

  subscribeToEvents = () => {
    socket.on("newMessage", data => {
      const { messages } = this.state;
      newMessages = messages.reverse();
      newMessages.push(data);
      newMessages = newMessages.reverse();
      this.setState({ messages: newMessages });
    });
  };

  render() {
    const { userId } = this.props;
    const { messages } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="heigth">
        <View style={styles.viewContainer}>
          <FlatList
            inverted
            style={styles.messagesContainer}
            initialNumToRender={9}
            data={messages}
            keyExtractor={message => message._id}
            renderItem={({ item }) => {
              return item.userId != userId ? (
                <Message direction="left" text={item.message} />
              ) : (
                <Message direction="right" text={item.message} />
              );
            }}
          />
          <View>
            <InputBar />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0F3"
  },
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  messagesContainer: {
    paddingVertical: 0
  }
});

const mapStateToProps = state => ({
  chat: state.chat.chat,
  userId: state.login.userId
});

export default connect(mapStateToProps)(Chat);
