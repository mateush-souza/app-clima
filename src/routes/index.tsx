import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ClimaScreen from "../screens/ClimaScreen";

export type RootStackParamList = {
  Home: undefined;
  Clima: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        id={undefined}
        screenOptions={{
          headerShown: false
        }}
      >
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Clima" component={ClimaScreen} />
      </Navigator>
    </NavigationContainer>
  )
}