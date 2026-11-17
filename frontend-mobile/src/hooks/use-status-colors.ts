import type { TaskStatus } from '@/constants/task-status';
import { StatusColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useStatusColors(status: TaskStatus) {
  const scheme = useColorScheme();
  return StatusColors[scheme === 'dark' ? 'dark' : 'light'][status];
}
