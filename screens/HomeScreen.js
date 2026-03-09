import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Animated
} from 'react-native';
import { useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TOPICS = [
  { id: 1, emoji: '🌊', label: 'Ocean' },
  { id: 2, emoji: '🌳', label: 'Forests' },
  { id: 3, emoji: '🌡️', label: 'Climate' },
  { id: 4, emoji: '🦁', label: 'Wildlife' },
  { id: 5, emoji: '💧', label: 'Water' },
];

const STATS = [
  { value: '42+', label: 'Issues tracked' },
  { value: '9+', label: 'Years of data' },
  { value: '127', label: 'Countries affected' },
];

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#050f07" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>Good morning 🌱</Text>
              <Text style={styles.headerTitle}>EcoAware</Text>
            </View>
            <View style={styles.leafBadge}>
              <Text style={{ fontSize: 20 }}>🌿</Text>
            </View>
          </View>
        </Animated.View>

        {/* HERO CARD */}
        <Animated.View style={[styles.heroCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.heroLabel}>🌍 COUNTRIES AFFECTED</Text>
          <Text style={styles.heroNumber}>127</Text>
          <Text style={styles.heroSub}>by critical sustainability issues right now</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Global action progress</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '38%' }]} />
            </View>
            <Text style={styles.progressPct}>38%</Text>
          </View>
        </Animated.View>

        {/* STATS ROW */}
        <Animated.View style={[styles.statsRow, { opacity: fadeAnim }]}>
          {STATS.map((s, i) => (
            <View key={i} style={styles.statChip}>
              <Text style={styles.statVal}>{s.value}</Text>
              <Text style={styles.statLab}>{s.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* TOPIC CIRCLES */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.sectionTitle}>Explore Topics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topicsScroll}>
            {TOPICS.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={styles.topicCircle}
                onPress={() => navigation.navigate('Issues')}
              >
                <Text style={styles.topicEmoji}>{t.emoji}</Text>
                <Text style={styles.topicLabel}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* DAILY FACT */}
        <Animated.View style={[styles.factCard, { opacity: fadeAnim }]}>
          <Text style={styles.factBadge}>🌱 TODAY'S FACT</Text>
          <Text style={styles.factText}>
            "15 billion trees are cut down every year — that's 2,000 every single second."
          </Text>
          <Text style={styles.factSource}>— UN Environment Programme</Text>
        </Animated.View>

        {/* CTA BUTTONS */}
        <View style={styles.ctaRow}>
          <TouchableOpacity style={styles.ctaPrimary} onPress={() => navigation.navigate('Quiz')}>
            <Text style={styles.ctaPrimaryText}>Take the Quiz 🧠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaSecondary} onPress={() => navigation.navigate('Videos')}>
            <Text style={styles.ctaSecondaryText}>Watch ▶️</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050f07' },
  header: { paddingHorizontal: 22, paddingTop: 16, paddingBottom: 8 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { color: '#5a8a6a', fontSize: 13, fontWeight: '500', marginBottom: 2 },
  headerTitle: { color: '#e8f5ee', fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  leafBadge: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#0f2a14', borderWidth: 1, borderColor: '#1e4028',
    alignItems: 'center', justifyContent: 'center',
  },
  heroCard: {
    marginHorizontal: 16, marginTop: 16, marginBottom: 16,
    backgroundColor: '#0a1f10', borderRadius: 24,
    borderWidth: 1, borderColor: '#1a3a20', padding: 24,
  },
  heroLabel: { color: '#5dffb0', fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 6 },
  heroNumber: { color: '#e8f5ee', fontSize: 72, fontWeight: '800', lineHeight: 76, letterSpacing: -2 },
  heroSub: { color: '#6a9a7a', fontSize: 14, marginTop: 4, marginBottom: 20 },
  progressContainer: {},
  progressLabel: { color: '#5a8a6a', fontSize: 12, marginBottom: 8 },
  progressTrack: { height: 6, backgroundColor: '#1a3a20', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#5dffb0', borderRadius: 3 },
  progressPct: { color: '#5dffb0', fontSize: 12, fontWeight: '700', marginTop: 6, textAlign: 'right' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 24 },
  statChip: {
    flex: 1, backgroundColor: '#0a1f10', borderRadius: 16,
    borderWidth: 1, borderColor: '#1a3a20', padding: 14, alignItems: 'center',
  },
  statVal: { color: '#5dffb0', fontSize: 20, fontWeight: '800' },
  statLab: { color: '#5a8a6a', fontSize: 10, textAlign: 'center', marginTop: 3, lineHeight: 13 },
  sectionTitle: {
    color: '#e8f5ee', fontSize: 18, fontWeight: '700',
    paddingHorizontal: 22, marginBottom: 14, letterSpacing: -0.3,
  },
  topicsScroll: { paddingLeft: 16, marginBottom: 24 },
  topicCircle: {
    alignItems: 'center', marginRight: 14,
    backgroundColor: '#0a1f10', borderRadius: 40, borderWidth: 1, borderColor: '#1a3a20',
    width: 72, height: 72, justifyContent: 'center',
  },
  topicEmoji: { fontSize: 26, marginBottom: 2 },
  topicLabel: { color: '#6a9a7a', fontSize: 9, fontWeight: '600' },
  factCard: {
    marginHorizontal: 16, backgroundColor: '#0a1f10', borderRadius: 20,
    borderWidth: 1, borderColor: '#1e4028', padding: 20, marginBottom: 20,
  },
  factBadge: { color: '#5dffb0', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 10 },
  factText: { color: '#e8f5ee', fontSize: 15, lineHeight: 24, fontStyle: 'italic' },
  factSource: { color: '#5a8a6a', fontSize: 11, marginTop: 10 },
  ctaRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10 },
  ctaPrimary: {
    flex: 2, backgroundColor: '#5dffb0', borderRadius: 16, padding: 16, alignItems: 'center',
  },
  ctaPrimaryText: { color: '#050f07', fontWeight: '800', fontSize: 15 },
  ctaSecondary: {
    flex: 1, backgroundColor: '#0a1f10', borderRadius: 16, padding: 16,
    alignItems: 'center', borderWidth: 1, borderColor: '#1a3a20',
  },
  ctaSecondaryText: { color: '#e8f5ee', fontWeight: '700', fontSize: 15 },
});