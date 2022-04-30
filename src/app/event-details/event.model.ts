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
  eventRegistrationLink?: string;
  liveEventLink?: string;
  winners?: any;
  speaker?: any[];
  isEventFree?: boolean;
  eventLocation?: string;
  eventFee?: number;
  judgingCriteria?: string;
}

export interface Winners {
  position: string;
  name: string;
  collegeName: string;
  prizesWon: [];
}
