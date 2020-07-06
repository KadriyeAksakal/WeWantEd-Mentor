import React, { Component } from 'react';
import { Text, Button, View, Image, Alert, StyleSheet } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';


export default class ProfilDuzenle extends Component {
  static navigationOptions = {
    title: 'Profil Duzenle',
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
      email: this.props.navigation.getParam("email"),
      parola:'',
      tparola:'',
      ad:'',
      soyad:'',
      tanım:'',
      okul_no:'',
      bolum:'',
      foto:'',
      github:'',
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
 /* componentDidMount() {
    this.getPermissionAsync();
    
   // Received Student Details Sent From Previous Activity and Set Into State.
  /* this.setState({ 
    email : this.props.navigation.state.params.email,
    parola: this.props.navigation.state.params.parola,
    ad: this.props.navigation.state.params.ad,
    soyad: this.props.navigation.state.params.soyad,
    tanım: this.props.navigation.state.params.tanım,
    okul_no: this.props.navigation.state.params.okul_no,
    bolum: this.props.navigation.state.params.bolum,
    foto: this.props.navigation.state.params.foto,
    github: this.props.navigation.state.params.github
  })
    
  }*/

  componentDidMount() {
    this.setState({
      email: this.props.navigation.getParam('email'),
      ad: this.props.navigation.getParam('ad'),
      soyad: this.props.navigation.getParam('soyad'),
      foto: this.props.navigation.getParam('foto'),
      bolum: this.props.navigation.getParam('bolum'),
      tanım: this.props.navigation.getParam('tanım'),
      github: this.props.navigation.getParam('github'),
      parola: this.props.navigation.getParam('parola'),
      okul_no: this.props.navigation.getParam('okul_no'),
      });
}
  guncelle = () => {
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
   else if(this.state.parola !== this.state.tparola){
     Aler.alert("Şifeler uyuşmuyor");
   }
   else{
 this.setState({ loading: true, disabled: true }, () => {
   console.log(this.state.email)
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
          github: this.state.github
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          alert(responseJson);
        })
        .catch(error => {
          console.error(error);
        });
    });}
  };

  handleCustomIndexSelect = index => {
    this.setState(prevState => ({ ...prevState, customStyleIndex: index }));
  };

  render() {
       
    const {navigation} = this.props.navigation;
    const email = this.props.navigation.getParam('email','email');
    const ad = this.props.navigation.getParam('ad','ad');
    const soyad = this.props.navigation.getParam('soyad','soyad');
    const foto = this.props.navigation.getParam('foto','foto');
    const bolum = this.props.navigation.getParam('bolum','bolum');
    const github = this.props.navigation.getParam('github','github');
    console.log("ad:", ad);
    console.log("email:", email);
    const { customStyleIndex } = this.state;
    return (
      <ScrollView style={{ height: '100%' }}>
        <View backgroundColor="#000">

          <View style={styles.container}>
            <SegmentedControlTab
              values={['1.Adım', '2.Adım', '3.Adım', '4.Adım']}
              selectedIndex={customStyleIndex}
              onTabPress={this.handleCustomIndexSelect}
              borderRadius={0}
              tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
              tabStyle={{
                backgroundColor: '#3D3D3D',
                borderWidth: 0,
                borderColor: 'transparent'
              }}
              activeTabStyle={{ backgroundColor: '#242424' }}
              tabTextStyle={{ color: '#fff', fontWeight: 'bold' }}
              activeTabTextStyle={{ color: '#fff' }}
            />
            {customStyleIndex === 0 && (
              <View style={styles.indexContainer}>
                <Text style={styles.titleText}>
                  Giriş Bilgilerinizi Belirleyiniz
                </Text>
                <View>
                  <TextInput
                    value={this.state.email}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Mail adresiniz"
                    headerTintColor="#fff"
                    onChangeText={email => this.setState({ email: email })}
                  ></TextInput>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Parolanızı yazınız"
                    headerTintColor="#fff"
                    secureTextEntry
                    onChangeText={parola => this.setState({ parola: parola })}
                  ></TextInput>

                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Parola tekrarı"
                    headerTintColor="#fff"
                    secureTextEntry
                    onChangeText={parola => this.setState({ tparola: parola })}
                  ></TextInput>
                </View>
              </View>
            )}

            {customStyleIndex === 1 && (
              <View style={styles.indexContainer}>
                <Text style={styles.titleText}>
                  Kişisel Bilgilerinizi Giriniz
                </Text>
                <View>
                  <TextInput
                    value={this.state.ad}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Adınız "
                    headerTintColor="#fff"
                    onChangeText={ad => this.setState({ ad: ad })}
                  ></TextInput>
                </View>
                <View>
                  <TextInput
                    value={this.state.soyad}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Soyadınız "
                    headerTintColor="#fff"
                    onChangeText={soyad => this.setState({ soyad: soyad })}
                  ></TextInput>
                </View>

                <Textarea
                  value={this.state.tanım}
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={tanım => this.setState({ tanım: tanım })}
                  defaultValue={this.state.text}
                  maxLength={120}
                  placeholder={'Kendinizi kısaca tanıtınız..'}
                  placeholderTextColor={'#fff'}
                  underlineColorAndroid={'transparent'}
                />
              </View>
            )}

            {customStyleIndex === 2 && (
              <View style={styles.indexContainer}>
                <Text style={styles.titleText}>
                  Üniversite bilgilerinizi Giriniz
                </Text>

                <View>
                  <TextInput
                    value={this.state.okul_no}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Okul numaranız "
                    headerTintColor="#fff"
                    onChangeText={okul_no => this.setState({ okul_no: okul_no })}
                  ></TextInput>
                </View>
                <TextInput
                  value={this.state.bolum}
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder="Okul Bölümünüzü Giriniz.. "
                  headerTintColor="#fff"
                  onChangeText={bolum => this.setState({ bolum: bolum })}
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
              </View>
            )}
            {customStyleIndex === 3 && (
              <View style={styles.indexContainer}>
                <Text style={styles.titleText}>
                  Sosyal Medya Linklerinizi Giriniz
                </Text>

                <View>
                  <TextInput
                    value={this.state.github}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Github kullanıcı adınız"
                    headerTintColor="#fff"
                    onChangeText={github => this.setState({ github: github })}
                  ></TextInput>
                </View>

                <TouchableOpacity style={styles.button}
                  full
                  rounded
                  onPress={this.guncelle}
                >
                  <Text style={{ color: '#fff', fontWeight: '500' }}>
                    Güncelle
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 600,
    backgroundColor: '#171818'
  },
  titleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 24,
    marginLeft: 0
  },
  image: {
    height: 75,
    width: 300,
    marginTop: 70,
    marginLeft: 50
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
    backgroundColor: '#171818'
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#fff',
    marginTop: 10,
    backgroundColor:'#171818'
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase'
  },
  parola: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 125,
    fontSize: 15,
    color: '#161F3D',
    marginTop: 10,
    marginLeft: 50
  },
  button: {
    backgroundColor: '#ff6f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 40
  }
});