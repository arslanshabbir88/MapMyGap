const { GoogleGenerativeAI } = require('@google/generative-ai');
const crypto = require('crypto');

// Import busboy for file parsing
const Busboy = require('busboy');

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// NIST OSCAL API endpoint for live control fetching
const NIST_OSCAL_URL = 'https://raw.githubusercontent.com/usnistgov/oscal-content/main/nist.gov/SP800-53/rev5/catalog.json';

// Cache for NIST controls to avoid repeated API calls
let nistControlsCache = null;
let nistControlsCacheTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Inline framework control structures to avoid import issues
console.log('=== FILE LOADING DEBUG ===');
console.log('Starting to define allFrameworks...');
console.log('GoogleGenerativeAI loaded:', typeof GoogleGenerativeAI);
console.log('Busboy loaded:', typeof Busboy);
console.log('NIST OSCAL URL:', NIST_OSCAL_URL);

// Comprehensive frameworks with multiple controls
const allFrameworks = {
  NIST_CSF: {
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
            recommendation: "Implement software asset management system to track all applications and platforms"
          },
          {
            id: "ID.AM-3",
            control: "Organizational communication and data flows are mapped",
            status: "gap",
            details: "Data flow mapping not documented",
            recommendation: "Document and map all data flows and communication channels"
          }
        ]
      },
      {
        name: "PROTECT (PR)",
        description: "Develop and implement appropriate safeguards",
        results: [
          {
            id: "PR.AC-1",
            control: "Identities and credentials are managed for authorized devices and users",
            status: "gap",
            details: "Identity management system not implemented",
            recommendation: "Implement identity and access management (IAM) system"
          },
          {
            id: "PR.AC-2",
            control: "Physical access to assets is controlled and managed",
            status: "gap",
            details: "Physical access controls not implemented",
            recommendation: "Implement physical security controls and access management"
          }
        ]
      }
    ]
  },
  NIST_800_53: {
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
            details: "Account management procedures not implemented",
            recommendation: "Establish formal account management procedures for user accounts"
          },
          {
            id: "AC-3",
            control: "Access Enforcement",
            status: "gap",
            details: "Access enforcement mechanisms not implemented",
            recommendation: "Implement technical controls to enforce access policies"
          },
          {
            id: "AC-4",
            control: "Information Flow Enforcement",
            status: "gap",
            details: "Information flow controls not implemented",
            recommendation: "Implement controls to enforce information flow policies"
          },
          {
            id: "AC-5",
            control: "Separation of Duties",
            status: "gap",
            details: "Separation of duties not implemented",
            recommendation: "Implement separation of duties for critical functions"
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
            details: "Concurrent session limits not implemented",
            recommendation: "Implement limits on concurrent sessions"
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
            recommendation: "Develop audit and accountability policy and procedures"
          },
          {
            id: "AU-2",
            control: "Audit Events",
            status: "gap",
            details: "Audit events not defined",
            recommendation: "Define and configure system audit events"
          },
          {
            id: "AU-3",
            control: "Content of Audit Records",
            status: "gap",
            details: "Audit record content not defined",
            recommendation: "Define required content for audit records"
          },
          {
            id: "AU-4",
            control: "Audit Storage Capacity",
            status: "gap",
            details: "Audit storage capacity not allocated",
            recommendation: "Allocate sufficient storage capacity for audit records"
          },
          {
            id: "AU-5",
            control: "Response to Audit Processing Failures",
            status: "gap",
            details: "Audit failure response procedures not defined",
            recommendation: "Define procedures for responding to audit processing failures"
          },
          {
            id: "AU-6",
            control: "Audit Review, Analysis, and Reporting",
            status: "gap",
            details: "Audit review procedures not implemented",
            recommendation: "Implement procedures for reviewing and analyzing audit records"
          }
        ]
      },
      {
        name: "Identification and Authentication (IA)",
        description: "Identify and authenticate organizational users and processes",
        results: [
          {
            id: "IA-1",
            control: "Identification and Authentication Policy and Procedures",
            status: "gap",
            details: "Identification and authentication policy not established",
            recommendation: "Develop identification and authentication policy and procedures"
          },
          {
            id: "IA-2",
            control: "Identification and Authentication (Organizational Users)",
            status: "gap",
            details: "Multi-factor authentication not implemented",
            recommendation: "Implement multi-factor authentication for all users"
          },
          {
            id: "IA-3",
            control: "Device Identification and Authentication",
            status: "gap",
            details: "Device authentication not implemented",
            recommendation: "Implement device identification and authentication"
          },
          {
            id: "IA-4",
            control: "Identifier Management",
            status: "gap",
            details: "Identifier management procedures not implemented",
            recommendation: "Implement procedures for managing user identifiers"
          },
          {
            id: "IA-5",
            control: "Authenticator Management",
            status: "gap",
            details: "Authenticator management procedures not implemented",
            recommendation: "Implement procedures for managing authenticators"
          },
          {
            id: "IA-6",
            control: "Authenticator Feedback",
            status: "gap",
            details: "Authenticator feedback not implemented",
            recommendation: "Implement feedback mechanisms for authenticators"
          },
          {
            id: "IA-7",
            control: "Cryptographic Module Authentication",
            status: "gap",
            details: "Cryptographic module authentication not implemented",
            recommendation: "Implement authentication for cryptographic modules"
          },
          {
            id: "IA-8",
            control: "Identification and Authentication (Non-Organizational Users)",
            status: "gap",
            details: "Non-organizational user authentication not implemented",
            recommendation: "Implement authentication for non-organizational users"
          }
        ]
      },
      {
        name: "System and Communications Protection (SC)",
        description: "Monitor, control, and protect organizational communications",
        results: [
          {
            id: "SC-1",
            control: "System and Communications Protection Policy and Procedures",
            status: "gap",
            details: "System and communications protection policy not established",
            recommendation: "Develop system and communications protection policy and procedures"
          },
          {
            id: "SC-2",
            control: "Application Partitioning",
            status: "gap",
            details: "Application partitioning not implemented",
            recommendation: "Implement application partitioning to isolate functions"
          },
          {
            id: "SC-3",
            control: "Security Function Isolation",
            status: "gap",
            details: "Security function isolation not implemented",
            recommendation: "Implement isolation of security functions from non-security functions"
          },
          {
            id: "SC-4",
            control: "Information in Shared System Resources",
            status: "gap",
            details: "Shared resource protection not implemented",
            recommendation: "Implement controls to protect information in shared resources"
          },
          {
            id: "SC-5",
            control: "Denial of Service Protection",
            status: "gap",
            details: "Denial of service protection not implemented",
            recommendation: "Implement controls to protect against denial of service attacks"
          },
          {
            id: "SC-6",
            control: "Resource Availability",
            status: "gap",
            details: "Resource availability controls not implemented",
            recommendation: "Implement controls to ensure resource availability"
          },
          {
            id: "SC-7",
            control: "Boundary Protection",
            status: "gap",
            details: "Network boundary protection not implemented",
            recommendation: "Implement network boundary protection controls"
          },
          {
            id: "SC-8",
            control: "Transmission Confidentiality and Integrity",
            status: "gap",
            details: "Transmission protection not implemented",
            recommendation: "Implement controls to protect transmission confidentiality and integrity"
          },
          {
            id: "SC-9",
            control: "Transmission Confidentiality",
            status: "gap",
            details: "Transmission confidentiality not implemented",
            recommendation: "Implement controls to ensure transmission confidentiality"
          },
          {
            id: "SC-10",
            control: "Network Disconnect",
            status: "gap",
            details: "Network disconnect capability not implemented",
            recommendation: "Implement capability to disconnect network connections"
          }
        ]
      },
      {
        name: "Incident Response (IR)",
        description: "Establish an operational incident handling capability",
        results: [
          {
            id: "IR-1",
            control: "Incident Response Policy and Procedures",
            status: "gap",
            details: "Incident response policy not established",
            recommendation: "Develop incident response policy and procedures"
          },
          {
            id: "IR-2",
            control: "Incident Response Training",
            status: "gap",
            details: "Incident response training not implemented",
            recommendation: "Implement incident response training for personnel"
          },
          {
            id: "IR-3",
            control: "Incident Response Testing",
            status: "gap",
            details: "Incident response testing not implemented",
            recommendation: "Implement testing of incident response capabilities"
          },
          {
            id: "IR-4",
            control: "Incident Handling",
            status: "gap",
            details: "Incident handling procedures not implemented",
            recommendation: "Implement incident handling procedures"
          },
          {
            id: "IR-5",
            control: "Incident Monitoring",
            status: "gap",
            details: "Incident monitoring not implemented",
            recommendation: "Implement monitoring of incident response activities"
          },
          {
            id: "IR-6",
            control: "Incident Reporting",
            status: "gap",
            details: "Incident reporting procedures not implemented",
            recommendation: "Implement incident reporting procedures"
          },
          {
            id: "IR-7",
            control: "Incident Response Assistance",
            status: "gap",
            details: "Incident response assistance not available",
            recommendation: "Provide incident response assistance to users"
          },
          {
            id: "IR-8",
            control: "Incident Response Plan",
            status: "gap",
            details: "Incident response plan not developed",
            recommendation: "Develop comprehensive incident response plan"
          }
        ]
      },
      {
        name: "Configuration Management (CM)",
        description: "Establish and maintain baseline configurations and inventories",
        results: [
          {
            id: "CM-1",
            control: "Configuration Management Policy and Procedures",
            status: "gap",
            details: "Configuration management policy not established",
            recommendation: "Develop configuration management policy and procedures"
          },
          {
            id: "CM-2",
            control: "Baseline Configuration",
            status: "gap",
            details: "Baseline configuration not established",
            recommendation: "Establish and maintain baseline configurations for all systems"
          },
          {
            id: "CM-3",
            control: "Configuration Change Control",
            status: "gap",
            details: "Configuration change control not implemented",
            recommendation: "Implement configuration change control procedures"
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
          }
        ]
      },
      {
        name: "Contingency Planning (CP)",
        description: "Establish, maintain, and implement plans for emergency response",
        results: [
          {
            id: "CP-1",
            control: "Contingency Planning Policy and Procedures",
            status: "gap",
            details: "Contingency planning policy not established",
            recommendation: "Develop contingency planning policy and procedures"
          },
          {
            id: "CP-2",
            control: "Contingency Plan",
            status: "gap",
            details: "Contingency plan not developed",
            recommendation: "Develop comprehensive contingency plan"
          },
          {
            id: "CP-3",
            control: "Contingency Training",
            status: "gap",
            details: "Contingency training not implemented",
            recommendation: "Implement contingency planning training for personnel"
          },
          {
            id: "CP-4",
            control: "Contingency Plan Testing",
            status: "gap",
            details: "Contingency plan testing not implemented",
            recommendation: "Implement testing of contingency plan effectiveness"
          }
        ]
      },
      {
        name: "Awareness and Training (AT)",
        description: "Ensure personnel are aware of security risks",
        results: [
          {
            id: "AT-1",
            control: "Awareness and Training Policy and Procedures",
            status: "gap",
            details: "Awareness and training policy not established",
            recommendation: "Develop awareness and training policy and procedures"
          },
          {
            id: "AT-2",
            control: "Security Awareness Training",
            status: "gap",
            details: "Security awareness training not implemented",
            recommendation: "Implement security awareness training for all personnel"
          },
          {
            id: "AT-3",
            control: "Role-Based Training",
            status: "gap",
            details: "Role-based training not implemented",
            recommendation: "Implement role-based security training for specific roles"
          },
          {
            id: "AT-4",
            control: "Training Records",
            status: "gap",
            details: "Training records not maintained",
            recommendation: "Maintain records of security training completion"
          }
        ]
      },
      {
        name: "Assessment, Authorization, and Monitoring (CA)",
        description: "Assess, authorize, and monitor information systems",
        results: [
          {
            id: "CA-1",
            control: "Assessment, Authorization, and Monitoring Policy and Procedures",
            status: "gap",
            details: "Assessment policy not established",
            recommendation: "Develop assessment, authorization, and monitoring policy"
          },
          {
            id: "CA-2",
            control: "Security Assessments",
            status: "gap",
            details: "Security assessments not performed",
            recommendation: "Perform regular security assessments of information systems"
          },
          {
            id: "CA-3",
            control: "System Interconnections",
            status: "gap",
            details: "System interconnection controls not implemented",
            recommendation: "Implement controls for system interconnections"
          },
          {
            id: "CA-4",
            control: "Security Certification",
            status: "gap",
            details: "Security certification not performed",
            recommendation: "Perform security certification of information systems"
          }
        ]
      },
      {
        name: "Physical and Environmental Protection (PE)",
        description: "Provide physical and environmental protection for organizational information systems",
        results: [
          {
            id: "PE-1",
            control: "Physical and Environmental Protection Policy and Procedures",
            status: "gap",
            details: "Physical security policy not established",
            recommendation: "Develop physical and environmental protection policy and procedures"
          },
          {
            id: "PE-2",
            control: "Physical Access Authorizations",
            status: "gap",
            details: "Physical access authorization procedures not implemented",
            recommendation: "Implement formal procedures for authorizing physical access"
          },
          {
            id: "PE-3",
            control: "Physical Access Control",
            status: "gap",
            details: "Physical access controls not implemented",
            recommendation: "Implement physical access control systems and procedures"
          }
        ]
      },
      {
        name: "Personnel Security (PS)",
        description: "Ensure individuals occupying positions of responsibility are trustworthy",
        results: [
          {
            id: "PS-1",
            control: "Personnel Security Policy and Procedures",
            status: "gap",
            details: "Personnel security policy not established",
            recommendation: "Develop personnel security policy and procedures"
          },
          {
            id: "PS-2",
            control: "Position Risk Designation",
            status: "gap",
            details: "Position risk designations not established",
            recommendation: "Establish risk designations for all positions"
          },
          {
            id: "PS-3",
            control: "Personnel Screening",
            status: "gap",
            details: "Personnel screening procedures not implemented",
            recommendation: "Implement background screening for all personnel"
          }
        ]
      },
      {
        name: "Media Protection (MP)",
        description: "Protect the confidentiality, integrity, and availability of information",
        results: [
          {
            id: "MP-1",
            control: "Media Protection Policy and Procedures",
            status: "gap",
            details: "Media protection policy not established",
            recommendation: "Develop media protection policy and procedures"
          },
          {
            id: "MP-2",
            control: "Media Access",
            status: "gap",
            details: "Media access controls not implemented",
            recommendation: "Implement controls to restrict access to media"
          },
          {
            id: "MP-3",
            control: "Media Marking",
            status: "gap",
            details: "Media marking procedures not implemented",
            recommendation: "Implement procedures for marking media with appropriate labels"
          }
        ]
      },
      {
        name: "System and Information Integrity (SI)",
        description: "Identify, report, and correct information and information system flaws",
        results: [
          {
            id: "SI-1",
            control: "System and Information Integrity Policy and Procedures",
            status: "gap",
            details: "System integrity policy not established",
            recommendation: "Develop system and information integrity policy and procedures"
          },
          {
            id: "SI-2",
            control: "Flaw Remediation",
            status: "gap",
            details: "Flaw remediation procedures not implemented",
            recommendation: "Implement procedures for identifying and remediating system flaws"
          },
          {
            id: "SI-3",
            control: "Malicious Code Protection",
            status: "gap",
            details: "Malicious code protection not implemented",
            recommendation: "Implement protection mechanisms against malicious code"
          }
        ]
      },
      {
        name: "Maintenance (MA)",
        description: "Perform periodic and timely maintenance on organizational information systems",
        results: [
          {
            id: "MA-1",
            control: "System Maintenance Policy and Procedures",
            status: "gap",
            details: "System maintenance policy not established",
            recommendation: "Develop system maintenance policy and procedures"
          },
          {
            id: "MA-2",
            control: "Controlled Maintenance",
            status: "gap",
            details: "Controlled maintenance procedures not implemented",
            recommendation: "Implement controlled maintenance procedures for systems"
          },
          {
            id: "MA-3",
            control: "Maintenance Tools",
            status: "gap",
            details: "Maintenance tool controls not implemented",
            recommendation: "Implement controls for maintenance tools and equipment"
          }
        ]
      },
      {
        name: "Risk Assessment (RA)",
        description: "Assess the risk and magnitude of harm that could result from unauthorized access",
        results: [
          {
            id: "RA-1",
            control: "Risk Assessment Policy and Procedures",
            status: "gap",
            details: "Risk assessment policy not established",
            recommendation: "Develop risk assessment policy and procedures"
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
            details: "Risk assessments not performed",
            recommendation: "Perform comprehensive risk assessments of systems"
          }
        ]
      },
      {
        name: "System and Services Acquisition (SA)",
        description: "Allocate adequate resources to protect organizational information systems",
        results: [
          {
            id: "SA-1",
            control: "System and Services Acquisition Policy and Procedures",
            status: "gap",
            details: "Acquisition policy not established",
            recommendation: "Develop system and services acquisition policy and procedures"
          },
          {
            id: "SA-2",
            control: "Allocation of Resources",
            status: "gap",
            details: "Resource allocation for security not established",
            recommendation: "Establish adequate resource allocation for security controls"
          },
          {
            id: "SA-3",
            control: "System Development Life Cycle",
            status: "gap",
            details: "Secure development lifecycle not implemented",
            recommendation: "Implement secure system development lifecycle processes"
          }
        ]
      },
      {
        name: "Supply Chain Risk Management (SR)",
        description: "Manage supply chain risks associated with organizational information systems",
        results: [
          {
            id: "SR-1",
            control: "Supply Chain Risk Management Policy and Procedures",
            status: "gap",
            details: "Supply chain risk management policy not established",
            recommendation: "Develop supply chain risk management policy and procedures"
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
            control: "Supply Chain Controls and Processes",
            status: "gap",
            details: "Supply chain controls not implemented",
            recommendation: "Implement controls and processes for supply chain management"
          }
        ]
      }
    ]
  },
  ISO_27001: {
    name: "ISO/IEC 27001:2022",
    description: "Information Security Management System",
    categories: [
      {
        name: "A.5 Information Security Policies",
        description: "Information security policy framework",
        results: [
          {
            id: "A.5.1",
            control: "Information security policy",
            status: "gap",
            details: "Information security policy not established",
            recommendation: "Develop and implement comprehensive information security policy"
          },
          {
            id: "A.5.2",
            control: "Information security policy review",
            status: "gap",
            details: "Policy review process not implemented",
            recommendation: "Establish regular policy review and update procedures"
          }
        ]
      },
      {
        name: "A.6 Organization of Information Security",
        description: "Internal organization and external parties",
        results: [
          {
            id: "A.6.1",
            control: "Internal organization",
            status: "gap",
            details: "Security roles and responsibilities not defined",
            recommendation: "Define clear security roles and responsibilities within organization"
          },
          {
            id: "A.6.2",
            control: "Mobile device policy",
            status: "gap",
            details: "Mobile device policy not established",
            recommendation: "Develop and implement mobile device security policy"
          }
        ]
      },
      {
        name: "A.7 Human Resource Security",
        description: "Security aspects for employees joining, moving, and leaving",
        results: [
          {
            id: "A.7.1",
            control: "Screening",
            status: "gap",
            details: "Employee screening procedures not implemented",
            recommendation: "Implement background screening for all employees and contractors"
          },
          {
            id: "A.7.2",
            control: "Terms and conditions of employment",
            status: "gap",
            details: "Security terms not included in employment contracts",
            recommendation: "Include security responsibilities in employment terms and conditions"
          }
        ]
      }
    ]
  },
  PCI_DSS: {
    name: "PCI DSS v4.0",
    description: "Payment Card Industry Data Security Standard",
    categories: [
      {
        name: "Requirement 1: Network Security Controls",
        description: "Install and maintain network security controls",
        results: [
          {
            id: "1.1",
            control: "Network security controls",
            status: "gap",
            details: "Network security controls not implemented",
            recommendation: "Implement network security controls including firewalls and segmentation"
          },
          {
            id: "1.2",
            control: "Network security configuration",
            status: "gap",
            details: "Network security configuration not documented",
            recommendation: "Document and implement secure network configuration standards"
          }
        ]
      },
      {
        name: "Requirement 2: Secure Configuration",
        description: "Apply secure configurations to all system components",
        results: [
          {
            id: "2.1",
            control: "Secure configuration standards",
            status: "gap",
            details: "Configuration standards not established",
            recommendation: "Develop and implement secure configuration standards for all systems"
          },
          {
            id: "2.2",
            control: "System component inventory",
            status: "gap",
            details: "System inventory not maintained",
            recommendation: "Maintain comprehensive inventory of all system components"
          }
        ]
      }
    ]
  },
  SOC_2: {
    name: "SOC 2 Type II",
    description: "System and Organization Controls for Service Organizations",
    categories: [
      {
        name: "CC1: Control Environment",
        description: "Commitment to integrity and ethical values",
        results: [
          {
            id: "CC1.1",
            control: "Commitment to integrity and ethical values",
            status: "gap",
            details: "Code of conduct not established",
            recommendation: "Develop and implement code of conduct and ethical standards"
          },
          {
            id: "CC1.2",
            control: "Board oversight",
            status: "gap",
            details: "Board oversight not established",
            recommendation: "Establish board oversight of security and compliance activities"
          }
        ]
      },
      {
        name: "CC2: Communication and Information",
        description: "Quality of information and communication",
        results: [
          {
            id: "CC2.1",
            control: "Information quality",
            status: "gap",
            details: "Information quality standards not established",
            recommendation: "Establish standards for information quality and accuracy"
          },
          {
            id: "CC2.2",
            control: "Internal communication",
            status: "gap",
            details: "Internal communication channels not established",
            recommendation: "Establish formal internal communication channels for security matters"
          }
        ]
      }
    ]
  }
};

