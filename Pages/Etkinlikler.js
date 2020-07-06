import React, { Component } from 'react';
import { StyleSheet, View, Text, Image ,SafeAreaView,ScrollView,FlatList} from 'react-native';

import Icon from "react-native-vector-icons/Ionicons"

export default class Etkinlikler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoadingMore: false,
      _data: null,
      _dataAfter: ''
    };
  }
  GetItem(name) {
    Alert.alert(name);
  }
  fetchData = callback => {
    const params =  this.state._dataAfter !== '' ? `&after=${this.state._dataAfter}` : '';
    //Limits fetches to 15 so there's lesser items from the get go
    fetch('http://192.168.89.2/wewanted/activity_list.php')
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
  render() {
    console.log("email",this.state.email)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000"}}>
        <ScrollView>
          <FlatList
            data={this.state._data} //Remove this reference to dataSource
            renderItem={({ item: rowData }) => {
              //Replaces renderRow={rowData => {
              return (
          <View style={styles.MainContainer}>
            <View style={styles.box}>
              <Image
                      source={{
                        uri:
                          rowData.foto === '' || rowData.foto === null
                            ? 'https://via.placeholder.com/70x70.jpg'
                            : rowData.foto
                      }}
                      style={styles.imgContainer}
                style={styles.imgContainer}
              />
              <View style={styles.box2}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={styles.baslik}> {rowData.ad}</Text>
                  <View style={styles.saat}>
                    <Text> {rowData.tarih}{rowData.saat}</Text>
                  </View>
                </View>
                <View style={styles.btn}>
                  <Icon name="md-pin" size={20} color="white"></Icon>
                  <Text
                    style={{ paddingLeft: 5, color: '#DEE7DF', fontSize: 12 }}
                  >
                    {rowData.yer}
                  </Text>
                </View>
              </View>
            </View>
            
          </View>)}}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    flexDirection: "column",
    alignItems: 'center',
    
  },
  box: {
    width: 340,
    height: 140,
    borderRadius: 10,
    borderColor: "#C4C0BC",
    borderWidth: 3,
    padding: 10,
    flexDirection: "row",
    marginTop: 5,
  },
  imgContainer: {
    width: 75,
    height: 115,
    borderRadius: 10,
  },
  baslik:{
    fontSize: 12, color: "#737372", paddingLeft: 10, height: 50, width: 90
  },
  saat:{
    width:140,
    height:40,
    borderRadius: 10,
    borderColor: "#C4C0BC",
    borderWidth:2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#A6CFC1",
    flexDirection:"row"
  },
  
  box2: {
    flexDirection: "column",
  },
  btn: {
    width: 214,
    height: 40,
    color: "#DEE7DF",
    backgroundColor: "#3AA14B",
    marginTop: 10,
    marginStart: 15,
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:5,
    flexDirection:"row",
    fontSize:12
  }
});
