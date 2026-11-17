import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { STATUS_LABEL, STATUS_ORDER, type TaskStatus } from '@/constants/task-status';
import { Spacing } from '@/constants/theme';
import { useStatusColors } from '@/hooks/use-status-colors';
import { useTheme } from '@/hooks/use-theme';
import type { Task } from '@/types/task';

function Segment({ status, count }: { status: TaskStatus; count: number }) {
  const colors = useStatusColors(status);
  if (count === 0) return null;
  return <View style={{ flex: count, backgroundColor: colors.rail }} />;
}

function Stat({ status, count }: { status: TaskStatus; count: number }) {
  const colors = useStatusColors(status);
  return (
    <View style={styles.stat}>
      <ThemedText style={[styles.statNumber, { color: colors.text }]}>{count}</ThemedText>
      <View style={styles.statLabelRow}>
        <View style={[styles.dot, { backgroundColor: colors.rail }]} />
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {STATUS_LABEL[status]}
        </ThemedText>
      </View>
    </View>
  );
}

/** Painel do topo da lista: "X de Y concluídas", barra proporcional e contagem por status. */
export function ProgressSummary({ tasks }: { tasks: Task[] }) {
  const theme = useTheme();
  if (tasks.length === 0) return null;

  const count = (s: TaskStatus) => tasks.filter((t) => t.status === s).length;
  const done = count('CONCLUIDA');
  const percent = Math.round((done / tasks.length) * 100);

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.headline}>
        <ThemedText type="smallBold">
          {done} de {tasks.length} {tasks.length === 1 ? 'concluída' : 'concluídas'}
        </ThemedText>
        <ThemedText type="smallBold" themeColor="textSecondary">
          {percent}%
        </ThemedText>
      </View>
      <View
        style={styles.bar}
        accessible
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: tasks.length, now: done }}>
        {STATUS_ORDER.map((s) => (
          <Segment key={s} status={s} count={count(s)} />
        ))}
      </View>
      <View style={styles.stats}>
        {STATUS_ORDER.map((s) => (
          <Stat key={s} status={s} count={count(s)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.three,
  },
  headline: { flexDirection: 'row', justifyContent: 'space-between' },
  bar: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden', gap: 2 },
  stats: { flexDirection: 'row' },
  stat: { flex: 1, gap: Spacing.half },
  statNumber: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  statLabelRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one + 2 },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
