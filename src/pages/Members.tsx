import { Users } from 'lucide-react'

export default function Members() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <h2 className="font-sans text-xl md:text-2xl text-foreground">
          길드원 정보
        </h2>
      </div>
      <div className="text-center py-12 text-muted-foreground">
        <p>길드원 정보 기능은 준비 중입니다.</p>
      </div>
    </div>
  )
}
