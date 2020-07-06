import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet,Image,SafeAreaView,FlatList } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"

export default class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      no: '',
      email: this.props.navigation.getParam('email'),
      data: null,
      ad: '',
      soyad: '',
      foto: '',
      parola: '',
      bolum: '',
      tanım: '',
      okul_no: '',
      github: '',
      id: ''
    };
    
   

    this.options1 = [
      // junior icin slide menu
      { secondaryHeading: 'Anasayfa', navigationPath: 'Anasayfa', icon: 'md-home' },
      { secondaryHeading: 'Profil', navigationPath: 'Profil', icon: 'md-person' },
      { secondaryHeading: 'Kurs Geçmişim', navigationPath: 'KursGecmisim', icon: 'md-clipboard' },
      { secondaryHeading: 'Mentorlar', navigationPath: 'Mentorlar', icon: 'md-people' },
      { secondaryHeading: 'Juniorlar', navigationPath: 'Juniorlar', icon: 'md-people' },
      { secondaryHeading: 'Cıkış', navigationPath: 'Cikis', icon: 'md-log-out' }

    ];
    this.options2 = [ //mentor icin slide menu
      {  secondaryHeading: 'Anasayfa', navigationPath: 'Anasayfa', icon: "md-home" },
      {  secondaryHeading: 'Profil', navigationPath: 'Profil', icon: "md-person" },
      { secondaryHeading: 'Kurs Geçmişim', navigationPath: 'KursGecmisim', icon: "md-clipboard" },
      {  secondaryHeading: 'Mentorlar', navigationPath: 'Mentorlar', icon: "md-people" },
      { secondaryHeading: 'Juniorlar', navigationPath: 'Juniorlar', icon: "md-people" },
      { secondaryHeading: 'Kursiyer İstekleri', navigationPath: 'KursiyerIstekleri', icon: "md-person-add" },
      { secondaryHeading: 'Junior ekle', navigationPath: 'JuniorEkle', icon: "md-add" },
      { secondaryHeading: 'Kurs Olustur', navigationPath: 'KursAc', icon: 'md-add' },
      { secondaryHeading: 'Etkinlik Olustur', navigationPath: 'EtkinlikOlustur', icon: 'md-add' },
      {  secondaryHeading: 'Cıkış', navigationPath: 'Cikis', icon: "md-log-out" },

    ];
    this.options3 = [ // admin icin slide menu
      { secondaryHeading: 'Anasayfa', navigationPath: 'Anasayfa', icon: "md-home" },
      { secondaryHeading: 'Profil', navigationPath: 'Profil', icon: "md-person" },
      { secondaryHeading: 'Mentor Degisim', navigationPath: 'MentorDegisim', icon: "md-people" },
      { secondaryHeading: 'Junior Degisim', navigationPath: 'JuniorDegisim', icon: "md-people" },
      { secondaryHeading: 'Kurs İstekleri', navigationPath: 'KursAcmaIstegi', icon: "md-person-add" },
      { secondaryHeading: 'Cıkış', navigationPath: 'Cikis', icon: "md-log-out" },

    ];
  }

  fetchData = (callback) => {
    fetch('http://192.168.89.2/wewanted/user_profile.php', {
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
      .then(callback)
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.fetchData((responseJson) => {
      const data = responseJson;
      const ad = data[0].ad;
      const soyad = data[0].soyad;
      const email = data[0].email;
      const foto = data[0].foto;
      const no = data[0].no;
      const bolum = data[0].bolum;
      const tanım = data[0].tanim;
      const github = data[0].github;
      const parola = data[0].parola;
      const okul_no = data[0].okul_no;
      const id = data[0].id;
      this.setState({
        email: email,
        no: no,
        isLoading: false,
        data: data,
        ad: ad,
        soyad: soyad,
        foto: foto,
        no: no,
        bolum: bolum,
        tanım: tanım,
        github: github,
        parola: parola,
        okul_no: okul_no,
        id: id,
        _dataAfter: responseJson,
      });
    });
  }

  navigateToScreen = (route) => () => {
    this.props.navigation.navigate(route, {
      ad: this.state.ad,
      soyad: this.state.soyad,
      foto: this.state.foto,
      email: this.state.email,
      parola: this.state.parola,
      bolum: this.state.bolum,
      okul_no: this.state.okul_no,
      github: this.state.github,
      tanım: this.state.tanım,
      id: this.state.id,
    });
  };
 

  pages1(){
    return(
      this.options1.map((option, key) => (
          <View style={styles.secondaryHeading} key={key}>
            <Icon name={option.icon} color="white" size={20} />
            <Text
              style={{ color: 'white', paddingStart: 30 }}
              onPress={this.navigateToScreen(option.navigationPath)}
            >
              {option.secondaryHeading}
            </Text>
          </View> 
    )))
    }
  
  pages2(){
    return (
      this.options2.map((option2, key) => (
        <View style={styles.secondaryHeading} key={key}>
          <Icon name={option2.icon} color="white" size={20} />
          <Text
            style={{ color: 'white', paddingStart: 30 }}
            onPress={this.navigateToScreen(option2.navigationPath)}
          >
            {option2.secondaryHeading}
          </Text>
        </View>
      )))
  }
  pages3() {
    return (
      this.options3.map((option3, key) => (
        <View style={styles.secondaryHeading} key={key}>
          <Icon name={option3.icon} color="white" size={20} />
          <Text
            style={{ color: 'white', paddingStart: 30 }}
            onPress={this.navigateToScreen(option3.navigationPath)}
          >
            {option3.secondaryHeading}
          </Text>
        </View>
      )))
  }
  render() { 
    console.log("email",this.state.email); 
    return ( 
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000"}}>
        <ScrollView>
              <View style={styles.container}>
             <Image 
              source={require('./images/LOGO1.png')}
              style={styles.logoImgContainer}
            />
            <View style={styles.profileContainer}>
              <Image
                source={{
                  uri:
                    this.state.foto === '' || this.state.foto === null
                      ? 'https://via.placeholder.com/70x70.jpg'
                      : this.state.foto
                }}
                style={styles.profileImg}
              />
              <View style={styles.profileText}>
                <Text style={{ color: 'white', fontSize: 24 }}> {this.state.ad} </Text> 
                <Text style={{ color: 'white', fontSize: 14 }}> {this.state.email} </Text>
              </View>
            </View>
         
            {this.state.no == "1" ? this.pages1(): null}
            {this.state.no == "2" ? this.pages2() : null}
            {this.state.no == "3" ? this.pages3() : null}
</View>
          
   </ScrollView>
   </SafeAreaView>
   
    
    );
  }
}



const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#181818',
    color: 'white',
    paddingBottom:400
  },
  logoImgContainer:{
    flex:1,
    margin:15,
    width:239,
    height:58,
    paddingTop: 20,

  },
  profileContainer: {
    flex: 1,
    paddingLeft:20,
    paddingTop:15,
    flexDirection:"row",
    paddingBottom:50

  },
  profileImg: {
    borderRadius: 40,
    height: 90,
    width: 90,
    borderWidth: 1,
    marginLeft: 15,
  },
  profileText: {
    width:150,
    height:20,
    color: 'white',
    margin:10,
    flexDirection:"column",
  },
  secondaryHeading: {
    paddingTop:20,
    paddingLeft:30,
    flexDirection:"row"
  }
});

