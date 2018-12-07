import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
        <TouchableOpacity onPress={() => alert("This is a button!")}>
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
    this.props.fetchRooms();
    this.props.navigation.setParams({ logout: this.logout });
  }

  componentDidUpdate() {}

  // subscribeToEvents = async () => {
  //   const userId = await AsyncStorage.getItem("userId");
  //   console.log(userId);
  //   const socket = io("http://10.0.2.2:3003", { transports: ["websocket"] });

  //   socket.emit("getChats", userId);
  //   socket.on("chats", data => {
  //     console.log(data);
  //   });
  // };

  logout = () => {
    this.props.logout(this.props.navigation);
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
