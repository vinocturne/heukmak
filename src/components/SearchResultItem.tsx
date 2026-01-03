import { Link } from 'react-router-dom'
import { Character, PROFILE_IMAGE_BASE_URL } from '@/api/character'
import { stripHtmlTags } from '@/lib/utils'

interface SearchResultItemProps {
  character: Character
}

export function SearchResultItem({ character }: SearchResultItemProps) {
  return (
    <Link
      to={`/character/${character.characterId}`}
      className="cursor-pointer p-6 rounded-lg border border-border bg-card hover:bg-gray-900 transition-colors flex flex-col items-center"
    >
      <img
        src={`${PROFILE_IMAGE_BASE_URL}${character.profileImageUrl}`}
        alt={stripHtmlTags(character.name)}
        className="w-32 h-32 rounded-full mb-4"
        onError={e => {
          e.currentTarget.src = 'https://via.placeholder.com/96'
        }}
      />
      <div className="text-center w-full">
        <h3 className="font-hyeon font-medium text-lg mb-1 truncate">
          {stripHtmlTags(character.name)}
        </h3>
        <p className="text-sm text-muted-foreground">Lv.{character.level}</p>
        <p className="text-sm text-muted-foreground">{character.serverName}</p>
      </div>
    </Link>
  )
}
