import { Icons } from "@/components/icons";
import {
  BriefcaseIcon,
  HomeIcon,
  HammerIcon,
  NotebookIcon,
  AwardIcon,
  FileText,
} from "lucide-react";

type ProjectType = {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: string[];
  image?: string;
  video?: string;
  logo?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
};

type PublicationType = {
  title: string;
  href: string;
  authors: string[];
  venue: string;
  imageSrc?: string;
  contributionNote?: string;
  citation?: string;
  citationLink?: string;
  links?: readonly {
    icon?: React.ReactNode;
    title: string;
    href: string;
  }[];
};

type HackathonType = {
  title: string;
  project?: string;
  image?: string;
  dates?: string;
  location?: string;
  description?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
};

type AchievementType = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  logoUrl?: string;
  href?: string;
};

export const DATA = {
  name: "Murali ",
  initials: "MM",
  url: "https://muralimadhav.com",
  resumeUrl: "/C Murali Madhav Resume September 2026.pdf",
  location: "India",
  locationLink: "https://www.google.com/maps/place/india",
  description:
    "Building AI-powered solutions and scalable systems. I love to learn, create, and ship. AI Engineer intern offer from Sanas. 8th place globally at HackMIT 2026. First-author IEEE paper published at IEEE APPEEC 2026. Experienced in full-stack development, machine learning, and deep learning.",
  current:
    "AI Engineer intern offer @ Sanas | B.Tech CS & AI @ Newton School of Technology | Exploring AI, competitive programming, and building impactful projects.",
  summary1:
    "I build for systems that don’t forgive mistakes: power grids, warehouses, and my own calendar.",
  summary2:
    "Fourth-year CS & AI student, first in my cohort. Make of that what you will.\n\nTaught a neural network that electricity has to obey Kirchhoff’s laws. It refused. IEEE published us anyway.\n\nWrote the warehouse software for a Dubai startup in my second year, where I learned that most “AI problems” are a spreadsheet in a trench coat.\n\nSpent three weeks solving puzzles to get into a hackathon. Did it again the next year. 17th in the world, then 8th. Growth.\n\nThe rest is below. You have time — I checked.",
  // avatarUrl: "/professional.webp",
  avatarUrl: "/madhav-desert.jpeg",
  hackathons: [
    {
      title: "HackMIT 2026 (8th Place Globally 🏆)",
      dates: "2026",
      description:
        "Achieved 8th place globally in the HackMIT Puzzle Solver Contest 2026, improving on 17th place in 2025; invited to MIT, Cambridge, USA in October 2026.",
    },
    {
      title: "Google Big Code Challenge",
      dates: "2026",
      description:
        "Top 50 nationally in the Google Big Code Challenge; invited to the 48-hour Challenge Finale and awarded a Google Pixel device.",
    },
    {
      title: "HackMIT 2025 (17th Place Globally 🏆)",
      dates: "2025",
      location: "Cambridge, MA",
      description:
        "Achieved 17th place globally in the HackMIT Puzzle Solver Contest 2025 and runner-up in the Voloridge sponsorship challenge. Built a distributed log analyzer using parallel computing.",
    },
    {
      title: "IEEEXtreme 18.0 (2024)",
      dates: "2024",
      description:
        "Improved to a global rank of 775 and All-India rank of 224 in IEEE Hackathon.",
    },
    {
      title: "Meta Hacker Cup 2024",
      dates: "2024",
      description: "Secured rank 4553 in Meta Hacker Cup 2024.",
    },
    {
      title: "IEEEXtreme 17.0 (2023)",
      dates: "2023",
      description:
        "Achieved a global rank of 1305 and All-India rank of 446 in IEEE Hackathon.",
    },
  ] as HackathonType[],
  publications: [
    {
      title:
        "KAT-PatchTST: Physics-Informed Forecasting with Kirchhoff Conservation",
      href: "",
      authors: [
        "C. Murali Madhav",
        "R. Yadav",
        "K. Mehra",
        "A. Tewary",
        "S. Aggarwal",
      ],
      venue:
        "18th Asia-Pacific Power and Energy Engineering Conference (APPEEC), IEEE · Singapore, August 2026 · Published in IEEE Xplore",
      contributionNote:
        "First author · Stage 1 of the Watt-IF research project (Stages 2 & 3 in development, targeting ICLR) · Provisional patent filed",
    },
  ] as PublicationType[],
  achievements: [
    {
      title: "HackMIT 2026 — 8th Globally",
      issuer: "HackMIT",
      date: "2026",
      description:
        "Puzzle Solver Contest · invited to MIT, Cambridge in October 2026",
    },
    {
      title: "IEEE PES Energy Shark Tank 2026 — Top 5 & 3rd Place",
      issuer: "IEEE PES Young Professionals · APPEEC Singapore",
      date: "August 2026",
      description: "FlexGrid pitch · Certificate of Achievement",
    },
    {
      title: "University Topper — B.Tech (CS&AI)",
      issuer: "Newton School of Technology, Rishihood University",
      date: "2026",
      description: "Rank 1 in cohort as of third year",
    },
    {
      title: "Y Combinator Startup School India 2026",
      issuer: "Y Combinator",
      date: "2026",
      description: "Invite-only founder program, Bangalore",
    },
    {
      title: "1st Place — NST Startup Foundry 2026",
      issuer: "",
      date: "2026",
      description:
        "Jarvis, an AI Personal Intelligence System · pitched to Google Cloud & Microsoft for Startups",
    },
    {
      title: "Google Big Code Challenge — National Top 50",
      issuer: "Google",
      date: "2026",
      description: "48-hour Challenge Finale · awarded a Google Pixel",
    },
    {
      title: "Berkeley Global Access Program",
      issuer: "UC Berkeley",
      date: "2026",
      description: "Selected for the Spring 2026 and Fall 2026 semesters",
    },
    {
      title: "Runner-Up — Voloridge Sponsorship Challenge",
      issuer: "Voloridge × HackMIT",
      date: "September 2025",
      description: "HackMIT 2025 · 17th globally in the Puzzle Solver Contest",
    },
    {
      title: "Pre-Placement Offer",
      issuer: "Zuvees",
      date: "2025",
      description:
        "Built a first-of-its-kind Delivery Slot Management System",
    },
    {
      title: "JEE Advanced 2023 — All India Rank 5649",
      issuer: "National Testing Agency",
      date: "June 2023",
      description: "Offered a CSE seat at IIT Goa",
    },
    {
      title: "NTSE Scholar",
      issuer: "NCERT",
      date: "January 2020",
      description: "National Talent Search Examination",
    },
    {
      title: "2nd Place — State-Level Public Speaking Contest",
      issuer: "The Hindu",
      date: "",
      description: "",
    },
  ] as AchievementType[],
  skills: [
    "C++",
    "Java",
    "Python",
    "HTML5/CSS",
    "JavaScript",
    "Next.js",
    "Amazon Web Services (AWS)",
    "MERN",
    "NPM",
    "Webpack",
    "NumPy",
    "TensorFlow",
    "Pandas",
    "Matplotlib",
    "Flask",
    "Jira",
    "Git",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "#experience", icon: BriefcaseIcon, label: "Experience" },
    { href: "#achievements", icon: AwardIcon, label: "Achievements" },
    { href: "#publications", icon: NotebookIcon, label: "Research" },
    { href: "#projects", icon: HammerIcon, label: "Projects" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" }
  ],
  contact: {
    email: "cmurali.m23csai@nst.rishihood.edu.in",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/HackHeroic",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/c-murali-madhav-2516602aa/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Twitter: {
        name: "Twitter",
        url: "https://twitter.com",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "Sanas",
      href: "https://www.sanas.ai/",
      badges: ["Offer received"],
      location: "Bengaluru, India",
      title: "AI Engineer – Intern",
      logoUrl: "/Sanas-logo.png",
      start: "June 2026",
      end: "",
      description: (
        <>
          Began contributing to Sanas&apos;s{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "var(--python-color, #306998)",
            }}
          >
            real-time speech AI platform
          </span>
          , which transforms speakers&apos; accents in real time. May continue from October 2026, designing and building internal workflow automation across engineering and operations processes, reducing manual overhead and standardizing repeatable tasks.
        </>
      ),
    },
    {
      company: "Transient AI Inc",
      href: "https://transient.ai/",
      badges: [],
      location: "New York, USA",
      title: "Software Development Engineer – Intern",
      logoUrl: "/TransientAi-logo.jpeg",
      start: "June 2025",
      end: "September 2025",
      description: (
        <>
          Developed{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "var(--python-color, #306998)",
            }}
          >
            deep recurrent forecasting models
          </span>{" "}
          for stock price prediction during internal Hackathon Challenge, integrating real-time data APIs for enhanced accuracy in time-series forecasting; awarded 'Best Project' for its application in hedge fund risk analysis and revenue optimization. Collaborated on real-time insights dashboards for portfolio risk identification and market research, incorporating sentiment analysis and semantic search to support proactive strategies in investment banking and hedge funds.
        </>
      ),
    },
    {
      company: "Zuvees",
      href: "https://zuvees.ae/",
      badges: [],
      location: "United Arab Emirates (UAE)",
      title: "Software Development Engineer – Intern",
      logoUrl: "/Zuvees-logo.jpeg",
      start: "January 2025",
      end: "June 2025",
      description: (
        <>
          Developed and optimized{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "var(--python-color, #306998)",
            }}
          >
            Warehouse Management System (WMS)
          </span>{" "}
          and{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "var(--python-color, #306998)",
            }}
          >
            Order Management System (OMS)
          </span>{" "}
          on the MERN stack with automated order-intake and fulfilment pipelines, boosting Contribution Margin (CM1) by 60% and conversion rates from 45% to 140%. Designed scalable business process workflows for delivery, inventory, and order systems, integrating Shopify APIs, dynamic pricing via price slabs, and real-time slot management. Architected{" "}
          <span className="text-[#eb8f00] dark:text-[#ffb900]" style={{ fontWeight: "bold"}}>AWS</span>{" "}
          infrastructure (S3, RDS, EC2) and CI/CD pipelines with GitHub Actions and Docker, ensuring high availability and scalability for the Zuvees e-commerce platform.
        </>
      ),
    },
    {
      company: "Zota Health Care Ltd",
      href: "https://www.zotahealthcare.com/",
      badges: [],
      location: "Remote",
      title: "Front-End Developer-Intern",
      logoUrl: "/Zota-logo.jpeg",
      start: "June 2024",
      end: "August 2024",
      description: (
        <>
          Enhanced inventory management, improving stock tracking accuracy by{" "}
          <span style={{ fontWeight: "bold", color: "#3e9c35" }}>25%</span>{" "}
          and reducing overstocking by{" "}
          <span style={{ fontWeight: "bold", color: "#3e9c35" }}>20%</span>
          . Implemented real-time sales tracking, enabling faster decision-making and better sales analysis.
        </>
      ),
    },
  ],
  education: [
    {
      school: "Newton School Of Technology, Rishihood University",
      href: "",
      degree: (
        <>
          <strong>Bachelor of Technology in Computer Science & Artificial Intelligence</strong>
        </>
      ),
      logoUrl: "/newton school -logo.jpeg",
      start: "2023",
      end: "May 2027",
      description:
        "CGPA: 3.74/4\nRelevant Coursework: Data Structures and Algorithms, Software Engineering, Operating Systems, Object-Oriented Programming, Database Management, Machine Learning, Applied Linear Algebra, Probability and Statistics, Cybersecurity, Computer Architecture, Artificial Intelligence & Machine Learning, Data Mining, Computer Networks, Advanced Machine Learning, Advanced Discrete Mathematics, and Deep Learning.",
    },
  ],
  projects: [
    {
      title: "Floor Detection using SVM",
      href: "https://github.com/HackHeroic/Floor_Detection_Svm",
      dates: "2024",
      active: true,
      description:
        "Implemented floor vs. non-floor pixel/region classification on indoor images using the CMM dataset and Support Vector Machines. Compared three feature-engineering approaches: RGB-only pixels, RGB plus spatial coordinates, and KMeans-based region-level features. Method 3 (KMeans regions) achieved ~92.5% test accuracy with the fastest training.",
      technologies: [
        "Python",
        "SVM",
        "scikit-learn",
        "KMeans",
        "Computer Vision",
        "COCO Annotations",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://github.com/HackHeroic/Floor_Detection_Svm",
        },
        {
          icon: <FileText className="size-4" />,
          type: "Report",
          href: "/C Murali Madhav - Report Floor Detection fusing SVM.pdf",
        },
      ],
    },
    {
      title: "Watt-IF – Physics-Informed Power Grid Forecasting",
      href: "",
      dates: "2025 - Present",
      active: true,
      description:
        "Stage 1 (KAT-PatchTST, first author, accepted at IEEE APPEEC 2026): physics-informed BA-aggregate load forecaster combining Channel-Independent PatchTST and TimeXer cross-attention with a Kirchhoff conservation regularizer and ReLoBRaLo dynamic loss balancing. Attains 3.55% demand MAPE on the six-BA EIA-930 protocol using a 168-hour context (30% shorter than the published 240-hour baseline) at ~0.6M parameters (3-10x leaner than comparators). Stage 2 (forecast-conditioned operational feasibility analysis on the BA-interchange network) and Stage 3 (learning a conditional grid-partition policy that minimizes allocation failures) are in development, targeting ICLR.",
      technologies: [
        "Python",
        "Deep Learning",
        "PatchTST",
        "TimeXer",
        "Physics-Informed ML",
        "Time-Series Forecasting",
      ],
    },
    {
      title: "Distributed Log Analyzer using Parallel Computing",
      href: "",
      dates: "2025",
      active: true,
      description:
        "Implemented a distributed system using MPI (Message Passing Interface) in C++ to parallelize log file parsing and anomaly detection across multiple nodes, reducing analysis time by 70% for large-scale server logs. Integrated parallel reduction techniques for aggregating metrics like error rates and response times, enabling real-time monitoring and scalable debugging in cloud environments.",
      technologies: [
        "C++",
        "MPI",
        "Parallel Computing",
        "Distributed Systems",
        "Log Analysis",
      ],
    },
    {
      title: "Monte Carlo Simulation for Stock Portfolio",
      href: "https://github.com/HackHeroic/Monte_Carlo_Simulation",
      dates: "2024",
      active: true,
      description:
        "Developed a Monte Carlo simulation to estimate stock portfolio values, modeling returns with Cholesky decomposition. Simulated 100 portfolio projections over 100 days to assess risk and future performance.",
      technologies: [
        "Python",
        "Monte Carlo Simulation",
        "Financial Modeling",
        "NumPy",
        "Pandas",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://github.com/HackHeroic/Monte_Carlo_Simulation",
        },
      ],
    },
    {
      title: "Optiforge Neural Options Pricing",
      href: "https://github.com/HackHeroic/optiforge",
      dates: "2024",
      active: true,
      description:
        "Developed a neural option pricing system integrating deep sequence architectures with GARCH volatility, benchmarked against Black-Scholes, enabling quantitative comparison between ML based and Analytical pricing. Built an Interactive Dashboard with heatmaps, sensitivity analysis (price vs spot, volatility) and Multiple Models Trains with different features to visualize pricing behavior and model errors across market conditions.",
      technologies: [
        "Python",
        "LSTM",
        "GARCH",
        "TensorFlow",
        "Financial Modeling",
        "Machine Learning",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://github.com/HackHeroic/optiforge",
        },
      ],
    },
    {
      title: "Image to Audio (Assistive Tech for Visually Impaired)",
      href: "https://github.com/HackHeroic/Image_to_Audio",
      dates: "2024",
      active: true,
      description:
        "Built an AI-powered Flask app that generates audio descriptions from images using Salesforce's BLIP image captioning model, combined with SVM-based floor classification (RGB-only, RGB+spatial, and KMeans-region feature strategies on a self-built dataset) to enhance environmental awareness. Converts uploaded images to speech using a text-to-speech engine, making it a practical assistive tool for visually impaired users.",
      technologies: [
        "Python",
        "Flask",
        "BLIP",
        "Computer Vision",
        "Text-to-Speech",
        "Assistive Technology",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://github.com/HackHeroic/Image_to_Audio",
        },
      ],
    },    
    {
      title: "Stock Price Prediction using LSTM",
      href: "https://github.com/HackHeroic/Stock-Price-Predictor",
      dates: "December 2024 - January 2025",
      active: true,
      description:
        "Implemented a Long Short-Term Memory (LSTM) neural network to predict stock prices based on historical data. The model leverages time-series forecasting techniques, processes real-time stock data using yfinance, and scales data with MinMaxScaler for improved performance. It predicts the next day's stock price and visualizes results against actual market data. The architecture consists of stacked LSTM layers with dropout regularization to enhance prediction accuracy while preventing overfitting.",
      technologies: [
        "Python",
        "LSTM",
        "Deep Learning",
        "TensorFlow",
        "Keras",
        "Time-Series Forecasting",
        "Quantitative Finance",
        "yfinance",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://github.com/HackHeroic/Stock-Price-Predictor",
        },
      ],
    },
    {
      title: "CIFAR-10 Image Classification using CNN",
      href: "https://github.com/HackHeroic/Image-classification-",
      dates: "2024",
      active: true,
      description:
        "Developed a Convolutional Neural Network (CNN) to classify images from the CIFAR-10 dataset, which contains 60,000 images across 10 categories (airplanes, cars, birds, etc.). The model was trained using TensorFlow and Keras, achieving an accuracy of approximately 72%. The architecture includes 3 convolutional layers with MaxPooling for feature extraction.",
      technologies: [
        "Python",
        "CNN",
        "Deep Learning",
        "TensorFlow",
        "Keras",
        "Computer Vision",
        "OpenCV",
        "Image Classification",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://github.com/HackHeroic/Image-classification-",
        },
      ],
    },
    {
      title: "File Organizer App",
      href: "https://github.com/HackHeroic/file_organizer",
      dates: "2024",
      active: true,
      description:
        "A console-based file management application in C that demonstrates OS file system concepts. Automatically organizes files into categorized folders (Documents, Images, Audio, Videos, Others) based on extensions using system calls like mkdir(2), readdir(3), rename(2), and stat(2). Includes a Next.js web app with file explorer, kernel log of OS operations, and syscall documentation.",
      technologies: [
        "C",
        "Next.js",
        "Node.js",
        "File System APIs",
        "Operating Systems",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://github.com/HackHeroic/file_organizer",
        },
      ],
    },
  ] as ProjectType[],
} as const;
