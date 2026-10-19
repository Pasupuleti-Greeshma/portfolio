export const personalInfo = {
  "name": "Greeshma",
  "surname": "Pasupuleti",
  "role": "Full Stack Developer",
  "fullName": "Pasupuleti Chandana Greeshma Naidu",
  "displayName": "Greeshma Pasupuleti",
  "title": "Full Stack Developer",
  "tagline": "Engineering scalable web systems, dynamic user interfaces and AI-augmented cloud architectures.",
  "summary": "Results-driven Full Stack Developer with 2.5+ years of hands-on experience developing and deploying scalable web applications using modern frontend and backend technologies. Specialized in React, Spring Boot, AWS, RAG and Model Context Protocol (MCP) workflows.",
  "location": "Hyderabad, Telangana, India",
  "email": "chandanagreeshma14@gmail.com",
  "phone": "+91 8179250944",
  "github": "https://github.com/Pasupuleti-Greeshma",
  "linkedin": "https://www.linkedin.com/in/pasupuleti-greeshma-73bb00421",
  "experienceYears": "2.5+",
  "availability": "Available for Opportunities",
  "education": {
    "institution": "IIIT Srikakulam (RGUKT AP)",
    "degree": "Bachelor of Technology in Electronics and Communication Engineering (ECE)",
    "score": "9.4 CGPA",
    "period": "2020 - 2024",
    "highlight": "Graduated with 9.4 CGPA distinction, specialized in distributed web systems, software architectures and AI application workflows."
  }
};

export const stats = [
  {
    "label": "Years Experience",
    "value": "2.5+"
  },
  {
    "label": "Academic CGPA",
    "value": "9.4"
  },
  {
    "label": "Enterprise Projects",
    "value": "3+"
  },
  {
    "label": "Technologies",
    "value": "15+"
  }
];

export const marqueeTech = [
  {
    "name": "React.js",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    "name": "Spring Boot",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
  },
  {
    "name": "Java",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
  },
  {
    "name": "JavaScript",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    "name": "Node.js",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
  },
  {
    "name": "TypeScript",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  },
  {
    "name": "Tailwind CSS",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
  },
  {
    "name": "MySQL",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  },
  {
    "name": "MongoDB",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
  },
  {
    "name": "AWS Cloud",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
  },
  {
    "name": "GitLab CI/CD",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg"
  },
  {
    "name": "Git & GitHub",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  }
];

export const experiences = [
  {
    "role": "Full Stack Developer",
    "company": "Solinix Software Solutions",
    "period": "2025 - Present",
    "badge": "Current Role",
    "location": "Hyderabad, India (Hybrid)",
    "summary": "Spearheading full-stack product engineering across PGMove and Stayzy platforms, scaling PG discovery, tenancy workflows, and automated microservices.",
    "highlights": [
      "Engineered end-to-end PG discovery, property management, and tenant workflow systems including digital rent collection, KYC verification, and e-rental agreements.",
      "Developed and integrated responsive frontend interfaces with Spring Boot REST microservices and backend databases.",
      "Architected cloud infrastructure on AWS and implemented context-retrieval mechanisms leveraging RAG and MCP for enhanced workflows.",
      "Automated code reviews within GitLab CI/CD pipelines using AI automation to guarantee production software reliability."
    ],
    "tags": [
      "React",
      "React Native",
      "Spring Boot",
      "AWS",
      "RAG",
      "MCP",
      "GitLab CI/CD",
      "MySQL"
    ]
  },
  {
    "role": "Full Stack Developer Intern",
    "company": "Pantech ProLabs and APSSDC",
    "period": "2022 - 2024",
    "badge": "Industry Internship",
    "location": "Vijayawada, India",
    "summary": "Completed an intensive industry-aligned internship focused on end-to-end web application development using Java, Spring Boot, and React.js.",
    "highlights": [
      "Engineered a complete Student Management System capstone project from concept to production.",
      "Designed normalized MySQL relational schemas and high-throughput Spring Boot REST API endpoints.",
      "Built reactive frontend single-page interfaces in React.js with modular state management and responsive UI components."
    ],
    "tags": [
      "Java",
      "Spring Boot",
      "React.js",
      "MySQL",
      "JavaScript",
      "HTML5",
      "CSS3"
    ]
  }
];

