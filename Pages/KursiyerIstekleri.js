import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableHighlight, Alert, ScrollView, } from 'react-native';
import PropTypes from 'prop-types';

class Selected_Items_Array {
  constructor() {
    selectedItemsArray = [];
  }

  pushItem(option) {
    selectedItemsArray.push(option);
  }

  getArray() {
    return selectedItemsArray;
  }
}

class Checkbox extends Component {
  constructor() {
    super();

    this.state = { checked: null };
  }

  componentWillMount() {
    if (this.props.checked) {
      this.setState({ checked: true }, () => {
        this.props.selectedArrayObject.pushItem({
          key: this.props.keyValue,
          label: this.props.label,
          value: this.props.value,
        });
      });
    } else {
      this.setState({ checked: false });
    }
  }

  toggleState(key, label, value) {
    this.setState({ checked: !this.state.checked }, () => {
      if (this.state.checked) {
        this.props.selectedArrayObject.pushItem({
          key: key,
          label: label,
          value: value,
        });
      } else {
        this.props.selectedArrayObject.getArray().splice(
          this.props.selectedArrayObject
            .getArray()
            .findIndex((x) => x.key == key),
          1
        );
      }
    });
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.toggleState.bind(
          this,
          this.props.keyValue,
          this.props.label,
          this.props.value
        )}
        underlayColor="transparent"
        style={{ marginVertical: 10 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: this.props.size,
              height: this.props.size,
              backgroundColor: this.props.color,
              padding: 3,
            }}
          >
            {this.state.checked ? (
              <View style={styles.checkedView}>
                <Image
                  source={require('../assets/checkbox.png')}
                  style={styles.checkBoxImg}
                />
              </View>
            ) : (
              <View style={styles.uncheckedView} />
            )}
          </View>

          <Text
            style={[styles.checkBoxLabelText, { color: this.props.labelColor }]}
          >
            {this.props.label}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class PRNRadioForm extends Component {
  constructor() {
    super();

    selectedArrayOBJ = new Selected_Items_Array();
    this.state = {
      gelisjuniorlartiriciler: '',
      selectedItems: '',
    };
  }
  getSelectedItems = () => {
    if (selectedArrayOBJ.getArray().length == 0) {
      Alert.alert('No Items Selected!');
    } else {
      // console.log(selectedArrayOBJ.getArray().map(item => item.label).join());

      this.setState({
        selectedItems: selectedArrayOBJ
          .getArray()
          .map((item) => item.value)
          .join(),
      });
      fetch('http://192.168.89.2/wewanted/accept_person.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          juniorlar: this.state.selectedItems,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson === 'Success') {
            Alert.alert('işlem başarılı.');
            window.location.reload(false);
          } else {
            Alert.alert('Hata!Lütfen tekrar deneyiniz');
            window.location.reload(false);
          }
        })
        .catch((error) => {
          Alert.alert('Hata');
          window.location.reload(false);
        });
    }
  };
  verigetir() {
    fetch('http://192.168.89.2/wewanted/person_list.php')
      .then((response) => response.json())
      .then((rs) => {
        this.setState({
          juniorlar: rs,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.verigetir();
  }

  render() {
    this.verigetir();

    return (
      <ScrollView style={styles.main}>
        <FlatList
          data={this.state.juniorlar} //Remove this reference to dataSource
          renderItem={({ item: rowData }) => {
            //Replaces renderRow={rowData => {
            return (
              <Checkbox
                size={30}
                keyValue={1}
                selectedArrayObject={selectedArrayOBJ}
                checked={false}
                color="#40bf45"
                labelColor="#fff"
                label={rowData.email}
                value={rowData.email}
              />
            );
          }}
        />
        <TouchableHighlight
          underlayColor="#DEE7DF"
          style={styles.Button}
          onPress={this.getSelectedItems}
        >
          <Text style={styles.selectedItemsButton_Text}>İstekleri Kabul Et</Text>
        </TouchableHighlight>

        <Text style={{ fontSize: 20, color: '#000', marginTop: 20 }}>
          {this.state.selectedItems}
        </Text>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: '#000',
    padding: 20,
  },
    Button: {
    marginTop: 25,
    padding: 8,
    backgroundColor: '#40bf45',
    alignSelf: 'stretch',
  },

  selectedItemsButton_Text: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'stretch',
    fontSize: 18,
  },

  checkedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkBoxImg: {
    height: '80%',
    width: '80%',
    tintColor: 'white',
    resizeMode: 'contain',
  },

  uncheckedView: {
    flex: 1,
    backgroundColor: 'white',
  },

  checkBoxLabelText: {
    fontSize: 16,
    paddingLeft: 10,
  },
});
(Checkbox.propTypes = {
  size: PropTypes.number,
  keyValue: PropTypes.number.isRequired,
  selectedArrayObject: PropTypes.object.isRequired,
  color: PropTypes.string,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
}),
  (Checkbox.defaultProps = {
    size: 30,
    color: '#40bf45',
    labelColor: '#40bf45',
    label: 'Default',
    checked: false,
    value: 'Default',
  });