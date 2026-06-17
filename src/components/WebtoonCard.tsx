import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, Typography, Radius } from '../theme';
import { Series } from '../data/series';

// ─── Standard cover card (2:3 ratio) ─────────────────────────────────────────
interface WebtoonCardProps {
  item:    Series;
  width:   number;
  onPress?: () => void;
}

export function WebtoonCard({ item, width, onPress }: WebtoonCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim,  { toValue: 0.96, useNativeDriver: true, speed: 25, bounciness: 0 }),
    ]).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 4 }).start();
  };

  const height = Math.round(width * 1.5); // 2:3 ratio

  return (
    <Animated.View style={[styles.card, { width, height, transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.touchable}
      >
        <Image source={{ uri: item.image }} style={styles.img} />

        {/* Bottom title overlay */}
        <LinearGradient colors={Gradients.cardLabel} style={styles.overlay}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Compact card (3:4 ratio) — used in sanctuary sidebar ────────────────────
interface SmallCardProps {
  item:    Series;
  width:   number;
  onPress?: () => void;
}

export function SmallCard({ item, width, onPress }: SmallCardProps) {
  const height = Math.round(width * 1.33); // ~3:4

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.smallCard, { width, height }]}
    >
      <Image source={{ uri: item.image }} style={styles.img} />
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // WebtoonCard
  card: {
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.cardBg,
  },
  touchable: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 18,
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
  title: {
    ...Typography.label,
    color: Colors.white,
  },

  // SmallCard
  smallCard: {
    borderRadius: Radius.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.cardBg,
  },
});
