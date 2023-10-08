import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BudgetView from "./src/views/Budget";
import Transactions from "./src/views/Transactions";
import MainComponent from "./src/views/Test"
import Overview from "./src/views/Overview";
import Profile from "./src/views/Profile";
import { GlobalStyles } from "./src/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "./src/store/store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavBar() {
  return (
    <Tab.Navigator
      initialRouteName="Budget"
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary.main },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary.main },
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: GlobalStyles.colors.other.textP,
      }}
    >
      <Tab.Screen
        name="Budget"
        component={BudgetView}
        options={{
          title: "Monthly Budget",
          tabBarLabel: "Budget",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={MainComponent}
        options={{
          title: "All Transactions",
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={{
          title: "Overview",
          tabBarLabel: "Overview",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="BottomNavBar">
            <Stack.Screen
              name="BottomNavBar"
              component={BottomNavBar}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </Provider>
  );
}
