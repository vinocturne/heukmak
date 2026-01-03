import { CharacterInfo } from '@/api/character'

interface CharacterDetailLeftProps {
  characterInfo: CharacterInfo
}

export function CharacterDetailLeft({
  characterInfo,
}: CharacterDetailLeftProps) {
  return (
    <div className="bg-card p-4 rounded-lg border border-border">
      <h3 className="font-hyeon text-xl mb-4">왼쪽 컨텐츠</h3>
      {/* 여기에 왼쪽 내용 추가 */}
      <p className="text-muted-foreground">왼쪽 영역입니다.</p>
    </div>
  )
}
