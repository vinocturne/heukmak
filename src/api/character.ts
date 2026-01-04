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

export interface SubSkill {
  id: number
  level: number
  icon: string
  name: string
}

export interface MainStat {
  id: string
  name: string
  value: string
  extra: string
  exceed: boolean
}

export interface SetItem {
  id: number
  name: string
  grade: string
  equipped?: boolean
  children?: SetItem[]
}

export interface SetBonus {
  degree: number
  descriptions: string[]
}

export interface ArcanaSet {
  id: string
  name: string
  equippedCount: number
  items: SetItem[]
  bonuses: SetBonus[]
}

export interface ArcanaItemDetail {
  id: number
  name: string
  grade: string
  gradeName: string
  icon: string
  level: number
  levelValue: number
  enchantLevel: number
  storable: boolean
  tradable: boolean
  tradablePersonal: boolean
  enchantable: boolean
  decomposable: boolean
  maxEnchantLevel: number
  categoryName: string
  type: string
  equipLevel: number
  subStatCount: number
  subSkillCountMax: number
  subStatRandom: boolean
  mainStats: MainStat[]
  soulBindRate: string
  subSkills: SubSkill[]
  set: ArcanaSet
  favorite: boolean
}

export interface ArcanaItemParams {
  id: number
  enchantLevel: number
  characterId: string
  slotPos: number
}

export interface StatSummaryItem {
  id: string
  name: string
  totalValue: number
  totalExtra: number
}

export interface SkillSummaryItem {
  skillId: number
  skillName: string
  totalLevel: number
  category: string
  iconUrl: string
}

export interface StatsSummaryResponse {
  data: {
    characterId: string
    characterName: string
    className: string
    serverId: number
    totalStats: {
      stats: StatSummaryItem[]
    }
    mainStats: {
      stats: StatSummaryItem[]
    }
    subStats: {
      stats: StatSummaryItem[]
    }
    magicStones: {
      stats: StatSummaryItem[]
    }
    skills: {
      skills: SkillSummaryItem[]
    }
  }
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

const STATS_SUMMARY_BASE_URL =
  import.meta.env.MODE === 'development'
    ? '/api/v1/aion2'
    : 'https://api.aon2.info/api/v1/aion2'

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

export async function getArcanaItemDetail(
  params: ArcanaItemParams
): Promise<ArcanaItemDetail> {
  const { id, enchantLevel, characterId, slotPos } = params

  const url = new URL(
    `${CHARACTER_INFO_BASE_URL}/equipment/item`,
    import.meta.env.MODE === 'development' ? window.location.origin : undefined
  )
  url.searchParams.append('id', id.toString())
  url.searchParams.append('enchantLevel', enchantLevel.toString())
  url.searchParams.append('characterId', characterId)
  url.searchParams.append('serverId', '2006')
  url.searchParams.append('slotPos', slotPos.toString())
  url.searchParams.append('lang', 'ko')

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch arcana item detail')
  }

  return response.json()
}

export async function getStatsSummary(
  characterId: string
): Promise<StatsSummaryResponse> {
  const url = `${STATS_SUMMARY_BASE_URL}/characters/${encodeURIComponent(characterId)}/stats-summary`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch stats summary')
  }

  return response.json()
}
