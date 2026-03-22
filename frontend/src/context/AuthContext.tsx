import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Rock {
  name: string;
  profilePictureUrl?: string;
  age?: number;
  erosionLevel?: number;
  staring?: number;
  movement?: number;
}

interface AuthContextType {
  rock: Rock | null;
  setRock: (rock: Rock | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initializing with mock data so the app works for now
  const [rock, setRock] = useState<Rock | null>({
    name: 'Obsidian',
    profilePictureUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Lipari-Obsidienne_%285%29.jpg",
    age: 4200000000,
    erosionLevel: 4,
    staring: 90,
    movement: 0.1,
  });

  return (
    <AuthContext.Provider value={{ rock, setRock }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
