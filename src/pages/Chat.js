import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

class Chat extends Component {
  static navigationOptions = {
    headerTitle: (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          <Icon name="user-circle" size={40} color="#fff" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontSize: 20, color: "#fff" }}>
          UserTest
        </Text>
      </View>
    ),
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
  };

  goBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Teste Chat!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});

export default Chat;
