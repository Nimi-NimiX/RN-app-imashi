import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BudgetView from './src/views/Budget';
import Transactions from './src/views/Transactions';
import Overview from './src/views/Overview';
import Profile from './src/views/Profile';
import { GlobalStyles } from './src/constants/styles';

const Stack = createNativeStackNavigator(); 
const Tab = createBottomTabNavigator();

function BottomNavBar() {
  return (
    <Tab.Navigator initialRouteName='Budget'>
      <Tab.Screen name="Budget" component={BudgetView} />
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name="Overview" component={Overview} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='BottomNavBar'>
          <Stack.Screen name="BottomNavBar" component={BottomNavBar} options={{ headerShown: false}}/> 
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
