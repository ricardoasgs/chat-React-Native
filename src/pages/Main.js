import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import io from "socket.io-client";

import { fetchRooms } from "../actions/chatActions";

import { logout } from "../actions/loginActions";

import Conversation from "../components/Conversation";

import { YellowBox } from "react-native";

const socket = io("http://10.0.2.2:3003", { transports: ["websocket"] });

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
        <TouchableOpacity onPress={navigation.getParam("joinChats")}>
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
  }

  subscribeToEvents = () => {
    socket.on("connect", () => {
      console.log("Conectado!!!");
      this.joinChats();
    });

    socket.on("newMessage", data => {
      console.log(data);
      this.props.fetchRooms();
    });
    this.joinChats();
  };

  joinChats = () => {
    //console.log(this.props.chats[0]);
  };

  newMessageTest = () => {
    socket.emit(
      "newMessage",
      "5beb202c9992993e78da6a0e",
      "5c0af8524721522518cf6583",
      "Ta bugado Mano :/"
    );
  };

  logout = () => {
    this.newMessageTest();
    //this.joinChats();
    // this.props.logout(this.props.navigation);
  };

  render() {
    console.log(this.props.chats);
    return (
      <View style={styles.container}>
        {this.props.chats.map(conversation => (
          <Conversation
            conversation={conversation}
            navigate={this.props.navigation.navigate}
            key={conversation._id}
          />
        ))}
      </View>
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
  chats: state.chat.chats
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout, fetchRooms }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
