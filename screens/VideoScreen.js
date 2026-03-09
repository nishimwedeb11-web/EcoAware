import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Modal, Image, Dimensions
} from 'react-native';
import { useState } from 'react';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const VIDEOS = [
  {
    id: 'ZyTy29GaIrs',
    title: "Earth's Carbon Crisis Explained",
    channel: 'NASA Goddard',
    desc: "NASA visualises how carbon dioxide moves through Earth's atmosphere and why it matters for our climate.",
    duration: '4:30',
    tag: '🛰️ SCIENCE',
    tagColor: '#48cae4',
    thumb: 'https://img.youtube.com/vi/ZyTy29GaIrs/hqdefault.jpg',
  },
  {
    id: 'G4H1N_yXBiA',
    title: 'David Attenborough on Biodiversity',
    channel: 'WWF',
    desc: "Sir David Attenborough delivers a powerful message about protecting Earth's wildlife.",
    duration: '3:58',
    tag: '🌿 NATURE',
    tagColor: '#a8d5a2',
    thumb: 'https://img.youtube.com/vi/G4H1N_yXBiA/hqdefault.jpg',
  },
  {
    id: 'ipVCHnFCMos',
    title: 'The Ocean Plastic Problem',
    channel: 'TED-Ed',
    desc: 'How billions of tonnes of plastic end up in our oceans and what scientists are doing about it.',
    duration: '5:14',
    tag: '🌊 OCEAN',
    tagColor: '#48cae4',
    thumb: 'https://img.youtube.com/vi/ipVCHnFCMos/hqdefault.jpg',
  },
  {
    id: 'wbR-5mHI6bo',
    title: 'What is Climate Change?',
    channel: 'NASA Climate',
    desc: 'A clear visual explanation of climate change, its causes, effects, and what we can do.',
    duration: '6:02',
    tag: '🔥 CLIMATE',
    tagColor: '#ff6b6b',
    thumb: 'https://img.youtube.com/vi/wbR-5mHI6bo/hqdefault.jpg',
  },
];

