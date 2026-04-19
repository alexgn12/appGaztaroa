import { Component } from "react";
import { ImageBackground, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { Card, Text, Divider, IconButton } from "react-native-paper";
import { EXCURSIONES } from "../comun/excursiones";
import { COMENTARIOS } from "../comun/comentarios";
import { baseUrl } from "../comun/comun";

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <View style={styles.botonesContainer}>
          <IconButton
            icon={props.favorita ? "heart" : "heart-outline"}
            iconColor="red"
            size={24}
            onPress={props.marcarFavorito}
          />
        </View>
        <ImageBackground
          source={{ uri: baseUrl + excursion.imagen }}
          style={styles.image}
        >
          <Text style={styles.titulo}>{excursion.nombre}</Text>
        </ImageBackground>
        <Card.Content>
          <Text style={styles.descripcion}>{excursion.descripcion}</Text>
        </Card.Content>
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;
  return (
    <Card style={styles.card}>
      <Card.Title title="Comentarios" />
      <Card.Content>
        <FlatList
          data={comentarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.comentario}</Text>
              <Text>
                {"★".repeat(item.valoracion)}
                {"☆".repeat(5 - item.valoracion)}
              </Text>
              <Text>{item.autor}</Text>
              <Text>
                {new Date(item.dia.replace(/\s/g, "")).toLocaleDateString(
                  "es-ES",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </Text>
              <Divider style={styles.divider} />
            </View>
          )}
        />
      </Card.Content>
    </Card>
  );
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      comentarios: COMENTARIOS,
      favoritos: [],
    };
  }

  marcarFavorito(excursionId) {
    if (this.state.favoritos.some((fav) => fav === excursionId)) {
      this.setState({
        favoritos: this.state.favoritos.filter((fav) => fav !== excursionId),
      });
    } else {
      this.setState({ favoritos: this.state.favoritos.concat([excursionId]) });
    }
    console.log("Favoritos:", this.state.favoritos);
  }

  render() {
    const { excursionId } = this.props.route.params;
    const excursionIdNum = +excursionId;
    const esFavorita = this.state.favoritos.some((fav) => fav === excursionIdNum);

    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.state.excursiones[excursionIdNum]}
          favorita={esFavorita}
          marcarFavorito={() => this.marcarFavorito(excursionIdNum)}
        />
        <RenderComentario
          comentarios={this.state.comentarios.filter(
            (comentario) => comentario.excursionId === excursionIdNum
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  image: {
    height: 200,
    justifyContent: "flex-start",
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
  divider: {
    marginVertical: 8,
  },
});

export default DetalleExcursion;
