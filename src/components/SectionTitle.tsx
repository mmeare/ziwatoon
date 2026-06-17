import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, Typography, Spacing, Radius } from '../theme';

interface Props {
  title: string;
  rightSlot?: React.ReactNode;
}

export default function SectionTitle({ title, rightSlot }: Props) {
  return (
    <View style={styles.row}>
      <LinearGradient
        colors={Gradients.titleBox}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.box}
      >
        <Text style={styles.text}>✦ {title}</Text>
      </LinearGradient>

      {rightSlot && <View style={styles.rightSlot}>{rightSlot}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  box: {
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    borderRadius: Radius.md,
    paddingVertical: 6,
    paddingHorizontal: Spacing.xl,
  },
  text: {
    ...Typography.heading,
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  rightSlot: {
    flex: 1,
    marginLeft: Spacing.md,
    height: 3,
    backgroundColor: 'transparent',
  },
});
