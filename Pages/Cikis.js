import React, { Component } from 'react';
import { SafeAreaView, Alert ,Text,View} from 'react-native';
export default class Cikis extends Component {
  cikis_yap = () => {
    fetch('http://192.168.89.2/wewanted/logout.php')
      .then((response) => response.json())
      .then((rs) => {
        if (rs === 'Success') {
          this.props.navigation.navigate('Begin');
        } else {
          Alert.alert('Lütfen tekrar deneyiniz');
        }
      })
      .catch((error) => {
        Alert.alert('Hata');
      });
  };
  componentDidMount() {
    this.cikis_yap();
  }
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#000', height: '100%' }}/>
       
    );
  }
}