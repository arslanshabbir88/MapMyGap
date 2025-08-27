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
        },
        {
          id: "AC-6",
          control: "Least Privilege",
          status: "gap",
          details: "Least privilege principle not implemented",
          recommendation: "Implement least privilege access controls"
        },
        {
          id: "AC-7",
          control: "Unsuccessful Logon Attempts",
          status: "gap",
          details: "Logon attempt limits not configured",
          recommendation: "Configure limits on unsuccessful logon attempts"
        },
        {
          id: "AC-8",
          control: "System Use Notification",
          status: "gap",
          details: "System use notifications not displayed",
          recommendation: "Display appropriate system use notifications"
        },
        {
          id: "AC-9",
          control: "Previous Logon Notification",
          status: "gap",
          details: "Previous logon notifications not implemented",
          recommendation: "Implement notifications for previous logon information"
        },
        {
          id: "AC-10",
          control: "Concurrent Session Control",
          status: "gap",
          details: "Concurrent session control not implemented",
          recommendation: "Implement controls to limit concurrent user sessions"
        },
        {
          id: "AC-11",
          control: "Session Lock",
          status: "gap",
          details: "Session lock not implemented",
          recommendation: "Implement automatic session lock after periods of inactivity"
        },
        {
          id: "AC-12",
          control: "Session Termination",
          status: "gap",
          details: "Session termination not implemented",
          recommendation: "Implement automatic session termination after specified periods"
        },
        {
          id: "AC-13",
          control: "Supervision and Review - Access Control",
          status: "gap",
          details: "Access control supervision and review not implemented",
          recommendation: "Implement supervision and review of access control activities"
        },
        {
          id: "AC-14",
          control: "Permitted Actions without Identification or Authentication",
          status: "gap",
          details: "Permitted actions without authentication not defined",
          recommendation: "Define actions that can be performed without identification or authentication"
        },
        {
          id: "AC-15",
          control: "Automated Marking",
          status: "gap",
          details: "Automated marking not implemented",
          recommendation: "Implement automated marking of output with appropriate security attributes"
        },
        {
          id: "AC-16",
          control: "Security Attributes",
          status: "gap",
          details: "Security attributes not implemented",
          recommendation: "Implement security attributes for information and system resources"
        },
        {
          id: "AC-17",
          control: "Remote Access",
          status: "gap",
          details: "Remote access controls not implemented",
          recommendation: "Implement secure remote access controls and monitoring"
        },
        {
          id: "AC-18",
          control: "Wireless Access",
          status: "gap",
          details: "Wireless access controls not implemented",
          recommendation: "Implement secure wireless access controls and monitoring"
        },
        {
          id: "AC-19",
          control: "Access Control for Mobile Devices",
          status: "gap",
          details: "Mobile device access controls not implemented",
          recommendation: "Implement access controls for mobile devices"
        },
        {
          id: "AC-20",
          control: "Use of External Information Systems",
          status: "gap",
          details: "External system access controls not implemented",
          recommendation: "Implement controls for use of external information systems"
        },
        {
          id: "AC-21",
          control: "Information Sharing",
          status: "gap",
          details: "Information sharing controls not implemented",
          recommendation: "Implement controls for secure information sharing"
        },
        {
          id: "AC-22",
          control: "Publicly Accessible Content",
          status: "gap",
          details: "Publicly accessible content controls not implemented",
          recommendation: "Implement controls for publicly accessible content"
        },
        {
          id: "AC-23",
          control: "Data Mining Protection",
          status: "gap",
          details: "Data mining protection not implemented",
          recommendation: "Implement controls to protect against data mining"
        },
        {
          id: "AC-24",
          control: "Access Control Decisions",
          status: "gap",
          details: "Access control decision processes not implemented",
          recommendation: "Implement processes for making access control decisions"
        },
        {
          id: "AC-25",
          control: "Reference Monitor",
          status: "gap",
          details: "Reference monitor not implemented",
          recommendation: "Implement reference monitor for access control enforcement"
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
          recommendation: "Develop and implement comprehensive awareness and training policy and procedures"
        },
        {
          id: "AT-2",
          control: "Literacy Training and Awareness",
          status: "gap",
          details: "Literacy training not implemented",
          recommendation: "Implement literacy training and awareness programs"
        },
        {
          id: "AT-3",
          control: "Role-Based Training",
          status: "gap",
          details: "Role-based training not implemented",
          recommendation: "Implement role-based security training programs"
        },
        {
          id: "AT-4",
          control: "Training Records",
          status: "gap",
          details: "Training records not maintained",
          recommendation: "Maintain comprehensive training records for all personnel"
        },
        {
          id: "AT-5",
          control: "Contact with Security Groups and Associations",
          status: "gap",
          details: "Security group contacts not established",
          recommendation: "Establish contacts with security groups and associations for training resources"
        },
        {
          id: "AT-6",
          control: "Training Delivery",
          status: "gap",
          details: "Training delivery methods not optimized",
          recommendation: "Implement effective training delivery methods including online and in-person options"
        },
        {
          id: "AT-7",
          control: "Training Effectiveness",
          status: "gap",
          details: "Training effectiveness not measured",
          recommendation: "Implement training effectiveness measurement and evaluation processes"
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
          recommendation: "Develop and implement comprehensive audit and accountability policy and procedures"
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
          details: "Audit processing failure response not defined",
          recommendation: "Define and implement response procedures for audit processing failures"
        },
        {
          id: "AU-6",
          control: "Audit Review, Analysis, and Reporting",
          status: "gap",
          details: "Audit review and analysis not implemented",
          recommendation: "Implement regular audit review, analysis, and reporting procedures"
        },
        {
          id: "AU-7",
          control: "Audit Reduction and Report Generation",
          status: "gap",
          details: "Audit reduction and report generation not implemented",
          recommendation: "Implement automated audit reduction and report generation capabilities"
        },
        {
          id: "AU-8",
          control: "Time Stamps",
          status: "gap",
          details: "Time stamps not synchronized",
          recommendation: "Implement synchronized time stamps for audit records"
        },
        {
          id: "AU-9",
          control: "Protection of Audit Information",
          status: "gap",
          details: "Audit information protection not implemented",
          recommendation: "Implement protection mechanisms for audit information"
        },
        {
          id: "AU-10",
          control: "Non-repudiation",
          status: "gap",
          details: "Non-repudiation controls not implemented",
          recommendation: "Implement non-repudiation controls for audit records"
        },
        {
          id: "AU-11",
          control: "Audit Record Retention",
          status: "gap",
          details: "Audit record retention not defined",
          recommendation: "Define and implement audit record retention policies"
        },
        {
          id: "AU-12",
          control: "Audit Generation",
          status: "gap",
          details: "Audit generation not implemented",
          recommendation: "Implement comprehensive audit generation capabilities"
        },
        {
          id: "AU-13",
          control: "Monitoring for Information Disclosure",
          status: "gap",
          details: "Information disclosure monitoring not implemented",
          recommendation: "Implement monitoring for unauthorized information disclosure"
        },
        {
          id: "AU-14",
          control: "Session Audit",
          status: "gap",
          details: "Session audit not implemented",
          recommendation: "Implement session audit capabilities for user sessions"
        },
        {
          id: "AU-15",
          control: "Alternate Audit Capability",
          status: "gap",
          details: "Alternate audit capability not implemented",
          recommendation: "Implement alternate audit capability for system failures"
        },
        {
          id: "AU-16",
          control: "Cross-organizational Auditing",
          status: "gap",
          details: "Cross-organizational auditing not implemented",
          recommendation: "Implement cross-organizational auditing capabilities"
        },
        {
          id: "AU-17",
          control: "Alternate Storage Site",
          status: "gap",
          details: "Alternate audit storage site not implemented",
          recommendation: "Implement alternate storage site for audit records"
        },
        {
          id: "AU-18",
          control: "Tamper-resistant Audit Trail",
          status: "gap",
          details: "Tamper-resistant audit trail not implemented",
          recommendation: "Implement tamper-resistant audit trail mechanisms"
        },
        {
          id: "AU-19",
          control: "Non-repudiation of Transmitted Messages",
          status: "gap",
          details: "Message non-repudiation not implemented",
          recommendation: "Implement non-repudiation for transmitted messages"
        },
        {
          id: "AU-20",
          control: "Threat Monitoring",
          status: "gap",
          details: "Threat monitoring not implemented",
          recommendation: "Implement threat monitoring and analysis capabilities"
        },
        {
          id: "AU-21",
          control: "Validated Input",
          status: "gap",
          details: "Input validation not implemented",
          recommendation: "Implement input validation for audit data"
        },
        {
          id: "AU-22",
          control: "Verifiable Event Ordering",
          status: "gap",
          details: "Event ordering verification not implemented",
          recommendation: "Implement verifiable event ordering for audit records"
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
        },
        {
          id: "CA-4",
          control: "Security Assessment Plan",
          status: "gap",
          details: "Security assessment plan not developed",
          recommendation: "Develop comprehensive security assessment plan"
        },
        {
          id: "CA-5",
          control: "Action Plan and Milestones",
          status: "gap",
          details: "Action plan and milestones not established",
          recommendation: "Establish action plan and milestones for security improvements"
        },
        {
          id: "CA-6",
          control: "Security Authorization",
          status: "gap",
          details: "Security authorization not implemented",
          recommendation: "Implement security authorization process for information systems"
        },
        {
          id: "CA-7",
          control: "Continuous Monitoring",
          status: "gap",
          details: "Continuous monitoring not implemented",
          recommendation: "Implement continuous monitoring program for security controls"
        },
        {
          id: "CA-8",
          control: "Penetration Testing",
          status: "gap",
          details: "Penetration testing not conducted",
          recommendation: "Conduct regular penetration testing of information systems"
        },
        {
          id: "CA-9",
          control: "Internal System Connections",
          status: "gap",
          details: "Internal system connections not managed",
          recommendation: "Manage and monitor internal system connections"
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
          recommendation: "Perform security impact analysis for configuration changes"
        },
        {
          id: "CM-5",
          control: "Access Restrictions for Change",
          status: "gap",
          details: "Access restrictions for changes not implemented",
          recommendation: "Implement access restrictions for configuration changes"
        },
        {
          id: "CM-6",
          control: "Configuration Settings",
          status: "gap",
          details: "Configuration settings not established",
          recommendation: "Establish and maintain secure configuration settings"
        },
        {
          id: "CM-7",
          control: "Least Functionality",
          status: "gap",
          details: "Least functionality principle not implemented",
          recommendation: "Implement least functionality principle for system configurations"
        },
        {
          id: "CM-8",
          control: "Information System Component Inventory",
          status: "gap",
          details: "System component inventory not maintained",
          recommendation: "Maintain comprehensive system component inventory"
        },
        {
          id: "CM-9",
          control: "Configuration Management Plan",
          status: "gap",
          details: "Configuration management plan not developed",
          recommendation: "Develop comprehensive configuration management plan"
        },
        {
          id: "CM-10",
          control: "Software Usage Restrictions",
          status: "gap",
          details: "Software usage restrictions not implemented",
          recommendation: "Implement software usage restrictions and licensing controls"
        },
        {
          id: "CM-11",
          control: "User-Installed Software",
          status: "gap",
          details: "User-installed software controls not implemented",
          recommendation: "Implement controls for user-installed software"
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
        },
        {
          id: "CP-4",
          control: "Contingency Plan Testing",
          status: "gap",
          details: "Contingency plan testing not conducted",
          recommendation: "Conduct regular testing of contingency plans"
        },
        {
          id: "CP-5",
          control: "Contingency Plan Update",
          status: "gap",
          details: "Contingency plan update process not established",
          recommendation: "Establish process for updating contingency plans"
        },
        {
          id: "CP-6",
          control: "Alternate Storage Site",
          status: "gap",
          details: "Alternate storage site not established",
          recommendation: "Establish alternate storage site for critical data"
        },
        {
          id: "CP-7",
          control: "Alternate Processing Site",
          status: "gap",
          details: "Alternate processing site not established",
          recommendation: "Establish alternate processing site for critical systems"
        },
        {
          id: "CP-8",
          control: "Telecommunications Services",
          status: "gap",
          details: "Telecommunications services not planned",
          recommendation: "Plan for telecommunications services in contingency operations"
        },
        {
          id: "CP-9",
          control: "Information System Backup",
          status: "gap",
          details: "System backup procedures not implemented",
          recommendation: "Implement comprehensive system backup procedures"
        },
        {
          id: "CP-10",
          control: "Information System Recovery and Reconstitution",
          status: "gap",
          details: "System recovery procedures not implemented",
          recommendation: "Implement system recovery and reconstitution procedures"
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
          recommendation: "Implement comprehensive authenticator management system"
        },
        {
          id: "IA-6",
          control: "Authenticator Feedback",
          status: "gap",
          details: "Authenticator feedback not implemented",
          recommendation: "Implement authenticator feedback mechanisms"
        },
        {
          id: "IA-7",
          control: "Cryptographic Module Authentication",
          status: "gap",
          details: "Cryptographic module authentication not implemented",
          recommendation: "Implement cryptographic module authentication"
        },
        {
          id: "IA-8",
          control: "Identification and Authentication (Non-Organizational Users)",
          status: "gap",
          details: "Non-organizational user authentication not implemented",
          recommendation: "Implement authentication for non-organizational users"
        },
        {
          id: "IA-9",
          control: "Service Identification and Authentication",
          status: "gap",
          details: "Service identification and authentication not implemented",
          recommendation: "Implement service identification and authentication"
        },
        {
          id: "IA-10",
          control: "Adaptive Identification and Authentication",
          status: "gap",
          details: "Adaptive identification and authentication not implemented",
          recommendation: "Implement adaptive identification and authentication"
        },
        {
          id: "IA-11",
          control: "Re-authentication",
          status: "gap",
          details: "Re-authentication procedures not implemented",
          recommendation: "Implement re-authentication procedures"
        },
        {
          id: "IA-12",
          control: "Identity Proofing",
          status: "gap",
          details: "Identity proofing not implemented",
          recommendation: "Implement identity proofing procedures"
        },
        {
          id: "IA-13",
          control: "Managed Identities",
          status: "gap",
          details: "Managed identities not implemented",
          recommendation: "Implement managed identity system"
        },
        {
          id: "IA-14",
          control: "Identity and Access Management",
          status: "gap",
          details: "Identity and access management not implemented",
          recommendation: "Implement comprehensive identity and access management"
        },
        {
          id: "IA-15",
          control: "Identity and Access Management for Service Accounts",
          status: "gap",
          details: "Service account management not implemented",
          recommendation: "Implement service account identity and access management"
        },
        {
          id: "IA-16",
          control: "Identity and Access Management for Non-Human Users",
          status: "gap",
          details: "Non-human user management not implemented",
          recommendation: "Implement identity and access management for non-human users"
        },
        {
          id: "IA-17",
          control: "Identity and Access Management for Automated Systems",
          status: "gap",
          details: "Automated system management not implemented",
          recommendation: "Implement identity and access management for automated systems"
        },
        {
          id: "IA-18",
          control: "Identity and Access Management for Cloud Services",
          status: "gap",
          details: "Cloud service management not implemented",
          recommendation: "Implement identity and access management for cloud services"
        },
        {
          id: "IA-19",
          control: "Identity and Access Management for Mobile Devices",
          status: "gap",
          details: "Mobile device management not implemented",
          recommendation: "Implement identity and access management for mobile devices"
        },
        {
          id: "IA-20",
          control: "Identity and Access Management for Internet of Things",
          status: "gap",
          details: "IoT device management not implemented",
          recommendation: "Implement identity and access management for IoT devices"
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
          id: "IR-2",
          control: "Incident Response Training",
          status: "gap",
          details: "Incident response training not provided",
          recommendation: "Provide regular incident response training to all personnel"
        },
        {
          id: "IR-3",
          control: "Incident Response Testing",
          status: "gap",
          details: "Incident response testing not conducted",
          recommendation: "Conduct regular incident response testing and exercises"
        },
        {
          id: "IR-4",
          control: "Incident Handling",
          status: "gap",
          details: "Incident handling procedures not implemented",
          recommendation: "Implement comprehensive incident handling procedures"
        },
        {
          id: "IR-5",
          control: "Incident Monitoring",
          status: "gap",
          details: "Incident monitoring not implemented",
          recommendation: "Implement incident monitoring and detection capabilities"
        },
        {
          id: "IR-6",
          control: "Incident Reporting",
          status: "gap",
          details: "Incident reporting procedures not implemented",
          recommendation: "Implement incident reporting procedures and escalation mechanisms"
        },
        {
          id: "IR-7",
          control: "Incident Response Assistance",
          status: "gap",
          details: "Incident response assistance not available",
          recommendation: "Provide incident response assistance and support"
        },
        {
          id: "IR-8",
          control: "Incident Response Plan",
          status: "gap",
          details: "Incident response plan not developed",
          recommendation: "Develop comprehensive incident response plan"
        },
        {
          id: "IR-9",
          control: "Information Spillage Response",
          status: "gap",
          details: "Information spillage response not implemented",
          recommendation: "Implement information spillage response procedures"
        },
        {
          id: "IR-10",
          control: "Integrated Information Security Analysis Team",
          status: "gap",
          details: "Integrated security analysis team not established",
          recommendation: "Establish integrated information security analysis team"
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
        },
        {
          id: "MA-4",
          control: "Nonlocal Maintenance",
          status: "gap",
          details: "Nonlocal maintenance controls not implemented",
          recommendation: "Implement controls for nonlocal maintenance activities"
        },
        {
          id: "MA-5",
          control: "Maintenance Personnel",
          status: "gap",
          details: "Maintenance personnel screening not implemented",
          recommendation: "Implement screening procedures for maintenance personnel"
        },
        {
          id: "MA-6",
          control: "Timely Maintenance",
          status: "gap",
          details: "Timely maintenance procedures not implemented",
          recommendation: "Implement timely maintenance procedures and scheduling"
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
        },
        {
          id: "MP-4",
          control: "Media Storage",
          status: "gap",
          details: "Media storage controls not implemented",
          recommendation: "Implement secure media storage controls"
        },
        {
          id: "MP-5",
          control: "Media Transport",
          status: "gap",
          details: "Media transport controls not implemented",
          recommendation: "Implement secure media transport controls"
        },
        {
          id: "MP-6",
          control: "Media Sanitization",
          status: "gap",
          details: "Media sanitization not implemented",
          recommendation: "Implement media sanitization procedures"
        },
        {
          id: "MP-7",
          control: "Media Use",
          status: "gap",
          details: "Media use controls not implemented",
          recommendation: "Implement media use controls and restrictions"
        },
        {
          id: "MP-8",
          control: "Media Downgrading",
          status: "gap",
          details: "Media downgrading procedures not implemented",
          recommendation: "Implement media downgrading procedures"
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
        },
        {
          id: "PE-4",
          control: "Access Control for Transmission Medium",
          status: "gap",
          details: "Transmission medium access control not implemented",
          recommendation: "Implement access control for transmission medium"
        },
        {
          id: "PE-5",
          control: "Access Control for Output Devices",
          status: "gap",
          details: "Output device access control not implemented",
          recommendation: "Implement access control for output devices"
        },
        {
          id: "PE-6",
          control: "Monitoring Physical Access",
          status: "gap",
          details: "Physical access monitoring not implemented",
          recommendation: "Implement physical access monitoring and surveillance"
        },
        {
          id: "PE-7",
          control: "Visitor Access Records",
          status: "gap",
          details: "Visitor access records not maintained",
          recommendation: "Maintain visitor access records and logs"
        },
        {
          id: "PE-8",
          control: "Power Equipment and Power Cabling",
          status: "gap",
          details: "Power equipment protection not implemented",
          recommendation: "Implement protection for power equipment and cabling"
        },
        {
          id: "PE-9",
          control: "Emergency Shutoff",
          status: "gap",
          details: "Emergency shutoff not implemented",
          recommendation: "Implement emergency shutoff procedures and controls"
        },
        {
          id: "PE-10",
          control: "Emergency Power",
          status: "gap",
          details: "Emergency power not implemented",
          recommendation: "Implement emergency power systems and procedures"
        },
        {
          id: "PE-11",
          control: "Emergency Lighting",
          status: "gap",
          details: "Emergency lighting not implemented",
          recommendation: "Implement emergency lighting systems"
        },
        {
          id: "PE-12",
          control: "Fire Protection",
          status: "gap",
          details: "Fire protection not implemented",
          recommendation: "Implement fire protection systems and procedures"
        },
        {
          id: "PE-13",
          control: "Temperature and Humidity Controls",
          status: "gap",
          details: "Temperature and humidity controls not implemented",
          recommendation: "Implement temperature and humidity control systems"
        },
        {
          id: "PE-14",
          control: "Water Damage Protection",
          status: "gap",
          details: "Water damage protection not implemented",
          recommendation: "Implement water damage protection measures"
        },
        {
          id: "PE-15",
          control: "Delivery and Removal",
          status: "gap",
          details: "Delivery and removal controls not implemented",
          recommendation: "Implement controls for delivery and removal of assets"
        },
        {
          id: "PE-16",
          control: "Alternate Work Site",
          status: "gap",
          details: "Alternate work site controls not implemented",
          recommendation: "Implement controls for alternate work sites"
        },
        {
          id: "PE-17",
          control: "Alternate Work Site Security",
          status: "gap",
          details: "Alternate work site security not implemented",
          recommendation: "Implement security controls for alternate work sites"
        },
        {
          id: "PE-18",
          control: "Location of Information System Components",
          status: "gap",
          details: "System component location controls not implemented",
          recommendation: "Implement controls for system component locations"
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
        },
        {
          id: "PL-4",
          control: "Rules of Behavior",
          status: "gap",
          details: "Rules of behavior not established",
          recommendation: "Establish and communicate rules of behavior for system users"
        },
        {
          id: "PL-5",
          control: "Privacy Impact Assessment",
          status: "gap",
          details: "Privacy impact assessment not conducted",
          recommendation: "Conduct privacy impact assessments for new systems and processes"
        },
        {
          id: "PL-6",
          control: "Security and Privacy Architecture",
          status: "gap",
          details: "Security and privacy architecture not developed",
          recommendation: "Develop comprehensive security and privacy architecture"
        },
        {
          id: "PL-7",
          control: "Central Management",
          status: "gap",
          details: "Central management not implemented",
          recommendation: "Implement central management for security and privacy controls"
        },
        {
          id: "PL-8",
          control: "Security and Privacy Architectures",
          status: "gap",
          details: "Security and privacy architectures not developed",
          recommendation: "Develop multiple security and privacy architectures as needed"
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
        },
        {
          id: "PS-4",
          control: "Personnel Termination",
          status: "gap",
          details: "Personnel termination procedures not implemented",
          recommendation: "Implement secure personnel termination procedures"
        },
        {
          id: "PS-5",
          control: "Personnel Transfer",
          status: "gap",
          details: "Personnel transfer procedures not implemented",
          recommendation: "Implement secure personnel transfer procedures"
        },
        {
          id: "PS-6",
          control: "Access Agreements",
          status: "gap",
          details: "Access agreements not implemented",
          recommendation: "Implement access agreements for all personnel"
        },
        {
          id: "PS-7",
          control: "Third-Party Personnel Security",
          status: "gap",
          details: "Third-party personnel security not implemented",
          recommendation: "Implement security controls for third-party personnel"
        },
        {
          id: "PS-8",
          control: "Personnel Sanctions",
          status: "gap",
          details: "Personnel sanctions not implemented",
          recommendation: "Implement personnel sanctions for policy violations"
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
        },
        {
          id: "PT-4",
          control: "PII Processing Permissions",
          status: "gap",
          details: "PII processing permissions not established",
          recommendation: "Establish and enforce permissions for PII processing activities"
        },
        {
          id: "PT-5",
          control: "PII Processing Permissions",
          status: "gap",
          details: "PII processing permissions not established",
          recommendation: "Establish and enforce permissions for PII processing activities"
        },
        {
          id: "PT-6",
          control: "PII Processing Permissions",
          status: "gap",
          details: "PII processing permissions not established",
          recommendation: "Establish and enforce permissions for PII processing activities"
        },
        {
          id: "PT-7",
          control: "PII Processing Permissions",
          status: "gap",
          details: "PII processing permissions not established",
          recommendation: "Establish and enforce permissions for PII processing activities"
        },
        {
          id: "PT-8",
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
          recommendation: "Develop and implement comprehensive risk assessment policy and procedures"
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
        },
        {
          id: "RA-4",
          control: "Risk Assessment Update",
          status: "gap",
          details: "Risk assessment update process not established",
          recommendation: "Establish process for updating risk assessments"
        },
        {
          id: "RA-5",
          control: "Vulnerability Scanning",
          status: "gap",
          details: "Vulnerability scanning not implemented",
          recommendation: "Implement regular vulnerability scanning procedures"
        },
        {
          id: "RA-6",
          control: "Technical Surveillance Countermeasures Survey",
          status: "gap",
          details: "Technical surveillance countermeasures not implemented",
          recommendation: "Implement technical surveillance countermeasures survey"
        },
        {
          id: "RA-7",
          control: "Risk Response",
          status: "gap",
          details: "Risk response procedures not implemented",
          recommendation: "Implement risk response procedures and controls"
        },
        {
          id: "RA-8",
          control: "Privacy Impact Assessment",
          status: "gap",
          details: "Privacy impact assessment not conducted",
          recommendation: "Conduct privacy impact assessments for new systems"
        },
        {
          id: "RA-9",
          control: "Criticality Analysis",
          status: "gap",
          details: "Criticality analysis not performed",
          recommendation: "Perform criticality analysis of information systems"
        },
        {
          id: "RA-10",
          control: "Threat Hunting",
          status: "gap",
          details: "Threat hunting not implemented",
          recommendation: "Implement proactive threat hunting capabilities"
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
          recommendation: "Develop and implement comprehensive system and services acquisition policy and procedures"
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
        },
        {
          id: "SA-4",
          control: "Acquisition Process",
          status: "gap",
          details: "Acquisition process not established",
          recommendation: "Establish comprehensive acquisition process and procedures"
        },
        {
          id: "SA-5",
          control: "Information System Documentation",
          status: "gap",
          details: "System documentation not maintained",
          recommendation: "Maintain comprehensive system documentation"
        },
        {
          id: "SA-6",
          control: "Software Usage Restrictions",
          status: "gap",
          details: "Software usage restrictions not implemented",
          recommendation: "Implement software usage restrictions and licensing controls"
        },
        {
          id: "SA-7",
          control: "User-Installed Software",
          status: "gap",
          details: "User-installed software controls not implemented",
          recommendation: "Implement controls for user-installed software"
        },
        {
          id: "SA-8",
          control: "Security Engineering Principles",
          status: "gap",
          details: "Security engineering principles not implemented",
          recommendation: "Implement security engineering principles in system design"
        },
        {
          id: "SA-9",
          control: "External Information System Services",
          status: "gap",
          details: "External system service controls not implemented",
          recommendation: "Implement controls for external information system services"
        },
        {
          id: "SA-10",
          control: "Developer Configuration Management",
          status: "gap",
          details: "Developer configuration management not implemented",
          recommendation: "Implement developer configuration management controls"
        },
        {
          id: "SA-11",
          control: "Developer Security Testing and Evaluation",
          status: "gap",
          details: "Developer security testing not implemented",
          recommendation: "Implement developer security testing and evaluation"
        },
        {
          id: "SA-12",
          control: "Supply Chain Protection",
          status: "gap",
          details: "Supply chain protection not implemented",
          recommendation: "Implement supply chain protection controls"
        },
        {
          id: "SA-13",
          control: "Trustworthiness",
          status: "gap",
          details: "Trustworthiness controls not implemented",
          recommendation: "Implement trustworthiness controls for systems"
        },
        {
          id: "SA-14",
          control: "Criticality Analysis",
          status: "gap",
          details: "Criticality analysis not performed",
          recommendation: "Perform criticality analysis of acquired systems"
        },
        {
          id: "SA-15",
          control: "Development Process, Standards, and Tools",
          status: "gap",
          details: "Development process standards not established",
          recommendation: "Establish development process standards and tools"
        },
        {
          id: "SA-16",
          control: "Developer-Provided Training",
          status: "gap",
          details: "Developer-provided training not implemented",
          recommendation: "Implement developer-provided training programs"
        },
        {
          id: "SA-17",
          control: "Developer Security Architecture and Design",
          status: "gap",
          details: "Developer security architecture not implemented",
          recommendation: "Implement developer security architecture and design"
        },
        {
          id: "SA-18",
          control: "Tamper Resistance and Detection",
          status: "gap",
          details: "Tamper resistance not implemented",
          recommendation: "Implement tamper resistance and detection mechanisms"
        },
        {
          id: "SA-19",
          control: "Component Authenticity",
          status: "gap",
          details: "Component authenticity not verified",
          recommendation: "Implement component authenticity verification"
        },
        {
          id: "SA-20",
          control: "Customized Development of Critical Components",
          status: "gap",
          details: "Customized development not implemented",
          recommendation: "Implement customized development for critical components"
        },
        {
          id: "SA-21",
          control: "Developer Screening",
          status: "gap",
          details: "Developer screening not implemented",
          recommendation: "Implement developer screening procedures"
        },
        {
          id: "SA-22",
          control: "Unsupported System Components",
          status: "gap",
          details: "Unsupported component controls not implemented",
          recommendation: "Implement controls for unsupported system components"
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
          recommendation: "Develop and implement comprehensive system and communications protection policy and procedures"
        },
        {
          id: "SC-2",
          control: "Application Partitioning",
          status: "gap",
          details: "Application partitioning not implemented",
          recommendation: "Implement application partitioning controls"
        },
        {
          id: "SC-3",
          control: "Security Function Isolation",
          status: "gap",
          details: "Security function isolation not implemented",
          recommendation: "Implement security function isolation mechanisms"
        },
        {
          id: "SC-4",
          control: "Information in Shared System Resources",
          status: "gap",
          details: "Shared resource protection not implemented",
          recommendation: "Implement protection for information in shared system resources"
        },
        {
          id: "SC-5",
          control: "Denial of Service Protection",
          status: "gap",
          details: "Denial of service protection not implemented",
          recommendation: "Implement denial of service protection mechanisms"
        },
        {
          id: "SC-6",
          control: "Resource Availability",
          status: "gap",
          details: "Resource availability controls not implemented",
          recommendation: "Implement resource availability controls"
        },
        {
          id: "SC-7",
          control: "Boundary Protection",
          status: "gap",
          details: "Boundary protection not implemented",
          recommendation: "Implement comprehensive boundary protection controls"
        },
        {
          id: "SC-8",
          control: "Transmission Confidentiality and Integrity",
          status: "gap",
          details: "Transmission confidentiality and integrity not implemented",
          recommendation: "Implement transmission confidentiality and integrity controls"
        },
        {
          id: "SC-9",
          control: "Transmission Confidentiality",
          status: "gap",
          details: "Transmission confidentiality not implemented",
          recommendation: "Implement transmission confidentiality controls"
        },
        {
          id: "SC-10",
          control: "Network Disconnect",
          status: "gap",
          details: "Network disconnect controls not implemented",
          recommendation: "Implement network disconnect controls"
        },
        {
          id: "SC-11",
          control: "Trusted Path",
          status: "gap",
          details: "Trusted path not implemented",
          recommendation: "Implement trusted path mechanisms"
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
          recommendation: "Implement cryptographic protection mechanisms"
        },
        {
          id: "SC-14",
          control: "Public Access Protections",
          status: "gap",
          details: "Public access protections not implemented",
          recommendation: "Implement public access protection controls"
        },
        {
          id: "SC-15",
          control: "Collaborative Computing Devices",
          status: "gap",
          details: "Collaborative computing controls not implemented",
          recommendation: "Implement collaborative computing device controls"
        },
        {
          id: "SC-16",
          control: "Transmission of Security Attributes",
          status: "gap",
          details: "Security attribute transmission not implemented",
          recommendation: "Implement transmission of security attributes"
        },
        {
          id: "SC-17",
          control: "Public Key Infrastructure Certificates",
          status: "gap",
          details: "PKI certificate management not implemented",
          recommendation: "Implement public key infrastructure certificate management"
        },
        {
          id: "SC-18",
          control: "Mobile Code",
          status: "gap",
          details: "Mobile code controls not implemented",
          recommendation: "Implement mobile code controls and restrictions"
        },
        {
          id: "SC-19",
          control: "Voice Over Internet Protocol",
          status: "gap",
          details: "VoIP security controls not implemented",
          recommendation: "Implement VoIP security controls"
        },
        {
          id: "SC-20",
          control: "Secure Name / Address Resolution Service (Authoritative Source)",
          status: "gap",
          details: "Secure name resolution not implemented",
          recommendation: "Implement secure name and address resolution services"
        },
        {
          id: "SC-21",
          control: "Secure Name / Address Resolution Service (Recursive or Caching Resolver)",
          status: "gap",
          details: "Secure recursive resolution not implemented",
          recommendation: "Implement secure recursive name resolution services"
        },
        {
          id: "SC-22",
          control: "Architecture and Provisioning for Name / Address Resolution Service",
          status: "gap",
          details: "Name resolution architecture not implemented",
          recommendation: "Implement secure name resolution architecture"
        },
        {
          id: "SC-23",
          control: "Session Authenticity",
          status: "gap",
          details: "Session authenticity not implemented",
          recommendation: "Implement session authenticity controls"
        },
        {
          id: "SC-24",
          control: "Fail in Known State",
          status: "gap",
          details: "Fail in known state not implemented",
          recommendation: "Implement fail in known state mechanisms"
        },
        {
          id: "SC-25",
          control: "Thin Nodes",
          status: "gap",
          details: "Thin node controls not implemented",
          recommendation: "Implement thin node controls"
        },
        {
          id: "SC-26",
          control: "Honeypots",
          status: "gap",
          details: "Honeypot controls not implemented",
          recommendation: "Implement honeypot controls for threat detection"
        },
        {
          id: "SC-27",
          control: "Platform-Independent Applications",
          status: "gap",
          details: "Platform-independent applications not implemented",
          recommendation: "Implement platform-independent application controls"
        },
        {
          id: "SC-28",
          control: "Protection of Information at Rest",
          status: "gap",
          details: "Information at rest protection not implemented",
          recommendation: "Implement protection for information at rest"
        },
        {
          id: "SC-29",
          control: "Heterogeneous Technologies",
          status: "gap",
          details: "Heterogeneous technology controls not implemented",
          recommendation: "Implement controls for heterogeneous technologies"
        },
        {
          id: "SC-30",
          control: "Concealment and Misdirection",
          status: "gap",
          details: "Concealment and misdirection not implemented",
          recommendation: "Implement concealment and misdirection controls"
        },
        {
          id: "SC-31",
          control: "Covert Channel Analysis",
          status: "gap",
          details: "Covert channel analysis not performed",
          recommendation: "Perform covert channel analysis"
        },
        {
          id: "SC-32",
          control: "Information System Partitioning",
          status: "gap",
          details: "System partitioning not implemented",
          recommendation: "Implement information system partitioning"
        },
        {
          id: "SC-33",
          control: "Transmission Preparation Integrity",
          status: "gap",
          details: "Transmission preparation integrity not implemented",
          recommendation: "Implement transmission preparation integrity controls"
        },
        {
          id: "SC-34",
          control: "Non-Modifiable Executable Programs",
          status: "gap",
          details: "Non-modifiable executable controls not implemented",
          recommendation: "Implement non-modifiable executable program controls"
        },
        {
          id: "SC-35",
          control: "Hardware-Based Protection",
          status: "gap",
          details: "Hardware-based protection not implemented",
          recommendation: "Implement hardware-based protection mechanisms"
        },
        {
          id: "SC-36",
          control: "Distributed Processing and Storage",
          status: "gap",
          details: "Distributed processing controls not implemented",
          recommendation: "Implement distributed processing and storage controls"
        },
        {
          id: "SC-37",
          control: "Out-of-Band Channels",
          status: "gap",
          details: "Out-of-band channel controls not implemented",
          recommendation: "Implement out-of-band channel controls"
        },
        {
          id: "SC-38",
          control: "Operations Security",
          status: "gap",
          details: "Operations security not implemented",
          recommendation: "Implement operations security controls"
        },
        {
          id: "SC-39",
          control: "Process Isolation",
          status: "gap",
          details: "Process isolation not implemented",
          recommendation: "Implement process isolation controls"
        },
        {
          id: "SC-40",
          control: "Wireless Link Protection",
          status: "gap",
          details: "Wireless link protection not implemented",
          recommendation: "Implement wireless link protection controls"
        },
        {
          id: "SC-41",
          control: "Port and I/O Device Access",
          status: "gap",
          details: "Port and I/O device access controls not implemented",
          recommendation: "Implement port and I/O device access controls"
        },
        {
          id: "SC-42",
          control: "Sensor Capability and Data",
          status: "gap",
          details: "Sensor capability controls not implemented",
          recommendation: "Implement sensor capability and data controls"
        },
        {
          id: "SC-43",
          control: "Usage Restrictions",
          status: "gap",
          details: "Usage restrictions not implemented",
          recommendation: "Implement usage restriction controls"
        },
        {
          id: "SC-44",
          control: "Detonation Chambers",
          status: "gap",
          details: "Detonation chamber controls not implemented",
          recommendation: "Implement detonation chamber controls"
        },
        {
          id: "SC-45",
          control: "System Time",
          status: "gap",
          details: "System time controls not implemented",
          recommendation: "Implement system time controls"
        },
        {
          id: "SC-46",
          control: "Cross Domain Policy Enforcement",
          status: "gap",
          details: "Cross domain policy enforcement not implemented",
          recommendation: "Implement cross domain policy enforcement"
        },
        {
          id: "SC-47",
          control: "Alternate Communications Paths",
          status: "gap",
          details: "Alternate communications paths not implemented",
          recommendation: "Implement alternate communications paths"
        },
        {
          id: "SC-48",
          control: "Application Partitioning",
          status: "gap",
          details: "Application partitioning not implemented",
          recommendation: "Implement application partitioning controls"
        },
        {
          id: "SC-49",
          control: "Concealment and Misdirection",
          status: "gap",
          details: "Concealment and misdirection not implemented",
          recommendation: "Implement concealment and misdirection controls"
        },
        {
          id: "SC-50",
          control: "Covert Channel Analysis",
          status: "gap",
          details: "Covert channel analysis not performed",
          recommendation: "Perform covert channel analysis"
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
          recommendation: "Develop and implement comprehensive system and information integrity policy and procedures"
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
        },
        {
          id: "SI-4",
          control: "Information System Monitoring",
          status: "gap",
          details: "System monitoring not implemented",
          recommendation: "Implement comprehensive information system monitoring"
        },
        {
          id: "SI-5",
          control: "Security Alerts, Advisories, and Directives",
          status: "gap",
          details: "Security alerts not implemented",
          recommendation: "Implement security alerts, advisories, and directives"
        },
        {
          id: "SI-6",
          control: "Security and Privacy Function Verification",
          status: "gap",
          details: "Security function verification not implemented",
          recommendation: "Implement security and privacy function verification"
        },
        {
          id: "SI-7",
          control: "Software, Firmware, and Information Integrity",
          status: "gap",
          details: "Software integrity controls not implemented",
          recommendation: "Implement software, firmware, and information integrity controls"
        },
        {
          id: "SI-8",
          control: "Spam Protection",
          status: "gap",
          details: "Spam protection not implemented",
          recommendation: "Implement spam protection mechanisms"
        },
        {
          id: "SI-9",
          control: "Information Input Validation",
          status: "gap",
          details: "Input validation not implemented",
          recommendation: "Implement comprehensive input validation controls"
        },
        {
          id: "SI-10",
          control: "Information Input Accuracy, Completeness, Validity, and Authenticity",
          status: "gap",
          details: "Input accuracy controls not implemented",
          recommendation: "Implement input accuracy, completeness, validity, and authenticity controls"
        },
        {
          id: "SI-11",
          control: "Error Handling",
          status: "gap",
          details: "Error handling not implemented",
          recommendation: "Implement comprehensive error handling procedures"
        },
        {
          id: "SI-12",
          control: "Information Management and Retention",
          status: "gap",
          details: "Information management not implemented",
          recommendation: "Implement information management and retention controls"
        },
        {
          id: "SI-13",
          control: "Memory Protection",
          status: "gap",
          details: "Memory protection not implemented",
          recommendation: "Implement memory protection controls"
        },
        {
          id: "SI-14",
          control: "Non-Persistence",
          status: "gap",
          details: "Non-persistence controls not implemented",
          recommendation: "Implement non-persistence controls"
        },
        {
          id: "SI-15",
          control: "Information Output Filtering",
          status: "gap",
          details: "Output filtering not implemented",
          recommendation: "Implement information output filtering controls"
        },
        {
          id: "SI-16",
          control: "Memory Protection",
          status: "gap",
          details: "Memory protection not implemented",
          recommendation: "Implement memory protection controls"
        },
        {
          id: "SI-17",
          control: "Fail-Safe Procedures",
          status: "gap",
          details: "Fail-safe procedures not implemented",
          recommendation: "Implement fail-safe procedures"
        },
        {
          id: "SI-18",
          control: "Personally Identifiable Information Processing and Transparency",
          status: "gap",
          details: "PII processing controls not implemented",
          recommendation: "Implement PII processing and transparency controls"
        },
        {
          id: "SI-19",
          control: "Use of Validated Cryptography",
          status: "gap",
          details: "Validated cryptography not implemented",
          recommendation: "Implement use of validated cryptography"
        },
        {
          id: "SI-20",
          control: "Tainting",
          status: "gap",
          details: "Tainting controls not implemented",
          recommendation: "Implement tainting controls"
        },
        {
          id: "SI-21",
          control: "Information Refresh",
          status: "gap",
          details: "Information refresh not implemented",
          recommendation: "Implement information refresh controls"
        },
        {
          id: "SI-22",
          control: "Information Diversity",
          status: "gap",
          details: "Information diversity not implemented",
          recommendation: "Implement information diversity controls"
        },
        {
          id: "SI-23",
          control: "Information Fragmentation",
          status: "gap",
          details: "Information fragmentation not implemented",
          recommendation: "Implement information fragmentation controls"
        },
        {
          id: "SI-24",
          control: "Predictable Failure Prevention",
          status: "gap",
          details: "Predictable failure prevention not implemented",
          recommendation: "Implement predictable failure prevention controls"
        },
        {
          id: "SI-25",
          control: "No Single Point of Failure",
          status: "gap",
          details: "Single point of failure not addressed",
          recommendation: "Implement controls to prevent single points of failure"
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
          recommendation: "Develop and implement comprehensive supply chain risk management policy and procedures"
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
        },
        {
          id: "SR-4",
          control: "Supply Chain Risk Management Program",
          status: "gap",
          details: "Supply chain risk management program not established",
          recommendation: "Establish comprehensive supply chain risk management program"
        },
        {
          id: "SR-5",
          control: "Limitations on Harm from Potential Suppliers",
          status: "gap",
          details: "Supplier harm limitations not implemented",
          recommendation: "Implement limitations on harm from potential suppliers"
        },
        {
          id: "SR-6",
          control: "Minimum Security Requirements",
          status: "gap",
          details: "Minimum security requirements not established",
          recommendation: "Establish minimum security requirements for suppliers"
        },
        {
          id: "SR-7",
          control: "Supply Chain Configuration Management",
          status: "gap",
          details: "Supply chain configuration management not implemented",
          recommendation: "Implement supply chain configuration management"
        },
        {
          id: "SR-8",
          control: "Supplier Review and Update",
          status: "gap",
          details: "Supplier review process not implemented",
          recommendation: "Implement supplier review and update process"
        },
        {
          id: "SR-9",
          control: "Supply Chain Controls Testing",
          status: "gap",
          details: "Supply chain controls testing not implemented",
          recommendation: "Implement supply chain controls testing"
        },
        {
          id: "SR-10",
          control: "Incident Response and Recovery Plan Testing",
          status: "gap",
          details: "Incident response testing not implemented",
          recommendation: "Implement incident response and recovery plan testing"
        },
        {
          id: "SR-11",
          control: "Penetration Testing",
          status: "gap",
          details: "Penetration testing not implemented",
          recommendation: "Implement penetration testing for supply chain"
        },
        {
          id: "SR-12",
          control: "Component Authenticity",
          status: "gap",
          details: "Component authenticity not verified",
          recommendation: "Implement component authenticity verification"
        },
        {
          id: "SR-13",
          control: "Criticality Analysis",
          status: "gap",
          details: "Criticality analysis not performed",
          recommendation: "Perform criticality analysis of supply chain components"
        },
        {
          id: "SR-14",
          control: "Tamper Resistance and Detection",
          status: "gap",
          details: "Tamper resistance not implemented",
          recommendation: "Implement tamper resistance and detection mechanisms"
        },
        {
          id: "SR-15",
          control: "Component Disposal",
          status: "gap",
          details: "Component disposal procedures not implemented",
          recommendation: "Implement secure component disposal procedures"
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
        },
        {
          id: "PM-4",
          control: "Plan of Action and Milestones Process",
          status: "gap",
          details: "Plan of action and milestones process not established",
          recommendation: "Establish plan of action and milestones process"
        },
        {
          id: "PM-5",
          control: "Information System Inventory",
          status: "gap",
          details: "Information system inventory not maintained",
          recommendation: "Maintain comprehensive information system inventory"
        },
        {
          id: "PM-6",
          control: "Information Security Measures of Performance",
          status: "gap",
          details: "Security performance measures not established",
          recommendation: "Establish information security measures of performance"
        },
        {
          id: "PM-7",
          control: "Enterprise Architecture",
          status: "gap",
          details: "Enterprise architecture not developed",
          recommendation: "Develop comprehensive enterprise architecture"
        },
        {
          id: "PM-8",
          control: "Critical Infrastructure Plan",
          status: "gap",
          details: "Critical infrastructure plan not developed",
          recommendation: "Develop critical infrastructure plan"
        },
        {
          id: "PM-9",
          control: "Risk Management Strategy",
          status: "gap",
          details: "Risk management strategy not developed",
          recommendation: "Develop comprehensive risk management strategy"
        },
        {
          id: "PM-10",
          control: "Security Authorization Process",
          status: "gap",
          details: "Security authorization process not implemented",
          recommendation: "Implement security authorization process"
        },
        {
          id: "PM-11",
          control: "Mission and Business Process Definition",
          status: "gap",
          details: "Mission and business process definition not established",
          recommendation: "Establish mission and business process definition"
        },
        {
          id: "PM-12",
          control: "Insider Threat Program",
          status: "gap",
          details: "Insider threat program not established",
          recommendation: "Establish comprehensive insider threat program"
        },
        {
          id: "PM-13",
          control: "Information Security Workforce",
          status: "gap",
          details: "Information security workforce not established",
          recommendation: "Establish qualified information security workforce"
        },
        {
          id: "PM-14",
          control: "Testing, Training, and Monitoring",
          status: "gap",
          details: "Testing, training, and monitoring not implemented",
          recommendation: "Implement testing, training, and monitoring programs"
        },
        {
          id: "PM-15",
          control: "Contacts with Security Groups and Associations",
          status: "gap",
          details: "Security group contacts not established",
          recommendation: "Establish contacts with security groups and associations"
        },
        {
          id: "PM-16",
          control: "Threat Awareness Program",
          status: "gap",
          details: "Threat awareness program not established",
          recommendation: "Establish comprehensive threat awareness program"
        },
        {
          id: "PM-17",
          control: "Counterfeit Parts",
          status: "gap",
          details: "Counterfeit parts controls not implemented",
          recommendation: "Implement counterfeit parts controls"
        },
        {
          id: "PM-18",
          control: "Technology Transfer",
          status: "gap",
          details: "Technology transfer controls not implemented",
          recommendation: "Implement technology transfer controls"
        },
        {
          id: "PM-19",
          control: "Privacy Program",
          status: "gap",
          details: "Privacy program not established",
          recommendation: "Establish comprehensive privacy program"
        },
        {
          id: "PM-20",
          control: "Privacy Controls",
          status: "gap",
          details: "Privacy controls not implemented",
          recommendation: "Implement comprehensive privacy controls"
        },
        {
          id: "PM-21",
          control: "Privacy Impact Assessment",
          status: "gap",
          details: "Privacy impact assessment not conducted",
          recommendation: "Conduct privacy impact assessments"
        },
        {
          id: "PM-22",
          control: "Privacy Risk Assessment",
          status: "gap",
          details: "Privacy risk assessment not conducted",
          recommendation: "Conduct privacy risk assessments"
        },
        {
          id: "PM-23",
          control: "Data Breach Response Plan",
          status: "gap",
          details: "Data breach response plan not developed",
          recommendation: "Develop comprehensive data breach response plan"
        },
        {
          id: "PM-24",
          control: "Data Breach Response Team",
          status: "gap",
          details: "Data breach response team not established",
          recommendation: "Establish data breach response team"
        },
        {
          id: "PM-25",
          control: "Data Breach Notification",
          status: "gap",
          details: "Data breach notification procedures not established",
          recommendation: "Establish data breach notification procedures"
        },
        {
          id: "PM-26",
          control: "Data Breach Recovery",
          status: "gap",
          details: "Data breach recovery procedures not established",
          recommendation: "Establish data breach recovery procedures"
        },
        {
          id: "PM-27",
          control: "Data Breach Lessons Learned",
          status: "gap",
          details: "Data breach lessons learned process not established",
          recommendation: "Establish data breach lessons learned process"
        },
        {
          id: "PM-28",
          control: "Data Breach Training",
          status: "gap",
          details: "Data breach training not provided",
          recommendation: "Provide data breach training to personnel"
        },
        {
          id: "PM-29",
          control: "Data Breach Testing",
          status: "gap",
          details: "Data breach testing not conducted",
          recommendation: "Conduct data breach testing and exercises"
        },
        {
          id: "PM-30",
          control: "Data Breach Monitoring",
          status: "gap",
          details: "Data breach monitoring not implemented",
          recommendation: "Implement data breach monitoring capabilities"
        }
      ]
    }
  ]
};

