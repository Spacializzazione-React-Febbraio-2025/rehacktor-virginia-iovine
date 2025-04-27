import { useState, useEffect } from 'react';

export default function Header() {
  const [currentSlide, setCurrentSlide] = useState(1);

  // Funzione per gestire il cambiamento automatico delle slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev % 4) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="carousel w-full">
        <div
          id="slide1"
          className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}
        >
          <img src="\src\images\Assassin_s_Creed_Shadows.webp" className="w-full" />
        </div>
        <div
          id="slide2"
          className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}
        >
          <img src="\src\images\Split_Fiction.webp" className="w-full" />
        </div>
        <div
          id="slide3"
          className={`carousel-item relative w-full ${currentSlide === 3 ? 'block' : 'hidden'}`}
        >
          <img src="\src\images\Witcher_four.webp" className="w-full" />
        </div>
        <div
          id="slide4"
          className={`carousel-item relative w-full ${currentSlide === 4 ? 'block' : 'hidden'}`}
        >
          <img src="\src\images\inzoi-pc-gioco-steam-cover.webp" className="w-full" />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
            <li><a>Sidebar Item 3</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
