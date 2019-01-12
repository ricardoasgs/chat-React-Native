import io from "socket.io-client";

const socket = io.connect("https://react-native-chat-api.herokuapp.com");

export default socket;
