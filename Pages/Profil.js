import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Button, Alert } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Form } from 'native-base';
import {  TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import * as ImagePicker from 'expo-image-picker';



export default class Profil extends Component {
  static navigationOptions =  ({navigation}) =>({
    title: 'Profil',
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTintColor: '#fff'
  });


  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      selectedIndices: [0],
      customStyleIndex: 0,
      loading: false,
      disabled: false,
      email: this.props.navigation.getParam('email'),
      ad: this.props.navigation.getParam('ad'),
      soyad: this.props.navigation.getParam('soyad'),
      foto: this.props.navigation.getParam('foto'),
      parola: this.props.navigation.getParam('parola'),
      bolum: this.props.navigation.getParam('bolum'),
      tanım: this.props.navigation.getParam('tanım'),
      okul_no: this.props.navigation.getParam('okul_no'),
      github: this.props.navigation.getParam('github'),
      id: this.props.navigation.getParam('id'),
      tparola: '',
    
    }
  }
  onChooseImagePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      this.setState({ foto: result.uri });
    }
  };
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  componentDidMount() {
    console.log(this.state.email)
    this.getPermissionAsync();
  }
  update = () => {
   if (this.state.parola !== this.state.tparola) {
      Alert.alert("Şifreler uyuşmuyor");
    }
    else {
      this.setState({ loading: true, disabled: true }, () => {
        fetch('http://192.168.89.2/wewanted/update_user.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.state.email,
            parola: this.state.parola,
            ad: this.state.ad,
            soyad: this.state.soyad,
            tanım: this.state.tanım,
            okul_no: this.state.okul_no,
            bolum: this.state.bolum,
            foto: this.state.foto,
            github: this.state.github,
            id:this.state.id,
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            alert(responseJson);
            this.setState({ loading: false, disabled: false });
            this.props.navigation.navigate("SideMenu", {
              email: this.state.email,
              parola: this.state.parola,
              ad: this.state.ad,
              soyad: this.state.soyad,
              tanım: this.state.tanım,
              okul_no: this.state.okul_no,
              bolum: this.state.bolum,
              foto: this.state.foto,
              github: this.state.github});
          })
          .catch(error => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
      });
    }
  };

  handleCustomIndexSelect = (index) => {
    this.setState(prevState => ({ ...prevState, customStyleIndex: index }))
  }



  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView> 
          <View backgroundColor="#000">
            <View style={{flexDirection:'row'}}>
            <Image
                source={{
                  uri:
                    this.state.foto === '' || this.state.foto === null
                      ? 'https://via.placeholder.com/70x70.jpg'
                      : this.state.foto
                }}
                style={styles.image}
              />
            <View style={styles.profilContainer}>
                <Text style={{ color: 'white', fontSize: 24 }}> {this.state.ad} </Text> 
                <Text style={{ color: 'white', fontSize: 24 }}> {this.state.soyad}</Text>
              </View>
            </View>
         
            <View style={styles.container}>
            <Text style={{ color: '#ff6f00',
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginTop: 24,
                            marginLeft: 10}}>
              Güncellemek istediğiniz bilgilerinizi aşağıdaki formdan güncelleyebilirsiniz
                </Text>         
              <View style={styles.indexContainer}>
                <Text style={styles.titleText}>
              {">>"}Kişisel Bilgileriniz
                </Text>
                <View>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder={this.state.email}
                    headerTintColor="#fff"
                    onChangeText={email => this.setState({ email: email })}
                    value={this.state.email}
                  ></TextInput>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Parolanızı yazınız"
                    headerTintColor="#fff"
                    secureTextEntry={true}
                    onChangeText={parola => this.setState({ parola: parola })}
                  ></TextInput>

                  <TextInput
                    style={styles.parola}
                    autoCapitalize="none"
                    placeholder="Parola tekrarı"
                    headerTintColor="#fff"
                    secureTextEntry={true}
                    onChangeText={parola => this.setState({ tparola: parola })}
                  ></TextInput>
                </View>
            
                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder={this.state.ad}
                    headerTintColor="#fff"
                    onChangeText={ad => this.setState({ ad: ad })}
                  ></TextInput>
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder={this.state.soyad}
                    headerTintColor="#fff"
                    onChangeText={soyad => this.setState({ soyad: soyad })}
                  ></TextInput>
                </View>

                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={tanım => this.setState({ tanım: tanım })}
                  value={this.state.tanım}
                  defaultValue={this.state.tanım}
                  maxLength={120}
                  placeholder={'Kendinizi kısaca tanıtınız..'}
                  placeholderTextColor={'#fff'}
                  underlineColorAndroid={'transparent'}
                />
              </View>
            
              <View style={styles.indexContainer}>
                <Text style={styles.titleText}>
                {">>"}Üniversite Bilgileriniz
                </Text>

                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder={this.state.okul_no}
                    headerTintColor="#fff"
                    onChangeText={okulno => this.setState({ okul_no: okulno })}
                  ></TextInput>
                </View>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder={this.state.bolum}
                  headerTintColor="#fff"
                  onChangeText={bolum => this.setState({ bolum: bolum })}
                ></TextInput>

              
               
              </View>
            
            
              <View style={styles.indexContainer}>
                <Text style={styles.titleText}>
                {">>"}Github Adresiniz
                </Text>

                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder={this.state.github}
                    headerTintColor="#fff"
                    onChangeText={github => this.setState({ github })}
                  ></TextInput>
                </View>
                <Text style={styles.titleText}>
                {">>"}Profil Fotoğrafınızı Belirleyiniz
                </Text>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={this.onChooseImagePress}
                    style={{
                      marginTop: 10,
                      marginLeft: 10,
                      backgroundColor: '#fff',
                      width: 100,
                      height: 40
                    }}
                  >
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '500',
                        marginLeft: 10,
                        marginTop: 10
                      }}
                    >
                      Dosya Seç
                    </Text>
                  </TouchableOpacity>
                </View>
           
              
              </View>
              <View style={{display:"flex",alignItems:"center"}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.update}
          >
            <Text style={{ color: '#fff', fontWeight: '500' }}>
              Güncelle
                  </Text>
          </TouchableOpacity>
          </View>
          
               
             
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 600,
    backgroundColor: '#121212',
    borderColor:'#fff',
    padding:10
  },
  titleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 24,
    marginLeft: 10
  },
  image: {
    marginTop: 20,
    marginLeft: 30,
    width: 130,
    height: 130,
    borderRadius: 50
  },
  text: {
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#ff6f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    height: 40,
    width:300,
    marginLeft:10
  },
  MainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  profilContainer: {
    flex: 1,
    paddingLeft:10,
    paddingTop:55,
    flexDirection:"row",
    paddingBottom:20

  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#fff',
    marginTop: 10,
  },
  parola: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 125,
    fontSize: 15,
    color: '#161F3D',
    marginTop: 10,
    marginLeft: 30
  },

});


