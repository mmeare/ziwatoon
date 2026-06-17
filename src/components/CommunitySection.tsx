import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Gradients, Typography, Spacing, Radius, Shadows } from '../theme';

// ─── Divider with diamond ─────────────────────────────────────────────────────
function Divider() {
  return (
    <View style={divStyles.row}>
      <View style={divStyles.line} />
      <Text style={divStyles.diamond}>◆</Text>
      <View style={divStyles.line} />
    </View>
  );
}
const divStyles = StyleSheet.create({
  row:     { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing.sm },
  line:    { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.22)' },
  diamond: { color: 'rgba(255,255,255,0.35)', fontSize: 10, marginHorizontal: Spacing.sm },
});

// ─── Hatırlatma card ──────────────────────────────────────────────────────────
function HatirlatmaCard() {
  return (
    <View style={hatStyles.card}>
      {/* Subtle prism shimmer overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(54,173,163,0.04)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Title pill */}
      <View style={hatStyles.pillWrap}>
        <View style={[hatStyles.pill, Shadows.neonCyan]}>
          <Text style={hatStyles.pillText}>Hatırlatma</Text>
        </View>
      </View>

      <Divider />

      <Text style={hatStyles.body}>
        Siteyle alakalı herşeyden anında haberdar olmak için{'\n'}
        <Text style={hatStyles.accent}>Discord</Text>
        {', '}
        <Text style={hatStyles.accent}>TikTok</Text>
        {' veya '}
        <Text style={hatStyles.accent}>Instagram</Text>
        {' hesaplarımızı takip edebilirsiniz ^^'}
      </Text>

      <Divider />
    </View>
  );
}
const hatStyles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'rgba(54,173,163,0.45)',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    backgroundColor: 'rgba(18,19,88,0.1)',
    overflow: 'hidden',
  },
  pillWrap: { alignItems: 'center' },
  pill: {
    borderWidth: 1,
    borderColor: Colors.cyan,
    borderRadius: Radius.full,
    paddingVertical: 3,
    paddingHorizontal: Spacing.xl,
    marginBottom: 0,
  },
  pillText: {
    ...Typography.heading,
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  body: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'center',
  },
  accent: {
    ...Typography.body,
    color: Colors.cyan,
    textShadowColor: Colors.cyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});

// ─── Discord Widget ───────────────────────────────────────────────────────────
function DiscordWidget() {
  const handleJoin = () => Linking.openURL('https://discord.gg/ziwatoon');

  return (
    <LinearGradient
      colors={Gradients.discordBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={discStyles.card}
    >
      {/* Left: icon + branding */}
      <View style={discStyles.left}>
        <View style={[discStyles.iconWrap, Shadows.neonCyan]}>
          {/* Discord "blurple" logo replaced with Ionicons + brand colour */}
          <Ionicons name="logo-discord" size={24} color={Colors.cyan} />
        </View>

        <View style={discStyles.brandBlock}>
          <Text style={discStyles.brandName}>ZİWATOON</Text>
          <View style={discStyles.onlineRow}>
            <View style={discStyles.onlineDot} />
            <Text style={discStyles.onlineText}>Discord Sunucusu</Text>
          </View>
        </View>
      </View>

      {/* Right: CTA */}
      <View style={discStyles.right}>
        <Text style={discStyles.ctaLabel}>Discord'a Katıl!</Text>
        <TouchableOpacity onPress={handleJoin} activeOpacity={0.8}>
          <LinearGradient
            colors={[Colors.cyan, Colors.darkBlue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={discStyles.ctaBtn}
          >
            <Text style={discStyles.ctaBtnText}>Katıl →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const discStyles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(54,173,163,0.4)',
    backgroundColor: 'rgba(54,173,163,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBlock: { gap: 3 },
  brandName: {
    ...Typography.heading,
    color: Colors.white,
    letterSpacing: 2,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.full,
    backgroundColor: Colors.cyan,
    shadowColor: Colors.cyan,
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 3,
  },
  onlineText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(54,173,163,0.85)',
  },
  right: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  ctaLabel: {
    ...Typography.nav,
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  ctaBtn: {
    borderRadius: Radius.pill,
    paddingVertical: 7,
    paddingHorizontal: Spacing.xl,
  },
  ctaBtnText: {
    ...Typography.nav,
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});

// ─── CommunitySection ─────────────────────────────────────────────────────────
export default function CommunitySection() {
  return (
    <View style={styles.root}>
      <HatirlatmaCard />
      <DiscordWidget />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
});
