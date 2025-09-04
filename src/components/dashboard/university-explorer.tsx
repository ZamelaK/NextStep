"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { UniversityCard } from '@/components/dashboard/university-card';
import type { University, UserProfile } from '@/lib/types';

export function UniversityExplorer({ universities, userProfile }: { universities: University[], userProfile: UserProfile }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.programs.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="relative">
        <Input
          placeholder="Search universities, programs, or locations..."
          className="pl-10 text-base py-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-2">
        {filteredUniversities.map(uni => (
          <UniversityCard key={uni.id} university={uni} userProfile={userProfile} />
        ))}
      </div>
    </div>
  );
}
