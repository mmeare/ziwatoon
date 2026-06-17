import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, Typography, Spacing, Radius } from '../theme';

const ITEMS = ['Trend Seriler', 'Ekibimize Katıl', 'Discord'];

export default function SubNavbar() {
  return (
    // Outer row shifts the sub-nav right to align with nav center
    // (mirrors the left auth-panel + logo width from Header)
    <View style={styles.outerRow}>
      <LinearGradient
        colors={Gradients.navItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.bar}
      >
        {ITEMS.map((item, index) => (
          <React.Fragment key={item}>
            <TouchableOpacity activeOpacity={0.75}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>

            {/* Divider between items */}
            {index < ITEMS.length - 1 && (
              <View style={styles.divider} />
            )}
          </React.Fragment>
        ))}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outerRow: {
    // Aligns sub-nav to the nav center axis.
    // Left auth panel (96) + logo block (~68) + gap (12) = ~176px left margin.
    marginLeft: 176,
    marginTop: 2,
    marginBottom: Spacing.sm,
    alignSelf: 'flex-start',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    borderRadius: Radius.md,
    paddingVertical: 5,
    paddingHorizontal: Spacing.xl,
    gap: 0,
  },
  itemText: {
    ...Typography.subNav,
    color: Colors.white,
    paddingHorizontal: Spacing.md,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: Colors.darkBlue,
  },
});
