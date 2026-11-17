/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    primary: '#1A74D1',
    border: '#E3E4E8',
    danger: '#C42B1C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    primary: '#4DA3FF',
    border: '#2E3135',
    danger: '#F97066',
  },
} as const;

/** Cores por status: `rail` = régua/barra, `background` + `text` = selo. */
export const StatusColors = {
  light: {
    PENDENTE: { rail: '#8A93A6', background: '#E9ECF2', text: '#4A5366' },
    EM_ANDAMENTO: { rail: '#F2A33A', background: '#FDF0D9', text: '#8A5200' },
    CONCLUIDA: { rail: '#2FB56F', background: '#DDF4E7', text: '#1B6E45' },
  },
  dark: {
    PENDENTE: { rail: '#7C8599', background: '#2A2F3A', text: '#B7BECC' },
    EM_ANDAMENTO: { rail: '#F2A33A', background: '#3A2D14', text: '#F5B95E' },
    CONCLUIDA: { rail: '#2FB56F', background: '#143325', text: '#5BD399' },
  },
} as const;

/** Cores por prioridade: `fg` = ícone/texto, `background` = fundo do selo. */
export const PriorityColors = {
  light: {
    BAIXA: { fg: '#3B7A57', background: '#E3F2E9' },
    MEDIA: { fg: '#8A5200', background: '#FDF0D9' },
    ALTA: { fg: '#B42318', background: '#FDE7E4' },
  },
  dark: {
    BAIXA: { fg: '#6CCB97', background: '#173226' },
    MEDIA: { fg: '#F5B95E', background: '#3A2D14' },
    ALTA: { fg: '#FF8A80', background: '#3F1A17' },
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
