import * as React from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Button,
  TextInput,
  Menu,
  PaperProvider,
} from "react-native-paper";

export default function Index() {
  const [visible, setVisible] = React.useState(false);
  const [barra, setBarra] = React.useState(0);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (option) => {
    setBarra(option);
    closeMenu();
  };

  return (
    <PaperProvider>
      <View style={styles.content}>
        <Text variant="displaySmall">Fuerza</Text>
        <View
          style={{
            ...styles.containerChild,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <View>
                <Button mode="contained" onPress={openMenu}>
                  Seleccionar el peso de la barra
                </Button>
              </View>
            }
          >
            <Menu.Item onPress={() => {handleSelect(0)}} title="0 kg" />
            <Menu.Item onPress={() => handleSelect(30)} title="30 kg" />
            <Menu.Item onPress={() => handleSelect(33)} title="33 kg" />
            <Menu.Item onPress={() => handleSelect(45)} title="45 kg" />
          </Menu>
          <Text>{barra} kg</Text>
        </View>
        <View style={styles.containerChild}>
          <Button mode="outlined" onPress={() => console.log("probando")}>
            <Text variant="bodyLarge">Agregar peso de disco</Text>
          </Button>
          <TextInput
            label="Peso"
            style={{ width: 100 }}
            keyboardType="number-pad"
          />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  containerChild: {
    flexDirection: "row",
    gap: 10,
  },
});
