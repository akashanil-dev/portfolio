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
    name: "Tuxplore",
    url: "https://tuxplore.akashanil.dev",
    tagline: "Learn Linux by playing in your browser.",
    blurb:
      "Boots a pretend Linux machine called TuxOS right in the tab. Ten terminal quests, plus KDE, GNOME, CDE and Hyprland to poke around in — no install, and no way to break your actual laptop.",
    tags: ["linux", "browser", "game"],
  },
  {
    name: "Faber",
    url: "https://faber.akashanil.dev",
    tagline: "Speaking practice for college classrooms.",
    blurb:
      "Runs timed speaking rounds in class: a lottery picks who's up, a projector screen counts down, faculty score on the spot. A game show for public speaking, minus the prize money.",
    tags: ["web app", "education"],
  },
];
