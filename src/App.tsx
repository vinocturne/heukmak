import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import NotFound from './pages/NotFound'
import Index from './pages/Index'
import Members from './pages/Members'
import CharacterSearch from './pages/CharacterSearch'
import CharacterDetail from './pages/CharacterDetail'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/members"
              element={
                <Layout>
                  <Members />
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout>
                  <CharacterSearch />
                </Layout>
              }
            />
            <Route
              path="/character/:characterId"
              element={
                <Layout>
                  <CharacterDetail />
                </Layout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
