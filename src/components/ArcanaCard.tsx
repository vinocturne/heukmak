import { useQuery } from '@tanstack/react-query'
import { EquipmentItem, getArcanaItemDetail } from '@/api/character'
import { getGradeColor } from '@/lib/utils'

interface ArcanaCardProps {
  arcanaItem: EquipmentItem
  characterId: string
}

export function ArcanaCard({ arcanaItem, characterId }: ArcanaCardProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['arcanaItemDetail', arcanaItem.id, characterId],
    queryFn: () =>
      getArcanaItemDetail({
        id: arcanaItem.id,
        enchantLevel: arcanaItem.enchantLevel,
        characterId,
        slotPos: arcanaItem.slotPos,
      }),
    enabled: !!arcanaItem.id && !!characterId,
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 p-4 bg-accent/20 rounded-lg border border-border/40">
        <div className="w-16 h-16 bg-muted animate-pulse rounded" />
        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
      </div>
    )
  }

  if (error || !data) {
    return null
  }

  return (
    <div className="flex flex-row md:flex-col gap-3 p-4 bg-accent/20 rounded-lg border border-border/40 hover:bg-accent/30 transition-colors">
      {/* 아이템 아이콘 및 이름 */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0 w-24 md:w-auto">
        <div className="w-16 h-16 flex-shrink-0 bg-black/20 rounded border border-border overflow-hidden">
          <img
            src={data.icon}
            alt={data.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center min-h-[2.5rem] md:min-h-[2.5rem] flex items-center justify-center w-full">
          <span className={`text-sm font-medium ${getGradeColor(data.grade)} leading-tight`}>
            {data.enchantLevel > 0 && (
              <span className="mr-1">+{data.enchantLevel}</span>
            )}
            {data.name}
          </span>
        </div>
      </div>

      {/* SubSkills */}
      {data.subSkills && data.subSkills.length > 0 && (
        <div className="flex flex-col gap-2 md:pt-2 md:border-t border-border/40 flex-1">
          {data.subSkills.map(skill => (
            <div key={skill.id} className="flex items-center gap-2">
              <div className="w-6 h-6 flex-shrink-0">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs font-medium truncate">
                  {skill.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  Lv. {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
