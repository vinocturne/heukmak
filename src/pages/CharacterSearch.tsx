import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SearchResultItem } from '@/components/SearchResultItem'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2, ArrowUp, Star } from 'lucide-react'
import { searchCharacter, Character } from '@/api/character'
import { useDebounce } from '@/hooks/use-debounce'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FavoriteCard } from '@/components/FavoriteCard'
import { getFavorites, FavoriteCharacter } from '@/lib/favorites'

export default function CharacterSearch() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [allResults, setAllResults] = useState<Character[]>([])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [favorites, setFavorites] = useState<FavoriteCharacter[]>([])
  const [accordionValue, setAccordionValue] = useState<string>('')
  const debouncedKeyword = useDebounce(searchKeyword, 1000)

  useEffect(() => {
    const loadedFavorites = getFavorites()
    setFavorites(loadedFavorites)
    if (loadedFavorites.length > 0) {
      setAccordionValue('favorites')
    }
  }, [])

  // 페이지가 포커스될 때마다 즐겨찾기 다시 로드
  useEffect(() => {
    const handleFocus = () => {
      const loadedFavorites = getFavorites()
      setFavorites(loadedFavorites)
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['character-search', debouncedKeyword, currentPage],
    queryFn: () =>
      searchCharacter({ keyword: debouncedKeyword, page: currentPage }),
    enabled: debouncedKeyword.length > 0,
  })

  // 검색어가 바뀌면 결과 초기화
  useEffect(() => {
    setAllResults([])
    setCurrentPage(1)
  }, [debouncedKeyword])

  // 새로운 페이지 데이터가 로드되면 결과에 추가
  const updateSearchResults = () => {
    if (searchResults?.list) {
      setAllResults(prev => {
        if (currentPage === 1) {
          return searchResults.list
        }
        return [...prev, ...searchResults.list]
      })
    }
  }

  useEffect(() => {
    updateSearchResults()
  }, [searchResults, currentPage])

  // 스크롤 위치 추적
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const hasMorePages =
    searchResults &&
    searchResults.pagination.page < searchResults.pagination.endPage

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Search className="w-5 h-5 text-primary" />
        <h2 className="font-sans text-xl md:text-2xl text-foreground">
          캐릭터 검색
        </h2>
      </div>
      <div className="max-w-md">
        <Input
          type="text"
          placeholder="캐릭터 이름을 입력하세요..."
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="mt-4">
          <Accordion
            type="single"
            collapsible
            value={accordionValue}
            onValueChange={setAccordionValue}
          >
            <AccordionItem value="favorites" className="border-border">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-sans text-lg">
                    즐겨찾기 ({favorites.length})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
                  {favorites.map(character => (
                    <FavoriteCard
                      key={character.characterId}
                      character={character}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {/* Search Results */}
      {isLoading && debouncedKeyword && (
        <div className="mt-4 text-muted-foreground">검색 중...</div>
      )}

      {allResults.length > 0 && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            총 {searchResults?.pagination.total}개의 결과
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allResults.map(character => (
              <SearchResultItem
                key={character.characterId}
                character={character}
              />
            ))}
          </div>

          {hasMorePages && (
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                variant="outline"
                className="cursor-pointer min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    로딩 중...
                  </>
                ) : (
                  '더 불러오기'
                )}
              </Button>
            </div>
          )}
        </div>
      )}

      {searchResults && searchResults.list.length === 0 && (
        <div className="mt-4 text-muted-foreground">검색 결과가 없습니다.</div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg cursor-pointer"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
