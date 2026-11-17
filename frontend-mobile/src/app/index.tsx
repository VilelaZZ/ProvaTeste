import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProgressSummary } from '@/components/progress-summary';
import { EmptyState, ErrorState, LoadingState } from '@/components/state-views';
import { TaskItem } from '@/components/task-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { STATUS_LABEL, STATUS_ORDER, type TaskStatus } from '@/constants/task-status';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTasks } from '@/hooks/use-tasks';
import { useTheme } from '@/hooks/use-theme';

type Filter = 'ALL' | TaskStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'Todas' },
  ...STATUS_ORDER.map((s) => ({ key: s, label: STATUS_LABEL[s] })),
];

export default function TaskListScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { tasks, loading, refreshing, error, reload, refresh, retry } = useTasks();
  const [filter, setFilter] = useState<Filter>('ALL');

  // Recarrega sempre que a tela volta ao foco (ex.: depois de mudar o status nos detalhes).
  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  if (loading) return <LoadingState label="Carregando tarefas…" />;
  if (error && tasks.length === 0) return <ErrorState message={error} onRetry={retry} />;

  const visible = filter === 'ALL' ? tasks : tasks.filter((t) => t.status === filter);
  const countOf = (f: Filter) => (f === 'ALL' ? tasks.length : tasks.filter((t) => t.status === f).length);

  return (
    <ThemedView style={styles.screen}>
      <FlatList
        style={styles.list}
        data={visible}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => <TaskItem task={item} />}
        refreshing={refreshing}
        onRefresh={refresh}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.four }]}
        ListHeaderComponent={
          <View style={styles.header}>
            <ProgressSummary tasks={tasks} />

            {error ? (
              <Pressable onPress={retry} accessibilityRole="button" style={styles.banner}>
                <ThemedText type="small" style={{ color: theme.danger }}>
                  Não foi possível atualizar a lista. Toque para tentar de novo.
                </ThemedText>
              </Pressable>
            ) : null}

            <FlatList
              horizontal
              data={FILTERS}
              keyExtractor={(f) => f.key}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
              renderItem={({ item }) => {
                const selected = item.key === filter;
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    onPress={() => setFilter(item.key)}
                    style={[
                      styles.chip,
                      { backgroundColor: selected ? theme.primary : theme.backgroundElement },
                    ]}>
                    <ThemedText
                      type="small"
                      style={{ color: selected ? '#ffffff' : theme.text, fontWeight: '600' }}>
                      {item.label} {countOf(item.key)}
                    </ThemedText>
                  </Pressable>
                );
              }}
            />
          </View>
        }
        ListEmptyComponent={
          tasks.length === 0 ? (
            <EmptyState
              title="Nenhuma tarefa por aqui"
              hint="As tarefas cadastradas no Angular (ou direto na API) aparecem aqui. Puxe a lista para baixo para atualizar."
            />
          ) : (
            <EmptyState title="Nenhuma tarefa neste filtro" hint="Escolha outro status acima." />
          )
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  list: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
  content: { flexGrow: 1 },
  header: { gap: Spacing.three, paddingTop: Spacing.two, paddingBottom: Spacing.two },
  banner: { paddingHorizontal: Spacing.three },
  filters: { gap: Spacing.two, paddingHorizontal: Spacing.three },
  chip: {
    minHeight: 36,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
