/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { WelcomeScreen, DemoScreen, DemoListScreen, LoginScreen, HomeScreen, SatwaScreen } from "../screens"
import { navigationRef } from "./navigation-utilities"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { color } from "../theme";
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  login: undefined
  home: undefined
  satwa: undefined
  welcome: undefined
  demo: undefined
  demoList: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()
const Tab = createMaterialBottomTabNavigator()

const dasboard = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#FAFAFA' }}
      shifting={false}
      activeColor={color.palette.primary}
      inactiveColor={color.palette.primary}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Icofont name="home" color={color} size={26} />
        )
      }} />
      <Tab.Screen name="Form" component={HomeScreen} options={{
        tabBarLabel: 'Form',
        tabBarIcon: ({ color }) => (
          <Icofont name="view-compact" color={color} size={26} />
        )
      }} />
      <Tab.Screen name="Histori" component={HomeScreen} options={{
        tabBarLabel: 'Histori',
        tabBarIcon: ({ color }) => (
          <Icofont name="calendar-check-outline" color={color} size={26} />
        )
      }} />
      <Tab.Screen name="Account" component={HomeScreen} options={{
        tabBarLabel: 'Saya',
        tabBarIcon: ({ color }) => (
          <Icofont name="account-circle-outline" color={color} size={26} />
        )
      }} />
    </Tab.Navigator>
  );
}

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={dasboard} />
      <Stack.Screen name="satwa" component={SatwaScreen} />
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demoList" component={DemoListScreen} />
    </Stack.Navigator>
  )
}

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = observer((props: NavigationProps) => {
  const colorScheme = useColorScheme()
  const { authenticationStore } = useStores()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {authenticationStore.isAuthenticated ?
        <AppStack />
        :
        <LoginStack />
      }
    </NavigationContainer>
  )
});

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
