import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Elevation, Fonts, Palette, Radius } from '../constants/design';

const VIDEOS = [
  {
    id: 'ZyTy29GaIrs',
    title: "Earth's Carbon Crisis Explained",
    channel: 'NASA Goddard',
    desc: "A visual explanation of carbon flow through Earth's systems and its climate implications.",
    duration: '4:30',
    tag: 'SCIENCE',
    tagColor: '#7ebdff',
    thumb: 'https://img.youtube.com/vi/ZyTy29GaIrs/hqdefault.jpg',
  },
  {
    id: 'G4H1N_yXBiA',
    title: 'David Attenborough on Biodiversity',
    channel: 'WWF',
    desc: 'A concise call to protect ecosystems and species at risk.',
    duration: '3:58',
    tag: 'NATURE',
    tagColor: '#8be4c0',
    thumb: 'https://img.youtube.com/vi/G4H1N_yXBiA/hqdefault.jpg',
  },
  {
    id: 'ipVCHnFCMos',
    title: 'The Ocean Plastic Problem',
    channel: 'TED-Ed',
    desc: 'How plastic enters oceans and the science behind mitigation strategies.',
    duration: '5:14',
    tag: 'OCEAN',
    tagColor: '#7ebdff',
    thumb: 'https://img.youtube.com/vi/ipVCHnFCMos/hqdefault.jpg',
  },
  {
    id: 'wbR-5mHI6bo',
    title: 'What is Climate Change?',
    channel: 'NASA Climate',
    desc: 'An accessible breakdown of causes, effects, and practical response pathways.',
    duration: '6:02',
    tag: 'CLIMATE',
    tagColor: '#ff9d9d',
    thumb: 'https://img.youtube.com/vi/wbR-5mHI6bo/hqdefault.jpg',
  },
];

const VIDEO_FILTERS = ['ALL', 'SCIENCE', 'NATURE', 'OCEAN', 'CLIMATE'];

export default function VideoScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('ALL');

  const openVideo = async (video) => {
    const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
    await Linking.openURL(videoUrl);
  };

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return VIDEOS.filter((video) => {
      const byTag = filter === 'ALL' || video.tag === filter;
      const byQuery =
        normalizedQuery.length === 0 ||
        video.title.toLowerCase().includes(normalizedQuery) ||
        video.channel.toLowerCase().includes(normalizedQuery) ||
        video.desc.toLowerCase().includes(normalizedQuery);
      return byTag && byQuery;
    });
  }, [query, filter]);

  const featured = filteredVideos[0] || null;
  const rest = filteredVideos.slice(1);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Palette.bg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom + 94,
        }}>
        <View style={styles.header}>
          <Text style={styles.kicker}>LEARNING HUB</Text>
          <Text style={styles.title}>Watch & Learn</Text>
          <Text style={styles.subtitle}>Curated explainers from trusted environmental and science sources.</Text>
          <Text style={styles.linkHint}>Videos open directly on YouTube.</Text>
        </View>

        <View style={styles.controlsWrap}>
          <View style={styles.searchWrap}>
            <Ionicons name="search-outline" size={16} color={Palette.textMuted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search videos"
              placeholderTextColor={Palette.textMuted}
              style={styles.searchInput}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {VIDEO_FILTERS.map((item) => {
              const active = item === filter;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                  onPress={() => setFilter(item)}>
                  <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {featured && (
          <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9} onPress={() => openVideo(featured)}>
            <Image source={{ uri: featured.thumb }} style={styles.featuredThumb} resizeMode="cover" />
            <View style={styles.featuredOverlay}>
              <View style={styles.playButton}>
                <Ionicons name="play" size={22} color={Palette.white} style={{ marginLeft: 2 }} />
              </View>
            </View>

            <View style={styles.featuredMeta}>
              <Text style={[styles.videoTag, { color: featured.tagColor }]}>{featured.tag}</Text>
              <Text style={styles.featuredTitle}>{featured.title}</Text>
              <Text style={styles.featuredChannel}>{featured.channel}  ·  {featured.duration}</Text>
              <View style={styles.openHintRow}>
                <Ionicons name="open-outline" size={12} color={Palette.textMuted} />
                <Text style={styles.openHintText}>Open on YouTube</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>More from the library</Text>
        </View>

        <View style={styles.videoList}>
          {rest.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={styles.videoRow}
              activeOpacity={0.9}
              onPress={() => openVideo(video)}>
              <View style={styles.thumbBox}>
                <Image source={{ uri: video.thumb }} style={styles.rowThumb} resizeMode="cover" />
                <View style={styles.thumbOverlay}>
                  <Ionicons name="play" size={13} color={Palette.white} />
                </View>
              </View>

              <View style={styles.rowMeta}>
                <Text style={[styles.rowTag, { color: video.tagColor }]}>{video.tag}</Text>
                <Text style={styles.rowTitle} numberOfLines={2}>
                  {video.title}
                </Text>
                <Text style={styles.rowChannel}>{video.channel}  ·  {video.duration}</Text>
                <View style={styles.openHintRow}>
                  <Ionicons name="open-outline" size={11} color={Palette.textMuted} />
                  <Text style={styles.openHintText}>YouTube</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {filteredVideos.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="videocam-off-outline" size={18} color={Palette.textMuted} />
              <Text style={styles.emptyStateText}>No videos match this search.</Text>
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
  linkHint: {
    marginTop: 6,
    color: Palette.textMuted,
    fontSize: 11,
    fontWeight: '600',
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
  featuredCard: {
    marginHorizontal: 16,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    overflow: 'hidden',
    ...Elevation.card,
  },
  featuredThumb: {
    width: '100%',
    height: 210,
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 210,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredMeta: {
    padding: 16,
  },
  videoTag: {
    ...Fonts.label,
  },
  featuredTitle: {
    marginTop: 6,
    color: Palette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  featuredChannel: {
    marginTop: 5,
    color: Palette.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  openHintRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  openHintText: {
    color: Palette.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 10,
    paddingHorizontal: 22,
  },
  sectionTitle: {
    ...Fonts.section,
    color: Palette.textPrimary,
  },
  videoList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  videoRow: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    overflow: 'hidden',
    ...Elevation.soft,
  },
  thumbBox: {
    width: 118,
    height: 94,
  },
  rowThumb: {
    width: '100%',
    height: '100%',
  },
  thumbOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowMeta: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  rowTag: {
    ...Fonts.label,
    fontSize: 10,
  },
  rowTitle: {
    marginTop: 5,
    color: Palette.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  rowChannel: {
    marginTop: 4,
    color: Palette.textMuted,
    fontSize: 11,
    fontWeight: '600',
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
});
