import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return <GraduationCap className={cn('text-primary', className)} />;
}
