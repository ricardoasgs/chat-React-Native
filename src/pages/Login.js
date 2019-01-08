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
import Toaster from "react-native-toaster";
import { StackActions, NavigationActions } from "react-navigation";

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

  async componentDidMount() {
    const token = await AsyncStorage.getItem("token");

    this.props.validate();

    if (token) {
      this.navigateToMain();
    }
  }

  changeEmail = email => {
    this.setState({ email });
  };

  changePassword = password => {
    this.setState({ password });
  };

  navigateToMain = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Main" })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    const { email, password } = this.state;
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
            returnKeyType="send"
            onSubmitEditing={() =>
              this.props.login({ email, password }, this.navigateToMain)
            }
            secureTextEntry={true}
            textContentType="password"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.login({ email, password }, this.navigateToMain)
            }
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={styles.signUpText}>
              Não possui uma conta? Cadastre-se!
            </Text>
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
  toastMessage: state.toaster.message
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login, validate, addToast }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
