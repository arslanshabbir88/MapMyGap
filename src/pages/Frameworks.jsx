import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';

const DEFAULT_FRAMEWORK = 'nist-csf';

const Frameworks = ({ onShowLogin, onShowSignup }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const frameworks = {
    'nist-csf': {
      name: "NIST CSF",
      fullName: "NIST Cybersecurity Framework",
      version: "Version 2.0",
      description: "A voluntary framework for managing and reducing cybersecurity risk (106 controls across 6 functions).",
      overview: "The NIST Cybersecurity Framework provides a common language for understanding, managing, and expressing cybersecurity risk both internally and externally. It can be used to help identify and prioritize actions for reducing cybersecurity risk.",
      icon: "🔄",
      color: "from-green-600 to-green-700",
      categories: [
        {
          name: "Identify (ID)",
          description: "The organization's current cybersecurity risks are understood (21 controls)",
          controls: ["ID.AM-01", "ID.AM-02", "ID.AM-03", "ID.AM-04", "ID.AM-05", "ID.AM-07", "ID.AM-08", "ID.RA-01", "ID.RA-02", "ID.RA-03", "ID.RA-04", "ID.RA-05", "ID.RA-06", "ID.RA-07", "ID.RA-08", "ID.RA-09", "ID.RA-10", "ID.IM-01", "ID.IM-02", "ID.IM-03", "ID.IM-04"]
        },
        {
          name: "Protect (PR)",
          description: "Safeguards to manage the organization's cybersecurity risks are used (22 controls)",
          controls: ["PR.AA-01", "PR.AA-02", "PR.AA-03", "PR.AA-04", "PR.AA-05", "PR.AA-06", "PR.AT-01", "PR.AT-02", "PR.DS-01", "PR.DS-02", "PR.DS-10", "PR.DS-11", "PR.PS-01", "PR.PS-02", "PR.PS-03", "PR.PS-04", "PR.PS-05", "PR.PS-06", "PR.IR-01", "PR.IR-02", "PR.IR-03", "PR.IR-04"]
        },
        {
          name: "Detect (DE)",
          description: "Possible cybersecurity attacks and compromises are found and analyzed (11 controls)",
          controls: ["DE.CM-01", "DE.CM-02", "DE.CM-03", "DE.CM-06", "DE.CM-09", "DE.AE-02", "DE.AE-03", "DE.AE-04", "DE.AE-06", "DE.AE-07", "DE.AE-08"]
        },
        {
          name: "Respond (RS)",
          description: "Actions regarding a detected cybersecurity incident are taken (13 controls)",
          controls: ["RS.MA-01", "RS.MA-02", "RS.MA-03", "RS.MA-04", "RS.MA-05", "RS.AN-03", "RS.AN-06", "RS.AN-07", "RS.AN-08", "RS.CO-02", "RS.CO-03", "RS.MI-01", "RS.MI-02"]
        },
        {
          name: "Recover (RC)",
          description: "Assets and operations affected by a cybersecurity incident are restored (8 controls)",
          controls: ["RC.RP-01", "RC.RP-02", "RC.RP-03", "RC.RP-04", "RC.RP-05", "RC.RP-06", "RC.CO-03", "RC.CO-04"]
        },
        {
          name: "Govern (GV)",
          description: "The organization's cybersecurity risk management strategy, expectations, and policy are established, communicated, and monitored (31 controls)",
          controls: ["GV.OC-01", "GV.OC-02", "GV.OC-03", "GV.OC-04", "GV.OC-05", "GV.RM-01", "GV.RM-02", "GV.RM-03", "GV.RM-04", "GV.RM-05", "GV.RM-06", "GV.RM-07", "GV.RR-01", "GV.RR-02", "GV.RR-03", "GV.RR-04", "GV.PO-01", "GV.PO-02", "GV.OV-01", "GV.OV-02", "GV.OV-03", "GV.SC-01", "GV.SC-02", "GV.SC-03", "GV.SC-04", "GV.SC-05", "GV.SC-06", "GV.SC-07", "GV.SC-08", "GV.SC-09", "GV.SC-10"]
        }
      ],
      useCases: [
        "Small to medium businesses",
        "Critical infrastructure",
        "State and local governments",
        "Educational institutions",
        "Manufacturing companies",
        "Any organization seeking cybersecurity improvement"
      ]
    },
    'nist-800-53': {
      name: "NIST SP 800-53",
      fullName: "NIST Special Publication 800-53",
      version: "Revision 5",
      description: "The definitive catalog of security and privacy controls for federal information systems and organizations.",
      overview: "NIST SP 800-53 provides a comprehensive set of security and privacy controls that federal agencies and organizations can use to protect their information systems. It's widely adopted across government, healthcare, finance, and other regulated industries.",
      icon: "🛡️",
      color: "from-blue-600 to-blue-700",
      categories: [
        {
          name: "Access Control (AC)",
          description: "Controls that limit and monitor system access",
          controls: ["AC-1", "AC-2", "AC-3", "AC-4", "AC-5", "AC-6", "AC-7", "AC-8", "AC-9", "AC-10", "AC-11", "AC-12", "AC-13", "AC-14", "AC-15", "AC-16", "AC-17", "AC-18", "AC-19", "AC-20", "AC-21", "AC-22", "AC-23", "AC-24", "AC-25"]
        },
        {
          name: "Audit and Accountability (AU)",
          description: "Controls for system monitoring and audit trails",
          controls: ["AU-1", "AU-2", "AU-3", "AU-4", "AU-5", "AU-6", "AU-7", "AU-8", "AU-9", "AU-10", "AU-11", "AU-12", "AU-13", "AU-14"]
        },
        {
          name: "Configuration Management (CM)",
          description: "Controls for system configuration and change management",
          controls: ["CM-1", "CM-2", "CM-3", "CM-4", "CM-5", "CM-6", "CM-7", "CM-8", "CM-9", "CM-10", "CM-11", "CM-12"]
        },
        {
          name: "Identification and Authentication (IA)",
          description: "Controls for user identification and authentication",
          controls: ["IA-1", "IA-2", "IA-3", "IA-4", "IA-5", "IA-6", "IA-7", "IA-8", "IA-9", "IA-10", "IA-11", "IA-12", "IA-13"]
        },
        {
          name: "Incident Response (IR)",
          description: "Controls for security incident handling",
          controls: ["IR-1", "IR-2", "IR-3", "IR-4", "IR-5", "IR-6", "IR-7", "IR-8", "IR-9", "IR-10", "IR-11", "IR-12"]
        },
        {
          name: "Maintenance (MA)",
          description: "Controls for system maintenance activities",
          controls: ["MA-1", "MA-2", "MA-3", "MA-4", "MA-5", "MA-6"]
        },
        {
          name: "Media Protection (MP)",
          description: "Controls for media handling and protection",
          controls: ["MP-1", "MP-2", "MP-3", "MP-4", "MP-5", "MP-6", "MP-7", "MP-8"]
        },
        {
          name: "Physical and Environmental Protection (PE)",
          description: "Controls for physical security and environmental controls",
          controls: ["PE-1", "PE-2", "PE-3", "PE-4", "PE-5", "PE-6", "PE-7", "PE-8", "PE-9", "PE-10", "PE-11", "PE-12", "PE-13", "PE-14", "PE-15", "PE-16", "PE-17", "PE-18", "PE-19", "PE-20", "PE-21", "PE-22", "PE-23"]
        },
        {
          name: "Planning (PL)",
          description: "Controls for security planning and policy",
          controls: ["PL-1", "PL-2", "PL-3", "PL-4", "PL-5", "PL-6", "PL-7", "PL-8", "PL-9", "PL-10", "PL-11"]
        },
        {
          name: "Program Management (PM)",
          description: "Controls for security program management",
          controls: ["PM-1", "PM-2", "PM-3", "PM-4", "PM-5", "PM-6", "PM-7", "PM-8", "PM-9", "PM-10", "PM-11", "PM-12", "PM-13", "PM-14", "PM-15", "PM-16", "PM-17", "PM-18", "PM-19", "PM-20", "PM-21", "PM-22", "PM-23", "PM-24", "PM-25", "PM-26", "PM-27", "PM-28", "PM-29", "PM-30", "PM-31", "PM-32"]
        },
        {
          name: "Personnel Security (PS)",
          description: "Controls for personnel screening and management",
          controls: ["PS-1", "PS-2", "PS-3", "PS-4", "PS-5", "PS-6", "PS-7", "PS-8", "PS-9"]
        },
        {
          name: "Risk Assessment (RA)",
          description: "Controls for security risk assessment",
          controls: ["RA-1", "RA-2", "RA-3", "RA-4", "RA-5", "RA-6", "RA-7", "RA-8", "RA-9"]
        },
        {
          name: "System and Communications Protection (SC)",
          description: "Controls for system and communications security",
          controls: ["SC-1", "SC-2", "SC-3", "SC-4", "SC-5", "SC-6", "SC-7", "SC-8", "SC-9", "SC-10", "SC-11", "SC-12", "SC-13", "SC-14", "SC-15", "SC-16", "SC-17", "SC-18", "SC-19", "SC-20", "SC-21", "SC-22", "SC-23", "SC-24", "SC-25", "SC-26", "SC-27", "SC-28", "SC-29", "SC-30", "SC-31", "SC-32", "SC-33", "SC-34", "SC-35", "SC-36", "SC-37", "SC-38", "SC-39", "SC-40", "SC-41", "SC-42", "SC-43", "SC-44", "SC-45", "SC-46", "SC-47", "SC-48", "SC-49", "SC-50", "SC-51", "SC-52", "SC-53"]
        },
        {
          name: "System and Information Integrity (SI)",
          description: "Controls for system integrity and information protection",
          controls: ["SI-1", "SI-2", "SI-3", "SI-4", "SI-5", "SI-6", "SI-7", "SI-8", "SI-9", "SI-10", "SI-11", "SI-12", "SI-13", "SI-14", "SI-15", "SI-16", "SI-17", "SI-18", "SI-19", "SI-20", "SI-21", "SI-22", "SI-23", "SI-24", "SI-25"]
        },
        {
          name: "Supply Chain Risk Management (SR)",
          description: "Controls for supply chain security",
          controls: ["SR-1", "SR-2", "SR-3", "SR-4", "SR-5", "SR-6", "SR-7", "SR-8", "SR-9", "SR-10", "SR-11", "SR-12", "SR-13", "SR-14", "SR-15", "SR-16", "SR-17", "SR-18", "SR-19", "SR-20", "SR-21", "SR-22", "SR-23", "SR-24", "SR-25", "SR-26", "SR-27", "SR-28", "SR-29", "SR-30", "SR-31", "SR-32", "SR-33", "SR-34", "SR-35", "SR-36"]
        }
      ],
      useCases: [
        "Federal government agencies",
        "Healthcare organizations (HIPAA)",
        "Financial institutions",
        "Defense contractors",
        "Critical infrastructure",
        "Cloud service providers"
      ]
    },
    'nist-800-63': {
      name: "NIST SP 800-63",
      fullName: "NIST Special Publication 800-63",
      version: "Digital Identity Guidelines",
      description: "Guidelines for digital identity services and authentication systems.",
      overview: "NIST SP 800-63 provides guidelines for digital identity services, including identity proofing, registration, authenticators, management processes, authentication protocols, and related assertions. It's essential for organizations implementing digital identity systems.",
      icon: "🔐",
      color: "from-indigo-600 to-indigo-700",
      categories: [
        {
          name: "Identity Assurance Levels (IAL)",
          description: "Identity proofing and registration requirements",
          controls: ["IAL1", "IAL2", "IAL3"]
        },
        {
          name: "Authenticator Assurance Levels (AAL)",
          description: "Authentication mechanism requirements",
          controls: ["AAL1", "AAL2", "AAL3"]
        },
        {
          name: "Federation Assurance Levels (FAL)",
          description: "Federation and assertion requirements",
          controls: ["FAL1", "FAL2", "FAL3"]
        },
        {
          name: "Identity Proofing",
          description: "Processes for verifying identity",
          controls: ["IP1", "IP2", "IP3", "IP4", "IP5", "IP6", "IP7"]
        },
        {
          name: "Registration",
          description: "Identity registration processes",
          controls: ["REG1", "REG2", "REG3", "REG4", "REG5", "REG6", "REG7"]
        },
        {
          name: "Authentication",
          description: "Authentication mechanisms and protocols",
          controls: ["AUTH1", "AUTH2", "AUTH3", "AUTH4", "AUTH5", "AUTH6"]
        }
      ],
      useCases: [
        "Government agencies",
        "Financial institutions",
        "Healthcare organizations",
        "Educational institutions",
        "Cloud service providers",
        "Any organization with digital identity systems"
      ]
    },
    'soc1': {
      name: "SOC 1",
      fullName: "System and Organization Controls 1",
      version: "Type II",
      description: "AICPA's framework for reporting on controls at service organizations related to financial reporting (13 controls)",
      overview: "SOC 1 is designed for service organizations that provide services to user entities that are relevant to those user entities' internal control over financial reporting. It focuses on controls that are likely to be relevant to an audit of a user entity's financial statements.",
      icon: "📋",
      color: "from-blue-600 to-blue-700",
      categories: [
        {
          name: "Control Environment (CC1)",
          description: "The organization demonstrates a commitment to integrity and ethical values (5 controls)",
          controls: ["CC1.1", "CC1.2", "CC1.3", "CC1.4", "CC1.5"]
        },
        {
          name: "Communication and Information (CC2)",
          description: "The organization obtains, generates, and uses relevant, quality information to support internal control (3 controls)",
          controls: ["CC2.1", "CC2.2", "CC2.3"]
        },
        {
          name: "Risk Assessment (CC3)",
          description: "The organization specifies suitable objectives and identifies and analyzes risks to achievement of those objectives (3 controls)",
          controls: ["CC3.1", "CC3.2", "CC3.3"]
        },
        {
          name: "Monitoring Activities (CC4)",
          description: "The organization selects, develops, and performs ongoing and/or separate evaluations to ascertain whether components of internal control are present and functioning (2 controls)",
          controls: ["CC4.1", "CC4.2"]
        },
        {
          name: "Control Activities (CC5)",
          description: "The organization selects and develops control activities that contribute to the mitigation of risks to achievement of objectives (3 controls)",
          controls: ["CC5.1", "CC5.2", "CC5.3"]
        }
      ],
      useCases: [
        "Service organizations",
        "Outsourced financial services",
        "Payroll processors",
        "Benefit administrators",
        "Financial institutions",
        "Technology service providers"
      ]
    },
    'soc2': {
      name: "SOC 2",
      fullName: "System and Organization Controls 2",
      version: "Type II",
      description: "AICPA's framework for reporting on controls at service organizations.",
      overview: "SOC 2 is a voluntary compliance standard for service organizations that demonstrates they have implemented appropriate controls to protect customer data. It's based on five Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy.",
      icon: "📊",
      color: "from-orange-600 to-orange-700",
      categories: [
        {
          name: "Security (SEC)",
          description: "Protection against unauthorized access and disclosure (38 Common Criteria)",
          controls: ["CC1.1", "CC1.2", "CC1.3", "CC1.4", "CC1.5", "CC2.1", "CC2.2", "CC2.3", "CC3.1", "CC3.2", "CC3.3", "CC3.4", "CC4.1", "CC4.2", "CC5.1", "CC5.2", "CC5.3", "CC6.1", "CC6.2", "CC6.3", "CC6.4", "CC6.5", "CC6.6", "CC6.7", "CC6.8", "CC7.1", "CC7.2", "CC7.3", "CC7.4", "CC7.5", "CC8.1", "CC8.2", "CC8.3", "CC8.4", "CC8.5", "CC9.1", "CC9.2", "CC9.3"]
        },
        {
          name: "Availability (A)",
          description: "System availability for operation and use (5 Availability controls)",
          controls: ["A1.1", "A1.2", "A1.3", "A1.4", "A1.5"]
        },
        {
          name: "Processing Integrity (PI)",
          description: "System processing is complete, accurate, timely, and authorized (5 PI controls)",
          controls: ["PI1.1", "PI1.2", "PI1.3", "PI1.4", "PI1.5"]
        },
        {
          name: "Confidentiality (C)",
          description: "Information designated as confidential is protected (5 Confidentiality controls)",
          controls: ["C1.1", "C1.2", "C1.3", "C1.4", "C1.5"]
        },
        {
          name: "Privacy (P)",
          description: "Personal information is collected, used, retained, disclosed, and disposed of in conformity with commitments (5 Privacy controls)",
          controls: ["P1.1", "P1.2", "P1.3", "P1.4", "P1.5"]
        }
      ],
      useCases: [
        "Cloud service providers",
        "SaaS companies",
        "Data centers",
        "Managed service providers",
        "Technology companies",
        "Financial services"
      ]
    },
    'iso-27001': {
      name: "ISO 27001",
      fullName: "ISO/IEC 27001 Information Security Management",
      version: "2022",
      description: "International standard for information security management systems.",
      overview: "ISO 27001 is the international standard for information security management systems (ISMS). It provides a framework for managing and protecting information assets through risk management and security controls.",
      icon: "🌍",
      color: "from-purple-600 to-purple-700",
      categories: [
        {
          name: "Organizational Controls",
          description: "Controls related to organizational structure and policies",
          controls: ["5.1", "5.2", "5.3", "6.1", "6.2", "6.3", "7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8", "7.9", "7.10", "7.11", "7.12", "7.13", "7.14", "7.15", "7.16", "7.17", "7.18", "7.19", "7.20", "7.21", "7.22", "7.23", "7.24", "7.25", "7.26", "7.27", "7.28", "7.29", "7.30", "7.31", "7.32", "7.33", "7.34", "7.35", "7.36", "7.37"]
        },
        {
          name: "People Controls",
          description: "Controls related to human resources and personnel",
          controls: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.11", "6.12", "6.13", "6.14", "6.15", "6.16", "6.17", "6.18", "6.19", "6.20", "6.21", "6.22", "6.23", "6.24", "6.25", "6.26", "6.27", "6.28", "6.29", "6.30", "6.31", "6.32", "6.33", "6.34", "6.35", "6.36", "6.37", "6.38", "6.39", "6.40", "6.41", "6.42", "6.43", "6.44", "6.45", "6.46", "6.47", "6.48", "6.49", "6.50", "6.51", "6.52", "6.53", "6.54", "6.55", "6.56", "6.57", "6.58", "6.59", "6.60", "6.61", "6.62", "6.63", "6.64", "6.65", "6.66", "6.67", "6.68", "6.69", "6.70", "6.71", "6.72", "6.73", "6.74", "6.75", "6.76", "6.77", "6.78", "6.79", "6.80", "6.81", "6.82", "6.83", "6.84", "6.85", "6.86", "6.87", "6.88", "6.89", "6.90", "6.91", "6.92", "6.93"]
        },
        {
          name: "Physical Controls",
          description: "Controls related to physical security and environment",
          controls: ["7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8", "7.9", "7.10", "7.11", "7.12", "7.13", "7.14", "7.15", "7.16", "7.17", "7.18", "7.19", "7.20", "7.21", "7.22", "7.23", "7.24", "7.25", "7.26", "7.27", "7.28", "7.29", "7.30", "7.31", "7.32", "7.33", "7.34", "7.35", "7.36", "7.37"]
        },
        {
          name: "Technological Controls",
          description: "Controls related to technology and systems",
          controls: ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8", "8.9", "8.10", "8.11", "8.12", "8.13", "8.14", "8.15", "8.16", "8.17", "8.18", "8.19", "8.20", "8.21", "8.22", "8.23", "8.24", "8.25", "8.26", "8.27", "8.28", "8.29", "8.30", "8.31", "8.32", "8.33", "8.34", "8.35", "8.36", "8.37", "8.38", "8.39", "8.40", "8.41", "8.42", "8.43", "8.44", "8.45", "8.46", "8.47", "8.48", "8.49", "8.50", "8.51", "8.52", "8.53", "8.54", "8.55", "8.56", "8.57", "8.58", "8.59", "8.60", "8.61", "8.62", "8.63", "8.64", "8.65", "8.66", "8.67", "8.68", "8.69", "8.70", "8.71", "8.72", "8.73", "8.74", "8.75", "8.76", "8.77", "8.78", "8.79", "8.80", "8.81", "8.82", "8.83", "8.84", "8.85", "8.86", "8.87", "8.88", "8.89", "8.90", "8.91", "8.92", "8.93"]
        }
      ],
      useCases: [
        "International organizations",
        "European companies (GDPR)",
        "Technology companies",
        "Financial services",
        "Healthcare organizations",
        "Government agencies"
      ]
    },
    'pci-dss': {
      name: "PCI DSS",
      fullName: "Payment Card Industry Data Security Standard",
      version: "v4.0",
      description: "Security standard for organizations that handle credit card information.",
      overview: "PCI DSS is a set of security standards designed to ensure that all companies that process, store, or transmit credit card information maintain a secure environment. It's mandatory for any organization that handles payment card data.",
      icon: "💳",
      color: "from-red-600 to-red-700",
      categories: [
        {
          name: "Build and Maintain a Secure Network and Systems",
          description: "Install and maintain a firewall configuration and vendor-supplied security patches",
          controls: ["Requirement 1", "Requirement 2"]
        },
        {
          name: "Protect Cardholder Data",
          description: "Protect stored cardholder data and encrypt transmission of cardholder data across open networks",
          controls: ["Requirement 3", "Requirement 4"]
        },
        {
          name: "Maintain a Vulnerability Management Program",
          description: "Use and regularly update anti-virus software and develop and maintain secure systems and applications",
          controls: ["Requirement 5", "Requirement 6"]
        },
        {
          name: "Implement Strong Access Control Measures",
          description: "Restrict access to cardholder data and assign unique ID to each person with computer access",
          controls: ["Requirement 7", "Requirement 8", "Requirement 9"]
        },
        {
          name: "Regularly Monitor and Test Networks",
          description: "Track and monitor all access to network resources and cardholder data and regularly test security systems and processes",
          controls: ["Requirement 10", "Requirement 11"]
        },
        {
          name: "Maintain an Information Security Policy",
          description: "Maintain a policy that addresses information security for all personnel",
          controls: ["Requirement 12"]
        }
      ],
      useCases: [
        "Retail businesses",
        "E-commerce websites",
        "Restaurants and hospitality",
        "Financial institutions",
        "Healthcare providers",
        "Any organization processing payments"
      ]
    },
    'nydfs-500': {
      name: "NYDFS Part 500",
      fullName: "NYDFS Cybersecurity Regulation",
      version: "Part 500",
      description: "New York State Department of Financial Services cybersecurity requirements for financial institutions.",
      overview: "NYDFS Part 500 establishes cybersecurity requirements for financial services companies operating in New York. The regulation mandates comprehensive cybersecurity programs, incident response capabilities, and regular assessments to protect consumers and ensure the safety of the financial services industry.",
      icon: "🏛️",
      color: "from-blue-600 to-blue-700",
      categories: [
        {
          name: "Cybersecurity Program (500.02)",
          description: "Establish and maintain a cybersecurity program designed to protect information systems",
          controls: ["500.02(a)", "500.02(b)", "500.02(c)"]
        },
        {
          name: "Cybersecurity Policy (500.03)",
          description: "Implement written cybersecurity policy approved by senior management",
          controls: ["500.03(a)", "500.03(b)", "500.03(c)"]
        },
        {
          name: "Chief Information Security Officer (500.04)",
          description: "Designate qualified individual to serve as CISO",
          controls: ["500.04(a)", "500.04(b)", "500.04(c)", "500.04(d)"]
        },
        {
          name: "Penetration Testing (500.05)",
          description: "Conduct periodic penetration testing and vulnerability assessments",
          controls: ["500.05(a)", "500.05(b)", "500.05(c)", "500.05(d)"]
        },
        {
          name: "Audit Trail (500.06)",
          description: "Maintain audit trail of all user access and administrative actions",
          controls: ["500.06(a)", "500.06(b)", "500.06(c)"]
        },
        {
          name: "Access Privileges (500.07)",
          description: "Limit user access privileges and periodically review access",
          controls: ["500.07(a)", "500.07(b)", "500.07(c)"]
        },
        {
          name: "Application Security (500.08)",
          description: "Develop, maintain, and test application security procedures",
          controls: ["500.08(a)", "500.08(b)", "500.08(c)"]
        },
        {
          name: "Risk Assessment (500.09)",
          description: "Conduct periodic risk assessments to inform cybersecurity program design",
          controls: ["500.09(a)", "500.09(b)", "500.09(c)"]
        },
        {
          name: "Cybersecurity Personnel (500.10)",
          description: "Employ qualified cybersecurity personnel and utilize intelligence",
          controls: ["500.10(a)", "500.10(b)", "500.10(c)"]
        },
        {
          name: "Third-Party Security (500.11)",
          description: "Implement policies for third-party service provider security",
          controls: ["500.11(a)", "500.11(b)", "500.11(c)"]
        },
        {
          name: "Multi-Factor Authentication (500.12)",
          description: "Implement multi-factor authentication for access to information systems",
          controls: ["500.12(a)", "500.12(b)", "500.12(c)"]
        },
        {
          name: "Data Retention (500.13)",
          description: "Implement data retention policies and procedures",
          controls: ["500.13(a)", "500.13(b)", "500.13(c)"]
        },
        {
          name: "Training and Monitoring (500.14)",
          description: "Provide cybersecurity training and implement monitoring capabilities",
          controls: ["500.14(a)", "500.14(b)", "500.14(c)", "500.14(d)"]
        },
        {
          name: "Encryption (500.15)",
          description: "Implement encryption for nonpublic information",
          controls: ["500.15(a)", "500.15(b)", "500.15(c)"]
        },
        {
          name: "Incident Response (500.16)",
          description: "Establish incident response plan for cybersecurity events",
          controls: ["500.16(a)", "500.16(b)", "500.16(c)", "500.16(d)"]
        },
        {
          name: "Notices to Superintendent (500.17)",
          description: "Notify NYDFS of cybersecurity events and other required notifications",
          controls: ["500.17(a)", "500.17(b)", "500.17(c)"]
        },
        {
          name: "Confidentiality (500.18)",
          description: "Maintain confidentiality of information provided to NYDFS",
          controls: ["500.18(a)", "500.18(b)"]
        },
        {
          name: "Exemptions (500.19)",
          description: "Understand and document any applicable exemptions",
          controls: ["500.19(a)", "500.19(b)"]
        },
        {
          name: "Effective Date (500.20)",
          description: "Ensure compliance with effective dates and ongoing requirements",
          controls: ["500.20(a)", "500.20(b)"]
        }
      ],
      useCases: [
        "Financial institutions in New York",
        "Banks and credit unions",
        "Insurance companies",
        "Mortgage companies",
        "Money transmitters",
        "Virtual currency businesses",
        "Any NYDFS-regulated entity"
      ]
    },
    'hipaa': {
      name: "HIPAA",
      fullName: "Health Insurance Portability and Accountability Act",
      version: "2022",
      description: "Federal law protecting health information privacy and security.",
      overview: "HIPAA establishes national standards for the protection of certain health information. It includes the Privacy Rule, Security Rule, Breach Notification Rule, and Enforcement Rule, with comprehensive requirements for administrative, physical, and technical safeguards.",
      icon: "🏥",
      color: "from-emerald-600 to-emerald-700",
      categories: [
        {
          name: "Administrative Safeguards",
          description: "Administrative policies and procedures for protecting health information",
          controls: ["164.308(a)(1)", "164.308(a)(2)", "164.308(a)(3)", "164.308(a)(4)", "164.308(a)(5)", "164.308(a)(6)", "164.308(a)(7)", "164.308(a)(8)", "164.308(b)(1)", "164.308(b)(2)", "164.308(b)(3)", "164.308(b)(4)", "164.308(b)(5)", "164.308(b)(6)", "164.308(b)(7)", "164.308(b)(8)", "164.308(b)(9)", "164.308(b)(10)", "164.308(b)(11)", "164.308(b)(12)", "164.308(b)(13)", "164.308(b)(14)", "164.308(b)(15)", "164.308(b)(16)", "164.308(b)(17)", "164.308(b)(18)", "164.308(b)(19)", "164.308(b)(20)", "164.308(b)(21)", "164.308(b)(22)", "164.308(b)(23)"]
        },
        {
          name: "Physical Safeguards",
          description: "Physical measures to protect health information systems",
          controls: ["164.310(a)(1)", "164.310(a)(2)", "164.310(a)(3)", "164.310(a)(4)", "164.310(b)", "164.310(c)", "164.310(d)(1)", "164.310(d)(2)", "164.310(d)(3)", "164.310(d)(4)", "164.310(d)(5)", "164.310(d)(6)"]
        },
        {
          name: "Technical Safeguards",
          description: "Technology-based measures to protect health information",
          controls: ["164.312(a)(1)", "164.312(a)(2)", "164.312(a)(3)", "164.312(a)(4)", "164.312(b)", "164.312(c)(1)", "164.312(c)(2)", "164.312(d)", "164.312(e)(1)", "164.312(e)(2)", "164.312(e)(3)", "164.312(f)", "164.312(g)", "164.312(h)"]
        },
        {
          name: "Organizational Requirements",
          description: "Requirements for business associate agreements and group health plans",
          controls: ["164.314(a)(1)", "164.314(a)(2)", "164.314(b)(1)", "164.314(b)(2)"]
        },
        {
          name: "Policies and Procedures",
          description: "Documentation requirements for policies and procedures",
          controls: ["164.316(a)", "164.316(b)(1)", "164.316(b)(2)"]
        },
        {
          name: "Privacy Rule",
          description: "Requirements for protecting individually identifiable health information",
          controls: ["164.502", "164.504", "164.506", "164.508", "164.510", "164.512", "164.514", "164.516", "164.518", "164.520", "164.522", "164.524"]
        },
        {
          name: "Breach Notification Rule",
          description: "Requirements for notifying individuals and HHS of breaches",
          controls: ["164.400", "164.402", "164.404", "164.406", "164.408", "164.410", "164.412", "164.414", "164.416", "164.418"]
        },
        {
          name: "Enforcement Rule",
          description: "Procedures for investigating and enforcing HIPAA violations",
          controls: ["160.300", "160.302", "160.304", "160.306", "160.308", "160.310", "160.312", "160.314"]
        }
      ],
      useCases: [
        "Healthcare providers",
        "Health plans",
        "Healthcare clearinghouses",
        "Business associates",
        "Covered entities",
        "Any organization handling health information"
      ]
    },
    'sox': {
      name: "SOX",
      fullName: "Sarbanes-Oxley Act of 2002",
      version: "Public Law 107-204",
      description: "Federal law establishing corporate governance and financial reporting requirements.",
      overview: "The Sarbanes-Oxley Act establishes requirements for public companies regarding financial reporting, internal controls, and corporate governance. It includes 11 titles covering everything from audit committee requirements to criminal penalties for corporate fraud.",
      icon: "⚖️",
      color: "from-amber-600 to-amber-700",
      categories: [
        {
          name: "Title I - PCAOB",
          description: "Public Company Accounting Oversight Board establishment and oversight",
          controls: ["101", "102", "103", "104", "105", "106", "107", "108", "109"]
        },
        {
          name: "Title II - Auditor Independence",
          description: "Requirements for auditor independence and non-audit services",
          controls: ["201", "202", "203", "204", "205", "206", "207", "208", "209"]
        },
        {
          name: "Title III - Corporate Responsibility",
          description: "Corporate governance and audit committee requirements",
          controls: ["301", "302", "303", "304", "305", "306", "307", "308", "309"]
        },
        {
          name: "Title IV - Enhanced Financial Disclosures",
          description: "Enhanced financial reporting and internal control requirements",
          controls: ["401", "402", "403", "404", "405", "406", "407", "408", "409"]
        },
        {
          name: "Title V - Analyst Conflicts of Interest",
          description: "Requirements for securities analysts and conflict management",
          controls: ["501", "502", "503", "504", "505", "506", "507", "508", "509"]
        },
        {
          name: "Title VI - Commission Resources and Authority",
          description: "SEC resources, enforcement authority, and regulatory oversight",
          controls: ["601", "602", "603", "604", "605", "606", "607", "608", "609"]
        },
        {
          name: "Title VII - Studies and Reports",
          description: "Required studies and reports on accounting industry",
          controls: ["701", "702", "703", "704", "705", "706", "707", "708", "709"]
        },
        {
          name: "Title VIII - Corporate and Criminal Fraud Accountability",
          description: "Criminal penalties and document protection requirements",
          controls: ["801", "802", "803", "804", "805", "806", "807", "808", "809"]
        },
        {
          name: "Title IX - White-Collar Crime Penalty Enhancements",
          description: "Enhanced penalties for white-collar crimes and sentencing",
          controls: ["901", "902", "903", "904", "905", "906", "907", "908", "909"]
        },
        {
          name: "Title X - Corporate Tax Returns",
          description: "Requirements for corporate tax return signatures",
          controls: ["1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009"]
        },
        {
          name: "Title XI - Corporate Fraud and Accountability",
          description: "Additional fraud accountability measures and enforcement",
          controls: ["1101", "1102", "1103", "1104", "1105", "1106", "1107", "1108", "1109"]
        }
      ],
      useCases: [
        "Public companies",
        "Audit firms",
        "Corporate boards",
        "Audit committees",
        "Financial institutions",
        "Any publicly traded organization"
      ]
    }
  };

  const fromUrl = searchParams.get('framework');
  const selectedFramework = fromUrl && Object.prototype.hasOwnProperty.call(frameworks, fromUrl)
    ? fromUrl
    : DEFAULT_FRAMEWORK;

  const handleSelectFramework = (key) => {
    setSearchParams({ framework: key });
  };

  const selectedFrameworkData = frameworks[selectedFramework];

  const baseUrl = 'https://mapmygap.com';
  const frameworksSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/frameworks#webpage`,
        url: `${baseUrl}/frameworks`,
        name: 'Supported Compliance Frameworks | MapMyGap',
        description: 'MapMyGap supports NIST CSF, NIST 800-53, ISO 27001, SOC 2, PCI DSS, HIPAA, SOX, NYDFS and more. AI-powered compliance gap analysis.',
        publisher: { '@id': `${baseUrl}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Compliance Frameworks', item: `${baseUrl}/frameworks` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Compliance Frameworks',
        description: 'Compliance frameworks supported by MapMyGap for gap analysis.',
        numberOfItems: Object.keys(frameworks).length,
        itemListElement: Object.entries(frameworks).map(([key, fw], i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: fw.name,
          url: `${baseUrl}/frameworks?framework=${key}`,
          description: fw.description,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(frameworksSchema) }} />
      <SharedNavigation onShowLogin={onShowLogin} onShowSignup={onShowSignup} />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 sm:py-32 text-center bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">Supported Compliance Frameworks</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              MapMyGap supports the most comprehensive set of cybersecurity compliance frameworks 
              to meet your organization's specific needs and regulatory requirements.
            </p>
          </div>
        </section>

      {/* Framework Selection */}
      <div className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(frameworks).map(([key, framework]) => (
              <button
                key={key}
                onClick={() => handleSelectFramework(key)}
                className={`p-4 rounded-lg text-center transition-all duration-200 ${
                  selectedFramework === key
                    ? 'bg-gradient-to-r ' + framework.color + ' text-white shadow-lg transform scale-105'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                }`}
              >
                <div className="text-3xl mb-2">{framework.icon}</div>
                <div className="text-sm font-semibold">{framework.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Framework Details */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
            {/* Framework Header */}
            <div className={`bg-gradient-to-r ${selectedFrameworkData.color} text-white p-8`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{selectedFrameworkData.icon}</div>
                <div>
                  <h2 className="text-4xl font-bold">{selectedFrameworkData.name}</h2>
                  <p className="text-xl text-blue-100">{selectedFrameworkData.fullName}</p>
                  <p className="text-lg text-blue-100">Version {selectedFrameworkData.version}</p>
                </div>
              </div>
              <p className="text-lg text-blue-100 max-w-4xl">
                {selectedFrameworkData.description}
              </p>
            </div>

            {/* Framework Content */}
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Overview */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    {selectedFrameworkData.overview}
                  </p>
                  
                  <h4 className="text-xl font-semibold text-white mb-3">Use Cases</h4>
                  <ul className="space-y-2">
                    {selectedFrameworkData.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-300">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Control Categories */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Control Categories</h3>
                  <div className="space-y-4">
                    {selectedFrameworkData.categories.map((category, index) => (
                      <div key={index} className="border border-slate-600 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">{category.name}</h4>
                        <p className="text-sm text-slate-300 mb-3">{category.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {category.controls.slice(0, 8).map((control, controlIndex) => (
                            <span key={controlIndex} className="px-2 py-1 bg-slate-700 text-slate-200 text-xs rounded">
                              {control}
                            </span>
                          ))}
                          {category.controls.length > 8 && (
                            <span className="px-2 py-1 bg-blue-900/50 text-blue-200 text-xs rounded">
                              +{category.controls.length - 8} more
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Framework Comparison */}
      <div className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Framework Comparison</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Choose the right framework for your organization's needs and regulatory requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(frameworks).map(([key, framework]) => (
              <div key={key} className="bg-slate-700/50 border border-slate-600 rounded-lg shadow-lg p-6">
                <div className={`bg-gradient-to-r ${framework.color} text-white text-4xl rounded-lg w-16 h-16 flex items-center justify-center mb-4`}>
                  {framework.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{framework.name}</h3>
                <p className="text-slate-300 mb-4">{framework.description}</p>
                <div className="text-sm text-slate-400">
                  <p><strong>Version:</strong> {framework.version}</p>
                  <p><strong>Categories:</strong> {framework.categories.length}</p>
                  <p><strong>Best For:</strong> {framework.useCases[0]}, {framework.useCases[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Analyze Your Compliance?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Upload your documents and let our AI analyze them against any of these frameworks. 
            Get comprehensive gap analysis and actionable recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Start Free Analysis
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="py-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/" className="text-blue-400 hover:text-blue-300 font-medium">
              ← Back to Home
            </Link>
            <div className="flex gap-4">
              <Link to="/how-it-works" className="text-blue-400 hover:text-blue-300 font-medium">
                How It Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
      </main>

      <SharedFooter />
    </div>
  );
};

export default Frameworks;
