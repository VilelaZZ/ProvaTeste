import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function LoadingState({ label = 'Carregando…' }: { label?: string }) {
  const theme = useTheme();
  return (
    <View style={styles.center} accessibilityLiveRegion="polite">
      <ActivityIndicator size="large" color={theme.primary} />
      <ThemedText themeColor="textSecondary">{label}</ThemedText>
    </View>
  );
}

type ErrorProps = { message: string; onRetry: () => void; children?: ReactNode };

/** Diz o que deu errado e oferece "Tentar novamente". `children` aceita ações extras. */
export function ErrorState({ message, onRetry, children }: ErrorProps) {
  return (
    <View style={styles.center} accessibilityLiveRegion="polite">
      <ThemedText type="smallBold">Não foi possível carregar</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.message}>
        {message}
      </ThemedText>
      <ActionButton label="Tentar novamente" onPress={onRetry} />
      {children}
    </View>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <View style={styles.center}>
      <ThemedText type="smallBold">{title}</ThemedText>
      {hint ? (
        <ThemedText themeColor="textSecondary" style={styles.message}>
          {hint}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    padding: Spacing.five,
  },
  message: { textAlign: 'center', maxWidth: 360 },
});
