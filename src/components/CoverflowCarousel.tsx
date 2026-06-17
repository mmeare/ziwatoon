import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  PanResponder,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Gradients, Shadows, Typography, Spacing, Radius } from '../theme';
import { Series } from '../data/series';

// ─── Layout constants ─────────────────────────────────────────────────────────
const CARD_W       = 130;
const CARD_H       = 195;
const CARD_GAP     = 10;
const VISIBLE      = 7;   // must be odd
const HALF         = Math.floor(VISIBLE / 2); // 3
const AUTO_MS      = 4200;

// Scale / rotate / opacity for each distance slot
const SLOT_CONFIG = [
  { scale: 1.22, rotateY: '0deg',  opacity: 1.0,  zIndex: 10 },  // center  (d0)
  { scale: 0.90, rotateY: '-18deg', opacity: 0.80, zIndex: 7  },  // d1 left
  { scale: 0.90, rotateY:  '18deg', opacity: 0.80, zIndex: 7  },  // d1 right
  { scale: 0.72, rotateY: '-30deg', opacity: 0.52, zIndex: 4  },  // d2 left
  { scale: 0.72, rotateY:  '30deg', opacity: 0.52, zIndex: 4  },  // d2 right
  { scale: 0.58, rotateY: '-40deg', opacity: 0.28, zIndex: 2  },  // d3 left
  { scale: 0.58, rotateY:  '40deg', opacity: 0.28, zIndex: 2  },  // d3 right
];

// Map slot index (0-6) → SLOT_CONFIG index
function slotToConfig(slot: number): (typeof SLOT_CONFIG)[0] {
  const offset = slot - HALF; // -3…0…3
  if (offset === 0) return SLOT_CONFIG[0];
  const absOff = Math.abs(offset);
  const side   = offset < 0 ? 0 : 1; // 0=left,1=right
  return SLOT_CONFIG[absOff * 2 - 1 + side];
}

// ─── Single animated card ─────────────────────────────────────────────────────
interface CardProps {
  series:   Series;
  slot:     number;           // 0-6 position in visible window
  isCenter: boolean;
  onPress:  () => void;
}

function CoverCard({ series, slot, isCenter, onPress }: CardProps) {
  const cfg     = slotToConfig(slot);
  const scaleAnim   = useRef(new Animated.Value(cfg.scale)).current;
  const opacityAnim = useRef(new Animated.Value(cfg.opacity)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim,   { toValue: cfg.scale,   useNativeDriver: true, speed: 18, bounciness: 0 }),
      Animated.spring(opacityAnim, { toValue: cfg.opacity, useNativeDriver: true, speed: 18, bounciness: 0 }),
    ]).start();
  }, [cfg.scale, cfg.opacity]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
          zIndex: cfg.zIndex,
          borderColor: isCenter ? Colors.cyan : 'transparent',
          ...(isCenter ? Shadows.neonCyan : {}),
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.cardInner}>
        <Image source={{ uri: series.image }} style={styles.cardImg} />

        {/* Badge */}
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeText}>{series.badge}</Text>
        </View>

        {/* Bottom label — only visible on center card */}
        {isCenter && (
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={styles.cardLabel}
          >
            <Text style={styles.cardLabelText}>{series.title}</Text>
            <Text style={styles.cardCta}>Okumaya Başla →</Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Dot indicator ────────────────────────────────────────────────────────────
interface DotProps { active: boolean; onPress: () => void; }

function Dot({ active, onPress }: DotProps) {
  const widthAnim = useRef(new Animated.Value(active ? 16 : 7)).current;
  useEffect(() => {
    Animated.spring(widthAnim, {
      toValue: active ? 16 : 7,
      useNativeDriver: false,
      speed: 20,
      bounciness: 0,
    }).start();
  }, [active]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.dot,
          {
            width: widthAnim,
            backgroundColor: active ? Colors.cyan : '#333',
            borderRadius: active ? 4 : 99,
            ...(active ? { shadowColor: Colors.cyan, shadowRadius: 4, shadowOpacity: 0.8, elevation: 4 } : {}),
          },
        ]}
      />
    </TouchableOpacity>
  );
}

// ─── CoverflowCarousel ────────────────────────────────────────────────────────
interface Props { data: Series[]; }

export default function CoverflowCarousel({ data }: Props) {
  const [current, setCurrent] = useState(0);
  const autoRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const swipeXRef = useRef(0);
  const n         = data.length;

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % n) + n) % n);
  }, [n]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(goNext, AUTO_MS);
  }, [goNext]);

  useEffect(() => {
    resetAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [resetAuto]);

  // Pan responder for swipe
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gs) => { swipeXRef.current = gs.x0; },
      onPanResponderRelease: (_, gs) => {
        const dx = gs.moveX - swipeXRef.current;
        if (Math.abs(dx) > 40) {
          dx < 0 ? goNext() : goPrev();
        }
      },
    })
  ).current;

  // Build the 7 visible slots
  const slots = Array.from({ length: VISIBLE }, (_, slot) => {
    const offset = slot - HALF;
    const idx    = ((current + offset) % n + n) % n;
    return { slot, idx, series: data[idx], isCenter: offset === 0 };
  });

  return (
    <View style={styles.root}>
      {/* Prism abstract background */}
      <LinearGradient
        colors={['#000', '#0a0a1f', '#000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[StyleSheet.absoluteFillObject, styles.prismGlow]} />

      {/* Controls row */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.arrow} onPress={goPrev} activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={18} color={Colors.cyan} />
        </TouchableOpacity>

        <View style={styles.dots}>
          {data.map((s, i) => (
            <Dot key={s.id} active={i === current} onPress={() => { goTo(i); resetAuto(); }} />
          ))}
        </View>

        <TouchableOpacity style={styles.arrow} onPress={goNext} activeOpacity={0.8}>
          <Ionicons name="chevron-forward" size={18} color={Colors.cyan} />
        </TouchableOpacity>
      </View>

      {/* Card track */}
      <View style={styles.track} {...panResponder.panHandlers}>
        {slots.map(({ slot, idx, series, isCenter }) => (
          <CoverCard
            key={`slot-${slot}`}
            series={series}
            slot={slot}
            isCenter={isCenter}
            onPress={() => { goTo(idx); resetAuto(); }}
          />
        ))}
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    paddingBottom: Spacing.lg,
    backgroundColor: '#000',
  },
  prismGlow: {
    backgroundColor: 'transparent',
    // simulated radial center glow via large borderRadius trick
    borderRadius: 9999,
    margin: 40,
    opacity: 0.08,
    backgroundColor: Colors.cyan,
  },

  // Controls
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    zIndex: 20,
  },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.cyan,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    height: 7,
  },

  // Card track — perspective via negative margin trick
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: CARD_H + 40,
    gap: CARD_GAP,
    paddingHorizontal: Spacing.sm,
  },

  // Card
  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 2,
  },
  cardInner: {
    flex: 1,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeWrap: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: Colors.cyan,
    borderRadius: Radius.sm,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    ...Typography.badge,
    color: Colors.black,
  },
  cardLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingBottom: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  cardLabelText: {
    ...Typography.label,
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  cardCta: {
    fontSize: 8,
    fontWeight: '700',
    color: Colors.cyan,
    marginTop: 2,
    textShadowColor: Colors.cyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});
