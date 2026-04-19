import { Component } from "react";
import Calendario from "./CalendarioComponent";
import DetalleExcursion from "./DetalleExcursionComponent";
import { EXCURSIONES } from "../comun/excursiones";
import { Platform, View, Pressable, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Constants from "expo-constants";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "./HomeComponent";
import QuienesSomos from "./QuienesSomosComponent";
import Contacto from "./ContactoComponent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function BotonMenu(props) {
  return (
    <Pressable
      onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{ marginLeft: 10 }}
    >
      <MaterialCommunityIcons name="menu" size={24} color="#fff" />
    </Pressable>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView>
        <View style={styles.drawerHeader}>
          <Image
            source={require("./imagenes/logo.png")}
            style={styles.drawerImage}
          />
          <Text style={styles.drawerHeaderText}>Gaztaroa</Text>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

class Campobase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
    };
  }

  HomeNavegador = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#015afc" },
          headerTitleStyle: { color: "#fff" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "Campo Base",
            headerLeft: () => <BotonMenu navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    );
  };

  CalendarioNavegador = () => {
    return (
      <Stack.Navigator
        initialRouteName="Calendario"
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#015afc" },
          headerTitleStyle: { color: "#fff" },
        }}
      >
        <Stack.Screen
          name="Calendario"
          options={({ navigation }) => ({
            title: "Calendario Gaztaroa",
            headerLeft: () => <BotonMenu navigation={navigation} />,
          })}
        >
          {(props) => (
            <Calendario {...props} excursiones={this.state.excursiones} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="DetalleExcursion"
          options={{
            title: "Detalle Excursión",
            headerBackTitle: "Calendario",
          }}
        >
          {(props) => (
            <DetalleExcursion {...props} excursiones={this.state.excursiones} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  };

  QuienesSomosNavegador = () => {
    return (
      <Stack.Navigator
        initialRouteName="QuienesSomos"
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#015afc" },
          headerTitleStyle: { color: "#fff" },
        }}
      >
        <Stack.Screen
          name="QuienesSomos"
          component={QuienesSomos}
          options={({ navigation }) => ({
            title: "Quiénes somos",
            headerLeft: () => <BotonMenu navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    );
  };

  ContactoNavegador = () => {
    return (
      <Stack.Navigator
        initialRouteName="Contacto"
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#015afc" },
          headerTitleStyle: { color: "#fff" },
        }}
      >
        <Stack.Screen
          name="Contacto"
          component={Contacto}
          options={({ navigation }) => ({
            title: "Contacto",
            headerLeft: () => <BotonMenu navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    );
  };

  DrawerNavegador = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Campo base"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#c2d3da",
          },
        }}
      >
        <Drawer.Screen
          name="Campo base"
          component={this.HomeNavegador}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Quiénes somos"
          component={this.QuienesSomosNavegador}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="information" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="CalendarioDrawer"
          options={{
            title: "Calendario",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={size} />
            ),
          }}
          component={this.CalendarioNavegador}
        />
        <Drawer.Screen
          name="ContactoDrawer"
          options={{
            title: "Contacto",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="card-account-phone" color={color} size={size} />
            ),
          }}
          component={this.ContactoNavegador}
        />
      </Drawer.Navigator>
    );
  };

  render() {
    return (
      <NavigationContainer>
        <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
          }}
        >
          <this.DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#015afc",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  drawerImage: {
    width: 80,
    height: 60,
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Campobase;
