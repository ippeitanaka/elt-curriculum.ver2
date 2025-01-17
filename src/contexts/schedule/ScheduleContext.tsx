import { createContext } from 'react';
import { ScheduleContextType } from './types';

export const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);