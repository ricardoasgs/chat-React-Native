import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import Toaster from "react-native-toaster";

import { addToast } from "../actions/toasterActions";
import { login, validate } from "../actions/loginActions";

import Icon from "react-native-vector-icons/FontAwesome";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  static navigationOptions = {
    header: null
  };

  changeName = name => {
    this.setState({ name });
  };

  changeEmail = email => {
    this.setState({ email });
  };

  changePassword = password => {
    this.setState({ password });
  };

  changeConfirmPassword = confirmPassword => {
    this.setState({ confirmPassword });
  };

  validate = () => {
    const { password, confirmPassword } = this.state;
    if (password != confirmPassword) {
      //lançar toaster
    }
    //signup
    //this.props.login({ email, password }, this.props.navigation);
  };

  render() {
    const { name, email, password, confirmPassword } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Toaster
          message={this.props.toastMessage}
          onShow={() => this.props.addToast(null)}
        />
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
            placeholder="Name"
            value={name}
            onChangeText={this.changeName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={this.changeEmail}
            textContentType="emailAddress"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={this.changePassword}
            secureTextEntry={true}
            textContentType="password"
          />
          <TextInput
            style={styles.input}
            placeholder="Password Confirmation"
            value={confirmPassword}
            onChangeText={this.changeConfirmPassword}
            returnKeyType="send"
            onSubmitEditing={() => this.validate()}
            secureTextEntry={true}
            textContentType="password"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.validate()}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.signUpText}>Já possui uma conta? Entre!</Text>
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
  },

  signUpText: {
    color: "#FF6600",
    fontSize: 16,
    paddingVertical: 9,
    alignSelf: "flex-start"
  }
});

const mapStateToProps = state => ({
  token: state.login.token,
  userId: state.login.userId,
  email: state.login.email,
  password: state.login.password,
  confirmPassword: state.login.confirmPassword,
  toastMessage: state.toaster.message
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login, validate, addToast }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
