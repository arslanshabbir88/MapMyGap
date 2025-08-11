// Comprehensive Compliance Framework Controls
// This file provides structured control data for AI analysis

export const pciDSS = {
  name: "PCI DSS v4.0",
  description: "Payment Card Industry Data Security Standard",
  categories: [
    {
      name: "Build and Maintain a Secure Network and Systems",
      description: "Establish and maintain a secure network infrastructure",
      results: [
        {
          id: "PCI DSS 1.1.1",
          control: "All users are assigned a unique ID before allowing them to access system components or cardholder data",
          status: "gap",
          details: "User identification and authentication controls not implemented",
          recommendation: "Implement unique user ID assignment system with proper authentication mechanisms"
        },
        {
          id: "PCI DSS 1.1.2",
          control: "Logical access controls are implemented via an access control system(s)",
          status: "gap",
          details: "Access control system not in place",
          recommendation: "Deploy access control system with role-based permissions and least privilege principles"
        },
        {
          id: "PCI DSS 1.1.3",
          control: "Access to system components and data is restricted to authorized personnel only",
          status: "gap",
          details: "No access restrictions implemented",
          recommendation: "Implement access controls and user management procedures"
        },
        {
          id: "PCI DSS 1.2.1",
          control: "Security policies and operational procedures for managing network security are documented, in use, and known to all affected parties",
          status: "gap",
          details: "Security policies not documented or communicated",
          recommendation: "Create comprehensive security policies and ensure staff awareness"
        },
        {
          id: "PCI DSS 1.3.1",
          control: "Security policies and operational procedures for managing network security are documented, in use, and known to all affected parties",
          status: "gap",
          details: "Network security procedures not established",
          recommendation: "Document network security procedures and train relevant personnel"
        }
      ]
    },
    {
      name: "Protect Cardholder Data",
      description: "Protect stored cardholder data and secure transmission of cardholder data",
      results: [
        {
          id: "PCI DSS 3.1.1",
          control: "Keep cardholder data storage to a minimum by implementing data retention and disposal policies, procedures and processes",
          status: "gap",
          details: "Data retention policies not established",
          recommendation: "Develop data retention and disposal policies aligned with business needs and legal requirements"
        },
        {
          id: "PCI DSS 3.2.1",
          control: "Do not store sensitive authentication data after authorization (even if encrypted)",
          status: "gap",
          details: "Sensitive authentication data storage not controlled",
          recommendation: "Implement procedures to prevent storage of sensitive authentication data post-authorization"
        },
        {
          id: "PCI DSS 3.3.1",
          control: "Mask PAN when displayed (the first six and last four digits are the maximum number of digits to be displayed)",
          status: "gap",
          details: "PAN masking not implemented",
          recommendation: "Implement PAN masking in all displays and logs"
        },
        {
          id: "PCI DSS 3.4.1",
          control: "Render PAN unreadable anywhere it is stored (including on portable digital media, backup media, and in logs)",
          status: "gap",
          details: "PAN encryption not implemented",
          recommendation: "Implement strong encryption for PAN storage using industry-standard algorithms"
        }
      ]
    },
    {
      name: "Maintain Vulnerability Management Program",
      description: "Maintain security systems and develop secure applications",
      results: [
        {
          id: "PCI DSS 5.1.1",
          control: "Ensure that all system components and software are protected from known vulnerabilities by having the latest vendor-supplied security patches installed",
          status: "gap",
          details: "Patch management process not established",
          recommendation: "Implement automated patch management system with regular security updates"
        },
        {
          id: "PCI DSS 5.2.1",
          control: "Establish a process to identify and assign a risk ranking to newly discovered security vulnerabilities",
          status: "gap",
          details: "Vulnerability risk assessment process not implemented",
          recommendation: "Create vulnerability management program with risk ranking methodology"
        },
        {
          id: "PCI DSS 5.3.1",
          control: "Ensure that security policies and operational procedures for managing vulnerabilities are documented, in use, and known to all affected parties",
          status: "gap",
          details: "Vulnerability management procedures not documented",
          recommendation: "Document vulnerability management procedures and ensure staff awareness"
        }
      ]
    },
    {
      name: "Implement Strong Access Control Measures",
      description: "Restrict access to cardholder data on a need-to-know basis",
      results: [
        {
          id: "PCI DSS 7.1.1",
          control: "Define access needs for each role, including: system components and data resources that each role needs to access for their job function",
          status: "gap",
          details: "Role-based access control not defined",
          recommendation: "Define access requirements for each job role and implement role-based access controls"
        },
        {
          id: "PCI DSS 7.1.2",
          control: "Assign access based on individual personnel's job classification and function",
          status: "gap",
          details: "Individual access assignments not implemented",
          recommendation: "Implement individual access assignment system based on job requirements"
        },
        {
          id: "PCI DSS 7.1.3",
          control: "Document and maintain a list of service providers with access to cardholder data",
          status: "gap",
          details: "Service provider access documentation not maintained",
          recommendation: "Create and maintain service provider access inventory with regular reviews"
        }
      ]
    },
    {
      name: "Regularly Monitor and Test Networks",
      description: "Monitor all access to network resources and cardholder data",
      results: [
        {
          id: "PCI DSS 10.1.1",
          control: "Implement audit trails to link all access to system components to each individual user",
          status: "gap",
          details: "Audit trails not implemented",
          recommendation: "Implement comprehensive audit logging for all system access"
        },
        {
          id: "PCI DSS 10.2.1",
          control: "Automated audit trails are implemented for all system components",
          status: "gap",
          details: "Automated audit trails not in place",
          recommendation: "Deploy automated audit trail system across all system components"
        },
        {
          id: "PCI DSS 10.3.1",
          control: "Record at least the following audit trail entries for all system components for each event: user identification, type of event, date and time, success or failure indication, origination of event, and identity or name of affected data, system component, or resource",
          status: "gap",
          details: "Comprehensive audit trail requirements not met",
          recommendation: "Implement detailed audit logging with all required event information"
        }
      ]
    }
  ]
};

