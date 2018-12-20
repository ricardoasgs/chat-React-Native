import React, { Component } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class ChatHeaderTitle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="user-circle" size={40} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>{this.props.address.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  textTitle: { marginLeft: 15, fontSize: 20, color: "#fff" }
});

const mapStateToProps = state => ({
  address: state.chat.address
});

export default connect(mapStateToProps)(ChatHeaderTitle);
