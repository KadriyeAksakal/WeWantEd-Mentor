import React, { Component } from 'react';
import { StyleSheet, View, Text, Image ,SafeAreaView,Alert} from 'react-native';
import {  Input, Item, Label,Button } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';



export default class MentorEkle extends Component {

  static navigationOptions = {
    title: 'MentorEkle',
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTintColor: '#fff'
  };

  constructor() {
    super();
    this.state = {
      email:'',
      no: '2'
    };
  }
  
  ekle = () => {
    if ( this.state.email == '') {
      Alert.alert('Boş bırakamazsınız');
    }
    else{
  this.setState({ loading: true, disabled: true }, () => {
    console.log(this.state.email)
       fetch('http://192.168.89.2/wewanted/create_mentor.php', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           email: this.state.email,
            no: this.state.no
         })
       })
         .then(response => response.json())
         .then(responseJson => {
           alert(responseJson);
           this.setState({ loading: false, disabled: false });
         })
         .catch(error => {
           console.error(error);
           this.setState({ loading: false, disabled: false });
         });
     });}
   };


  //Screen2 Component
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000"}}>
        <View style={styles.MainContainer}>
          <View style={styles.box}>
            <Image source={require('./../images/LOGO1.png')} style={styles.img} />
            <Text style={{ marginTop: 14, color:'#fff'}}>
              Eklemek istediğiniz kişinin email adresini giriniz.
            </Text>
              <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Email adresi"
                    headerTintColor="#fff"
                    onChangeText={mail => this.setState({ email: mail })}
                  ></TextInput>
            
            <Button style={{ marginTop: 20 }} full success onPress={this.ekle}>
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
    flexDirection: 'row'
  },
  box: {
    flexDirection: 'column',
    width: 290,
    height: 140,
    
  },
  img: {
    width: 330,
    height: 80
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#fff',
    marginTop: 10
  }
});
