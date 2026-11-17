import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { STATUS_LABEL, STATUS_ORDER, type TaskStatus } from '@/constants/task-status';
import { Spacing } from '@/constants/theme';
import { useStatusColors } from '@/hooks/use-status-colors';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
  disabled?: boolean;
};

function Option({
  status,
  selected,
  disabled,
  onPress,
}: {
  status: TaskStatus;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();
  const colors = useStatusColors(status);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.option, { opacity: disabled ? 0.5 : pressed ? 0.7 : 1 }]}>
      <View style={[styles.bar, { backgroundColor: selected ? colors.rail : theme.border }]} />
      <ThemedText
        type="small"
        themeColor={selected ? 'text' : 'textSecondary'}
        style={selected && styles.selectedLabel}>
        {STATUS_LABEL[status]}
      </ThemedText>
    </Pressable>
  );
}

/** Seletor de status em 3 etapas (A fazer → Em andamento → Concluída). */
export function StatusSelector({ value, onChange, disabled = false }: Props) {
  return (
    <View style={styles.group} accessibilityRole="radiogroup">
      {STATUS_ORDER.map((status) => (
        <Option
          key={status}
          status={status}
          selected={status === value}
          disabled={disabled}
          onPress={() => onChange(status)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { flexDirection: 'row', gap: Spacing.two },
  option: { flex: 1, gap: Spacing.two, paddingVertical: Spacing.two, minHeight: 48 },
  bar: { height: 6, borderRadius: 3 },
  selectedLabel: { fontWeight: '700' },
});
