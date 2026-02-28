import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Home from './pages/Home';
import SurahList from './pages/SurahList';
import SurahReader from './pages/SurahReader';
import JuzIndex from './pages/JuzIndex';
import Settings from './pages/Settings';
import TasbeehCounter from './pages/TasbeehCounter';
import PrayerTimings from './pages/PrayerTimings';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const surahsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/surahs',
  component: SurahList,
});

const readerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reader/$surahNumber',
  component: SurahReader,
});

const juzRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/juz',
  component: JuzIndex,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
});

const tasbeehRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasbeeh',
  component: TasbeehCounter,
});

const prayerTimingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/prayer-timings',
  component: PrayerTimings,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  surahsRoute,
  readerRoute,
  juzRoute,
  settingsRoute,
  tasbeehRoute,
  prayerTimingsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
