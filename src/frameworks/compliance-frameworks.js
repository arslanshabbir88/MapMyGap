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

// Export all frameworks for use in the application
export const allFrameworks = {
  PCI_DSS: pciDSS,
  ISO_27001: iso27001,
  SOC_2: soc2
};
