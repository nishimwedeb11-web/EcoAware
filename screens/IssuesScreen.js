import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Elevation, Fonts, Palette, Radius } from '../constants/design';
import { ISSUE_COURSES } from '../constants/issue-courses';

const ISSUES = [
  {
    id: 1,
    icon: 'thermometer-outline',
    emoji: '🌡️',
    name: 'Climate Change',
    urgency: 'CRITICAL',
    color: '#ff8f8f',
    surface: '#231114',
    desc: 'Rising greenhouse gas concentrations are driving extreme weather and long-term climate instability.',
    facts: [
      'Earth has warmed about 1.1°C since pre-industrial levels.',
      'Arctic sea ice is shrinking by roughly 13% per decade.',
      'Global mean sea level is rising approximately 3.7 mm/year.',
      '2023 was one of the hottest years observed globally.',
    ],
    action: 'Reduce fossil fuel demand, support renewable energy, and advocate for science-based climate policy.',
  },
  {
    id: 2,
    icon: 'water-outline',
    emoji: '🌊',
    name: 'Ocean Pollution',
    urgency: 'SEVERE',
    color: '#7ebdff',
    surface: '#0f1a28',
    desc: 'Marine systems are under stress from plastics, microfibers, and chemical runoff entering oceans every day.',
    facts: [
      'Around 8 million tonnes of plastic enter oceans each year.',
      'Only about 9% of global plastic has ever been recycled.',
      'Over 1 million seabirds die annually from plastic exposure.',
      'The Great Pacific Garbage Patch is massive and growing.',
    ],
    action: 'Cut single-use plastic, support clean-up efforts, and choose products with low packaging footprints.',
  },
  {
    id: 3,
    icon: 'leaf-outline',
    emoji: '🌳',
    name: 'Deforestation',
    urgency: 'HIGH',
    color: '#8be4c0',
    surface: '#102217',
    desc: 'Forest loss for agriculture and development threatens biodiversity and weakens natural carbon sinks.',
    facts: [
      'About 15 billion trees are cut down yearly.',
      'Forests store nearly 45% of land-based carbon.',
      'The Amazon faces continued land conversion pressure.',
      'Most terrestrial species rely on forest ecosystems.',
    ],
    action: 'Choose certified products, lower demand for deforestation-linked goods, and back restoration projects.',
  },
  {
    id: 4,
    icon: 'paw-outline',
    emoji: '🦁',
    name: 'Biodiversity Loss',
    urgency: 'CRITICAL',
    color: '#ffcf73',
    surface: '#2a1d0e',
    desc: 'Ecosystems are losing species faster than natural rates due to habitat loss, exploitation, and pollution.',
    facts: [
      'Up to 1 million species face extinction risk.',
      'Wildlife populations have dropped sharply since 1970.',
      'Pollinator decline threatens food security globally.',
      'Habitat fragmentation disrupts ecosystem stability.',
    ],
    action: 'Preserve habitats, plant native species, reduce pesticide use, and support conservation programs.',
  },
  {
    id: 5,
    icon: 'rainy-outline',
    emoji: '💧',
    name: 'Water Scarcity',
    urgency: 'HIGH',
    color: '#9ac8ff',
    surface: '#101a2b',
    desc: 'Climate shifts and overconsumption are intensifying freshwater stress across regions and communities.',
    facts: [
      'Only about 3% of Earth’s water is fresh water.',
      'Over 2 billion people lack safely managed drinking water.',
      'Agriculture uses around 70% of freshwater withdrawals.',
      'Demand may exceed supply by 40% by 2030 in many areas.',
    ],
    action: 'Use water efficiently, prevent leakage, and support water-resilient infrastructure and policies.',
  },
  {
    id: 6,
    icon: 'repeat-outline',
    emoji: '♻️',
    name: 'Waste Crisis',
    urgency: 'URGENT',
    color: '#9ef5ba',
    surface: '#112113',
    desc: 'Waste generation outpaces management capacity, driving landfill emissions and environmental contamination.',
    facts: [
      'The world generates over 2 billion tonnes of waste yearly.',
      'Food waste contributes 8-10% of global GHG emissions.',
      'E-waste is one of the fastest growing waste streams.',
      'Recycling rates remain low in many regions.',
    ],
    action: 'Prioritize reduce-reuse-repair systems and improve source separation and circular economy design.',
  },
];

