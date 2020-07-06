import React, { Component } from 'react';
import { Text, Button, View, Form, Input, Item, Image, Alert, StyleSheet,ImageBackground} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';


export default class Register extends Component {
  static navigationOptions = {
    title: 'Kayıt Ol',
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTintColor: '#fff'
  };


  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedIndices: [0],
      customStyleIndex: 0,
      loading: false,
      disabled: false,
      email: '',
      parola: '',
      tparola: '',
      ad: '',
      soyad: '',
      tanım: '',
      okul_no: '',
      bolum: '',
      foto: '',
      github: '',
      no: '',
    };
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
    this.getPermissionAsync();
  }

  userRegister = () => {
    if (
      this.state.email == '' ||
      this.state.parola == '' ||
      this.state.tparola == '' ||
      this.state.ad == '' ||
      this.state.soyad == '' ||
      this.state.tanım == '' ||
      this.state.okul_no == '' ||
      this.state.bolum == '' ||
      this.state.foto == '' ||
      this.state.github == ''
    ) {
      Alert.alert('Boş bırakamazsınız');
    }
    else if (this.state.parola !== this.state.tparola) {
      Alert.alert("Şifeler uyuşmuyor");
    }
    else {
      this.setState({ loading: true, disabled: true }, () => {
        console.log(this.state.email)
        fetch('http://192.168.89.2/wewanted/registration_api.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.state.email,
            parola: this.state.parola,
            tparola: this.state.tparola,
            ad: this.state.ad,
            soyad: this.state.soyad,
            tanım: this.state.tanım,
            okul_no: this.state.okul_no,
            bolum: this.state.bolum,
            foto: this.state.foto,
            github: this.state.github,
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
      });
    }
  };




  render() {
    return (
      <ImageBackground
        source={require('./../images/bg11.jpg')}
        style={{ width: '100%', height: '100%' }}
      >
      <ScrollView style={{ height: '100%' }}>
        <View >
        <Text style={{fontWeight:"bold", fontSize:25, color:'#fff', marginLeft:150, marginTop:50}}>
                 KAYIT OL
                </Text>
          <View style={styles.container}>
         
              <View style={styles.indexContainer}>
                <Text style={styles.titleText}>
                  Giriş Bilgilerinizi Belirleyiniz
                </Text>
                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Mail adresiniz"
                    headerTintColor="#fff"
                    onChangeText={email => this.setState({ email: email })}
                    value={this.state.email}
                  ></TextInput>
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Parolanızı yazınız"
                    headerTintColor="#fff"
                    secureTextEntry
                    onChangeText={parola => this.setState({ parola: parola })}
                  ></TextInput>
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Parola tekrarı"
                    headerTintColor="#fff"
                    secureTextEntry
                    onChangeText={parola => this.setState({ tparola: parola })}
                  ></TextInput>
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Adınız "
                    headerTintColor="#fff"
                    onChangeText={ad => this.setState({ ad: ad })}
                    value={this.state.ad}
                  ></TextInput>
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Soyadınız "
                    headerTintColor="#fff"
                    onChangeText={soyad => this.setState({ soyad: soyad })}
                    value={this.state.soyad}
                  ></TextInput>
                </View>

                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={tanım => this.setState({ tanım: tanım })}
                  value={this.state.tanım}
                  defaultValue={this.state.text}
                  maxLength={120}
                  placeholder={'Kendinizi kısaca tanıtınız..'}
                  placeholderTextColor={'#fff'}
                  underlineColorAndroid={'transparent'}
                />

                </View>
               <View style={styles.indexContainer}>
               <Text style={styles.titleText}>
                 Üniversite bilgilerinizi Giriniz
               </Text>

               <View>
                 <TextInput
                   style={styles.input}
                   autoCapitalize="none"
                   placeholder="Okul numaranız "
                   headerTintColor="#fff"
                   onChangeText={okul_no => this.setState({ okul_no: okul_no })}
                   value={this.state.okul_no}
                 ></TextInput>
               </View>
               <TextInput
                 style={styles.input}
                 autoCapitalize="none"
                 placeholder="Okul Bölümünüzü Giriniz.. "
                 headerTintColor="#fff"
                 onChangeText={bolum => this.setState({ bolum: bolum })}
                 value={this.state.bolum}
               ></TextInput>

               <Text style={styles.titleText}>
                 Profil Fotoğrafınızı Belirleyiniz
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
               <Text style={styles.titleText}>
                  Sosyal Medya Linklerinizi Giriniz
                </Text>

                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Github kullanıcı adınız"
                    headerTintColor="#fff"
                    onChangeText={github => this.setState({ github: github })}
                    value={this.state.github}
                  ></TextInput>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  full
                  rounded
                  onPress={this.userRegister}
                >
                  <Text style={{ color: '#fff', fontWeight: '500' }}>
                    Gönder
                  </Text>
                </TouchableOpacity>
             </View>

         
           
          </View>
        </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 600,
    backgroundColor: '#000',
    borderColor:'#fff',
    borderWidth:0.5
  },
  titleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 24,
    marginLeft: 0
  },
 
  textareaContainer: {
    height: 50,
    padding: 5,
    marginTop: 10
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: '#fff'
  },
  
  indexContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    backgroundColor: '#000'
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#fff',
    marginTop: 10
  },
  button: {
    backgroundColor: '#ff6f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 40
  },
 
});