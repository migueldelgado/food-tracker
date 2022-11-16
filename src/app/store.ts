import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CalendarReducer from '../features/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: CalendarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
