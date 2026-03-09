import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Elevation, Fonts, Palette, Radius, Space } from '../constants/design';

const TOPICS = [
  {
    id: 1,
    icon: 'water-outline',
    title: 'Ocean Health',
    subtitle: 'Plastic leakage and acidity are reshaping marine ecosystems.',
    route: 'issues',
  },
  {
    id: 2,
    icon: 'leaf-outline',
    title: 'Forests',
    subtitle: 'Biodiversity-rich forests are under pressure from land conversion.',
    route: 'issues',
  },
  {
    id: 3,
    icon: 'flame-outline',
    title: 'Climate Risk',
    subtitle: 'Heatwaves, floods, and droughts are increasing in intensity.',
    route: 'issues',
  },
];

const STATS = [
  { label: 'Tracked Issues', value: '42+' },
  { label: 'Data Timeline', value: '9 Years' },
  { label: 'Countries', value: '127' },
];

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const riseAnim = useRef(new Animated.Value(18)).current;

  const goTo = (screenName) => {
    if (navigation?.navigate) {
      navigation.navigate(screenName);
      return;
    }
    router.push(`/(tabs)/${screenName}`);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 650, useNativeDriver: true }),
      Animated.timing(riseAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, riseAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Palette.bg} />
      <View pointerEvents="none" style={styles.bgGlowTop} />
      <View pointerEvents="none" style={styles.bgGlowRight} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom + 94,
        }}>
        <Animated.View
          style={[
            styles.header,
            { opacity: fadeAnim, transform: [{ translateY: riseAnim }] },
          ]}>
          <View>
            <Text style={styles.greeting}>Sustainability Dashboard</Text>
            <Text style={styles.title}>EcoAware</Text>
          </View>
          <View style={styles.headerBadge}>
            <Ionicons name="sparkles" size={18} color={Palette.accent} />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.hero,
            { opacity: fadeAnim, transform: [{ translateY: riseAnim }] },
          ]}>
          <View style={styles.heroTopRow}>
            <Text style={styles.heroLabel}>GLOBAL IMPACT OVERVIEW</Text>
            <View style={styles.heroPill}>
              <Ionicons name="trending-up" size={12} color={Palette.accent} />
              <Text style={styles.heroPillText}>Live Insight</Text>
            </View>
          </View>

          <Text style={styles.heroNumber}>127</Text>
          <Text style={styles.heroSub}>countries currently affected by urgent environmental pressure</Text>

          <View style={styles.progressBlock}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Global action progress</Text>
              <Text style={styles.progressPercent}>38%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </Animated.View>

        <View style={styles.statsRow}>
          {STATS.map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Focus Areas</Text>
          <TouchableOpacity onPress={() => goTo('issues')}>
            <Text style={styles.sectionLink}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.topicList}>
          {TOPICS.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              activeOpacity={0.85}
              style={styles.topicCard}
              onPress={() => goTo(topic.route)}>
              <View style={styles.topicIconWrap}>
                <Ionicons name={topic.icon} size={20} color={Palette.accent} />
              </View>
              <View style={styles.topicTextWrap}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicSubtitle}>{topic.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Palette.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.factCard}>
          <Text style={styles.factLabel}>TODAY'S FACT</Text>
          <Text style={styles.factText}>
            About 15 billion trees are cut down yearly, reducing carbon absorption capacity and weakening ecosystems.
          </Text>
          <Text style={styles.factSource}>Source: UNEP</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.primaryAction} onPress={() => goTo('quiz')}>
            <Ionicons name="school-outline" size={18} color={Palette.bg} />
            <Text style={styles.primaryActionText}>Take Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryAction} onPress={() => goTo('videos')}>
            <Ionicons name="play-circle-outline" size={18} color={Palette.textPrimary} />
            <Text style={styles.secondaryActionText}>Watch Videos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.bg,
  },
  bgGlowTop: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(82, 242, 182, 0.08)',
    top: -80,
    left: -60,
  },
  bgGlowRight: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(126, 189, 255, 0.08)',
    top: 120,
    right: -110,
  },
  header: {
    paddingHorizontal: 22,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    color: Palette.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    ...Fonts.title,
    color: Palette.textPrimary,
    marginTop: 4,
  },
  headerBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  hero: {
    marginHorizontal: 16,
    borderRadius: Radius.xl,
    padding: 22,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    ...Elevation.card,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLabel: {
    ...Fonts.label,
    color: Palette.accent,
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.accentSoft,
  },
  heroPillText: {
    color: Palette.accent,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  heroNumber: {
    marginTop: 12,
    color: Palette.textPrimary,
    fontSize: 68,
    fontWeight: '800',
    letterSpacing: -2,
    lineHeight: 74,
  },
  heroSub: {
    color: Palette.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 2,
  },
  progressBlock: {
    marginTop: 18,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressTitle: {
    color: Palette.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  progressPercent: {
    color: Palette.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    borderRadius: 8,
    backgroundColor: '#173029',
    overflow: 'hidden',
  },
  progressFill: {
    width: '38%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: Palette.accent,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 14,
  },
  statCard: {
    flex: 1,
    borderRadius: Radius.md,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    alignItems: 'center',
  },
  statValue: {
    color: Palette.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    marginTop: 5,
    color: Palette.textMuted,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 10,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...Fonts.section,
    color: Palette.textPrimary,
  },
  sectionLink: {
    color: Palette.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  topicList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  topicCard: {
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Elevation.soft,
  },
  topicIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(82, 242, 182, 0.28)',
  },
  topicTextWrap: {
    flex: 1,
  },
  topicTitle: {
    color: Palette.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  topicSubtitle: {
    marginTop: 4,
    color: Palette.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  factCard: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: Radius.lg,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 18,
  },
  factLabel: {
    ...Fonts.label,
    color: Palette.warning,
  },
  factText: {
    marginTop: 8,
    color: Palette.textPrimary,
    fontSize: 14,
    lineHeight: 22,
  },
  factSource: {
    marginTop: 8,
    color: Palette.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  actionsRow: {
    marginTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 10,
  },
  primaryAction: {
    flex: 1.3,
    borderRadius: Radius.md,
    backgroundColor: Palette.accent,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  primaryActionText: {
    color: Palette.bg,
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryAction: {
    flex: 1,
    borderRadius: Radius.md,
    backgroundColor: Palette.surfaceAlt,
    minHeight: 52,
    borderWidth: 1,
    borderColor: Palette.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryActionText: {
    color: Palette.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
});
