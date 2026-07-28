import Link from 'next/link'
import Image from 'next/image'


export default function ShopByRoom() {
  
  const rooms = [
    {
      id: 1,
      name: 'Living Room',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop',
      count: 98,
    },
    {
      id: 2,
      name: 'Bedroom',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop',
      count: 76,
    },
    {
      id: 3,
      name: 'Dining',
      image: 'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=800&auto=format&fit=crop',
      count: 54,
    },
    {
      id: 4,
      name: 'Home Office',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop',
      count: 42,
    },
    {
      id: 5,
      name: 'Kids Room',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
      count: 31,
    },
  ]
  return (
    <section>
      {/* Mobile: Stacked vertical */}
      <div className="flex md:hidden flex-col gap-4">
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/store?room=${room.id}`}
            className="relative h-[200px] rounded-xl overflow-hidden group"
          >
            <Image
              src={room.image}
              alt={room.name}
              fill
              sizes="100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-lg font-medium text-white">{room.name}</p>
              <p className="text-xs text-white/70">{room.count} items</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: Complex grid */}
      <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 h-[380px]">
        {rooms.map((room, index) => (
          <Link
            key={room.id}
            href={`/store?room=${room.id}`}
            className={`relative rounded-xl overflow-hidden group ${
              index === 0 ? 'col-span-1 row-span-2' : ''
            }`}
          >
            <Image
              src={room.image}
              alt={room.name}
              fill
              sizes={index === 0 ? '33vw' : '22vw'}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-lg font-medium text-white">{room.name}</p>
              <p className="text-xs text-white/70">{room.count} items</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}