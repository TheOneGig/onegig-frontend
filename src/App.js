// project import
import { useState } from 'react';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';

import { QueryClient, QueryClientProvider } from 'react-query';

// auth provider
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
const queryClient = new QueryClient();

const App = () => {
  // Estado para el tema
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');

  // Función para alternar el tema y guardar el nuevo tema en localStorage
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('mode', newMode);
      return newMode;
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: mode }}>
        <NotificationsProvider>
          <ThemeCustomization mode={mode} toggleTheme={toggleTheme} setMode={setMode}>
            <RTLLayout>
              <Locales>
                <ScrollTop>
                  <AuthProvider>
                    <>
                      <Routes />
                      <Snackbar />
                    </>
                  </AuthProvider>
                </ScrollTop>
              </Locales>
            </RTLLayout>
          </ThemeCustomization>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
