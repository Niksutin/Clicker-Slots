import SlotMachineScreen from './SlotMachineScreen';
import ClickerScreen from './ClickerScreen';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

const Tabs = createBottomTabNavigator({
  SlotMachine: {
    screen: SlotMachineScreen,
  },
  Clicker: {
    screen:  ClickerScreen,
  },
});

export default createAppContainer(Tabs);