import { PrismaClient, CourseType } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to get tailored highlights based on course title
const getHighlights = (title: string): string[] => {
  const t = title.toLowerCase();
  if (t.includes('web') || t.includes('react') || t.includes('java') || t.includes('python')) {
    return ['Live Project Training', 'Full Stack Concepts', 'Industry Expert Mentors', 'Placement Support'];
  }
  if (t.includes('cad') || t.includes('solid') || t.includes('cnc') || t.includes('ansys')) {
    return ['Industrial Design Standards', '3D Modeling & Rendering', 'Hands-on Labs', 'Certification'];
  }
  if (t.includes('marketing') || t.includes('business')) {
    return ['Case Studies', 'Digital Strategy', 'SEO & Analytics', 'Brand Management'];
  }
  return ['Industry Certified', 'Practical Labs', 'Job Assistance', 'Expert Faculty'];
};

const courses = [
  // ============================
  // DIPLOMA COURSES
  // ============================
  {
    title: "Diploma in Computer Application",
    slug: "diploma-in-computer-application",
    code: "DIP-DCA-101",
    description: "A one-year comprehensive program covering fundamentals of computer applications, office automation, and basic programming skills suitable for entry-level IT jobs.",
    type: CourseType.DIPLOMA,
    duration: "1 Year",
    eligibility: "10+2",
    syllabusUrl: "https://stepgndec.com/syllabus/dca.pdf",
  },
  {
    title: "Diploma in Business Administration",
    slug: "diploma-in-business-administration",
    code: "DIP-DBA-102",
    description: "Learn the core principles of business management, administration, and organizational behavior to kickstart a career in the corporate world.",
    type: CourseType.DIPLOMA,
    duration: "1 Year",
    eligibility: "10+2",
    syllabusUrl: "https://stepgndec.com/syllabus/dba.pdf",
  },
  {
    title: "Diploma in Fashion Technology",
    slug: "diploma-in-fashion-technology",
    code: "DIP-DFT-103",
    description: "Explore the world of fashion with training in garment construction, textile science, and fashion illustration.",
    type: CourseType.DIPLOMA,
    duration: "1 Year",
    eligibility: "10+2",
    syllabusUrl: "https://stepgndec.com/syllabus/dft.pdf",
  },
  {
    title: "Diploma in Cad & CNC Programming",
    slug: "diploma-in-cad-cnc-programming",
    code: "DIP-DCC-104",
    description: "Specialized diploma focusing on Computer-Aided Design (CAD) and Computer Numerical Control (CNC) programming for manufacturing industries.",
    type: CourseType.DIPLOMA,
    duration: "1 Year",
    eligibility: "10+2",
    syllabusUrl: "https://stepgndec.com/syllabus/cad-cnc.pdf",
  },
  {
    title: "Post-Graduation Diploma in Computer Application",
    slug: "pgdca",
    code: "DIP-PGDCA-105",
    description: "Advanced diploma for graduates covering software development, database management, and web technologies.",
    type: CourseType.DIPLOMA,
    duration: "1 Year",
    eligibility: "Graduation",
    syllabusUrl: "https://stepgndec.com/syllabus/pgdca.pdf",
  },
  {
    title: "Post-Graduation Diploma in Business Administration",
    slug: "pgdba",
    code: "DIP-PGDBA-106",
    description: "Post-graduate level management program focusing on strategic business planning, marketing, and human resource management.",
    type: CourseType.DIPLOMA,
    duration: "1 Year",
    eligibility: "Graduation",
    syllabusUrl: "https://stepgndec.com/syllabus/pgdba.pdf",
  },

  // ============================
  // INDUSTRIAL TRAINING COURSES
  // ============================
  {
    title: "Python",
    slug: "python-training",
    code: "TRN-PYT-201",
    description: "Master Python programming from basics to advanced data structures, including libraries for data science and automation.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech/BCA/MCA",
    syllabusUrl: "https://stepgndec.com/syllabus/python.pdf",
  },
  {
    title: "Django",
    slug: "django-framework",
    code: "TRN-DJA-202",
    description: "Build robust and scalable web applications using the Django framework. Covers MVT architecture, ORM, and REST APIs.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech/BCA/MCA",
    syllabusUrl: "https://stepgndec.com/syllabus/django.pdf",
  },
  {
    title: "Web Designing",
    slug: "web-designing",
    code: "TRN-WEB-203",
    description: "Learn to create visually stunning and responsive websites using HTML5, CSS3, JavaScript, and Bootstrap.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech/BCA/MCA",
    syllabusUrl: "https://stepgndec.com/syllabus/web-design.pdf",
  },
  {
    title: "Web Development",
    slug: "web-development",
    code: "TRN-DEV-204",
    description: "Full-stack web development training covering frontend and backend technologies to build dynamic web solutions.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech/BCA/MCA",
    syllabusUrl: "https://stepgndec.com/syllabus/web-dev.pdf",
  },
  {
    title: "React/Flutter and MongoDB",
    slug: "react-flutter-mongodb",
    code: "TRN-RFM-205",
    description: "Specialized training in modern app development using React (Web) or Flutter (Mobile) backed by MongoDB.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech/BCA/MCA",
    syllabusUrl: "https://stepgndec.com/syllabus/react-flutter.pdf",
  },
  {
    title: "Digital Marketing (SEO)",
    slug: "digital-marketing-seo",
    code: "TRN-SEO-206",
    description: "Become a digital marketing expert with in-depth training on SEO, SEM, Google Analytics, and Social Media Marketing.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "Any Graduate",
    syllabusUrl: "https://stepgndec.com/syllabus/digital-marketing.pdf",
  },
  {
    title: "C / C++",
    slug: "c-cpp-programming",
    code: "TRN-CPP-207",
    description: "Strengthen your programming foundation with in-depth training in C and C++, covering pointers, OOPs, and data structures.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech/BCA/MCA",
    syllabusUrl: "https://stepgndec.com/syllabus/cpp.pdf",
  },
  {
    title: "Java",
    slug: "java-training",
    code: "TRN-JAV-208",
    description: "Core and Advanced Java training including multithreading, collections, JDBC, and enterprise application basics.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech/BCA/MCA",
    syllabusUrl: "https://stepgndec.com/syllabus/java.pdf",
  },
  {
    title: "DBMS",
    slug: "dbms-sql",
    code: "TRN-DBM-209",
    description: "Master Database Management Systems with SQL. Learn schema design, normalization, and query optimization.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech/BCA/MCA",
    syllabusUrl: "https://stepgndec.com/syllabus/dbms.pdf",
  },
  {
    title: "CCNA",
    slug: "ccna-networking",
    code: "TRN-CNA-210",
    description: "Cisco Certified Network Associate training covering network fundamentals, IP connectivity, security fundamentals, and automation.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech (CSE/IT/ECE)",
    syllabusUrl: "https://stepgndec.com/syllabus/ccna.pdf",
  },
  {
    title: "PHP",
    slug: "php-training",
    code: "TRN-PHP-211",
    description: "Server-side scripting with PHP. Learn to build dynamic websites and integrate with MySQL databases.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech/BCA/MCA",
    syllabusUrl: "https://stepgndec.com/syllabus/php.pdf",
  },
  {
    title: "Auto CAD",
    slug: "auto-cad",
    code: "TRN-AUT-212",
    description: "Professional training in 2D drafting and 3D modeling using AutoCAD software for engineering design.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech (Mech/Civil)",
    syllabusUrl: "https://stepgndec.com/syllabus/autocad.pdf",
  },
  {
    title: "Solid Works",
    slug: "solid-works",
    code: "TRN-SOL-213",
    description: "Learn 3D CAD design with SolidWorks. Covers part modeling, assembly, and simulation.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech (Mech)",
    syllabusUrl: "https://stepgndec.com/syllabus/solidworks.pdf",
  },
  {
    title: "CREO",
    slug: "creo",
    code: "TRN-CRE-214",
    description: "Advanced parametric 3D modeling training using CREO for product design and development.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech (Mech)",
    syllabusUrl: "https://stepgndec.com/syllabus/creo.pdf",
  },
  {
    title: "ANSYS",
    slug: "ansys",
    code: "TRN-ANS-215",
    description: "Simulation and analysis training using ANSYS. Learn Finite Element Analysis (FEA) for structural and thermal problems.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech (Mech)",
    syllabusUrl: "https://stepgndec.com/syllabus/ansys.pdf",
  },
  {
    title: "STAAD PRO",
    slug: "staad-pro",
    code: "TRN-STA-216",
    description: "Structural analysis and design software training for Civil Engineers using STAAD.Pro.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech (Civil)",
    syllabusUrl: "https://stepgndec.com/syllabus/staadpro.pdf",
  },
  {
    title: "CATIA",
    slug: "catia",
    code: "TRN-CAT-217",
    description: "High-end CAD/CAM/CAE software training. Master surface modeling and advanced assembly design.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech (Mech)",
    syllabusUrl: "https://stepgndec.com/syllabus/catia.pdf",
  },
  {
    title: "CNC Programming",
    slug: "cnc-programming",
    code: "TRN-CNC-218",
    description: "Learn to program and operate CNC machines. Covers G-code, M-code, and machining cycles.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech (Mech)",
    syllabusUrl: "https://stepgndec.com/syllabus/cnc.pdf",
  },
  {
    title: "Industrial Automation (PLC/SCADA)",
    slug: "industrial-automation-plc-scada",
    code: "TRN-AUT-219",
    description: "Comprehensive training in Industrial Automation including PLC programming, SCADA systems, and HMI design.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech (ECE/EE)",
    syllabusUrl: "https://stepgndec.com/syllabus/automation.pdf",
  },
  {
    title: "Embedded System",
    slug: "embedded-system",
    code: "TRN-EMB-220",
    description: "Design and program embedded systems using microcontrollers like 8051, AVR, and PIC.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech (ECE/EE)",
    syllabusUrl: "https://stepgndec.com/syllabus/embedded.pdf",
  },
  {
    title: "MATLAB",
    slug: "matlab",
    code: "TRN-MAT-221",
    description: "Numerical computing and algorithm development using MATLAB. Includes Simulink for system modeling.",
    type: CourseType.INDUSTRIAL_TRAINING,
    duration: "6 Weeks / 6 Months",
    eligibility: "B.Tech (ECE/EE)",
    syllabusUrl: "https://stepgndec.com/syllabus/matlab.pdf",
  }
];

async function main() {
  console.log('🌱 Starting course seeding...');

  for (const course of courses) {
    // Generate highlights dynamically based on the finalized title
    const highlights = getHighlights(course.title);

    const result = await prisma.course.upsert({
      where: { code: course.code },
      update: {
        ...course,
        highlights: highlights,
      },
      create: {
        ...course,
        highlights: highlights,
      },
    });
    console.log(`✅ Upserted: ${result.title} (${result.code})`);
  }

  console.log('✨ Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
