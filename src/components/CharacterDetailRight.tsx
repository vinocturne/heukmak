import {
  CharacterInfo,
  CharacterEquipment,
  EquipmentItem,
} from '@/api/character'
import { useState, useMemo } from 'react'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer'
import { EquipmentDetail } from './EquipmentDetail'
import { getGradeColor } from '@/lib/utils'
import { ArcanaCard } from './ArcanaCard'

interface CharacterDetailRightProps {
  characterInfo: CharacterInfo
  characterEquipment: CharacterEquipment // 전달받은 리스트 형태
}

// ... 상단 import 및 interface 동일

export function CharacterDetailRight({
  characterInfo,
  characterEquipment,
}: CharacterDetailRightProps) {
  const [selectedTab, setSelectedTab] = useState<'Equipment' | 'Accessory'>(
    'Equipment'
  )

  const equipmentSlots = [
    'MainHand',
    'SubHand',
    'Torso',
    'Pants',
    'Helmet',
    'Shoulder',
    'Gloves',
    'Boots',
    'Cape',
    'Belt',
  ]

  // 장비/악세사리 리스트 필터링
  const filteredList = useMemo(() => {
    const allItems = Array.isArray(characterEquipment)
      ? characterEquipment
      : (characterEquipment as any).equipment?.equipmentList || []

    return allItems
      .filter((item: EquipmentItem) => {
        const isEquip = equipmentSlots.includes(item.slotPosName)
        const isArcana = item.slotPosName.startsWith('Arcana')
        return selectedTab === 'Equipment' ? isEquip : !isEquip && !isArcana
      })
      .sort((a: EquipmentItem, b: EquipmentItem) => a.slotPos - b.slotPos)
  }, [selectedTab, characterEquipment])

  // 스킨 리스트 필터링 (장비/악세사리 탭에 따라 동일하게 분류)
  const filteredSkinList = useMemo(() => {
    const allSkins = Array.isArray(characterEquipment)
      ? [] // 스킨 데이터 구조에 따라 조정 필요
      : (characterEquipment as any).equipment?.skinList || []

    return allSkins.filter((skin: EquipmentItem) => {
      const isEquip = equipmentSlots.includes(skin.slotPosName)
      return selectedTab === 'Equipment' ? isEquip : !isEquip
    })
  }, [selectedTab, characterEquipment])

  // 아르카나 리스트 필터링
  const arcanaList = useMemo(() => {
    const allItems = Array.isArray(characterEquipment)
      ? characterEquipment
      : (characterEquipment as any).equipment?.equipmentList || []

    return allItems
      .filter(
        (item: EquipmentItem) =>
          item.slotPosName && item.slotPosName.startsWith('Arcana')
      )
      .sort((a: EquipmentItem, b: EquipmentItem) => a.slotPos - b.slotPos)
  }, [characterEquipment])

  return (
    <div className="flex flex-col gap-3 bg-card p-4 rounded-lg border border-border">
      <section className="flex flex-col">
        {/* 탭 메뉴 */}
        <div className="flex justify-between items-center mb-4">
          <span className="font-hyeon text-lg">장착 정보</span>
          <ToggleGroup
            type="single"
            value={selectedTab}
            onValueChange={val =>
              val && setSelectedTab(val as 'Equipment' | 'Accessory')
            }
          >
            <ToggleGroupItem
              value="Equipment"
              className={`cursor-pointer px-4 ${selectedTab === 'Equipment' && 'bg-blue-900 text-white'}`}
            >
              장비
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Accessory"
              className={`cursor-pointer px-4 ${selectedTab === 'Accessory' && 'bg-blue-900 text-white'}`}
            >
              악세사리
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* 아이템 리스트 */}
        <div className="flex flex-col">
          {filteredList.map((item: EquipmentItem) => {
            // 현재 아이템의 슬롯과 일치하는 스킨 찾기
            const matchedSkin = filteredSkinList.find(
              (skin: EquipmentItem) => skin.slotPosName === item.slotPosName
            )

            return (
              <div
                key={`${item.id}-${item.slotPos}`}
                className="flex justify-between items-center gap-3 p-2 hover:bg-accent/50 transition-colors border-b border-border/40 last:border-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {/* 아이템 아이콘 */}
                  <div className="relative w-10 h-10 flex-shrink-0 bg-black/20 rounded border border-border overflow-hidden">
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt={item.name ?? '아이템 아이콘'}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted" />
                    )}
                  </div>

                  {/* 초월 레벨 */}
                  {item.exceedLevel > 0 && (
                    <div className="relative w-5 h-5 flex-shrink-0">
                      <div className="absolute inset-0 bg-blue-600 transform rotate-45" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold z-1">
                          {item.exceedLevel}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 강화 및 이름 */}
                  <Drawer>
                    <DrawerTrigger>
                      <button
                        className={`flex items-center gap-1 min-w-0 ${getGradeColor(item.grade)} cursor-pointer`}
                      >
                        {item.enchantLevel > 0 && (
                          <span className="text-sm font-bold flex-shrink-0">
                            +{item.enchantLevel}
                          </span>
                        )}
                        <span className="text-sm truncate font-medium">
                          {item.name}
                        </span>
                      </button>
                    </DrawerTrigger>
                    <DrawerContent className="max-h-[20vh]">
                      <EquipmentDetail
                        id={item.id}
                        enchantLevel={item.enchantLevel}
                        characterId={characterInfo.profile.characterId}
                        slotPos={item.slotPos}
                        exceedLevel={item.exceedLevel}
                      />
                    </DrawerContent>
                  </Drawer>
                </div>

                {/* 우측 스킨 슬롯 영역 */}
                {matchedSkin && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative w-9 h-9 flex-shrink-0 bg-indigo-900/20 rounded-full border border-indigo-500/30 overflow-hidden flex items-center justify-center group">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <img
                            src={matchedSkin.icon}
                            alt="skin"
                            className="w-full h-full object-contain p-1 cursor-pointer"
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-amber-800">
                          {matchedSkin.name}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {filteredList.length === 0 && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              장착된 아이템이 없습니다.
            </div>
          )}
        </div>
      </section>

      {/* 펫/날개 섹션 */}
      {(characterEquipment?.petwing?.pet || characterEquipment?.petwing?.wing) && (
        <section className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="font-hyeon text-lg">펫 / 날개</span>
          </div>

          <div className="flex flex-col gap-2">
            {/* 펫 정보 */}
            {characterEquipment.petwing.pet && (
              <div className="flex items-center gap-3 p-2 hover:bg-accent/50 transition-colors border-b border-border/40">
                <div className="relative w-10 h-10 flex-shrink-0 bg-black/20 rounded border border-border overflow-hidden">
                  <img
                    src={characterEquipment.petwing.pet.icon}
                    alt={characterEquipment.petwing.pet.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm font-medium">
                  {characterEquipment.petwing.pet.name} Lv{' '}
                  {characterEquipment.petwing.pet.level}
                </span>
              </div>
            )}

            {/* 날개 정보 */}
            {characterEquipment.petwing.wing && (
              <div className="flex items-center gap-3 p-2 hover:bg-accent/50 transition-colors border-b border-border/40 last:border-0">
                <div className="relative w-10 h-10 flex-shrink-0 bg-black/20 rounded border border-border overflow-hidden">
                  <img
                    src={characterEquipment.petwing.wing.icon}
                    alt={characterEquipment.petwing.wing.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {characterEquipment.petwing.wing.enchantLevel > 0 && (
                    <span className="text-sm font-bold">
                      +{characterEquipment.petwing.wing.enchantLevel}
                    </span>
                  )}
                  <span
                    className={`text-sm font-medium ${getGradeColor(characterEquipment.petwing.wing.grade)}`}
                  >
                    {characterEquipment.petwing.wing.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 아르카나 섹션 */}
      {arcanaList.length > 0 && (
        <section className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="font-hyeon text-lg">아르카나</span>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-5 gap-3">
            {arcanaList.map((arcana: EquipmentItem) => (
              <ArcanaCard
                key={arcana.id}
                arcanaItem={arcana}
                characterId={characterInfo.profile.characterId}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
