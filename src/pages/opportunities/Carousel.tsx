import type { CarouselApi } from '@/components/ui/carousel';
import { Carousel as ShadcnCarousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import banner01 from '@/assets/img/opportunites_banner_1.png';
import banner02 from '@/assets/img/opportunites_banner_2.png';
import { useEffect, useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

const OpportunitiesCarousel = () => {
  const items = [banner01, banner02];
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <ShadcnCarousel
      setApi={setApi}
      className="relative mb-5 overflow-hidden rounded-md"
      opts={{ loop: true }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <div className="absolute right-5 top-1/2 z-10 flex -translate-y-1/2 flex-col justify-center gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <span
            key={index}
            className={cn('h-4 w-4 cursor-pointer rounded border-2 border-background bg-transparent', {
              'bg-background': index === current - 1
            })}
            onClick={() => {
              api?.scrollTo(index);
            }}
          />
        ))}
      </div>

      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="flex h-56 justify-center">
            <img src={item} className="h-full w-full object-cover object-center" alt="carousel image" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </ShadcnCarousel>
  );
};

export default OpportunitiesCarousel;
