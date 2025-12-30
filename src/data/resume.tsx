import { Icons } from "@/components/icons";
import {
  BriefcaseIcon,
  HomeIcon,
  HammerIcon,
  NotebookIcon,
  AwardIcon,
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
  url: "https://cmuralimadhav.com",
  resumeUrl: "/C Murali Madhav Resume Latest Decemeber 2025 .pdf",
  location: "India",
  locationLink: "https://www.google.com/maps/place/india",
  description:
    "Building AI-powered solutions and scalable systems. I love to learn, create, and ship. 17th place globally at HackMIT 2025. Experienced in full-stack development, machine learning, and deep learning.",
  current:
    "B.Tech CS & AI @ Newton School of Technology | Exploring AI, competitive programming, and building impactful projects.",
  summary1:
    "I love using my skills to build things that actually make a difference in people's lives. My goal is to keep exploring, innovating, and contributing to STEM in a way that helps society move forward.",
  summary2:
    "I'm currently a computer science and artificial intelligence student at Newton School Of Technology, Rishihood University, with a CGPA of 3.81. I have achieved recognition in competitive programming, including 17th place globally in HackMIT 2025 Puzzle Solver Contest and runner-up in the Voloridge sponsorship challenge. I've also secured a Pre-Placement Offer through exceptional project impact at Zuvees.",
  // avatarUrl: "/professional.webp",
  avatarUrl: "/madhav-desert.jpeg",
  hackathons: [
    {
      title: "HackMIT 2025 (17th Place Globally 🏆)",
      image: "/hackmit.png",
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
      title: "Watt-IF: Electricity Data Mining and Grid Resilience Research",
      href: "https://github.com/HackHeroic/Watt-IF/tree/main",
      authors: ["C. Murali Madhav"],
      venue: "Research Project (Work in Progress) - 2024",
      links: [
        {
          icon: <Icons.github className="size-4" />,
          title: "GitHub",
          href: "https://github.com/HackHeroic/Watt-IF/tree/main",
        },
      ],
    },
    {
      title: "Optiforge: Neural Options Pricing with LSTM and GARCH Volatility",
      href: "https://github.com/HackHeroic/optiforge",
      authors: ["C. Murali Madhav"],
      venue: "Research Project (Work in Progress) - 2024",
      links: [
        {
          icon: <Icons.github className="size-4" />,
          title: "GitHub",
          href: "https://github.com/HackHeroic/optiforge",
        },
      ],
    },
  ] as PublicationType[],
  achievements: [
    {
      title: "Runner Up - Voloridge Sponsorship Challenge",
      issuer: "Voloridge x HackMIT",
      date: "September 2025",
      description:
        "HackMIT 2025: Achieved 17th place globally in the HackMIT Puzzle Solver Contest 2025 and runner-up in the Voloridge sponsorship challenge.",
    },
    {
      title: "JEE Advanced Scholar",
      issuer: "The National Testing Agency",
      date: "June 2023",
      description:
        "Secured a rank among the State top 2 per cent of students who qualified for the next from JEE Main -2023. Was offered seat in IIT Goa CSE Branch.",
    },
    {
      title: "National Talent Search Examination (NTSE) Scholar",
      issuer: "NCERT",
      date: "January 2020",
      description:
        "Qualified as NTSE Scholar, recognizing exceptional academic talent and potential.",
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
      company: "Transient AI Inc",
      href: "",
      badges: [],
      location: "New York, USA",
      title: "Software Development Engineer – Intern",
      logoUrl: "/TransientAi-logo.jpeg",
      start: "June 2025",
      end: "Present",
      description: (
        <>
          Developed a{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "var(--python-color, #306998)",
            }}
          >
            LSTM-based deep learning model
          </span>{" "}
          for stock price prediction during internal Hackathon Challenge, integrating real-time data APIs for enhanced accuracy in time-series forecasting; awarded 'Best Project' for its application in hedge fund risk analysis and revenue optimization. Collaborated on real-time insights dashboards for portfolio risk identification and market research, incorporating sentiment analysis and semantic search to support proactive strategies in investment banking and hedge funds.
        </>
      ),
    },
    {
      company: "Zuvees",
      href: "",
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
          with MERN stack and AI automation, boosting Contribution Margin by 60% and conversion rates from 45% to 140%. Designed scalable business process workflows for delivery, inventory, and order systems, integrating Shopify APIs, dynamic pricing via price slabs, and real-time slot management. Architected{" "}
          <span className="text-[#eb8f00] dark:text-[#ffb900]" style={{ fontWeight: "bold"}}>AWS</span>{" "}
          infrastructure (S3, RDS, EC2) and CI/CD pipelines with GitHub Actions and Docker, ensuring high availability and scalability for the Zuvees e-commerce platform.
        </>
      ),
    },
    {
      company: "Zota Health Care Ltd",
      href: "",
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
        "CGPA: 3.81\nRelevant Coursework: Data Structures and Algorithms, Software Engineering, Operating Systems, Object-Oriented Programming, Database Management, Machine Learning, Applied Linear Algebra, Probability and Statistics, Cybersecurity, Computer Architecture, Artificial Intelligence & Machine Learning, Data Mining, Computer Networks.",
    },
  ],
  projects: [
    {
      title: "Watt-IF – Electricity Data Mining and Grid Resilience Research",
      href: "https://github.com/HackHeroic/Watt-IF/tree/main",
      dates: "2024",
      active: true,
      description:
        "Conducted large-scale electricity consumption and generation mining using XGBoost, TFT, and deep learning models, achieving improved demand forecasting through advanced feature engineering. Modeled the U.S. power grid as a weighted directed graph and applied max-flow min-cut analysis to identify critical transmission bottlenecks and simulate cascading failure scenarios for Efficient Resource Allocation.",
      technologies: [
        "Python",
        "XGBoost",
        "Deep Learning",
        "TensorFlow",
        "Data Mining",
        "Graph Theory",
      ],
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://github.com/HackHeroic/Watt-IF/tree/main",
        },
      ],
    },
    {
      title: "Distributed Log Analyzer using Parallel Computing",
      href: "https://github.com",
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
      links: [
        {
          icon: <Icons.github className="size-4" />,
          type: "GitHub",
          href: "https://github.com",
        },
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
        "Developed a neural option pricing system integrating LSTM models with GARCH Volatility, benchmarked against Black-Scholes, enabling quantitative comparison between ML based and Analytical pricing. Built an Interactive Dashboard with heatmaps, sensitivity analysis (price vs spot, volatility) and Multiple Models Trains with different features to visualize pricing behavior and model errors across market conditions.",
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
        "Built an AI-powered Flask app that generates audio descriptions from images using Salesforce's BLIP image captioning model. Converts uploaded images to speech using a text-to-speech engine, making it a potential assistive tool for visually impaired users.",
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
  ] as ProjectType[],
} as const;
