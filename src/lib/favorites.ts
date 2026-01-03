export interface FavoriteCharacter {
  characterId: string
  name: string
  level: number
  serverName: string
  profileImage: string
}

const FAVORITES_KEY = 'favorite_characters'

export function getFavorites(): FavoriteCharacter[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Failed to get favorites:', error)
    return []
  }
}

export function addFavorite(character: FavoriteCharacter): void {
  try {
    const favorites = getFavorites()
    const exists = favorites.some(
      fav => fav.characterId === character.characterId
    )
    if (!exists) {
      favorites.push(character)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  } catch (error) {
    console.error('Failed to add favorite:', error)
  }
}

export function removeFavorite(characterId: string): void {
  try {
    const favorites = getFavorites()
    const filtered = favorites.filter(fav => fav.characterId !== characterId)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Failed to remove favorite:', error)
  }
}

export function isFavorite(characterId: string): boolean {
  const favorites = getFavorites()
  return favorites.some(fav => fav.characterId === characterId)
}
