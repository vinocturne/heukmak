import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Shield, Swords, Heart, Star } from 'lucide-react'

export interface GuildMember {
  id: string
  name: string
  role: '길드장' | '부길드장' | '길드원'
  class: string
  level: number
  joinDate: string
  isOnline?: boolean
}

interface MemberCardProps {
  member: GuildMember
  index?: number
}

const roleColors: Record<string, string> = {
  길드장: 'bg-primary/20 text-primary border-primary/30',
  부길드장: 'bg-accent/20 text-accent border-accent/30',
  길드원: 'bg-secondary text-secondary-foreground border-border',
}

const roleIcons: Record<string, React.ReactNode> = {
  길드장: <Star className="w-3 h-3" />,
  부길드장: <Shield className="w-3 h-3" />,
  길드원: <Swords className="w-3 h-3" />,
}

export function MemberCard({ member, index = 0 }: MemberCardProps) {
  return (
    <div
      className={cn(
        'group relative p-4 rounded-lg border border-border/50',
        'bg-gradient-card backdrop-blur-sm',
        'transition-all duration-300 ease-out',
        'hover:border-glow hover:card-glow-hover hover:scale-[1.02]',
        'animate-slide-up'
      )}
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'backwards',
      }}
    >
      {/* Online indicator */}
      <div className="absolute top-3 right-3">
        <div
          className={cn(
            'w-2.5 h-2.5 rounded-full',
            member.isOnline
              ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'
              : 'bg-muted-foreground/30'
          )}
        />
      </div>

      {/* Member info */}
      <div className="flex items-start gap-3">
        {/* Avatar placeholder */}
        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary font-display text-lg shrink-0">
          {member.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground truncate">
              {member.name}
            </h3>
            <Badge
              variant="outline"
              className={cn(
                'text-xs font-medium flex items-center gap-1',
                roleColors[member.role]
              )}
            >
              {roleIcons[member.role]}
              {member.role}
            </Badge>
          </div>

          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-destructive" />
              Lv.{member.level}
            </span>
            <span>{member.class}</span>
          </div>

          <p className="mt-1 text-xs text-muted-foreground/70">
            가입일: {member.joinDate}
          </p>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-accent" />
    </div>
  )
}
