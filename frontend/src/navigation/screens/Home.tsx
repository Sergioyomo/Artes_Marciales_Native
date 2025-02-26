import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/karate.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.text}>
        Bienvenido a nuestra comunidad de Artes Marciales
      </Text>
      <Text style={styles.text}>
        Descubre técnicas, entrenadores y un mundo lleno de disciplina y respeto.
      </Text>
    </View>
  );
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: width, 
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});