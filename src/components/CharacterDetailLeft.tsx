import { CharacterInfo } from '@/api/character'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { StatItem } from './StatItem'
import { TitleCategoryCard } from './TitleCategoryCard'
import { RankingCard } from './RankingCard'
import { useMemo, useState } from 'react'

interface CharacterDetailLeftProps {
  characterInfo: CharacterInfo
}

const MAIN_STAT_ORDER = ['STR', 'AGI', 'DEX', 'WIS', 'INT', 'CON']

export function CharacterDetailLeft({
  characterInfo,
}: CharacterDetailLeftProps) {
  const [isExpanded, setIsExpanded] = useState<string>('')

  const mainStats = useMemo(() => {
    return MAIN_STAT_ORDER.map(type =>
      characterInfo.stat.statList.find(stat => stat.type === type)
    ).filter(Boolean)
  }, [characterInfo.stat.statList])

  const otherStats = useMemo(() => {
    return characterInfo.stat.statList.filter(
      stat => !MAIN_STAT_ORDER.includes(stat.type) && stat.type !== 'ItemLevel'
    )
  }, [characterInfo.stat.statList])

  const titlesByCategory = useMemo(() => {
    const categories = {
      Attack: [] as typeof characterInfo.title.titleList,
      Defense: [] as typeof characterInfo.title.titleList,
      Etc: [] as typeof characterInfo.title.titleList,
    }

    characterInfo.title.titleList.forEach(title => {
      const category = title.equipCategory as 'Attack' | 'Defense' | 'Etc'
      if (categories[category]) {
        categories[category].push(title)
      }
    })

    return categories
  }, [characterInfo.title.titleList])

  return (
    <div className="flex flex-col gap-3">
      {/* 주요 스탯 카드 */}
      <div className="bg-card p-4 rounded-lg border border-border">
        <div className="flex justify-between items-center mb-4">
          <span className="font-hyeon text-lg">주요 스탯</span>
        </div>
        {/* 주요 스탯 6개 일렬 표시 */}
        <div className="grid grid-cols-6 gap-1">
          {mainStats.map(
            stat => stat && <StatItem key={stat.type} stat={stat} isMainStat />
          )}
        </div>

        {/* 더보기 아코디언 */}
        {otherStats.length > 0 && (
          <Accordion
            type="single"
            collapsible
            className="mt-2"
            value={isExpanded}
            onValueChange={setIsExpanded}
          >
            <AccordionItem value="more-stats" className="border-0">
              {isExpanded !== 'more-stats' && (
                <AccordionTrigger className="font-hyeon text-base py-2 hover:no-underline justify-center">
                  더보기
                </AccordionTrigger>
              )}
              <AccordionContent>
                <div className="grid grid-cols-6 gap-1 pt-2">
                  {otherStats.map(stat => (
                    <StatItem key={stat.type} stat={stat} isMainStat={false} />
                  ))}
                </div>
              </AccordionContent>
              {isExpanded === 'more-stats' && (
                <AccordionTrigger className="font-hyeon text-base py-2 hover:no-underline justify-center">
                  닫기
                </AccordionTrigger>
              )}
            </AccordionItem>
          </Accordion>
        )}
      </div>

      {/* 타이틀 카드 */}
      <div className="bg-card p-4 rounded-lg border border-border">
        <div className="flex justify-between items-center mb-4">
          <span className="font-hyeon text-lg">타이틀</span>
          <span className="text-sm">
            <span className="font-bold text-primary">
              {characterInfo.title.ownedCount}
            </span>
            <span className="text-muted-foreground/50">
              {' '}
              / {characterInfo.title.totalCount}
            </span>
          </span>
        </div>

        {/* 타이틀 카테고리 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TitleCategoryCard category="Attack" titles={titlesByCategory.Attack} />
          <TitleCategoryCard
            category="Defense"
            titles={titlesByCategory.Defense}
          />
          <TitleCategoryCard category="Etc" titles={titlesByCategory.Etc} />
        </div>
      </div>

      {/* 랭킹 카드 */}
      {characterInfo.ranking.rankingList.length > 0 && (
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex justify-between items-center mb-4">
            <span className="font-hyeon text-lg">랭킹</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {characterInfo.ranking.rankingList.map(ranking => (
              <RankingCard key={ranking.rankingContentsType} ranking={ranking} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
