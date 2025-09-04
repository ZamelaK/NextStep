import type { University, Application, UserProfile, College } from './types';

export const MOCK_UNIVERSITIES: University[] = [
  {
    id: 'za1',
    name: 'University of Cape Town',
    location: 'Cape Town, South Africa',
    logo: '/logos/uct.svg',
    description: 'The University of Cape Town is South Africa\'s oldest university and one of Africa\'s leading teaching and research institutions.',
    programs: [
      { id: 'p-za1-1', name: 'Bachelor of Commerce (BCom)', requirements: 'APS: 480+' },
      { id: 'p-za1-2', name: 'Bachelor of Science in Engineering', requirements: 'APS: 500+' },
      { id: 'p-za1-3', name: 'Bachelor of Medicine & Surgery (MBChB)', requirements: 'APS: 520+' },
    ],
    image: 'https://picsum.photos/800/600?random=5',
  },
  {
    id: 'za2',
    name: 'University of the Witwatersrand',
    location: 'Johannesburg, South Africa',
    logo: '/logos/wits.svg',
    description: 'Wits University is a remarkable institution, renowned for its intellectual leadership and its commitment to research and the advancement of knowledge.',
    programs: [
      { id: 'p-za2-1', name: 'BSc in Computer Science', requirements: 'APS: 450+' },
      { id: 'p-za2-2', name: 'BA in Law', requirements: 'APS: 460+' },
      { id: 'p-za2-3', name: 'BEngSc in Biomedical Engineering', requirements: 'APS: 480+' },
    ],
    image: 'https://picsum.photos/800/600?random=6',
  },
  {
    id: 'za3',
    name: 'Stellenbosch University',
    location: 'Stellenbosch, South Africa',
    logo: '/logos/stellenbosch.svg',
    description: 'Stellenbosch University is a public research university situated in Stellenbosch, a town in the Western Cape province of South Africa.',
    programs: [
      { id: 'p-za3-1', name: 'BAcc (Accounting)', requirements: 'Avg. 85%+' },
      { id: 'p-za3-2', name: 'BSc in AgriSciences', requirements: 'Avg. 75%+' },
      { id: 'p-za3-3', name: 'BA in Social Dynamics', requirements: 'Avg. 80%+' },
    ],
    image: 'https://picsum.photos/800/600?random=7',
  },
  {
    id: 'za4',
    name: 'University of Pretoria',
    location: 'Pretoria, South Africa',
    logo: '/logos/up.svg',
    description: 'The University of Pretoria (UP) is one of Africa’s top universities and the largest contact university in South Africa.',
    programs: [
      { id: 'p-za4-1', name: 'BCom in Economics', requirements: 'APS: 32+' },
      { id: 'p-za4-2', name: 'BEd in Foundation Phase Teaching', requirements: 'APS: 28+' },
      { id: 'p-za4-3', name: 'BIT - Information Technology', requirements: 'APS: 30+' },
    ],
    image: 'https://picsum.photos/800/600?random=8',
  },
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

export const MOCK_COLLEGES: College[] = [
  {
    id: 'c1',
    name: 'Boston City Campus',
    location: 'Multiple, South Africa',
    description: 'Boston City Campus offers a range of qualifications, from diplomas to degrees, with a focus on practical skills and career readiness.',
    programs: [
      { id: 'cp1', name: 'Diploma in IT Support', requirements: 'National Senior Certificate' },
      { id: 'cp2', name: 'BCom in Management Marketing', requirements: 'Bachelor\'s Pass' },
    ],
    image: 'https://picsum.photos/800/600?random=9',
  },
  {
    id: 'c2',
    name: 'Varsity College',
    location: 'Multiple, South Africa',
    description: 'Varsity College, an educational brand of The Independent Institute of Education (IIE), is a leading provider of private higher education in South Africa.',
    programs: [
      { id: 'cp3', name: 'Diploma in Business Management', requirements: 'Diploma Pass' },
      { id: 'cp4', name: 'Higher Certificate in Event Management', requirements: 'Higher Certificate Pass' },
    ],
    image: 'https://picsum.photos/800/600?random=10',
  },
  {
    id: 'c3',
    name: 'Pearson Institute of Higher Education',
    location: 'Multiple, South Africa',
    description: 'PIHE offers higher education qualifications across a range of fields, including commerce, humanities, and IT.',
    programs: [
      { id: 'cp5', name: 'BSc in Information Technology', requirements: 'Bachelor\'s Pass with Maths' },
      { id: 'cp6', name: 'Higher Certificate in Marketing', requirements: 'National Senior Certificate' },
    ],
    image: 'https://picsum.photos/800/600?random=11',
  },
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
  preferredLocation: 'Gauteng, South Africa',
  preferredProgram: 'Computer Science',
};
