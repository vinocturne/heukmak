import { DrawerHeader } from './ui/drawer'
import { getItemDetail } from '@/api/item'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

interface EquipmentDetailProps {
  id: number
  enchantLevel: number
  characterId: string
  slotPos: number
  exceedLevel: number
}

const getGradeColor = (grade: string | null) => {
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

export function EquipmentDetail({
  id,
  enchantLevel,
  characterId,
  slotPos,
  exceedLevel = 0,
}: EquipmentDetailProps) {
  const {
    data: itemDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'item-detail',
      id,
      enchantLevel,
      exceedLevel,
      characterId,
      slotPos,
    ],
    queryFn: () =>
      getItemDetail({
        id,
        enchantLevel: enchantLevel + exceedLevel,
        characterId,
        slotPos,
      }),
    enabled: !!id && !!characterId,
  })

  return (
    <div className="h-full">
      <DrawerHeader>장비 상세 보기</DrawerHeader>
      <section className="p-[12px_24px_36px_24px]">
        {isLoading && (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <div className="text-center text-red-500">
            아이템 정보를 불러오는데 실패했습니다.
          </div>
        )}
        {itemDetail && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {itemDetail.icon && (
                <img
                  src={itemDetail.icon}
                  alt={itemDetail.name}
                  className="w-16 h-16 object-contain"
                />
              )}
              {/* 초월 레벨 */}
              {exceedLevel > 0 && (
                <div className="relative w-6 h-6 flex-shrink-0">
                  <div className="absolute inset-0 bg-blue-600 transform rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold z-10">
                      {exceedLevel}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                {/* 강화 레벨 */}
                {itemDetail.enchantLevel > 0 && (
                  <span
                    className={`text-lg font-bold ${getGradeColor(itemDetail.grade)}`}
                  >
                    +{itemDetail.enchantLevel - exceedLevel}
                  </span>
                )}
                <h3
                  className={`font-sans text-2xl ${getGradeColor(itemDetail.grade)}`}
                >
                  {itemDetail.name}
                </h3>
              </div>
            </div>
            <ScrollArea className="h-[30vh]">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* 아이템 정보 */}
                <div className="flex-1 text-sm">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-sans text-xl mb-2.5">아이템 정보</h4>
                    <div className="flex justify-between lg:justify-start">
                      <span className="w-auto lg:w-60 text-muted-foreground">
                        분류
                      </span>
                      <span>{itemDetail.categoryName}</span>
                    </div>
                    <div className="flex justify-between lg:justify-start">
                      <span className="w-auto lg:w-60 text-muted-foreground">
                        아이템 레벨
                      </span>
                      <span className="flex gap-2">
                        {itemDetail.level}
                        {itemDetail.levelValue && (
                          <span className="text-blue-400">
                            (+{itemDetail.levelValue})
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between lg:justify-start">
                      <span className="w-auto lg:w-60 text-muted-foreground">
                        장착 제한 레벨
                      </span>
                      <span>{itemDetail.equipLevel}</span>
                    </div>
                    <Separator orientation="horizontal" className="my-4" />
                    <div className="flex justify-start">
                      <span className="max-w-40 w-full lg:w-60 lg:max-w-60 text-muted-foreground">
                        옵션
                      </span>
                      <div className="flex flex-col">
                        {itemDetail.mainStats.map(stat => (
                          <div className="flex gap-2">
                            <span
                              className={`${stat.exceed && 'text-blue-400'}`}
                            >
                              {stat.name}
                            </span>
                            <div className="flex gap-2">
                              <span
                                className={`${stat.exceed && 'text-blue-400'}`}
                              >
                                {stat.exceed ? stat.extra : stat.value}
                              </span>
                              {!stat.exceed && (
                                <span className="text-blue-400">
                                  (+{stat.extra})
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator orientation="horizontal" className="my-4" />
                    <div className="flex justify-start">
                      <span className="max-w-40 w-full lg:w-60 lg:max-w-60 text-muted-foreground">
                        획득처
                      </span>
                      <div className="flex flex-col">
                        {itemDetail.sources.map(source => (
                          <div className="flex flex-col gap-2">
                            <span>{source}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 반응형 Separator */}
                <Separator
                  orientation="vertical"
                  className="hidden lg:block h-auto"
                />
                <Separator className="lg:hidden" />

                <div className="flex-1 text-sm">
                  <h4 className="font-sans text-xl mb-2.5">각인</h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-start">
                      <span className="max-w-40 w-full lg:w-60 lg:max-w-60 text-muted-foreground">
                        영혼 각인
                        <span className={'text-blue-400'}>
                          {itemDetail.subStats && (
                            <>({itemDetail.soulBindRate}%)</>
                          )}
                        </span>
                      </span>
                      <div className="flex flex-col">
                        {itemDetail.subStats &&
                          itemDetail.subStats.map(stat => (
                            <div className="flex gap-2">
                              <span
                                className={`${stat.exceed && 'text-blue-400'}`}
                              >
                                {stat.name}
                              </span>
                              <div className="flex gap-2">
                                <span
                                  className={`${stat.exceed && 'text-blue-400'}`}
                                >
                                  {stat.value}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <Separator orientation="horizontal" className="my-4" />
                    {/* 마석 각인 */}
                    <div className="flex justify-start">
                      <span className="max-w-40 w-full lg:w-60 lg:max-w-60 text-muted-foreground">
                        마석 각인
                      </span>
                      <div className="flex flex-col gap-1">
                        {itemDetail.magicStoneStat &&
                          itemDetail.magicStoneStat.map((stone, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <img
                                src={stone.icon}
                                alt={stone.name}
                                className="w-6 h-6 object-contain"
                              />
                              <span className={getGradeColor(stone.grade)}>
                                {stone.name}
                              </span>
                              <span className={getGradeColor(stone.grade)}>
                                {stone.value}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                    <Separator orientation="horizontal" className="my-4" />
                    {/* 신석 각인 */}
                    <div className="flex justify-start">
                      <span className="max-w-40 w-full lg:w-60 lg:max-w-60 text-muted-foreground">
                        신석 각인
                      </span>
                      <div className="flex flex-col gap-1">
                        {itemDetail.godStoneStat &&
                          itemDetail.godStoneStat.map((stone, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <img
                                src={stone.icon}
                                alt={stone.name}
                                className="w-6 h-6 object-contain"
                              />
                              <div className="flex flex-col">
                                <span className={getGradeColor(stone.grade)}>
                                  {stone.name}
                                </span>
                                <span className={''}>{stone.desc}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            {/* <Separator className="my-4" /> */}

            {/* 옵션 */}
            {/* <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold">옵션</h4>
              <div className="text-sm text-muted-foreground">

              </div>
            </div>
            */}
          </div>
        )}
      </section>
    </div>
  )
}
