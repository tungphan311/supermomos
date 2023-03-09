export type SocialFields = {
  title: string;
  startAt: Date;
  time: Date;
  venue: string;
  capacity: number;
  price: number;
  description: string;
  banner: string;
  tags: string[];
  isManualApprove?: boolean;
  privacy: string;
};
