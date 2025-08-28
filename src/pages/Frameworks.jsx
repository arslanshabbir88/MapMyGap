import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';

const Frameworks = () => {
  const [selectedFramework, setSelectedFramework] = useState('nist-800-53');

  const frameworks = {
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
    'nist-csf': {
      name: "NIST CSF",
      fullName: "NIST Cybersecurity Framework",
      version: "Version 2.0",
      description: "A voluntary framework for managing and reducing cybersecurity risk.",
      overview: "The NIST Cybersecurity Framework provides a common language for understanding, managing, and expressing cybersecurity risk both internally and externally. It can be used to help identify and prioritize actions for reducing cybersecurity risk.",
      icon: "🔄",
      color: "from-green-600 to-green-700",
      categories: [
        {
          name: "Identify (ID)",
          description: "Develop an organizational understanding to manage cybersecurity risk",
          controls: ["ID.AM", "ID.BE", "ID.GV", "ID.RA", "ID.RM", "ID.SC", "ID.SE"]
        },
        {
          name: "Protect (PR)",
          description: "Develop and implement appropriate safeguards",
          controls: ["PR.AC", "PR.AT", "PR.DS", "PR.IP", "PR.MA", "PR.PT"]
        },
        {
          name: "Detect (DE)",
          description: "Develop and implement appropriate activities to identify cybersecurity events",
          controls: ["DE.AE", "DE.CM", "DE.DP"]
        },
        {
          name: "Respond (RS)",
          description: "Develop and implement appropriate activities to take action regarding detected cybersecurity events",
          controls: ["RS.RP", "RS.CO", "RS.AN", "RS.MI", "RS.IM"]
        },
        {
          name: "Recover (RC)",
          description: "Develop and implement appropriate activities to maintain plans for resilience",
          controls: ["RC.RP", "RC.IM", "RC.CO"]
        },
        {
          name: "Govern (GV)",
          description: "Establish and monitor cybersecurity risk management strategy, expectations, and policy",
          controls: ["GV.OC", "GV.RO", "GV.IR", "GV.RE", "GV.AC", "GV.SC", "GV.IM", "GV.AS", "GV.RM", "GV.PO", "GV.PR", "GV.ED", "GV.TA", "GV.ST"]
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
          description: "Protection against unauthorized access and disclosure",
          controls: ["CC1.1", "CC1.2", "CC1.3", "CC1.4", "CC1.5", "CC1.6", "CC1.7", "CC1.8", "CC1.9", "CC2.1", "CC2.2", "CC2.3", "CC2.4", "CC2.5", "CC2.6", "CC2.7", "CC2.8", "CC2.9", "CC3.1", "CC3.2", "CC3.3", "CC3.4", "CC3.5", "CC3.6", "CC3.7", "CC3.8", "CC3.9", "CC4.1", "CC4.2", "CC4.3", "CC4.4", "CC4.5", "CC4.6", "CC4.7", "CC4.8", "CC4.9", "CC5.1", "CC5.2", "CC5.3", "CC5.4", "CC5.5", "CC5.6", "CC5.7", "CC5.8", "CC5.9", "CC6.1", "CC6.2", "CC6.3", "CC6.4", "CC6.5", "CC6.6", "CC6.7", "CC6.8", "CC6.9", "CC7.1", "CC7.2", "CC7.3", "CC7.4", "CC7.5", "CC7.6", "CC7.7", "CC7.8", "CC7.9", "CC8.1", "CC8.2", "CC8.3", "CC8.4", "CC8.5", "CC8.6", "CC8.7", "CC8.8", "CC8.9", "CC9.1", "CC9.2", "CC9.3", "CC9.4", "CC9.5", "CC9.6", "CC9.7", "CC9.8", "CC9.9"]
        },
        {
          name: "Availability (A)",
          description: "System availability for operation and use",
          controls: ["A1.1", "A1.2", "A1.3", "A1.4", "A1.5", "A1.6", "A1.7", "A1.8", "A1.9", "A2.1", "A2.2", "A2.3", "A2.4", "A2.5", "A2.6", "A2.7", "A2.8", "A2.9", "A3.1", "A3.2", "A3.3", "A3.4", "A3.5", "A3.6", "A3.7", "A3.8", "A3.9", "A4.1", "A4.2", "A4.3", "A4.4", "A4.5", "A4.6", "A4.7", "A4.8", "A4.9", "A5.1", "A5.2", "A5.3", "A5.4", "A5.5", "A5.6", "A5.7", "A5.8", "A5.9", "A6.1", "A6.2", "A6.3", "A6.4", "A6.5", "A6.6", "A6.7", "A6.8", "A6.9", "A7.1", "A7.2", "A7.3", "A7.4", "A7.5", "A7.6", "A7.7", "A7.8", "A7.9", "A8.1", "A8.2", "A8.3", "A8.4", "A8.5", "A8.6", "A8.7", "A8.8", "A8.9", "A9.1", "A9.2", "A9.3", "A9.4", "A9.5", "A9.6", "A9.7", "A9.8", "A9.9"]
        },
        {
          name: "Processing Integrity (PI)",
          description: "System processing is complete, accurate, timely, and authorized",
          controls: ["PI1.1", "PI1.2", "PI1.3", "PI1.4", "PI1.5", "PI1.6", "PI1.7", "PI1.8", "PI1.9", "PI2.1", "PI2.2", "PI2.3", "PI2.4", "PI2.5", "PI2.6", "PI2.7", "PI2.8", "PI2.9", "PI3.1", "PI3.2", "PI3.3", "PI3.4", "PI3.5", "PI3.6", "PI3.7", "PI3.8", "PI3.9", "PI4.1", "PI4.2", "PI4.3", "PI4.4", "PI4.5", "PI4.6", "PI4.7", "PI4.8", "PI4.9", "PI5.1", "PI5.2", "PI5.3", "PI5.4", "PI5.5", "PI5.6", "PI5.7", "PI5.8", "PI5.9", "PI6.1", "PI6.2", "PI6.3", "PI6.4", "PI6.5", "PI6.6", "PI6.7", "PI6.8", "PI6.9", "PI7.1", "PI7.2", "PI7.3", "PI7.4", "PI7.5", "PI7.6", "PI7.7", "PI7.8", "PI7.9", "PI8.1", "PI8.2", "PI8.3", "PI8.4", "PI8.5", "PI8.6", "PI8.7", "PI8.8", "PI8.9", "PI9.1", "PI9.2", "PI9.3", "PI9.4", "PI9.5", "PI9.6", "PI9.7", "PI9.8", "PI9.9"]
        },
        {
          name: "Confidentiality (C)",
          description: "Information designated as confidential is protected",
          controls: ["C1.1", "C1.2", "C1.3", "C1.4", "C1.5", "C1.6", "C1.7", "C1.8", "C1.9", "C2.1", "C2.2", "C2.3", "C2.4", "C2.5", "C2.6", "C2.7", "C2.8", "C2.9", "C3.1", "C3.2", "C3.3", "C3.4", "C3.5", "C3.6", "C3.7", "C3.8", "C3.9", "C4.1", "C4.2", "C4.3", "C4.4", "C4.5", "C4.6", "C4.7", "C4.8", "C4.9", "C5.1", "C5.2", "C5.3", "C5.4", "C5.5", "C5.6", "C5.7", "C5.8", "C5.9", "C6.1", "C6.2", "C6.3", "C6.4", "C6.5", "C6.6", "C6.7", "C6.8", "C6.9", "C7.1", "C7.2", "C7.3", "C7.4", "C7.5", "C7.6", "C7.7", "C7.8", "C7.9", "C8.1", "C8.2", "C8.3", "C8.4", "C8.5", "C8.6", "C8.7", "C8.8", "C8.9", "C9.1", "C9.2", "C9.3", "C9.4", "C9.5", "C9.6", "C9.7", "C9.8", "C9.9"]
        },
        {
          name: "Privacy (P)",
          description: "Personal information is collected, used, retained, disclosed, and disposed of in conformity with commitments",
          controls: ["P1.1", "P1.2", "P1.3", "P1.4", "P1.5", "P1.6", "P1.7", "P1.8", "P1.9", "P2.1", "P2.2", "P2.3", "P2.4", "P2.5", "P2.6", "P2.7", "P2.8", "P2.9", "P3.1", "P3.2", "P3.3", "P3.4", "P3.5", "P3.6", "P3.7", "P3.8", "P3.9", "P4.1", "P4.2", "P4.3", "P4.4", "P4.5", "P4.6", "P4.7", "P4.8", "P4.9", "P5.1", "P5.2", "P5.3", "P5.4", "P5.5", "P5.6", "P5.7", "P5.8", "P5.9", "P6.1", "P6.2", "P6.3", "P6.4", "P6.5", "P6.6", "P6.7", "P6.8", "P6.9", "P7.1", "P7.2", "P7.3", "P7.4", "P7.5", "P7.6", "P7.7", "P7.8", "P7.9", "P8.1", "P8.2", "P8.3", "P8.4", "P8.5", "P8.6", "P8.7", "P8.8", "P8.9", "P9.1", "P9.2", "P9.3", "P9.4", "P9.5", "P9.6", "P9.7", "P9.8", "P9.9"]
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
    }
  };

  const selectedFrameworkData = frameworks[selectedFramework];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <SharedNavigation />
      
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
      </div>

      {/* Framework Selection */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(frameworks).map(([key, framework]) => (
              <button
                key={key}
                onClick={() => setSelectedFramework(key)}
                className={`p-4 rounded-lg text-center transition-all duration-200 ${
                  selectedFramework === key
                    ? 'bg-gradient-to-r ' + framework.color + ' text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Overview</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedFrameworkData.overview}
                  </p>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Use Cases</h4>
                  <ul className="space-y-2">
                    {selectedFrameworkData.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Control Categories */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Control Categories</h3>
                  <div className="space-y-4">
                    {selectedFrameworkData.categories.map((category, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {category.controls.slice(0, 8).map((control, controlIndex) => (
                            <span key={controlIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {control}
                            </span>
                          ))}
                          {category.controls.length > 8 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
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
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Framework Comparison</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right framework for your organization's needs and regulatory requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(frameworks).map(([key, framework]) => (
              <div key={key} className="bg-white rounded-lg shadow-lg p-6">
                <div className={`bg-gradient-to-r ${framework.color} text-white text-4xl rounded-lg w-16 h-16 flex items-center justify-center mb-4`}>
                  {framework.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{framework.name}</h3>
                <p className="text-gray-600 mb-4">{framework.description}</p>
                <div className="text-sm text-gray-500">
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
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Home
            </Link>
            <div className="flex gap-4">
              <Link to="/how-it-works" className="text-blue-600 hover:text-blue-800 font-medium">
                How It Works →
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>

      <SharedFooter />
    </div>
  );
};

export default Frameworks;
