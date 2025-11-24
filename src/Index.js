import * as React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import {
  Text,
  Button,
  TextInput,
  Modal,
  Portal,
  PaperProvider,
  Icon,
} from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: '0 lb', value: 0 },
  { label: '33 lb', value: 33 },
  { label: '40 lb', value: 40 },
  { label: '45 lb', value: 45 }
]

const datosDiscos = [
  { id: 1, peso: 0 }
]

export default function Index() {
  const [doble, setDoble] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const [disco, setDisco] = React.useState(datosDiscos);
  const [changeText, setChangeText] = React.useState(null);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [editarId, setEditarId] = React.useState(null)
  const [newPeso, setNewPeso] = React.useState();
  const [resultado, setResultado] = React.useState();

  const showModal = () => setVisibleModal(true);
  const closeModal = () => setVisibleModal(false);

  const newDisco = (id, peso) => setDisco([...disco, { id: id, peso: peso }]);

  const handleSelectDiscos = (force) => {
    if (force == null || force == '') return;

    //obtener el id del numero mas alto
    let maxId = Math.max(...disco.map(item => item.id));
    //agregar el nuevo dato al arreglo
    newDisco(maxId == -Infinity ? 1 : maxId + 1, force);
    console.log(disco)
  }

  const handleDeletePeso = (id) => {
    setDisco(
      prev => (prev.filter(disco => disco.id !== id))
    )
  }

  const handleEditar = (id) => {
    setDisco(
      prev => prev.map(
        dis => dis.id == id ? { ...dis, peso: newPeso } : dis
      )
    )
  }

  const menuEdit = (id) => {
    setEditarId(id)
    setVisibleModal(true)
    console.log(disco.map(item => item.id == id ? item.peso : ''))
  }

  React.useEffect(()=>{

    const kg = 2.2;
    const totalPesoDisco = disco.reduce((acc, datos) => acc + Number(datos.peso),0);
    let totalPesoKg = 0;

    if(value == 0 || value == null){
      totalPesoKg = totalPesoDisco / kg;
    }else{
      let totalPesoLibras = totalPesoDisco * 2;
      totalPesoLibras = totalPesoLibras + value
      totalPesoKg = totalPesoLibras / kg;
    }
    console.log({disco, totalPesoKg});
    
    setResultado(disco.length == 0 ? '0' : totalPesoKg.toFixed(2));

  },[disco, value])

  return (
   <PaperProvider>
      <View style={styles.content}>
        <Text variant="displaySmall">Fuerza</Text>
        <View style={{
          flexDirection: 'row'
        }}>

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}

            data={data}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder="Peso de barra"
            searchPlaceholder="serach ..."
            value={value == 0 ? 'Peso de barra' : value}
            onChange={item => { setValue(item.value) }}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color={isFocus ? 'blue' : 'black'}
                name="trophy"
                size={40}
              />
            )}
          >

          </Dropdown>
        </View>
        <View style={styles.containerChild}>
          <Button mode="outlined" onPress={() => handleSelectDiscos(changeText)}>
            <Text variant="bodyLarge">Agregar peso de disco</Text>
          </Button>
          <TextInput
            label="Peso"
            style={{ width: 100 }}
            keyboardType="number-pad"
            onChangeText={e => setChangeText(e)}
          />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, borderTopWidth: 2, borderColor: 'black', width: '100%', paddingTop: 5 }}>
          {
            disco.map(item =>
            (<View key={item.id} style={{ borderWidth: 1, padding: 3 }}>
              <View style={{ flexDirection: 'row' }}>
                <Button icon="pencil" mode="outline" onPress={() => menuEdit(item.id)}></Button>
                <Button icon="delete" mode="outline" onPress={() => handleDeletePeso(item.id)}></Button>
              </View>
              <Text style={{ textAlign: 'center' }}>
                {item.peso} LB
              </Text>
            </View>)
            )
          }
          <View>
            <Portal>
              <Modal
                visible={visibleModal}
                onDismiss={closeModal}
                contentContainerStyle={{ backgroundColor: 'white', padding: 15, margin: 5 }}
              >

                <Text style={{ textAlign: 'center' }}>{disco.map(item => item.id == editarId ? item.peso : '')} LB</Text>

                <TextInput
                  label='Ingrese el nuevo peso'
                  keyboardType="number-pad"
                  onChangeText={e => setNewPeso(e)}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Button icon='close' onPress={closeModal}>
                    Cancelar
                  </Button>
                  <Button icon='pencil' onPress={() => handleEditar(editarId)}>
                    Editar
                  </Button>
                </View>
              </Modal>
            </Portal>
          </View>
        </View>
        <View style={{marginTop:5, borderTopWidth: 2}}>
          <Text variant="titleLarge">Resultado</Text>
          <Text variant="bodyLarge" style={{textAlign:'center', borderRadius: 55, backgroundColor: '#494949ff', color:'white', padding:3}}>
            {resultado}
          </Text>
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
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 5
  },
  containerChild: {
    flexDirection: "row",
    gap: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dropdown: {
    width: 220,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