export const iso27001 = {
  name: "ISO/IEC 27001:2022",
  description: "Information Security Management System",
  categories: [
    {
      name: "Organizational Controls",
      description: "Controls that set the organizational context for information security",
      results: [
        {
          id: "A.5.1",
          control: "Information security policies",
          status: "gap",
          details: "Information security policies not established",
          recommendation: "Develop comprehensive information security policies aligned with business objectives"
        },
        {
          id: "A.5.2",
          control: "Information security roles and responsibilities",
          status: "gap",
          details: "Security roles and responsibilities not defined",
          recommendation: "Define and assign information security roles and responsibilities"
        },
        {
          id: "A.5.3",
          control: "Segregation of duties",
          status: "gap",
          details: "Duty segregation not implemented",
          recommendation: "Implement segregation of duties to prevent conflicts of interest"
        },
        {
          id: "A.5.4",
          control: "Management responsibilities",
          status: "gap",
          details: "Management security responsibilities not established",
          recommendation: "Establish clear management responsibilities for information security"
        },
        {
          id: "A.5.5",
          control: "Contact with authorities",
          status: "gap",
          details: "Authority contact procedures not established",
          recommendation: "Establish procedures for contacting relevant authorities"
        }
      ]
    },
    {
      name: "People Controls",
      description: "Controls that address human resource security",
      results: [
        {
          id: "A.6.1",
          control: "Screening",
          status: "gap",
          details: "Personnel screening procedures not implemented",
          recommendation: "Implement background screening for all personnel with access to information systems"
        },
        {
          id: "A.6.2",
          control: "Terms and conditions of employment",
          status: "gap",
          details: "Employment terms not include security requirements",
          recommendation: "Include information security responsibilities in employment terms and conditions"
        },
        {
          id: "A.6.3",
          control: "Information security awareness, education and training",
          status: "gap",
          details: "Security awareness training not provided",
          recommendation: "Implement regular information security awareness and training programs"
        },
        {
          id: "A.6.4",
          control: "Disciplinary process",
          status: "gap",
          details: "Disciplinary process for security violations not established",
          recommendation: "Establish disciplinary process for information security policy violations"
        },
        {
          id: "A.6.5",
          control: "Termination or change of employment",
          status: "gap",
          details: "Employment termination procedures not include security measures",
          recommendation: "Implement security procedures for employment termination and role changes"
        }
      ]
    },
    {
      name: "Physical Controls",
      description: "Controls that address physical and environmental security",
      results: [
        {
          id: "A.7.1",
          control: "Physical security perimeters",
          status: "gap",
          details: "Physical security perimeters not established",
          recommendation: "Define and implement physical security perimeters for sensitive areas"
        },
        {
          id: "A.7.2",
          control: "Physical entry controls",
          status: "gap",
          details: "Physical entry controls not implemented",
          recommendation: "Implement physical entry controls with authentication mechanisms"
        },
        {
          id: "A.7.3",
          control: "Securing offices, rooms and facilities",
          status: "gap",
          details: "Office and facility security measures not implemented",
          recommendation: "Implement security measures for offices, rooms, and facilities"
        },
        {
          id: "A.7.4",
          control: "Physical security monitoring",
          status: "gap",
          details: "Physical security monitoring not implemented",
          recommendation: "Implement physical security monitoring and surveillance systems"
        }
      ]
    },
    {
      name: "Technological Controls",
      description: "Controls that address logical and technical security",
      results: [
        {
          id: "A.8.1",
          control: "User endpoint devices",
          status: "gap",
          details: "Endpoint device security not implemented",
          recommendation: "Implement security controls for user endpoint devices"
        },
        {
          id: "A.8.2",
          control: "Privileged access rights",
          status: "gap",
          details: "Privileged access management not implemented",
          recommendation: "Implement privileged access management with least privilege principles"
        },
        {
          id: "A.8.3",
          control: "Information access restriction",
          status: "gap",
          details: "Information access restrictions not implemented",
          recommendation: "Implement access restrictions based on business requirements"
        },
        {
          id: "A.8.4",
          control: "Access to source code",
          status: "gap",
          details: "Source code access controls not implemented",
          recommendation: "Implement strict controls for source code access and modification"
        },
        {
          id: "A.8.5",
          control: "Secure authentication",
          status: "gap",
          details: "Secure authentication mechanisms not implemented",
          recommendation: "Implement multi-factor authentication and secure authentication protocols"
        }
      ]
    },
    {
      name: "Resilience Controls",
      description: "Controls that address business continuity and incident response",
      results: [
        {
          id: "A.9.1",
          control: "Information security incident management process",
          status: "gap",
          details: "Incident management process not established",
          recommendation: "Establish comprehensive incident management process with response procedures"
        },
        {
          id: "A.9.2",
          control: "Information security incident reporting",
          status: "gap",
          details: "Incident reporting procedures not established",
          recommendation: "Implement incident reporting procedures and escalation mechanisms"
        },
        {
          id: "A.9.3",
          control: "Information security incident learning",
          status: "gap",
          details: "Incident learning process not implemented",
          recommendation: "Implement process for learning from security incidents and improving controls"
        },
        {
          id: "A.9.4",
          control: "Evidence collection",
          status: "gap",
          details: "Evidence collection procedures not established",
          recommendation: "Establish procedures for collecting and preserving evidence during incidents"
        }
      ]
    }
  ]
};