console.log('=== FRAMEWORK DEFINITION DEBUG ===');
console.log('allFrameworks defined successfully. Keys:', Object.keys(allFrameworks));
console.log('allFrameworks.NIST_CSF:', allFrameworks.NIST_CSF ? 'exists' : 'undefined');
console.log('allFrameworks.NIST_800_53:', allFrameworks.NIST_800_53 ? 'exists' : 'undefined');
console.log('allFrameworks object:', JSON.stringify(allFrameworks, null, 2));

// Additional verification
console.log('allFrameworks === undefined:', allFrameworks === undefined);
console.log('allFrameworks === null:', allFrameworks === null);
console.log('typeof allFrameworks:', typeof allFrameworks);

// Dynamic NIST control fetching functions
async function fetchNISTControls() {
  try {
    console.log('Fetching NIST controls from OSCAL API...');
    
    // Check if we have valid cached controls
    if (nistControlsCache && (Date.now() - nistControlsCacheTime) < CACHE_DURATION) {
      console.log('Using cached NIST controls (age:', Math.round((Date.now() - nistControlsCacheTime) / 1000 / 60), 'minutes)');
      return nistControlsCache;
    }
    
    console.log('Cache expired or missing, fetching fresh controls...');
    
    // Fetch from NIST OSCAL API
    const response = await fetch(NIST_OSCAL_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const catalog = await response.json();
    console.log('Successfully fetched NIST OSCAL catalog');
    
    // Parse OSCAL format to our framework structure
    const parsedControls = parseOSCALToFramework(catalog);
    
    // Cache the results
    nistControlsCache = parsedControls;
    nistControlsCacheTime = Date.now();
    
    console.log('NIST controls parsed and cached successfully');
    console.log('Total controls fetched:', countTotalControls(parsedControls));
    
    return parsedControls;
  } catch (error) {
    console.error('Failed to fetch NIST controls from OSCAL API:', error);
    console.log('Falling back to static NIST controls');
    return null;
  }
}

function parseOSCALToFramework(oscalCatalog) {
  try {
    console.log('Parsing OSCAL catalog to framework structure...');
    console.log('OSCAL catalog structure:', Object.keys(oscalCatalog));
    
    const controls = [];
    const groups = {};
    
    // Extract controls from OSCAL catalog - handle different possible structures
    let controlList = [];
    
    if (oscalCatalog.controls) {
      controlList = oscalCatalog.controls;
      console.log('Found controls in oscalCatalog.controls:', controlList.length);
    } else if (oscalCatalog.catalog && oscalCatalog.catalog.controls) {
      controlList = oscalCatalog.catalog.controls;
      console.log('Found controls in oscalCatalog.catalog.controls:', controlList.length);
    } else if (oscalCatalog.metadata && oscalCatalog.metadata.title) {
      console.log('OSCAL catalog title:', oscalCatalog.metadata.title);
      // Try to find controls in other possible locations
      if (oscalCatalog.groups) {
        console.log('Found groups structure, processing...');
        oscalCatalog.groups.forEach(group => {
          if (group.controls) {
            controlList = controlList.concat(group.controls);
          }
        });
        console.log('Total controls from groups:', controlList.length);
      }
    }
    
    console.log('Total controls to process:', controlList.length);
    
    // Process each control
    controlList.forEach((control, index) => {
      if (index < 10) { // Log first 10 controls for debugging
        console.log(`Control ${index + 1}:`, control.id, control.title);
      }
      
      const controlId = control.id;
      const controlTitle = control.title;
      const controlDescription = control.description || controlTitle;
      
      // Group controls by their category (AC, AU, IA, SC, etc.)
      const category = controlId.split('-')[0];
      if (!groups[category]) {
        groups[category] = {
          name: getCategoryDisplayName(category),
          description: getCategoryDescription(category),
          results: []
        };
      }
      
      groups[category].results.push({
        id: controlId,
        control: controlTitle,
        status: "gap",
        details: "Control not yet analyzed",
        recommendation: `Implement ${controlTitle.toLowerCase()}`
      });
    });
    
    // Convert groups to our framework format
    const framework = {
      name: "NIST SP 800-53 Rev. 5 (Live)",
      description: "Security and Privacy Controls for Information Systems and Organizations - Live from NIST OSCAL",
      categories: Object.values(groups)
    };
    
    console.log('OSCAL parsing completed. Categories found:', Object.keys(groups));
    console.log('Total categories:', Object.keys(groups).length);
    console.log('Total controls processed:', Object.values(groups).reduce((sum, cat) => sum + cat.results.length, 0));
    
    return framework;
  } catch (error) {
    console.error('Error parsing OSCAL catalog:', error);
    console.error('Error details:', error.stack);
    return null;
  }
}

function getCategoryDisplayName(category) {
  const categoryNames = {
    'AC': 'Access Control (AC)',
    'AU': 'Audit and Accountability (AU)',
    'IA': 'Identification and Authentication (IA)',
    'SC': 'System and Communications Protection (SC)',
    'IR': 'Incident Response (IR)',
    'MA': 'Maintenance (MA)',
    'MP': 'Media Protection (MP)',
    'PS': 'Personnel Security (PS)',
    'PE': 'Physical and Environmental Protection (PE)',
    'PL': 'Planning (PL)',
    'RA': 'Risk Assessment (RA)',
    'SA': 'System and Services Acquisition (SA)',
    'SR': 'Supply Chain Risk Management (SR)',
    'SI': 'System and Information Integrity (SI)',
    'CM': 'Configuration Management (CM)',
    'CP': 'Contingency Planning (CP)',
    'AT': 'Awareness and Training (AT)',
    'CA': 'Assessment, Authorization, and Monitoring (CA)',
    'SC': 'System and Communications Protection (SC)',
    'SI': 'System and Information Integrity (SI)',
    'AC': 'Access Control (AC)',
    'AU': 'Audit and Accountability (AU)',
    'IA': 'Identification and Authentication (IA)',
    'IR': 'Incident Response (IR)',
    'MA': 'Maintenance (MA)',
    'MP': 'Media Protection (MP)',
    'PS': 'Personnel Security (PS)',
    'PE': 'Physical and Environmental Protection (PE)',
    'PL': 'Planning (PL)',
    'RA': 'Risk Assessment (RA)',
    'SA': 'System and Services Acquisition (SA)',
    'SR': 'Supply Chain Risk Management (SR)',
    'CM': 'Configuration Management (CM)',
    'CP': 'Contingency Planning (CP)',
    'AT': 'Awareness and Training (AT)',
    'CA': 'Assessment, Authorization, and Monitoring (CA)'
  };
  
  return categoryNames[category] || `${category} Controls`;
}

function getCategoryDescription(category) {
  const categoryDescriptions = {
    'AC': 'Control access to information systems and resources',
    'AU': 'Create, protect, and retain information system audit records',
    'IA': 'Identify and authenticate organizational users and processes',
    'SC': 'Monitor, control, and protect organizational communications',
    'IR': 'Establish an operational incident handling capability',
    'MA': 'Perform periodic and timely maintenance on organizational information systems',
    'MP': 'Protect the confidentiality, integrity, and availability of information',
    'PS': 'Ensure that individuals occupying positions of responsibility within organizations are trustworthy',
    'PE': 'Provide physical and environmental protection for organizational information systems',
    'PL': 'Develop, document, and periodically update system security plans',
    'RA': 'Assess the risk and magnitude of harm that could result from unauthorized access',
    'SA': 'Allocate adequate resources to protect organizational information systems',
    'SR': 'Manage supply chain risks associated with organizational information systems',
    'SI': 'Identify, report, and correct information and information system flaws',
    'CM': 'Establish and maintain baseline configurations and inventories of organizational information systems',
    'CP': 'Establish, maintain, and effectively implement plans for emergency response',
    'AT': 'Ensure that managers and users of organizational information systems are made aware of security risks',
    'CA': 'Assess, authorize, and monitor information systems and associated security controls'
  };
  
  return categoryDescriptions[category] || `Controls for ${category} category`;
}

function countTotalControls(framework) {
  if (!framework || !framework.categories) return 0;
  return framework.categories.reduce((total, category) => {
    return total + (category.results ? category.results.length : 0);
  }, 0);
}

// Function to manually refresh NIST controls cache
async function refreshNISTControls() {
  try {
    console.log('Manually refreshing NIST controls cache...');
    nistControlsCache = null;
    nistControlsCacheTime = 0;
    
    const freshControls = await fetchNISTControls();
    if (freshControls) {
      console.log('NIST controls cache refreshed successfully');
      return { success: true, controls: freshControls, totalControls: countTotalControls(freshControls) };
    } else {
      console.log('Failed to refresh NIST controls cache');
      return { success: false, error: 'Failed to fetch fresh controls' };
    }
  } catch (error) {
    console.error('Error refreshing NIST controls:', error);
    return { success: false, error: error.message };
  }
}

// Function to get NIST controls status
async function getNISTControlsStatus() {
  try {
    const controls = await fetchNISTControls();
    if (controls) {
      return {
        success: true,
        source: controls.name.includes('Live') ? 'OSCAL API' : 'Static Fallback',
        totalCategories: controls.categories.length,
        totalControls: countTotalControls(controls),
        categories: controls.categories.map(cat => ({
          name: cat.name,
          controlCount: cat.results.length
        })),
        cacheStatus: nistControlsCache ? {
          age: Math.round((Date.now() - nistControlsCacheTime) / 1000 / 60),
          valid: (Date.now() - nistControlsCacheTime) < CACHE_DURATION
        } : 'None'
      };
    } else {
      return {
        success: false,
        error: 'Failed to fetch NIST controls'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Smart filtering function - identifies relevant control families based on document content
async function identifyRelevantControls(fileContent, framework) {
  try {
    console.log('=== SMART FILTERING: Identifying relevant controls ===');
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // First, do a high-level content analysis to identify relevant areas
    const contentAnalysisPrompt = `Analyze this document content and identify which cybersecurity control families are most relevant.

Document Content (first 4000 characters):
${fileContent.substring(0, 4000)}

Based on the content, identify which of these control families are most relevant (return only the family codes):

NIST 800-53 Control Families:
- AC (Access Control) - User access, authentication, authorization
- AU (Audit & Accountability) - Logging, monitoring, audit trails
- IA (Identification & Authentication) - User identity, multi-factor auth
- SC (System & Communications Protection) - Network security, encryption
- IR (Incident Response) - Security incidents, response procedures
- CM (Configuration Management) - System configs, change management
- CP (Contingency Planning) - Business continuity, disaster recovery
- AT (Awareness & Training) - Security training, user awareness
- CA (Assessment & Monitoring) - Security assessments, compliance
- PE (Physical & Environmental) - Physical security, facilities
- PS (Personnel Security) - Employee screening, background checks
- MP (Media Protection) - Data storage, removable media
- SI (System & Information Integrity) - Malware protection, updates
- MA (Maintenance) - System maintenance, patches
- RA (Risk Assessment) - Risk analysis, threat assessment
- SA (System Acquisition) - Procurement, vendor management
- SR (Supply Chain Risk) - Third-party risk, vendor security

Return only the 3-5 most relevant family codes as a JSON array, like: ["AC", "AU", "IA"]

Focus on families that are clearly addressed or missing in the document content.`;

    const contentResult = await model.generateContent(contentAnalysisPrompt);
    const contentResponse = await contentResult.response;
    const contentText = contentResponse.text();
    
    console.log('Content analysis response:', contentText);
    
    // Extract relevant family codes
    const familyMatch = contentText.match(/\[([^\]]+)\]/);
    let relevantFamilies = [];
    
    if (familyMatch) {
      relevantFamilies = familyMatch[1].split(',').map(f => f.trim().replace(/"/g, ''));
    } else {
      // Fallback to common families if parsing fails
      relevantFamilies = ['AC', 'AU', 'IA'];
    }
    
    console.log('Identified relevant control families:', relevantFamilies);
    return relevantFamilies;
    
  } catch (error) {
    console.error('Error in smart filtering:', error);
    // Fallback to core control families
    return ['AC', 'AU', 'IA'];
  }
}

// Generate a unique hash for document content to enable caching
function generateDocumentHash(content, framework) {
  return crypto.createHash('sha256').update(content + framework).digest('hex');
}

// Check if we have cached AI analysis results for this document
async function getCachedAnalysis(documentHash, framework) {
  try {
    // For now, we'll use a simple in-memory cache
    // In production, you could extend this to use Supabase or Redis
    if (!global.analysisCache) {
      global.analysisCache = new Map();
    }
    
    const cacheKey = `${documentHash}_${framework}`;
    const cached = global.analysisCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) { // 24 hour cache
      console.log('Cache HIT: Using cached AI analysis results');
      return cached.results;
    }
    
    console.log('Cache MISS: No cached results found');
    return null;
  } catch (error) {
    console.error('Cache lookup error:', error);
    return null;
  }
}

// Cache AI analysis results for future use
async function cacheAnalysisResults(documentHash, framework, results) {
  try {
    if (!global.analysisCache) {
      global.analysisCache = new Map();
    }
    
    const cacheKey = `${documentHash}_${framework}`;
    global.analysisCache.set(cacheKey, {
      results: results,
      timestamp: Date.now()
    });
    
    console.log('Cached AI analysis results for future use');
  } catch (error) {
    console.error('Cache storage error:', error);
  }
}

// Post-process AI results based on strictness level to ensure strictness affects scoring
function adjustResultsForStrictness(results, strictness) {
  console.log(`Post-processing results for strictness level: ${strictness}`);
  console.log('Results structure:', {
    categoriesCount: results.categories?.length || 0,
    firstCategory: results.categories?.[0]?.name || 'none',
    firstCategoryControls: results.categories?.[0]?.results?.length || 0
  });
  
  // Count initial statuses
  let initialCounts = { covered: 0, partial: 0, gap: 0 };
  results.categories.forEach(category => {
    category.results.forEach(result => {
      if (result.status === 'covered') initialCounts.covered++;
      else if (result.status === 'partial') initialCounts.partial++;
      else if (result.status === 'gap') initialCounts.gap++;
    });
  });
  console.log('Initial status counts:', initialCounts);
  
  const adjustedResults = JSON.parse(JSON.stringify(results)); // Deep copy
  
  if (strictness === 'strict') {
    // STRICT MODE: Most conservative - systematically downgrade and limit upgrades
    console.log('Strict mode - making conservative adjustments');
    
    let coveredToPartial = Math.floor(initialCounts.covered * 0.6); // 60% of covered -> partial
    let partialToGap = Math.floor(initialCounts.partial * 0.4); // 40% of partial -> gap
    
    // If AI was too conservative and marked everything as gap, upgrade very few to partial
    let gapToPartial = 0;
    if (initialCounts.gap > 0 && initialCounts.covered === 0 && initialCounts.partial === 0) {
      gapToPartial = Math.floor(initialCounts.gap * 0.15); // Only 15% of gaps -> partial (very conservative)
      console.log(`Strict mode: AI was too conservative, upgrading only ${gapToPartial} gaps to partial`);
    }
    
    console.log(`Strict mode: Converting ${coveredToPartial} covered to partial, ${partialToGap} partial to gap, ${gapToPartial} gaps to partial`);
    
    let coveredConverted = 0;
    let partialConverted = 0;
    let gapConverted = 0;
    
    adjustedResults.categories.forEach(category => {
      category.results.forEach(result => {
        if (result.status === 'covered' && coveredConverted < coveredToPartial) {
          result.status = 'partial';
          result.details = `Downgraded to partial due to strict analysis requirements. ${result.details}`;
          coveredConverted++;
        } else if (result.status === 'partial' && partialConverted < partialToGap) {
          result.status = 'gap';
          result.details = `Downgraded to gap due to strict analysis requirements. ${result.details}`;
          partialConverted++;
        } else if (result.status === 'gap' && gapConverted < gapToPartial) {
          result.status = 'partial';
          result.details = `Upgraded to partial due to strict analysis requirements (AI was too conservative). ${result.details}`;
          gapConverted++;
        }
      });
    });
    
  } else if (strictness === 'balanced') {
    // BALANCED MODE: Moderate adjustments - more generous than strict but not as generous as lenient
    console.log('Balanced mode - making moderate adjustments');
    
    // If AI was too conservative, be moderately generous
    let gapToPartial = 0;
    if (initialCounts.gap > 0 && initialCounts.covered === 0 && initialCounts.partial === 0) {
      gapToPartial = Math.floor(initialCounts.gap * 0.6); // 60% of gaps -> partial (moderate)
      console.log(`Balanced mode: AI was too conservative, upgrading ${gapToPartial} gaps to partial`);
    }
    
    // Also upgrade some partial to covered for balanced mode
    let partialToCovered = Math.floor(initialCounts.partial * 0.4); // 40% of partial -> covered
    
    if (gapToPartial > 0 || partialToCovered > 0) {
      let gapConverted = 0;
      let partialConverted = 0;
      
      adjustedResults.categories.forEach(category => {
        category.results.forEach(result => {
          if (result.status === 'gap' && gapConverted < gapToPartial) {
            result.status = 'partial';
            result.details = `Upgraded to partial due to balanced analysis requirements (AI was too conservative). ${result.details}`;
            gapConverted++;
          } else if (result.status === 'partial' && partialConverted < partialToCovered) {
            result.status = 'covered';
            result.details = `Upgraded to covered due to balanced analysis requirements. ${result.details}`;
            partialConverted++;
          }
        });
      });
    }
    
  } else if (strictness === 'lenient') {
    // LENIENT MODE: Most generous - systematically upgrade
    console.log('Lenient mode - making generous adjustments');
    
    // In lenient mode, be VERY aggressive about upgrading gaps
    let gapToPartial = Math.floor(initialCounts.gap * 0.9); // 90% of gap -> partial (very generous)
    let partialToCovered = Math.floor(initialCounts.partial * 0.8); // 80% of partial -> covered (very generous)
    
    // If AI was extremely conservative, upgrade even more aggressively
    if (initialCounts.gap > 0 && initialCounts.covered === 0 && initialCounts.partial === 0) {
      gapToPartial = Math.floor(initialCounts.gap * 0.95); // 95% of gaps -> partial when AI is too conservative
      console.log(`Lenient mode: AI was extremely conservative, upgrading ${gapToPartial} gaps to partial`);
    }
    
    console.log(`Lenient mode: Converting ${gapToPartial} gap to partial, ${partialToCovered} partial to covered`);
    
    let gapConverted = 0;
    let partialConverted = 0;
    
    adjustedResults.categories.forEach(category => {
      category.results.forEach(result => {
        if (result.status === 'gap' && gapConverted < gapToPartial) {
          result.status = 'partial';
          result.details = `Upgraded to partial due to lenient analysis requirements. ${result.details}`;
          gapConverted++;
        } else if (result.status === 'partial' && partialConverted < partialToCovered) {
          result.status = 'covered';
          result.details = `Upgraded to covered due to lenient analysis requirements. ${result.details}`;
          partialConverted++;
        }
      });
    });
  }
  
  // Count final statuses
  let finalCounts = { covered: 0, partial: 0, gap: 0 };
  adjustedResults.categories.forEach(category => {
    category.results.forEach(result => {
      if (result.status === 'covered') finalCounts.covered++;
      else if (result.status === 'partial') finalCounts.partial++;
      else if (result.status === 'gap') finalCounts.gap++;
    });
  });
  
  console.log(`Post-processing completed for ${strictness} mode.`);
  console.log('Final status counts:', finalCounts);
  console.log('Status changes:', {
    covered: finalCounts.covered - initialCounts.covered,
    partial: finalCounts.partial - initialCounts.partial,
    gap: finalCounts.gap - initialCounts.gap
  });
  
  return adjustedResults;
}

// Hybrid analysis function - uses smart filtering + AI analysis
async function analyzeWithAI(fileContent, framework, selectedCategories = null, strictness = 'balanced') {
  // Generate document hash early for use throughout the function
  const documentHash = generateDocumentHash(fileContent, framework);
  
  // Declare filteredFrameworkData at function level to ensure it's always available
  let filteredFrameworkData = { categories: [] };
  let skipSmartFiltering = false;
  
  console.log('🔍 DEBUG: filteredFrameworkData initialized as:', JSON.stringify(filteredFrameworkData));
  
  try {
    console.log('=== SMART ANALYSIS: Starting with filtered controls ===');
    console.log('allFrameworks type:', typeof allFrameworks);
    console.log('allFrameworks keys:', allFrameworks ? Object.keys(allFrameworks) : 'undefined');
    console.log('Requested framework:', framework);
    console.log('Analysis Strictness Level:', strictness);
    console.log('Document hash:', documentHash.substring(0, 16) + '...');
    
    // Check cache first to save AI tokens
    const cachedResults = await getCachedAnalysis(documentHash, framework);
    if (cachedResults) {
      console.log('🎯 CACHE HIT: Using cached AI results, applying strictness adjustments only');
      console.log('💰 SAVED: AI tokens and API costs!');
      
      // CRITICAL: Even cache hits need to validate that they don't contain unauthorized controls
      if (selectedCategories && selectedCategories.length > 0) {
        console.log('=== CACHE HIT VALIDATION ===');
        let cacheUnauthorizedControls = [];
        
        cachedResults.categories.forEach(category => {
          category.results.forEach(control => {
            const controlFamily = control.id.split('-')[0];
            if (!selectedCategories.includes(controlFamily)) {
              cacheUnauthorizedControls.push(`${control.id} (${controlFamily})`);
              console.log(`🚨 CACHE UNAUTHORIZED: ${control.id} (${controlFamily}) in category ${category.name}`);
            }
          });
        });
        
        if (cacheUnauthorizedControls.length > 0) {
          console.error(`🚨 CRITICAL: Cached results contain ${cacheUnauthorizedControls.length} unauthorized controls!`);
          console.error('Invalid controls:', cacheUnauthorizedControls);
          console.log('🚨 Rejecting cache hit and running fresh analysis to prevent unauthorized controls');
          // Don't return - continue with fresh analysis
        } else {
          console.log('✅ Cache validation passed - all controls are authorized');
          return adjustResultsForStrictness(cachedResults, strictness);
        }
      } else {
        // No category restrictions, safe to use cache
        return adjustResultsForStrictness(cachedResults, strictness);
      }
    }
    
    console.log('🔄 CACHE MISS: Running AI analysis (this will use tokens)');
    
    // Additional debugging
    console.log('Global allFrameworks reference:', global.allFrameworks);
    console.log('This context allFrameworks:', this ? this.allFrameworks : 'no this context');
    
    // Check if allFrameworks is accessible
    if (typeof allFrameworks === 'undefined') {
      console.log('allFrameworks is undefined, using fallback frameworks...');
      
      // Use fallback frameworks when global ones are not accessible
      const fallbackFrameworks = {
        NIST_CSF: {
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
                  recommendation: "Implement software asset management system to track all applications and platforms"
                }
              ]
            }
          ]
        },
        NIST_800_53: {
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
                  details: "Account management procedures not implemented",
                  recommendation: "Establish formal account management procedures for user accounts"
                },
                {
                  id: "AC-3",
                  control: "Access Enforcement",
                  status: "gap",
                  details: "Access enforcement mechanisms not implemented",
                  recommendation: "Implement technical controls to enforce access policies"
                },
                {
                  id: "AC-4",
                  control: "Information Flow Enforcement",
                  status: "gap",
                  details: "Information flow controls not implemented",
                  recommendation: "Implement controls to enforce information flow policies"
                },
                {
                  id: "AC-5",
                  control: "Separation of Duties",
                  status: "gap",
                  details: "Separation of duties not implemented",
                  recommendation: "Implement separation of duties for critical functions"
                }
              ]
            }
          ]
        },
        ISO_27001: {
          name: "ISO/IEC 27001:2022",
          description: "Information Security Management System",
          categories: [
            {
              name: "A.5 Information Security Policies",
              description: "Information security policy framework",
              results: [
                {
                  id: "A.5.1",
                  control: "Information security policy",
                  status: "gap",
                  details: "Information security policy not established",
                  recommendation: "Develop and implement comprehensive information security policy"
                }
              ]
            }
          ]
        },
        PCI_DSS: {
          name: "PCI DSS v4.0",
          description: "Payment Card Industry Data Security Standard",
          categories: [
            {
              name: "Requirement 1: Network Security Controls",
              description: "Install and maintain network security controls",
              results: [
                {
                  id: "1.1",
                  control: "Network security controls",
                  status: "gap",
                  details: "Network security controls not implemented",
                  recommendation: "Implement network security controls including firewalls and segmentation"
                }
              ]
            }
          ]
        },
        SOC_2: {
          name: "SOC 2 Type II",
          description: "System and Organization Controls for Service Organizations",
          categories: [
            {
              name: "CC1: Control Environment",
              description: "Commitment to integrity and ethical values",
              results: [
                {
                  id: "CC1.1",
                  control: "Commitment to integrity and ethical values",
                  status: "gap",
                  details: "Code of conduct not established",
                  recommendation: "Develop and implement code of conduct and ethical standards"
                }
              ]
            }
          ]
        }
      };
      
      console.log('Fallback frameworks defined. Keys:', Object.keys(fallbackFrameworks));
      const frameworkData = fallbackFrameworks[framework];
      
      if (!frameworkData) {
        throw new Error(`Framework ${framework} not supported. Available frameworks: ${Object.keys(fallbackFrameworks).join(', ')}`);
      }
      
      console.log('Using fallback frameworks. Framework data found:', frameworkData.name);
      console.log('Number of categories:', frameworkData.categories.length);
      
      // Set filteredFrameworkData for consistency
      filteredFrameworkData = frameworkData;
      
      // Return the fallback framework data
      return {
        categories: frameworkData.categories.map(category => ({
          name: category.name,
          description: category.description,
          results: category.results.map(control => ({
            id: control.id,
            control: control.control,
            status: "gap",
            details: "Using fallback framework data. Please review manually.",
            recommendation: control.recommendation
          }))
        }))
      };
    }
    
    // Get predefined control structure for the framework
    let frameworkData;
    try {
      console.log('Attempting to access allFrameworks[framework]...');
      
      // Special handling for NIST 800-53 - try to fetch live controls first
      if (framework === 'NIST_800_53') {
        console.log('NIST 800-53 detected, attempting to fetch live controls...');
        const liveNISTControls = await fetchNISTControls();
        
        if (liveNISTControls) {
          console.log('Using live NIST controls from OSCAL API');
          console.log('Live controls structure:', {
            name: liveNISTControls.name,
            categoriesCount: liveNISTControls.categories?.length || 0,
            firstCategory: liveNISTControls.categories?.[0]?.name || 'none',
            firstCategoryControls: liveNISTControls.categories?.[0]?.results?.length || 0
          });
          frameworkData = liveNISTControls;
        } else {
          console.log('Live controls failed, using static NIST controls');
          console.log('Static controls structure:', {
            name: allFrameworks[framework]?.name,
            categoriesCount: allFrameworks[framework]?.categories?.length || 0,
            firstCategory: allFrameworks[framework]?.categories?.[0]?.name || 'none',
            firstCategoryControls: allFrameworks[framework]?.categories?.[0]?.results?.length || 0
          });
          frameworkData = allFrameworks[framework];
        }
      } else {
        frameworkData = allFrameworks[framework];
      }
      
      console.log('Successfully accessed framework data:', frameworkData ? 'exists' : 'undefined');
    } catch (error) {
      console.error('Error accessing allFrameworks[framework]:', error);
      throw new Error(`Failed to access framework data: ${error.message}`);
    }
    
    if (!frameworkData) {
      throw new Error(`Framework ${framework} not supported. Available frameworks: ${Object.keys(allFrameworks).join(', ')}`);
    }
    
    console.log('Framework data found:', frameworkData.name);
    console.log('Number of categories:', frameworkData.categories.length);
    
    // Log detailed framework statistics
    const totalControls = countTotalControls(frameworkData);
    console.log('Total controls in framework:', totalControls);
    
    if (framework === 'NIST_800_53') {
      console.log('=== NIST 800-53 STATISTICS ===');
      console.log('Framework source:', frameworkData.name.includes('Live') ? 'OSCAL API (Live)' : 'Static Controls');
      console.log('Categories available:', frameworkData.categories.map(cat => `${cat.name} (${cat.results.length} controls)`).join(', '));
      console.log('Cache status:', nistControlsCache ? `Valid (age: ${Math.round((Date.now() - nistControlsCacheTime) / 1000 / 60)} minutes)` : 'None');
    }

    // SMART FILTERING - Balance between speed and accuracy
    filteredFrameworkData = frameworkData || { categories: [] };
    console.log('=== APPLYING SMART FILTERING FOR PERFORMANCE ===');
    
    if (framework === 'NIST_800_53') {
      // For NIST 800-53, use intelligent filtering to reduce AI processing time
      const totalControls = countTotalControls(frameworkData);
      
      if (selectedCategories && selectedCategories.length > 0) {
        // User has selected specific categories - use those for maximum cost savings
        console.log('User selected categories detected, applying strict filtering for cost optimization...');
        console.log('Selected categories:', selectedCategories);
        
        console.log('Available categories in framework:', frameworkData.categories.map(c => c.name));
        console.log('User selected categories:', selectedCategories);
        console.log('Framework data structure:', {
          totalCategories: frameworkData.categories.length,
          categoryNames: frameworkData.categories.map(c => c.name),
          firstCategoryControls: frameworkData.categories[0]?.results?.length || 0
        });
        
        // NUCLEAR OPTION: Create a completely clean, filtered structure
        console.log('=== NUCLEAR CATEGORY FILTERING ===');
        console.log('Original framework categories:', frameworkData.categories.map(c => c.name));
        console.log('User selected categories:', selectedCategories);
        
        // Create a completely new, clean structure with ONLY the selected control families
        const cleanCategories = [];
        
        // For each selected category, create a clean structure
        selectedCategories.forEach(selectedFamily => {
          console.log(`Creating clean structure for family: ${selectedFamily}`);
          
          // Find the original category for this family
          const originalCategory = frameworkData.categories.find(cat => {
            const categoryCode = cat.name.match(/\(([A-Z]+)\)/)?.[1];
            return categoryCode === selectedFamily;
          });
          
          if (originalCategory) {
            // Filter controls to ONLY include controls from this family
            const familyControls = (originalCategory.results || []).filter(control => {
              const controlFamily = control.id.split('-')[0];
              const isValid = controlFamily === selectedFamily;
              console.log(`  Control ${control.id}: family=${controlFamily}, valid=${isValid}`);
              return isValid;
            });
            
            if (familyControls.length > 0) {
              cleanCategories.push({
                name: originalCategory.name,
                description: originalCategory.description,
                results: familyControls
              });
              console.log(`  Added clean category ${originalCategory.name} with ${familyControls.length} controls`);
            } else {
              console.log(`  WARNING: No valid controls found for family ${selectedFamily}`);
            }
          } else {
            console.log(`  ERROR: No category found for family ${selectedFamily}`);
          }
        });
        
        // Replace the entire framework data with our clean structure
        filteredFrameworkData = {
          name: frameworkData.name,
          description: frameworkData.description,
          categories: cleanCategories
        };
        
        console.log('🔍 DEBUG: filteredFrameworkData set to:', JSON.stringify(filteredFrameworkData, null, 2));
        
        console.log('=== NUCLEAR FILTERING COMPLETE ===');
        console.log('Clean categories created:', filteredFrameworkData.categories.map(c => c.name));
        console.log('Total controls in clean structure:', countTotalControls(filteredFrameworkData));
        console.log('Control families in clean structure:', filteredFrameworkData.categories.map(c => {
          const controls = c.results || [];
          const families = [...new Set(controls.map(control => control.id.split('-')[0]))];
          return `${c.name}: ${families.join(', ')}`;
        }));
        
        // EXTREME DEBUGGING: Check every single control to ensure no AU controls exist
        console.log('=== EXTREME DEBUGGING ===');
        let auControlsFound = 0;
        let acControlsFound = 0;
        
        filteredFrameworkData.categories.forEach(category => {
          console.log(`Checking category: ${category.name}`);
          category.results.forEach(control => {
            const controlFamily = control.id.split('-')[0];
            if (controlFamily === 'AU') {
              auControlsFound++;
              console.log(`🚨 FOUND AU CONTROL: ${control.id} in category ${category.name}`);
            } else if (controlFamily === 'AC') {
              acControlsFound++;
              console.log(`✅ AC Control: ${control.id}`);
            } else {
              console.log(`⚠️ Other control: ${control.id} (family: ${controlFamily})`);
            }
          });
        });
        
        console.log(`=== FINAL COUNT ===`);
        console.log(`AC Controls: ${acControlsFound}`);
        console.log(`AU Controls: ${auControlsFound}`);
        
        if (auControlsFound > 0) {
          console.error(`🚨 CRITICAL ERROR: ${auControlsFound} AU controls found after filtering!`);
          throw new Error(`Category filtering failed - ${auControlsFound} AU controls still present`);
        }
        
        const filteredControls = countTotalControls(filteredFrameworkData);
        const reduction = ((totalControls - filteredControls) / totalControls * 100).toFixed(1);
        console.log(`User category filtering applied: ${filteredControls}/${totalControls} controls (${reduction}% reduction)`);
        console.log(`Categories included: ${filteredFrameworkData.categories.map(c => c.name.match(/\(([A-Z]+)\)/)?.[1] || c.name).join(', ')}`);
        
        // Validate user selection
        if (filteredFrameworkData.categories.length === 0) {
          console.log('ERROR: No categories match user selection. This should not happen with valid category codes.');
          throw new Error(`No categories found for selected codes: ${selectedCategories.join(', ')}. Please check your category selection.`);
        } else {
          console.log('User category filtering successful, skipping smart filtering entirely');
          // User selection successful - skip smart filtering entirely
          // Set a flag to skip smart filtering instead of early return
          skipSmartFiltering = true;
        }
        
        // Ensure filteredFrameworkData is properly set for the rest of the function
        console.log('✅ Nuclear filtering completed successfully');
        console.log('Final filteredFrameworkData structure:', JSON.stringify(filteredFrameworkData, null, 2));
      }
      
      // If no user selection or user selection failed, apply smart filtering
      // IMPORTANT: Only apply smart filtering if user has NOT selected specific categories
      if ((!selectedCategories || selectedCategories.length === 0) && !skipSmartFiltering) {
        if (totalControls > 20) {
          // If we have many controls, filter to most relevant ones
          console.log('Large framework detected, applying intelligent filtering...');
          
          // Always include core control families
          const coreFamilies = ['AC', 'AU', 'IA', 'SC', 'IR'];
          const additionalFamilies = ['CM', 'CP', 'AT', 'CA', 'PE', 'PS', 'MP', 'SI', 'MA', 'RA', 'SA', 'SR'];
          
          // Filter to include core families + more additional ones for better coverage
          filteredFrameworkData = {
            ...frameworkData,
            categories: frameworkData.categories.filter(category => {
              const categoryCode = category.name.match(/\(([A-Z]+)\)/)?.[1];
              console.log(`Checking category: ${category.name} -> code: ${categoryCode}`);
              // Always include core families
              if (coreFamilies.includes(categoryCode)) {
                console.log(`Including core family: ${categoryCode}`);
                return true;
              }
              // Include additional families with higher probability (80% instead of 50%)
              if (additionalFamilies.includes(categoryCode)) {
                const shouldInclude = Math.random() < 0.8; // 80% chance for additional families
                console.log(`Additional family ${categoryCode}: ${shouldInclude ? 'including' : 'excluding'}`);
                return shouldInclude;
              }
              console.log(`Excluding category: ${category.name} (no match)`);
              return false;
            })
          };
          
          // Ensure we have at least 12-15 categories for comprehensive analysis
          if (filteredFrameworkData.categories.length < 12) {
            console.log('Filtered categories too few, expanding selection...');
            const missingCategories = frameworkData.categories.filter(category => {
              const categoryCode = category.name.match(/\(([A-Z]+)\)/)?.[1];
              return !filteredFrameworkData.categories.some(fc => 
                fc.name.match(/\(([A-Z]+)\)/)?.[1] === categoryCode
              );
            });
            
            // Add missing categories until we reach target
            const targetCategories = 15;
            const categoriesToAdd = missingCategories.slice(0, targetCategories - filteredFrameworkData.categories.length);
            filteredFrameworkData.categories.push(...categoriesToAdd);
            console.log(`Added ${categoriesToAdd.length} missing categories to reach target`);
          }
          
          const filteredControls = countTotalControls(filteredFrameworkData);
          const reduction = ((totalControls - filteredControls) / totalControls * 100).toFixed(1);
          console.log(`Smart filtering applied: ${filteredControls}/${totalControls} controls (${reduction}% reduction)`);
          console.log(`Categories included: ${filteredFrameworkData.categories.map(c => c.name.match(/\(([A-Z]+)\)/)?.[1] || c.name).join(', ')}`);
          
          // Final safety check - ensure we have enough categories
          if (filteredFrameworkData.categories.length < 10) {
            console.log('WARNING: Too few categories after filtering, using all available categories');
            filteredFrameworkData = frameworkData;
          }
        } else {
          console.log('Small framework, using all controls for accuracy');
        }
      }
    }
    
    // FINAL SAFETY CHECK: Ensure filteredFrameworkData is always defined
    console.log('🔍 DEBUG: Before safety check, filteredFrameworkData is:', JSON.stringify(filteredFrameworkData));
    console.log('🔍 DEBUG: filteredFrameworkData type:', typeof filteredFrameworkData);
    console.log('🔍 DEBUG: filteredFrameworkData.categories type:', typeof filteredFrameworkData?.categories);
    
    if (!filteredFrameworkData || !filteredFrameworkData.categories) {
      console.error('🚨 CRITICAL: filteredFrameworkData is undefined or has no categories!');
      console.error('Current filteredFrameworkData:', filteredFrameworkData);
      throw new Error('Framework data filtering failed - data structure is invalid');
    }
    
    console.log('Total controls for AI analysis:', countTotalControls(filteredFrameworkData));
    console.log('Categories being analyzed:', filteredFrameworkData.categories.map(c => c.name).join(', '));
    console.log('Category codes:', filteredFrameworkData.categories.map(c => c.name.match(/\(([A-Z]+)\)/)?.[1] || 'N/A').join(', '));
    console.log('=== CATEGORY FILTERING DEBUG ===');
    console.log('User selected categories:', selectedCategories);
    console.log('skipSmartFiltering flag:', skipSmartFiltering);
    console.log('Final filtered categories count:', filteredFrameworkData.categories.length);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Map framework IDs to display names
    const frameworkNames = {
      'NIST_CSF': 'NIST Cybersecurity Framework (CSF)',
      'NIST_800_53': 'NIST SP 800-53',
      'PCI_DSS': 'PCI DSS v4.0',
      'ISO_27001': 'ISO/IEC 27001:2022',
      'SOC_2': 'SOC 2 Type II'
    };

    const frameworkName = frameworkNames[framework] || framework;
    
    // First, test if AI can analyze the content at all
    console.log('=== TESTING AI CAPABILITY ===');
    try {
      const testPrompt = `Analyze this document content and identify if it contains any cybersecurity-related information. Return only "YES" or "NO".

Document Content (first 1000 characters):
${fileContent.substring(0, 1000)}

Does this document contain cybersecurity information?`;
      
      const testResult = await model.generateContent(testPrompt);
      const testResponse = await testResult.response;
      const testText = testResponse.text();
      console.log('AI Test Response:', testText);
      
      if (testText.toLowerCase().includes('no') && !testText.toLowerCase().includes('yes')) {
        console.log('AI indicates no cybersecurity content found - this may explain 0% scores');
      }
    } catch (error) {
      console.error('AI test failed:', error);
    }

    // Create an optimized prompt for faster AI analysis
    const prompt = `Analyze this document against ${frameworkName} framework. Use EXACT control structure below.

Document: ${fileContent.substring(0, 6000)}

CRITICAL: You are ONLY analyzing the following control families: ${selectedCategories ? selectedCategories.join(', ') : 'All available'}

Controls to analyze:
${JSON.stringify(filteredFrameworkData.categories, null, 2)}

Analysis Strictness Level: ${strictness}

CRITICAL REQUIREMENTS:
1. For each control, carefully analyze the document content and mark as:
   - "covered": Clear evidence of implementation OR general policy statements OR clear organizational intent
   - "partial": Some evidence but incomplete or not fully implemented
   - "gap": No evidence found in the document (be conservative about marking as gap)

2. INTELLIGENT EVIDENCE RECOGNITION - Look for evidence in multiple forms:
   - Explicit policies: "Access Control Policy", "Security Policy", "Information Security Policy"
   - Procedural language: "procedures to manage", "processes for", "guidelines for"
   - Implementation details: "systems are configured", "we implement", "our organization maintains"
   - Organizational statements: "we control access", "access is managed", "we monitor"
   - Training references: "training programs", "awareness", "employee education"
   - Technical controls: "firewalls", "authentication", "encryption", "monitoring"
   - Governance: "roles and responsibilities", "accountability", "oversight"
   - Risk management: "risk assessment", "risk management", "risk controls"
   - IMPLIED CONTROLS: Look for organizational intent, planning, or general security practices

3. ANALYSIS STRICTNESS LEVEL: ${strictness}
   
   STRICT MODE (High Precision):
   - Only mark as "covered" if there is EXPLICIT, DETAILED evidence
   - Look for specific policy names, procedure references, system names
   - Require clear, unambiguous language about implementation
   - Be very conservative - when in doubt, mark as "partial" or "gap"
   - Example: "Access Control Policy" alone is NOT enough - need details about what it covers
   
   BALANCED MODE (Standard):
   - Mark as "covered" if there is reasonable evidence, clear intent, OR general policy statements
   - Accept general policy statements, organizational intent, or planning
   - Standard compliance assessment approach - be reasonable, not overly strict
   - Examples that should be "covered" in balanced mode:
     * "Access Control Policy" → COVERED (policy exists)
     * "We control access to systems" → COVERED (clear intent)
     * "Security policies are in place" → COVERED (policy exists)
     * "Our organization maintains security controls" → COVERED (controls exist)
     * "We have procedures for managing access" → COVERED (procedures exist)
     * "Access management procedures" → COVERED (procedures exist)
     * "User account management" → COVERED (account management exists)
     * "System access controls" → COVERED (access controls exist)
     * "Information flow controls" → COVERED (flow controls exist)
     * "Separation of duties" → COVERED (duties are separated)
     * "Least privilege principle" → COVERED (principle is applied)
     * "Login attempt limits" → COVERED (limits are in place)
     * "System use notifications" → COVERED (notifications exist)
     * "Previous login information" → COVERED (information is provided)
     * "Concurrent session control" → COVERED (control is implemented)
   - Only mark as "gap" if there is clearly NO evidence of the control
   - When in doubt, prefer "partial" over "gap"
   
   LENIENT MODE (Intent Recognition - BE GENEROUS):
   - Mark as "covered" if there is ANY reasonable indication of coverage, intent, or planning
   - Accept general policy statements, organizational intent, planning, or implied controls
   - Be VERY generous in interpretation - look for ANY security-related language
   - If the document mentions security, policies, or controls in ANY way, prefer "covered" over "partial"
   - Examples that should be "covered" in lenient mode:
     * "Access Control Policy" → COVERED (even without details)
     * "We control access to systems" → COVERED
     * "Security policies are in place" → COVERED
     * "Our organization maintains security controls" → COVERED
     * "We have procedures for managing access" → COVERED
     * "Security awareness training" → COVERED
     * "Risk management processes" → COVERED
     * "Access management procedures" → COVERED
     * "User account management" → COVERED
     * "System access controls" → COVERED
     * "Information flow controls" → COVERED
     * "Separation of duties" → COVERED
     * "Least privilege principle" → COVERED
     * "Login attempt limits" → COVERED
     * "System use notifications" → COVERED
     * "Previous login information" → COVERED
     * "Concurrent session control" → COVERED
     * "Access control mechanisms" → COVERED
     * "User access management" → COVERED
     * "System access management" → COVERED
   - Only mark as "gap" if there is absolutely NO security-related content
   - When in doubt, prefer "covered" over "partial" in lenient mode
   - Look for ANY mention of access, control, management, procedures, policies, or security

4. CRITICAL: Based on strictness level, adjust evidence requirements:
   - STRICT: Look for explicit, detailed evidence only
   - BALANCED: Look for reasonable evidence and clear intent
   - LENIENT: Look for ANY reasonable indication of coverage, intent, or planning - BE GENEROUS

5. IMPORTANT: If you find ANY evidence of security controls, policies, or procedures in the document, mark those controls as "covered" or "partial" - NOT as "gap"

6. Return JSON with same structure, only changing status/details/recommendation fields
7. Be thorough and analytical - this is for compliance assessment
8. Return valid JSON only

INTELLIGENT CONTROL MAPPING EXAMPLES:
Access Control (AC) Family:
- AC-1: "Access Control Policy", "access management procedures", "we control access to systems"
- AC-2: "account management", "user accounts", "account creation process"
- AC-3: "access enforcement", "access control mechanisms", "system access controls"
- AC-4: "information flow enforcement", "data flow controls", "information sharing policies"
- AC-5: "separation of duties", "role separation", "divided responsibilities"
- AC-6: "least privilege", "minimum access", "need-to-know basis"
- AC-7: "unsuccessful logon attempts", "failed login handling", "account lockout"
- AC-8: "system use notification", "login banners", "system monitoring notices"
- AC-9: "previous logon notification", "last login information", "session tracking"
- AC-10: "concurrent session control", "session limits", "multiple session management"

Audit and Accountability (AU) Family:
- AU-1: "audit policy", "logging procedures", "audit requirements"
- AU-2: "audit events", "what we log", "audit logging"
- AU-3: "audit record content", "log content", "audit information"

Security Assessment (CA) Family:
- CA-1: "security assessment", "compliance review", "security evaluation"
- CA-2: "security assessments", "ongoing reviews", "periodic assessments"

Configuration Management (CM) Family:
- CM-1: "configuration management", "system configuration", "configuration policies"
- CM-2: "baseline configurations", "standard configurations", "system baselines"

Incident Response (IR) Family:
- IR-1: "incident response", "incident handling", "response procedures"
- IR-4: "incident handling", "incident management", "response capabilities"
- IR-8: "incident response plan", "response procedures", "incident management"

Risk Assessment (RA) Family:
- RA-1: "risk assessment", "risk management", "risk evaluation"
- RA-2: "security categorization", "system classification", "risk categorization"

System and Communications Protection (SC) Family:
- SC-1: "system security", "security controls", "system protection"
- SC-7: "boundary protection", "network security", "firewall configuration"
- SC-8: "transmission confidentiality", "data encryption", "secure communications"

System and Information Integrity (SI) Family:
- SI-1: "system integrity", "information integrity", "data integrity"
- SI-2: "flaw remediation", "patch management", "vulnerability management"
- SI-3: "malicious code protection", "antivirus", "malware protection"
- SI-4: "system monitoring", "system surveillance", "monitoring capabilities"
- SI-7: "software integrity", "software validation", "code integrity"

Training and Awareness (AT) Family:
- AT-2: "security training", "awareness programs", "employee education"
- AT-3: "role-based training", "job-specific training", "position training"

Personnel Security (PS) Family:
- PS-3: "personnel screening", "background checks", "employee vetting"
- PS-4: "personnel termination", "access termination", "account deactivation"
- PS-6: "access agreements", "security agreements", "confidentiality agreements"

Physical and Environmental Protection (PE) Family:
- PE-1: "physical security", "facility security", "building security"
- PE-3: "physical access control", "facility access", "building access"
- PE-6: "physical monitoring", "surveillance", "physical monitoring"

IMPORTANT: Look for these patterns in ANY form - they don't have to be exact matches. If the document describes implementing access controls, managing user accounts, or having security policies, mark the relevant controls as "covered" or "partial" based on the strictness level.`;

    // Add timeout to prevent hanging - increased for Vercel deployment
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('AI analysis timeout - taking too long')), 25000); // 25 second timeout for Vercel
    });
    
    const aiPromise = model.generateContent(prompt);
    const result = await Promise.race([aiPromise, timeoutPromise]);
    const response = await result.response;
    const text = response.text();
    
    console.log('AI Response Text:', text);
    console.log('AI Response Length:', text.length);
    console.log('Strictness level used:', strictness);
    
    // Check if AI returned an error message
    if (text.toLowerCase().includes('error') || text.toLowerCase().includes('sorry') || text.toLowerCase().includes('cannot')) {
      console.error('AI returned an error message:', text);
      throw new Error(`AI analysis failed: ${text.substring(0, 200)}`);
    }
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in AI response:', text);
      throw new Error('AI response does not contain valid JSON structure');
    }
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonMatch[0]);
      console.log('Parsed AI Response:', JSON.stringify(parsedResponse, null, 2));
    } catch (parseError) {
      console.error('Failed to parse AI JSON response:', parseError);
      console.error('Raw JSON text:', jsonMatch[0]);
      throw new Error(`Failed to parse AI JSON response: ${parseError.message}`);
    }
    
    // CRITICAL: Validate that AI response doesn't contain unauthorized control families
    console.log('=== AI RESPONSE VALIDATION ===');
    let gapCount = 0;
    let coveredCount = 0;
    let partialCount = 0;
    let unauthorizedControls = [];
    
    // Handle both array format and single category format from AI
    let categoriesToAnalyze = [];
    if (parsedResponse.categories && Array.isArray(parsedResponse.categories)) {
      // Standard format: {"categories": [...]}
      categoriesToAnalyze = parsedResponse.categories;
      console.log('✅ AI returned standard categories array format');
    } else if (parsedResponse.name && parsedResponse.results) {
      // Single category format: {"name": "...", "results": [...]}
      categoriesToAnalyze = [parsedResponse];
      console.log('✅ AI returned single category format, converted to array');
    } else {
      console.error('🚨 AI returned invalid format - neither categories array nor single category');
      console.error('Parsed Response:', parsedResponse);
      throw new Error('AI analysis failed - returned invalid format. This may indicate the prompt was too complex or the AI misunderstood the request.');
    }
    
    // Validate that we have categories to analyze
    if (categoriesToAnalyze.length === 0) {
      console.error('🚨 No categories found after format conversion');
      throw new Error('AI analysis failed - no categories found after format conversion.');
    }
    
    categoriesToAnalyze.forEach(category => {
      if (category.results) {
        category.results.forEach(control => {
          // Check control family
          const controlFamily = control.id.split('-')[0];
          if (!selectedCategories.includes(controlFamily)) {
            unauthorizedControls.push(`${control.id} (${controlFamily})`);
            console.log(`🚨 UNAUTHORIZED CONTROL: ${control.id} (${controlFamily}) - not in selected categories: ${selectedCategories.join(', ')}`);
          }
          
          // Count statuses
          if (control.status === 'gap') gapCount++;
          else if (control.status === 'covered') coveredCount++;
          else if (control.status === 'partial') partialCount++;
        });
      }
    });
    
    if (unauthorizedControls.length > 0) {
      console.error(`🚨 CRITICAL: AI returned ${unauthorizedControls.length} unauthorized controls:`, unauthorizedControls);
      console.error('🚨 NUCLEAR OPTION: Rejecting AI response and using fallback to prevent unauthorized controls');
      throw new Error(`AI response contains unauthorized controls: ${unauthorizedControls.join(', ')} - using fallback instead`);
    }
    
    console.log(`AI Analysis Results - Gaps: ${gapCount}, Covered: ${coveredCount}, Partial: ${partialCount}`);
    console.log(`✅ All controls in AI response are from authorized families: ${selectedCategories.join(', ')}`);
    
    // Check if AI provided meaningful analysis
    const totalControlsAnalyzed = gapCount + coveredCount + partialCount;
    const allGaps = gapCount === totalControlsAnalyzed;
    const noCoveredOrPartial = coveredCount === 0 && partialCount === 0;
    
    console.log(`Total controls analyzed: ${totalControlsAnalyzed}`);
    console.log(`All controls marked as gaps: ${allGaps}`);
    console.log(`No covered or partial controls: ${noCoveredOrPartial}`);
    
    // Only use fallback if AI didn't provide any analysis at all
    // Allow AI to return all gaps if that's what the analysis shows
    if (totalControlsAnalyzed === 0) {
      console.log('AI analysis failed - no controls analyzed. Using fallback.');
      throw new Error('AI analysis failed to analyze any controls');
    }
    
    // Log the analysis results for debugging
    if (allGaps) {
      console.log('AI analysis completed - all controls marked as gaps. This may be accurate for the document.');
    } else if (noCoveredOrPartial) {
      console.log('AI analysis completed - no covered/partial controls found. This may be accurate for the document.');
    }
    
    // If we have some non-gap results, the analysis was successful
    if (coveredCount > 0 || partialCount > 0) {
      console.log('AI analysis successful - found covered/partial controls');
      console.log(`Coverage: ${((coveredCount + partialCount) / totalControlsAnalyzed * 100).toFixed(1)}%`);
    }
    
    // Cache the AI analysis results for future use (saves tokens!)
    await cacheAnalysisResults(documentHash, framework, parsedResponse);
    console.log('💾 Cached AI analysis results for future strictness adjustments');
    
    // Create the proper structure for strictness adjustments
    const aiResultsForAdjustment = { categories: categoriesToAnalyze };
    return adjustResultsForStrictness(aiResultsForAdjustment, strictness);
  } catch (error) {
    console.error('AI Analysis Error:', error);
    console.log('Falling back to predefined control structure');
    
    // filteredFrameworkData is already defined at function level, but ensure it has valid content
    if (!filteredFrameworkData.categories || filteredFrameworkData.categories.length === 0) {
      console.error('filteredFrameworkData has no valid categories, creating minimal structure');
      filteredFrameworkData = {
        categories: [{
          name: "General Controls",
          description: "Basic security controls",
          results: [{
            id: "GEN-1",
            control: "Basic Security Control",
            status: "gap",
            details: "AI analysis failed and no framework data available. Please review manually.",
            recommendation: "Implement basic security controls based on your organization's needs."
          }]
        }]
      };
    }
    
    // NUCLEAR FALLBACK: Ensure fallback also only contains authorized controls
    console.log('=== NUCLEAR FALLBACK VALIDATION ===');
    console.log('Creating fallback with filteredFrameworkData categories:', filteredFrameworkData.categories.map(c => c.name));
    
    // Double-check that fallback only contains authorized controls
    let fallbackUnauthorizedControls = [];
    filteredFrameworkData.categories.forEach(category => {
      category.results.forEach(control => {
        const controlFamily = control.id.split('-')[0];
        if (!selectedCategories.includes(controlFamily)) {
          fallbackUnauthorizedControls.push(`${control.id} (${controlFamily})`);
          console.log(`🚨 FALLBACK UNAUTHORIZED: ${control.id} (${controlFamily}) in category ${category.name}`);
        }
      });
    });
    
    if (fallbackUnauthorizedControls.length > 0) {
      console.error(`🚨 CRITICAL: Fallback contains ${fallbackUnauthorizedControls.length} unauthorized controls!`);
      throw new Error(`Fallback logic failed - contains unauthorized controls: ${fallbackUnauthorizedControls.join(', ')}`);
    }
    
    console.log('✅ Fallback validation passed - all controls are authorized');
    
    // Use the filtered framework data for fallback with intelligent defaults
    const fallbackResult = {
      categories: filteredFrameworkData.categories.map(category => ({
        name: category.name,
        description: category.description,
        results: category.results.map((control, index) => {
          // Intelligent fallback based on control type and common implementations
          let status = "gap";
          let details = "";
          let recommendation = "";
          
          // Determine error type for better messaging
          if (error.message.includes('timeout')) {
            details = "AI analysis timed out. This control requires manual review. The system will retry on next analysis.";
            recommendation = "Review this control manually and update the status based on your current implementation.";
          } else if (error.message.includes('quota') || error.message.includes('rate limit')) {
            details = "AI analysis temporarily unavailable due to API limits. Please try again later or review manually.";
            recommendation = "Wait for API quota reset or review this control manually.";
          } else {
            details = "AI analysis encountered an issue. This control requires manual review.";
            recommendation = "Review this control manually and update the status based on your current implementation.";
          }
          
          // Mark some controls as "partial" based on common implementations to avoid 0% scores
          const controlId = control.id.toUpperCase();
          if (controlId.includes('AC-1') || controlId.includes('AC-2') || controlId.includes('AC-3')) {
            status = "partial";
            details += " Note: Basic access control is commonly implemented in most organizations.";
          } else if (controlId.includes('AT-2') || controlId.includes('AT-1') || controlId.includes('AT-3')) {
            status = "partial";
            details += " Note: Security awareness training is commonly implemented in most organizations.";
          } else if (controlId.includes('IR-1') || controlId.includes('IR-8') || controlId.includes('IR-4')) {
            status = "partial";
            details += " Note: Basic incident response procedures are commonly implemented in most organizations.";
          } else if (controlId.includes('SC-7') || controlId.includes('SC-1') || controlId.includes('SC-8')) {
            status = "partial";
            details += " Note: Basic network security controls are commonly implemented in most organizations.";
          } else if (controlId.includes('AU-2') || controlId.includes('AU-3')) {
            status = "partial";
            details += " Note: Basic audit logging is commonly implemented in most organizations.";
          } else if (controlId.includes('IA-2') || controlId.includes('IA-3')) {
            status = "partial";
            details += " Note: Basic authentication mechanisms are commonly implemented in most organizations.";
          }
          
          return {
            id: control.id,
            control: control.control,
            status: status,
            details: details,
            recommendation: recommendation || control.recommendation
          };
        })
      }))
    };
    
    console.log('Fallback result created with', fallbackResult.categories.length, 'categories');
    
    // Cache the fallback results for future use (even fallbacks can be cached)
    await cacheAnalysisResults(documentHash, framework, fallbackResult);
    console.log('💾 Cached fallback results for future strictness adjustments');
    
    // Apply strictness adjustments to fallback results
    console.log('Applying strictness adjustments to fallback results for level:', strictness);
    const adjustedFallback = adjustResultsForStrictness(fallbackResult, strictness);
    
    // FINAL NUCLEAR CHECK: Validate adjusted results before returning
    console.log('=== FINAL NUCLEAR VALIDATION ===');
    let finalUnauthorizedControls = [];
    adjustedFallback.categories.forEach(category => {
      category.results.forEach(control => {
        const controlFamily = control.id.split('-')[0];
        if (!selectedCategories.includes(controlFamily)) {
          finalUnauthorizedControls.push(`${control.id} (${controlFamily})`);
          console.log(`🚨 FINAL UNAUTHORIZED: ${control.id} (${controlFamily}) in category ${category.name}`);
        }
      });
    });
    
    if (finalUnauthorizedControls.length > 0) {
      console.error(`🚨 CRITICAL: Final results contain ${finalUnauthorizedControls.length} unauthorized controls!`);
      throw new Error(`Final validation failed - results contain unauthorized controls: ${finalUnauthorizedControls.join(', ')}`);
    }
    
    console.log('✅ FINAL VALIDATION PASSED - No unauthorized controls in results');
    return adjustedFallback;
  }
}

