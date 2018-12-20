import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList
} from "react-native";

import { selectAddress, updateRoom } from "../actions/chatActions";
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
    render: false
  };

  getAddresse = () => {
    const { chat } = this.props;
    const { userId } = this.props;
    if (chat.users[0]._id === userId) {
      this.props.dispatch(selectAddress(chat.users[1]));
    } else {
      this.props.dispatch(selectAddress(chat.users[0]));
    }
  };

  componentDidMount() {
    this.getAddresse();
    this.subscribeToEvents();
  }

  subscribeToEvents = () => {
    socket.on("newMessage", data => {
      this.setState({ render: true });
      const newChat = this.props.chat;
      newChat.messages.reverse();
      newChat.messages.push(data);
      this.props.dispatch(updateRoom(newChat));
    });
  };

  render() {
    const { messages } = this.props.chat;
    const { userId } = this.props;
    const { render } = this.state;
    //console.log(userId);
    return (
      <KeyboardAvoidingView style={styles.container} behavior="heigth">
        <View style={styles.viewContainer}>
          <FlatList
            inverted
            style={styles.messagesContainer}
            initialNumToRender={9}
            data={messages}
            extraData={render}
            // ref={ref => (this.messages = ref)}
            // onContentSizeChange={() =>
            //   this.messages.scrollToEnd({ animated: true })
            // }
            // onLayout={() => this.messages.scrollToEnd()}
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
