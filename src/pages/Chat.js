import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import InputBar from "../components/InputBar";
import Message from "../components/Message";

class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
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
  });

  render() {
    const { messages } = this.props.chat;
    const { userId } = this.props;
    //console.log(userId);
    return (
      <KeyboardAvoidingView style={styles.container} behavior="heigth">
        <View style={styles.viewContainer}>
          <FlatList
            style={styles.messagesContainer}
            data={messages}
            keyExtractor={message => message._id}
            renderItem={({ item }) => {
              console.log(item);
              return item.userId != userId ? (
                <Message direction="left" text={item.message} />
              ) : (
                <Message direction="right" text={item.message} />
              );
            }}
          />
          <View>
            <InputBar />
          </View>
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
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  messagesContainer: {
    flex: 10,
    backgroundColor: "#F1F0F3"
  }
});

const mapStateToProps = state => ({
  chat: state.chat.chat,
  userId: state.login.userId
});

export default connect(mapStateToProps)(Chat);
