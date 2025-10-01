

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
  id:string;
  name: string;
  requirements: string;
};

export type College = {
  id: string;
  name: string;
  location: string;
  description: string;
  programs: Program[];
  image: string;
};

export type SubjectGrade = {
  subject: string;
  grade: number;
}

export type UserProfile = {
  name: string;
  email: string;
  phoneNumber: string;
  idNumber: string;
  profilePicture?: string | FileList;
  grade11Results: SubjectGrade[];
  grade11Document?: FileList;
  grade12FirstTermResults: SubjectGrade[];
  grade12FirstTermDocument?: FileList;
  grade12SecondTermResults: SubjectGrade[];
  grade12SecondTermDocument?: FileList;
  preferredLocation: string;
  preferredPrograms: string[];
};

export type Document = {
  id: string;
  name: string;
  type: 'ID' | 'Transcript' | 'Essay' | 'Other';
  uploadDate: string;
  fileUrl: string;
};