export const soc2 = {
  name: "SOC 2 Type II",
  description: "Service Organization Control 2 Trust Service Criteria",
  categories: [
    {
      name: "Security (CC6.1)",
      description: "The entity's security policies and procedures protect against unauthorized access",
      results: [
        {
          id: "CC6.1.1",
          control: "The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet the entity's objectives",
          status: "gap",
          details: "Logical access security controls not implemented",
          recommendation: "Implement comprehensive logical access security controls including authentication, authorization, and monitoring"
        },
        {
          id: "CC6.1.2",
          control: "The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet the entity's objectives",
          status: "gap",
          details: "Security infrastructure not deployed",
          recommendation: "Deploy security infrastructure including firewalls, intrusion detection, and security monitoring tools"
        },
        {
          id: "CC6.1.3",
          control: "The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet the entity's objectives",
          status: "gap",
          details: "Security architectures not designed",
          recommendation: "Design security architectures with defense-in-depth principles and secure-by-design approach"
        }
      ]
    },
    {
      name: "Availability (CC7.1)",
      description: "The entity maintains, monitors, and evaluates current processing capacity and use of system resources",
      results: [
        {
          id: "CC7.1.1",
          control: "The entity maintains, monitors, and evaluates current processing capacity and use of system resources to manage capacity demand and to plan for future capacity requirements",
          status: "gap",
          details: "Capacity monitoring not implemented",
          recommendation: "Implement capacity monitoring and management systems to track resource utilization"
        },
        {
          id: "CC7.1.2",
          control: "The entity maintains, monitors, and evaluates current processing capacity and use of system resources to manage capacity demand and to plan for future capacity requirements",
          status: "gap",
          details: "Capacity planning not performed",
          recommendation: "Establish capacity planning processes to anticipate future resource requirements"
        },
        {
          id: "CC7.1.3",
          control: "The entity maintains, monitors, and evaluates current processing capacity and use of system resources to manage capacity demand and to plan for future capacity requirements",
          status: "gap",
          details: "Capacity demand management not implemented",
          recommendation: "Implement capacity demand management to optimize resource allocation"
        }
      ]
    },
    {
      name: "Processing Integrity (CC8.1)",
      description: "The entity implements policies and procedures to make available or deliver output that is complete, accurate, and timely",
      results: [
        {
          id: "CC8.1.1",
          control: "The entity implements policies and procedures to make available or deliver output that is complete, accurate, and timely",
          status: "gap",
          details: "Processing integrity policies not established",
          recommendation: "Establish policies and procedures to ensure processing integrity and data quality"
        },
        {
          id: "CC8.1.2",
          control: "The entity implements policies and procedures to make available or deliver output that is complete, accurate, and timely",
          status: "gap",
          details: "Output validation not implemented",
          recommendation: "Implement output validation to ensure completeness, accuracy, and timeliness"
        },
        {
          id: "CC8.1.3",
          control: "The entity implements policies and procedures to make available or deliver output that is complete, accurate, and timely",
          status: "gap",
          details: "Processing controls not implemented",
          recommendation: "Implement processing controls to maintain data integrity throughout processing"
        }
      ]
    },
    {
      name: "Confidentiality (CC9.1)",
      description: "The entity maintains the confidentiality of information",
      results: [
        {
          id: "CC9.1.1",
          control: "The entity maintains the confidentiality of information",
          status: "gap",
          details: "Confidentiality controls not implemented",
          recommendation: "Implement confidentiality controls including encryption, access controls, and data classification"
        },
        {
          id: "CC9.1.2",
          control: "The entity maintains the confidentiality of information",
          status: "gap",
          details: "Information classification not established",
          recommendation: "Establish information classification system to identify confidential information"
        },
        {
          id: "CC9.1.3",
          control: "The entity maintains the confidentiality of information",
          status: "gap",
          details: "Confidentiality policies not documented",
          recommendation: "Document confidentiality policies and procedures for handling sensitive information"
        }
      ]
    },
    {
      name: "Privacy (CC10.1)",
      description: "The entity collects, uses, retains, discloses, and disposes of personal information",
      results: [
        {
          id: "CC10.1.1",
          control: "The entity collects, uses, retains, discloses, and disposes of personal information",
          status: "gap",
          details: "Privacy controls not implemented",
          recommendation: "Implement privacy controls aligned with applicable privacy laws and regulations"
        },
        {
          id: "CC10.1.2",
          control: "The entity collects, uses, retains, discloses, and disposes of personal information",
          status: "gap",
          details: "Privacy policies not established",
          recommendation: "Establish comprehensive privacy policies and procedures"
        },
        {
          id: "CC10.1.3",
          control: "The entity collects, uses, retains, discloses, and disposes of personal information",
          status: "gap",
          details: "Privacy impact assessments not performed",
          recommendation: "Perform privacy impact assessments for new systems and processes"
        }
      ]
    }
  ]
};

