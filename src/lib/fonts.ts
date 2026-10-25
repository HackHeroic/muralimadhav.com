import { Caveat } from "next/font/google";

// Handwritten margin notes in the About section
export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-hand",
});
