import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import IssuesScreen from './screens/IssuesScreen';
import VideoScreen from './screens/VideoScreen';
import QuizScreen from './screens/QuizScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0a1a0e',
            borderTopColor: '#1a3a20',
            borderTopWidth: 1,
            height: 65,
            paddingBottom: 10,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#5dffb0',
          tabBarInactiveTintColor: '#3a5a42',
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
            letterSpacing: 0.3,
          },
        }}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{ tabBarIcon: () => <Text style={{ fontSize: 18 }}>🏠</Text>, tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="issues"
          component={IssuesScreen}
          options={{ tabBarIcon: () => <Text style={{ fontSize: 18 }}>🌍</Text>, tabBarLabel: 'Issues' }}
        />
        <Tab.Screen
          name="videos"
          component={VideoScreen}
          options={{ tabBarIcon: () => <Text style={{ fontSize: 18 }}>▶️</Text>, tabBarLabel: 'Videos' }}
        />
        <Tab.Screen
          name="quiz"
          component={QuizScreen}
          options={{ tabBarIcon: () => <Text style={{ fontSize: 18 }}>🧠</Text>, tabBarLabel: 'Quiz' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
