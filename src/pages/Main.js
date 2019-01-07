import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, FlatList } from "react-native";

import socket from "../config/socket";
import { fetchRooms } from "../actions/chatActions";
import Conversation from "../components/Conversation";
import MainHeaderRight from "../components/MainHeaderRight";

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
    headerRight: <MainHeaderRight />
  });

  componentDidMount() {
    this.subscribeToEvents();
    this.props.dispatch(fetchRooms());
    // joinChats(this.props.chats);
  }

  subscribeToEvents = () => {
    socket.on("connect", () => {
      console.log("Conectado!!!");
    });

    socket.on("newMessage", data => {
      console.log(data);
      this.props.dispatch(fetchRooms());
    });
  };

  // logout = () => {
  //   this.props.dispatch(logout(this.props.navigation));
  // };

  render() {
    const { chats } = this.props;
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
  toastMessage: state.toaster.message,
  chats: state.chat.chats
});

export default connect(mapStateToProps)(Main);
