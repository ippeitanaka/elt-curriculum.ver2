import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';
import { CalendarFilters } from '../types/calendar';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginAsStudent: (year: number, className: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  defaultFilters: CalendarFilters | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultFilters, setDefaultFilters] = useState<CalendarFilters | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // 学生ユーザーの場合、デフォルトフィルターを設定
      if (parsedUser.role === 'student' && parsedUser.studentInfo) {
        setDefaultFilters({
          year: parsedUser.studentInfo.year.toString(),
          class: parsedUser.studentInfo.class
        });
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    if (email === 'elt@toyoiryo.ac.jp' && password === 'TOYOqq01') {
      const adminUser: User = {
        id: '1',
        name: '管理者',
        role: 'admin'
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setUser(adminUser);
      setDefaultFilters(null); // 管理者の場合はフィルターをクリア
    } else {
      throw new Error('メールアドレスまたはパスワードが正しくありません');
    }
  };

  const loginAsStudent = async (year: number, className: string) => {
    const studentUser: User = {
      id: crypto.randomUUID(),
      name: `${year}年${className}組`,
      role: 'student',
      studentInfo: {
        year: year as 1 | 2 | 3,
        class: className as 'A' | 'B' | 'N',
        department: className === 'N' ? 'night' : 'day'
      }
    };
    localStorage.setItem('user', JSON.stringify(studentUser));
    setUser(studentUser);
    
    // 学生のデフォルトフィルターを設定
    setDefaultFilters({
      year: year.toString(),
      class: className
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDefaultFilters(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      loginAsStudent, 
      logout, 
      isLoading,
      defaultFilters 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}