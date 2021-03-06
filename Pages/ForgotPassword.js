import React, { Component } from 'react';
import {StyleSheet, Text, View,  ImageBackground, Image } from 'react-native';
import {Form, Item, Label, Input, Button} from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


export default class ForgotPassword extends Component{
   
    static navigationOptions ={
        title:'Şifremi Unuttum',
        headerStyle:{
            backgroundColor:'#000',
        },
        headerTintColor:'#fff'
    }
    
    render(){
        return(
            <ImageBackground
            source={require('./../images/bg11.jpg')}
            style={{ width: '100%', height: '100%' }}
          >
        <ScrollView style={{ height: '100%' }}>           
          <View style={styles.container}>
            <Image source={require('./../images/LOGO1.png')} style={styles.image} />

            <Form style={styles.inner}>
                <Text style={styles.label}>Üyeliğinize ait E-posta adresinizi giriniz</Text>
               <Item floatingLabel>
                   <Label style={styles.label}>E-Mail adresiniz</Label>
                   <Input style={styles.label}/>
               </Item>
  
                <Button  style={styles.button} rounded full  onPress={() =>this.props.navigation.navigate('')}>
                    <Text style={styles.label}>Parolayı Sıfırla</Text>
                </Button>
                            
            </Form>
            </View>
        
      </ScrollView> 
        </ImageBackground>
        );
    }

}


const styles = StyleSheet.create({
    container: {
      margin:24,
      justifyContent: 'center',
      alignItems: 'center'
      
    },
    inner: {
      width: '80%',
      height:'80%',
      marginTop:70,
      color:'#fff',
    },
    image:{
        width:300,
        height:75,
        marginTop:100,
    },
    label:{
        color:'#fff',
        fontSize:15
    },

    button: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ff6f00'
      },
    

  });