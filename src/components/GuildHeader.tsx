interface GuildHeaderProps {
  title: string
}

export function GuildHeader({ title }: GuildHeaderProps) {
  return (
    <header className="relative overflow-hidden">
      {/* Background effects */}
      {/* <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(187_100%_50%/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(270_70%_60%/0.08),transparent_50%)]" /> */}

      {/* Grid pattern overlay */}
      {/* <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      /> */}

      <div
        className="relative mx-auto w-full py-6"
        style={{ maxWidth: '1400px', padding: '0 1rem' }}
      >
        {/* Guild name */}
        <div className="py-6 text-center animate-fade-in">
          <h1 className="font-hyeon font-medium text-4xl md:text-5xl text-foreground tracking-wider">
            {title}
          </h1>
        </div>
      </div>
    </header>
  )
}
