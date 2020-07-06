import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';




export default class Mentorlar extends Component {
  static navigationOptions =  ({navigation}) =>({
    title: 'Mentorlar',
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTintColor: '#fff'
  });


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoadingMore: false,
      _data: null,
      _dataAfter: '',
      
    }
  }



fetchData = callback => {
  const params =
    this.state._dataAfter !== '' ? `&after=${this.state._dataAfter}` : '';
  //Limits fetches to 15 so there's lesser items from the get go
  fetch('http://192.168.89.2/wewanted/mentor_list.php')
    .then(response => response.json())
    .then(callback)
    .catch(error => {
      console.error(error);
    });
};

componentDidMount() {
  this.fetchData(responseJson => {
    const data = responseJson;
    this.setState({
      isLoading: false,
      _data: data,
      _dataAfter: responseJson
    });
  });
}

navigateToScreen = route => () => {
  this.props.navigation.navigate(route, {
    id:this.state.id,
    foto:this.state.foto,
    no: this.state.no,
    email: this.state.email,
    ad: this.state.ad,
    soyad: this.state.soyad,
    tanım:this.state.tanım,
    okul_no: this.state.okul_no,
    bolum: this.state.bolum,
    github: this.state.github,
  
  });
};

render() {
  if (this.state._data == "") {//çalışmadığı zamnalarda
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView>
        <Text>Mentor Bulunmamaktadır.</Text>
      </ScrollView>
    </SafeAreaView>
  }
  else {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000"}}>
      <ScrollView>
        <FlatList
          data={this.state._data} //Remove this reference to dataSource
          renderItem={({ item: rowData }) => {
            //Replaces renderRow={rowData => {
            return (
          <View style={styles.MainContainer}>
            <View style={styles.secondaryContainer}>
              <Image
                    source={{
                      uri:
                        rowData.foto === '' || rowData.foto === null
                          ? 'https://via.placeholder.com/70x70.jpg'
                          : rowData.foto
                    }}
                style={styles.imgContainer}
              />
              <View style={styles.secondaryContainer2}>
                <View style={{flexDirection:'row'}}>
                <Text
                  style={styles.rowData}
                >
                 {rowData.ad}
                </Text>
                <Text
                  style={styles.rowData}
                >
                 {rowData.soyad}
                </Text>
                </View>
                <Text
                 style={styles.rowData}
                >
                 {rowData.bolum}
                </Text>
              </View>
            </View>
            
          </View> )}}
          />
      </ScrollView>
    </SafeAreaView>
  );
}}
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
  },
  secondaryContainer: {
    width: 400,
    height: 130,
    borderRadius: 10,
    borderColor: '#C4C0BC',
    borderWidth: 3,
    padding: 15,
    flexDirection: 'row',
    marginTop: 5
  },
  imgContainer: {
    width: 95,
    height: 95,
    borderRadius: 10
  },
  secondaryContainer2: {
    flex: 1,
    flexDirection: 'column',
    marginTop:15,
    marginLeft: 20
  },
  btn: {
    width: 80,
    height: 40,
    color: '#f18d03',
    backgroundColor: '#f18d03',
    marginTop: 10,
    marginStart: 58,
    paddingLeft: 19,
    paddingTop: 10,
    borderRadius: 5
  },
  rowData:{
    fontSize: 18,
    color: '#737372', 
    paddingStart: 10 
  }
});
