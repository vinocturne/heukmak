import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GuildHeader } from '@/components/GuildHeader'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Search, Users } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <GuildHeader title="흑막 전투 자료실" />

      {/* Navigation Menu */}
      <div className="border-b border-border/50 sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div
          className="mx-auto w-full py-3"
          style={{ maxWidth: '1400px', padding: '0.75rem 1rem' }}
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/members">
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    style={{
                      backgroundColor:
                        location.pathname === '/members'
                          ? 'hsl(var(--accent))'
                          : undefined,
                    }}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    길드원 정보
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/search">
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    style={{
                      backgroundColor:
                        location.pathname === '/search' ||
                        location.pathname.startsWith('/character/')
                          ? 'hsl(var(--accent))'
                          : undefined,
                    }}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    캐릭터 검색
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto w-full p-3" style={{ maxWidth: '1400px' }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div
          className="mx-auto w-full text-center text-sm text-muted-foreground"
          style={{ maxWidth: '1400px' }}
        >
          <p>© 2026 흑막 전투 자료실. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
