import * as React from "react";
import { Text, View } from "../components/Themed";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  Button,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import Cadastrar from "../screens/Cadastrar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
let us = "";
let sh = "";

export default function Login({ navigation }) {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");

  return (
    <View style={estilo.area}>
      <ImageBackground
        source={require("../assets/images/fundo.jpg")}
        style={estilo.fundo}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={estilo.logo}
        />

        <TextInput
          placeholder="Usuário"
          style={estilo.acesso}
          onChangeText={(value) => setUsuario(value)}
          value={usuario}
        />

        <TextInput
          secureTextEntry
          placeholder="Senha"
          style={estilo.acesso}
          onChangeText={(value) => setSenha(value)}
          value={senha}
        />

        <TouchableOpacity
          style={estilo.logar}
          onPress={() => {
            us = usuario;
            sh = senha;
            logar();
          }}
        >
          <Text style={estilo.txtLogar}> Logar </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilo.cadastrar}
          onPress={() => navigation.navigate("Cadastrar")}
        >
          <Text style={estilo.txtCadastrar}> Cadastrar </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Cadastrar" component={Cadastrar} />
    </Stack.Navigator>
  </NavigationContainer>;
}

const estilo = StyleSheet.create({
  area: {
    backgroundColor: "white",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  acesso: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    width: "60%",
    margin: 5,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "gray",
    shadowOpacity: 1,
    borderBottomWidth: 1,
    borderBottomColor: "silver",
  },

  logar: {
    width: "60%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#2ba97a",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    borderRadius: 5,
  },
  txtLogar: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },

  cadastrar: {
    width: "60%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60,
    borderColor: "#2ba97a",
    borderWidth: 1,
    borderRadius: 10,
  },
  txtCadastrar: {
    color: "#2ba97a",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },

  logo: {
    width: 100,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
    opacity: 0.2,
  },

  fundo: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

function logar() {
  fetch("http://192.168.0.13/projeto_loja_mobile/service/usuario/login.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeusuario: us,
      senha: sh,
    }),
  })
    .then((response) => response.json())
    .then((resposta) => {
      console.log(resposta);
      Alert.alert("Olhe na tela de console");
    })
    .catch((error) => console.error(error));
}
