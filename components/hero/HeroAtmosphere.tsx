const flashes = [
  { top: "9%", left: "14%", size: 110, delay: "0s", duration: "6.8s" },
  { top: "6%", left: "46%", size: 70, delay: "2.6s", duration: "5.4s" },
  { top: "15%", left: "80%", size: 90, delay: "1.1s", duration: "7.6s" },
  { top: "22%", left: "30%", size: 55, delay: "4.2s", duration: "8.4s" },
  { top: "11%", left: "64%", size: 60, delay: "5.5s", duration: "6.1s" },
  { top: "26%", left: "92%", size: 65, delay: "3.4s", duration: "7.1s" },
  { top: "18%", left: "6%", size: 50, delay: "6.3s", duration: "9.2s" },
];

export function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {flashes.map((f, i) => (
        <span
          key={i}
          className="camera-flash absolute rounded-full"
          style={{
            top: f.top,
            left: f.left,
            width: f.size,
            height: f.size,
            animationDelay: f.delay,
            animationDuration: f.duration,
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 hidden h-[42%] overflow-hidden md:block">
        <div className="ice-streak ice-streak-a" />
        <div className="ice-streak ice-streak-b" />
        <div className="ice-streak ice-streak-c" />
      </div>
    </div>
  );
}
