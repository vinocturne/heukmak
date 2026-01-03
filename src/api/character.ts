export interface Character {
  characterId: string
  name: string
  race: number
  pcId: number
  level: number
  serverId: number
  serverName: string
  profileImageUrl: string
}

export interface CharacterSearchResponse {
  list: Character[]
  pagination: {
    page: number
    size: number
    total: number
    endPage: number
  }
}

export interface CharacterSearchParams {
  keyword: string
  serverId?: number
  page?: number
  size?: number
}

export interface CharacterInfoParams {
  characterId: string
}

export interface StatDescription {
  desc: string
}

export interface TitleItem {
  id: number
  equipCategory: string
  name: string
  grade: string
  totalCount: number
  ownedCount: number
  statList: StatDescription[]
  equipStatList: StatDescription[]
}

export interface TitleInfo {
  totalCount: number
  ownedCount: number
  titleList: TitleItem[]
}

export interface StatItem {
  type: string
  name: string
  value: number
  statSecondList: string[] | null
}

export interface StatInfo {
  statList: StatItem[]
}

export interface DaevanionBoard {
  id: number
  name: string
  totalNodeCount: number
  openNodeCount: number
  icon: string
  open: number
}

export interface DaevanionInfo {
  boardList: DaevanionBoard[]
}

export interface RankingItem {
  rankingContentsType: number
  rankingContentsName: string
  rankingType: number
  rank: number
  characterId: string | null
  characterName: string
  classId: number
  className: string
  guildName: string
  point: number
  prevRank: number
  rankChange: number
  gradeId: number
  gradeName: string
  gradeIcon: string
  profileImage: string | null
  extraDataMap: any | null
}

export interface RankingInfo {
  rankingList: RankingItem[]
}

export interface ProfileInfo {
  characterId: string
  characterName: string
  serverId: number
  serverName: string
  regionName: string
  pcId: number
  className: string
  raceId: number
  raceName: string
  gender: number
  genderName: string
  characterLevel: number
  titleId: number
  titleName: string
  titleGrade: string
  profileImage: string
}

export interface CharacterInfo {
  title: TitleInfo
  stat: StatInfo
  daevanion: DaevanionInfo
  ranking: RankingInfo
  profile: ProfileInfo
}

export interface CharacterEquipmentParams {
  characterId: string
}

export interface Pet {
  id: number
  name: string
  level: number
  icon: string
}

export interface Wing {
  id: number
  name: string
  enchantLevel: number
  grade: string
  icon: string
}

export interface PetWingInfo {
  pet: Pet
  wing: Wing
}

export interface EquipmentItem {
  id: number
  name: string | null
  enchantLevel: number
  exceedLevel: number
  grade: string | null
  slotPos: number
  slotPosName: string
  icon: string | null
}

export interface EquipmentInfo {
  equipmentList: EquipmentItem[]
  skinList: EquipmentItem[]
}

export interface SkillItem {
  id: number
  name: string
  needLevel: number
  skillLevel: number
  icon: string
  category: string
  acquired: number
  equip: number
}

export interface SkillInfo {
  skillList: SkillItem[]
}

export interface CharacterEquipment {
  petwing: PetWingInfo
  equipment: EquipmentInfo
  skill: SkillInfo
}

export interface ClassItem {
  id: number
  name: string
  text: string
}

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? '/api/search/aion2/search/v2'
    : import.meta.env.VITE_AION2_API_URL

const CHARACTER_INFO_BASE_URL =
  import.meta.env.MODE === 'development'
    ? '/api/character'
    : import.meta.env.VITE_AION2_CHARACTER_API_URL

const GAME_INFO_BASE_URL =
  import.meta.env.MODE === 'development'
    ? '/api/gameinfo'
    : import.meta.env.VITE_AION2_GAME_INFO_API_URL

export const PROFILE_IMAGE_BASE_URL = import.meta.env
  .VITE_AION2_PROFILE_IMAGE_URL

export async function searchCharacter(
  params: CharacterSearchParams
): Promise<CharacterSearchResponse> {
  const { keyword, serverId = 2006, page = 1, size = 30 } = params

  const url = new URL(
    `${API_BASE_URL}/character`,
    import.meta.env.MODE === 'development' ? window.location.origin : undefined
  )
  url.searchParams.append('keyword', keyword)
  url.searchParams.append('serverId', serverId.toString())
  url.searchParams.append('page', page.toString())
  url.searchParams.append('size', size.toString())

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch character data')
  }

  return response.json()
}

export async function getCharacterInfo(
  params: CharacterInfoParams
): Promise<CharacterInfo> {
  const { characterId } = params

  const url = new URL(
    `${CHARACTER_INFO_BASE_URL}/info`,
    import.meta.env.MODE === 'development' ? window.location.origin : undefined
  )
  url.searchParams.append('lang', 'ko')
  url.searchParams.append('characterId', characterId)
  url.searchParams.append('serverId', '2006')

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch character info')
  }

  return response.json()
}

export async function getClassInfo(): Promise<{ classList: ClassItem[] }> {
  const url = new URL(
    `${GAME_INFO_BASE_URL}/classes?lang=ko`,
    import.meta.env.MODE === 'development' ? window.location.origin : undefined
  )

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch character equipment')
  }

  return response.json()
}

export async function getCharacterEquipment(
  params: CharacterEquipmentParams
): Promise<CharacterEquipment> {
  const { characterId } = params

  const url = new URL(
    `${CHARACTER_INFO_BASE_URL}/equipment`,
    import.meta.env.MODE === 'development' ? window.location.origin : undefined
  )
  url.searchParams.append('lang', 'ko')
  url.searchParams.append('characterId', characterId)
  url.searchParams.append('serverId', '2006')

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch character equipment')
  }

  return response.json()
}
