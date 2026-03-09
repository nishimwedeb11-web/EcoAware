import { useNavigation } from 'expo-router';
import HomeScreen from '@/screens/HomeScreen';

export default function HomeTabRoute() {
  const navigation = useNavigation();

  return <HomeScreen navigation={navigation} />;
}
