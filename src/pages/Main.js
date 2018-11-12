import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Conversation from "../components/Conversation";

class Login extends Component {
  static navigationOptions = {
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
        <TouchableOpacity onPress={() => {}}>
          <Icon
            style={{ marginRight: 20 }}
            name="search"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icon
            style={{ marginRight: 20 }}
            name="user-plus"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icon
            style={{ marginRight: 20 }}
            name="plus-square"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    )
  };

  render() {
    const conversation = {
      name: "UserTest",
      lastMessage: "Olá, tudo bem?"
    };
    return (
      <View style={styles.container}>
        <Conversation
          conversation={conversation}
          navigate={this.props.navigation.navigate}
        />
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

export default Login;
