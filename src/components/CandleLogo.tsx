/**
 * CandleLogo — SVG-like candle rendered with pure React Native Views.
 * Used as the fallback when assets/mum.png is not present.
 * Drop mum.png into the assets/ folder to replace this with your real artwork.
 */
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors } from '../theme';

export default function CandleLogo({ size = 52 }: { size?: number }) {
  const flicker = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flicker, { toValue: 0.6, duration: 180, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 1.0, duration: 220, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 0.8, duration: 130, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 1.0, duration: 200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const s = size / 52; // scale factor

  return (
    <View style={[styles.root, { width: size, height: size }]}>
      {/* Flame */}
      <Animated.View
        style={[
          styles.flame,
          {
            opacity: flicker,
            width: 10 * s,
            height: 14 * s,
            borderRadius: (10 * s) / 2,
            top: 2 * s,
            alignSelf: 'center',
            shadowColor: Colors.cyan,
            shadowRadius: 8,
            shadowOpacity: 0.95,
            elevation: 6,
          },
        ]}
      />
      {/* Wick */}
      <View
        style={[
          styles.wick,
          { width: 2 * s, height: 5 * s, alignSelf: 'center', top: 14 * s },
        ]}
      />
      {/* Body */}
      <View
        style={[
          styles.body,
          {
            width: 18 * s,
            height: 24 * s,
            borderRadius: 3 * s,
            top: 18 * s,
            alignSelf: 'center',
          },
        ]}
      />
      {/* Base */}
      <View
        style={[
          styles.base,
          {
            width: 24 * s,
            height: 6 * s,
            borderRadius: 3 * s,
            bottom: 2 * s,
            alignSelf: 'center',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    alignItems: 'center',
  },
  flame: {
    position: 'absolute',
    backgroundColor: Colors.cyan,
  },
  wick: {
    position: 'absolute',
    backgroundColor: '#888',
  },
  body: {
    position: 'absolute',
    backgroundColor: Colors.darkBlue,
    borderWidth: 1,
    borderColor: Colors.cyan,
  },
  base: {
    position: 'absolute',
    backgroundColor: Colors.darkBlue,
    borderWidth: 1,
    borderColor: Colors.cyan,
  },
});
