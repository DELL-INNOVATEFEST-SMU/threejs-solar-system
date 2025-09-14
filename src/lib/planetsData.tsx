// Sun has radius of 1 and position of 0,0,0
import { PlanetData } from "../../types";
import { Vector3 } from "three";

const baseOrbitSpeed = 1;

const planetsData: PlanetData[] = [
  {
    id: 1,
    name: "Mercury",
    texturePath: "/images/bodies/mercury_2k.webp",
    position: new Vector3(1.5, 0, 0),
    radius: 0.1,
    rotationSpeed: 1,
    tilt: 0.00017,
    orbitSpeed: baseOrbitSpeed / 0.24,
    displayDescription: {
      classification: "Terrestrial planet",
      description:
        "Swift on my feet and never still. I dance closest to the Sun, racing through the heavens in just 88 days. My moods swing from blazing heat to icy chill, but that only makes me lively, quick, and full of motion. I bring messages, speed, and the spark of curiosity.",
    },
    moons: [],
  },
  {
    id: 2,
    name: "Venus",
    texturePath: "/images/bodies/venus_surface_2k.webp",
    position: new Vector3(2.2, 0, 0),
    radius: 0.15,
    rotationSpeed: 1,
    tilt: 3.09639,
    orbitSpeed: baseOrbitSpeed / 0.62,
    displayDescription: {
      classification: "Terrestrial planet",
      description:
        "Cloaked in golden clouds and shining as the brightest jewel in the night. My heat is fierce, yes, but it is the warmth of love, beauty, and desire. I embody passion, devotion, and the fire that stirs both art and heart. Approach me, and you'll feel intensity—sometimes too much, but always unforgettable.",
    },
    moons: [],
  },
  {
    id: 3,
    name: "Earth",
    texturePath: "/images/bodies/earth_2k.webp",
    position: new Vector3(3, 0, 0),
    radius: 0.15,
    rotationSpeed: 1,
    tilt: 0.40928,
    orbitSpeed: 0.6,
    displayDescription: {
      classification: "Terrestrial planet",
      description:
        "The cradle of life. I hold oceans, forests, mountains, and skies where countless beings flourish. I am balance—gentle rains and fierce storms, day and night, growth and rest. I am home, nurturing and abundant, breathing life into all who dwell upon me.",
    },
    moons: [],
  },
  {
    id: 4,
    name: "Mars",
    texturePath: "/images/bodies/mars_2k.webp",
    position: new Vector3(4, 0, 0),
    radius: 0.13,
    rotationSpeed: 0.5,
    tilt: 0.43965,
    orbitSpeed: baseOrbitSpeed / 1.88,
    displayDescription: {
      classification: "Terrestrial planet",
      description:
        "Painted red with iron and fire. My deserts are cold and lonely, but within me burns a spirit of courage and persistence. I am the warrior, the adventurer, daring you to strive, to fight, and to keep going even when the odds are harsh. I carry both solitude and the spark of ambition",
    },
    moons: [],
  },
  {
    id: 5,
    name: "Jupiter",
    texturePath: "/images/bodies/jupiter_2k.webp",
    position: new Vector3(6, 0, 0),
    radius: 0.25,
    rotationSpeed: 0.2,
    tilt: 0.05463,
    orbitSpeed: baseOrbitSpeed / 11.86,
    displayDescription: {
      classification: "Gas giant",
      description:
        "Vast and mighty, king of the giants. My storms roar, but I shelter my many moons under my great embrace. I am abundance, generosity, and strength—the protector who watches over the smaller ones. My presence is a reminder of confidence and the grandeur of possibility.",
    },
    moons: [],
  },
  {
    id: 6,
    name: "Saturn",
    texturePath: "/images/bodies/saturn_2k.webp",
    position: new Vector3(9, 0, 0),
    radius: 0.2,
    rotationSpeed: 0.1,
    tilt: 0.46653,
    orbitSpeed: baseOrbitSpeed / 29.46,
    rings: {
      texturePath: "/images/bodies/saturn_ring.webp",
      size: [0.2, 0.46],
    },
    displayDescription: {
      classification: "Gas giant",
      description:
        "Adorned with rings of ice and grace. I turn slowly, steadily, teaching patience and discipline. My beauty lies in order, in cycles, in boundaries that give shape to chaos. I remind you of structure, wisdom, and the quiet dignity that comes from lasting endurance.",
    },
    moons: [],
  },
  {
    id: 7,
    name: "Uranus",
    texturePath: "/images/bodies/uranus_2k.webp",
    position: new Vector3(13, 0, 0),
    radius: 0.18,
    rotationSpeed: 0.07,
    tilt: 1.70622,
    orbitSpeed: baseOrbitSpeed / 84.01,
    displayDescription: {
      classification: "Ice giant",
      description:
        "Tilted and unusual, spinning in my own way. I am the spark of invention, the joy of thinking differently, the freedom to be eccentric. My chill is not coldness, but clarity—a calm detachment that allows new ideas to bloom. I am originality, the daring to rebel and to create anew",
    },
    moons: [],
  },
  {
    id: 8,
    name: "Neptune",
    texturePath: "/images/bodies/neptune_2k.webp",
    position: new Vector3(17, 0, 0),
    radius: 0.18,
    rotationSpeed: 0.06,
    tilt: 0.49428,
    orbitSpeed: baseOrbitSpeed / 164.8,
    displayDescription: {
      classification: "Ice giant",
      description:
        "Draped in deep blue, whispering secrets from the edge of the solar seas. My winds howl, but my soul is serene, filled with dreams, music, and imagination. I am mystery, intuition, and the endless pull of wonder. I remind you to dream, to seek beyond the horizon, and to lose yourself in the beauty of the unknown.",
    },
    moons: [],
  },
];

export default planetsData;
