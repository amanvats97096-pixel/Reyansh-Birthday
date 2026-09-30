import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SoundProvider } from './context/SoundContext';
import { NavigationHeader } from './components/NavigationHeader';
import { StorybookScrollView } from './pages/StorybookScrollView';

export function App() {
  return (
    <SoundProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-magical relative text-slate-800 antialiased selection:bg-amber-300 selection:text-amber-950">
          <NavigationHeader />
          <Routes>
            <Route path="/" element={<StorybookScrollView />} />
            <Route path="*" element={<StorybookScrollView />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SoundProvider>
  );
}

export default App;
