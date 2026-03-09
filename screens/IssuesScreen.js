import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Modal
} from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ISSUES = [
  {
    id: 1, emoji: '🌡️', name: 'Climate Change',
    color: '#ff6b6b', bg: '#2a0f0f', urgency: 'CRITICAL',
    desc: 'Rising greenhouse gases are trapping heat, pushing global temperatures to record highs and triggering extreme weather events across every continent.',
    facts: [
      'Earth has warmed 1.1°C since pre-industrial times',
      'Arctic sea ice shrinks by 13% every decade',
      '2023 was the hottest year ever recorded',
      'Sea levels rising 3.7mm per year',
    ],
    action: 'Switch to renewable energy, reduce flights, eat less beef, and vote for climate-conscious leaders.',
  },
  {
    id: 2, emoji: '🌊', name: 'Ocean Pollution',
    color: '#48cae4', bg: '#0a1f2a', urgency: 'SEVERE',
    desc: "Our oceans absorb 30% of CO₂ and produce 50% of Earth's oxygen — yet we dump 8 million tonnes of plastic into them every year.",
    facts: [
      'By 2050, more plastic than fish in the ocean',
      'Great Pacific Garbage Patch is 2x the size of Texas',
      '1 million seabirds die from ocean plastic yearly',
      'Only 9% of all plastic ever made was recycled',
    ],
    action: 'Refuse single-use plastics, support ocean clean-up organisations, choose minimal packaging.',
  },
  {
    id: 3, emoji: '🌳', name: 'Deforestation',
    color: '#a8d5a2', bg: '#0a1f0a', urgency: 'HIGH',
    desc: 'Forests are being cleared at an alarming rate for agriculture, logging, and development — destroying irreplaceable ecosystems.',
    facts: [
      '15 billion trees are cut down each year',
      'Amazon loses a football pitch every minute',
      'Forests store 45% of all land-based carbon',
      '80% of land animals live in forests',
    ],
    action: 'Choose FSC-certified products, reduce beef consumption, support reforestation charities.',
  },
  {
    id: 4, emoji: '🦁', name: 'Biodiversity Loss',
    color: '#f9c74f', bg: '#1a1500', urgency: 'CRITICAL',
    desc: 'We are living through the sixth mass extinction. Species disappear 1,000x faster than the natural rate due to human activity.',
    facts: [
      '1 million species face extinction',
      '60% of all wildlife lost since 1970',
      'Insects down 75% in just 30 years',
      'A species goes extinct every 20 minutes',
    ],
    action: 'Plant native species, avoid pesticides, support wildlife charities and eat sustainably.',
  },
  {
    id: 5, emoji: '💧', name: 'Water Scarcity',
    color: '#93c5fd', bg: '#0a1020', urgency: 'HIGH',
    desc: "Fresh water is one of Earth's most precious resources. Climate change and overuse are pushing billions toward water stress.",
    facts: [
      "Only 3% of Earth's water is fresh water",
      '2 billion people lack safe drinking water',
      'Agriculture uses 70% of all fresh water',
      'Demand will exceed supply by 40% by 2030',
    ],
    action: 'Fix leaks, take shorter showers, eat less water-intensive food.',
  },
  {
    id: 6, emoji: '♻️', name: 'Waste Crisis',
    color: '#86efac', bg: '#0a1a0a', urgency: 'URGENT',
    desc: 'We produce waste faster than the planet can process it. Most ends up in landfill, emitting methane — 84x more potent than CO₂.',
    facts: [
      '2.01 billion tonnes of waste generated yearly',
      'Only 16% of global waste is recycled',
      'Food waste = 8–10% of global greenhouse gases',
      'E-waste growing 3x faster than regular waste',
    ],
    action: 'Adopt zero-waste: refuse, reduce, reuse, recycle, compost.',
  },
];

const URGENCY_COLORS = {
  CRITICAL: '#ff6b6b', SEVERE: '#f9a825', HIGH: '#a8d5a2', URGENT: '#48cae4',
};

