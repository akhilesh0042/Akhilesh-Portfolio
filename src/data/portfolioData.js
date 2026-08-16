export const personalInfo = {
  name: "Akhilesh",
  role: "Python & Django Developer — Fresher",
  headline: "Final-year MCA student building dependable full-stack applications with Django, REST APIs, and MySQL.",
  subheadline: "Based in Kerala, India. Focused on robust backend architecture, scalable database schemas, and expanding into modern React and Tailwind interfaces.",
  status: "Open to opportunities",
  location: "Kerala, India",
  email: "akhileshprakash0042@gmail.com",
  github: "https://github.com/akhilesh0042",
  linkedin: "https://www.linkedin.com/in/akhilesh-p-582936389",
  education: {
    degree: "Master of Computer Applications (MCA)",
    institution: "APJ Abdul Kalam Technological University (KTU)",
    status: "Final Year (2024 – 2026)",
    cgpa: "8.0",
    location: "Kerala, India",
  },
  undergrad: {
    degree: "Bachelor of Science in Computer Science / BCA",
    status: "Completed",
    institution: "University in Kerala",
  }
};

export const stats = [
  {
    id: "cgpa",
    value: "8.0",
    label: "MCA CGPA",
    sublabel: "APJ Abdul Kalam Tech University",
    elevationClass: "shadow-elevation-card-a",
  },
  {
    id: "experience",
    value: "2+",
    label: "Years Hands-on Code",
    sublabel: "Project development & architectures",
    elevationClass: "shadow-elevation-card-b",
  },
  {
    id: "projects",
    value: "5+",
    label: "Applications Shipped",
    sublabel: "Full-stack, REST APIs & AI",
    elevationClass: "shadow-elevation-card-c",
  },
];

export const projects = [
  {
    id: "leavease",
    title: "LeavEase",
    subtitle: "Enterprise Leave Management & Approval System",
    year: "2025",
    priorityOrder: 1, // Newest / Primary project
    shortDesc: "Full-featured leave workflow engine with role-based access control, interactive FullCalendar.js scheduling, and Chart.js analytics.",
    fullDesc: "Architected an end-to-end Leave Management System to replace paper-based academic and workplace approvals. Implemented multi-tier Role-Based Access Control (Admin, HOD, Faculty, Staff) with dynamic permission gates, automated leave balance recalculations, interactive FullCalendar.js visual timelines, Chart.js metrics, and secure medical document uploads.",
    techStack: ["Python", "Django", "MySQL", "FullCalendar.js", "Chart.js", "Bootstrap 5", "HTML5/CSS3"],
    signatureDetail: "Multi-Tier RBAC & Real-Time Balance Engine",
    keyHighlights: [
      "Designed granular 4-tier Role-Based Access Control (Admin, HOD, Faculty, Staff) with strict permission separation.",
      "Integrated FullCalendar.js to provide visual department-wide leave occupancy and avoid understaffing.",
      "Constructed Chart.js analytics dashboards summarizing leave patterns, leave balance audits, and departmental trends.",
      "Implemented secure medical certificate file uploads with server-side mime-type validation and storage quotas.",
      "Engineered automated email notifications & approval audit trail for zero-latency communication.",
    ],
    githubUrl: "https://github.com/akhilesh-dev/leavease-django-system",
    liveDemoUrl: "https://leavease-demo.example.com",
    elevationClass: "shadow-elevation-card-a",
  },
  {
    id: "alamarai",
    title: "ALAMARAi",
    subtitle: "AI-Powered Smart Wardrobe & Stylist Platform",
    year: "2025",
    priorityOrder: 2,
    shortDesc: "Intelligent digital wardrobe cataloging and context-aware outfit recommendation engine powered by Google Gemini API.",
    fullDesc: "Built an AI-driven digital wardrobe assistant that helps users catalog their clothing, generate context-aware daily outfit recommendations, and optimize wardrobe utilization. Leveraged Google Gemini Multimodal API for automated garment attribute extraction (color palette, pattern, formality, seasonality) and weather-informed styling algorithms.",
    techStack: ["Python", "Django", "Google Gemini API", "REST APIs", "MySQL", "Tailwind CSS", "JavaScript"],
    signatureDetail: "Gemini Vision Multimodal Classification Pipeline",
    keyHighlights: [
      "Engineered structured prompt pipelines with Google Gemini API to extract clothing tags and attributes from uploaded photos.",
      "Built a weather-aware recommendation engine that pairs tops, bottoms, and footwear based on local climate and occasion.",
      "Designed a clean responsive wardrobe catalog with multi-facet filtering and outfit composition preview.",
      "Implemented RESTful endpoints for fast asynchronous photo processing and outfit generation.",
    ],
    githubUrl: "https://github.com/akhilesh-dev/alamarai-gemini-stylist",
    liveDemoUrl: "https://alamarai-preview.example.com",
    elevationClass: "shadow-elevation-card-b",
  },
  {
    id: "django-rest-hub",
    title: "Django REST API Core",
    subtitle: "Modular RESTful Backend Architecture",
    year: "2024",
    priorityOrder: 3,
    shortDesc: "High-throughput API endpoints with JWT authentication, custom rate limiters, MySQL relational schemas, and OpenAPI documentation.",
    fullDesc: "Designed a production-ready Django REST Framework boilerplate and microservice hub with modular apps, token rotation authentication, standardized error responses, query optimizations via select_related/prefetch_related, and automated Swagger documentation.",
    techStack: ["Python", "Django REST Framework", "MySQL", "JWT Auth", "Swagger / OpenAPI", "Postman"],
    signatureDetail: "Token Rotation & Optimized Query Layer",
    keyHighlights: [
      "Custom JWT authentication middleware with sliding token refresh mechanics.",
      "Database query profiling reducing N+1 queries using prefetch_related and database indexes.",
      "Integrated Swagger / OpenAPI UI for automated interactive documentation and client testing.",
      "Configured fine-grained IP and user-based throttling to defend against endpoint abuse.",
    ],
    githubUrl: "https://github.com/akhilesh-dev/django-rest-api-core",
    liveDemoUrl: "https://api-core-docs.example.com",
    elevationClass: "shadow-elevation-card-c",
  },
  {
    id: "campus-connect",
    title: "CampusConnect",
    subtitle: "Student Portal & Department Coordination Hub",
    year: "2024",
    priorityOrder: 4,
    shortDesc: "Centralized academic portal for internal circulars, event registrations, and departmental course materials.",
    fullDesc: "Built during MCA coursework to facilitate seamless communication between departments, student clubs, and faculty coordinators with role-specific dashboards and verified event registration.",
    techStack: ["Python", "Django", "PHP / MySQL", "JavaScript", "Bootstrap"],
    signatureDetail: "Isolated Departmental Bulletin Feed",
    keyHighlights: [
      "Role-isolated feeds for department-specific announcements and academic schedules.",
      "Real-time event registration tracking with automated seat count decrementing.",
      "Centralized resource repository with category tagging and file downloads.",
    ],
    githubUrl: "https://github.com/akhilesh-dev/campus-connect",
    liveDemoUrl: "https://campus-connect.example.com",
    elevationClass: "shadow-elevation-card-a",
  }
];

