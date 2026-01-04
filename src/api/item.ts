export interface ItemDetailParams {
  id: number
  enchantLevel: number
  characterId: string
  slotPos: number
}

export interface StatItem {
  id: string
  name: string
  minValue?: string
  value: string
  extra?: string
  exceed?: boolean
}

export interface MagicStoneStat {
  id: string
  icon: string
  value: string
  name: string
  grade: string
  slotPos: number
}

export interface GodStoneStat {
  icon: string
  name: string
  desc: string
  grade: string
  slotPos: number
}

export interface ItemDetail {
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
  maxExceedEnchantLevel: number
  raceName: string
  classNames: string[]
  categoryName: string
  type: string
  equipLevel: number
  magicStoneSlotCount: number
  godStoneSlotCount: number
  costumes: string[]
  subStatCount: number
  subSkillCountMax: number
  subStatRandom: boolean
  mainStats: StatItem[]
  soulBindRate: string
  subStats: StatItem[]
  magicStoneStat: MagicStoneStat[]
  godStoneStat: GodStoneStat[]
  sources: string[]
}

const ITEM_API_BASE_URL = '/api/character/equipment'

export async function getItemDetail(
  params: ItemDetailParams
): Promise<ItemDetail> {
  const { id, enchantLevel, characterId, slotPos } = params

  const url = new URL(`${ITEM_API_BASE_URL}/item`, window.location.origin)
  url.searchParams.append('id', id.toString())
  url.searchParams.append('enchantLevel', enchantLevel.toString())
  url.searchParams.append('characterId', characterId)
  url.searchParams.append('serverId', '2006')
  url.searchParams.append('slotPos', slotPos.toString())
  url.searchParams.append('lang', 'ko')

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch item detail')
  }

  return response.json()
}
