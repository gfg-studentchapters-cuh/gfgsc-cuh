export interface Event {
  eventTitle1?: string;
  eventTitle2?: string;
  eventType?: string;
  eventId: number;
  eventDate: string;
  rulesAndRegulations?: string;
  description?: string;
  prizes?: string;
  eventEnded: boolean;
  eventImage?: string;
  eventGallery: string[];
  winners?: any[];
  speaker?: {};
}

export interface Winners {
  position: string;
  name: string;
  collegeName: string;
  prizesWon: [];
}
