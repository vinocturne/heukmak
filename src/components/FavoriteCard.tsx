import { useNavigate } from 'react-router-dom'
import { FavoriteCharacter } from '@/lib/favorites'
import { stripHtmlTags } from '@/lib/utils'

interface FavoriteCardProps {
  character: FavoriteCharacter
}

export function FavoriteCard({ character }: FavoriteCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/character/${character.characterId}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-card rounded-lg border border-border p-3 hover:bg-gray-900 transition-colors cursor-pointer flex items-center gap-5"
    >
      <img
        src={character.profileImage}
        alt={stripHtmlTags(character.name)}
        className="w-16 h-16 rounded-full border-2 border-border object-cover"
        onError={e => {
          e.currentTarget.src = 'https://via.placeholder.com/64'
        }}
      />
      <div className="flex flex-col w-full">
        <span className="text-left font-medium text-sm truncate">
          {character.name}
        </span>
        <span className="text-left text-xs text-muted-foreground">
          Lv. {character.level}
        </span>
        <span className="text-left text-xs text-muted-foreground truncate">
          {character.serverName}
        </span>
      </div>
    </div>
  )
}
