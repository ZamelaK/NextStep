"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { CollegeCard } from '@/components/dashboard/college-card';
import type { College } from '@/lib/types';

export function CollegeExplorer({ colleges }: { colleges: College[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColleges = colleges.filter(col =>
    col.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.programs.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="relative">
        <Input
          placeholder="Search colleges, programs, or locations..."
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
        {filteredColleges.map(col => (
          <CollegeCard key={col.id} college={col} />
        ))}
      </div>
    </div>
  );
}
