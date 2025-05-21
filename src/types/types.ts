export interface EventData {
  year: string;
  description: string;
}

export interface TimeSegmentData {
  id: string;
  startYear: number;
  endYear: number;
  category: string;
  events: EventData[];
}
