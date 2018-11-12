import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

import {
  changeEmail,
  changePassword,
  login,
  validateToken
} from "../actions/loginActions";

import Icon from "react-native-vector-icons/FontAwesome";

class Login extends Component {
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      this.navigateToApp();
    }
  }

  navigateToApp = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Main" })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Icon
              style={{ marginRight: 20 }}
              name="comments"
              size={40}
              color="#FF6600"
            />
            <Text style={styles.textLogo}>Messenger</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={this.props.email}
            onChangeText={this.props.changeEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={this.props.password}
            onChangeText={this.props.changePassword}
            returnKeyType="send"
            onSubmitEditing={() => this.props.login({ email, password })}
          />
          <TouchableOpacity style={styles.button} onPress={this.navigateToApp}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  logoContainer: {
    backgroundColor: "#FFF",
    flexDirection: "row"
  },

  textLogo: {
    fontSize: 24
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 20
  },

  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 30,
    backgroundColor: "#FF6600",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => ({
  token: state.login.token,
  userId: state.login.userId,
  username: state.login.username,
  email: state.login.email,
  password: state.login.password,
  confirmPassword: state.login.confirmPassword
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { changeEmail, changePassword, login, validateToken },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
