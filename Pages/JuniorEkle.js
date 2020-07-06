import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Alert, SafeAreaView, TextInput } from 'react-native';
import { Input, Item, Label, Button } from 'native-base';
export default class JuniorEkle extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }
  ekle = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      Alert.alert("Email adresi yanlış.");
      return false;
    }else{
    fetch('http://192.168.89.2/wewanted/insert_junior.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === 'Kayıtlı') {
          Alert.alert('Kullanıcı aktif');
        } else if (responseJson === 'Success') {
          Alert.alert('işlem başarılı');
        } else {
          Alert.alert(responseJson);
        }
      })
      .catch((error) => {
        Alert.alert(
          'Email adresinizin doğruluğunu kontrol ediniz.'
        );
      });}
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <View style={styles.MainContainer}>
          <View style={styles.secondaryContainer}>
            <Text style={{ marginTop: 14, color: "#fff"}}>
              Eklemek istediğiniz kişinin email adresini giriniz.
            </Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Email.."
              headerTintColor="#fff"
              onChangeText={(email) => this.setState({ email })}
            ></TextInput>
            <Button style={{ marginTop: 20, backgroundColor: '#ff6f00',}} full  onPress={this.ekle}>
              <Text style={{ color: 'white' }}> Ekle </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginLeft: 50,
    marginTop: 50,
    flexDirection: 'row',
  },
  secondaryContainer: {
    flexDirection: 'column',
    width: 290,
    height: 140,
  },
 
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#fff',
    marginTop: 10,
  },
});