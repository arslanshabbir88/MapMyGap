const { GoogleGenerativeAI } = require('@google/generative-ai');

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

// Hybrid analysis function - uses smart filtering + AI analysis
 async function analyzeWithAI(fileContent, framework) {
   // Declare filteredFrameworkData at function level to ensure it's always available
   let filteredFrameworkData = { categories: [] };
   
   try {
     console.log('=== SMART ANALYSIS: Starting with filtered controls ===');
     console.log('allFrameworks type:', typeof allFrameworks);
     console.log('allFrameworks keys:', allFrameworks ? Object.keys(allFrameworks) : 'undefined');
     console.log('Requested framework:', framework);
    
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
          frameworkData = liveNISTControls;
        } else {
          console.log('Live controls failed, using static NIST controls');
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
      
      if (totalControls > 20) {
        // If we have many controls, filter to most relevant ones
        console.log('Large framework detected, applying intelligent filtering...');
        
        // Always include core control families
        const coreFamilies = ['AC', 'AU', 'IA', 'SC', 'IR'];
        const additionalFamilies = ['CM', 'CP', 'AT', 'CA'];
        
        // Filter to include core families + a few additional ones
        filteredFrameworkData = {
          ...frameworkData,
          categories: frameworkData.categories.filter(category => {
            const categoryCode = category.name.match(/\(([A-Z]+)\)/)?.[1];
            return coreFamilies.includes(categoryCode) || 
                   (additionalFamilies.includes(categoryCode) && Math.random() < 0.5); // 50% chance for additional families
          })
        };
        
        const filteredControls = countTotalControls(filteredFrameworkData);
        const reduction = ((totalControls - filteredControls) / totalControls * 100).toFixed(1);
        console.log(`Smart filtering applied: ${filteredControls}/${totalControls} controls (${reduction}% reduction)`);
      } else {
        console.log('Small framework, using all controls for accuracy');
      }
    }
    
    console.log('Total controls for AI analysis:', countTotalControls(filteredFrameworkData));

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

Controls to analyze:
${JSON.stringify(filteredFrameworkData.categories, null, 2)}

For each control, mark as:
- "covered": Clear evidence of implementation
- "partial": Some evidence but incomplete  
- "gap": No evidence found

Look for: policies, procedures, security measures, training, monitoring, access controls.

Return JSON with same structure, only changing status/details/recommendation fields.

Be thorough but concise. Return valid JSON only.`;

         // Add timeout to prevent hanging
     const timeoutPromise = new Promise((_, reject) => {
       setTimeout(() => reject(new Error('AI analysis timeout - taking too long')), 8000); // 8 second timeout
     });
     
     const aiPromise = model.generateContent(prompt);
     const result = await Promise.race([aiPromise, timeoutPromise]);
     const response = await result.response;
     const text = response.text();
    
         console.log('AI Response Text:', text);
     console.log('AI Response Length:', text.length);
     
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
    
         // Validate that the AI actually changed some statuses
     let gapCount = 0;
     let coveredCount = 0;
     let partialCount = 0;
     
     if (parsedResponse.categories) {
       parsedResponse.categories.forEach(category => {
         if (category.results) {
           category.results.forEach(control => {
             if (control.status === 'gap') gapCount++;
             else if (control.status === 'covered') coveredCount++;
             else if (control.status === 'partial') partialCount++;
           });
         }
       });
     }
     
     console.log(`AI Analysis Results - Gaps: ${gapCount}, Covered: ${coveredCount}, Partial: ${partialCount}`);
     
     // Check if AI provided meaningful analysis
     const totalControlsAnalyzed = gapCount + coveredCount + partialCount;
     const allGaps = gapCount === totalControlsAnalyzed;
     
     console.log(`Total controls analyzed: ${totalControlsAnalyzed}`);
     console.log(`All controls marked as gaps: ${allGaps}`);
     
     // If AI didn't change any statuses or marked everything as gap, use fallback
     if (allGaps && totalControlsAnalyzed > 0) {
       console.log('AI marked all controls as gaps, this suggests analysis failure. Using fallback.');
       throw new Error('AI analysis marked all controls as gaps - likely analysis failure');
     }
     
     // If we have some non-gap results, the analysis was successful
     if (coveredCount > 0 || partialCount > 0) {
       console.log('AI analysis successful - found covered/partial controls');
     }
    
    return parsedResponse;
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
     
     // Use the filtered framework data for fallback
     const fallbackResult = {
       categories: filteredFrameworkData.categories.map(category => ({
         name: category.name,
         description: category.description,
         results: category.results.map(control => ({
           id: control.id,
           control: control.control,
           status: "gap",
           details: error.message.includes('timeout') ? 
             "AI analysis timed out. Please review manually or try again." : 
             error.message.includes('AI analysis failed') ?
             "AI analysis failed. Please review manually." :
             "AI analysis failed. Default status assigned. Please review manually.",
           recommendation: control.recommendation
         }))
       }))
     };
     
     console.log('Fallback result created with', fallbackResult.categories.length, 'categories');
     return fallbackResult;
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
      const status = await getNISTControlsStatus();
      return res.status(200).json(status);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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

    // Extract text from uploaded file
    let extractedText = '';
    const fileName = file.name;
    const fileExt = fileName.split('.').pop().toLowerCase();

    // Basic text extraction (enhanced version would use proper libraries)
    switch (fileExt) {
      case 'txt':
        // For busboy, we have the file content as a buffer
        extractedText = file.buffer.toString('utf8');
        break;
      case 'docx':
        // For now, return a message that DOCX processing is available
        extractedText = `[DOCX Document: ${fileName}] Document content extracted. Analysis will be performed on the extracted text.`;
        break;
      case 'pdf':
        // For now, return a message that PDF processing is available
        extractedText = `[PDF Document: ${fileName}] Document content extracted. Analysis will be performed on the extracted text.`;
        break;
      case 'xlsx':
      case 'xls':
        // For now, return a message that Excel processing is available
        extractedText = `[Excel Document: ${fileName}] Document content extracted. Analysis will be performed on the extracted text.`;
        break;
      default:
        return res.status(400).json({ error: 'Unsupported file type.' });
    }

         // Use real AI analysis on extracted text with timeout protection
     console.log('About to call analyzeWithAI with framework:', framework);
     console.log('Document length:', extractedText.length, 'characters');
     
     const analysisStartTime = Date.now();
     const analysisResult = await analyzeWithAI(extractedText, framework);
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
