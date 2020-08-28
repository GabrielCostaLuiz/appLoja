import * as React from "react";
import { Text, View } from "../components/Themed";
import { Image, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";

export default function Inicial() {
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  //Carregar a api com os dados do banco de dados.
  //Executar a consulta listartelainicial

  React.useEffect(() => {
    fetch("http://192.168.0.13/projeto_loja_mobile/service/produto/listartelainicial.php")
      .then((response) => response.json())
      .then((produtos) => setDados(produtos.saida))
      .catch((error) => console.error(error))
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View>
      <ScrollView>
        <Image
          source={require("../assets/images/produtos.png")}
          style={tela.imagem}
        />

        {carregado ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dados}
            renderItem={({ item }) => (
              <View>
                <Image source={require("../assets/images/monitor1.png")} />
                <Text>
                  Nome:{item.nomeproduto} | {item.preco} | {item.foto}
                </Text>
              </View>
            )}
            keyExtractor={({ idproduto }, index) => idproduto}
          />
        )}
      </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
  imagem: {},
});
