import { ColorModeProvider } from './components/ui/color-mode';
import { Provider } from './components/ui/provider';
import CoverPage from './pages/CoverPage';

const App = () => {
    return (
        <Provider>
            <ColorModeProvider>
                <CoverPage />
            </ColorModeProvider>
        </Provider>
    );
};

export default App;