// NIST SP 800-63B-4 Digital Identity Guidelines (Current July 2025)
export const nist80063b = {
  name: "NIST SP 800-63B-4",
  description: "Digital Identity Guidelines - Authentication and Authenticator Management (Current July 2025)",
  categories: [
    {
      name: "Authentication Assurance Level (AAL)",
      description: "Technical requirements for each of the three authentication assurance levels",
      results: [
        // AAL1 Controls
        {
          id: "AAL1.1",
          control: "AAL1 - Permitted Authenticator Types",
          status: "gap",
          details: "AAL1 authenticator types not properly configured",
          recommendation: "Implement AAL1 permitted authenticator types as specified in NIST SP 800-63B-4 Section 2.1.1"
        },
        {
          id: "AAL1.2",
          control: "AAL1 - Authenticator and Verifier Requirements",
          status: "gap",
          details: "AAL1 authenticator and verifier requirements not met",
          recommendation: "Implement AAL1 authenticator and verifier requirements as specified in NIST SP 800-63B-4 Section 2.1.2"
        },
        {
          id: "AAL1.3",
          control: "AAL1 - Reauthentication",
          status: "gap",
          details: "AAL1 reauthentication requirements not implemented",
          recommendation: "Implement AAL1 reauthentication requirements as specified in NIST SP 800-63B-4 Section 2.1.3"
        },
        // AAL2 Controls
        {
          id: "AAL2.1",
          control: "AAL2 - Permitted Authenticator Types",
          status: "gap",
          details: "AAL2 authenticator types not properly configured",
          recommendation: "Implement AAL2 permitted authenticator types as specified in NIST SP 800-63B-4 Section 2.2.1"
        },
        {
          id: "AAL2.2",
          control: "AAL2 - Authenticator and Verifier Requirements",
          status: "gap",
          details: "AAL2 authenticator and verifier requirements not met",
          recommendation: "Implement AAL2 authenticator and verifier requirements as specified in NIST SP 800-63B-4 Section 2.2.2"
        },
        {
          id: "AAL2.3",
          control: "AAL2 - Reauthentication",
          status: "gap",
          details: "AAL2 reauthentication requirements not implemented",
          recommendation: "Implement AAL2 reauthentication requirements as specified in NIST SP 800-63B-4 Section 2.2.3"
        },
        // AAL3 Controls
        {
          id: "AAL3.1",
          control: "AAL3 - Permitted Authenticator Types",
          status: "gap",
          details: "AAL3 authenticator types not properly configured",
          recommendation: "Implement AAL3 permitted authenticator types as specified in NIST SP 800-63B-4 Section 2.3.1"
        },
        {
          id: "AAL3.2",
          control: "AAL3 - Authenticator and Verifier Requirements",
          status: "gap",
          details: "AAL3 authenticator and verifier requirements not met",
          recommendation: "Implement AAL3 authenticator and verifier requirements as specified in NIST SP 800-63B-4 Section 2.3.2"
        },
        {
          id: "AAL3.3",
          control: "AAL3 - Reauthentication",
          status: "gap",
          details: "AAL3 reauthentication requirements not implemented",
          recommendation: "Implement AAL3 reauthentication requirements as specified in NIST SP 800-63B-4 Section 2.3.3"
        },
        // General AAL Requirements
        {
          id: "AAL_GEN.1",
          control: "General - Security Controls",
          status: "gap",
          details: "General security controls not implemented",
          recommendation: "Implement general security controls as specified in NIST SP 800-63B-4 Section 2.4.1"
        },
        {
          id: "AAL_GEN.2",
          control: "General - Records Retention Policy",
          status: "gap",
          details: "Records retention policy not established",
          recommendation: "Establish records retention policy as specified in NIST SP 800-63B-4 Section 2.4.2"
        },
        {
          id: "AAL_GEN.3",
          control: "General - Privacy Requirements",
          status: "gap",
          details: "Privacy requirements not implemented",
          recommendation: "Implement privacy requirements as specified in NIST SP 800-63B-4 Section 2.4.3"
        },
        {
          id: "AAL_GEN.4",
          control: "General - Redress Requirements",
          status: "gap",
          details: "Redress requirements not implemented",
          recommendation: "Implement redress requirements as specified in NIST SP 800-63B-4 Section 2.4.4"
        }
      ]
    },
    {
      name: "Authenticator Type Requirements",
      description: "Requirements by authenticator type as specified in Section 3.1",
      results: [
        {
          id: "AUTH_TYPE.1",
          control: "Passwords",
          status: "gap",
          details: "Password requirements not implemented",
          recommendation: "Implement password requirements as specified in NIST SP 800-63B-4 Section 3.1.1"
        },
        {
          id: "AUTH_TYPE.2",
          control: "Look-Up Secrets",
          status: "gap",
          details: "Look-up secret requirements not implemented",
          recommendation: "Implement look-up secret requirements as specified in NIST SP 800-63B-4 Section 3.1.2"
        },
        {
          id: "AUTH_TYPE.3",
          control: "Out-of-Band Devices",
          status: "gap",
          details: "Out-of-band device requirements not implemented",
          recommendation: "Implement out-of-band device requirements as specified in NIST SP 800-63B-4 Section 3.1.3"
        },
        {
          id: "AUTH_TYPE.4",
          control: "Single-Factor OTP",
          status: "gap",
          details: "Single-factor OTP requirements not implemented",
          recommendation: "Implement single-factor OTP requirements as specified in NIST SP 800-63B-4 Section 3.1.4"
        },
        {
          id: "AUTH_TYPE.5",
          control: "Multi-Factor OTPs",
          status: "gap",
          details: "Multi-factor OTP requirements not implemented",
          recommendation: "Implement multi-factor OTP requirements as specified in NIST SP 800-63B-4 Section 3.1.5"
        },
        {
          id: "AUTH_TYPE.6",
          control: "Single-Factor Cryptographic Authentication",
          status: "gap",
          details: "Single-factor cryptographic authentication requirements not implemented",
          recommendation: "Implement single-factor cryptographic authentication requirements as specified in NIST SP 800-63B-4 Section 3.1.6"
        },
        {
          id: "AUTH_TYPE.7",
          control: "Multi-Factor Cryptographic Authentication",
          status: "gap",
          details: "Multi-factor cryptographic authentication requirements not implemented",
          recommendation: "Implement multi-factor cryptographic authentication requirements as specified in NIST SP 800-63B-4 Section 3.1.7"
        }
      ]
    },
    {
      name: "Technical Requirements",
      description: "Specific technical requirements as specified in Section 3.2",
      results: [
        {
          id: "TECH.1",
          control: "Replay Resistance",
          status: "gap",
          details: "Replay resistance not implemented",
          recommendation: "Implement replay resistance as specified in NIST SP 800-63B-4 Section 3.2.1"
        },
        {
          id: "TECH.2",
          control: "Verifier-Impersonation Resistance",
          status: "gap",
          details: "Verifier-impersonation resistance not implemented",
          recommendation: "Implement verifier-impersonation resistance as specified in NIST SP 800-63B-4 Section 3.2.2"
        },
        {
          id: "TECH.3",
          control: "Biometric Performance",
          status: "gap",
          details: "Biometric performance requirements not met",
          recommendation: "Implement biometric performance requirements as specified in NIST SP 800-63B-4 Section 3.2.3"
        },
        {
          id: "TECH.4",
          control: "Authenticator Binding",
          status: "gap",
          details: "Authenticator binding not implemented",
          recommendation: "Implement authenticator binding as specified in NIST SP 800-63B-4 Section 3.2.4"
        },
        {
          id: "TECH.5",
          control: "Phishing Resistance",
          status: "gap",
          details: "Phishing resistance not implemented",
          recommendation: "Implement phishing resistance as specified in NIST SP 800-63B-4 Section 3.2.5"
        },
        {
          id: "TECH.6",
          control: "Verifier Compromise Resistance",
          status: "gap",
          details: "Verifier compromise resistance not implemented",
          recommendation: "Implement verifier compromise resistance as specified in NIST SP 800-63B-4 Section 3.2.6"
        },
        {
          id: "TECH.7",
          control: "Authenticator Compromise Resistance",
          status: "gap",
          details: "Authenticator compromise resistance not implemented",
          recommendation: "Implement authenticator compromise resistance as specified in NIST SP 800-63B-4 Section 3.2.7"
        },
        {
          id: "TECH.8",
          control: "Authenticator Secret Strength",
          status: "gap",
          details: "Authenticator secret strength requirements not met",
          recommendation: "Implement authenticator secret strength requirements as specified in NIST SP 800-63B-4 Section 3.2.8"
        },
        {
          id: "TECH.9",
          control: "Authenticator Secret Storage",
          status: "gap",
          details: "Authenticator secret storage requirements not met",
          recommendation: "Implement authenticator secret storage requirements as specified in NIST SP 800-63B-4 Section 3.2.9"
        },
        {
          id: "TECH.10",
          control: "Activation Secrets",
          status: "gap",
          details: "Activation secret requirements not implemented",
          recommendation: "Implement activation secret requirements as specified in NIST SP 800-63B-4 Section 3.2.10"
        },
        {
          id: "TECH.11",
          control: "Wireless Connection Security",
          status: "gap",
          details: "Wireless connection security requirements not implemented",
          recommendation: "Implement wireless connection security requirements as specified in NIST SP 800-63B-4 Section 3.2.11"
        },
        {
          id: "TECH.12",
          control: "Random Value Generation",
          status: "gap",
          details: "Random value generation requirements not implemented",
          recommendation: "Implement random value generation requirements as specified in NIST SP 800-63B-4 Section 3.2.12"
        },
        {
          id: "TECH.13",
          control: "Non-Exportability",
          status: "gap",
          details: "Non-exportability requirements not implemented",
          recommendation: "Implement non-exportability requirements as specified in NIST SP 800-63B-4 Section 3.2.13"
        }
      ]
    },
    {
      name: "Authenticator Event Management",
      description: "Authenticator event management as specified in Section 4",
      results: [
        {
          id: "EVENT.1",
          control: "Authenticator Binding",
          status: "gap",
          details: "Authenticator binding process not implemented",
          recommendation: "Implement authenticator binding as specified in NIST SP 800-63B-4 Section 4.1"
        },
        {
          id: "EVENT.2",
          control: "Account Recovery",
          status: "gap",
          details: "Account recovery procedures not implemented",
          recommendation: "Implement account recovery procedures as specified in NIST SP 800-63B-4 Section 4.2"
        },
        {
          id: "EVENT.3",
          control: "Authenticator Replacement",
          status: "gap",
          details: "Authenticator replacement procedures not implemented",
          recommendation: "Implement authenticator replacement procedures as specified in NIST SP 800-63B-4 Section 4.3"
        },
        {
          id: "EVENT.4",
          control: "Authenticator Deactivation",
          status: "gap",
          details: "Authenticator deactivation procedures not implemented",
          recommendation: "Implement authenticator deactivation procedures as specified in NIST SP 800-63B-4 Section 4.4"
        },
        {
          id: "EVENT.5",
          control: "Authenticator Reactivation",
          status: "gap",
          details: "Authenticator reactivation procedures not implemented",
          recommendation: "Implement authenticator reactivation procedures as specified in NIST SP 800-63B-4 Section 4.5"
        },
        {
          id: "EVENT.6",
          control: "Subscriber Notifications",
          status: "gap",
          details: "Subscriber notification procedures not implemented",
          recommendation: "Implement subscriber notification procedures as specified in NIST SP 800-63B-4 Section 4.6"
        }
      ]
    },
    {
      name: "Session Management",
      description: "Session management as specified in Section 5",
      results: [
        {
          id: "SESSION.1",
          control: "Session Establishment",
          status: "gap",
          details: "Session establishment procedures not implemented",
          recommendation: "Implement session establishment procedures as specified in NIST SP 800-63B-4 Section 5.1"
        },
        {
          id: "SESSION.2",
          control: "Reauthentication",
          status: "gap",
          details: "Reauthentication procedures not implemented",
          recommendation: "Implement reauthentication procedures as specified in NIST SP 800-63B-4 Section 5.2"
        },
        {
          id: "SESSION.3",
          control: "Session Monitoring",
          status: "gap",
          details: "Session monitoring procedures not implemented",
          recommendation: "Implement session monitoring procedures as specified in NIST SP 800-63B-4 Section 5.3"
        },
        {
          id: "SESSION.4",
          control: "Session Termination",
          status: "gap",
          details: "Session termination procedures not implemented",
          recommendation: "Implement session termination procedures as specified in NIST SP 800-63B-4 Section 5.4"
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
