export type ScheduleViewEvent = { 
  link: string; 
  time: string;
  raceNo: string;
};

export type EventSchedule = {
  [key: string]: ScheduleViewEvent[];
};

export type Venue = {
  name: string;
  countryName: string;
}
