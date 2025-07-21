'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Image from 'next/image';

type Direction = 'left' | 'right';
type Speed = 'fast' | 'normal' | 'slow';

interface InfiniteMovingCardsProps {
  items: {
    quote: string;
    name: string;
    title: string;
    image: string;
    rating: number;
  }[];
  direction?: Direction;
  speed?: Speed;
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false); // client-only rendering

  // Ensure client-only setup for animation (avoid DOM mismatch)
  useEffect(() => {
    setIsClient(true); // confirm we're on the client
    if (containerRef.current) {
      const duration =
        speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s';
      const animationDirection = direction === 'left' ? 'forwards' : 'reverse';

      containerRef.current.style.setProperty('--animation-duration', duration);
      containerRef.current.style.setProperty('--animation-direction', animationDirection);
    }
  }, [direction, speed]);

  // Clone items for infinite scroll — this is stable
  const duplicatedItems = [...items, ...items];

  if (!isClient) return null; // prevent server-side mismatch

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 w-screen overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        className={cn(
          'flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {duplicatedItems.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`} // more stable key
            className="w-[90vw] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-800 p-5 md:p-16 md:w-[60vw]"
            style={{
              background: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
            }}
          >
            <div className="relative z-20 text-sm md:text-lg leading-[1.6] text-white font-normal">
              {item.quote}
            </div>
            <div className="relative z-20 mt-6 flex flex-row items-center">
              <div className="me-3">
                <Image
                  src={item.image || '/images/fallback.jpg'}
                  alt={`${item.name}'s profile`}
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src = '/images/fallback.jpg')
                  }
                />
              </div>
              <div className="flex flex-col mt-10 sm:mt-5 gap-1">
                <div className="text-xl font-bold leading-[1.6] text-white">
                  {item.name}
                </div>
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < (item.rating || 0) ? (
                      <FaStar key={i} />
                    ) : (
                      <FaRegStar key={i} />
                    )
                  )}
                </div>
                <div className="text-sm leading-[1.6] text-gray-400 font-normal">
                  {item.title}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};