export const projects = [
  {
    "id": "01",
    "title": "PGMove & Stayzy Platform",
      "image": "/project-pgmove.jpg",
    "subtitle": "Tenant Lifecycle & Real-Time Property Discovery SaaS",
    "category": "Enterprise SaaS",
    "accentColor": "#3b82f6",
    "description": "Comprehensive property discovery and tenancy management ecosystem featuring online rent collection, e-KYC validation, and digital tenant agreements.",
    "codeSnippet": "// Stayzy Tenant Lifecycle Contract\ninterface TenantAgreement {\n  tenantId: string;\n  propertyId: string;\n  eKycStatus: \" VERIFIED | PENDING;\n monthlyRent: number;\n}\n\nasync function processDigitalLease(tenant: TenantAgreement) {\n const kyc = await verifyKYC(tenant.tenantId);\n if (!kyc.success) throw new Error(KYC_REJECTED);\n return await generateSignedContract(tenant);\n}",
    "bullets": [
      "End-to-end tenant KYC and digital rental agreement workflows",
      "Automated rent invoicing, payment reconciliation and alerts",
      "Context-aware search powered by RAG and MCP connectors"
    ],
    "techStack": [
      "React.js",
      "React Native",
      "Spring Boot",
      "AWS",
      "RAG / MCP",
      "MySQL"
    ],
    "github": "https://github.com/Pasupuleti-Greeshma",
    "live": "https://github.com/Pasupuleti-Greeshma"
  },
  {
    "id": "02",
    "title": "Interactive Expenses Tracker",
      "image": "/project-tracker.jpg",
    "subtitle": "Personal Finance Analytics & Ledger System",
    "category": "Full-Stack FinTech",
    "accentColor": "#10b981",
    "description": "Comprehensive personal finance management suite for tracking cash flows, categorizing transactions, and analyzing spending habits through interactive data visualizations.",
    "codeSnippet": "// Spring Boot REST Controller\n@RestController\n@RequestMapping(/api/v1/expenses)\npublic class ExpenseController {\n @GetMapping(/analytics/monthly)\n public ResponseEntity<TrendsDTO> getTrends(\n @AuthenticationPrincipal User user) {\n return ResponseEntity.ok(analyticsService.calculate(user.getId()));\n }\n}",
    "bullets": [
      "Interactive visual charts for monthly spending patterns",
      "Normalized relational MySQL ledger with category filters",
      "Secure REST endpoints with role-based auth and validations"
    ],
    "techStack": [
      "Java",
      "Spring Boot",
      "React.js",
      "MySQL",
      "REST APIs",
      "Tailwind CSS"
    ],
    "github": "https://github.com/Pasupuleti-Greeshma",
    "live": "https://github.com/Pasupuleti-Greeshma"
  },
  {
    "id": "03",
    "title": "Airline Management System",
      "image": "/project-airline.jpg",
    "subtitle": "Distributed Flight Scheduling & Seat Inventory Engine",
    "category": "Distributed Enterprise System",
    "accentColor": "#8b5cf6",
    "description": "Enterprise airline reservation platform featuring flight scheduling, real-time seat inventory, multi-tier passenger booking, and administrative operational dashboards.",
    "codeSnippet": "// Concurrency-Safe Flight Reservation\n@Transactional(isolation = Isolation.SERIALIZABLE)\npublic BookingResponse reserveSeat(Long flightId, String seatNumber) {\n Seat seat = seatRepository.lockSeat(flightId, seatNumber);\n if (seat.isBooked()) throw new SeatTakenException();\n seat.setBooked(true);\n return bookingService.confirm(seat);\n}",
    "bullets": [
      "Real-time seat inventory matrix with transaction safety",
      "Distinct Role-Based Access Control (Admin / Passenger)",
      "Normalized flight scheduling and automated booking confirmation"
    ],
    "techStack": [
      "Java",
      "Spring Boot",
      "JavaScript",
      "React.js",
      "MySQL",
      "REST APIs"
    ],
    "github": "https://github.com/Pasupuleti-Greeshma",
    "live": "https://github.com/Pasupuleti-Greeshma"
  }
];

export const skillCategories = [
  {
    "title": "Frontend Development",
    "icon": "layout",
    "skills": [
      "React.js",
      "React Native",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "HTML5 / CSS3",
      "UI / UX Design",
      "Responsive Web Apps"
    ]
  },
  {
    "title": "Backend Engineering",
    "icon": "server",
    "skills": [
      "Java",
      "Spring Boot",
      "Node.js",
      "RESTful APIs",
      "Microservices",
      "Authentication & AuthZ"
    ]
  },
  {
    "title": "Databases & Cloud",
    "icon": "database",
    "skills": [
      "MySQL",
      "MongoDB",
      "AWS Cloud Infrastructure",
      "CI/CD Pipelines",
      "Git / GitHub / GitLab"
    ]
  },
  {
    "title": "AI & Next-Gen Workflows",
    "icon": "cpu",
    "skills": [
      "RAG (Retrieval-Augmented Generation)",
      "MCP (Model Context Protocol)",
      "GitLab AI Review Automation",
      "AI Workflow Orchestration"
    ]
  }
];


