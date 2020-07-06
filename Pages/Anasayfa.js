import React from "react";
import {Image} from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"
import KurslarScreen from "./Kurslar";
import EtkinliklerScreen from "./Etkinlikler";

const TabScreen = createBottomTabNavigator(
  {
    Kurslar: { screen: KurslarScreen,
                navigationOptions: ({ navigation }) => ({
                  color:"#020505",
                  tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="md-bookmarks" color={tintColor} size={25} />
                  )
                }),  
              },
    Etkinlikler: { screen: EtkinliklerScreen,
                    navigationOptions: ({ navigation }) => ({
                      color:"#020505",
                      tabBarIcon: ({ tintColor }) => (
                        <Ionicons name="md-calendar" color={tintColor} size={25} />
                      )
                    }), 
                  },
      
  },
  {
    initialRouteName: "Kurslar",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      labelStyle: { fontWeight: "bold" },
      inactiveTintColor: '#fff',
      activeTintColor: '#FF9800',
      style: { backgroundColor: '#000', color:"#020505"}
    }
  }
  
);

//making a StackNavigator to export as default
const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
      color:"#020505"
    }),  
  },
});

export default createAppContainer(App);