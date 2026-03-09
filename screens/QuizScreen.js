import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const QUESTIONS = [
  {
    q: 'How many trees are cut down globally every year?',
    emoji: '🌳',
    options: ['1 billion', '5 billion', '15 billion', '50 billion'],
    answer: 2,
    explanation: 'Around 15 billion trees are cut down every year — roughly 2,000 every single second.',
  },
  {
    q: 'What percentage of plastic ever made has been recycled?',
    emoji: '♻️',
    options: ['9%', '25%', '40%', '60%'],
    answer: 0,
    explanation: 'Only 9% of all plastic ever produced has been recycled. 79% sits in landfill or nature.',
  },
  {
    q: 'By how much have vertebrate wildlife populations fallen since 1970?',
    emoji: '🦁',
    options: ['20%', '40%', '60%', '80%'],
    answer: 2,
    explanation: "WWF's Living Planet Index shows a 60% average decline in vertebrate populations since 1970.",
  },
  {
    q: "How much of Earth's water is fresh water?",
    emoji: '💧',
    options: ['30%', '10%', '3%', '50%'],
    answer: 2,
    explanation: "Only 3% of Earth's water is fresh water, and most of it is frozen in glaciers and ice caps.",
  },
  {
    q: 'How much warmer is Earth compared to pre-industrial times?',
    emoji: '🌡️',
    options: ['0.5°C', '1.1°C', '2.5°C', '3.0°C'],
    answer: 1,
    explanation: "Earth has warmed 1.1°C since pre-industrial times. Scientists warn we must stay below 1.5°C.",
  },
  {
    q: 'What share of greenhouse gases comes from food waste?',
    emoji: '🗑️',
    options: ['2%', '5%', '8–10%', '15%'],
    answer: 2,
    explanation: "Food waste causes 8–10% of global greenhouse gases — the 3rd largest emitter if it were a country.",
  },
];

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen() {
  const insets = useSafeAreaInsets();
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(20);
  const timerRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!started || done || selected !== null) {
      clearInterval(timerRef.current);
      return;
    }
    setTimer(20);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setSelected(-1);
          setLives(l => {
            const nl = l - 1;
            if (nl <= 0) setTimeout(() => setDone(true), 1000);
            return nl;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qIndex, started]);

  const handleAnswer = (i) => {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    setSelected(i);
    if (i === QUESTIONS[qIndex].answer) {
      setScore(s => s + 1);
    } else {
      setLives(l => {
        const nl = l - 1;
        if (nl <= 0) setTimeout(() => setDone(true), 1200);
        return nl;
      });
    }
  };

  const nextQ = () => {
    if (lives <= 0 || qIndex + 1 >= QUESTIONS.length) { setDone(true); return; }
    setQIndex(i => i + 1);
    setSelected(null);
  };

  const restart = () => {
    setStarted(false); setQIndex(0); setSelected(null);
    setScore(0); setLives(3); setDone(false); setTimer(20);
  };

  const pct = Math.round((score / QUESTIONS.length) * 100);

  // ── INTRO SCREEN ──
  if (!started) {
    return (
      <View style={[styles.introContainer, { paddingTop: insets.top }]}>
        <StatusBar barStyle="light-content" backgroundColor="#050f07" />
        <View style={styles.introCenterContent}>
          <Text style={styles.introLeaf}>🌿</Text>
          <Text style={styles.introTitle}>Planet Earth{'\n'}Knowledge{'\n'}Check</Text>
          <Text style={styles.introSub}>6 questions · 20 seconds each · 3 lives</Text>
          <Text style={styles.introNote}>
            How much do you really know about our planet's most critical issues?
          </Text>
        </View>
        <View style={[styles.introBottom, { paddingBottom: insets.bottom + 20 }]}>
          <TouchableOpacity style={styles.startBtn} onPress={() => setStarted(true)}>
            <Text style={styles.startBtnText}>▶  Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── RESULTS ──
  if (done) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView contentContainerStyle={styles.results}>
          <Text style={styles.resultsEmoji}>{pct >= 80 ? '🏆' : pct >= 50 ? '🌱' : '📚'}</Text>
          <Text style={styles.resultsScore}>
            {score}<Text style={styles.resultsMax}>/{QUESTIONS.length}</Text>
          </Text>
          <Text style={styles.resultsLabel}>
            {pct >= 80 ? 'Eco Champion!' : pct >= 50 ? 'Good effort!' : 'Keep learning!'}
          </Text>
          <Text style={styles.resultsMsg}>
            {pct >= 80
              ? 'Outstanding! You clearly care deeply about our planet.'
              : pct >= 50
              ? 'Not bad! Explore the Issues section to sharpen your knowledge.'
              : 'Every expert started somewhere. Check out the Issues screen to learn more!'}
          </Text>
          <TouchableOpacity style={styles.replayBtn} onPress={restart}>
            <Text style={styles.replayText}>Try Again  ↺</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // ── QUIZ ──
  const q = QUESTIONS[qIndex];
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#050f07" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Score + Lives + Timer */}
        <View style={styles.quizTopRow}>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreBadgeText}>⭐ {score} pts</Text>
          </View>
          <View style={styles.livesRow}>
            {[...Array(3)].map((_, i) => (
              <Text key={i} style={{ fontSize: 18 }}>{i < lives ? '❤️' : '🖤'}</Text>
            ))}
          </View>
          <View style={styles.timerBadge}>
            <Text style={[styles.timerText, { color: timer <= 5 ? '#ff6b6b' : '#f9c74f' }]}>
              ⏱ {timer}s
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${(qIndex / QUESTIONS.length) * 100}%` }]} />
        </View>

        {/* Question Card */}
        <Animated.View style={[styles.qCard, { opacity: fadeAnim }]}>
          <Text style={styles.qEmoji}>{q.emoji}</Text>
          <Text style={styles.qNum}>Question {qIndex + 1} of {QUESTIONS.length}</Text>
          <Text style={styles.qText}>{q.q}</Text>
        </Animated.View>

        {/* Answer Options */}
        <View style={styles.options}>
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answer;
            const isSelected = i === selected;
            const answered = selected !== null;
            let borderColor = '#1a3a20';
            let bg = '#0a1f10';
            let textColor = '#e8f5ee';
            let letterBg = '#1a3a20';
            let letterColor = '#6a9a7a';
            if (answered && isCorrect) {
              borderColor = '#5dffb0'; bg = 'rgba(93,255,176,0.08)';
              textColor = '#5dffb0'; letterBg = '#5dffb0'; letterColor = '#050f07';
            }
            if (answered && isSelected && !isCorrect) {
              borderColor = '#ff6b6b'; bg = 'rgba(255,107,107,0.08)';
              textColor = '#ff6b6b'; letterBg = '#ff6b6b'; letterColor = 'white';
            }
            return (
              <TouchableOpacity
                key={i}
                style={[styles.optBtn, { borderColor, backgroundColor: bg }]}
                onPress={() => handleAnswer(i)}
                disabled={answered}
              >
                <View style={[styles.optLetter, { backgroundColor: letterBg }]}>
                  <Text style={[styles.optLetterText, { color: letterColor }]}>{LETTERS[i]}</Text>
                </View>
                <Text style={[styles.optText, { color: textColor }]}>{opt}</Text>
                {answered && isCorrect && <Text style={{ fontSize: 16 }}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback */}
        {selected !== null && (
          <View style={[styles.feedbackBox, {
            backgroundColor: selected === q.answer ? 'rgba(93,255,176,0.08)' : 'rgba(255,107,107,0.08)',
            borderColor: selected === q.answer ? 'rgba(93,255,176,0.25)' : 'rgba(255,107,107,0.25)',
          }]}>
            <Text style={{ color: selected === q.answer ? '#5dffb0' : '#ff9a9a', fontSize: 14, lineHeight: 22 }}>
              {selected === q.answer ? '✅ Correct! ' : selected === -1 ? "⏱ Time's up! " : '❌ Not quite. '}
              {q.explanation}
            </Text>
          </View>
        )}

        {selected !== null && lives > 0 && (
          <TouchableOpacity style={styles.nextBtn} onPress={nextQ}>
            <Text style={styles.nextBtnText}>
              {qIndex + 1 >= QUESTIONS.length ? 'See Results 🏆' : 'Next Question →'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050f07' },
  introContainer: { flex: 1, backgroundColor: '#050f07', justifyContent: 'space-between' },
  introCenterContent: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  introLeaf: { fontSize: 36, marginBottom: 24 },
  introTitle: { color: '#e8f5ee', fontSize: 42, fontWeight: '800', lineHeight: 50, letterSpacing: -1, marginBottom: 20 },
  introSub: { color: '#5dffb0', fontSize: 13, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 },
  introNote: { color: '#5a8a6a', fontSize: 15, lineHeight: 24 },
  introBottom: { padding: 24 },
  startBtn: {
    backgroundColor: '#0a1f10', borderRadius: 20, paddingVertical: 18,
    paddingHorizontal: 32, borderWidth: 1, borderColor: '#5dffb0', alignItems: 'center',
  },
  startBtnText: { color: '#5dffb0', fontSize: 16, fontWeight: '700' },
  results: { padding: 32, alignItems: 'center', paddingTop: 80 },
  resultsEmoji: { fontSize: 72, marginBottom: 20 },
  resultsScore: { color: '#5dffb0', fontSize: 64, fontWeight: '800', lineHeight: 70 },
  resultsMax: { fontSize: 28, color: '#5a8a6a' },
  resultsLabel: { color: '#e8f5ee', fontSize: 22, fontWeight: '700', marginTop: 12, marginBottom: 10 },
  resultsMsg: { color: '#6a9a7a', fontSize: 14, lineHeight: 22, textAlign: 'center', marginBottom: 36 },
  replayBtn: {
    backgroundColor: '#5dffb0', borderRadius: 16, paddingVertical: 16,
    paddingHorizontal: 48, width: '100%', alignItems: 'center',
  },
  replayText: { color: '#050f07', fontSize: 16, fontWeight: '800' },
  quizTopRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  scoreBadge: {
    backgroundColor: '#0a1f10', borderRadius: 20, borderWidth: 1,
    borderColor: '#1a3a20', paddingHorizontal: 14, paddingVertical: 6,
  },
  scoreBadgeText: { color: '#5dffb0', fontSize: 13, fontWeight: '700' },
  livesRow: { flexDirection: 'row', gap: 4 },
  timerBadge: {
    backgroundColor: '#0a1f10', borderRadius: 20, borderWidth: 1,
    borderColor: '#1a3a20', paddingHorizontal: 14, paddingVertical: 6,
  },
  timerText: { fontSize: 13, fontWeight: '700' },
  progressTrack: {
    height: 4, backgroundColor: '#1a3a20', marginHorizontal: 20,
    borderRadius: 4, overflow: 'hidden', marginBottom: 16,
  },
  progressFill: { height: '100%', backgroundColor: '#5dffb0', borderRadius: 4 },
  qCard: {
    marginHorizontal: 16, backgroundColor: '#0a1f10', borderRadius: 24,
    borderWidth: 1, borderColor: '#1a3a20', padding: 24, marginBottom: 16,
  },
  qEmoji: { fontSize: 36, marginBottom: 10 },
  qNum: { color: '#5a8a6a', fontSize: 11, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  qText: { color: '#e8f5ee', fontSize: 20, fontWeight: '700', lineHeight: 28 },
  options: { paddingHorizontal: 16, gap: 10 },
  optBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1.5, borderRadius: 16, padding: 16 },
  optLetter: { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  optLetterText: { fontSize: 13, fontWeight: '700' },
  optText: { flex: 1, fontSize: 15, lineHeight: 22 },
  feedbackBox: { marginHorizontal: 16, marginTop: 14, borderRadius: 16, padding: 16, borderWidth: 1 },
  nextBtn: {
    marginHorizontal: 16, marginTop: 14, backgroundColor: '#5dffb0',
    borderRadius: 16, padding: 16, alignItems: 'center',
  },
  nextBtnText: { color: '#050f07', fontSize: 16, fontWeight: '800' },
});