export default function VideoScreen() {
  const insets = useSafeAreaInsets();
  const [playing, setPlaying] = useState(null);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#050f07" />

      {/* VIDEO PLAYER MODAL */}
      <Modal visible={!!playing} animationType="slide" transparent={false}>
        <View style={[styles.playerModal, { paddingTop: insets.top }]}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => setPlaying(null)}>
            <Text style={styles.closeBtnText}>✕  Close</Text>
          </TouchableOpacity>
          {playing && (
            <>
              <View style={styles.playerBox}>
                <WebView
                  source={{ uri: `https://www.youtube.com/embed/${playing.id}?autoplay=1&rel=0` }}
                  style={styles.webview}
                  allowsFullscreenVideo
                  javaScriptEnabled
                />
              </View>
              <View style={styles.playerMeta}>
                <Text style={[styles.playerTag, { color: playing.tagColor }]}>{playing.tag}</Text>
                <Text style={styles.playerTitle}>{playing.title}</Text>
                <Text style={styles.playerChannel}>{playing.channel}  ·  {playing.duration}</Text>
                <Text style={styles.playerDesc}>{playing.desc}</Text>
              </View>
            </>
          )}
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Watch & Learn</Text>
          <Text style={styles.screenSub}>Curated videos from NASA, WWF and TED-Ed</Text>
        </View>

        {/* FEATURED VIDEO */}
        <TouchableOpacity style={styles.featuredCard} onPress={() => setPlaying(VIDEOS[0])}>
          <Image
            source={{ uri: VIDEOS[0].thumb }}
            style={styles.featuredThumb}
            resizeMode="cover"
          />
          <View style={styles.featuredOverlay}>
            <View style={styles.featuredPlayBtn}>
              <Text style={styles.featuredPlayIcon}>▶</Text>
            </View>
          </View>
          <View style={styles.featuredMeta}>
            <Text style={[styles.videoTag, { color: VIDEOS[0].tagColor }]}>{VIDEOS[0].tag}</Text>
            <Text style={styles.featuredTitle}>{VIDEOS[0].title}</Text>
            <Text style={styles.featuredChannel}>{VIDEOS[0].channel}  ·  {VIDEOS[0].duration}</Text>
          </View>
        </TouchableOpacity>

        {/* MORE VIDEOS */}
        <Text style={styles.sectionTitle}>More Videos</Text>
        <View style={styles.videoList}>
          {VIDEOS.slice(1).map((v) => (
            <TouchableOpacity key={v.id} style={styles.videoRow} onPress={() => setPlaying(v)}>
              <View style={styles.thumbBox}>
                <Image source={{ uri: v.thumb }} style={styles.rowThumb} resizeMode="cover" />
                <View style={styles.rowPlayOverlay}>
                  <Text style={{ color: 'white', fontSize: 14 }}>▶</Text>
                </View>
              </View>
              <View style={styles.rowMeta}>
                <Text style={[styles.rowTag, { color: v.tagColor }]}>{v.tag}</Text>
                <Text style={styles.rowTitle} numberOfLines={2}>{v.title}</Text>
                <Text style={styles.rowChannel}>{v.channel}  ·  {v.duration}</Text>
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
  header: { padding: 22, paddingBottom: 16 },
  screenTitle: { color: '#e8f5ee', fontSize: 30, fontWeight: '800', letterSpacing: -0.5 },
  screenSub: { color: '#5a8a6a', fontSize: 13, marginTop: 4 },
  featuredCard: {
    marginHorizontal: 16, borderRadius: 24, overflow: 'hidden',
    backgroundColor: '#0a1f10', marginBottom: 24, borderWidth: 1, borderColor: '#1a3a20',
  },
  featuredThumb: { width: '100%', height: 200 },
  featuredOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 200,
    backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center',
  },
  featuredPlayBtn: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  featuredPlayIcon: { color: 'white', fontSize: 22, marginLeft: 3 },
  featuredMeta: { padding: 16 },
  videoTag: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, marginBottom: 6 },
  featuredTitle: { color: '#e8f5ee', fontSize: 18, fontWeight: '700', lineHeight: 24, marginBottom: 6 },
  featuredChannel: { color: '#5a8a6a', fontSize: 12 },
  sectionTitle: {
    color: '#e8f5ee', fontSize: 18, fontWeight: '700',
    paddingHorizontal: 22, marginBottom: 14, letterSpacing: -0.3,
  },
  videoList: { paddingHorizontal: 16, gap: 14 },
  videoRow: {
    flexDirection: 'row', gap: 14, backgroundColor: '#0a1f10',
    borderRadius: 16, borderWidth: 1, borderColor: '#1a3a20', overflow: 'hidden',
  },
  thumbBox: { width: 110 },
  rowThumb: { width: 110, height: 90 },
  rowPlayOverlay: {
    position: 'absolute', top: 0, left: 0, width: 110, height: 90,
    backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center',
  },
  rowMeta: { flex: 1, padding: 10, justifyContent: 'center' },
  rowTag: { fontSize: 9, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  rowTitle: { color: '#e8f5ee', fontSize: 13, fontWeight: '700', lineHeight: 18, marginBottom: 4 },
  rowChannel: { color: '#5a8a6a', fontSize: 11 },
  playerModal: { flex: 1, backgroundColor: '#050f07' },
  closeBtn: { padding: 20, paddingBottom: 12 },
  closeBtnText: { color: '#8ab09a', fontSize: 14, fontWeight: '600' },
  playerBox: { width: width, height: width * 0.5625, backgroundColor: '#000' },
  webview: { flex: 1 },
  playerMeta: { padding: 22 },
  playerTag: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginBottom: 8 },
  playerTitle: { color: '#e8f5ee', fontSize: 22, fontWeight: '800', lineHeight: 28, marginBottom: 6 },
  playerChannel: { color: '#5a8a6a', fontSize: 13, marginBottom: 12 },
  playerDesc: { color: '#8ab09a', fontSize: 14, lineHeight: 22 },
});