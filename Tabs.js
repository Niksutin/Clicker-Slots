import React from 'react';
import SlotMachineScreen from './SlotMachineScreen';
import ClickerScreen from './ClickerScreen';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { Text } from 'react-native';

const Tabs = createBottomTabNavigator({
  SlotMachine: {
    screen: SlotMachineScreen,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
        <Text>Slots</Text>
      )
  })
  },
  Clicker: {
    screen:  ClickerScreen,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
        <Text>Clicks</Text>
      )
  })
  },
});

export default createAppContainer(Tabs);