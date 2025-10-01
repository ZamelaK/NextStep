
import { config } from 'dotenv';
config();

import '@/ai/flows/estimate-admission-chance.ts';
import '@/ai/flows/suggest-universities.ts';
import '@/ai/flows/suggest-colleges.ts';
import '@/ai/flows/review-essay.ts';
