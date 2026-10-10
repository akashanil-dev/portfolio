// Projects shown on the homepage and /projects.
// Add a new object here and it shows up everywhere — newest first.

export interface Project {
  name: string;
  url: string;
  tagline: string;
  blurb: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "Faber",
    url: "https://faber.akashanil.dev",
    tagline: "Speaking practice for college classrooms.",
    blurb:
      "Runs timed speaking rounds in class: a lottery picks who's up, a projector screen counts down, faculty score on the spot. A game show for public speaking, minus the prize money.",
    tags: ["web app", "education"],
  },
];
