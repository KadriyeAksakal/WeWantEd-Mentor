import React, { Component } from 'react';
import { Text, Button, View, Image, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class KursDetay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      disabled: false,
      id: this.props.navigation.getParam('id'),
      data: [],
      kurs_acan: '',
      ders_adi: '',
    };
  }
  kursInfo() {
    console.log("id",this.state.data.id);
    fetch('http://192.168.89.2/wewanted/course_detail.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          disabled: false,
          data: responseJson[0],
          kurs_acan: responseJson[0].mentoremail,
          ders_adi: responseJson[0].adi
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false, disabled: false });
      });
  }
  
  componentDidMount() {
    this.kursInfo();
  }
  static getDerivedStateFromProps(props, state) {
    const id = props.navigation.getParam('id');
    if (state.id !== id) {
      return {
        id: id,
      };
    }
    return null;
  }
 
  render() {
    {
      this.kursInfo();
    }
    return (
      <ScrollView style={{ height: '100%', backgroundColor: '#000' }}>
        <View style={{ padding: 10 }}>
          <Image style={styles.image} source={{ uri: this.state.data.foto }} />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'center'
            }}
          >
            <View style={{ width: 100 }}>
              <Text style={styles.Infotext}>Kurs Adı</Text>
              <Text style={styles.Infotext}>Sure</Text>
              <Text style={styles.Infotext}>Kontenjan</Text>
              <Text style={styles.Infotext}>Yer</Text>
              <Text style={styles.Infotext}>Materyal</Text>
              <Text style={styles.Infotext}>Tarih</Text>
              <Text style={styles.Infotext}>Konu</Text>
              <Text style={styles.Infotext}>Kurs Açan</Text>
            </View>
            <View
              style={{ width: 150, backgroundColor: '#555', marginBottom: 10 }}
            >
              <Text style={styles.Infotext}>{this.state.data.adi}</Text>
              <Text style={styles.Infotext}>{this.state.data.sure}</Text>
              <Text style={styles.Infotext}>{this.state.data.kontenjan}</Text>
              <Text style={styles.Infotext}>{this.state.data.yer}</Text>
              <Text style={styles.Infotext}>{this.state.data.materyal}</Text>
              <Text style={styles.Infotext}>{this.state.data.tarih}</Text>

              <ScrollView>
                <Text style={styles.Infotext}>{this.state.data.konu}</Text>
              </ScrollView>
              <Text style={styles.Infotext}>{this.state.data.mentoremail}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 600,
    backgroundColor: '#171818'
  },
  image: {
    height: 150,
    width: 150,
    marginTop: 20,
    flex: 1,
    alignSelf: 'center'
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 200,
    marginLeft: 15,
    fontSize: 15,
    color: '#fff',
    marginTop: 10
  },

  button: {
    backgroundColor: '#ff6f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    height: 40
  },
 
  Infotext: {
    color: '#fff',
    marginTop: 30
  }
});