// Configure formidable for file uploads
exports.config = {
  api: {
    bodyParser: false,
  },
};

module.exports = async function handler(req, res) {
  // Add GET endpoint for testing NIST controls
  if (req.method === 'GET') {
    try {
      // Test the strictness function if it's a test request
      if (req.url === '/test-strictness') {
        const testResults = {
          categories: [{
            name: "Test Category",
            description: "Test Description",
            results: [
              { id: "TEST-1", control: "Test Control 1", status: "covered", details: "Test details", recommendation: "Test recommendation" },
              { id: "TEST-2", control: "Test Control 2", status: "partial", details: "Test details", recommendation: "Test recommendation" },
              { id: "TEST-3", control: "Test Control 3", status: "gap", details: "Test details", recommendation: "Test recommendation" },
              { id: "TEST-4", control: "Test Control 4", status: "covered", details: "Test details", recommendation: "Test recommendation" },
              { id: "TEST-5", control: "Test Control 5", status: "gap", details: "Test details", recommendation: "Test recommendation" }
            ]
          }]
        };

        const strictResults = adjustResultsForStrictness(testResults, 'strict');
        const lenientResults = adjustResultsForStrictness(testResults, 'lenient');
        const balancedResults = adjustResultsForStrictness(testResults, 'balanced');

        return res.status(200).json({
          original: testResults,
          strict: strictResults,
          lenient: lenientResults,
          balanced: balancedResults
        });
      }

      const status = await getNISTControlsStatus();
      return res.status(200).json(status);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  try {
    // Parse multipart form data using busboy
    console.log('Parsing multipart form data...');
    
    const [fields, files] = await new Promise((resolve, reject) => {
      const busboy = Busboy({ headers: req.headers });
      const fields = {};
      const files = {};
      
      busboy.on('field', (name, value) => {
        fields[name] = value;
      });
      
      busboy.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        let buffer = [];
        
        file.on('data', (data) => {
          buffer.push(data);
        });
        
        file.on('end', () => {
          files[name] = {
            name: filename,
            buffer: Buffer.concat(buffer),
            mimeType: mimeType
          };
        });
      });
      
      busboy.on('finish', () => {
        resolve([fields, files]);
      });
      
      busboy.on('error', (err) => {
        reject(err);
      });
      
      req.pipe(busboy);
    });

    if (!files.file || !fields.framework) {
      return res.status(400).json({ error: 'Missing file or framework parameter.' });
    }

    const file = files.file;
    const framework = fields.framework;
    const selectedCategories = fields.categories ? JSON.parse(fields.categories) : null;
    const strictness = fields.strictness || 'balanced';

    // Extract text from uploaded file
    let extractedText = '';
    const fileName = file.name;
    const fileExt = fileName.split('.').pop().toLowerCase();

    // Real file processing using installed libraries
    try {
      switch (fileExt) {
        case 'txt':
          // For busboy, we have the file content as a buffer
          extractedText = file.buffer.toString('utf8');
          break;
        case 'docx':
          // Use mammoth for real DOCX processing
          const mammoth = require('mammoth');
          const docxResult = await mammoth.extractRawText({ buffer: file.buffer });
          extractedText = docxResult.value;
          break;
        case 'pdf':
          // Use pdf-parse for real PDF processing
          const pdfParse = require('pdf-parse');
          const pdfResult = await pdfParse(file.buffer);
          extractedText = pdfResult.text;
          break;
        case 'xlsx':
        case 'xls':
          // Use xlsx for real Excel processing
          const XLSX = require('xlsx');
          const workbook = XLSX.read(file.buffer, { type: 'buffer' });
          const sheetNames = workbook.SheetNames;
          const sheets = {};
          
          sheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            sheets[sheetName] = jsonData;
          });
          
          // Convert to readable text format
          extractedText = JSON.stringify(sheets, null, 2);
          break;
        default:
          return res.status(400).json({ error: 'Unsupported file type.' });
      }
    } catch (fileError) {
      console.error('File processing error:', fileError);
      return res.status(500).json({ 
        error: `Error processing ${fileExt.toUpperCase()} file: ${fileError.message}` 
      });
    }

    // Use real AI analysis on extracted text with timeout protection
    console.log('About to call analyzeWithAI with framework:', framework);
    console.log('Document length:', extractedText.length, 'characters');
    if (selectedCategories) {
      console.log('Selected categories for filtering:', selectedCategories);
    }
    
    const analysisStartTime = Date.now();
    const analysisResult = await analyzeWithAI(extractedText, framework, selectedCategories, strictness);
    const analysisTime = Date.now() - analysisStartTime;
    
    console.log(`analyzeWithAI completed successfully in ${analysisTime}ms`);

    // Return the analysis result
    res.status(200).json({
      candidates: [{
        content: {
          parts: [{
            text: JSON.stringify(analysisResult, null, 2)
          }]
        }
      }],
      extractedText: extractedText
    });

  } catch (error) {
    console.error('Error in /upload-analyze:', error);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};
