import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { STATUS_LABEL, type TaskStatus } from '@/constants/task-status';
import { Spacing } from '@/constants/theme';
import { useStatusColors } from '@/hooks/use-status-colors';

export function StatusBadge({ status }: { status: TaskStatus }) {
  const colors = useStatusColors(status);

  return (
    <View style={[styles.badge, { backgroundColor: colors.background }]}>
      <View style={[styles.dot, { backgroundColor: colors.rail }]} />
      <ThemedText style={[styles.label, { color: colors.text }]}>{STATUS_LABEL[status]}</ThemedText>
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
  dot: { width: 8, height: 8, borderRadius: 4 },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600' },
});
