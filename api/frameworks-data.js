// Comprehensive Compliance Framework Controls
// This file contains all the framework data to reduce the main analyze.js file size

const allFrameworks = {
  NIST_CSF: {
    name: "NIST Cybersecurity Framework (CSF) v2.0",
    description: "National Institute of Standards and Technology Cybersecurity Framework",
    categories: [
      {
        name: "IDENTIFY (ID)",
        description: "Develop an organizational understanding to manage cybersecurity risk",
        results: [
          // Asset Management (ID.AM)
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
            control: "External information systems are cataloged",
            status: "gap",
            details: "External systems catalog not maintained",
            recommendation: "Create and maintain catalog of all external information systems and connections"
          },
          {
            id: "ID.AM-5",
            control: "Resources are prioritized based on classification, criticality, and business value",
            status: "gap",
            details: "Resource prioritization not implemented",
            recommendation: "Implement resource classification and prioritization system based on business value"
          },
          {
            id: "ID.AM-6",
            control: "Cybersecurity roles and responsibilities for workforce and third parties are established",
            status: "gap",
            details: "Cybersecurity roles not defined",
            recommendation: "Define and communicate cybersecurity roles and responsibilities for all personnel"
          }
        ]
      }
    ]
  },
  SOC_2: {
    name: "SOC 2 Type II",
    description: "Service Organization Control 2 Trust Service Criteria",
    categories: [
      {
        name: "Security - Common Criteria",
        description: "Mandatory security controls that protect against unauthorized access, disclosure, and damage",
        results: [
          // CC1: Control Environment
          {
            id: "CC1.1",
            control: "The entity demonstrates a commitment to integrity and ethical values",
            status: "gap",
            details: "Code of conduct and ethical values not established or communicated",
            recommendation: "Develop and communicate a comprehensive code of conduct that emphasizes integrity and ethical values"
          },
          {
            id: "CC1.2",
            control: "The board of directors demonstrates independence and exercises oversight",
            status: "gap",
            details: "Board independence and oversight not established",
            recommendation: "Ensure board independence and establish clear oversight responsibilities for cybersecurity"
          },
          {
            id: "CC1.3",
            control: "Management establishes oversight responsibilities for the system of internal control",
            status: "gap",
            details: "Management oversight responsibilities not defined",
            recommendation: "Define and assign clear management oversight responsibilities for internal controls"
          },
          {
            id: "CC1.4",
            control: "The entity demonstrates a commitment to attract, develop, and retain competent individuals",
            status: "gap",
            details: "Competency management program not implemented",
            recommendation: "Implement programs to attract, develop, and retain competent cybersecurity personnel"
          },
          {
            id: "CC1.5",
            control: "The entity holds individuals accountable for their internal control responsibilities",
            status: "gap",
            details: "Accountability mechanisms not established",
            recommendation: "Establish clear accountability mechanisms and performance measures for internal control responsibilities"
          },
          // CC2: Communication and Information
          {
            id: "CC2.1",
            control: "The entity obtains or generates and uses relevant, quality information",
            status: "gap",
            details: "Information quality management not implemented",
            recommendation: "Implement processes to ensure information quality, relevance, and accuracy"
          },
          {
            id: "CC2.2",
            control: "The entity internally communicates information necessary to support the functioning of internal control",
            status: "gap",
            details: "Internal communication processes not established",
            recommendation: "Establish effective internal communication processes for control-related information"
          },
          {
            id: "CC2.3",
            control: "The entity communicates with external parties regarding matters affecting the functioning of internal control",
            status: "gap",
            details: "External communication procedures not implemented",
            recommendation: "Develop procedures for communicating with external parties about internal control matters"
          },
          // CC3: Risk Assessment
          {
            id: "CC3.1",
            control: "The entity specifies suitable objectives",
            status: "gap",
            details: "Suitable objectives not specified",
            recommendation: "Define clear, measurable, and achievable cybersecurity objectives"
          },
          {
            id: "CC3.2",
            control: "The entity identifies and analyzes risks to the achievement of objectives",
            status: "gap",
            details: "Risk identification and analysis processes not implemented",
            recommendation: "Implement comprehensive risk identification and analysis processes"
          },
          {
            id: "CC3.3",
            control: "The entity analyzes fraud risk",
            status: "gap",
            details: "Fraud risk analysis not conducted",
            recommendation: "Conduct regular fraud risk assessments and implement appropriate controls"
          },
          {
            id: "CC3.4",
            control: "The entity identifies and analyzes changes that could significantly affect the system of internal control",
            status: "gap",
            details: "Change impact analysis not performed",
            recommendation: "Implement processes to identify and analyze changes affecting internal controls"
          },
          // CC4: Monitoring Activities
          {
            id: "CC4.1",
            control: "The entity selects, develops, and performs ongoing and separate evaluations",
            status: "gap",
            details: "Monitoring and evaluation processes not implemented",
            recommendation: "Implement ongoing and periodic evaluation processes for internal controls"
          },
          {
            id: "CC4.2",
            control: "The entity evaluates and communicates deficiencies",
            status: "gap",
            details: "Deficiency evaluation and communication processes not established",
            recommendation: "Establish processes to evaluate and communicate control deficiencies"
          },
          // CC5: Control Activities
          {
            id: "CC5.1",
            control: "The entity selects and develops control activities",
            status: "gap",
            details: "Control activity selection and development processes not implemented",
            recommendation: "Implement processes to select and develop appropriate control activities"
          },
          {
            id: "CC5.2",
            control: "The entity selects and develops general controls over technology",
            status: "gap",
            details: "General IT controls not implemented",
            recommendation: "Implement comprehensive general controls over technology systems"
          },
          {
            id: "CC5.3",
            control: "The entity deploys control activities through policies and procedures",
            status: "gap",
            details: "Control deployment through policies not implemented",
            recommendation: "Deploy control activities through comprehensive policies and procedures"
          },
          // CC6: Logical and Physical Access Controls
          {
            id: "CC6.1",
            control: "The entity implements logical access security software, infrastructure, and architectures",
            status: "gap",
            details: "Logical access security controls not implemented",
            recommendation: "Implement comprehensive logical access security software, infrastructure, and architectures"
          },
          {
            id: "CC6.2",
            control: "The entity restricts logical access to information assets",
            status: "gap",
            details: "Logical access restrictions not implemented",
            recommendation: "Implement logical access restrictions based on business needs and least privilege"
          },
          {
            id: "CC6.3",
            control: "The entity restricts physical access to information assets",
            status: "gap",
            details: "Physical access restrictions not implemented",
            recommendation: "Implement physical access controls and restrictions for information assets"
          },
          {
            id: "CC6.4",
            control: "The entity restricts access to information assets during transmission",
            status: "gap",
            details: "Transmission security controls not implemented",
            recommendation: "Implement encryption and security controls for data in transmission"
          },
          {
            id: "CC6.5",
            control: "The entity restricts access to information assets at rest",
            status: "gap",
            details: "Data at rest protection not implemented",
            recommendation: "Implement encryption and access controls for data at rest"
          },
          {
            id: "CC6.6",
            control: "The entity restricts access to information assets during disposal",
            status: "gap",
            details: "Secure disposal procedures not implemented",
            recommendation: "Implement secure data disposal and destruction procedures"
          },
          {
            id: "CC6.7",
            control: "The entity restricts access to information assets during use",
            status: "gap",
            details: "Data in use protection not implemented",
            recommendation: "Implement controls to protect data during active use and processing"
          },
          {
            id: "CC6.8",
            control: "The entity restricts access to information assets during processing",
            status: "gap",
            details: "Processing security controls not implemented",
            recommendation: "Implement security controls for data processing activities"
          },
          // CC7: System Operations
          {
            id: "CC7.1",
            control: "The entity implements procedures to detect, identify, and analyze security events",
            status: "gap",
            details: "Security event detection procedures not implemented",
            recommendation: "Implement comprehensive security event detection and analysis procedures"
          },
          {
            id: "CC7.2",
            control: "The entity implements procedures to respond to security events",
            status: "gap",
            details: "Security incident response procedures not established",
            recommendation: "Develop and implement security incident response procedures and playbooks"
          },
          {
            id: "CC7.3",
            control: "The entity implements procedures to recover from security events",
            status: "gap",
            details: "Security recovery procedures not implemented",
            recommendation: "Establish security recovery procedures and business continuity plans"
          },
          {
            id: "CC7.4",
            control: "The entity implements procedures to monitor the system and take action to maintain compliance",
            status: "gap",
            details: "System monitoring and compliance procedures not implemented",
            recommendation: "Implement continuous system monitoring and compliance maintenance procedures"
          },
          {
            id: "CC7.5",
            control: "The entity implements procedures to protect against threats from sources outside its system boundaries",
            status: "gap",
            details: "External threat protection procedures not implemented",
            recommendation: "Implement procedures to protect against external threats and maintain system boundaries"
          },
          // CC8: Change Management
          {
            id: "CC8.1",
            control: "The entity implements procedures to authorize and approve changes",
            status: "gap",
            details: "Change authorization procedures not implemented",
            recommendation: "Implement formal change authorization and approval procedures"
          },
          {
            id: "CC8.2",
            control: "The entity implements procedures to test changes",
            status: "gap",
            details: "Change testing procedures not established",
            recommendation: "Develop comprehensive testing procedures for all system changes"
          },
          {
            id: "CC8.3",
            control: "The entity implements procedures to implement changes",
            status: "gap",
            details: "Change implementation procedures not documented",
            recommendation: "Document and implement standardized change implementation procedures"
          },
          {
            id: "CC8.4",
            control: "The entity implements procedures to monitor changes",
            status: "gap",
            details: "Change monitoring procedures not implemented",
            recommendation: "Implement procedures to monitor changes and their impact"
          },
          {
            id: "CC8.5",
            control: "The entity implements procedures to document changes",
            status: "gap",
            details: "Change documentation procedures not established",
            recommendation: "Establish comprehensive change documentation and record-keeping procedures"
          },
          // CC9: Risk Mitigation
          {
            id: "CC9.1",
            control: "The entity implements procedures to identify and assess risks",
            status: "gap",
            details: "Risk identification and assessment procedures not implemented",
            recommendation: "Implement comprehensive risk identification and assessment procedures"
          },
          {
            id: "CC9.2",
            control: "The entity implements procedures to mitigate risks",
            status: "gap",
            details: "Risk mitigation procedures not established",
            recommendation: "Develop and implement risk mitigation strategies and procedures"
          },
          {
            id: "CC9.3",
            control: "The entity implements procedures to monitor risks",
            status: "gap",
            details: "Risk monitoring procedures not implemented",
            recommendation: "Establish ongoing risk monitoring and review procedures"
          }
        ]
      },
      {
        name: "Availability",
        description: "Ensures information and systems are available for operation and use as committed or agreed",
        results: [
          {
            id: "A1.1",
            control: "The entity implements procedures to monitor system performance",
            status: "gap",
            details: "System performance monitoring not implemented",
            recommendation: "Implement comprehensive system performance monitoring and alerting"
          },
          {
            id: "A1.2",
            control: "The entity implements procedures to respond to system performance issues",
            status: "gap",
            details: "Performance issue response procedures not established",
            recommendation: "Develop procedures to identify and respond to system performance issues"
          },
          {
            id: "A1.3",
            control: "The entity implements procedures to maintain system availability",
            status: "gap",
            details: "System availability maintenance procedures not implemented",
            recommendation: "Implement procedures to maintain and ensure system availability"
          },
          {
            id: "A1.4",
            control: "The entity implements procedures to recover from system failures",
            status: "gap",
            details: "System failure recovery procedures not established",
            recommendation: "Develop comprehensive disaster recovery and business continuity procedures"
          },
          {
            id: "A1.5",
            control: "The entity implements procedures to protect against threats to availability",
            status: "gap",
            details: "Availability threat protection not implemented",
            recommendation: "Implement procedures to protect against threats that could impact system availability"
          }
        ]
      },
      {
        name: "Processing Integrity",
        description: "Ensures system processing is complete, valid, accurate, timely, and authorized",
        results: [
          {
            id: "PI1.1",
            control: "The entity implements procedures to ensure processing integrity",
            status: "gap",
            details: "Processing integrity controls not implemented",
            recommendation: "Implement comprehensive processing integrity controls and validation"
          },
          {
            id: "PI1.2",
            control: "The entity implements procedures to monitor processing integrity",
            status: "gap",
            details: "Processing integrity monitoring not established",
            recommendation: "Implement continuous monitoring of processing integrity and data quality"
          },
          {
            id: "PI1.3",
            control: "The entity implements procedures to respond to processing integrity issues",
            status: "gap",
            details: "Processing integrity issue response not implemented",
            recommendation: "Develop procedures to identify and respond to processing integrity issues"
          }
        ]
      },
      {
        name: "Confidentiality",
        description: "Ensures information designated as confidential is protected to meet the entity's objectives",
        results: [
          {
            id: "C1.1",
            control: "The entity implements procedures to protect confidential information",
            status: "gap",
            details: "Confidential information protection procedures not implemented",
            recommendation: "Implement comprehensive procedures to protect confidential information"
          },
          {
            id: "C1.2",
            control: "The entity implements procedures to restrict access to confidential information",
            status: "gap",
            details: "Confidential information access restrictions not implemented",
            recommendation: "Implement strict access controls and restrictions for confidential information"
          },
          {
            id: "C1.3",
            control: "The entity implements procedures to monitor access to confidential information",
            status: "gap",
            details: "Confidential information access monitoring not established",
            recommendation: "Implement monitoring and logging for access to confidential information"
          }
        ]
      },
      {
        name: "Privacy",
        description: "Ensures personal information is collected, used, retained, disclosed, and disposed of appropriately",
        results: [
          {
            id: "P1.1",
            control: "The entity implements procedures to collect personal information",
            status: "gap",
            details: "Personal information collection procedures not implemented",
            recommendation: "Implement procedures for lawful and transparent collection of personal information"
          },
          {
            id: "P1.2",
            control: "The entity implements procedures to use personal information",
            status: "gap",
            details: "Personal information use procedures not established",
            recommendation: "Develop procedures for appropriate use of personal information"
          },
          {
            id: "P1.3",
            control: "The entity implements procedures to retain personal information",
            status: "gap",
            details: "Personal information retention procedures not implemented",
            recommendation: "Implement data retention policies and procedures for personal information"
          },
          {
            id: "P1.4",
            control: "The entity implements procedures to disclose personal information",
            status: "gap",
            details: "Personal information disclosure procedures not established",
            recommendation: "Implement procedures for appropriate disclosure of personal information"
          },
          {
            id: "P1.5",
            control: "The entity implements procedures to dispose of personal information",
            status: "gap",
            details: "Personal information disposal procedures not implemented",
            recommendation: "Implement secure disposal procedures for personal information"
          }
        ]
      }
    ]
  }
};

export { allFrameworks };
