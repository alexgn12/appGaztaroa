import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet } from 'react-native';
import { Card, Divider, List, Text } from 'react-native-paper';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';

function Historia() {
  return (
    <Card style={styles.card}>
      <Card.Title
        title="Un poquito de historia"
        titleStyle={styles.titulo}
        style={styles.cardTitle}
      />
      <Card.Content>
        <Text style={styles.texto}>
          El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando
          jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear
          la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a
          la situación política de entonces. Gracias al esfuerzo económico de sus socios y
          socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.
        </Text>
        <Text style={styles.texto}>
          Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y
          montañeras que alguna vez habéis pasado por el club aportando vuestro granito de
          arena.
        </Text>
        <Text style={styles.texto}>Gracias!</Text>
      </Card.Content>
    </Card>
  );
}

class QuienesSomos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actividades: ACTIVIDADES,
    };
  }

  render() {
    return (
      <ScrollView>
        <Historia />
        <Card style={styles.card}>
          <Card.Title
            title='"Actividades y recursos"'
            titleStyle={styles.titulo}
            style={styles.cardTitle}
          />
          <FlatList
            data={this.state.actividades}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
              <List.Item
                title={item.nombre}
                description={item.descripcion}
                descriptionNumberOfLines={10}
                left={() => (
                  <Image
                    source={{ uri: baseUrl + item.imagen }}
                    style={styles.itemImagen}
                  />
                )}
              />
            )}
          />
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  titulo: {
    textAlign: 'center',
  },
  cardTitle: {
    alignItems: 'center',
  },
  texto: {
    marginTop: 10,
  },
  itemImagen: {
    width: 44,
    height: 44,
    margin: 8,
    alignSelf: 'center',
  },
});

export default QuienesSomos;