const URGENCY_COLORS = {
  CRITICAL: Palette.danger,
  SEVERE: Palette.warning,
  HIGH: '#89d9b8',
  URGENT: Palette.info,
};

const ISSUE_FILTERS = ['ALL', 'CRITICAL', 'SEVERE', 'HIGH', 'URGENT'];

export default function IssuesScreen() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(null);

  const [query, setQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('ALL');

  const [expandedModules, setExpandedModules] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [knowledgeAlert, setKnowledgeAlert] = useState('');

  const filteredIssues = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return ISSUES.filter((issue) => {
      const matchesUrgency = urgencyFilter === 'ALL' || issue.urgency === urgencyFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        issue.name.toLowerCase().includes(normalizedQuery) ||
        issue.desc.toLowerCase().includes(normalizedQuery);
      return matchesUrgency && matchesQuery;
    });
  }, [query, urgencyFilter]);

  const selectedCourse = selected ? ISSUE_COURSES[selected.id] : null;

  const allQuestionsAnswered = useMemo(() => {
    if (!selectedCourse) {
      return false;
    }

    return selectedCourse.knowledgeCheck.every((question) => quizAnswers[question.id] !== undefined);
  }, [selectedCourse, quizAnswers]);

  const answeredCount = useMemo(() => {
    if (!selectedCourse) {
      return 0;
    }

    return selectedCourse.knowledgeCheck.reduce((count, question) => {
      return count + (quizAnswers[question.id] !== undefined ? 1 : 0);
    }, 0);
  }, [selectedCourse, quizAnswers]);

  const quizScore = useMemo(() => {
    if (!selectedCourse || !quizSubmitted) {
      return 0;
    }

    return selectedCourse.knowledgeCheck.reduce((score, question) => {
      return score + (quizAnswers[question.id] === question.answer ? 1 : 0);
    }, 0);
  }, [selectedCourse, quizSubmitted, quizAnswers]);

  const openCourse = (issue) => {
    const course = ISSUE_COURSES[issue.id];
    const firstModuleId = course?.modules?.[0]?.id;

    setSelected(issue);
    setExpandedModules(firstModuleId ? { [firstModuleId]: true } : {});
    setQuizAnswers({});
    setQuizSubmitted(false);
    setKnowledgeAlert('');
  };

  const closeCourse = () => {
    setSelected(null);
    setExpandedModules({});
    setQuizAnswers({});
    setQuizSubmitted(false);
    setKnowledgeAlert('');
  };

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const chooseAnswer = (questionId, optionIndex) => {
    if (quizSubmitted) {
      return;
    }

    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
    setKnowledgeAlert('');
  };

  const submitKnowledgeCheck = () => {
    if (!allQuestionsAnswered) {
      setKnowledgeAlert('Answer all questions before submitting the knowledge check.');
      return;
    }
    setKnowledgeAlert('');
    setQuizSubmitted(true);
  };

  const resetKnowledgeCheck = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setKnowledgeAlert('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Palette.bg} />

      <Modal visible={!!selected} animationType="slide" transparent={false}>
        {selected && (
          <View style={styles.modalContainer}>
            <StatusBar barStyle="light-content" backgroundColor={selected.surface} />

            <View style={[styles.modalTop, { backgroundColor: selected.surface, paddingTop: insets.top + 14 }]}>
              <TouchableOpacity style={styles.backBtn} onPress={closeCourse}>
                <Ionicons name="chevron-back" size={16} color={Palette.textPrimary} />
                <Text style={styles.backBtnText}>Back</Text>
              </TouchableOpacity>

              <View style={styles.modalHero}>
                <View style={[styles.modalIconWrap, { borderColor: selected.color + '70' }]}>
                  <Text style={styles.modalEmoji}>{selected.emoji}</Text>
                </View>
                <Text style={styles.modalName}>{selected.name}</Text>
                <View style={[styles.modalUrgencyBadge, { borderColor: selected.color + '80' }]}>
                  <Text style={[styles.modalUrgencyText, { color: selected.color }]}>{selected.urgency}</Text>
                </View>
                {selectedCourse && <Text style={styles.modalCourseTitle}>{selectedCourse.courseTitle}</Text>}
              </View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: insets.bottom + 28 }}
              style={styles.modalBody}>
              <Text style={styles.modalDescription}>{selected.desc}</Text>

              <View style={styles.courseMetaCard}>
                <View style={styles.courseMetaRow}>
                  <Text style={styles.courseMetaLabel}>Course level</Text>
                  <Text style={styles.courseMetaValue}>{selectedCourse?.level || 'Intermediate'}</Text>
                </View>
                <View style={styles.courseMetaRow}>
                  <Text style={styles.courseMetaLabel}>Estimated time</Text>
                  <Text style={styles.courseMetaValue}>{selectedCourse?.estimatedHours || '3h'}</Text>
                </View>
                <View style={styles.courseMetaRow}>
                  <Text style={styles.courseMetaLabel}>Modules</Text>
                  <Text style={styles.courseMetaValue}>{selectedCourse?.modules.length || 0}</Text>
                </View>
              </View>

              <Text style={styles.modalSection}>Quick facts brief</Text>
              {selected.facts.map((fact) => (
                <View key={fact} style={styles.factRow}>
                  <View style={[styles.factDot, { backgroundColor: selected.color }]} />
                  <Text style={styles.factText}>{fact}</Text>
                </View>
              ))}

              {selectedCourse && (
                <>
                  <Text style={styles.modalSection}>Learning objectives</Text>
                  <View style={styles.objectiveList}>
                    {selectedCourse.objectives.map((objective) => (
                      <View key={objective} style={styles.objectiveRow}>
                        <Ionicons name="checkmark-circle" size={15} color={selected.color} />
                        <Text style={styles.objectiveText}>{objective}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.modalSection}>Course outline</Text>
                  <View style={styles.moduleList}>
                    {selectedCourse.modules.map((module, moduleIndex) => {
                      const expanded = !!expandedModules[module.id];
                      return (
                        <View key={module.id} style={styles.moduleCard}>
                          <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.moduleTouchArea}
                            onPress={() => toggleModule(module.id)}>
                            <View style={styles.moduleTopRow}>
                              <Text style={styles.moduleTag}>Module {moduleIndex + 1}</Text>
                              <Text style={styles.moduleDuration}>{module.duration}</Text>
                            </View>
                            <Text style={styles.moduleTitle}>{module.title}</Text>
                            <Text style={styles.moduleSummary}>{module.summary}</Text>

                            <View style={styles.moduleBottomRow}>
                              <Text style={styles.moduleLessonCount}>{module.lessons.length} lessons</Text>
                              <Ionicons
                                name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'}
                                size={16}
                                color={Palette.textSecondary}
                              />
                            </View>
                          </TouchableOpacity>

                          {expanded && (
                            <View style={styles.lessonList}>
                              {module.lessons.map((lesson, lessonIndex) => (
                                <View key={lesson.title} style={styles.lessonCard}>
                                  <Text style={styles.lessonTitle}>Lesson {lessonIndex + 1}: {lesson.title}</Text>
                                  <Text style={styles.lessonContent}>{lesson.content}</Text>
                                </View>
                              ))}
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </View>

                  <Text style={styles.modalSection}>Knowledge check</Text>
                  <View style={styles.knowledgeCheckWrap}>
                    <View style={styles.knowledgeProgressRow}>
                      <Text style={styles.knowledgeProgressText}>
                        Progress: {answeredCount}/{selectedCourse.knowledgeCheck.length} answered
                      </Text>
                      <Text style={styles.knowledgeProgressText}>
                        {Math.round((answeredCount / selectedCourse.knowledgeCheck.length) * 100)}%
                      </Text>
                    </View>
                    <View style={styles.knowledgeProgressTrack}>
                      <View
                        style={[
                          styles.knowledgeProgressFill,
                          { width: `${(answeredCount / selectedCourse.knowledgeCheck.length) * 100}%` },
                        ]}
                      />
                    </View>

                    {selectedCourse.knowledgeCheck.map((question, questionIndex) => {
                      const picked = quizAnswers[question.id];

                      return (
                        <View key={question.id} style={styles.questionCard}>
                          <Text style={styles.questionTitle}>Q{questionIndex + 1}. {question.prompt}</Text>

                          {question.options.map((option, optionIndex) => {
                            const selectedOption = picked === optionIndex;
                            const correctOption = optionIndex === question.answer;

                            let optionBorder = Palette.border;
                            let optionBg = Palette.surfaceAlt;
                            let optionTextColor = Palette.textPrimary;

                            if (!quizSubmitted && selectedOption) {
                              optionBorder = selected.color + 'AA';
                              optionBg = selected.color + '22';
                            }

                            if (quizSubmitted && correctOption) {
                              optionBorder = Palette.accent;
                              optionBg = 'rgba(82,242,182,0.14)';
                              optionTextColor = Palette.accent;
                            }

                            if (quizSubmitted && selectedOption && !correctOption) {
                              optionBorder = Palette.danger;
                              optionBg = 'rgba(255,125,125,0.14)';
                              optionTextColor = Palette.danger;
                            }

                            return (
                              <TouchableOpacity
                                key={`${question.id}-${optionIndex}`}
                                disabled={quizSubmitted}
                                onPress={() => chooseAnswer(question.id, optionIndex)}
                                style={[
                                  styles.answerOption,
                                  { borderColor: optionBorder, backgroundColor: optionBg },
                                ]}>
                                <Text style={[styles.answerOptionText, { color: optionTextColor }]}>{option}</Text>
                                {!quizSubmitted && selectedOption && (
                                  <Ionicons name="radio-button-on" size={16} color={selected.color} />
                                )}
                                {quizSubmitted && correctOption && (
                                  <Ionicons name="checkmark-circle" size={16} color={Palette.accent} />
                                )}
                                {quizSubmitted && selectedOption && !correctOption && (
                                  <Ionicons name="close-circle" size={16} color={Palette.danger} />
                                )}
                              </TouchableOpacity>
                            );
                          })}

                          {quizSubmitted && <Text style={styles.answerExplanation}>{question.explanation}</Text>}
                        </View>
                      );
                    })}

                    {!quizSubmitted ? (
                      <TouchableOpacity
                        style={[styles.submitQuizBtn, !allQuestionsAnswered && styles.submitQuizBtnDisabled]}
                        onPress={submitKnowledgeCheck}>
                        <Ionicons name="school-outline" size={16} color={allQuestionsAnswered ? Palette.bg : Palette.textMuted} />
                        <Text style={[styles.submitQuizBtnText, !allQuestionsAnswered && styles.submitQuizBtnTextDisabled]}>
                          Submit knowledge check
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.quizResultCard}>
                        <Text style={styles.quizResultText}>
                          Score: {quizScore}/{selectedCourse.knowledgeCheck.length} ({Math.round((quizScore / selectedCourse.knowledgeCheck.length) * 100)}%)
                        </Text>
                        <TouchableOpacity style={styles.retakeBtn} onPress={resetKnowledgeCheck}>
                          <Ionicons name="refresh-outline" size={14} color={Palette.textPrimary} />
                          <Text style={styles.retakeBtnText}>Retake</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {!!knowledgeAlert && (
                      <View style={styles.knowledgeAlertWrap}>
                        <Ionicons name="alert-circle-outline" size={14} color={Palette.warning} />
                        <Text style={styles.knowledgeAlertText}>{knowledgeAlert}</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.modalSection}>Implementation action plan</Text>
                  <View style={styles.actionPlanWrap}>
                    {selectedCourse.actionPlan.map((step, index) => (
                      <View key={step} style={styles.planRow}>
                        <View style={styles.planStepIndex}>
                          <Text style={styles.planStepIndexText}>{index + 1}</Text>
                        </View>
                        <Text style={styles.planStepText}>{step}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.modalSection}>Completion criteria</Text>
                  <View style={styles.criteriaWrap}>
                    {selectedCourse.completionCriteria.map((criterion) => (
                      <View key={criterion} style={styles.criteriaRow}>
                        <Ionicons name="ribbon-outline" size={14} color={selected.color} />
                        <Text style={styles.criteriaText}>{criterion}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.modalSection}>Further resources</Text>
                  <View style={styles.resourcesWrap}>
                    {selectedCourse.resources.map((resource) => (
                      <View key={resource} style={styles.resourceRow}>
                        <Ionicons name="document-text-outline" size={14} color={Palette.info} />
                        <Text style={styles.resourceText}>{resource}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}

              <View style={[styles.actionCard, { borderColor: selected.color + '55' }]}>
                <View style={styles.actionHeader}>
                  <Ionicons name="bulb-outline" size={15} color={selected.color} />
                  <Text style={[styles.actionTitle, { color: selected.color }]}>Core recommended action</Text>
                </View>
                <Text style={styles.actionText}>{selected.action}</Text>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom + 94,
        }}>
        <View style={styles.header}>
          <Text style={styles.kicker}>INSIGHTS</Text>
          <Text style={styles.title}>Planetary Issues</Text>
          <Text style={styles.subtitle}>
            Explore the highest-impact environmental challenges and practical response actions.
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>6</Text>
            <Text style={styles.summaryLabel}>Critical domains</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>42+</Text>
            <Text style={styles.summaryLabel}>Issues tracked</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>127</Text>
            <Text style={styles.summaryLabel}>Countries impacted</Text>
          </View>
        </View>

        <View style={styles.controlsWrap}>
          <View style={styles.searchWrap}>
            <Ionicons name="search-outline" size={16} color={Palette.textMuted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search issues"
              placeholderTextColor={Palette.textMuted}
              style={styles.searchInput}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {ISSUE_FILTERS.map((filter) => {
              const active = filter === urgencyFilter;
              return (
                <TouchableOpacity
                  key={filter}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                  onPress={() => setUrgencyFilter(filter)}>
                  <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{filter}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.list}>
          {filteredIssues.map((issue) => {
            const course = ISSUE_COURSES[issue.id];
            return (
              <TouchableOpacity
                key={issue.id}
                activeOpacity={0.9}
                onPress={() => openCourse(issue)}
                style={styles.issueCard}>
                <View style={[styles.issueIconWrap, { backgroundColor: issue.surface }]}>
                  <Ionicons name={issue.icon} size={20} color={issue.color} />
                </View>

                <View style={styles.issueBody}>
                  <View style={styles.issueTopRow}>
                    <Text style={styles.issueName}>{issue.name}</Text>
                    <View
                      style={[
                        styles.urgencyPill,
                        {
                          borderColor: URGENCY_COLORS[issue.urgency] + '66',
                          backgroundColor: URGENCY_COLORS[issue.urgency] + '16',
                        },
                      ]}>
                      <Text style={[styles.urgencyPillText, { color: URGENCY_COLORS[issue.urgency] }]}>{issue.urgency}</Text>
                    </View>
                  </View>

                  <Text numberOfLines={2} style={styles.issueDesc}>{issue.desc}</Text>

                  <View style={styles.issueFooter}>
                    <Text style={[styles.issueHint, { color: issue.color }]}>Start course</Text>
                    <Text style={styles.issueMeta}>{course ? `${course.modules.length} modules · ${course.estimatedHours}` : 'Course'}</Text>
                    <Ionicons name="chevron-forward" size={16} color={issue.color} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {filteredIssues.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="alert-circle-outline" size={18} color={Palette.textMuted} />
              <Text style={styles.emptyStateText}>No issues match this filter.</Text>
            </View>
          )}
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
  header: {
    paddingHorizontal: 22,
    marginBottom: 14,
  },
  kicker: {
    ...Fonts.label,
    color: Palette.accent,
  },
  title: {
    ...Fonts.title,
    color: Palette.textPrimary,
    marginTop: 4,
  },
  subtitle: {
    marginTop: 6,
    color: Palette.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    alignItems: 'center',
    paddingVertical: 14,
  },
  summaryValue: {
    color: Palette.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  summaryLabel: {
    marginTop: 4,
    color: Palette.textMuted,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  controlsWrap: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchWrap: {
    minHeight: 42,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: Palette.textPrimary,
    fontSize: 13,
    paddingVertical: 0,
  },
  filterRow: {
    paddingTop: 10,
    paddingRight: 4,
    gap: 8,
  },
  filterChip: {
    minHeight: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 11,
  },
  filterChipActive: {
    borderColor: Palette.accent,
    backgroundColor: Palette.accent,
  },
  filterChipText: {
    color: Palette.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  filterChipTextActive: {
    color: Palette.bg,
  },
  list: {
    paddingHorizontal: 16,
    gap: 12,
  },
  issueCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    ...Elevation.soft,
  },
  issueIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Palette.border,
  },
  issueBody: {
    flex: 1,
  },
  issueTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  issueName: {
    flex: 1,
    color: Palette.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  urgencyPill: {
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  urgencyPillText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  issueDesc: {
    color: Palette.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  issueFooter: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  issueHint: {
    fontSize: 12,
    fontWeight: '700',
  },
  issueMeta: {
    color: Palette.textMuted,
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  emptyState: {
    minHeight: 90,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  emptyStateText: {
    color: Palette.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Palette.bg,
  },
  modalTop: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  backBtn: {
    alignSelf: 'flex-start',
    minHeight: 36,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(0,0,0,0.24)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  backBtnText: {
    color: Palette.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  modalHero: {
    alignItems: 'center',
  },
  modalIconWrap: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.22)',
    marginBottom: 12,
  },
  modalEmoji: {
    fontSize: 34,
  },
  modalName: {
    color: Palette.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  modalUrgencyBadge: {
    marginTop: 10,
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  modalUrgencyText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  modalCourseTitle: {
    marginTop: 10,
    color: Palette.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  modalDescription: {
    color: Palette.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  courseMetaCard: {
    marginTop: 14,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    padding: 12,
    gap: 8,
  },
  courseMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseMetaLabel: {
    color: Palette.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  courseMetaValue: {
    color: Palette.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  modalSection: {
    marginTop: 18,
    marginBottom: 10,
    ...Fonts.label,
    color: Palette.textPrimary,
  },
  factRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  factDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 8,
  },
  factText: {
    flex: 1,
    color: Palette.textPrimary,
    fontSize: 14,
    lineHeight: 21,
  },
  objectiveList: {
    gap: 8,
  },
  objectiveRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    padding: 10,
  },
  objectiveText: {
    flex: 1,
    color: Palette.textPrimary,
    fontSize: 13,
    lineHeight: 20,
  },
  moduleList: {
    gap: 10,
  },
  moduleCard: {
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    ...Elevation.soft,
  },
  moduleTouchArea: {
    padding: 12,
  },
  moduleTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  moduleTag: {
    color: Palette.accent,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  moduleDuration: {
    color: Palette.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  moduleTitle: {
    color: Palette.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  moduleSummary: {
    color: Palette.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  moduleBottomRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleLessonCount: {
    color: Palette.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  lessonList: {
    borderTopWidth: 1,
    borderTopColor: Palette.border,
    padding: 10,
    gap: 8,
  },
  lessonCard: {
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    padding: 10,
  },
  lessonTitle: {
    color: Palette.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  lessonContent: {
    color: Palette.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  knowledgeCheckWrap: {
    gap: 10,
  },
  knowledgeProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  knowledgeProgressText: {
    color: Palette.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  knowledgeProgressTrack: {
    height: 6,
    borderRadius: 6,
    backgroundColor: Palette.surfaceAlt,
    overflow: 'hidden',
  },
  knowledgeProgressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: Palette.accent,
  },
  questionCard: {
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    padding: 12,
    gap: 8,
  },
  questionTitle: {
    color: Palette.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },
  answerOption: {
    minHeight: 38,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  answerOptionText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  answerExplanation: {
    marginTop: 4,
    color: Palette.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  submitQuizBtn: {
    marginTop: 4,
    minHeight: 44,
    borderRadius: Radius.md,
    backgroundColor: Palette.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  submitQuizBtnDisabled: {
    backgroundColor: Palette.surfaceAlt,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  submitQuizBtnText: {
    color: Palette.bg,
    fontSize: 13,
    fontWeight: '800',
  },
  submitQuizBtnTextDisabled: {
    color: Palette.textMuted,
  },
  quizResultCard: {
    marginTop: 4,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  quizResultText: {
    color: Palette.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  retakeBtn: {
    minHeight: 30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    paddingHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  retakeBtnText: {
    color: Palette.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  knowledgeAlertWrap: {
    minHeight: 36,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.warning + '80',
    backgroundColor: 'rgba(249,190,99,0.12)',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  knowledgeAlertText: {
    flex: 1,
    color: Palette.warning,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  actionPlanWrap: {
    gap: 8,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    padding: 10,
  },
  planStepIndex: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(82,242,182,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planStepIndexText: {
    color: Palette.accent,
    fontSize: 11,
    fontWeight: '800',
  },
  planStepText: {
    flex: 1,
    color: Palette.textPrimary,
    fontSize: 13,
    lineHeight: 20,
  },
  criteriaWrap: {
    gap: 8,
  },
  criteriaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    padding: 10,
  },
  criteriaText: {
    flex: 1,
    color: Palette.textPrimary,
    fontSize: 12,
    lineHeight: 18,
  },
  resourcesWrap: {
    gap: 8,
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surfaceAlt,
    padding: 10,
  },
  resourceText: {
    flex: 1,
    color: Palette.textPrimary,
    fontSize: 12,
    lineHeight: 18,
  },
  actionCard: {
    marginTop: 16,
    borderRadius: Radius.lg,
    borderWidth: 1,
    backgroundColor: Palette.surface,
    padding: 16,
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionTitle: {
    ...Fonts.label,
  },
  actionText: {
    marginTop: 8,
    color: Palette.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
});
