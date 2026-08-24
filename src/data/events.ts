// TODO: no real event data supplied yet. Add seminars, guest lectures, PhD
// defences and workshops here and the Events page will render them.

export type EventItem = {
  date: string; // ISO date
  title: string;
  speaker?: string;
  location: string;
  time: string;
  description: string;
};

export const events: EventItem[] = [];
