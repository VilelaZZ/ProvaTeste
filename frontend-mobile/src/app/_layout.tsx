import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

/**
 * Navegação do TaskFlow (pilha):
 *   /            → src/app/index.tsx       (lista de tarefas)
 *   /tasks/[id]  → src/app/tasks/[id].tsx  (detalhes + alterar status)
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === 'dark';
  const colors = Colors[dark ? 'dark' : 'light'];

  return (
    <ThemeProvider value={dark ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="index" options={{ title: 'TaskFlow' }} />
        <Stack.Screen name="tasks/[id]" options={{ title: 'Detalhes da tarefa' }} />
      </Stack>
    </ThemeProvider>
  );
}
