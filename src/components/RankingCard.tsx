import { RankingItem } from '@/api/character'

interface RankingCardProps {
  ranking: RankingItem
}

export function RankingCard({ ranking }: RankingCardProps) {
  return (
    <div className="relative flex items-center justify-between p-4 bg-accent/20 rounded-lg border border-border/40 hover:bg-accent/30 transition-colors overflow-hidden">
      {/* 왼쪽: Rank와 이름 - 고정 너비 */}
      <div className="flex flex-col gap-1 w-26 flex-shrink-0">
        {ranking.rank && (
          <span className="text-2xl font-bold text-primary">
            {ranking.rank}위
          </span>
        )}
        <span className="text-sm font-medium truncate">
          {ranking.rankingContentsName}
        </span>
      </div>

      {/* 오른쪽: Point - 고정 너비로 우측 정렬 */}
      {ranking.point ? (
        <div className="w-32 flex items-center justify-end flex-shrink-0">
          {/* 중앙: Grade Icon */}
          {ranking.gradeIcon && (
            <div className="flex items-center justify-start flex-1">
              <img
                src={ranking.gradeIcon}
                alt={ranking.gradeName}
                className="w-12 h-12 object-contain"
              />
            </div>
          )}
          {ranking.point && (
            <span className="text-lg font-bold">
              {ranking.point.toLocaleString('ko-KR')}
            </span>
          )}
        </div>
      ) : (
        <div className="text-sm">은 안하시는군요</div>
      )}
    </div>
  )
}