export default function IssuesScreen() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(null);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#050f07" />

      {/* DETAIL MODAL */}
      <Modal visible={!!selected} animationType="slide" transparent={false}>
        {selected && (
          <View style={[styles.modalContainer, { backgroundColor: selected.bg }]}>
            <View style={[styles.modalHeader, { paddingTop: insets.top + 16 }]}>
              <TouchableOpacity style={styles.backBtn} onPress={() => setSelected(null)}>
                <Text style={styles.backBtnText}>← Back</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHero}>
                <Text style={styles.modalEmoji}>{selected.emoji}</Text>
                <View style={styles.urgencyBadge}>
                  <Text style={[styles.urgencyText, { color: URGENCY_COLORS[selected.urgency] }]}>
                    ⚠ {selected.urgency}
                  </Text>
                </View>
                <Text style={styles.modalTitle}>{selected.name}</Text>
              </View>
              <View style={styles.modalContent}>
                <Text style={styles.modalDesc}>{selected.desc}</Text>
                <Text style={styles.modalSectionTitle}>Key Facts</Text>
                {selected.facts.map((f, i) => (
                  <View key={i} style={styles.factRow}>
                    <View style={[styles.factDot, { backgroundColor: selected.color }]} />
                    <Text style={styles.factRowText}>{f}</Text>
                  </View>
                ))}
                <View style={[styles.actionBox, { borderColor: selected.color + '40' }]}>
                  <Text style={[styles.actionTitle, { color: selected.color }]}>💡 WHAT YOU CAN DO</Text>
                  <Text style={styles.actionText}>{selected.action}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <Text style={styles.screenTitle}>Our Planet</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>42+</Text>
              <Text style={styles.statLab}>Issues tracked</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>9+</Text>
              <Text style={styles.statLab}>Years of data</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>6</Text>
              <Text style={styles.statLab}>Critical areas</Text>
            </View>
          </View>
        </View>

        <Text style={styles.issuesHeading}>Critical Issues Facing{'\n'}Our Planet</Text>

        <View style={styles.list}>
          {ISSUES.map((issue) => (
            <TouchableOpacity key={issue.id} style={styles.card} onPress={() => setSelected(issue)}>
              <View style={[styles.cardLeft, { backgroundColor: issue.bg }]}>
                <Text style={styles.cardEmoji}>{issue.emoji}</Text>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardTop}>
                  <Text style={styles.cardName}>{issue.name}</Text>
                  <View style={[styles.urgencyPill, {
                    backgroundColor: URGENCY_COLORS[issue.urgency] + '22',
                    borderColor: URGENCY_COLORS[issue.urgency] + '55',
                  }]}>
                    <Text style={[styles.urgencyPillText, { color: URGENCY_COLORS[issue.urgency] }]}>
                      {issue.urgency}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cardDesc} numberOfLines={2}>{issue.desc}</Text>
                <Text style={[styles.cardCta, { color: issue.color }]}>Learn more →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050f07' },
  top: { padding: 22, paddingBottom: 0 },
  screenTitle: { color: '#e8f5ee', fontSize: 30, fontWeight: '800', letterSpacing: -0.5, marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statBox: {
    flex: 1, backgroundColor: '#0a1f10', borderRadius: 14,
    borderWidth: 1, borderColor: '#1a3a20', padding: 14, alignItems: 'center',
  },
  statNum: { color: '#5dffb0', fontSize: 22, fontWeight: '800' },
  statLab: { color: '#5a8a6a', fontSize: 10, textAlign: 'center', marginTop: 2 },
  issuesHeading: {
    color: '#e8f5ee', fontSize: 20, fontWeight: '700',
    paddingHorizontal: 22, marginBottom: 16, lineHeight: 28,
  },
  list: { paddingHorizontal: 16, gap: 12 },
  card: {
    backgroundColor: '#0a1f10', borderRadius: 20, borderWidth: 1,
    borderColor: '#1a3a20', flexDirection: 'row', overflow: 'hidden',
  },
  cardLeft: { width: 80, alignItems: 'center', justifyContent: 'center', minHeight: 100 },
  cardEmoji: { fontSize: 36 },
  cardBody: { flex: 1, padding: 14 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardName: { color: '#e8f5ee', fontSize: 15, fontWeight: '700', flex: 1 },
  urgencyPill: { borderRadius: 20, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3, marginLeft: 8 },
  urgencyPillText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  cardDesc: { color: '#6a9a7a', fontSize: 12, lineHeight: 18, marginBottom: 8 },
  cardCta: { fontSize: 12, fontWeight: '700' },
  modalContainer: { flex: 1 },
  modalHeader: { paddingHorizontal: 20, paddingBottom: 8 },
  backBtn: {
    alignSelf: 'flex-start', backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  backBtnText: { color: '#e8f5ee', fontSize: 14, fontWeight: '600' },
  modalHero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 24 },
  modalEmoji: { fontSize: 72, marginBottom: 12 },
  urgencyBadge: {
    backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 5, marginBottom: 10,
  },
  urgencyText: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  modalTitle: { color: '#e8f5ee', fontSize: 32, fontWeight: '800', textAlign: 'center', letterSpacing: -0.5 },
  modalContent: {
    backgroundColor: '#050f07', borderTopLeftRadius: 28,
    borderTopRightRadius: 28, padding: 24,
  },
  modalDesc: { color: '#8ab09a', fontSize: 15, lineHeight: 26, marginBottom: 24 },
  modalSectionTitle: {
    color: '#e8f5ee', fontSize: 13, fontWeight: '700',
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14,
  },
  factRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', marginBottom: 12 },
  factDot: { width: 6, height: 6, borderRadius: 3, marginTop: 8, flexShrink: 0 },
  factRowText: { color: '#e8f5ee', fontSize: 14, lineHeight: 22, flex: 1 },
  actionBox: {
    backgroundColor: '#0a1f10', borderRadius: 20,
    padding: 20, marginTop: 20, borderWidth: 1,
  },
  actionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 10 },
  actionText: { color: '#8ab09a', fontSize: 14, lineHeight: 22 },
});