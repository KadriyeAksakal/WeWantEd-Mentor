import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class Kurslar extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Kurslar',
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
      id:'',
      foto:''
      
    }
  }



fetchData = callback => {
  const params =
    this.state._dataAfter !== '' ? `&after=${this.state._dataAfter}` : '';
  //Limits fetches to 15 so there's lesser items from the get go
  fetch('http://192.168.89.2/wewanted/course_list.php')
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
      foto:this.state.foto
    
    });
  };
  
  render() {
    if (this.state._data == "") {//çalışmadığı zaman
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <ScrollView>
          <Text>Açılmış Kurs Bulunmamaktadır.</Text>
        </ScrollView>
      </SafeAreaView>
    }
    else {
      console.log("id",this.state.id)
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
                  <Text
                    style={{ fontSize: 18, color: '#737372', paddingStart: 10 }}
                  >
                   {rowData.adi}
                  </Text>
                  <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('KursDetay')}>
                    <Text>Detay</Text>
                  </TouchableHighlight>
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
    alignItems: 'center'
  },
  secondaryContainer: {
    width: 270,
    height: 130,
    borderRadius: 10,
    borderColor: '#C4C0BC',
    borderWidth: 3,
    padding: 10,
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
    flexDirection: 'column'
  },
  button: {
    width: 80,
    height: 40,
    color: '#f18d03',
    backgroundColor: '#f18d03',
    marginTop: 10,
    marginStart: 58,
    paddingLeft: 19,
    paddingTop: 10,
    borderRadius: 5
  }
});
