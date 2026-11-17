import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { PRIORITY_LABEL, PRIORITY_LEVEL, type TaskPriority } from '@/constants/task-priority';
import { Spacing } from '@/constants/theme';
import { usePriorityColors } from '@/hooks/use-priority-colors';

/** Selo de prioridade: três barrinhas (nível de urgência) + rótulo. */
export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const colors = usePriorityColors(priority);
  const level = PRIORITY_LEVEL[priority];

  return (
    <View
      style={[styles.badge, { backgroundColor: colors.background }]}
      accessibilityLabel={`Prioridade ${PRIORITY_LABEL[priority]}`}>
      <View style={styles.bars}>
        {[1, 2, 3].map((n) => (
          <View
            key={n}
            style={[
              styles.bar,
              { height: 4 + n * 3, backgroundColor: colors.fg, opacity: n <= level ? 1 : 0.25 },
            ]}
          />
        ))}
      </View>
      <ThemedText style={[styles.label, { color: colors.fg }]}>{PRIORITY_LABEL[priority]}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.two + 2,
    paddingVertical: Spacing.one,
    borderRadius: 999,
  },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 13 },
  bar: { width: 3, borderRadius: 1 },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600' },
});
