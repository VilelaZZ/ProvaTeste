import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { PriorityBadge } from '@/components/priority-badge';
import { StatusBadge } from '@/components/status-badge';
import { ThemedText } from '@/components/themed-text';
import { PRIORITY_LABEL } from '@/constants/task-priority';
import { STATUS_LABEL } from '@/constants/task-status';
import { Spacing } from '@/constants/theme';
import { useStatusColors } from '@/hooks/use-status-colors';
import { useTheme } from '@/hooks/use-theme';
import type { Task } from '@/types/task';

/** Linha da lista. Toque → navega para `/tasks/[id]` (src/app/tasks/[id].tsx). */
export function TaskItem({ task }: { task: Task }) {
  const theme = useTheme();
  const colors = useStatusColors(task.status);
  const done = task.status === 'CONCLUIDA';

  return (
    <Link href={{ pathname: '/tasks/[id]', params: { id: task.id } }} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${task.titulo}. Responsável ${task.responsavel}. Prioridade ${PRIORITY_LABEL[task.prioridade]}. ${STATUS_LABEL[task.status]}. Abrir detalhes`}
        style={({ pressed }) => [
          styles.row,
          {
            backgroundColor: pressed ? theme.backgroundSelected : theme.background,
            borderBottomColor: theme.border,
          },
        ]}>
        <View style={[styles.rail, { backgroundColor: colors.rail }]} />
        <View style={styles.body}>
          <ThemedText
            type="default"
            numberOfLines={2}
            style={[styles.title, done && styles.titleDone]}
            themeColor={done ? 'textSecondary' : 'text'}>
            {task.titulo}
          </ThemedText>
          {task.descricao ? (
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
              {task.descricao}
            </ThemedText>
          ) : null}
          <View style={styles.badges}>
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.prioridade} />
          </View>
          <View style={styles.owner}>
            <Avatar name={task.responsavel} size={24} />
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={1} style={styles.ownerName}>
              {task.responsavel}
            </ThemedText>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingRight: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rail: { width: 4, borderTopRightRadius: 2, borderBottomRightRadius: 2 },
  body: { flex: 1, gap: Spacing.one + 2 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, marginTop: Spacing.one },
  owner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginTop: Spacing.one },
  ownerName: { flexShrink: 1 },
  title: { fontSize: 17, lineHeight: 24, fontWeight: '600' },
  titleDone: { textDecorationLine: 'line-through' },
});
