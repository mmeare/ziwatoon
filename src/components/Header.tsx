import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Gradients, Typography, Spacing, Radius, Shadows } from '../theme';
import CandleLogo from './CandleLogo';

// ─── Logo image with CandleLogo fallback ─────────────────────────────────────
function LogoImage() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <View style={[styles.logoImgWrap, Shadows.neonCyan]}>
        <CandleLogo size={52} />
      </View>
    );
  }
  return (
    <View style={[styles.logoImgWrap, Shadows.neonCyan]}>
      <Image
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        source={require('../../assets/mum.png')}
        style={styles.logoImg}
        onError={() => setFailed(true)}
      />
    </View>
  );
}

// ─── Nav Item ────────────────────────────────────────────────────────────────
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

function NavItem({ icon, label, onPress }: NavItemProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
      <LinearGradient
        colors={Gradients.navItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.navItem}
      >
        {icon}
        <Text style={styles.navLabel}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── Auth Button ─────────────────────────────────────────────────────────────
interface AuthBtnProps {
  label: string;
  onPress?: () => void;
}

function AuthBtn({ label, onPress }: AuthBtnProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.authBtnWrap}>
      <LinearGradient
        colors={Gradients.authBtn}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.authBtn}
      >
        <Text style={styles.authBtnText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
export default function Header() {
  return (
    <LinearGradient
      colors={Gradients.topRegion}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.wrapper}
    >
      {/* Main row: auth panel | logo | nav */}
      <View style={styles.mainRow}>

        {/* LEFT: Auth panel — sits below logo level via paddingTop */}
        <View style={styles.authPanel}>
          {/* Invisible spacer that mirrors the logo height so buttons sit below it */}
          <View style={styles.authSpacer} />
          <AuthBtn label="Giriş Yap" />
          <AuthBtn label="Kayıt Ol" />
        </View>

        {/* CENTER-LEFT: Logo */}
        <View style={styles.logoBlock}>
          <LogoImage />
          <Text style={styles.brandName}>Ziwatoon</Text>
        </View>

        {/* RIGHT: Nav items + search */}
        <View style={styles.navArea}>
          <View style={styles.navRow}>
            <NavItem
              icon={<Ionicons name="home-outline" size={14} color={Colors.white} />}
              label="Ana Sayfa"
            />
            <NavItem
              icon={<Text style={styles.swanEmoji}>🦢</Text>}
              label="Ziwa"
            />
            <NavItem
              icon={<Ionicons name="grid-outline" size={14} color={Colors.white} />}
              label="Kategori"
            />
            <NavItem
              icon={<Ionicons name="book-outline" size={14} color={Colors.white} />}
              label="Trend Seriler"
            />
          </View>

          {/* Search bar */}
          <View style={styles.searchWrap}>
            <TextInput
              style={styles.searchInput}
              placeholder="Detaylı Ara..."
              placeholderTextColor="rgba(255,255,255,0.35)"
            />
            <Ionicons
              name="search"
              size={13}
              color={Colors.cyan}
              style={styles.searchIcon}
            />
          </View>
        </View>

      </View>
    </LinearGradient>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },

  // Main row
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: Spacing.sm,
    gap: Spacing.md,
  },

  // Auth panel
  authPanel: {
    alignItems: 'center',
    gap: Spacing.xs,
    minWidth: 96,
  },
  authSpacer: {
    // matches logoImg(52) + brandName height (~22) + gaps
    height: 80,
  },
  authBtnWrap: {
    width: '100%',
  },
  authBtn: {
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.cyan,
    paddingVertical: 5,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
  },
  authBtnText: {
    ...Typography.nav,
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },

  // Logo
  logoBlock: {
    alignItems: 'center',
    gap: 2,
    paddingBottom: Spacing.xs,
  },
  logoImgWrap: {
    width: 52,
    height: 52,
    borderRadius: Radius.full,
    overflow: 'hidden',
    backgroundColor: 'rgba(18,19,88,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: 52,
    height: 52,
    resizeMode: 'contain',
  },
  brandName: {
    ...Typography.brand,
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  // Nav area
  navArea: {
    flex: 1,
    alignItems: 'flex-start',
    gap: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  navRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
  },
  navLabel: {
    ...Typography.nav,
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  swanEmoji: {
    fontSize: 14,
  },

  // Search
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(54,173,163,0.4)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    gap: Spacing.xs,
    alignSelf: 'flex-start',
    minWidth: 150,
  },
  searchInput: {
    flex: 1,
    color: Colors.white,
    fontSize: 11,
    padding: 0,
  },
  searchIcon: {},
});