// NIST Framework Controls
export const nistCSF = {
  name: "NIST Cybersecurity Framework (CSF) v2.0",
  description: "National Institute of Standards and Technology Cybersecurity Framework",
  categories: [
    {
      name: "IDENTIFY (ID)",
      description: "Develop an organizational understanding to manage cybersecurity risk",
      results: [
        {
          id: "ID.AM-1",
          control: "Physical devices and systems within the organization are inventoried",
          status: "gap",
          details: "Asset inventory not maintained",
          recommendation: "Implement comprehensive asset inventory system for all physical devices and systems"
        },
        {
          id: "ID.AM-2",
          control: "Software platforms and applications within the organization are inventoried",
          status: "gap",
          details: "Software inventory not maintained",
          recommendation: "Create and maintain software asset inventory including platforms and applications"
        },
        {
          id: "ID.AM-3",
          control: "Organizational communication and data flows are mapped",
          status: "gap",
          details: "Data flow mapping not performed",
          recommendation: "Document and map all organizational communication and data flows"
        },
        {
          id: "ID.AM-4",
          control: "External information systems are catalogued",
          status: "gap",
          details: "External systems not catalogued",
          recommendation: "Maintain catalogue of all external information systems and their connections"
        },
        {
          id: "ID.AM-5",
          control: "Resources (e.g., hardware, devices, data, time, personnel, and software) are prioritized based on their classification, criticality, and business value",
          status: "gap",
          details: "Resource prioritization not implemented",
          recommendation: "Implement resource classification and prioritization based on criticality and business value"
        }
      ]
    },
    {
      name: "PROTECT (PR)",
      description: "Develop and implement appropriate safeguards to ensure delivery of critical services",
      results: [
        {
          id: "PR.AC-1",
          control: "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes",
          status: "gap",
          details: "Identity and credential management not implemented",
          recommendation: "Implement comprehensive identity and credential management system"
        },
        {
          id: "PR.AC-2",
          control: "Physical access to assets is controlled and monitored",
          status: "gap",
          details: "Physical access controls not implemented",
          recommendation: "Implement physical access controls and monitoring systems"
        },
        {
          id: "PR.AC-3",
          control: "Remote access is managed",
          status: "gap",
          details: "Remote access management not implemented",
          recommendation: "Implement secure remote access management and monitoring"
        },
        {
          id: "PR.AC-4",
          control: "Access permissions are managed, incorporating the principles of least privilege and separation of duties",
          status: "gap",
          details: "Access permission management not implemented",
          recommendation: "Implement access permission management with least privilege principles"
        },
        {
          id: "PR.AC-5",
          control: "Network integrity is protected (e.g., network segregation, network segmentation)",
          status: "gap",
          details: "Network integrity protection not implemented",
          recommendation: "Implement network segregation and segmentation controls"
        }
      ]
    },
    {
      name: "DETECT (DE)",
      description: "Develop and implement appropriate activities to identify the occurrence of a cybersecurity event",
      results: [
        {
          id: "DE.AE-1",
          control: "Baseline network operations and expected data flows for users and systems are established and managed",
          status: "gap",
          details: "Network baseline not established",
          recommendation: "Establish and maintain baseline network operations and expected data flows"
        },
        {
          id: "DE.AE-2",
          control: "Detected events are analyzed to understand attack targets and methods",
          status: "gap",
          details: "Event analysis not performed",
          recommendation: "Implement event analysis procedures to understand attack patterns"
        },
        {
          id: "DE.AE-3",
          control: "Event data are collected and correlated from multiple sources and sensors",
          status: "gap",
          details: "Event data correlation not implemented",
          recommendation: "Implement event data collection and correlation from multiple sources"
        },
        {
          id: "DE.AE-4",
          control: "Impact of events is determined",
          status: "gap",
          details: "Event impact assessment not performed",
          recommendation: "Implement procedures to assess and determine event impact"
        },
        {
          id: "DE.AE-5",
          control: "Incident alert thresholds are established",
          status: "gap",
          details: "Alert thresholds not established",
          recommendation: "Establish incident alert thresholds and escalation procedures"
        }
      ]
    }
  ]
};

