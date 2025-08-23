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
    },
    {
      name: "RESPOND (RS)",
      description: "Develop and implement appropriate activities to take action regarding a detected cybersecurity incident",
      results: [
        {
          id: "RS.RP-1",
          control: "Response plan is executed during or after an incident",
          status: "gap",
          details: "Response plan execution procedures not established",
          recommendation: "Develop and implement incident response plan execution procedures"
        },
        {
          id: "RS.CO-1",
          control: "Personnel know their roles and order of operations when a response is needed",
          status: "gap",
          details: "Response roles and procedures not defined",
          recommendation: "Define and communicate response roles and operational procedures"
        },
        {
          id: "RS.CO-2",
          control: "Events are reported consistent with established criteria",
          status: "gap",
          details: "Event reporting criteria not established",
          recommendation: "Establish and communicate event reporting criteria and procedures"
        },
        {
          id: "RS.CO-3",
          control: "Information is shared consistent with response plans",
          status: "gap",
          details: "Information sharing procedures not established",
          recommendation: "Establish information sharing procedures aligned with response plans"
        },
        {
          id: "RS.CO-4",
          control: "Coordination with stakeholders occurs consistent with response plans",
          status: "gap",
          details: "Stakeholder coordination procedures not established",
          recommendation: "Establish stakeholder coordination procedures for incident response"
        }
      ]
    },
    {
      name: "RECOVER (RC)",
      description: "Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services that were impaired due to a cybersecurity incident",
      results: [
        {
          id: "RC.RP-1",
          control: "Recovery plan is executed during or after an incident",
          status: "gap",
          details: "Recovery plan execution procedures not established",
          recommendation: "Develop and implement recovery plan execution procedures"
        },
        {
          id: "RC.IM-1",
          control: "Recovery plans incorporate lessons learned",
          status: "gap",
          details: "Lessons learned not incorporated into recovery plans",
          recommendation: "Establish process to incorporate lessons learned into recovery planning"
        },
        {
          id: "RC.IM-2",
          control: "Recovery strategies are updated",
          status: "gap",
          details: "Recovery strategies not updated",
          recommendation: "Establish process to update recovery strategies based on lessons learned"
        }
      ]
    },
    {
      name: "GOVERN (GV)",
      description: "Establish and monitor the organization's cybersecurity risk management strategy, expectations, and policy",
      results: [
        {
          id: "GV.ID-1",
          control: "Organizational security policies are established and communicated",
          status: "gap",
          details: "Organizational security policies not established",
          recommendation: "Develop and communicate comprehensive organizational security policies"
        },
        {
          id: "GV.ID-2",
          control: "Security roles & responsibilities are coordinated and aligned with internal roles and external partners",
          status: "gap",
          details: "Security roles not coordinated",
          recommendation: "Coordinate and align security roles with internal and external stakeholders"
        },
        {
          id: "GV.ID-3",
          control: "Legal and regulatory requirements regarding cybersecurity are understood and managed",
          status: "gap",
          details: "Legal and regulatory requirements not managed",
          recommendation: "Establish process to understand and manage cybersecurity legal requirements"
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
      name: "Awareness and Training (AT)",
      description: "Ensure personnel are aware of security responsibilities",
      results: [
        {
          id: "AT-1",
          control: "Awareness and Training Policy and Procedures",
          status: "gap",
          details: "Awareness and training policy not established",
          recommendation: "Develop and implement comprehensive security awareness and training policy"
        },
        {
          id: "AT-2",
          control: "Security Awareness Training",
          status: "gap",
          details: "Security awareness training not provided",
          recommendation: "Provide regular security awareness training to all personnel"
        },
        {
          id: "AT-3",
          control: "Role-Based Training",
          status: "gap",
          details: "Role-based training not implemented",
          recommendation: "Implement role-based security training for different job functions"
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
        }
      ]
    },
    {
      name: "Assessment, Authorization, and Monitoring (CA)",
      description: "Assess and authorize systems",
      results: [
        {
          id: "CA-1",
          control: "Assessment, Authorization, and Monitoring Policy and Procedures",
          status: "gap",
          details: "Assessment policy not established",
          recommendation: "Develop and implement assessment, authorization, and monitoring policy"
        },
        {
          id: "CA-2",
          control: "Security Assessments",
          status: "gap",
          details: "Security assessments not conducted",
          recommendation: "Conduct regular security assessments of information systems"
        },
        {
          id: "CA-3",
          control: "System Interconnections",
          status: "gap",
          details: "System interconnections not managed",
          recommendation: "Manage and monitor system interconnections and data exchanges"
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
        }
      ]
    },
    {
      name: "Contingency Planning (CP)",
      description: "Plan for system recovery and continuity",
      results: [
        {
          id: "CP-1",
          control: "Contingency Planning Policy and Procedures",
          status: "gap",
          details: "Contingency planning policy not established",
          recommendation: "Develop and implement comprehensive contingency planning policy"
        },
        {
          id: "CP-2",
          control: "Contingency Plan",
          status: "gap",
          details: "Contingency plan not developed",
          recommendation: "Develop comprehensive contingency plan for system recovery"
        },
        {
          id: "CP-3",
          control: "Contingency Training",
          status: "gap",
          details: "Contingency training not provided",
          recommendation: "Provide regular training on contingency procedures and recovery"
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
        }
      ]
    },
    {
      name: "Maintenance (MA)",
      description: "Perform system maintenance securely",
      results: [
        {
          id: "MA-1",
          control: "System Maintenance Policy and Procedures",
          status: "gap",
          details: "Maintenance policy not established",
          recommendation: "Develop and implement system maintenance policy and procedures"
        },
        {
          id: "MA-2",
          control: "Controlled Maintenance",
          status: "gap",
          details: "Controlled maintenance not implemented",
          recommendation: "Implement controlled maintenance procedures for all system changes"
        },
        {
          id: "MA-3",
          control: "Maintenance Tools",
          status: "gap",
          details: "Maintenance tools not controlled",
          recommendation: "Control and monitor maintenance tools and equipment"
        }
      ]
    },
    {
      name: "Media Protection (MP)",
      description: "Protect and manage media throughout its lifecycle",
      results: [
        {
          id: "MP-1",
          control: "Media Protection Policy and Procedures",
          status: "gap",
          details: "Media protection policy not established",
          recommendation: "Develop and implement comprehensive media protection policy"
        },
        {
          id: "MP-2",
          control: "Media Access",
          status: "gap",
          details: "Media access controls not implemented",
          recommendation: "Implement access controls for all media types"
        },
        {
          id: "MP-3",
          control: "Media Marking",
          status: "gap",
          details: "Media marking not implemented",
          recommendation: "Implement media marking and labeling procedures"
        }
      ]
    },
    {
      name: "Physical and Environmental Protection (PE)",
      description: "Protect physical assets and environment",
      results: [
        {
          id: "PE-1",
          control: "Physical and Environmental Protection Policy and Procedures",
          status: "gap",
          details: "Physical protection policy not established",
          recommendation: "Develop and implement comprehensive physical and environmental protection policy"
        },
        {
          id: "PE-2",
          control: "Physical Access Authorizations",
          status: "gap",
          details: "Physical access authorizations not implemented",
          recommendation: "Implement physical access authorization and control procedures"
        },
        {
          id: "PE-3",
          control: "Physical Access Control",
          status: "gap",
          details: "Physical access control not implemented",
          recommendation: "Implement physical access control mechanisms and monitoring"
        }
      ]
    },
    {
      name: "Planning (PL)",
      description: "Develop and maintain security and privacy plans",
      results: [
        {
          id: "PL-1",
          control: "Security and Privacy Planning Policy and Procedures",
          status: "gap",
          details: "Security and privacy planning policy not established",
          recommendation: "Develop and implement comprehensive security and privacy planning policy and procedures"
        },
        {
          id: "PL-2",
          control: "System Security and Privacy Plans",
          status: "gap",
          details: "System security and privacy plans not developed",
          recommendation: "Develop comprehensive system security and privacy plans"
        },
        {
          id: "PL-3",
          control: "System Security and Privacy Plan Reviews",
          status: "gap",
          details: "System security and privacy plan reviews not implemented",
          recommendation: "Implement regular reviews and updates of system security and privacy plans"
        }
      ]
    },
    {
      name: "Personnel Security (PS)",
      description: "Ensure personnel are trustworthy and qualified",
      results: [
        {
          id: "PS-1",
          control: "Personnel Security Policy and Procedures",
          status: "gap",
          details: "Personnel security policy not established",
          recommendation: "Develop and implement comprehensive personnel security policy"
        },
        {
          id: "PS-2",
          control: "Position Risk Designation",
          status: "gap",
          details: "Position risk designation not implemented",
          recommendation: "Implement position risk designation and screening procedures"
        },
        {
          id: "PS-3",
          control: "Personnel Screening",
          status: "gap",
          details: "Personnel screening not implemented",
          recommendation: "Implement comprehensive personnel screening procedures"
        }
      ]
    },
    {
      name: "PII Processing and Transparency (PT)",
      description: "Process personally identifiable information and provide transparency",
      results: [
        {
          id: "PT-1",
          control: "PII Processing and Transparency Policy and Procedures",
          status: "gap",
          details: "PII processing and transparency policy not established",
          recommendation: "Develop and implement comprehensive PII processing and transparency policy and procedures"
        },
        {
          id: "PT-2",
          control: "PII Processing Purposes",
          status: "gap",
          details: "PII processing purposes not defined",
          recommendation: "Define and document specific purposes for PII processing"
        },
        {
          id: "PT-3",
          control: "PII Processing Permissions",
          status: "gap",
          details: "PII processing permissions not established",
          recommendation: "Establish and enforce permissions for PII processing activities"
        }
      ]
    },
    {
      name: "Risk Assessment (RA)",
      description: "Assess and manage security risks",
      results: [
        {
          id: "RA-1",
          control: "Risk Assessment Policy and Procedures",
          status: "gap",
          details: "Risk assessment policy not established",
          recommendation: "Develop and implement comprehensive risk assessment policy"
        },
        {
          id: "RA-2",
          control: "Security Categorization",
          status: "gap",
          details: "Security categorization not performed",
          recommendation: "Perform security categorization of information systems"
        },
        {
          id: "RA-3",
          control: "Risk Assessment",
          status: "gap",
          details: "Risk assessment not conducted",
          recommendation: "Conduct comprehensive risk assessments of information systems"
        }
      ]
    },
    {
      name: "System and Services Acquisition (SA)",
      description: "Acquire systems and services securely",
      results: [
        {
          id: "SA-1",
          control: "System and Services Acquisition Policy and Procedures",
          status: "gap",
          details: "Acquisition policy not established",
          recommendation: "Develop and implement comprehensive system and services acquisition policy"
        },
        {
          id: "SA-2",
          control: "Allocation of Resources",
          status: "gap",
          details: "Resource allocation not planned",
          recommendation: "Plan and allocate resources for system and services acquisition"
        },
        {
          id: "SA-3",
          control: "System Development Life Cycle",
          status: "gap",
          details: "System development life cycle not implemented",
          recommendation: "Implement comprehensive system development life cycle"
        }
      ]
    },
    {
      name: "System and Communications Protection (SC)",
      description: "Protect system boundaries and communications",
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
        }
      ]
    },
    {
      name: "System and Information Integrity (SI)",
      description: "Maintain system and information integrity",
      results: [
        {
          id: "SI-1",
          control: "System and Information Integrity Policy and Procedures",
          status: "gap",
          details: "System integrity policy not established",
          recommendation: "Develop and implement comprehensive system and information integrity policy"
        },
        {
          id: "SI-2",
          control: "Flaw Remediation",
          status: "gap",
          details: "Flaw remediation not implemented",
          recommendation: "Implement comprehensive flaw remediation procedures"
        },
        {
          id: "SI-3",
          control: "Malicious Code Protection",
          status: "gap",
          details: "Malicious code protection not implemented",
          recommendation: "Implement comprehensive malicious code protection mechanisms"
        }
      ]
    },
    {
      name: "Supply Chain Risk Management (SR)",
      description: "Manage supply chain risks",
      results: [
        {
          id: "SR-1",
          control: "Supply Chain Risk Management Policy and Procedures",
          status: "gap",
          details: "Supply chain risk management policy not established",
          recommendation: "Develop and implement comprehensive supply chain risk management policy"
        },
        {
          id: "SR-2",
          control: "Supply Chain Risk Management Plan",
          status: "gap",
          details: "Supply chain risk management plan not developed",
          recommendation: "Develop comprehensive supply chain risk management plan"
        },
        {
          id: "SR-3",
          control: "Supply Chain Risk Assessment",
          status: "gap",
          details: "Supply chain risk assessment not conducted",
          recommendation: "Conduct comprehensive supply chain risk assessments"
        }
      ]
    },
    {
      name: "Program Management (PM)",
      description: "Manage information security programs and activities",
      results: [
        {
          id: "PM-1",
          control: "Information Security Program Plan",
          status: "gap",
          details: "Information security program plan not developed",
          recommendation: "Develop comprehensive information security program plan aligned with organizational objectives"
        },
        {
          id: "PM-2",
          control: "Senior Information Security Officer",
          status: "gap",
          details: "Senior information security officer not designated",
          recommendation: "Designate senior information security officer with appropriate authority and resources"
        },
        {
          id: "PM-3",
          control: "Information Security Resources",
          status: "gap",
          details: "Information security resources not allocated",
          recommendation: "Allocate adequate resources for information security program implementation"
        }
      ]
    }
  ]
};

