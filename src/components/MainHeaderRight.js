import React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { logout } from "../actions/loginActions";

const MainHeaderRight = props => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => console.log("This is a button!")}>
        <Icon
          style={{ marginRight: 20 }}
          name="search"
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("Zika mesmo")}>
        <Icon
          style={{ marginRight: 20 }}
          name="user-plus"
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.dispatch(logout(props))}>
        <Icon
          style={{ marginRight: 20 }}
          name="plus-square"
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default connect(null)(MainHeaderRight);
