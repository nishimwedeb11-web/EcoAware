import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts, Palette, Radius } from '../constants/design';

const TRACKS = [
  { key: 'all', label: 'All Topics', icon: 'apps-outline' },
  { key: 'climate', label: 'Climate', icon: 'thermometer-outline' },
  { key: 'ocean', label: 'Oceans', icon: 'water-outline' },
  { key: 'biodiversity', label: 'Biodiversity', icon: 'leaf-outline' },
  { key: 'water', label: 'Water', icon: 'rainy-outline' },
  { key: 'waste', label: 'Waste', icon: 'repeat-outline' },
];

const DIFFICULTIES = [
  { key: 'mixed', label: 'Mixed' },
  { key: 'easy', label: 'Easy' },
  { key: 'medium', label: 'Medium' },
  { key: 'hard', label: 'Hard' },
];

const LENGTHS = [6, 10, 15];
const TIMERS = [15, 20, 30];
const LETTERS = ['A', 'B', 'C', 'D'];

const QUESTION_BANK = [
  {
    id: 'q1',
    topic: 'climate',
    difficulty: 'easy',
    q: 'How much has Earth warmed since pre-industrial times?',
    options: ['About 0.2°C', 'About 1.1°C', 'About 3.0°C', 'About 5.0°C'],
    answer: 1,
    explanation: 'Global average temperature is about 1.1°C above pre-industrial levels.',
  },
  {
    id: 'q2',
    topic: 'ocean',
    difficulty: 'easy',
    q: 'How much of Earth’s oxygen is estimated to come from oceans?',
    options: ['10%', '25%', '50%', '90%'],
    answer: 2,
    explanation: 'Marine phytoplankton and ocean ecosystems produce roughly half of Earth’s oxygen.',
  },
  {
    id: 'q3',
    topic: 'biodiversity',
    difficulty: 'easy',
    q: 'How many species are estimated to be at risk of extinction?',
    options: ['About 10,000', 'About 100,000', 'About 1 million', 'About 10 million'],
    answer: 2,
    explanation: 'Major assessments estimate around one million species face extinction risk.',
  },
  {
    id: 'q4',
    topic: 'water',
    difficulty: 'easy',
    q: 'What share of Earth’s water is fresh water?',
    options: ['3%', '12%', '25%', '40%'],
    answer: 0,
    explanation: 'Only about 3% of Earth’s water is fresh water.',
  },
  {
    id: 'q5',
    topic: 'waste',
    difficulty: 'easy',
    q: 'Roughly what percentage of all plastic has ever been recycled?',
    options: ['9%', '24%', '41%', '70%'],
    answer: 0,
    explanation: 'Only around 9% of global plastic has been recycled.',
  },
  {
    id: 'q6',
    topic: 'climate',
    difficulty: 'medium',
    q: 'Which gas is the largest contributor to human-caused warming?',
    options: ['Nitrogen', 'Methane', 'Carbon dioxide', 'Ozone'],
    answer: 2,
    explanation: 'Carbon dioxide is the largest long-lived greenhouse gas contributor.',
  },
  {
    id: 'q7',
    topic: 'ocean',
    difficulty: 'medium',
    q: 'About how much plastic enters oceans every year?',
    options: ['800,000 tonnes', '8 million tonnes', '80 million tonnes', '800 million tonnes'],
    answer: 1,
    explanation: 'A widely cited estimate is around 8 million tonnes of plastic per year.',
  },
  {
    id: 'q8',
    topic: 'biodiversity',
    difficulty: 'medium',
    q: 'Habitat fragmentation primarily causes what problem?',
    options: ['Faster volcanic activity', 'Disrupted species movement and breeding', 'Lower ocean salinity', 'Higher ozone thickness'],
    answer: 1,
    explanation: 'Fragmented habitats isolate populations and reduce ecosystem resilience.',
  },
  {
    id: 'q9',
    topic: 'water',
    difficulty: 'medium',
    q: 'What sector uses the largest share of freshwater withdrawals?',
    options: ['Transport', 'Agriculture', 'Telecom', 'Aviation'],
    answer: 1,
    explanation: 'Agriculture accounts for about 70% of global freshwater withdrawals.',
  },
  {
    id: 'q10',
    topic: 'waste',
    difficulty: 'medium',
    q: 'Food waste contributes approximately what share of global GHG emissions?',
    options: ['1-2%', '3-4%', '8-10%', '20-25%'],
    answer: 2,
    explanation: 'Food waste contributes roughly 8-10% of global greenhouse gas emissions.',
  },
  {
    id: 'q11',
    topic: 'climate',
    difficulty: 'hard',
    q: 'What is a key climate risk from thawing permafrost?',
    options: ['Reduced cloud cover', 'Methane release', 'Lower sea level', 'Stronger ozone layer'],
    answer: 1,
    explanation: 'Thawing permafrost can release methane and CO2, amplifying warming.',
  },
  {
    id: 'q12',
    topic: 'ocean',
    difficulty: 'hard',
    q: 'Ocean acidification is mainly caused by:',
    options: ['Rising dissolved CO2', 'Higher calcium intake', 'Increased salinity', 'Magnetic field shifts'],
    answer: 0,
    explanation: 'When oceans absorb more CO2, carbonic acid forms and pH declines.',
  },
  {
    id: 'q13',
    topic: 'biodiversity',
    difficulty: 'hard',
    q: 'Pollinator decline most directly threatens:',
    options: ['Solar panel output', 'Crop production and food security', 'Ocean tides', 'Internet infrastructure'],
    answer: 1,
    explanation: 'Many crops depend on pollinators for yield and quality.',
  },
  {
    id: 'q14',
    topic: 'water',
    difficulty: 'hard',
    q: 'Which factor intensifies urban water stress the most?',
    options: ['More library usage', 'Combined climate extremes and over-extraction', 'Lower phone usage', 'Reduced wind speed'],
    answer: 1,
    explanation: 'Hotter droughts plus unsustainable extraction intensify water insecurity.',
  },
  {
    id: 'q15',
    topic: 'waste',
    difficulty: 'hard',
    q: 'What makes e-waste especially challenging?',
    options: ['It is always biodegradable', 'It contains mixed valuable and toxic materials', 'It has no metal content', 'It does not grow each year'],
    answer: 1,
    explanation: 'E-waste combines recoverable metals with hazardous substances and is rapidly growing.',
  },
  {
    id: 'q16',
    topic: 'climate',
    difficulty: 'easy',
    q: 'Which action usually has high personal emissions impact?',
    options: ['Flying frequently', 'Using paper straws', 'Using bookmarks', 'Reading books'],
    answer: 0,
    explanation: 'Frequent air travel can significantly increase personal carbon footprints.',
  },
  {
    id: 'q17',
    topic: 'ocean',
    difficulty: 'medium',
    q: 'Microplastics are concerning because they:',
    options: ['Dissolve instantly in sunlight', 'Can enter food webs', 'Improve fish health', 'Lower marine temperatures'],
    answer: 1,
    explanation: 'Microplastics can be ingested by marine life and move through food chains.',
  },
  {
    id: 'q18',
    topic: 'biodiversity',
    difficulty: 'medium',
    q: 'Deforestation strongly affects biodiversity because it:',
    options: ['Creates more habitat', 'Removes shelter and food webs', 'Boosts coral growth', 'Increases glacier mass'],
    answer: 1,
    explanation: 'Forest loss destroys habitats and destabilizes interconnected species systems.',
  },
  {
    id: 'q19',
    topic: 'water',
    difficulty: 'easy',
    q: 'A practical household water-saving action is to:',
    options: ['Ignore leaks', 'Fix leaks promptly', 'Run taps continuously', 'Only drink bottled water'],
    answer: 1,
    explanation: 'Fixing leaks can save substantial water over time.',
  },
  {
    id: 'q20',
    topic: 'waste',
    difficulty: 'medium',
    q: 'The circular economy focuses on:',
    options: ['Take-make-dispose', 'Designing out waste and keeping materials in use', 'Burning all waste', 'Single-use systems'],
    answer: 1,
    explanation: 'Circular models emphasize reuse, repair, remanufacture, and material recovery.',
  },
  {
    id: 'q21',
    topic: 'climate',
    difficulty: 'hard',
    q: 'Which system helps remove carbon naturally when restored?',
    options: ['Wetlands and forests', 'Parking lots', 'Concrete highways', 'Large rooftops'],
    answer: 0,
    explanation: 'Ecosystem restoration increases natural carbon sequestration potential.',
  },
  {
    id: 'q22',
    topic: 'ocean',
    difficulty: 'hard',
    q: 'Coral bleaching is primarily triggered by:',
    options: ['Cooler average seas', 'Warmer sea temperatures', 'Lower UV exposure', 'Freshwater abundance'],
    answer: 1,
    explanation: 'Sustained ocean warming is a major cause of mass coral bleaching events.',
  },
  {
    id: 'q23',
    topic: 'biodiversity',
    difficulty: 'easy',
    q: 'Planting native species is valuable because it:',
    options: ['Supports local ecosystems', 'Always increases plastic recycling', 'Cools oceans directly', 'Replaces climate policy'],
    answer: 0,
    explanation: 'Native plants support local pollinators, soils, and habitat networks.',
  },
  {
    id: 'q24',
    topic: 'water',
    difficulty: 'medium',
    q: 'Water reuse systems in cities are useful because they:',
    options: ['Increase freshwater demand', 'Reduce pressure on freshwater sources', 'Eliminate rainfall', 'Prevent evaporation'],
    answer: 1,
    explanation: 'Recycling and reuse reduce dependence on limited freshwater supplies.',
  },
  {
    id: 'q25',
    topic: 'waste',
    difficulty: 'easy',
    q: 'Which is usually best in the waste hierarchy?',
    options: ['Landfill', 'Prevention and reduction', 'Incineration', 'Littering'],
    answer: 1,
    explanation: 'Preventing waste is generally better than managing waste after creation.',
  },
  {
    id: 'q26',
    topic: 'climate',
    difficulty: 'medium',
    q: 'Why is methane important in climate discussions?',
    options: ['It has no warming impact', 'It is short-lived but highly potent', 'It replaces oxygen in oceans', 'It only exists underground'],
    answer: 1,
    explanation: 'Methane has high warming potential over short timescales.',
  },
  {
    id: 'q27',
    topic: 'ocean',
    difficulty: 'easy',
    q: 'A key personal ocean-protection action is to:',
    options: ['Use more single-use plastics', 'Reduce disposable plastic consumption', 'Dump oils in drains', 'Ignore local waterways'],
    answer: 1,
    explanation: 'Reducing disposable plastics helps lower leakage into rivers and oceans.',
  },
  {
    id: 'q28',
    topic: 'biodiversity',
    difficulty: 'hard',
    q: 'Species loss can destabilize ecosystems because:',
    options: ['Food webs become less resilient', 'Biodiversity is unrelated to stability', 'Predators disappear immediately', 'Weather stops changing'],
    answer: 0,
    explanation: 'Diverse ecosystems are generally more resilient to shocks and change.',
  },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuestionSet(track, difficulty, length) {
  let filtered = QUESTION_BANK;

  if (track !== 'all') {
    filtered = filtered.filter((item) => item.topic === track);
  }

  if (difficulty !== 'mixed') {
    filtered = filtered.filter((item) => item.difficulty === difficulty);
  }

  const primary = shuffle(filtered);
  const backup = shuffle(QUESTION_BANK.filter((item) => !primary.find((p) => p.id === item.id)));
  const combined = [...primary, ...backup];

  return combined.slice(0, Math.min(length, combined.length));
}

export default function QuizScreen() {
  const insets = useSafeAreaInsets();

  const [track, setTrack] = useState('all');
  const [difficulty, setDifficulty] = useState('mixed');
  const [length, setLength] = useState(10);
  const [timePerQuestion, setTimePerQuestion] = useState(20);

  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(20);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [skipUsed, setSkipUsed] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);

  const [history, setHistory] = useState([]);

  const timerRef = useRef(null);
  const cardOpacity = useRef(new Animated.Value(1)).current;

  const currentQuestion = questions[qIndex] || null;

  useEffect(() => {
    if (!started || done || selected !== null || !currentQuestion) {
      clearInterval(timerRef.current);
      return;
    }

    setTimer(timePerQuestion);
    cardOpacity.setValue(0.35);
    Animated.timing(cardOpacity, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setSelected(-1);
          setStreak(0);
          setHistory((arr) => [
            ...arr,
            { topic: currentQuestion.topic, correct: false, timedOut: true, difficulty: currentQuestion.difficulty },
          ]);

          setLives((curr) => {
            return Math.max(curr - 1, 0);
          });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [started, done, selected, qIndex, currentQuestion, timePerQuestion, cardOpacity]);

  const startQuiz = () => {
    const selectedQuestions = buildQuestionSet(track, difficulty, length);

    setQuestions(selectedQuestions);
    setStarted(true);
    setDone(false);
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setLives(3);
    setTimer(timePerQuestion);
    setStreak(0);
    setBestStreak(0);
    setSkipUsed(false);
    setHintUsed(false);
    setHiddenOptions([]);
    setHistory([]);
  };

  const resetToSetup = () => {
    clearInterval(timerRef.current);
    setStarted(false);
    setDone(false);
    setQuestions([]);
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setLives(3);
    setStreak(0);
    setBestStreak(0);
    setSkipUsed(false);
    setHintUsed(false);
    setHiddenOptions([]);
    setHistory([]);
  };

  const nextQuestion = () => {
    if (qIndex + 1 >= questions.length) {
      setDone(true);
      return;
    }

    setQIndex((idx) => idx + 1);
    setSelected(null);
    setHiddenOptions([]);
  };

  const onAnswer = (index) => {
    if (!currentQuestion || selected !== null) {
      return;
    }

    clearInterval(timerRef.current);
    setSelected(index);

    const isCorrect = index === currentQuestion.answer;

    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((curr) => {
        const next = curr + 1;
        setBestStreak((b) => (next > b ? next : b));
        return next;
      });
    } else {
      setStreak(0);
      setLives((curr) => {
        return Math.max(curr - 1, 0);
      });
    }

    setHistory((arr) => [
      ...arr,
      { topic: currentQuestion.topic, correct: isCorrect, timedOut: false, difficulty: currentQuestion.difficulty },
    ]);
  };

  const onSkip = () => {
    if (skipUsed || selected !== null || !currentQuestion) {
      return;
    }

    setSkipUsed(true);
    setStreak(0);
    setHistory((arr) => [
      ...arr,
      { topic: currentQuestion.topic, correct: false, skipped: true, difficulty: currentQuestion.difficulty },
    ]);

    nextQuestion();
  };

  const onHint = () => {
    if (hintUsed || selected !== null || !currentQuestion) {
      return;
    }

    const wrong = currentQuestion.options
      .map((_, index) => index)
      .filter((index) => index !== currentQuestion.answer);

    const toHide = shuffle(wrong).slice(0, 2);
    setHiddenOptions(toHide);
    setHintUsed(true);
  };

  const percentage = questions.length ? Math.round((score / questions.length) * 100) : 0;

  const topicStats = useMemo(() => {
    const byTopic = {};

    history.forEach((item) => {
      if (!byTopic[item.topic]) {
        byTopic[item.topic] = { correct: 0, total: 0 };
      }
      byTopic[item.topic].total += 1;
      if (item.correct) {
        byTopic[item.topic].correct += 1;
      }
    });

    return Object.entries(byTopic)
      .map(([topicKey, values]) => ({
        topic: topicKey,
        accuracy: Math.round((values.correct / values.total) * 100),
        total: values.total,
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [history]);

  if (!started) {
    return (
      <View style={[styles.setupContainer, { paddingTop: insets.top }]}> 
        <StatusBar barStyle="light-content" backgroundColor={Palette.bg} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}>
          <View style={styles.setupHeader}>
            <Text style={styles.kicker}>ADAPTIVE QUIZ MODE</Text>
            <Text style={styles.setupTitle}>Challenge Builder</Text>
            <Text style={styles.setupSub}>
              Build your own quiz by topic, difficulty, question count, and timer. This mode includes {QUESTION_BANK.length} questions.
            </Text>
          </View>

          <View style={styles.setupCard}>
            <Text style={styles.sectionLabel}>Topic track</Text>
            <View style={styles.trackGrid}>
              {TRACKS.map((item) => {
                const active = item.key === track;
                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => setTrack(item.key)}
                    style={[styles.trackChip, active && styles.trackChipActive]}>
                    <Ionicons name={item.icon} size={14} color={active ? Palette.bg : Palette.textSecondary} />
                    <Text style={[styles.trackChipText, active && styles.trackChipTextActive]}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.setupCard}>
            <Text style={styles.sectionLabel}>Difficulty</Text>
            <View style={styles.choiceRow}>
              {DIFFICULTIES.map((item) => {
                const active = item.key === difficulty;
                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => setDifficulty(item.key)}
                    style={[styles.choiceChip, active && styles.choiceChipActive]}>
                    <Text style={[styles.choiceChipText, active && styles.choiceChipTextActive]}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.sectionLabel, { marginTop: 14 }]}>Questions</Text>
            <View style={styles.choiceRow}>
              {LENGTHS.map((item) => {
                const active = item === length;
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setLength(item)}
                    style={[styles.choiceChip, active && styles.choiceChipActive]}>
                    <Text style={[styles.choiceChipText, active && styles.choiceChipTextActive]}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.sectionLabel, { marginTop: 14 }]}>Timer per question</Text>
            <View style={styles.choiceRow}>
              {TIMERS.map((item) => {
                const active = item === timePerQuestion;
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setTimePerQuestion(item)}
                    style={[styles.choiceChip, active && styles.choiceChipActive]}>
                    <Text style={[styles.choiceChipText, active && styles.choiceChipTextActive]}>{item}s</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.setupSummaryCard}>
            <Text style={styles.setupSummaryText}>Selected mode: {track === 'all' ? 'All topics' : track} · {difficulty} · {length} questions · {timePerQuestion}s timer</Text>
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            <TouchableOpacity style={styles.startBtn} onPress={startQuiz}>
              <Ionicons name="rocket-outline" size={16} color={Palette.bg} />
              <Text style={styles.startBtnText}>Start Advanced Quiz</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (done) {
    const resultLabel = percentage >= 80 ? 'Outstanding' : percentage >= 60 ? 'Strong' : 'Growing';

    return (
      <View style={[styles.container, { paddingTop: insets.top }]}> 
        <StatusBar barStyle="light-content" backgroundColor={Palette.bg} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}>
          <View style={styles.resultsHeader}>
            <View style={styles.resultsIconWrap}>
              <Ionicons name={percentage >= 80 ? 'trophy' : 'analytics'} size={28} color={Palette.accent} />
            </View>
            <Text style={styles.resultsScore}>{score}<Text style={styles.resultsMax}>/{questions.length}</Text></Text>
            <Text style={styles.resultsTitle}>{resultLabel} Performance</Text>
            <Text style={styles.resultsSub}>Accuracy: {percentage}% · Best streak: {bestStreak}</Text>
          </View>

          <View style={styles.resultsPanel}>
            <Text style={styles.sectionLabel}>Topic accuracy breakdown</Text>
            {topicStats.length === 0 && <Text style={styles.resultsHint}>No answers recorded yet.</Text>}
            {topicStats.map((row) => (
              <View key={row.topic} style={styles.topicRow}>
                <Text style={styles.topicRowLabel}>{row.topic}</Text>
                <Text style={styles.topicRowValue}>{row.accuracy}% ({row.total})</Text>
              </View>
            ))}
          </View>

          <View style={styles.resultsActions}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={resetToSetup}>
              <Ionicons name="options-outline" size={15} color={Palette.textPrimary} />
              <Text style={styles.secondaryBtnText}>Change Setup</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryBtn} onPress={startQuiz}>
              <Ionicons name="refresh" size={16} color={Palette.bg} />
              <Text style={styles.primaryBtnText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}> 
      <StatusBar barStyle="light-content" backgroundColor={Palette.bg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 94 }}>
        <View style={styles.topRow}>
          <View style={styles.statPill}>
            <Ionicons name="star" size={12} color={Palette.accent} />
            <Text style={styles.statPillText}>{score} pts</Text>
          </View>

          <View style={styles.statPill}>
            <Ionicons name="flame" size={12} color={Palette.warning} />
            <Text style={styles.statPillText}>Streak {streak}</Text>
          </View>

          <View style={styles.statPill}>
            {[...Array(3)].map((_, index) => (
              <Ionicons
                key={index}
                name={index < lives ? 'heart' : 'heart-outline'}
                size={14}
                color={index < lives ? '#ff6f8f' : '#5f6966'}
              />
            ))}
          </View>

          <View style={styles.statPill}>
            <Ionicons name="time-outline" size={12} color={timer <= 5 ? Palette.danger : Palette.warning} />
            <Text style={[styles.statPillText, { color: timer <= 5 ? Palette.danger : Palette.warning }]}>{timer}s</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <Text style={styles.progressLabel}>Question {qIndex + 1} / {questions.length}</Text>
            <Text style={styles.progressLabel}>{Math.round(((qIndex + 1) / questions.length) * 100)}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${((qIndex + 1) / questions.length) * 100}%` }]} />
          </View>
        </View>

        <View style={styles.utilityRow}>
          <TouchableOpacity
            disabled={hintUsed || selected !== null}
            onPress={onHint}
            style={[styles.utilityBtn, (hintUsed || selected !== null) && styles.utilityBtnDisabled]}>
            <Ionicons name="flash-outline" size={14} color={hintUsed ? Palette.textMuted : Palette.textPrimary} />
            <Text style={[styles.utilityBtnText, hintUsed && styles.utilityBtnTextDisabled]}>50/50</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={skipUsed || selected !== null}
            onPress={onSkip}
            style={[styles.utilityBtn, (skipUsed || selected !== null) && styles.utilityBtnDisabled]}>
            <Ionicons name="play-skip-forward-outline" size={14} color={skipUsed ? Palette.textMuted : Palette.textPrimary} />
            <Text style={[styles.utilityBtnText, skipUsed && styles.utilityBtnTextDisabled]}>Skip</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.questionCard, { opacity: cardOpacity }]}> 
          <Text style={styles.questionTopic}>{currentQuestion ? currentQuestion.topic.toUpperCase() : 'QUESTION'}</Text>
          <Text style={styles.questionText}>{currentQuestion ? currentQuestion.q : 'Loading question...'}</Text>
        </Animated.View>

        <View style={styles.optionsList}>
          {currentQuestion &&
            currentQuestion.options.map((option, index) => {
              if (hiddenOptions.includes(index)) {
                return (
                  <View key={`${currentQuestion.id}-${index}`} style={styles.optionHidden}>
                    <Text style={styles.optionHiddenText}>Option removed</Text>
                  </View>
                );
              }

              const isCorrect = index === currentQuestion.answer;
              const isSelected = index === selected;
              const answered = selected !== null;

              let borderColor = Palette.border;
              let bgColor = Palette.surface;
              let textColor = Palette.textPrimary;
              let letterBg = Palette.surfaceAlt;
              let letterColor = Palette.textSecondary;

              if (answered && isCorrect) {
                borderColor = Palette.accent;
                bgColor = 'rgba(82, 242, 182, 0.12)';
                textColor = Palette.accent;
                letterBg = Palette.accent;
                letterColor = Palette.bg;
              }

              if (answered && isSelected && !isCorrect) {
                borderColor = Palette.danger;
                bgColor = 'rgba(255, 125, 125, 0.12)';
                textColor = Palette.danger;
                letterBg = Palette.danger;
                letterColor = Palette.white;
              }

              return (
                <TouchableOpacity
                  key={`${currentQuestion.id}-${index}`}
                  style={[styles.optionBtn, { borderColor, backgroundColor: bgColor }]}
                  onPress={() => onAnswer(index)}
                  disabled={answered}>
                  <View style={[styles.optionLetter, { backgroundColor: letterBg }]}> 
                    <Text style={[styles.optionLetterText, { color: letterColor }]}>{LETTERS[index]}</Text>
                  </View>
                  <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
                  {answered && isCorrect && <Ionicons name="checkmark-circle" size={18} color={Palette.accent} />}
                </TouchableOpacity>
              );
            })}
        </View>

        {selected !== null && currentQuestion && (
          <View
            style={[
              styles.feedbackCard,
              {
                borderColor: selected === currentQuestion.answer ? 'rgba(82, 242, 182, 0.28)' : 'rgba(255,125,125,0.28)',
                backgroundColor: selected === currentQuestion.answer ? 'rgba(82, 242, 182, 0.12)' : 'rgba(255,125,125,0.12)',
              },
            ]}>
            <Text style={[styles.feedbackText, { color: selected === currentQuestion.answer ? Palette.accent : '#ffb3b3' }]}> 
              {selected === currentQuestion.answer ? 'Correct. ' : selected === -1 ? 'Time is up. ' : 'Not quite. '}
              {currentQuestion.explanation}
            </Text>
          </View>
        )}

        {selected !== null && (
          <TouchableOpacity style={styles.nextBtn} onPress={nextQuestion}>
            <Text style={styles.nextBtnText}>{qIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}</Text>
            <Ionicons name="arrow-forward" size={16} color={Palette.bg} />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.bg,
  },
  setupContainer: {
    flex: 1,
    backgroundColor: Palette.bg,
  },
  setupHeader: {
    paddingHorizontal: 22,
    marginBottom: 14,
  },
  kicker: {
    ...Fonts.label,
    color: Palette.accent,
  },
  setupTitle: {
    ...Fonts.title,
    color: Palette.textPrimary,
    marginTop: 4,
  },
  setupSub: {
    marginTop: 7,
    color: Palette.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  setupCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    padding: 14,
  },
  sectionLabel: {
    ...Fonts.label,
    color: Palette.textPrimary,
    marginBottom: 8,
  },
  trackGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trackChip: {
    minHeight: 34,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trackChipActive: {
    borderColor: Palette.accent,
    backgroundColor: Palette.accent,
  },
  trackChipText: {
    color: Palette.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  trackChipTextActive: {
    color: Palette.bg,
    fontWeight: '700',
  },
  choiceRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  choiceChip: {
    minHeight: 34,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceChipActive: {
    borderColor: Palette.accent,
    backgroundColor: Palette.accent,
  },
  choiceChipText: {
    color: Palette.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  choiceChipTextActive: {
    color: Palette.bg,
    fontWeight: '700',
  },
  setupSummaryCard: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(82, 242, 182, 0.3)',
    backgroundColor: 'rgba(82, 242, 182, 0.08)',
    padding: 12,
  },
  setupSummaryText: {
    color: Palette.textPrimary,
    fontSize: 12,
    lineHeight: 19,
  },
  startBtn: {
    minHeight: 56,
    borderRadius: Radius.md,
    backgroundColor: Palette.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  startBtnText: {
    color: Palette.bg,
    fontSize: 15,
    fontWeight: '800',
  },
  topRow: {
    marginTop: 10,
    marginBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statPill: {
    minHeight: 32,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statPillText: {
    color: Palette.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  progressCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    padding: 12,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    color: Palette.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  progressTrack: {
    height: 8,
    borderRadius: 8,
    backgroundColor: '#173029',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: Palette.accent,
  },
  utilityRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  utilityBtn: {
    flex: 1,
    minHeight: 38,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  utilityBtnDisabled: {
    opacity: 0.45,
  },
  utilityBtnText: {
    color: Palette.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  utilityBtnTextDisabled: {
    color: Palette.textMuted,
  },
  questionCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    padding: 18,
  },
  questionTopic: {
    ...Fonts.label,
    color: Palette.accent,
    marginBottom: 8,
  },
  questionText: {
    color: Palette.textPrimary,
    fontSize: 21,
    fontWeight: '700',
    lineHeight: 30,
  },
  optionsList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  optionBtn: {
    minHeight: 58,
    borderRadius: Radius.md,
    borderWidth: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
  },
  optionLetter: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterText: {
    fontSize: 13,
    fontWeight: '700',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  optionHidden: {
    minHeight: 44,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    borderStyle: 'dashed',
    backgroundColor: Palette.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionHiddenText: {
    color: Palette.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  feedbackCard: {
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: 14,
  },
  feedbackText: {
    fontSize: 13,
    lineHeight: 20,
  },
  nextBtn: {
    marginTop: 12,
    marginHorizontal: 16,
    minHeight: 54,
    borderRadius: Radius.md,
    backgroundColor: Palette.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  nextBtnText: {
    color: Palette.bg,
    fontSize: 15,
    fontWeight: '800',
  },
  resultsHeader: {
    paddingTop: 26,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  resultsIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: 'rgba(82,242,182,0.5)',
    backgroundColor: 'rgba(82,242,182,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  resultsScore: {
    color: Palette.textPrimary,
    fontSize: 60,
    fontWeight: '800',
    lineHeight: 66,
  },
  resultsMax: {
    color: Palette.textMuted,
    fontSize: 28,
  },
  resultsTitle: {
    marginTop: 8,
    color: Palette.accent,
    fontSize: 24,
    fontWeight: '800',
  },
  resultsSub: {
    marginTop: 6,
    color: Palette.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  resultsPanel: {
    marginTop: 18,
    marginHorizontal: 16,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    padding: 14,
  },
  resultsHint: {
    color: Palette.textMuted,
    fontSize: 12,
  },
  topicRow: {
    minHeight: 34,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    paddingHorizontal: 10,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topicRowLabel: {
    color: Palette.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  topicRowValue: {
    color: Palette.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  resultsActions: {
    marginTop: 14,
    paddingHorizontal: 16,
    gap: 10,
  },
  secondaryBtn: {
    minHeight: 48,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryBtnText: {
    color: Palette.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  primaryBtn: {
    minHeight: 52,
    borderRadius: Radius.md,
    backgroundColor: Palette.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  primaryBtnText: {
    color: Palette.bg,
    fontSize: 14,
    fontWeight: '800',
  },
});
