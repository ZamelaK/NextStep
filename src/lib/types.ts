export type Application = {
  id: string;
  university: string;
  program: string;
  status: 'Accepted' | 'Rejected' | 'Pending' | 'Interview' | 'Draft';
  date: string;
  feedback?: string;
};

export type University = {
  id: string;
  name: string;
  location: string;
  logo: string;
  description: string;
  programs: Program[];
  image: string;
};

export type Program = {
  id: string;
  name: string;
  requirements: string;
};

export type UserProfile = {
  name: string;
  email: string;
  grade11Results: string;
  grade12FirstTermResults: string;
  grade12SecondTermResults: string;
  preferredLocation: string;
  preferredProgram: string;
};
