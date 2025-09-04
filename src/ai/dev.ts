
import { config } from 'dotenv';
config();

import '@/ai/flows/estimate-admission-chance.ts';
import '@/ai/flows/suggest-alternative-universities.ts';
import '@/ai/flows/suggest-colleges.ts';
import '@/ai/flows/review-essay.ts';
