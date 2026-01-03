import { CharacterInfo, CharacterEquipment } from '@/api/character'
import { CharacterDetailLeft } from './CharacterDetailLeft'
import { CharacterDetailRight } from './CharacterDetailRight'

interface CharacterDetailLayoutProps {
  characterInfo: CharacterInfo
  characterEquipment: CharacterEquipment
}

export function CharacterDetailLayout({
  characterInfo,
  characterEquipment,
}: CharacterDetailLayoutProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {/* 1280px 미만에서는 오른쪽이 먼저 나오고, 1280px 이상에서는 왼쪽이 먼저 */}
      <div className="order-2 xl:order-1">
        <CharacterDetailLeft characterInfo={characterInfo} />
      </div>
      <div className="order-1 xl:order-2">
        <CharacterDetailRight
          characterInfo={characterInfo}
          characterEquipment={characterEquipment}
        />
      </div>
    </div>
  )
}
