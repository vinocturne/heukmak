import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

export function getGradeColor(grade: string | null): string {
  switch (grade) {
    case 'Unique':
      return 'text-yellow-400'
    case 'Legend':
      return 'text-blue-400'
    case 'Epic':
      return 'text-red-400'
    case 'Rare':
      return 'text-green-400'
    case 'Special':
      return 'text-purple-400'
    default:
      return 'text-foreground'
  }
}
