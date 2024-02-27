import './style.css';
import { AddHabitDialog } from './ui/AddHabitDialog';
import { HabitHistoryDialog } from './ui/HabitHistoryDialog';
import { TodayHabits } from './ui/TodayHabit';

TodayHabits.getInstance().init();

AddHabitDialog.getInstance().init();

HabitHistoryDialog.getInstance().init();
