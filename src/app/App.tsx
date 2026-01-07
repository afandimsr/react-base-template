import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '../theme';
import { AppRoutes } from './routes';
import { useThemeStore } from '../state/themeStore';
import { ScrollToTop } from '../presentation/components/utils/ScrollToTop';

const App: React.FC = () => {
    const { mode } = useThemeStore();

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <ScrollToTop />
                <AppRoutes />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
