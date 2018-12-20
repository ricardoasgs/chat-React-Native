import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import socket from "../config/socket";
import { fetchRooms } from "../actions/chatActions";

import { logout } from "../actions/loginActions";

import Conversation from "../components/Conversation";

import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

class Main extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Conversas",
    headerStyle: {
      backgroundColor: "#FF6600"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerRight: (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => console.log("This is a button!")}>
          <Icon
            style={{ marginRight: 20 }}
            name="search"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Zika mesmo")}>
          <Icon
            style={{ marginRight: 20 }}
            name="user-plus"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigation.getParam("logout")}>
          <Icon
            style={{ marginRight: 20 }}
            name="plus-square"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    )
  });

  componentDidMount() {
    this.subscribeToEvents();
    this.props.fetchRooms();
    this.props.navigation.setParams({
      logout: this.logout,
      joinChats: this.joinChats
    });
    //this.joinChats();
  }

  subscribeToEvents = () => {
    socket.on("connect", () => {
      console.log("Conectado!!!");
    });

    socket.on("newMessage", data => {
      console.log(data);
      this.props.fetchRooms();
    });
  };

  joinChats = () => {
    this.props.chats.map(chat => {
      socket.emit("joinChats", chat);
    });
  };

  logout = () => {
    //this.newMessageTest();
    this.joinChats();
    //this.props.logout(this.props.navigation);
  };

  render() {
    const { chats } = this.props;
    //console.log(chats);
    return (
      <FlatList
        style={styles.container}
        data={chats}
        keyExtractor={chat => chat._id}
        renderItem={({ item }) => (
          <Conversation
            conversation={item}
            navigate={this.props.navigation.navigate}
            key={item._id}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  icons: {
    flexDirection: "row"
  }
});

const mapStateToProps = state => ({
  token: state.login.token,
  userId: state.login.userId,
  toastMessage: state.toaster.message,
  chats: state.chat.chats,
  chat: state.chat.chat
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout, fetchRooms }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
