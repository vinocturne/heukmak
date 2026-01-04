import { StatItem as StatItemType } from '@/api/character'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface StatItemProps {
  stat: StatItemType
  isMainStat?: boolean
}

const MAIN_STAT_TYPES = ['STR', 'AGI', 'DEX', 'WIS', 'INT', 'CON']

export function StatItem({ stat, isMainStat }: StatItemProps) {
  const isMain = isMainStat ?? MAIN_STAT_TYPES.includes(stat.type)
  const statImagePath = isMain
    ? `/img/stat/stat_${stat.type.toLowerCase()}.png`
    : `/img/stat/stat_lords_${stat.type.toLowerCase()}.png`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-center gap-2 p-3 hover:bg-accent/30 rounded-lg transition-colors cursor-pointer">
          <div className="w-12 h-12 flex-shrink-0">
            <img
              src={statImagePath}
              alt={stat.name}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-sm font-medium text-center">{stat.name}</span>
          <span className="text-lg font-bold text-primary">{stat.value}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs bg-gray-900 border-gray-700">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-base border-b border-border pb-2">
            {stat.name} {stat.value}
          </div>
          {stat.statSecondList && stat.statSecondList.length > 0 && (
            <div className="flex flex-col gap-1">
              {stat.statSecondList.map((desc, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  {desc}
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
