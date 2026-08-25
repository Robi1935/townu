"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    school: "University of Alabama",
    short: "UA",
    subtitle: "Marketplace, services, deals and student life around campus.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/University%20of%20Alabama%20Campus%2001.jpg?width=1600",
    accent: "#9E1B32",
    credit: "Campus photo via Wikimedia Commons",
  },
  {
    school: "Stillman College",
    short: "Stillman",
    subtitle: "Local connections, student hustles and services built around your community.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Stillman%20College.jpg?width=1600",
    accent: "#06255B",
    credit: "Campus photo via Wikimedia Commons",
  },
  {
    school: "Shelton State Community College",
    short: "Shelton State",
    subtitle: "Find what you need, make money and connect with Tuscaloosa-area services.",
    image: "https://www.sheltonstate.edu/wp-content/uploads/2022/09/Fredd-front-view-1024x683.jpg",
    accent: "#0B6B3A",
    credit: "Temporary test image from Shelton State website",
  },
];

export function CampusCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-sm">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url("${slide.image}")` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/25" />
      <div className="relative z-10 min-h-[360px] p-7 md:min-h-[430px] md:p-11">
        <div
          className="inline-flex rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white"
          style={{ backgroundColor: slide.accent }}
        >
          {slide.short} on TownU
        </div>
        <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight md:text-6xl">
          Your college town. All in one place.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200 md:text-base">
          {slide.subtitle}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/sign-up" className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950">
            Join TownU
          </Link>
          <Link href="/explore" className="rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur">
            Explore Tuscaloosa
          </Link>
        </div>
        <p className="absolute bottom-5 left-7 text-[10px] text-white/65 md:left-11">{slide.credit}</p>
      </div>

      <div className="absolute bottom-5 right-6 z-20 flex gap-2 md:right-10">
        {slides.map((item, itemIndex) => (
          <button
            key={item.school}
            type="button"
            aria-label={`Show ${item.school}`}
            onClick={() => setIndex(itemIndex)}
            className={`h-2.5 rounded-full transition-all ${itemIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/45"}`}
          />
        ))}
      </div>
    </section>
  );
}
