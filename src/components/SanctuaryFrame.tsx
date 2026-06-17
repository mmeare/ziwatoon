import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, Typography, Spacing, Radius, Shadows } from '../theme';
import { SmallCard } from './WebtoonCard';
import { Series } from '../data/series';

interface Props {
  data: Series[];
}

export default function SanctuaryFrame({ data }: Props) {
  const COLUMNS    = 2;
  const H_PADDING  = Spacing.md * 2; // inner frame padding × 2
  const CARD_GAP   = Spacing.xs;

  // Frame has a fixed width of 260 on wider screens; cards fill it
  const FRAME_W   = 260;
  const cardWidth = (FRAME_W - H_PADDING - CARD_GAP) / COLUMNS;

  return (
    <View style={styles.wrapper}>
      {/* ── Outer neon frame ───────────────────────────────── */}
      <LinearGradient
        colors={Gradients.sidebarBg as string[]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.frame}
      >
        {/* Corner accents */}
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />

        {/* Floating title badge */}
        <View style={styles.titleBadgeWrap}>
          <LinearGradient
            colors={Gradients.titleBox}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleBadge}
          >
            <Text style={styles.titleText}>Tamamlanmış Cicişler</Text>
          </LinearGradient>
        </View>

        {/* Dense 2-column card grid */}
        <View style={styles.grid}>
          {data.map((item) => (
            <SmallCard key={item.id} item={item} width={cardWidth} />
          ))}
        </View>

        {/* See-all CTA */}
        <TouchableOpacity activeOpacity={0.8} style={styles.ctaWrap}>
          <LinearGradient
            colors={Gradients.authBtn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cta}
          >
            <Text style={styles.ctaText}>Tümünü Gör →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 260,
    // Stick to top of the content grid row
    alignSelf: 'flex-start',
  },

  frame: {
    borderWidth: 2,
    borderColor: 'rgba(54,173,163,0.35)',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    paddingTop: Spacing.xl + 4, // space for the floating title badge
    position: 'relative',
    overflow: 'visible',
  },

  // ── Corner accent squares ────────────────────────────────
  corner: {
    position: 'absolute',
    width: 11,
    height: 11,
    backgroundColor: Colors.cyan,
    ...Shadows.neonCyan,
  },
  cornerTL: { top: -1,  left: -1  },
  cornerTR: { top: -1,  right: -1 },
  cornerBL: { bottom: -1, left: -1  },
  cornerBR: { bottom: -1, right: -1 },

  // ── Floating title badge ─────────────────────────────────
  titleBadgeWrap: {
    position: 'absolute',
    top: -14,
    alignSelf: 'center',
    // width must be set for absolute centering
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  titleBadge: {
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    borderRadius: Radius.md,
    paddingVertical: 4,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.black, // fallback underneath gradient
  },
  titleText: {
    ...Typography.label,
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    fontSize: 10,
  },

  // ── Card grid ────────────────────────────────────────────
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },

  // ── CTA button ───────────────────────────────────────────
  ctaWrap: {
    marginTop: Spacing.sm,
    alignSelf: 'center',
  },
  cta: {
    borderWidth: 1,
    borderColor: Colors.cyan,
    borderRadius: Radius.pill,
    paddingVertical: 5,
    paddingHorizontal: Spacing.xl,
  },
  ctaText: {
    ...Typography.nav,
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});
