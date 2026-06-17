import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import Header          from '../components/Header';
import SubNavbar       from '../components/SubNavbar';
import CoverflowCarousel from '../components/CoverflowCarousel';
import SectionTitle    from '../components/SectionTitle';
import WebtoonGrid     from '../components/WebtoonGrid';
import SanctuaryFrame  from '../components/SanctuaryFrame';
import CommunitySection from '../components/CommunitySection';

import {
  TREND_SERIES,
  DISCOVER_SERIES,
  NEW_MINNAKS,
  COMPLETED_SERIES,
} from '../data/series';
import { Colors, Gradients, Spacing } from '../theme';

// ─── Accent line used beside Yeni Minnaklar title ────────────────────────────
function AccentLine() {
  return (
    <LinearGradient
      colors={[Colors.darkBlue, Colors.cyan, Colors.darkBlue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={accentStyles.line}
    />
  );
}
const accentStyles = StyleSheet.create({
  line: { flex: 1, height: 3, borderRadius: 2, marginLeft: Spacing.md },
});

// ─── HomeScreen ───────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const { width: screenW } = useWindowDimensions();

  // The two-column content grid is only shown as side-by-side on screens ≥ 700 px.
  // On narrower devices the sidebar stacks below the main feed.
  const isWide   = screenW >= 700;
  const PADDING  = Spacing.lg * 2;                         // 32
  const SIDEBAR  = 260;
  const COL_GAP  = Spacing.lg;
  // Left column width = whatever remains after sidebar + gap
  const leftColW = isWide ? screenW - PADDING - COL_GAP - SIDEBAR : screenW - PADDING;

  // Card columns: 4 on wide, 2 on narrow
  const gridCols      = isWide ? 4 : 2;
  const gridPadding   = PADDING + (isWide ? SIDEBAR + COL_GAP : 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >

        {/* ── TOP REGION (gradient zone) ─────────────────── */}
        <Header />
        <SubNavbar />

        {/* ── BODY (solid black) ────────────────────────── */}
        <View style={styles.body}>

          {/* TRENDLER carousel */}
          <View style={styles.section}>
            <SectionTitle title="Trendler" />
            <CoverflowCarousel data={TREND_SERIES} />
          </View>

          {/* SPLIT CONTENT GRID */}
          <View style={[styles.splitGrid, isWide && styles.splitGridRow]}>

            {/* Left column: Keşfet + Yeni Minnaklar */}
            <View style={[styles.leftCol, isWide && { width: leftColW }]}>

              {/* KEŞFET */}
              <View style={styles.section}>
                <SectionTitle title="Keşfet" />
                <WebtoonGrid
                  data={DISCOVER_SERIES}
                  columns={gridCols}
                  parentPadding={gridPadding}
                />
              </View>

              {/* YENİ MİNNAKLAR */}
              <View style={styles.section}>
                <SectionTitle title="Yeni Minnaklar" rightSlot={<AccentLine />} />
                <WebtoonGrid
                  data={NEW_MINNAKS}
                  columns={gridCols}
                  parentPadding={gridPadding}
                />
              </View>

            </View>
            {/* /Left column */}

            {/* Right column: Sanctuary frame */}
            <SanctuaryFrame data={COMPLETED_SERIES} />

          </View>
          {/* /SPLIT CONTENT GRID */}

          {/* COMMUNITY SECTION */}
          <View style={styles.communityWrap}>
            <CommunitySection />
          </View>

        </View>
        {/* /BODY */}

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Solid-black body below the gradient header zone
  body: {
    backgroundColor: Colors.black,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: 0,
  },

  section: {
    marginBottom: Spacing.xl,
  },

  // 2-col split
  splitGrid: {
    gap: Spacing.lg,
    marginBottom: 0,
  },
  splitGridRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftCol: {
    flex: 1,
  },

  communityWrap: {
    marginTop: Spacing.md,
  },
});
