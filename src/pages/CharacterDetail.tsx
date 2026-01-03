import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  getCharacterInfo,
  getCharacterEquipment,
  getClassInfo,
} from '@/api/character'
import { Loader2, Star, ArrowLeft } from 'lucide-react'
import { stripHtmlTags } from '@/lib/utils'
import { CharacterDetailLayout } from '@/components/CharacterDetailLayout'
import { useMemo, useState, useEffect } from 'react'
import { Toggle } from '@/components/ui/toggle'
import { Button } from '@/components/ui/button'
import {
  addFavorite,
  removeFavorite,
  isFavorite,
  FavoriteCharacter,
} from '@/lib/favorites'

export default function CharacterDetail() {
  const { characterId } = useParams<{ characterId: string }>()
  const navigate = useNavigate()
  const [isFavorited, setIsFavorited] = useState(false)

  const {
    data: characterInfo,
    isLoading: isInfoLoading,
    error: infoError,
  } = useQuery({
    queryKey: ['character-info', characterId],
    queryFn: () => getCharacterInfo({ characterId: characterId! }),
    enabled: !!characterId,
  })

  useEffect(() => {
    if (characterId) {
      setIsFavorited(isFavorite(characterId))
    }
  }, [characterId])

  const {
    data: classesInfo,
    isLoading: isClassesInfoLoading,
    error: classesInfoError,
  } = useQuery({
    queryKey: ['classes-info'],
    queryFn: () => getClassInfo(),
  })

  const {
    data: characterEquipment,
    isLoading: isEquipmentLoading,
    error: equipmentError,
  } = useQuery({
    queryKey: ['character-equipment', characterId],
    queryFn: () => getCharacterEquipment({ characterId: characterId! }),
    enabled: !!characterId,
  })

  const characterClass = useMemo(() => {
    if (!characterInfo?.profile?.className) return null

    // 프로필의 className(예: "치유성")과 리스트의 text를 비교
    const matched = classesInfo?.classList.find(
      c => c.text === characterInfo.profile.className
    )

    // 매칭된게 있다면 소문자로 변환하여 반환
    return matched ? matched.name.toLowerCase() : null
  }, [characterInfo])

  const isLoading = isInfoLoading || isEquipmentLoading || isClassesInfoLoading
  const error = infoError || equipmentError || classesInfoError

  const handleToggleFavorite = () => {
    if (!characterInfo || !characterId) return

    if (isFavorited) {
      removeFavorite(characterId)
      setIsFavorited(false)
    } else {
      const favoriteData: FavoriteCharacter = {
        characterId: characterId,
        name: characterInfo.profile.characterName,
        level: characterInfo.profile.characterLevel,
        serverName: characterInfo.profile.serverName,
        profileImage: characterInfo.profile.profileImage,
      }
      addFavorite(favoriteData)
      setIsFavorited(true)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-muted-foreground py-8">
        캐릭터 정보를 불러오는데 실패했습니다.
      </div>
    )
  }

  if (!characterInfo || !characterEquipment) {
    return (
      <div className="text-center text-muted-foreground py-8">
        캐릭터 정보를 찾을 수 없습니다.
      </div>
    )
  }

  console.log(classesInfo)

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-hyeon text-2xl">캐릭터 상세 정보</h2>
      </div>
      <div className="bg-card p-4 rounded-lg border border-border overflow-auto flex flex-col">
        <div className="flex flex-col items-center">
          {/* 프로필 이미지 영역에 클래스 아이콘 추가 */}
          <div className="relative mb-4">
            <img
              src={`${characterInfo.profile.profileImage}`}
              alt={stripHtmlTags(characterInfo.profile.characterName)}
              className="w-50 h-50 rounded-full border-4 border-border aspect-square object-cover"
              onError={e => {
                e.currentTarget.src = 'https://via.placeholder.com/160'
              }}
            />

            {/* 클래스 아이콘: 프로필 이미지 우측 하단에 배치 */}
            {characterClass && (
              <div className="absolute bottom-0 right-0 bg-gray-900 rounded-full p-1 border-2 border-border flex items-center justify-center">
                <img
                  src={`https://assets.playnccdn.com/static-aion2/characters/img/class/class_icon_${characterClass}.png`}
                  alt={characterInfo.profile.className}
                  className="w-14 h-14"
                  title={characterInfo.profile.className}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>
          <span className="text-3xl font-hyeon">
            {characterInfo.profile.characterName}
          </span>
          <div className="flex gap-1 text-[14px]">
            {characterInfo.profile.serverName}
            <span>|</span>
            {characterInfo.profile.raceName}
            <span>|</span>
            {characterInfo.profile.regionName}
            <span>|</span>
            {characterInfo.profile.className}
          </div>
          <div className="mt-2 text-2xl">
            <span className="text-[18px]">아이템 Lv. </span>
            <span className="font-bold">
              {characterInfo.stat.statList[16].value.toLocaleString('ko-KR')}
            </span>
          </div>
          {/* 토글 부분 */}
          <div className="mt-4">
            <Toggle
              pressed={isFavorited}
              onPressedChange={handleToggleFavorite}
              aria-label="즐겨찾기 토글"
              className="data-[state=on]:bg-yellow-500 data-[state=on]:text-white"
            >
              <Star
                className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`}
              />
              <span className="ml-2">
                {isFavorited ? '즐겨찾기 해제' : '즐겨찾기 추가'}
              </span>
            </Toggle>
          </div>
        </div>
        {/* 상세 내용 */}
        <section className="mt-10">
          <CharacterDetailLayout
            characterInfo={characterInfo}
            characterEquipment={characterEquipment}
          />
        </section>
      </div>
    </div>
  )
}
