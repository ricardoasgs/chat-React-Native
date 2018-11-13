import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { logout } from "../actions/loginActions";

import Conversation from "../components/Conversation";

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

  logout = () => {
    this.props.logout();
  };

  componentDidMount() {
    this.props.navigation.setParams({ logout: this.logout });
  }

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

const mapStateToProps = state => ({
  token: state.login.token,
  userId: state.login.userId,
  toastMessage: state.toaster.message
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
