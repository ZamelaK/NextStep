import type { University, Application, UserProfile, College } from './types';

export const MOCK_UNIVERSITIES: University[] = [
  {
    id: 'za1',
    name: 'University of Cape Town',
    location: 'Cape Town, South Africa',
    logo: '/logos/uct.svg',
    description: 'The University of Cape Town is South Africa\'s oldest university and one of Africa\'s leading teaching and research institutions.',
    programs: [
      { id: 'p-za1-1', name: 'Bachelor of Commerce (BCom)', requirements: 'APS: 35+' },
      { id: 'p-za1-2', name: 'Bachelor of Science in Engineering', requirements: 'APS: 38+' },
      { id: 'p-za1-3', name: 'Bachelor of Medicine & Surgery (MBChB)', requirements: 'APS: 42+' },
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
      { id: 'p-za2-1', name: 'BSc in Computer Science', requirements: 'APS: 36+' },
      { id: 'p-za2-2', name: 'BA in Law', requirements: 'APS: 34+' },
      { id: 'p-za2-3', name: 'BEngSc in Biomedical Engineering', requirements: 'APS: 39+' },
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
    id: 'za5',
    name: 'University of Johannesburg',
    location: 'Johannesburg, South Africa',
    logo: '/logos/uj.svg',
    description: 'The University of Johannesburg is a vibrant and cosmopolitan university, anchored in Africa and intent on global excellence and stature.',
    programs: [
      { id: 'p-za5-1', name: 'Diploma in Public Relations', requirements: 'APS: 22+' },
      { id: 'p-za5-2', name: 'BSc in Life and Environmental Sciences', requirements: 'APS: 26+' },
      { id: 'p-za5-3', name: 'BA in Human Resource Management', requirements: 'APS: 24+' },
    ],
    image: 'https://picsum.photos/800/600?random=12',
  },
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
  {
    id: 'c4',
    name: 'Rosebank College',
    location: 'Multiple, South Africa',
    description: 'Rosebank College is an educational brand of The Independent Institute of Education (IIE) and has a focus on providing affordable, quality education.',
    programs: [
      { id: 'cp7', name: 'Diploma in Journalism', requirements: 'Diploma Pass' },
      { id: 'cp8', name: 'Higher Certificate in Logistics and Supply Chain Management', requirements: 'Higher Certificate Pass' },
    ],
    image: 'https://picsum.photos/800/600?random=13',
  },
  {
    id: 'c5',
    name: 'Damelin',
    location: 'Multiple, South Africa',
    description: 'Damelin is one of the oldest private education institutions in South Africa, offering a wide range of courses from diplomas to degrees.',
    programs: [
      { id: 'cp9', name: 'Diploma in Public Administration', requirements: 'National Senior Certificate' },
      { id: 'cp10', name: 'National Diploma in Sound Engineering', requirements: 'National Senior Certificate' },
    ],
    image: 'https://picsum.photos/800/600?random=14',
  }
];


export const MOCK_APPLICATIONS: Application[] = [
    { id: 'a1', university: 'University of the Witwatersrand', program: 'BSc in Computer Science', status: 'Pending', date: '2023-11-15' },
    { id: 'a2', university: 'University of Pretoria', program: 'BIT - Information Technology', status: 'Draft', date: '2023-11-10' },
    { id: 'a3', university: 'Stellenbosch University', program: 'BAcc (Accounting)', status: 'Accepted', date: '2023-10-28', feedback: 'Congratulations! We are pleased to offer you admission.' },
    { id: 'a4', university: 'University of Cape Town', program: 'Bachelor of Commerce (BCom)', status: 'Rejected', date: '2023-11-20', feedback: 'We received a high volume of qualified applicants this year.' },
    { id: 'a5', university: 'University of Johannesburg', program: 'BA in Human Resource Management', status: 'Interview', date: '2023-12-01', feedback: 'You have been selected for an interview. Please schedule a time.' },
];

export const MOCK_USER_PROFILE: UserProfile = {
  name: 'Student User',
  email: 'student@nextstep.com',
  grade11Results: 'Mathematics: 85, English HL: 78, Life Sciences: 75, Physical Sciences: 72, Afrikaans FAL: 80, Life Orientation: 90',
  grade12FirstTermResults: 'Mathematics: 88, English HL: 82, Life Sciences: 78, Physical Sciences: 76, Afrikaans FAL: 81, Life Orientation: 92',
  grade12SecondTermResults: 'Mathematics: 90, English HL: 85, Life Sciences: 80, Physical Sciences: 79',
  preferredLocation: 'Gauteng, South Africa',
  preferredProgram: 'Computer Science',
};
