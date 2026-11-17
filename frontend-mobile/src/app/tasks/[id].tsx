import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/action-button';
import { Avatar } from '@/components/avatar';
import { PriorityBadge } from '@/components/priority-badge';
import { StatusBadge } from '@/components/status-badge';
import { StatusSelector } from '@/components/status-selector';
import { ErrorState, LoadingState } from '@/components/state-views';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTask } from '@/hooks/use-task';
import { useTheme } from '@/hooks/use-theme';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { task, loading, error, updating, updateError, retry, changeStatus } = useTask(id);

  // Em um deep link ou recarga na web não há tela anterior; nesse caso vai direto para a lista.
  const backToList = () => (router.canGoBack() ? router.back() : router.replace('/'));

  if (loading) return <LoadingState label="Carregando tarefa…" />;

  if (error || !task) {
    return (
      <ErrorState message={error ?? 'Tarefa não encontrada.'} onRetry={retry}>
        <ActionButton label="Voltar às tarefas" variant="secondary" onPress={backToList} />
      </ErrorState>
    );
  }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.five }]}>
        {/* Cabeçalho: código, título e selos */}
        <View style={styles.titleBlock}>
          <ThemedText type="small" themeColor="textSecondary">
            Tarefa #{task.id}
          </ThemedText>
          <ThemedText style={styles.title} accessibilityRole="header">
            {task.titulo}
          </ThemedText>
          <View style={styles.badges}>
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.prioridade} />
          </View>
        </View>

        {/* Responsável */}
        <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
          <Avatar name={task.responsavel} size={44} />
          <View style={styles.ownerText}>
            <ThemedText type="small" themeColor="textSecondary">
              Responsável
            </ThemedText>
            <ThemedText type="default" style={styles.ownerName}>
              {task.responsavel}
            </ThemedText>
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <ThemedText type="smallBold">Descrição</ThemedText>
          <ThemedText themeColor={task.descricao ? 'text' : 'textSecondary'}>
            {task.descricao ?? 'Esta tarefa não tem descrição.'}
          </ThemedText>
        </View>

        {/* Alterar status (PATCH na API) */}
        <View style={styles.section}>
          <ThemedText type="smallBold">Alterar status</ThemedText>
          <StatusSelector value={task.status} onChange={changeStatus} disabled={updating} />
          {updating ? (
            <ThemedText type="small" themeColor="textSecondary" accessibilityLiveRegion="polite">
              Salvando…
            </ThemedText>
          ) : null}
          {updateError ? (
            <ThemedText type="small" style={{ color: theme.danger }} accessibilityLiveRegion="polite">
              Não foi possível salvar: {updateError}
            </ThemedText>
          ) : null}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
  content: { padding: Spacing.three, gap: Spacing.four },
  titleBlock: { gap: Spacing.two },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, marginTop: Spacing.one },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  ownerText: { flex: 1 },
  ownerName: { fontWeight: '600' },
  section: { gap: Spacing.two },
});
