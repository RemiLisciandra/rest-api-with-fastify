import { createHabit } from '../api/habits-api';
import { TodayHabits } from './TodayHabit';

export class AddHabitDialog {
  static instance;
  constructor() {
    if (AddHabitDialog.instance) {
      throw new Error('Use AddHabitDialog.getInstance()');
    }
  }

  static getInstance() {
    if (!AddHabitDialog.instance) {
      AddHabitDialog.instance = new AddHabitDialog();
    }
    return AddHabitDialog.instance;
  }

  _open = false;

  init() {
    this.trigger = document.querySelector('#add-new-habit');
    this.dialog = document.querySelector('#add-habit-dialog');
    this.form = document.querySelector('#add-habit-form');

    this.trigger.addEventListener('click', () => {
      this.open = true;
    });

    window.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (this.open === false) return;

      this.open = false;
    });

    this.form.addEventListener('submit', async (event) => {
      await this.handleSubmit(event);
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this.form);

    const title = formData.get('title');

    try {
      await createHabit(title);
    } catch {
      alert('Failed to create habit');
    }

    await TodayHabits.getInstance().refresh();

    this.open = false;
  }

  get open() {
    return this._open;
  }

  set open(value) {
    this._open = value;

    if (value) {
      this.dialog.setAttribute('open', '');
    } else {
      this.dialog.removeAttribute('open');
    }
  }
}
