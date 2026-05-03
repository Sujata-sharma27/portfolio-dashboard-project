import { createContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateAvatar: (avatar: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Sujata Sharma",
    email: "sujatasharma2725@gmail.com",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Sujata",
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateAvatar = (avatar: string) => {
    setUser(prev => prev ? { ...prev, avatar } : null);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppContext.Provider value={{ user, setUser, updateAvatar, theme, toggleTheme, showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
          <div className={`px-6 py-4 rounded-lg shadow-lg text-white ${
            toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' :
            'bg-blue-500'
          }`}>
            {toast.message}
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}