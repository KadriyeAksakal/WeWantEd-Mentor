import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import {Form, Button} from 'native-base';



export default class Begin extends Component{
    static navigationOptions =({navigation}) =>({
        title:'WEWANTED',
        headerStyle:{
            backgroundColor:'#000',
        },
        headerTintColor:'#fff'
        
    });
    render(){
        return(
            <ImageBackground source={require('./../images/bg11.jpg')} style={{width: '100%', height: '100%'}}>
                 <ScrollView style={{height: '100%'}}>
                <View style={styles.container}>
                <Image source={require('./../images/LOGO1.png')} style={styles.logoImage} />

                <Form style={styles.inner}>
                   
                    <View style={styles.view}>
                    <Button  style={styles.button}  full rounded onPress={() =>this.props.navigation.navigate('Login')}>
                        <Text style={{color: '#fff'}}>Giriş Yap</Text>
                    </Button>
                    <Button style={styles.button}  full rounded onPress={() =>this.props.navigation.navigate('Register')}>
                        <Text style={{color: '#fff'}}>Kayıt Ol</Text>
                    </Button>
                    </View>
                    
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
    logoImage:{
        width:300,
        height:75,
        marginTop:100,
    },
    
    view:{
        color:'#fff',
        marginTop:100,
        fontSize:30
    },
    
    button:{
        backgroundColor: '#ff6f00',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:15

    }

  });