export const nist80053 = {
  name: "NIST SP 800-53 Rev. 5",
  description: "Security and Privacy Controls for Information Systems and Organizations",
  categories: [
    {
      name: "Access Control (AC)",
      description: "Control access to information systems and resources",
      results: [
        {
          id: "AC-1",
          control: "Access Control Policy and Procedures",
          status: "gap",
          details: "Access control policy not established",
          recommendation: "Develop and implement comprehensive access control policy and procedures"
        },
        {
          id: "AC-2",
          control: "Account Management",
          status: "gap",
          details: "Account management not implemented",
          recommendation: "Implement comprehensive account management system with lifecycle controls"
        },
        {
          id: "AC-3",
          control: "Access Enforcement",
          status: "gap",
          details: "Access enforcement not implemented",
          recommendation: "Implement access enforcement mechanisms and controls"
        },
        {
          id: "AC-4",
          control: "Information Flow Enforcement",
          status: "gap",
          details: "Information flow enforcement not implemented",
          recommendation: "Implement information flow enforcement controls and monitoring"
        },
        {
          id: "AC-5",
          control: "Separation of Duties",
          status: "gap",
          details: "Separation of duties not implemented",
          recommendation: "Implement separation of duties controls to prevent conflicts of interest"
        }
      ]
    },
    {
      name: "Audit and Accountability (AU)",
      description: "Create, protect, and retain information system audit records",
      results: [
        {
          id: "AU-1",
          control: "Audit and Accountability Policy and Procedures",
          status: "gap",
          details: "Audit policy not established",
          recommendation: "Develop and implement audit and accountability policy and procedures"
        },
        {
          id: "AU-2",
          control: "Audit Events",
          status: "gap",
          details: "Audit events not defined",
          recommendation: "Define and implement comprehensive audit event logging"
        },
        {
          id: "AU-3",
          control: "Content of Audit Records",
          status: "gap",
          details: "Audit record content not defined",
          recommendation: "Define and implement comprehensive audit record content requirements"
        },
        {
          id: "AU-4",
          control: "Audit Storage Capacity",
          status: "gap",
          details: "Audit storage capacity not managed",
          recommendation: "Implement audit storage capacity management and monitoring"
        },
        {
          id: "AU-5",
          control: "Response to Audit Processing Failures",
          status: "gap",
          details: "Audit failure response not implemented",
          recommendation: "Implement procedures to respond to audit processing failures"
        }
      ]
    },
    {
      name: "Configuration Management (CM)",
      description: "Establish and maintain baseline configurations",
      results: [
        {
          id: "CM-1",
          control: "Configuration Management Policy and Procedures",
          status: "gap",
          details: "Configuration management policy not established",
          recommendation: "Develop and implement configuration management policy and procedures"
        },
        {
          id: "CM-2",
          control: "Baseline Configurations",
          status: "gap",
          details: "Baseline configurations not established",
          recommendation: "Establish and maintain baseline configurations for all systems"
        },
        {
          id: "CM-3",
          control: "Configuration Change Control",
          status: "gap",
          details: "Configuration change control not implemented",
          recommendation: "Implement configuration change control procedures and approval processes"
        },
        {
          id: "CM-4",
          control: "Security Impact Analysis",
          status: "gap",
          details: "Security impact analysis not performed",
          recommendation: "Implement security impact analysis for configuration changes"
        },
        {
          id: "CM-5",
          control: "Access Restrictions for Change",
          status: "gap",
          details: "Change access restrictions not implemented",
          recommendation: "Implement access restrictions for configuration changes"
        }
      ]
    },
    {
      name: "Identification and Authentication (IA)",
      description: "Establish and manage identification and authentication",
      results: [
        {
          id: "IA-1",
          control: "Identification and Authentication Policy and Procedures",
          status: "gap",
          details: "Identification and authentication policy not established",
          recommendation: "Develop and implement comprehensive identification and authentication policy"
        },
        {
          id: "IA-2",
          control: "Identification and Authentication (Organizational Users)",
          status: "gap",
          details: "Multi-factor authentication not implemented for organizational users",
          recommendation: "Implement multi-factor authentication for all organizational users"
        },
        {
          id: "IA-3",
          control: "Device Identification and Authentication",
          status: "gap",
          details: "Device identification and authentication not implemented",
          recommendation: "Implement device identification and authentication mechanisms"
        },
        {
          id: "IA-4",
          control: "Identifier Management",
          status: "gap",
          details: "Identifier management not implemented",
          recommendation: "Implement comprehensive identifier management system"
        },
        {
          id: "IA-5",
          control: "Authenticator Management",
          status: "gap",
          details: "Authenticator management not implemented",
          recommendation: "Implement secure authenticator management procedures"
        },
        {
          id: "IA-6",
          control: "Authenticator Feedback",
          status: "gap",
          details: "Authenticator feedback not implemented",
          recommendation: "Implement secure authenticator feedback mechanisms"
        }
      ]
    },
    {
      name: "System and Communications Protection (SC)",
      description: "Protect system and communications",
      results: [
        {
          id: "SC-1",
          control: "System and Communications Protection Policy and Procedures",
          status: "gap",
          details: "System and communications protection policy not established",
          recommendation: "Develop and implement system and communications protection policy"
        },
        {
          id: "SC-8",
          control: "Transmission Confidentiality and Integrity",
          status: "gap",
          details: "Transmission confidentiality and integrity not implemented",
          recommendation: "Implement transmission confidentiality and integrity controls"
        },
        {
          id: "SC-12",
          control: "Cryptographic Key Establishment and Management",
          status: "gap",
          details: "Cryptographic key management not implemented",
          recommendation: "Implement secure cryptographic key establishment and management"
        },
        {
          id: "SC-13",
          control: "Cryptographic Protection",
          status: "gap",
          details: "Cryptographic protection not implemented",
          recommendation: "Implement cryptographic protection for information in accordance with requirements"
        },
        {
          id: "SC-28",
          control: "Protection of Information at Rest",
          status: "gap",
          details: "Information at rest protection not implemented",
          recommendation: "Implement protection mechanisms for information at rest"
        }
      ]
    },
    {
      name: "Incident Response (IR)",
      description: "Establish incident response capability",
      results: [
        {
          id: "IR-1",
          control: "Incident Response Policy and Procedures",
          status: "gap",
          details: "Incident response policy not established",
          recommendation: "Develop and implement comprehensive incident response policy and procedures"
        },
        {
          id: "IR-4",
          control: "Incident Handling",
          status: "gap",
          details: "Incident handling procedures not implemented",
          recommendation: "Implement comprehensive incident handling procedures"
        },
        {
          id: "IR-6",
          control: "Incident Reporting",
          status: "gap",
          details: "Incident reporting procedures not implemented",
          recommendation: "Implement incident reporting procedures and escalation mechanisms"
        },
        {
          id: "IR-8",
          control: "Incident Response Plan",
          status: "gap",
          details: "Incident response plan not developed",
          recommendation: "Develop and maintain comprehensive incident response plan"
        }
      ]
    }
  ]
};

// Export all frameworks for use in the application
export const allFrameworks = {
  NIST_CSF: nistCSF,
  NIST_800_53: nist80053,
  PCI_DSS: pciDSS,
  ISO_27001: iso27001,
  SOC_2: soc2
};
