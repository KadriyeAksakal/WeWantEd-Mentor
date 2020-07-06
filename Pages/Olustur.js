import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import { Form, Button } from 'native-base';



export default class Olustur extends Component {
 
  constructor(props){
    super(props);
    this.state={
      id:this.props.navigation.getParam("id"),
    }
  }
  navigateToScreen = route => () => {
    console.log("id",this.state.id)
    this.props.navigation.navigate(route, {
      id: this.state.id,
    });
  };

  render() {
    console.log("id",this.state.id)
    console.log("email",this.state.email)
    return (
      
      <View style={styles.container}>
        <ScrollView style={{ height: '100%' }}>

          <Image source={require('./../images/LOGO1.png')} style={styles.image} />

          <View style={styles.view}>
            <Button style={styles.button} full rounded onPress={() => this.navigateToScreen('KursAc')}>
              <Text style={{ color: '#fff' }}>Kurs Oluştur</Text>
            </Button>
            <Button style={styles.button} full rounded onPress={() => this.navigateToScreen('EtkinlikOlustur')}>
              <Text style={{ color: '#fff' }}>Etkinlik Oluştur</Text>
            </Button>
          </View>

        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'

  },
  image: {
    width: 300,
    height: 75,
    marginTop: 100,
  },

  view: {
    color: '#fff',
    marginTop: 100,
    fontSize: 30
  },

  button: {
    backgroundColor: '#ff6f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15

  }

});