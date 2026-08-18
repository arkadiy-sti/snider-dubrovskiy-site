import type { Coach } from "@/types/coach";

export const coaches: Coach[] = [
  {
    id: "stepan-dubrovskiy",
    name: "Stepan Dubrovskiy",
    role: "Head Coach",
    specialty: "Freestyle · Pairs · Triple Jumps",
    photo: "/images/coach-stepan.webp",
    photoAlt: "Stepan Dubrovskiy, professional figure skating coach, on the ice at Sharks Ice",
    bio: "Professional figure skating coach with 10 years of coaching experience. Junior Worlds and ISU Grand Prix competitor, Danish National Champion, and former professional skater with Royal Caribbean Cruise Lines.",
    background: [
      "Junior Worlds & ISU Grand Prix competitor",
      "Danish National Champion",
      "Former professional skater, Royal Caribbean Cruise Lines",
      "Degree in Pre-School Pedagogy and Psychology, Moscow State University for Humanity",
      "Figure skating coaching degree, Moscow Olympic Reserve College",
    ],
    specialties: [
      "Freestyle",
      "Pairs",
      "Triple Jumps",
      "Spins",
      "Off-Ice Training",
      "Choreography",
    ],
    languages: ["Russian", "English"],
    contact: {
      phone: "669-600-9202",
      email: "iceskater.rus@gmail.com",
    },
  },
  {
    id: "stephanie-snider",
    name: "Stephanie Snider",
    role: "Head Coach",
    specialty: "Skating Skills · Choreography · Moves in the Field",
    photo: "/images/coach-stephanie.webp",
    photoAlt: "Stephanie Snider, professional figure skating coach, on the ice at Sharks Ice",
    bio: "Coaching figure skating since 2013, trained by Olympic champions Sergei Ponomarenko and Marina Klimova. Two-time Danish National Champion and USFS gold medalist in Dance and Moves in the Field.",
    background: [
      "Trained by Olympic champions Sergei Ponomarenko & Marina Klimova",
      "Two-time Danish National Champion",
      "ISU Junior World Championships & Junior Grand Prix competitor",
      "Former professional skater, Royal Caribbean Cruise Lines",
      "USFS Gold Medalist, Dance and Moves in the Field",
    ],
    specialties: [
      "Skating Skills",
      "Choreography",
      "Moves in the Field",
      "Freestyle",
      "Off-Ice Conditioning",
    ],
    languages: ["English", "Russian", "Danish"],
    contact: {
      phone: "408-833-5570",
      email: "icedance.dk@gmail.com",
      instagram: "@beauty_stef",
    },
  },
];
