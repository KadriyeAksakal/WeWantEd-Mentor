import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Dimensions} from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

//Sayfaları projeye ekleme
import Anasayfa from './Pages/Anasayfa';
import Profil from './Pages/Profil';
import KursGecmisim from './Pages/KursGecmisim';
import Mentorlar from './Pages/Mentorlar';
import MentorDegisim from './Pages/MentorDegisim';
import JuniorDegisim from './Pages/JuniorDegisim';
import Juniorlar from './Pages/Juniorlar';
import KursiyerIstekleri from './Pages/KursiyerIstekleri';
import JuniorEkle from './Pages/JuniorEkle';
import MentorEkle from './Pages/MentorEkle';
import SideMenu from './SideMenu';
import Register from './Pages/Register';
import Login from './Pages/Login'
import Begin from './Pages/Begin'
import ForgotPassword from './Pages/ForgotPassword'
import Olustur from './Pages/Olustur'
import KursAc from './Pages/KursAc'
import EtkinlikOlustur from './Pages/EtkinlikOlustur'
import ProfilDuzenle from './Pages/ProfilDuzenle'
import KursDetay from './Pages/KursDetay'
import KursAcmaIstegi from './Pages/KursAcmaIstegi'
import Cikis from './Pages/Cikis';

//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./assets/menu2.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

//Stack Navigator for the First Option of Navigation Drawer
const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  Anasayfa: {
    screen: Anasayfa,
    navigationOptions: ({ navigation }) => ({
      title: 'Anasayfa',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />, // icon'un konumunu belirliyoruz
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        flexGrow: 1,
        alignSelf: 'center'
      }
    })
  },
 
});
const KursDetay_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  KursDetay: {
    screen: KursDetay,
    navigationOptions: ({ navigation }) => ({
      title: 'KursDetay',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});

//Stack Navigator for the Second Option of Navigation Drawer
const Profil_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  Profil: {
    screen: Profil,
    navigationOptions: ({ navigation }) => ({
      title: 'Profil',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black'
    })
  }
});
const ProfilDuzenle_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  ProfilDuzenle: {
    screen: ProfilDuzenle,
    navigationOptions: ({ navigation }) => ({
      title: 'Profil Duzenle',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black'
    })
  }
});

//Stack Navigator for the Third Option of Navigation Drawer
const KursGecmisim_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  KursGecmisim: {
    screen: KursGecmisim,
    navigationOptions: ({ navigation }) => ({
      title: 'Kurs Geçmişim',
      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black',
      
    })
  }
});
const Mentorlar_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Mentorlar: {
    screen: Mentorlar,
    navigationOptions: ({ navigation }) => ({
      title: 'Mentorlar',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black'
    })
  }
});
const MentorEkle_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  MentorEkle: {
    screen: MentorEkle,
    navigationOptions: ({ navigation }) => ({
      title: 'Mentor Ekle',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black'
    })
  }
});
const Juniorlar_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Juniorlar: {
    screen: Juniorlar,
    navigationOptions: ({ navigation }) => ({
      title: 'Juniorlar',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black'
    })
  }
});
const JuniorEkle_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  JuniorEkle: {
    screen: JuniorEkle,
    navigationOptions: ({ navigation }) => ({
      title: 'Junior Ekle',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black'
    })
  }
});
const KursiyerIstekleri_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  KursiyerIstekleri: {
    screen: KursiyerIstekleri,
    navigationOptions: ({ navigation }) => ({
      title: 'Kursiyer Istekleri',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black'
    })
  }
});
const JuniorDegisim_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  JuniorDegisim :{
    screen: JuniorDegisim,
    navigationOptions: ({ navigation }) => ({
      title: 'Junior Degisim',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black'
    })
  }
});
const Olustur_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Olustur: {
    screen: Olustur,
    navigationOptions: ({ navigation }) => ({
      title: 'Oluştur',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black'
    })
  }
});

const KursAc_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  KursAc: {
    screen: KursAc,
    navigationOptions: ({ navigation }) => ({
      title: 'Kurs Oluştur',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black'
    })
  }
});

const EtkinlikOlustur_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  EtkinlikOlustur: {
    screen: EtkinlikOlustur,
    navigationOptions: ({ navigation }) => ({
      title: 'Etkinlik Olustur',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03'
      },
      headerTintColor: 'black'
    })
  }
});
const MentorDegisim_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  MentorDegisim: {
    screen: MentorDegisim,
    navigationOptions: ({ navigation }) => ({
      title: 'Mentor Degisim',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#ff6f00',
      },
      headerTintColor: 'black',
    }),
  },
});
const KursAcmaIstegi_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  KursAcmaIstegi: {
    screen: KursAcmaIstegi,
    navigationOptions: ({ navigation }) => ({
      title: 'Kurs Acma Istegi',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});

const Cikis_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Cikis: {
    screen: Cikis,
    navigationOptions: ({ navigation }) => ({
      title: 'Cıkış',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});


//Drawer Navigator for the Navigation Drawer / Sidebar
const Drawer = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    NavAnasayfa: { screen: FirstActivity_StackNavigator },
    ProfilScreen: { screen: Profil_StackNavigator },
    ProfilDuzenleScreen: { screen: ProfilDuzenle_StackNavigator },
    KursGecmisimScreen: { screen: KursGecmisim_StackNavigator },
    MentorlarScreen: { screen: Mentorlar_StackNavigator },
    MentorEkleScreen: {screen: MentorEkle_StackNavigator},
    JuniorlarScreen: { screen: Juniorlar_StackNavigator },
    KursiyerIstekleriScreen: { screen: KursiyerIstekleri_StackNavigator },
    JuniorEkleScreen: { screen: JuniorEkle_StackNavigator },
    OlusturScreen:{screen: Olustur_StackNavigator},
    KursAcScreen:{screen: KursAc_StackNavigator},
    KursDetayScreen:{screen: KursDetay_StackNavigator},
    EtkinlikOlusturScreen:{screen: EtkinlikOlustur_StackNavigator},
    JuniorDegisimScreen:{screen: JuniorDegisim_StackNavigator},
    MentorDegisimScreen:{screen: MentorDegisim_StackNavigator},
    KursAcmaIstegiScreen: {screen: KursAcmaIstegi_StackNavigator},
    Cikis: {screen: Cikis_StackNavigator},
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 100
  }
);
const screens =createStackNavigator({
  Begin: { screen: Begin },
  Login: { screen: Login },
  Register: { screen: Register },
  ForgotPassword: { screen: ForgotPassword},
  initialRouteName: 'Begin'
});


const MainApp =createSwitchNavigator({
  app:Drawer,
  auth: screens
},{
  initialRouteName: 'auth'
})

const AppContainer= createAppContainer(MainApp);

export default class App extends Component{
  render(){
   
    return(
      <AppContainer/>
    )
  }
}