export const skillCategories = [
  {
    name: "Languages",
    description: "Core programming and markup languages",
    skills: [
      { name: "Python", level: "Primary", highlight: true },
      { name: "PHP", level: "Proficient", highlight: false },
      { name: "C", level: "Academic", highlight: false },
      { name: "C++", level: "Academic", highlight: false },
      { name: "JavaScript (ES6+)", level: "Working", highlight: true },
      { name: "SQL", level: "Proficient", highlight: true },
      { name: "HTML5 & CSS3", level: "Proficient", highlight: false },
    ],
  },
  {
    name: "Frameworks & Backend",
    description: "Server architecture, APIs, and modern frontend",
    skills: [
      { name: "Django", level: "Primary", highlight: true },
      { name: "Django REST Framework", level: "Primary", highlight: true },
      { name: "React.js", level: "Expanding", highlight: true },
      { name: "Tailwind CSS", level: "Working", highlight: true },
      { name: "Bootstrap 5", level: "Proficient", highlight: false },
    ],
  },
  {
    name: "Databases & Storage",
    description: "Relational modeling and query optimization",
    skills: [
      { name: "MySQL", level: "Primary", highlight: true },
      { name: "SQLite", level: "Development", highlight: false },
      { name: "PostgreSQL", level: "Familiar", highlight: false },
      { name: "Database Normalization", level: "Proficient", highlight: false },
    ],
  },
  {
    name: "Tools & Methodologies",
    description: "Developer workflow, AI APIs, and libraries",
    skills: [
      { name: "Google Gemini API", level: "Working", highlight: true },
      { name: "Git & GitHub", level: "Daily Workflow", highlight: true },
      { name: "Postman API Testing", level: "Proficient", highlight: false },
      { name: "FullCalendar.js", level: "Integration", highlight: false },
      { name: "Chart.js", level: "Integration", highlight: false },
      { name: "Linux / Bash Basics", level: "Working", highlight: false },
      { name: "RESTful Architecture", level: "Core", highlight: true },
    ],
  },
];

export const resumeData = {
  summary: "Final-year MCA student at APJ Abdul Kalam Technological University (KTU) with an 8.0 CGPA and a strong foundation in Python, Django, and MySQL. Proven track record of architecting real-world applications including LeavEase (RBAC Leave System) and ALAMARAi (Gemini AI Wardrobe Platform). Actively expanding frontend capabilities with React and Tailwind CSS. Eager to contribute as a dedicated Python / Full-Stack Developer.",
  experience: [
    {
      role: "Python & Django Developer — Academic & Personal Projects",
      period: "2024 – Present",
      location: "Kerala, India",
      points: [
        "Architected enterprise-grade web applications using Django ORM, custom authentication middleware, and REST APIs.",
        "Integrated AI models (Google Gemini API) to build intelligent multimodal user features.",
        "Designed normalized MySQL schemas with foreign key constraints, indexes, and optimized query execution plans.",
      ]
    },
    {
      role: "MCA Graduate Student & Technical Project Lead",
      period: "2024 – 2026",
      location: "APJ Abdul Kalam Technological University (KTU)",
      points: [
        "Maintained consistent 8.0 CGPA across computer science, algorithms, software engineering, and database systems coursework.",
        "Led project teams in developing LeavEase and departmental software utilities.",
      ]
    }
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "APJ Abdul Kalam Technological University (KTU), Kerala",
      year: "2024 – 2026",
      score: "CGPA: 8.0 / 10",
    },
    {
      degree: "Bachelor of Science in Computer Science / BCA",
      institution: "Kerala, India",
      year: "2021 – 2024",
      score: "First Class with Distinction",
    }
  ],
  certifications: [
    "Python for Full-Stack Development & Django Web Framework",
    "Relational Database Design & MySQL Query Optimization",
    "RESTful API Design & Postman Automation Testing",
    "Generative AI & LLM Application Integration (Gemini)",
  ]
};
