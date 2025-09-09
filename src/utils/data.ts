import {X,Instagram,Mail,Linkedin,Github,Link} from "lucide-react";
import type { SocialLink,ProjectLinks } from '../lib/types';
import IMG from '../assets/abst.jpg';
import IMG1 from '../assets/arrow.jpg';
import IMG2 from '../assets/code.jpg';
import IMG3 from '../assets/shield.jpg';
import IMG4 from '../assets/food.jpg';
import type { Article } from '../lib/types';

export const articles: Article[] = [
  {
    id: "ai-researcher",
    title: "AI Researcher",
    author: "Ada Dev",
    date: "2025-09-05",
    tags: ["react", "arrays", "ui"],
    coverImage: IMG,
    sections: [
      {
        heading: "Introduction",
        content: "We represent each article as a plain object and its body as an array of exactly four sections for predictable rendering and layout.",
        image: IMG,
      },
      {
        heading: "Techniques",
        content: "We represent each article as a plain object and its body as an array of exactly four sections for predictable rendering and layout.",
        image: IMG1,
      },
      {
        heading: "Curiosities",
        content: "We represent each article as a plain object and its body as an array of exactly four sections for predictable rendering and layout.",
        image: IMG2,
      },
    ],
  },
  {
    id: "numbing-persistence",
    title: "Numbing Persistence",
    author: "Ada Dev",
date: "2025-09-05",
tags: ["react", "arrays", "ui"],
    coverImage: IMG1,
    sections: [
      {
        heading: "Overview",
        content: "Persistence in ML research and overcoming challenges and its body as an array of exactly four sections for predictable rendering and layout.",
        image: IMG1,
      },
      {
        heading: "Methods",
        content: "Adaptive functions and uncertainty management.",
        image: IMG3,
      },
    ],
  },
  {
    id: "food-tech",
    title: "Food Technology",
    author: "Ada Dev",
date: "2025-09-05",
tags: ["react", "arrays", "ui"],
    coverImage: IMG4,
    sections: [
      {
        heading: "Innovation",
        content: "Applying AI in food processing and safety and its body as an array of exactly four sections for predictable rendering and layout.",
        image: IMG4,
      },
      {
        heading: "Signal Processing",
        content: "Using signal processing for quality control and its body as an array of exactly four sections for predictable rendering and layout.",
        image: IMG,
      },
    ],
  },
  {
    id: "food-tech",
    title: "Food Technology",
    author: "Ada Dev",
date: "2025-09-05",
tags: ["react", "arrays", "ui"],
    coverImage: IMG4,
    sections: [
      {
        heading: "Innovation",
        content: "Applying AI in food processing and safety and its body as an array of exactly four sections for predictable rendering and layout.",
        image: IMG4,
      },
      {
        heading: "Signal Processing",
        content: "Using signal processing for quality control and its body as an array of exactly four sections for predictable rendering and layout.",
        image: IMG,
      },
    ],
  },
  {
    id: "food-tech",
    title: "Food Technology",
    author: "Ada Dev",
date: "2025-09-05",
tags: ["react", "arrays", "ui"],
    coverImage: IMG4,
    sections: [
      {
        heading: "Innovation",
        content: "Applying AI in food processing and safety and its body as an array of exactly four sections for predictable rendering and layout.",
        image: IMG4,
      },
      {
        heading: "Signal Processing",
        content: "Using signal processing for quality control and its body as an array of exactly four sections for predictable rendering and layout.",
        image: IMG,
      },
    ],
  },
];

export const socialLinks: SocialLink[] = [
{ platform: X, href: "https://x.com/yourhandle" },
{ platform: Instagram, href: "https://instagram.com/yourhandle" },
{ platform: Mail, href: "https://facebook.com/yourpage" },
{ platform: Linkedin, href: "https://linkedin.com/in/yourprofile" },
{ platform: Github, href: "https://github.com/yourusername" },
];

export const detailsLinks: SocialLink[] = [
  { platform: Link, href: "https://link.com/yourhandle" },
  { platform: X, href: "https://x.com/yourhandle" },
  { platform: Mail, href: "https://facebook.com/yourpage" },

];

export const Project: ProjectLinks[] = [
  {
    title: 'SoulSwap',
    summary: 'A UniswapV2 fork on Fantom Opera with cross-chain swaps, lending, traditional SushiSwap MasterChef farms, staking and custom bonding farms that allow users to deposit LP tokens to start earning farm rewards, but when they want to harvest they need to forfeit their LP position to receive the rewards, resulting in protocol owned liquidity.',
    repo: 'https//www.loveisland.com'
  },
  {
    title: 'RopeSwap',
    summary: 'A UniswapV2 fork on Fantom Opera with cross-chain swaps, lending, traditional SushiSwap MasterChef farms, staking and custom bonding farms that allow users to deposit LP tokens to start earning farm rewards, but when they want to harvest they need to forfeit their LP position to receive the rewards, resulting in protocol owned liquidity.',
    repo: 'https//www.loveisland.com'
  },
  {
    title: 'ClassSwap',
    summary: 'A UniswapV2 fork on Fantom Opera with cross-chain swaps, lending, traditional SushiSwap MasterChef farms, staking and custom bonding farms that allow users to deposit LP tokens to start earning farm rewards, but when they want to harvest they need to forfeit their LP position to receive the rewards, resulting in protocol owned liquidity.',
    repo: 'https//www.loveisland.com'
  },
  {
    title: 'NiceSwap',
    summary: 'A UniswapV2 fork on Fantom Opera with cross-chain swaps, lending, traditional SushiSwap MasterChef farms, staking and custom bonding farms that allow users to deposit LP tokens to start earning farm rewards, but when they want to harvest they need to forfeit their LP position to receive the rewards, resulting in protocol owned liquidity.',
    repo: 'https//www.loveisland.com'
  },
  {
    title: 'BlankSwap',
    summary: 'A UniswapV2 fork on Fantom Opera with cross-chain swaps, lending, traditional SushiSwap MasterChef farms, staking and custom bonding farms that allow users to deposit LP tokens to start earning farm rewards, but when they want to harvest they need to forfeit their LP position to receive the rewards, resulting in protocol owned liquidity.',
    repo: 'https//www.loveisland.com'
  },
  {
    title: 'ClockSwap',
    summary: 'A UniswapV2 fork on Fantom Opera with cross-chain swaps, lending, traditional SushiSwap MasterChef farms, staking and custom bonding farms that allow users to deposit LP tokens to start earning farm rewards, but when they want to harvest they need to forfeit their LP position to receive the rewards, resulting in protocol owned liquidity.',
    repo: 'https//www.loveisland.com'
  }
];