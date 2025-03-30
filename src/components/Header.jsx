// export default function Header() {
//     return (
//       <div className="carousel w-full">
//       <div id="slide1" className="carousel-item relative w-full">
//         <img
//           src="\src\images\Assassin_s_Creed_Shadows.webp"
//           className="w-full" />
//         <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
//           <a href="#slide4" className="btn btn-circle">❮</a>
//           <a href="#slide2" className="btn btn-circle">❯</a>
//         </div>
//       </div>
//       <div id="slide2" className="carousel-item relative w-full">
//         <img
//           src="\src\images\Split_Fiction.webp"
//           className="w-full" />
//         <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
//           <a href="#slide1" className="btn btn-circle">❮</a>
//           <a href="#slide3" className="btn btn-circle">❯</a>
//         </div>
//       </div>
//       <div id="slide3" className="carousel-item relative w-full">
//         <img
//           src="\src\images\Witcher_four.webp"
//           className="w-full" />
//         <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
//           <a href="#slide2" className="btn btn-circle">❮</a>
//           <a href="#slide4" className="btn btn-circle">❯</a>
//         </div>
//       </div>
//       <div id="slide4" className="carousel-item relative w-full">
//         <img
//           src="\src\images\inzoi-pc-gioco-steam-cover.webp"
//           className="w-full" />
//         <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
//           <a href="#slide3" className="btn btn-circle">❮</a>
//           <a href="#slide1" className="btn btn-circle">❯</a>
//         </div>
//       </div>
//     </div>
//     );
// }

export default function Header() {
  return (
    <div className="relative"> {/* Contenitore relativo per gestire il layering */}
      {/* Carousel */}
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="\src\images\Assassin_s_Creed_Shadows.webp"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="\src\images\Split_Fiction.webp"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="\src\images\Witcher_four.webp"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="\src\images\inzoi-pc-gioco-steam-cover.webp"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>

      {/* Sidebar (Drawer) */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Il contenuto principale della pagina */}
        </div>
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
