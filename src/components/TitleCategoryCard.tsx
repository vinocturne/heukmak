import { TitleItem } from '@/api/character'
import { getGradeColor } from '@/lib/utils'

interface TitleCategoryCardProps {
  category: 'Attack' | 'Defense' | 'Etc'
  titles: TitleItem[]
}

const CATEGORY_LABELS = {
  Attack: '공격계열',
  Defense: '방어계열',
  Etc: '기타계열',
}

export function TitleCategoryCard({
  category,
  titles,
}: TitleCategoryCardProps) {
  const imagePath = `/src/assets/img/title/title_icon_${category.toLowerCase()}.png`

  const totalOwned = titles.reduce((sum, title) => sum + title.ownedCount, 0)
  const totalCount = titles.reduce((sum, title) => sum + title.totalCount, 0)

  return (
    <div className="flex flex-col rounded-lg border border-border/40 overflow-hidden">
      {/* 상단 헤더 */}
      <div className="flex items-center gap-3 p-3 bg-gray-900">
        <div className="w-12 h-12 flex-shrink-0">
          <img
            src={imagePath}
            alt={CATEGORY_LABELS[category]}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-sm font-medium">
            {CATEGORY_LABELS[category]}
          </span>
          <div className="text-xs">
            <span className="font-bold text-primary">{totalOwned}</span>
            <span className="text-muted-foreground/50"> / {totalCount}</span>
          </div>
        </div>
      </div>

      {/* 타이틀 리스트 */}
      <div className="flex flex-col p-3 bg-card gap-3">
        {titles.map(title => (
          <div key={title.id} className="flex flex-col gap-1">
            <span className={`text-sm font-medium ${getGradeColor(title.grade)}`}>
              {title.name}
            </span>
            {title.equipStatList && title.equipStatList.length > 0 && (
              <div className="flex flex-col gap-0.5 pl-2">
                {title.equipStatList.map((stat, index) => (
                  <span
                    key={index}
                    className="text-xs text-muted-foreground"
                  >
                    {stat.desc}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
