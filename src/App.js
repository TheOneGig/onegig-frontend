// project import
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <NotificationsProvider>
        <ThemeCustomization>
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

export default App;
