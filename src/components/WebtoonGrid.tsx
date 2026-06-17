import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { WebtoonCard } from './WebtoonCard';
import { Series } from '../data/series';
import { Spacing } from '../theme';

interface Props {
  data:    Series[];
  columns?: number;
  /** Horizontal padding already consumed by parent — used to compute card width */
  parentPadding?: number;
}

export default function WebtoonGrid({ data, columns = 4, parentPadding = 48 }: Props) {
  const { width: screenW } = useWindowDimensions();
  const totalGap  = Spacing.sm * (columns - 1);
  const cardWidth = (screenW - parentPadding - totalGap) / columns;

  return (
    <View style={styles.grid}>
      {data.map((item) => (
        <WebtoonCard key={item.id} item={item} width={cardWidth} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
});
