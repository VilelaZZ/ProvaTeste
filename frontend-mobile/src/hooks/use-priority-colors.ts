import type { TaskPriority } from '@/constants/task-priority';
import { PriorityColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function usePriorityColors(priority: TaskPriority) {
  const scheme = useColorScheme();
  return PriorityColors[scheme === 'dark' ? 'dark' : 'light'][priority];
}