// NIST SP 800-63B Digital Identity Guidelines
export const nist80063b = {
  name: "NIST SP 800-63B",
  description: "Digital Identity Guidelines - Authentication and Lifecycle Management",
  categories: [
    {
      name: "Identity Assurance Level (IAL)",
      description: "How identity is established and verified",
      results: [
        {
          id: "IAL-1",
          control: "IAL1 - Self-asserted identity",
          status: "gap",
          details: "Self-asserted identity verification not implemented",
          recommendation: "Implement self-asserted identity verification process for low-risk applications"
        },
        {
          id: "IAL-2",
          control: "IAL2 - Remote or in-person identity proofing",
          status: "gap",
          details: "Remote or in-person identity proofing not implemented",
          recommendation: "Implement remote or in-person identity proofing with appropriate verification methods"
        },
        {
          id: "IAL-3",
          control: "IAL3 - In-person identity proofing",
          status: "gap",
          details: "In-person identity proofing not implemented",
          recommendation: "Implement in-person identity proofing with trained personnel and verification processes"
        }
      ]
    },
    {
      name: "Authenticator Assurance Level (AAL)",
      description: "How authentication is performed and verified",
      results: [
        {
          id: "AAL-1",
          control: "AAL1 - Single-factor authentication",
          status: "gap",
          details: "Single-factor authentication only implemented",
          recommendation: "Implement multi-factor authentication for enhanced security"
        },
        {
          id: "AAL-2",
          control: "AAL2 - Multi-factor authentication",
          status: "gap",
          details: "Multi-factor authentication not implemented",
          recommendation: "Implement multi-factor authentication using two or more authentication factors"
        },
        {
          id: "AAL-3",
          control: "AAL3 - Hardware-based authenticator",
          status: "gap",
          details: "Hardware-based authenticators not implemented",
          recommendation: "Implement hardware-based authenticators for high-security applications"
        }
      ]
    },
    {
      name: "Federation Assurance Level (FAL)",
      description: "How federated identity and single sign-on work",
      results: [
        {
          id: "FAL-1",
          control: "FAL1 - Basic federation",
          status: "gap",
          details: "Basic federation not implemented",
          recommendation: "Implement basic federation with identity providers and service providers"
        },
        {
          id: "FAL-2",
          control: "FAL2 - Advanced federation",
          status: "gap",
          details: "Advanced federation not implemented",
          recommendation: "Implement advanced federation with enhanced security and privacy controls"
        },
        {
          id: "FAL-3",
          control: "FAL3 - High federation",
          status: "gap",
          details: "High federation not implemented",
          recommendation: "Implement high federation with cryptographic protections and advanced controls"
        }
      ]
    },
    {
      name: "Identity Lifecycle Management",
      description: "Managing identity throughout its lifecycle",
      results: [
        {
          id: "ILM-1",
          control: "Identity establishment and enrollment",
          status: "gap",
          details: "Identity establishment process not implemented",
          recommendation: "Implement comprehensive identity establishment and enrollment procedures"
        },
        {
          id: "ILM-2",
          control: "Identity proofing and verification",
          status: "gap",
          details: "Identity proofing and verification not implemented",
          recommendation: "Implement identity proofing and verification processes"
        },
        {
          id: "ILM-3",
          control: "Identity binding and authentication",
          status: "gap",
          details: "Identity binding and authentication not implemented",
          recommendation: "Implement secure identity binding and authentication mechanisms"
        },
        {
          id: "ILM-4",
          control: "Identity lifecycle maintenance",
          status: "gap",
          details: "Identity lifecycle maintenance not implemented",
          recommendation: "Implement identity lifecycle maintenance procedures"
        },
        {
          id: "ILM-5",
          control: "Identity termination and deactivation",
          status: "gap",
          details: "Identity termination procedures not implemented",
          recommendation: "Implement secure identity termination and deactivation procedures"
        }
      ]
    },
    {
      name: "Authenticator Management",
      description: "Managing authenticators and their lifecycle",
      results: [
        {
          id: "AM-1",
          control: "Authenticator types and selection",
          status: "gap",
          details: "Authenticator types and selection not implemented",
          recommendation: "Implement authenticator type selection based on security requirements"
        },
        {
          id: "AM-2",
          control: "Authenticator strength and requirements",
          status: "gap",
          details: "Authenticator strength requirements not defined",
          recommendation: "Define authenticator strength requirements and validation processes"
        },
        {
          id: "AM-3",
          control: "Authenticator issuance and provisioning",
          status: "gap",
          details: "Authenticator issuance process not implemented",
          recommendation: "Implement secure authenticator issuance and provisioning procedures"
        },
        {
          id: "AM-4",
          control: "Authenticator lifecycle management",
          status: "gap",
          details: "Authenticator lifecycle management not implemented",
          recommendation: "Implement comprehensive authenticator lifecycle management"
        },
        {
          id: "AM-5",
          control: "Authenticator compromise and recovery",
          status: "gap",
          details: "Authenticator compromise response not implemented",
          recommendation: "Implement authenticator compromise detection and recovery procedures"
        }
      ]
    },
    {
      name: "Session Management",
      description: "Managing user sessions and access",
      results: [
        {
          id: "SM-1",
          control: "Session establishment and management",
          status: "gap",
          details: "Session establishment and management not implemented",
          recommendation: "Implement secure session establishment and management procedures"
        },
        {
          id: "SM-2",
          control: "Session timeout and termination",
          status: "gap",
          details: "Session timeout and termination not implemented",
          recommendation: "Implement session timeout and secure termination procedures"
        },
        {
          id: "SM-3",
          control: "Session monitoring and logging",
          status: "gap",
          details: "Session monitoring and logging not implemented",
          recommendation: "Implement session monitoring and comprehensive logging"
        },
        {
          id: "SM-4",
          control: "Session hijacking protection",
          status: "gap",
          details: "Session hijacking protection not implemented",
          recommendation: "Implement session hijacking protection mechanisms"
        }
      ]
    },
    {
      name: "Privacy and Security Controls",
      description: "Protecting privacy and ensuring security",
      results: [
        {
          id: "PSC-1",
          control: "Privacy protection and data minimization",
          status: "gap",
          details: "Privacy protection and data minimization not implemented",
          recommendation: "Implement privacy protection and data minimization controls"
        },
        {
          id: "PSC-2",
          control: "Security controls and monitoring",
          status: "gap",
          details: "Security controls and monitoring not implemented",
          recommendation: "Implement comprehensive security controls and monitoring"
        },
        {
          id: "PSC-3",
          control: "Audit and accountability",
          status: "gap",
          details: "Audit and accountability not implemented",
          recommendation: "Implement audit and accountability controls"
        },
        {
          id: "PSC-4",
          control: "Incident response and recovery",
          status: "gap",
          details: "Incident response and recovery not implemented",
          recommendation: "Implement incident response and recovery procedures"
        }
      ]
    },
    {
      name: "Identity Proofing (IP)",
      description: "Methods and processes for identity verification",
      results: [
        {
          id: "IP-1",
          control: "Identity proofing procedures are established",
          status: "gap",
          details: "Identity proofing procedures not established",
          recommendation: "Establish comprehensive identity proofing procedures and requirements"
        },
        {
          id: "IP-2",
          control: "Identity proofing methods are validated",
          status: "gap",
          details: "Identity proofing methods not validated",
          recommendation: "Validate identity proofing methods against security requirements"
        },
        {
          id: "IP-3",
          control: "Identity proofing documentation is maintained",
          status: "gap",
          details: "Identity proofing documentation not maintained",
          recommendation: "Establish procedures to maintain identity proofing documentation"
        }
      ]
    },
    {
      name: "Registration (REG)",
      description: "Identity registration and enrollment processes",
      results: [
        {
          id: "REG-1",
          control: "Registration procedures are established",
          status: "gap",
          details: "Registration procedures not established",
          recommendation: "Establish comprehensive registration procedures and requirements"
        },
        {
          id: "REG-2",
          control: "Registration validation is performed",
          status: "gap",
          details: "Registration validation not performed",
          recommendation: "Implement registration validation procedures and controls"
        },
        {
          id: "REG-3",
          control: "Registration records are maintained",
          status: "gap",
          details: "Registration records not maintained",
          recommendation: "Establish procedures to maintain registration records"
        }
      ]
    },
    {
      name: "Authentication (AUTH)",
      description: "Authentication mechanisms and processes",
      results: [
        {
          id: "AUTH-1",
          control: "Authentication procedures are established",
          status: "gap",
          details: "Authentication procedures not established",
          recommendation: "Establish comprehensive authentication procedures and requirements"
        },
        {
          id: "AUTH-2",
          control: "Authentication methods are validated",
          status: "gap",
          details: "Authentication methods not validated",
          recommendation: "Validate authentication methods against security requirements"
        },
        {
          id: "AUTH-3",
          control: "Authentication monitoring is implemented",
          status: "gap",
          details: "Authentication monitoring not implemented",
          recommendation: "Implement authentication monitoring and alerting"
        }
      ]
    },
    {
      name: "Federation (FED)",
      description: "Federated identity and trust relationships",
      results: [
        {
          id: "FED-1",
          control: "Federation procedures are established",
          status: "gap",
          details: "Federation procedures not established",
          recommendation: "Establish comprehensive federation procedures and requirements"
        },
        {
          id: "FED-2",
          control: "Trust relationships are managed",
          status: "gap",
          details: "Trust relationships not managed",
          recommendation: "Establish procedures to manage federation trust relationships"
        },
        {
          id: "FED-3",
          control: "Federation monitoring is implemented",
          status: "gap",
          details: "Federation monitoring not implemented",
          recommendation: "Implement federation monitoring and alerting"
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
  SOC_2: soc2,
  NIST_800_63B: nist80063b
};
