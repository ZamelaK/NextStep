import type { University, Application, UserProfile } from './types';

export const MOCK_UNIVERSITIES: University[] = [
  {
    id: '1',
    name: 'University of Toronto',
    location: 'Toronto, ON',
    logo: '/logos/toronto.svg',
    description: 'A global leader in research and teaching, the University of Toronto has a long history of challenging the impossible and transforming society through the ingenuity and resolve of its faculty, students, alumni and supporters.',
    programs: [
      { id: 'p1', name: 'Computer Science', requirements: 'Avg. 92%+' },
      { id: 'p2', name: 'Engineering Science', requirements: 'Avg. 95%+' },
      { id: 'p3', name: 'Rotman Commerce', requirements: 'Avg. 90%+' },
    ],
    image: 'https://picsum.photos/800/600?random=1',
  },
  {
    id: '2',
    name: 'University of British Columbia',
    location: 'Vancouver, BC',
    logo: '/logos/ubc.svg',
    description: 'UBC is a global centre for research and teaching, consistently ranked among the top 20 public universities in the world.',
    programs: [
      { id: 'p4', name: 'Sauder School of Business', requirements: 'Avg. 94%+' },
      { id: 'p5', name: 'Applied Science', requirements: 'Avg. 91%+' },
      { id: 'p6', name: 'Cognitive Systems', requirements: 'Avg. 88%+' },
    ],
    image: 'https://picsum.photos/800/600?random=2',
  },
  {
    id: '3',
    name: 'McGill University',
    location: 'Montreal, QC',
    logo: '/logos/mcgill.svg',
    description: 'McGill is one of Canada\'s best-known institutions of higher learning and one of the leading universities in the world. With students coming to McGill from some 150 countries, our student body is the most internationally diverse of any research-intensive university in the country.',
    programs: [
      { id: 'p7', name: 'Arts and Science', requirements: 'Avg. 89%+' },
      { id: 'p8', name: 'Management', requirements: 'Avg. 93%+' },
      { id: 'p9', name: 'Bioengineering', requirements: 'Avg. 94%+' },
    ],
    image: 'https://picsum.photos/800/600?random=3',
  },
  {
    id: '4',
    name: 'University of Waterloo',
    location: 'Waterloo, ON',
    logo: '/logos/waterloo.svg',
    description: 'The University of Waterloo is renowned for its co-operative education programs, which are the largest in the world.',
    programs: [
        { id: 'p10', name: 'Software Engineering', requirements: 'Avg. 96%+' },
        { id: 'p11', name: 'Mathematics', requirements: 'Avg. 90%+' },
        { id: 'p12', name: 'Global Business and Digital Arts', requirements: 'Avg. 85%+' },
    ],
    image: 'https://picsum.photos/800/600?random=4',
  }
];

export const MOCK_APPLICATIONS: Application[] = [
    { id: 'a1', university: 'University of Toronto', program: 'Computer Science', status: 'Pending', date: '2023-11-15' },
    { id: 'a2', university: 'University of Waterloo', program: 'Software Engineering', status: 'Draft', date: '2023-11-10' },
    { id: 'a3', university: 'McGill University', program: 'Management', status: 'Accepted', date: '2023-10-28', feedback: 'Congratulations! We are pleased to offer you admission.' },
    { id: 'a4', university: 'University of British Columbia', program: 'Sauder School of Business', status: 'Rejected', date: '2023-11-20', feedback: 'We received a high volume of qualified applicants this year.' },
    { id: 'a5', university: 'University of Toronto', program: 'Engineering Science', status: 'Interview', date: '2023-12-01', feedback: 'You have been selected for an interview. Please schedule a time.' },
];

export const MOCK_USER_PROFILE: UserProfile = {
  name: 'Student User',
  email: 'student@nextstep.com',
  grade11Results: 'Math: 95, English: 88, Science: 92, History: 90, French: 85',
  grade12FirstTermResults: 'Advanced Functions: 96, English: 90, Physics: 94, Chemistry: 91, Computer Science: 98',
  grade12SecondTermResults: 'Calculus: 97, English: 92, Data Management: 95',
  preferredLocation: 'Ontario',
  preferredProgram: 'Computer Science',
};
