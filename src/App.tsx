import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      // primary: 'bg-red-500 hover:bg-red-600',
    },
  },
};

function App() {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="min-h-screen max-h-screen flex bg-slate-100 dark:bg-slate-700">
        <Sidebar />

        <div className='w-full'>
          <Navbar />
        </div>
      </div>
    </Flowbite>
  );
}

export default App;
