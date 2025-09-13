// Comprehensive Compliance Framework Controls
// This file provides structured control data for AI analysis

export const pciDSS = {
  name: "PCI DSS v4.0.1",
  description: "Payment Card Industry Data Security Standard v4.0.1 (June 2024)",
  definitions: {
    "Legal Exception": "A specific circumstance where a requirement may not apply due to legal or regulatory constraints that prevent full implementation of the requirement.",
    "Phishing Resistant Authentication": "Authentication methods that are resistant to phishing attacks, such as FIDO2/WebAuthn, PIV cards, or other hardware-based authentication tokens that cannot be easily compromised through social engineering.",
    "Visitor": "Any individual who is not an employee, contractor, or authorized personnel but has physical access to areas where cardholder data is processed, stored, or transmitted."
  },
  categories: [
    {
      name: "Requirement 1: Install and Maintain Network Security Controls",
      description: "Processes and mechanisms for network security controls are defined and understood",
      results: [
        {
          id: "PCI DSS 1.1",
          control: "Processes and mechanisms for network security controls are defined and understood",
          status: "gap",
          details: "Network security control processes not defined",
          recommendation: "Document and implement comprehensive network security control processes and mechanisms"
        },
        {
          id: "PCI DSS 1.2",
          control: "Network security controls are configured and maintained",
          status: "gap",
          details: "Network security controls not properly configured",
          recommendation: "Implement and maintain proper configuration of network security controls including firewalls and routers"
        },
        {
          id: "PCI DSS 1.3",
          control: "Network access to and from the cardholder data environment is restricted",
          status: "gap",
          details: "Network access restrictions not implemented",
          recommendation: "Implement strict network access controls to limit access to cardholder data environment"
        },
        {
          id: "PCI DSS 1.4",
          control: "Network connections between trusted and untrusted networks are controlled",
          status: "gap",
          details: "Trusted/untrusted network controls not implemented",
          recommendation: "Implement controls to manage and monitor connections between trusted and untrusted networks"
        },
        {
          id: "PCI DSS 1.5",
          control: "Network security controls are installed and maintained between wireless and wired networks",
          status: "gap",
          details: "Wireless/wired network segmentation not implemented",
          recommendation: "Install and maintain network security controls to separate wireless and wired networks"
        },
        {
          id: "PCI DSS 1.6",
          control: "Network security controls are implemented to protect systems from unauthorized access",
          status: "gap",
          details: "Unauthorized access protection not implemented",
          recommendation: "Deploy network security controls to prevent unauthorized access to systems"
        }
      ]
    },
    {
      name: "Requirement 2: Apply Secure Configurations to All System Components",
      description: "Processes and mechanisms for secure configurations are defined and understood",
      results: [
        {
          id: "PCI DSS 2.1",
          control: "Processes and mechanisms for secure configurations are defined and understood",
          status: "gap",
          details: "Secure configuration processes not defined",
          recommendation: "Document and implement comprehensive secure configuration processes and mechanisms"
        },
        {
          id: "PCI DSS 2.2",
          control: "System components are configured securely",
          status: "gap",
          details: "System components not securely configured",
          recommendation: "Implement secure configuration baselines for all system components"
        },
        {
          id: "PCI DSS 2.3",
          control: "Wireless environments are configured securely",
          status: "gap",
          details: "Wireless security configuration not implemented",
          recommendation: "Configure wireless environments with strong security settings and encryption"
        },
        {
          id: "PCI DSS 2.4",
          control: "Configuration standards are applied to new systems before they are deployed",
          status: "gap",
          details: "Pre-deployment configuration standards not applied",
          recommendation: "Implement configuration standards that must be applied before system deployment"
        },
        {
          id: "PCI DSS 2.5",
          control: "Security features that are not needed are disabled",
          status: "gap",
          details: "Unnecessary security features not disabled",
          recommendation: "Disable or remove unnecessary security features and services"
        }
      ]
    },
    {
      name: "Requirement 3: Protect Stored Account Data",
      description: "Processes and mechanisms for protecting stored account data are defined and understood. Applies to all entities that store, process, or transmit account data, including issuers and companies supporting issuing services.",
      results: [
        {
          id: "PCI DSS 3.1",
          control: "Processes and mechanisms for protecting stored account data are defined and understood",
          status: "gap",
          details: "Account data protection processes not defined",
          recommendation: "Document and implement comprehensive processes for protecting stored account data. For issuers and companies supporting issuing services, ensure processes address specific requirements for cardholder data storage and processing."
        },
        {
          id: "PCI DSS 3.2",
          control: "Storage of account data is kept to a minimum",
          status: "gap",
          details: "Account data storage not minimized",
          recommendation: "Implement data retention policies to minimize storage of account data. Consider Customized Approach Objective for organizations with specific business needs for data retention."
        },
        {
          id: "PCI DSS 3.3",
          control: "Sensitive authentication data (SAD) is not stored after authorization",
          status: "gap",
          details: "Sensitive authentication data storage not controlled",
          recommendation: "Implement procedures to prevent storage of sensitive authentication data post-authorization. This applies to all entities regardless of their role in the payment ecosystem."
        },
        {
          id: "PCI DSS 3.4",
          control: "Access to stored account data is restricted",
          status: "gap",
          details: "Access to stored account data not restricted",
          recommendation: "Implement access controls to restrict access to stored account data. For organizations using keyed cryptographic hashes to render PAN unreadable, ensure proper key management and access controls are in place."
        },
        {
          id: "PCI DSS 3.5",
          control: "Primary account number (PAN) is masked when displayed",
          status: "gap",
          details: "PAN masking not implemented",
          recommendation: "Implement PAN masking in all displays and logs (first 6 and last 4 digits maximum). For organizations using keyed cryptographic hashes, ensure PAN is properly masked in all user interfaces and logs."
        },
        {
          id: "PCI DSS 3.6",
          control: "Cryptographic keys used for encryption of account data are secured",
          status: "gap",
          details: "Cryptographic key security not implemented",
          recommendation: "Implement secure key management for encryption keys used to protect account data. For organizations using keyed cryptographic hashes, ensure keys are properly secured and managed according to industry standards."
        },
        {
          id: "PCI DSS 3.7",
          control: "Cryptographic key management policies and procedures are implemented",
          status: "gap",
          details: "Key management policies not implemented",
          recommendation: "Develop and implement comprehensive cryptographic key management policies and procedures. Include specific guidance for keyed cryptographic hash implementations and key rotation procedures."
        }
      ]
    },
    {
      name: "Requirement 4: Protect Cardholder Data with Strong Cryptography During Transmission",
      description: "Processes and mechanisms for protecting transmissions are defined and understood",
      results: [
        {
          id: "PCI DSS 4.1",
          control: "Processes and mechanisms for protecting transmissions are defined and understood",
          status: "gap",
          details: "Transmission protection processes not defined",
          recommendation: "Document and implement comprehensive processes for protecting cardholder data transmissions"
        },
        {
          id: "PCI DSS 4.2",
          control: "Strong cryptography and security protocols protect cardholder data during transmission",
          status: "gap",
          details: "Strong cryptography not implemented for transmissions",
          recommendation: "Implement strong cryptographic protocols (TLS 1.2 or higher) for all cardholder data transmissions"
        },
        {
          id: "PCI DSS 4.3",
          control: "PAN is only sent via secure messaging technologies",
          status: "gap",
          details: "Secure messaging for PAN not implemented",
          recommendation: "Implement secure messaging technologies for any PAN transmission"
        }
      ]
    },
    {
      name: "Requirement 5: Protect All Systems and Networks from Malicious Software",
      description: "Processes and mechanisms for anti-malware protection are defined and understood",
      results: [
        {
          id: "PCI DSS 5.1",
          control: "Processes and mechanisms for anti-malware protection are defined and understood",
          status: "gap",
          details: "Anti-malware protection processes not defined",
          recommendation: "Document and implement comprehensive anti-malware protection processes"
        },
        {
          id: "PCI DSS 5.2",
          control: "Anti-malware mechanisms and processes are implemented",
          status: "gap",
          details: "Anti-malware mechanisms not implemented",
          recommendation: "Deploy anti-malware solutions on all systems commonly affected by malicious software"
        },
        {
          id: "PCI DSS 5.3",
          control: "Anti-malware mechanisms are actively running, updated, and generating logs",
          status: "gap",
          details: "Anti-malware maintenance not established",
          recommendation: "Ensure anti-malware mechanisms are running, updated, and generating audit logs"
        }
      ]
    },
    {
      name: "Requirement 6: Develop and Maintain Secure Systems and Software",
      description: "Processes and mechanisms for developing and maintaining secure systems are defined and understood. Includes specific requirements for payment page script management and critical vulnerability patching.",
      results: [
        {
          id: "PCI DSS 6.1",
          control: "Processes and mechanisms for developing and maintaining secure systems are defined and understood",
          status: "gap",
          details: "Secure development processes not defined",
          recommendation: "Document and implement comprehensive secure development and maintenance processes. Include specific procedures for managing payment page scripts and their security."
        },
        {
          id: "PCI DSS 6.2",
          control: "Security vulnerabilities are identified and addressed",
          status: "gap",
          details: "Vulnerability identification process not established",
          recommendation: "Implement formal process to identify and address security vulnerabilities. Install patches for critical vulnerabilities within 30 days of release. For non-critical vulnerabilities, implement risk-based patching schedule."
        },
        {
          id: "PCI DSS 6.3",
          control: "Custom software is securely developed",
          status: "gap",
          details: "Secure development practices not implemented",
          recommendation: "Implement secure development practices for custom software. Include secure coding practices, code reviews, and security testing throughout the development lifecycle."
        },
        {
          id: "PCI DSS 6.4",
          control: "Public-facing web applications are protected against attacks",
          status: "gap",
          details: "Web application protection not implemented",
          recommendation: "Implement protection mechanisms for public-facing web applications. For payment page scripts, ensure they are managed securely and protected against tampering. Implement Content Security Policy (CSP) and other web application security controls."
        },
        {
          id: "PCI DSS 6.5",
          control: "Changes to systems are managed securely",
          status: "gap",
          details: "Secure change management not implemented",
          recommendation: "Implement secure change management processes for system modifications. Include specific procedures for managing changes to payment page scripts and ensuring their integrity."
        }
      ]
    },
    {
      name: "Requirement 7: Restrict Access to System Components and Cardholder Data",
      description: "Processes and mechanisms for restricting access are defined and understood",
      results: [
        {
          id: "PCI DSS 7.1",
          control: "Processes and mechanisms for restricting access are defined and understood",
          status: "gap",
          details: "Access restriction processes not defined",
          recommendation: "Document and implement comprehensive access restriction processes"
        },
        {
          id: "PCI DSS 7.2",
          control: "Access to system components and data is based on least privilege and business need to know",
          status: "gap",
          details: "Least privilege access not implemented",
          recommendation: "Implement least privilege access controls based on business need to know"
        },
        {
          id: "PCI DSS 7.3",
          control: "Access is assigned and managed per role-based access control (RBAC)",
          status: "gap",
          details: "Role-based access control not implemented",
          recommendation: "Implement role-based access control system for managing user access"
        }
      ]
    },
    {
      name: "Requirement 8: Identify Users and Authenticate Access to System Components",
      description: "Processes and mechanisms for identifying users are defined and understood. Includes MFA requirements with exceptions for phishing-resistant authentication factors.",
      results: [
        {
          id: "PCI DSS 8.1",
          control: "Processes and mechanisms for identifying users are defined and understood",
          status: "gap",
          details: "User identification processes not defined",
          recommendation: "Document and implement comprehensive user identification processes. Include procedures for managing different types of authentication factors and their security requirements."
        },
        {
          id: "PCI DSS 8.2",
          control: "User identification and authentication are implemented",
          status: "gap",
          details: "User identification and authentication not implemented",
          recommendation: "Implement unique user identification and authentication mechanisms. Ensure all users have unique identifiers and appropriate authentication methods."
        },
        {
          id: "PCI DSS 8.3",
          control: "Strong authentication for access to the CDE is enforced",
          status: "gap",
          details: "Strong authentication not enforced for CDE access",
          recommendation: "Enforce strong authentication for all access to cardholder data environment. Consider implementing phishing-resistant authentication factors for enhanced security."
        },
        {
          id: "PCI DSS 8.4",
          control: "Multi-factor authentication (MFA) is implemented for all non-console administrative and remote access",
          status: "gap",
          details: "Multi-factor authentication not implemented",
          recommendation: "Implement multi-factor authentication for all non-console administrative and remote access. Note: MFA is not required for user accounts authenticated solely with phishing-resistant authentication factors (e.g., FIDO2/WebAuthn, PIV cards)."
        },
        {
          id: "PCI DSS 8.5",
          control: "Passwords/passphrases meet strong complexity and security requirements",
          status: "gap",
          details: "Password complexity requirements not implemented",
          recommendation: "Implement strong password/passphrase complexity and security requirements. For organizations using phishing-resistant authentication, ensure password policies are still appropriate for fallback authentication methods."
        },
        {
          id: "PCI DSS 8.6",
          control: "Application and system accounts are managed securely",
          status: "gap",
          details: "Application and system account management not implemented",
          recommendation: "Implement secure management of application and system accounts. Include procedures for managing authentication credentials for automated systems and service accounts."
        }
      ]
    },
    {
      name: "Requirement 9: Restrict Physical Access to Cardholder Data",
      description: "Processes and mechanisms for restricting physical access are defined and understood",
      results: [
        {
          id: "PCI DSS 9.1",
          control: "Processes and mechanisms for restricting physical access are defined and understood",
          status: "gap",
          details: "Physical access restriction processes not defined",
          recommendation: "Document and implement comprehensive physical access restriction processes"
        },
        {
          id: "PCI DSS 9.2",
          control: "Physical security controls are implemented",
          status: "gap",
          details: "Physical security controls not implemented",
          recommendation: "Implement physical security controls including access cards, biometrics, and visitor management"
        },
        {
          id: "PCI DSS 9.3",
          control: "Access to sensitive areas is restricted and monitored",
          status: "gap",
          details: "Sensitive area access controls not implemented",
          recommendation: "Implement restricted access and monitoring for sensitive areas"
        },
        {
          id: "PCI DSS 9.4",
          control: "Physical access for personnel and visitors is controlled",
          status: "gap",
          details: "Personnel and visitor access controls not implemented",
          recommendation: "Implement controlled physical access for personnel and visitors"
        },
        {
          id: "PCI DSS 9.5",
          control: "Media with cardholder data is protected",
          status: "gap",
          details: "Media protection not implemented",
          recommendation: "Implement protection mechanisms for media containing cardholder data"
        },
        {
          id: "PCI DSS 9.6",
          control: "Media is securely destroyed when no longer needed",
          status: "gap",
          details: "Secure media destruction not implemented",
          recommendation: "Implement secure destruction procedures for media no longer needed"
        }
      ]
    },
    {
      name: "Requirement 10: Log and Monitor All Access to System Components and Cardholder Data",
      description: "Processes and mechanisms for logging and monitoring are defined and understood",
      results: [
        {
          id: "PCI DSS 10.1",
          control: "Processes and mechanisms for logging and monitoring are defined and understood",
          status: "gap",
          details: "Logging and monitoring processes not defined",
          recommendation: "Document and implement comprehensive logging and monitoring processes"
        },
        {
          id: "PCI DSS 10.2",
          control: "Audit logs capture required details for system events",
          status: "gap",
          details: "Audit logging not implemented",
          recommendation: "Implement comprehensive audit logging for all system events"
        },
        {
          id: "PCI DSS 10.3",
          control: "Audit logs are protected from unauthorized modification",
          status: "gap",
          details: "Audit log protection not implemented",
          recommendation: "Implement protection mechanisms to prevent unauthorized modification of audit logs"
        },
        {
          id: "PCI DSS 10.4",
          control: "Logs are reviewed, and anomalies are addressed",
          status: "gap",
          details: "Log review process not implemented",
          recommendation: "Implement regular log review process and anomaly detection"
        },
        {
          id: "PCI DSS 10.5",
          control: "Time synchronization mechanisms are in place",
          status: "gap",
          details: "Time synchronization not implemented",
          recommendation: "Implement time synchronization mechanisms across all systems"
        }
      ]
    },
    {
      name: "Requirement 11: Test Security of Systems and Networks Regularly",
      description: "Processes and mechanisms for testing security are defined and understood",
      results: [
        {
          id: "PCI DSS 11.1",
          control: "Processes and mechanisms for testing security are defined and understood",
          status: "gap",
          details: "Security testing processes not defined",
          recommendation: "Document and implement comprehensive security testing processes"
        },
        {
          id: "PCI DSS 11.2",
          control: "Vulnerability scans are performed regularly",
          status: "gap",
          details: "Regular vulnerability scanning not implemented",
          recommendation: "Implement regular vulnerability scanning program with qualified personnel"
        },
        {
          id: "PCI DSS 11.3",
          control: "Internal and external penetration testing is conducted",
          status: "gap",
          details: "Penetration testing not implemented",
          recommendation: "Conduct regular internal and external penetration testing"
        },
        {
          id: "PCI DSS 11.4",
          control: "Intrusion-detection and intrusion-prevention techniques are used",
          status: "gap",
          details: "Intrusion detection/prevention not implemented",
          recommendation: "Implement intrusion detection and prevention systems"
        },
        {
          id: "PCI DSS 11.5",
          control: "Change- and tamper-detection mechanisms are deployed",
          status: "gap",
          details: "Change and tamper detection not implemented",
          recommendation: "Deploy change and tamper detection mechanisms"
        }
      ]
    },
    {
      name: "Requirement 12: Support Information Security with Organizational Policies and Programs",
      description: "Processes and mechanisms for supporting information security are defined and understood. Includes specific guidance for third-party service provider (TPSP) relationships and visitor management.",
      results: [
        {
          id: "PCI DSS 12.1",
          control: "Processes and mechanisms for supporting information security are defined and understood",
          status: "gap",
          details: "Information security support processes not defined",
          recommendation: "Document and implement comprehensive information security support processes. Include specific procedures for managing relationships with third-party service providers and visitor access controls."
        },
        {
          id: "PCI DSS 12.2",
          control: "Risk assessments are performed at least annually",
          status: "gap",
          details: "Annual risk assessments not implemented",
          recommendation: "Implement annual risk assessment process. Include assessment of risks associated with third-party service providers and their access to cardholder data."
        },
        {
          id: "PCI DSS 12.3",
          control: "Information security policies and procedures are documented, in use, and known to all parties",
          status: "gap",
          details: "Information security policies not documented or communicated",
          recommendation: "Document, implement, and communicate information security policies and procedures. Ensure policies address third-party service provider requirements and visitor management procedures."
        },
        {
          id: "PCI DSS 12.4",
          control: "Security responsibilities are assigned and communicated",
          status: "gap",
          details: "Security responsibilities not assigned",
          recommendation: "Assign and communicate information security responsibilities. Include specific responsibilities for managing third-party service provider relationships and visitor access controls."
        },
        {
          id: "PCI DSS 12.5",
          control: "Personnel are trained on security awareness",
          status: "gap",
          details: "Security awareness training not implemented",
          recommendation: "Implement comprehensive security awareness training program. Include training on third-party service provider security requirements and visitor management procedures."
        },
        {
          id: "PCI DSS 12.6",
          control: "Service providers with which account data is shared are managed",
          status: "gap",
          details: "Service provider management not implemented",
          recommendation: "Implement service provider management program. Clarify relationships between customers and third-party service providers (TPSPs). Ensure proper agreements and security requirements are in place for all service providers with access to cardholder data."
        },
        {
          id: "PCI DSS 12.7",
          control: "Incident response procedures are established, tested, and maintained",
          status: "gap",
          details: "Incident response procedures not established",
          recommendation: "Establish, test, and maintain incident response procedures. Include procedures for handling incidents involving third-party service providers and visitor-related security incidents."
        },
        {
          id: "PCI DSS 12.8",
          control: "A continuous compliance program is maintained",
          status: "gap",
          details: "Continuous compliance program not implemented",
          recommendation: "Implement and maintain continuous compliance program. Include regular monitoring and assessment of third-party service provider compliance and visitor access management effectiveness."
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
        },
        {
          id: "A.5.6",
          control: "Contact with special interest groups",
          status: "gap",
          details: "Special interest group contact procedures not established",
          recommendation: "Establish procedures for contacting special interest groups and industry associations"
        },
        {
          id: "A.5.7",
          control: "Threat intelligence",
          status: "gap",
          details: "Threat intelligence program not implemented",
          recommendation: "Implement threat intelligence program to identify and assess security threats"
        },
        {
          id: "A.5.8",
          control: "Information security in project management",
          status: "gap",
          details: "Project management security controls not implemented",
          recommendation: "Integrate information security requirements into project management processes"
        },
        {
          id: "A.5.9",
          control: "Inventory of information and other associated assets",
          status: "gap",
          details: "Asset inventory not maintained",
          recommendation: "Maintain comprehensive inventory of information assets and associated resources"
        },
        {
          id: "A.5.10",
          control: "Acceptable use of information and other associated assets",
          status: "gap",
          details: "Acceptable use policies not established",
          recommendation: "Develop and communicate acceptable use policies for information assets"
        },
        {
          id: "A.5.11",
          control: "Return of assets",
          status: "gap",
          details: "Asset return procedures not established",
          recommendation: "Establish procedures for returning information assets upon termination"
        },
        {
          id: "A.5.12",
          control: "Classification of information",
          status: "gap",
          details: "Information classification scheme not implemented",
          recommendation: "Implement information classification scheme based on business requirements"
        },
        {
          id: "A.5.13",
          control: "Labelling of information",
          status: "gap",
          details: "Information labeling procedures not established",
          recommendation: "Establish procedures for labeling information according to classification scheme"
        },
        {
          id: "A.5.14",
          control: "Information transfer",
          status: "gap",
          details: "Information transfer controls not implemented",
          recommendation: "Implement controls for secure information transfer between parties"
        },
        {
          id: "A.5.15",
          control: "Access control",
          status: "gap",
          details: "Access control policies not established",
          recommendation: "Develop and implement comprehensive access control policies and procedures"
        },
        {
          id: "A.5.16",
          control: "Identity management",
          status: "gap",
          details: "Identity management system not implemented",
          recommendation: "Implement identity management system for user lifecycle management"
        },
        {
          id: "A.5.17",
          control: "Authentication information",
          status: "gap",
          details: "Authentication information management not implemented",
          recommendation: "Implement secure management of authentication information"
        },
        {
          id: "A.5.18",
          control: "Access rights",
          status: "gap",
          details: "Access rights management not implemented",
          recommendation: "Implement access rights management with regular review and revocation"
        },
        {
          id: "A.5.19",
          control: "Information security in supplier relationships",
          status: "gap",
          details: "Supplier security requirements not established",
          recommendation: "Establish security requirements for supplier relationships"
        },
        {
          id: "A.5.20",
          control: "Addressing information security within supplier agreements",
          status: "gap",
          details: "Supplier security agreements not established",
          recommendation: "Include information security requirements in supplier agreements"
        },
        {
          id: "A.5.21",
          control: "Managing information security in the ICT supply chain",
          status: "gap",
          details: "ICT supply chain security not managed",
          recommendation: "Implement security controls for ICT supply chain management"
        },
        {
          id: "A.5.22",
          control: "Monitoring, review and change management of supplier services",
          status: "gap",
          details: "Supplier service monitoring not implemented",
          recommendation: "Implement monitoring and review of supplier services"
        },
        {
          id: "A.5.23",
          control: "Information security for use of cloud services",
          status: "gap",
          details: "Cloud service security controls not implemented",
          recommendation: "Implement security controls for cloud service usage"
        },
        {
          id: "A.5.24",
          control: "Information security incident management planning and preparation",
          status: "gap",
          details: "Incident management planning not established",
          recommendation: "Develop incident management planning and preparation procedures"
        },
        {
          id: "A.5.25",
          control: "Assessment and decision on information security events",
          status: "gap",
          details: "Security event assessment procedures not established",
          recommendation: "Establish procedures for assessing and deciding on security events"
        },
        {
          id: "A.5.26",
          control: "Response to information security incidents",
          status: "gap",
          details: "Incident response procedures not established",
          recommendation: "Develop comprehensive incident response procedures"
        },
        {
          id: "A.5.27",
          control: "Learning from information security incidents",
          status: "gap",
          details: "Incident learning process not implemented",
          recommendation: "Implement process for learning from security incidents"
        },
        {
          id: "A.5.28",
          control: "Collection of evidence",
          status: "gap",
          details: "Evidence collection procedures not established",
          recommendation: "Establish procedures for collecting and preserving evidence"
        },
        {
          id: "A.5.29",
          control: "Information security during disruption",
          status: "gap",
          details: "Disruption security measures not implemented",
          recommendation: "Implement security measures during business disruption"
        },
        {
          id: "A.5.30",
          control: "ICT readiness for business continuity",
          status: "gap",
          details: "ICT continuity planning not implemented",
          recommendation: "Implement ICT readiness for business continuity"
        },
        {
          id: "A.5.31",
          control: "Legal, statutory, regulatory and contractual requirements",
          status: "gap",
          details: "Legal compliance requirements not identified",
          recommendation: "Identify and comply with legal and regulatory requirements"
        },
        {
          id: "A.5.32",
          control: "Intellectual property rights",
          status: "gap",
          details: "Intellectual property protection not implemented",
          recommendation: "Implement protection for intellectual property rights"
        },
        {
          id: "A.5.33",
          control: "Protection of records",
          status: "gap",
          details: "Record protection procedures not established",
          recommendation: "Establish procedures for protecting organizational records"
        },
        {
          id: "A.5.34",
          control: "Privacy and protection of personally identifiable information",
          status: "gap",
          details: "PII protection measures not implemented",
          recommendation: "Implement privacy and PII protection measures"
        },
        {
          id: "A.5.35",
          control: "Independent review of information security",
          status: "gap",
          details: "Independent security review not conducted",
          recommendation: "Conduct independent review of information security implementation"
        },
        {
          id: "A.5.36",
          control: "Compliance with policies and standards for information security",
          status: "gap",
          details: "Compliance monitoring not implemented",
          recommendation: "Implement compliance monitoring for security policies and standards"
        },
        {
          id: "A.5.37",
          control: "Documented operating procedures",
          status: "gap",
          details: "Operating procedures not documented",
          recommendation: "Document all operating procedures for information security"
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
        },
        {
          id: "A.6.6",
          control: "Confidentiality or non-disclosure agreements",
          status: "gap",
          details: "Confidentiality agreements not established",
          recommendation: "Implement confidentiality and non-disclosure agreements for all personnel"
        },
        {
          id: "A.6.7",
          control: "Remote working",
          status: "gap",
          details: "Remote working security controls not implemented",
          recommendation: "Implement security controls for remote working arrangements"
        },
        {
          id: "A.6.8",
          control: "Information security event reporting",
          status: "gap",
          details: "Security event reporting procedures not established",
          recommendation: "Establish procedures for personnel to report security events"
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
        },
        {
          id: "A.7.5",
          control: "Protecting against physical and environmental threats",
          status: "gap",
          details: "Physical threat protection not implemented",
          recommendation: "Implement protection against physical and environmental threats"
        },
        {
          id: "A.7.6",
          control: "Working in secure areas",
          status: "gap",
          details: "Secure area working procedures not established",
          recommendation: "Establish procedures for working in secure areas"
        },
        {
          id: "A.7.7",
          control: "Clear desk and clear screen",
          status: "gap",
          details: "Clear desk and screen policies not implemented",
          recommendation: "Implement clear desk and clear screen policies"
        },
        {
          id: "A.7.8",
          control: "Equipment siting and protection",
          status: "gap",
          details: "Equipment protection measures not implemented",
          recommendation: "Implement equipment siting and protection measures"
        },
        {
          id: "A.7.9",
          control: "Security of assets off-premises",
          status: "gap",
          details: "Off-premises asset security not implemented",
          recommendation: "Implement security measures for assets used off-premises"
        },
        {
          id: "A.7.10",
          control: "Storage media",
          status: "gap",
          details: "Storage media security not implemented",
          recommendation: "Implement secure handling and storage of media"
        },
        {
          id: "A.7.11",
          control: "Supporting utilities",
          status: "gap",
          details: "Utility security measures not implemented",
          recommendation: "Implement security measures for supporting utilities"
        },
        {
          id: "A.7.12",
          control: "Cabling security",
          status: "gap",
          details: "Cabling security measures not implemented",
          recommendation: "Implement security measures for power and telecommunications cabling"
        },
        {
          id: "A.7.13",
          control: "Equipment maintenance",
          status: "gap",
          details: "Equipment maintenance security not implemented",
          recommendation: "Implement secure equipment maintenance procedures"
        },
        {
          id: "A.7.14",
          control: "Reuse or disposal of equipment",
          status: "gap",
          details: "Equipment disposal security not implemented",
          recommendation: "Implement secure procedures for equipment reuse and disposal"
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
        },
        {
          id: "A.8.6",
          control: "Capacity management",
          status: "gap",
          details: "Capacity management not implemented",
          recommendation: "Implement capacity management for information systems"
        },
        {
          id: "A.8.7",
          control: "Protection against malware",
          status: "gap",
          details: "Malware protection not implemented",
          recommendation: "Implement protection against malicious code and malware"
        },
        {
          id: "A.8.8",
          control: "Management of technical vulnerabilities",
          status: "gap",
          details: "Vulnerability management not implemented",
          recommendation: "Implement technical vulnerability management process"
        },
        {
          id: "A.8.9",
          control: "Configuration management",
          status: "gap",
          details: "Configuration management not implemented",
          recommendation: "Implement configuration management for information systems"
        },
        {
          id: "A.8.10",
          control: "Information deletion",
          status: "gap",
          details: "Information deletion procedures not implemented",
          recommendation: "Implement secure information deletion procedures"
        },
        {
          id: "A.8.11",
          control: "Data masking",
          status: "gap",
          details: "Data masking not implemented",
          recommendation: "Implement data masking to limit exposure of sensitive information"
        },
        {
          id: "A.8.12",
          control: "Data leakage prevention",
          status: "gap",
          details: "Data leakage prevention not implemented",
          recommendation: "Implement data leakage prevention controls"
        },
        {
          id: "A.8.13",
          control: "Monitoring activities",
          status: "gap",
          details: "Monitoring activities not implemented",
          recommendation: "Implement monitoring of information processing activities"
        },
        {
          id: "A.8.14",
          control: "Audit logging",
          status: "gap",
          details: "Audit logging not implemented",
          recommendation: "Implement audit logging for information systems"
        },
        {
          id: "A.8.15",
          control: "Clock synchronization",
          status: "gap",
          details: "Clock synchronization not implemented",
          recommendation: "Implement clock synchronization for information systems"
        },
        {
          id: "A.8.16",
          control: "Use of privileged utility programs",
          status: "gap",
          details: "Privileged utility program controls not implemented",
          recommendation: "Implement controls for use of privileged utility programs"
        },
        {
          id: "A.8.17",
          control: "Installation of software on operational systems",
          status: "gap",
          details: "Software installation controls not implemented",
          recommendation: "Implement controls for software installation on operational systems"
        },
        {
          id: "A.8.18",
          control: "Management of technical vulnerabilities in systems",
          status: "gap",
          details: "System vulnerability management not implemented",
          recommendation: "Implement technical vulnerability management for systems"
        },
        {
          id: "A.8.19",
          control: "Restrictions on software installation",
          status: "gap",
          details: "Software installation restrictions not implemented",
          recommendation: "Implement restrictions on software installation"
        },
        {
          id: "A.8.20",
          control: "Secure coding",
          status: "gap",
          details: "Secure coding practices not implemented",
          recommendation: "Implement secure coding practices and standards"
        },
        {
          id: "A.8.21",
          control: "Secure development environment",
          status: "gap",
          details: "Secure development environment not implemented",
          recommendation: "Implement secure development environment"
        },
        {
          id: "A.8.22",
          control: "System security testing",
          status: "gap",
          details: "System security testing not implemented",
          recommendation: "Implement system security testing procedures"
        },
        {
          id: "A.8.23",
          control: "Outsourced development",
          status: "gap",
          details: "Outsourced development security not implemented",
          recommendation: "Implement security controls for outsourced development"
        },
        {
          id: "A.8.24",
          control: "System change control procedures",
          status: "gap",
          details: "System change control not implemented",
          recommendation: "Implement system change control procedures"
        },
        {
          id: "A.8.25",
          control: "Modifications to systems in operational use",
          status: "gap",
          details: "System modification controls not implemented",
          recommendation: "Implement controls for modifications to operational systems"
        },
        {
          id: "A.8.26",
          control: "Secure development policy",
          status: "gap",
          details: "Secure development policy not established",
          recommendation: "Establish secure development policy and procedures"
        },
        {
          id: "A.8.27",
          control: "System security requirements",
          status: "gap",
          details: "System security requirements not defined",
          recommendation: "Define system security requirements"
        },
        {
          id: "A.8.28",
          control: "System acceptance testing",
          status: "gap",
          details: "System acceptance testing not implemented",
          recommendation: "Implement system acceptance testing procedures"
        },
        {
          id: "A.8.29",
          control: "Development and support processes",
          status: "gap",
          details: "Development and support processes not secured",
          recommendation: "Implement secure development and support processes"
        },
        {
          id: "A.8.30",
          control: "Test data",
          status: "gap",
          details: "Test data security not implemented",
          recommendation: "Implement secure handling of test data"
        },
        {
          id: "A.8.31",
          control: "Separation of development, test and operational environments",
          status: "gap",
          details: "Environment separation not implemented",
          recommendation: "Implement separation of development, test and operational environments"
        },
        {
          id: "A.8.32",
          control: "Change management",
          status: "gap",
          details: "Change management not implemented",
          recommendation: "Implement change management procedures"
        },
        {
          id: "A.8.33",
          control: "Test information",
          status: "gap",
          details: "Test information security not implemented",
          recommendation: "Implement secure handling of test information"
        },
        {
          id: "A.8.34",
          control: "Protection of information systems during audit testing",
          status: "gap",
          details: "Audit testing protection not implemented",
          recommendation: "Implement protection of information systems during audit testing"
        }
      ]
    },
    {
      name: "Access Control",
      description: "Controls that address access management and authentication",
      results: [
        {
          id: "A.9.1",
          control: "Business requirement for access control",
          status: "gap",
          details: "Access control business requirements not defined",
          recommendation: "Define business requirements for access control"
        },
        {
          id: "A.9.2",
          control: "User access management",
          status: "gap",
          details: "User access management not implemented",
          recommendation: "Implement user access management procedures"
        },
        {
          id: "A.9.3",
          control: "User registration and de-registration",
          status: "gap",
          details: "User registration procedures not implemented",
          recommendation: "Implement user registration and de-registration procedures"
        },
        {
          id: "A.9.4",
          control: "User access provisioning",
          status: "gap",
          details: "User access provisioning not implemented",
          recommendation: "Implement user access provisioning procedures"
        },
        {
          id: "A.9.5",
          control: "Management of privileged access rights",
          status: "gap",
          details: "Privileged access management not implemented",
          recommendation: "Implement management of privileged access rights"
        },
        {
          id: "A.9.6",
          control: "Management of secret authentication information of users",
          status: "gap",
          details: "Secret authentication information management not implemented",
          recommendation: "Implement management of secret authentication information"
        },
        {
          id: "A.9.7",
          control: "Review of user access rights",
          status: "gap",
          details: "User access rights review not implemented",
          recommendation: "Implement regular review of user access rights"
        },
        {
          id: "A.9.8",
          control: "Removal or adjustment of access rights",
          status: "gap",
          details: "Access rights removal procedures not implemented",
          recommendation: "Implement procedures for removal or adjustment of access rights"
        },
        {
          id: "A.9.9",
          control: "Use of privileged utility programs",
          status: "gap",
          details: "Privileged utility program controls not implemented",
          recommendation: "Implement controls for use of privileged utility programs"
        },
        {
          id: "A.9.10",
          control: "Access control to program source code",
          status: "gap",
          details: "Source code access controls not implemented",
          recommendation: "Implement access control to program source code"
        },
        {
          id: "A.9.11",
          control: "Secure log-on procedures",
          status: "gap",
          details: "Secure log-on procedures not implemented",
          recommendation: "Implement secure log-on procedures"
        },
        {
          id: "A.9.12",
          control: "Password management system",
          status: "gap",
          details: "Password management system not implemented",
          recommendation: "Implement password management system"
        },
        {
          id: "A.9.13",
          control: "Use of privileged utility programs",
          status: "gap",
          details: "Privileged utility program controls not implemented",
          recommendation: "Implement controls for use of privileged utility programs"
        },
        {
          id: "A.9.14",
          control: "Information access restriction",
          status: "gap",
          details: "Information access restrictions not implemented",
          recommendation: "Implement information access restrictions"
        }
      ]
    },
    {
      name: "Cryptography",
      description: "Controls that address cryptographic protection of information",
      results: [
        {
          id: "A.10.1",
          control: "Policy on the use of cryptographic controls",
          status: "gap",
          details: "Cryptographic policy not established",
          recommendation: "Establish policy on the use of cryptographic controls"
        },
        {
          id: "A.10.2",
          control: "Key management",
          status: "gap",
          details: "Key management not implemented",
          recommendation: "Implement key management procedures"
        }
      ]
    },
    {
      name: "Operations Security",
      description: "Controls that address secure operations and system management",
      results: [
        {
          id: "A.11.1",
          control: "Documented operating procedures",
          status: "gap",
          details: "Operating procedures not documented",
          recommendation: "Document all operating procedures"
        },
        {
          id: "A.11.2",
          control: "Change management",
          status: "gap",
          details: "Change management not implemented",
          recommendation: "Implement change management procedures"
        },
        {
          id: "A.11.3",
          control: "Capacity management",
          status: "gap",
          details: "Capacity management not implemented",
          recommendation: "Implement capacity management"
        },
        {
          id: "A.11.4",
          control: "Separation of development, test and operational environments",
          status: "gap",
          details: "Environment separation not implemented",
          recommendation: "Implement separation of environments"
        },
        {
          id: "A.11.5",
          control: "Controls against malicious code",
          status: "gap",
          details: "Malicious code controls not implemented",
          recommendation: "Implement controls against malicious code"
        },
        {
          id: "A.11.6",
          control: "Backup",
          status: "gap",
          details: "Backup procedures not implemented",
          recommendation: "Implement backup procedures"
        },
        {
          id: "A.11.7",
          control: "Event logging",
          status: "gap",
          details: "Event logging not implemented",
          recommendation: "Implement event logging"
        },
        {
          id: "A.11.8",
          control: "Monitoring system use",
          status: "gap",
          details: "System use monitoring not implemented",
          recommendation: "Implement monitoring of system use"
        },
        {
          id: "A.11.9",
          control: "Protection of log information",
          status: "gap",
          details: "Log information protection not implemented",
          recommendation: "Implement protection of log information"
        },
        {
          id: "A.11.10",
          control: "Administrator and operator logs",
          status: "gap",
          details: "Administrator logs not implemented",
          recommendation: "Implement administrator and operator logs"
        },
        {
          id: "A.11.11",
          control: "Clock synchronization",
          status: "gap",
          details: "Clock synchronization not implemented",
          recommendation: "Implement clock synchronization"
        },
        {
          id: "A.11.12",
          control: "Installation of software on operational systems",
          status: "gap",
          details: "Software installation controls not implemented",
          recommendation: "Implement controls for software installation"
        },
        {
          id: "A.11.13",
          control: "Management of technical vulnerabilities",
          status: "gap",
          details: "Vulnerability management not implemented",
          recommendation: "Implement technical vulnerability management"
        },
        {
          id: "A.11.14",
          control: "Information systems audit considerations",
          status: "gap",
          details: "Audit considerations not implemented",
          recommendation: "Implement information systems audit considerations"
        },
        {
          id: "A.11.15",
          control: "Controls against malicious code",
          status: "gap",
          details: "Malicious code controls not implemented",
          recommendation: "Implement controls against malicious code"
        }
      ]
    },
    {
      name: "Communications Security",
      description: "Controls that address secure communications and network security",
      results: [
        {
          id: "A.12.1",
          control: "Network security management",
          status: "gap",
          details: "Network security management not implemented",
          recommendation: "Implement network security management"
        },
        {
          id: "A.12.2",
          control: "Network segregation",
          status: "gap",
          details: "Network segregation not implemented",
          recommendation: "Implement network segregation"
        },
        {
          id: "A.12.3",
          control: "Use of cryptographic techniques",
          status: "gap",
          details: "Cryptographic techniques not implemented",
          recommendation: "Implement use of cryptographic techniques"
        },
        {
          id: "A.12.4",
          control: "Secure communications",
          status: "gap",
          details: "Secure communications not implemented",
          recommendation: "Implement secure communications"
        },
        {
          id: "A.12.5",
          control: "Electronic messaging",
          status: "gap",
          details: "Electronic messaging security not implemented",
          recommendation: "Implement electronic messaging security"
        },
        {
          id: "A.12.6",
          control: "Confidentiality or non-disclosure agreements",
          status: "gap",
          details: "Confidentiality agreements not established",
          recommendation: "Establish confidentiality agreements"
        },
        {
          id: "A.12.7",
          control: "Publicly available information",
          status: "gap",
          details: "Public information controls not implemented",
          recommendation: "Implement controls for publicly available information"
        }
      ]
    },
    {
      name: "System Acquisition and Development",
      description: "Controls that address secure system development and acquisition",
      results: [
        {
          id: "A.13.1",
          control: "Information security requirements analysis and specification",
          status: "gap",
          details: "Security requirements analysis not implemented",
          recommendation: "Implement information security requirements analysis"
        },
        {
          id: "A.13.2",
          control: "Securing application services on public networks",
          status: "gap",
          details: "Public network security not implemented",
          recommendation: "Implement security for application services on public networks"
        },
        {
          id: "A.13.3",
          control: "Protecting application services transactions",
          status: "gap",
          details: "Transaction protection not implemented",
          recommendation: "Implement protection for application services transactions"
        },
        {
          id: "A.13.4",
          control: "Segregation in networks",
          status: "gap",
          details: "Network segregation not implemented",
          recommendation: "Implement network segregation"
        },
        {
          id: "A.13.5",
          control: "Secure development policy",
          status: "gap",
          details: "Secure development policy not established",
          recommendation: "Establish secure development policy"
        },
        {
          id: "A.13.6",
          control: "System change control procedures",
          status: "gap",
          details: "System change control not implemented",
          recommendation: "Implement system change control procedures"
        },
        {
          id: "A.13.7",
          control: "Technical review of applications after operating system changes",
          status: "gap",
          details: "Technical review not implemented",
          recommendation: "Implement technical review of applications"
        },
        {
          id: "A.13.8",
          control: "Restrictions on changes to software packages",
          status: "gap",
          details: "Software change restrictions not implemented",
          recommendation: "Implement restrictions on software package changes"
        },
        {
          id: "A.13.9",
          control: "Secure system engineering principles",
          status: "gap",
          details: "Secure engineering principles not implemented",
          recommendation: "Implement secure system engineering principles"
        },
        {
          id: "A.13.10",
          control: "Secure development environment",
          status: "gap",
          details: "Secure development environment not implemented",
          recommendation: "Implement secure development environment"
        },
        {
          id: "A.13.11",
          control: "Outsourced development",
          status: "gap",
          details: "Outsourced development security not implemented",
          recommendation: "Implement security for outsourced development"
        },
        {
          id: "A.13.12",
          control: "System security testing",
          status: "gap",
          details: "System security testing not implemented",
          recommendation: "Implement system security testing"
        },
        {
          id: "A.13.13",
          control: "System acceptance testing",
          status: "gap",
          details: "System acceptance testing not implemented",
          recommendation: "Implement system acceptance testing"
        },
        {
          id: "A.13.14",
          control: "Protection of test data",
          status: "gap",
          details: "Test data protection not implemented",
          recommendation: "Implement protection of test data"
        },
        {
          id: "A.13.15",
          control: "Development and support processes",
          status: "gap",
          details: "Development and support processes not secured",
          recommendation: "Implement secure development and support processes"
        },
        {
          id: "A.13.16",
          control: "Information leakage",
          status: "gap",
          details: "Information leakage prevention not implemented",
          recommendation: "Implement information leakage prevention"
        },
        {
          id: "A.13.17",
          control: "Modifications to systems in operational use",
          status: "gap",
          details: "System modification controls not implemented",
          recommendation: "Implement controls for system modifications"
        },
        {
          id: "A.13.18",
          control: "Secure coding",
          status: "gap",
          details: "Secure coding practices not implemented",
          recommendation: "Implement secure coding practices"
        },
        {
          id: "A.13.19",
          control: "System security requirements",
          status: "gap",
          details: "System security requirements not defined",
          recommendation: "Define system security requirements"
        },
        {
          id: "A.13.20",
          control: "System acceptance testing",
          status: "gap",
          details: "System acceptance testing not implemented",
          recommendation: "Implement system acceptance testing"
        },
        {
          id: "A.13.21",
          control: "Development and support processes",
          status: "gap",
          details: "Development and support processes not secured",
          recommendation: "Implement secure development and support processes"
        },
        {
          id: "A.13.22",
          control: "Test data",
          status: "gap",
          details: "Test data security not implemented",
          recommendation: "Implement secure handling of test data"
        },
        {
          id: "A.13.23",
          control: "Separation of development, test and operational environments",
          status: "gap",
          details: "Environment separation not implemented",
          recommendation: "Implement separation of environments"
        },
        {
          id: "A.13.24",
          control: "Change management",
          status: "gap",
          details: "Change management not implemented",
          recommendation: "Implement change management procedures"
        },
        {
          id: "A.13.25",
          control: "Test information",
          status: "gap",
          details: "Test information security not implemented",
          recommendation: "Implement secure handling of test information"
        },
        {
          id: "A.13.26",
          control: "Protection of information systems during audit testing",
          status: "gap",
          details: "Audit testing protection not implemented",
          recommendation: "Implement protection during audit testing"
        },
        {
          id: "A.13.27",
          control: "System security testing",
          status: "gap",
          details: "System security testing not implemented",
          recommendation: "Implement system security testing"
        },
        {
          id: "A.13.28",
          control: "System acceptance testing",
          status: "gap",
          details: "System acceptance testing not implemented",
          recommendation: "Implement system acceptance testing"
        },
        {
          id: "A.13.29",
          control: "Development and support processes",
          status: "gap",
          details: "Development and support processes not secured",
          recommendation: "Implement secure development and support processes"
        },
        {
          id: "A.13.30",
          control: "Test data",
          status: "gap",
          details: "Test data security not implemented",
          recommendation: "Implement secure handling of test data"
        },
        {
          id: "A.13.31",
          control: "Separation of development, test and operational environments",
          status: "gap",
          details: "Environment separation not implemented",
          recommendation: "Implement separation of environments"
        },
        {
          id: "A.13.32",
          control: "Change management",
          status: "gap",
          details: "Change management not implemented",
          recommendation: "Implement change management procedures"
        },
        {
          id: "A.13.33",
          control: "Test information",
          status: "gap",
          details: "Test information security not implemented",
          recommendation: "Implement secure handling of test information"
        },
        {
          id: "A.13.34",
          control: "Protection of information systems during audit testing",
          status: "gap",
          details: "Audit testing protection not implemented",
          recommendation: "Implement protection during audit testing"
        }
      ]
    },
    {
      name: "Supplier Relationships",
      description: "Controls that address managing supplier security",
      results: [
        {
          id: "A.14.1",
          control: "Information security policy for supplier relationships",
          status: "gap",
          details: "Supplier security policy not established",
          recommendation: "Establish information security policy for supplier relationships"
        },
        {
          id: "A.14.2",
          control: "Addressing security within supplier agreements",
          status: "gap",
          details: "Supplier security agreements not established",
          recommendation: "Include security requirements in supplier agreements"
        },
        {
          id: "A.14.3",
          control: "Information and communication technology supply chain",
          status: "gap",
          details: "ICT supply chain security not managed",
          recommendation: "Implement ICT supply chain security management"
        },
        {
          id: "A.14.4",
          control: "Monitoring and review of supplier services",
          status: "gap",
          details: "Supplier service monitoring not implemented",
          recommendation: "Implement monitoring and review of supplier services"
        },
        {
          id: "A.14.5",
          control: "Managing changes to supplier services",
          status: "gap",
          details: "Supplier service change management not implemented",
          recommendation: "Implement management of changes to supplier services"
        }
      ]
    },
    {
      name: "Information Security Incident Management",
      description: "Controls that address incident management and response",
      results: [
        {
          id: "A.15.1",
          control: "Responsibilities and procedures",
          status: "gap",
          details: "Incident management responsibilities not defined",
          recommendation: "Define incident management responsibilities and procedures"
        },
        {
          id: "A.15.2",
          control: "Reporting information security events",
          status: "gap",
          details: "Security event reporting not implemented",
          recommendation: "Implement reporting of information security events"
        },
        {
          id: "A.15.3",
          control: "Reporting information security weaknesses",
          status: "gap",
          details: "Security weakness reporting not implemented",
          recommendation: "Implement reporting of information security weaknesses"
        },
        {
          id: "A.15.4",
          control: "Assessment of and decision on information security events",
          status: "gap",
          details: "Security event assessment not implemented",
          recommendation: "Implement assessment and decision on security events"
        },
        {
          id: "A.15.5",
          control: "Response to information security incidents",
          status: "gap",
          details: "Incident response not implemented",
          recommendation: "Implement response to information security incidents"
        },
        {
          id: "A.15.6",
          control: "Learning from information security incidents",
          status: "gap",
          details: "Incident learning not implemented",
          recommendation: "Implement learning from information security incidents"
        },
        {
          id: "A.15.7",
          control: "Collection of evidence",
          status: "gap",
          details: "Evidence collection not implemented",
          recommendation: "Implement collection of evidence"
        }
      ]
    },
    {
      name: "Information Security Aspects of Business Continuity",
      description: "Controls that address business continuity and disaster recovery",
      results: [
        {
          id: "A.16.1",
          control: "Planning information security continuity",
          status: "gap",
          details: "Security continuity planning not implemented",
          recommendation: "Implement planning for information security continuity"
        },
        {
          id: "A.16.2",
          control: "Redundancies",
          status: "gap",
          details: "Redundancy measures not implemented",
          recommendation: "Implement redundancy measures"
        },
        {
          id: "A.16.3",
          control: "Information processing facilities",
          status: "gap",
          details: "Information processing facility continuity not implemented",
          recommendation: "Implement information processing facility continuity"
        },
        {
          id: "A.16.4",
          control: "Readiness for information security continuity",
          status: "gap",
          details: "Security continuity readiness not implemented",
          recommendation: "Implement readiness for information security continuity"
        }
      ]
    },
    {
      name: "Compliance",
      description: "Controls that address legal and regulatory compliance",
      results: [
        {
          id: "A.17.1",
          control: "Identification of applicable legislation and contractual requirements",
          status: "gap",
          details: "Applicable legislation not identified",
          recommendation: "Identify applicable legislation and contractual requirements"
        },
        {
          id: "A.17.2",
          control: "Intellectual property rights",
          status: "gap",
          details: "Intellectual property protection not implemented",
          recommendation: "Implement intellectual property rights protection"
        },
        {
          id: "A.17.3",
          control: "Protection of records",
          status: "gap",
          details: "Record protection not implemented",
          recommendation: "Implement protection of records"
        },
        {
          id: "A.17.4",
          control: "Privacy and protection of personally identifiable information",
          status: "gap",
          details: "PII protection not implemented",
          recommendation: "Implement privacy and PII protection"
        },
        {
          id: "A.17.5",
          control: "Regulation of cryptographic controls",
          status: "gap",
          details: "Cryptographic control regulation not implemented",
          recommendation: "Implement regulation of cryptographic controls"
        },
        {
          id: "A.17.6",
          control: "Compliance with security policies and standards",
          status: "gap",
          details: "Security policy compliance not implemented",
          recommendation: "Implement compliance with security policies and standards"
        },
        {
          id: "A.17.7",
          control: "Technical compliance review",
          status: "gap",
          details: "Technical compliance review not implemented",
          recommendation: "Implement technical compliance review"
        },
        {
          id: "A.17.8",
          control: "Information systems audit considerations",
          status: "gap",
          details: "Audit considerations not implemented",
          recommendation: "Implement information systems audit considerations"
        }
      ]
    },
    {
      name: "Privacy and Protection of PII",
      description: "Controls that address privacy and personally identifiable information protection",
      results: [
        {
          id: "A.18.1",
          control: "Privacy and PII protection",
          status: "gap",
          details: "PII protection not implemented",
          recommendation: "Implement privacy and PII protection measures"
        },
        {
          id: "A.18.2",
          control: "PII processing",
          status: "gap",
          details: "PII processing controls not implemented",
          recommendation: "Implement PII processing controls"
        },
        {
          id: "A.18.3",
          control: "PII retention",
          status: "gap",
          details: "PII retention controls not implemented",
          recommendation: "Implement PII retention controls"
        },
        {
          id: "A.18.4",
          control: "PII disposal",
          status: "gap",
          details: "PII disposal controls not implemented",
          recommendation: "Implement PII disposal controls"
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

// NYDFS Part 500 Cybersecurity Regulation
export const nydfs500 = {
  name: "NYDFS Part 500",
  description: "New York State Department of Financial Services Cybersecurity Regulation",
  categories: [
    {
      name: "Definitions (500.1)",
      description: "Understand key definitions and terms used throughout Part 500",
      results: [
        {
          id: "500.1(a)",
          control: "Understand definition of 'Affiliate' and control relationships",
          status: "gap",
          details: "Affiliate definition not understood or documented",
          recommendation: "Document understanding of affiliate definition: any person that controls, is controlled by or is under common control with another person, including possession of power to direct management and policies."
        },
        {
          id: "500.1(b)",
          control: "Understand definition of 'Authorized user' and access requirements",
          status: "gap",
          details: "Authorized user definition not understood",
          recommendation: "Document understanding of authorized user definition: any employee, contractor, agent or other person that participates in business operations and is authorized to access information systems and data."
        },
        {
          id: "500.1(c)",
          control: "Understand definition of 'CISO' and qualification requirements",
          status: "gap",
          details: "CISO definition and qualifications not understood",
          recommendation: "Document understanding of CISO definition: qualified individual responsible for overseeing and implementing cybersecurity program and enforcing cybersecurity policy."
        },
        {
          id: "500.1(d)",
          control: "Understand definition of 'Class A company' and qualification criteria",
          status: "gap",
          details: "Class A company definition not understood",
          recommendation: "Document understanding of Class A company definition: covered entity with $20M+ gross annual revenue in each of last two fiscal years AND either 2,000+ employees averaged over last two fiscal years OR $1B+ gross annual revenue in each of last two fiscal years from all business operations and affiliates."
        },
        {
          id: "500.1(e)",
          control: "Understand definition of 'Covered entity' and scope of regulation",
          status: "gap",
          details: "Covered entity definition not understood",
          recommendation: "Document understanding of covered entity definition: any person operating under or required to operate under a license, registration, charter, certificate, permit, accreditation or similar authorization under Banking Law, Insurance Law or Financial Services Law."
        },
        {
          id: "500.1(f)",
          control: "Understand definition of 'Cybersecurity event' vs 'Cybersecurity incident'",
          status: "gap",
          details: "Cybersecurity event and incident definitions not understood",
          recommendation: "Document understanding of cybersecurity event (any act or attempt to gain unauthorized access) vs cybersecurity incident (event that impacts covered entity and requires government notification, has reasonable likelihood of material harm, or results in ransomware deployment)."
        },
        {
          id: "500.1(g)",
          control: "Understand definition of 'Nonpublic information' and protection requirements",
          status: "gap",
          details: "Nonpublic information definition not understood",
          recommendation: "Document understanding of nonpublic information definition: all electronic information that is not publicly available and includes business information, personal information with identifiers, and health information that could cause material adverse impact if compromised."
        },
        {
          id: "500.1(h)",
          control: "Understand definition of 'Multi-factor authentication' and implementation requirements",
          status: "gap",
          details: "MFA definition not understood",
          recommendation: "Document understanding of MFA definition: authentication through verification of at least two of knowledge factors (password), possession factors (token), or inherence factors (biometric characteristic)."
        }
      ]
    },
    {
      name: "Cybersecurity Program (500.02)",
      description: "Establish and maintain a cybersecurity program designed to protect the confidentiality, integrity, and availability of information systems",
      results: [
        {
          id: "500.02(a)",
          control: "Implement a cybersecurity program based on the Covered Entity's risk assessment",
          status: "gap",
          details: "Cybersecurity program not established or not based on risk assessment",
          recommendation: "Develop a comprehensive cybersecurity program that addresses identified risks and is regularly updated based on ongoing risk assessments. The program must be designed to protect the confidentiality, integrity, and availability of the Covered Entity's information systems."
        },
        {
          id: "500.02(b)",
          control: "Design the cybersecurity program to protect the confidentiality, integrity, and availability of the Covered Entity's information systems",
          status: "gap",
          details: "Program does not adequately address CIA triad requirements",
          recommendation: "Ensure cybersecurity program explicitly addresses confidentiality, integrity, and availability of information systems. The program must be designed to protect against unauthorized access, use, or other malicious acts that would result in material financial loss to the Covered Entity or material harm to any natural person."
        },
        {
          id: "500.02(c)",
          control: "Address cybersecurity risks identified in the risk assessment",
          status: "gap",
          details: "Program does not address identified cybersecurity risks",
          recommendation: "Map all identified risks to specific controls and mitigation strategies in the cybersecurity program. The program must address risks identified in the risk assessment and be updated as the risk assessment is updated."
        },
        {
          id: "500.02(d)",
          control: "Ensure the cybersecurity program is designed to perform the following core cybersecurity functions: Identify, Protect, Detect, Respond, and Recover",
          status: "gap",
          details: "Program does not implement core cybersecurity functions framework",
          recommendation: "Implement a cybersecurity program that performs the five core cybersecurity functions: Identify (assets, vulnerabilities, threats), Protect (implement safeguards), Detect (monitor and identify events), Respond (contain and mitigate incidents), and Recover (restore capabilities and services)."
        },
        {
          id: "500.02(e)",
          control: "For Class A companies: implement additional cybersecurity program requirements including enhanced monitoring and detection capabilities",
          status: "gap",
          details: "Class A company enhanced requirements not implemented",
          recommendation: "For Class A companies, implement enhanced cybersecurity program requirements including advanced threat detection, continuous monitoring, and comprehensive incident response capabilities as specified in the regulation."
        },
        {
          id: "500.02(f)",
          control: "Ensure the cybersecurity program addresses both internal and external threats",
          status: "gap",
          details: "Program does not comprehensively address internal and external threats",
          recommendation: "Develop cybersecurity program that addresses both internal threats (insider threats, employee errors) and external threats (nation-states, terrorist organizations, independent criminal actors) with appropriate controls and monitoring."
        },
        {
          id: "500.02(g)",
          control: "Implement cybersecurity program governance and oversight mechanisms",
          status: "gap",
          details: "Cybersecurity program governance not established",
          recommendation: "Establish clear governance structure for the cybersecurity program including roles, responsibilities, reporting lines, and oversight mechanisms to ensure effective program management and continuous improvement."
        }
      ]
    },
    {
      name: "Cybersecurity Policy (500.03)",
      description: "Implement written cybersecurity policy approved by senior management or board of directors",
      results: [
        {
          id: "500.03(a)",
          control: "Implement a written cybersecurity policy setting forth the Covered Entity's policies and procedures for the protection of its information systems and nonpublic information",
          status: "gap",
          details: "Written cybersecurity policy not implemented",
          recommendation: "Develop comprehensive written cybersecurity policy covering all required areas including information system protection, nonpublic information handling, access controls, incident response, and business continuity. Policy must be approved by senior management or board of directors."
        },
        {
          id: "500.03(b)",
          control: "Policy must be approved by a senior officer or the board of directors",
          status: "gap",
          details: "Policy not approved by appropriate authority",
          recommendation: "Ensure cybersecurity policy is formally approved by senior officer or board of directors and documented. The policy must be reviewed and updated at least annually to reflect changes in technology, business operations, or regulatory requirements."
        },
        {
          id: "500.03(c)",
          control: "Policy must be reviewed and updated at least annually",
          status: "gap",
          details: "Policy review process not established",
          recommendation: "Implement annual policy review process with documented updates and re-approval. The policy must address the covered entity's specific risk profile and be updated to reflect changes in technology, business operations, or regulatory requirements."
        },
        {
          id: "500.03(d)",
          control: "Policy must be based on the covered entity's risk assessment",
          status: "gap",
          details: "Policy not based on risk assessment",
          recommendation: "Ensure cybersecurity policy is based on the covered entity's risk assessment and addresses identified cybersecurity risks. The policy should be tailored to the organization's specific risk profile and business operations."
        },
        {
          id: "500.03(e)",
          control: "Policy must address the protection of nonpublic information",
          status: "gap",
          details: "Policy does not adequately address nonpublic information protection",
          recommendation: "Ensure cybersecurity policy specifically addresses the protection of nonpublic information including data classification, handling procedures, access controls, and disposal requirements."
        },
        {
          id: "500.03(f)",
          control: "Policy must be communicated to all personnel",
          status: "gap",
          details: "Policy communication process not established",
          recommendation: "Implement process to communicate cybersecurity policy to all personnel, including training on policy requirements and regular updates on policy changes."
        }
      ]
    },
    {
      name: "Chief Information Security Officer (500.04)",
      description: "Designate qualified individual to serve as CISO responsible for cybersecurity program",
      results: [
        {
          id: "500.04(a)",
          control: "Designate a qualified individual to serve as the Chief Information Security Officer",
          status: "gap",
          details: "CISO not designated or individual lacks required qualifications",
          recommendation: "Designate a qualified individual with appropriate cybersecurity expertise and experience to serve as CISO. The CISO must have sufficient knowledge and experience to oversee and implement the covered entity's cybersecurity program and enforce its cybersecurity policy."
        },
        {
          id: "500.04(b)",
          control: "CISO must report to the board of directors or senior officer at least annually",
          status: "gap",
          details: "CISO reporting structure not established",
          recommendation: "Establish reporting structure where CISO reports to board or senior officer at least annually. The CISO must have direct access to the board or senior officer and provide regular updates on cybersecurity program status and risks."
        },
        {
          id: "500.04(c)",
          control: "CISO must have sufficient authority and resources to implement and maintain the cybersecurity program",
          status: "gap",
          details: "CISO lacks sufficient authority or resources",
          recommendation: "Ensure CISO has adequate authority, budget, and resources to effectively implement cybersecurity program. The CISO must have the authority to make decisions regarding cybersecurity matters and access to necessary resources including personnel, technology, and budget."
        },
        {
          id: "500.04(d)",
          control: "CISO must report annually to the board on plans for remediating material inadequacies",
          status: "gap",
          details: "Annual reporting on remediation plans not established",
          recommendation: "Implement annual reporting process where CISO reports remediation plans for material inadequacies to board. The report must include specific plans for addressing identified gaps and improving the cybersecurity program."
        },
        {
          id: "500.04(e)",
          control: "CISO must be responsible for overseeing and implementing the cybersecurity program",
          status: "gap",
          details: "CISO oversight responsibilities not clearly defined",
          recommendation: "Clearly define CISO responsibilities for overseeing and implementing the cybersecurity program, including policy development, risk management, incident response, and program evaluation."
        },
        {
          id: "500.04(f)",
          control: "CISO must be responsible for enforcing the cybersecurity policy",
          status: "gap",
          details: "CISO policy enforcement responsibilities not established",
          recommendation: "Establish CISO responsibilities for enforcing the cybersecurity policy, including monitoring compliance, investigating violations, and taking corrective action when necessary."
        },
        {
          id: "500.04(g)",
          control: "CISO must have appropriate qualifications and experience",
          status: "gap",
          details: "CISO qualifications not verified or documented",
          recommendation: "Ensure CISO has appropriate qualifications and experience in cybersecurity, including relevant certifications, education, and professional experience. Document CISO qualifications and maintain records of ongoing professional development."
        }
      ]
    },
    {
      name: "Penetration Testing and Vulnerability Assessments (500.05)",
      description: "Conduct periodic penetration testing and vulnerability assessments",
      results: [
        {
          id: "500.05(a)",
          control: "Conduct annual penetration testing of the Covered Entity's information systems",
          status: "gap",
          details: "Annual penetration testing not conducted",
          recommendation: "Implement annual penetration testing program conducted by qualified personnel or third-party vendors. Testing must be performed by qualified personnel and include both external and internal penetration testing of all information systems."
        },
        {
          id: "500.05(b)",
          control: "Conduct bi-annual vulnerability assessments of the Covered Entity's information systems",
          status: "gap",
          details: "Bi-annual vulnerability assessments not conducted",
          recommendation: "Implement bi-annual vulnerability assessment program using automated tools and manual testing. Assessments must be conducted at least twice per year and include all information systems."
        },
        {
          id: "500.05(c)",
          control: "Conduct automated scans or manual reviews to discover, analyze, and report vulnerabilities",
          status: "gap",
          details: "Automated vulnerability scanning not implemented",
          recommendation: "Implement automated vulnerability scanning tools with regular scanning schedules and manual review processes. Use industry-standard vulnerability scanning tools and ensure comprehensive coverage of all systems."
        },
        {
          id: "500.05(d)",
          control: "Scan frequency must be determined based on risk assessment but must occur promptly after material system changes",
          status: "gap",
          details: "Scanning frequency not based on risk assessment or material changes",
          recommendation: "Establish risk-based scanning frequency and ensure immediate scanning after material system changes. Document scanning frequency decisions and maintain records of all scans performed."
        },
        {
          id: "500.05(e)",
          control: "Ensure penetration testing is performed by qualified personnel",
          status: "gap",
          details: "Penetration testing personnel qualifications not verified",
          recommendation: "Ensure penetration testing is performed by qualified personnel with appropriate certifications and experience. Document personnel qualifications and maintain records of testing credentials."
        },
        {
          id: "500.05(f)",
          control: "Document and remediate vulnerabilities identified during testing",
          status: "gap",
          details: "Vulnerability remediation process not established",
          recommendation: "Implement process to document all vulnerabilities identified during testing and establish remediation timeline based on risk level. Track remediation progress and verify fixes."
        },
        {
          id: "500.05(g)",
          control: "Include both external and internal penetration testing",
          status: "gap",
          details: "Testing scope does not include both external and internal testing",
          recommendation: "Ensure penetration testing includes both external testing (from outside the network) and internal testing (from inside the network) to identify vulnerabilities from different attack vectors."
        },
        {
          id: "500.05(h)",
          control: "Test all information systems including specialized systems",
          status: "gap",
          details: "Testing does not cover all information systems",
          recommendation: "Ensure testing covers all information systems including specialized systems such as industrial/process control systems, telephone switching systems, and environmental control systems as defined in the regulation."
        }
      ]
    },
    {
      name: "Audit Trail (500.06)",
      description: "Maintain audit trail of all user access and administrative actions",
      results: [
        {
          id: "500.06(a)",
          control: "Maintain audit trail of all user access and administrative actions on information systems",
          status: "gap",
          details: "Comprehensive audit trail not maintained",
          recommendation: "Implement comprehensive audit logging for all user access and administrative actions across information systems. The audit trail must include all user access to information systems, administrative actions, and system events."
        },
        {
          id: "500.06(b)",
          control: "Audit trail must be designed to detect and respond to cybersecurity events",
          status: "gap",
          details: "Audit trail not designed for cybersecurity event detection",
          recommendation: "Design audit trail system to enable detection and response to cybersecurity events with appropriate alerting. The system must be capable of identifying suspicious activities and potential security incidents."
        },
        {
          id: "500.06(c)",
          control: "Audit trail must be retained for at least six years",
          status: "gap",
          details: "Audit trail retention period not established",
          recommendation: "Implement audit trail retention for minimum six years with secure storage and retrieval capabilities. Ensure audit logs are protected from tampering and unauthorized access."
        },
        {
          id: "500.06(d)",
          control: "Audit trail must be maintained in a secure location",
          status: "gap",
          details: "Audit trail storage location not secure",
          recommendation: "Store audit trails in a secure location with appropriate access controls and backup procedures. Ensure audit logs are protected from unauthorized modification or deletion."
        },
        {
          id: "500.06(e)",
          control: "Audit trail must be accessible for examination by the superintendent",
          status: "gap",
          details: "Audit trail not accessible for regulatory examination",
          recommendation: "Ensure audit trails are accessible for examination by the superintendent upon request. Maintain proper documentation and retrieval procedures for regulatory compliance."
        },
        {
          id: "500.06(f)",
          control: "Audit trail must include sufficient detail to reconstruct activities",
          status: "gap",
          details: "Audit trail lacks sufficient detail for reconstruction",
          recommendation: "Ensure audit trails contain sufficient detail to reconstruct user activities, including timestamps, user identification, actions performed, and system responses. Include both successful and failed access attempts."
        },
        {
          id: "500.06(g)",
          control: "Audit trail must be monitored and reviewed regularly",
          status: "gap",
          details: "Audit trail monitoring and review process not established",
          recommendation: "Implement regular monitoring and review of audit trails to identify suspicious activities, policy violations, and potential security incidents. Establish procedures for responding to audit findings."
        },
        {
          id: "500.06(h)",
          control: "Audit trail must cover all information systems including specialized systems",
          status: "gap",
          details: "Audit trail does not cover all information systems",
          recommendation: "Ensure audit trails cover all information systems including specialized systems such as industrial/process control systems, telephone switching systems, and environmental control systems as defined in the regulation."
        }
      ]
    },
    {
      name: "Access Privileges (500.07)",
      description: "Limit user access privileges and periodically review access",
      results: [
        {
          id: "500.07(a)",
          control: "Limit user access privileges to information systems that contain nonpublic information to those necessary to perform the user's job functions",
          status: "gap",
          details: "Access privileges not limited to job functions",
          recommendation: "Implement least privilege access controls ensuring users only have access necessary for their job functions. Access must be based on business need and job responsibilities, with regular justification and approval processes."
        },
        {
          id: "500.07(b)",
          control: "Periodically review access privileges and remove or disable access that is no longer necessary",
          status: "gap",
          details: "Access review process not established",
          recommendation: "Implement periodic access review process with documented procedures for removing unnecessary access. Reviews must be conducted at least annually and include verification of business need for continued access."
        },
        {
          id: "500.07(c)",
          control: "Implement privileged access management for users with administrative access",
          status: "gap",
          details: "Privileged access management not implemented",
          recommendation: "Implement privileged access management solution for administrative accounts with additional controls and monitoring. Include multi-factor authentication, session recording, and regular access reviews for privileged accounts."
        },
        {
          id: "500.07(d)",
          control: "Implement role-based access control (RBAC) system",
          status: "gap",
          details: "RBAC system not implemented",
          recommendation: "Implement role-based access control system that assigns access based on job roles and responsibilities. Define clear roles with specific access permissions and regularly review role assignments."
        },
        {
          id: "500.07(e)",
          control: "Implement access provisioning and deprovisioning procedures",
          status: "gap",
          details: "Access provisioning procedures not established",
          recommendation: "Establish formal procedures for provisioning access when users join the organization and deprovisioning access when users leave or change roles. Include approval workflows and verification processes."
        },
        {
          id: "500.07(f)",
          control: "Implement segregation of duties controls",
          status: "gap",
          details: "Segregation of duties not implemented",
          recommendation: "Implement segregation of duties controls to prevent single users from having conflicting access rights. Ensure critical functions require multiple approvals and separate individuals for different phases of processes."
        },
        {
          id: "500.07(g)",
          control: "Implement access monitoring and logging",
          status: "gap",
          details: "Access monitoring not implemented",
          recommendation: "Implement comprehensive access monitoring and logging for all user access to information systems. Monitor for unusual access patterns, failed access attempts, and unauthorized access attempts."
        },
        {
          id: "500.07(h)",
          control: "Implement access control testing and validation",
          status: "gap",
          details: "Access control testing not implemented",
          recommendation: "Implement regular testing and validation of access controls to ensure they are working as intended. Include penetration testing of access controls and regular review of access permissions."
        }
      ]
    },
    {
      name: "Application Security (500.08)",
      description: "Develop, maintain, and test application security procedures",
      results: [
        {
          id: "500.08(a)",
          control: "Develop written procedures for the secure development of applications",
          status: "gap",
          details: "Secure development procedures not documented",
          recommendation: "Develop comprehensive secure development lifecycle (SDLC) procedures including security requirements, testing, and review processes. Procedures must cover all phases of development from requirements to deployment and maintenance."
        },
        {
          id: "500.08(b)",
          control: "Implement secure coding practices and security testing throughout the development process",
          status: "gap",
          details: "Secure coding practices not implemented",
          recommendation: "Implement secure coding standards, training, and automated security testing tools in development process. Include secure coding guidelines, developer training, and code review processes."
        },
        {
          id: "500.08(c)",
          control: "Conduct regular security testing of applications",
          status: "gap",
          details: "Regular application security testing not conducted",
          recommendation: "Implement regular application security testing including static, dynamic, and interactive testing. Testing must be conducted throughout the development lifecycle and on production applications."
        },
        {
          id: "500.08(d)",
          control: "Implement application security controls and safeguards",
          status: "gap",
          details: "Application security controls not implemented",
          recommendation: "Implement appropriate application security controls including input validation, output encoding, authentication, authorization, session management, and error handling. Controls must be designed to prevent common vulnerabilities."
        },
        {
          id: "500.08(e)",
          control: "Implement secure configuration management for applications",
          status: "gap",
          details: "Secure configuration management not implemented",
          recommendation: "Implement secure configuration management for applications including secure default configurations, configuration baselines, and change management processes. Regular configuration reviews and updates must be conducted."
        },
        {
          id: "500.08(f)",
          control: "Implement application vulnerability management",
          status: "gap",
          details: "Application vulnerability management not implemented",
          recommendation: "Implement application vulnerability management including regular vulnerability scanning, patch management, and vulnerability remediation processes. Establish procedures for identifying, assessing, and remediating application vulnerabilities."
        },
        {
          id: "500.08(g)",
          control: "Implement secure application deployment procedures",
          status: "gap",
          details: "Secure deployment procedures not implemented",
          recommendation: "Implement secure application deployment procedures including secure deployment environments, deployment approval processes, and post-deployment security validation. Ensure applications are deployed securely and securely configured."
        },
        {
          id: "500.08(h)",
          control: "Implement application security monitoring and logging",
          status: "gap",
          details: "Application security monitoring not implemented",
          recommendation: "Implement application security monitoring and logging to detect security events, monitor application behavior, and log security-relevant activities. Include real-time monitoring and alerting for security incidents."
        }
      ]
    },
    {
      name: "Risk Assessment (500.09)",
      description: "Conduct periodic risk assessments to inform cybersecurity program design",
      results: [
        {
          id: "500.09(a)",
          control: "Conduct periodic risk assessments to inform the design of the cybersecurity program",
          status: "gap",
          details: "Periodic risk assessments not conducted",
          recommendation: "Implement regular risk assessment process to identify and evaluate cybersecurity risks. Risk assessments must be comprehensive and cover all aspects of the organization's information systems and operations."
        },
        {
          id: "500.09(b)",
          control: "Risk assessments must be updated at least annually",
          status: "gap",
          details: "Annual risk assessment updates not established",
          recommendation: "Establish annual risk assessment review and update process with documented methodology. Risk assessments must be updated whenever there are material changes to the organization's systems or operations."
        },
        {
          id: "500.09(c)",
          control: "Risk assessments must address novel cybersecurity threats",
          status: "gap",
          details: "Risk assessments do not address emerging threats",
          recommendation: "Ensure risk assessments include evaluation of novel and emerging cybersecurity threats. Stay current with threat intelligence and industry best practices to identify new risks."
        },
        {
          id: "500.09(d)",
          control: "Risk assessments must be documented and maintained",
          status: "gap",
          details: "Risk assessment documentation not maintained",
          recommendation: "Document all risk assessments including methodology, findings, and recommendations. Maintain risk assessment documentation for regulatory examination and internal review purposes."
        },
        {
          id: "500.09(e)",
          control: "Risk assessments must identify and assess all information systems",
          status: "gap",
          details: "Risk assessments do not cover all information systems",
          recommendation: "Ensure risk assessments identify and assess all information systems including specialized systems such as industrial/process control systems, telephone switching systems, and environmental control systems."
        },
        {
          id: "500.09(f)",
          control: "Risk assessments must evaluate third-party service provider risks",
          status: "gap",
          details: "Third-party service provider risks not evaluated",
          recommendation: "Include evaluation of third-party service provider risks in risk assessments. Assess risks associated with vendors, contractors, and other third parties that have access to information systems or nonpublic information."
        },
        {
          id: "500.09(g)",
          control: "Risk assessments must include business impact analysis",
          status: "gap",
          details: "Business impact analysis not included in risk assessments",
          recommendation: "Include business impact analysis in risk assessments to understand the potential impact of cybersecurity events on business operations, reputation, and financial condition."
        },
        {
          id: "500.09(h)",
          control: "Risk assessments must be used to inform cybersecurity program design",
          status: "gap",
          details: "Risk assessments not used to inform program design",
          recommendation: "Use risk assessment findings to inform the design and implementation of the cybersecurity program. Ensure controls and safeguards are appropriate for identified risks and risk levels."
        }
      ]
    },
    {
      name: "Cybersecurity Personnel and Intelligence (500.10)",
      description: "Employ qualified cybersecurity personnel and utilize cybersecurity intelligence",
      results: [
        {
          id: "500.10(a)",
          control: "Employ qualified cybersecurity personnel or engage qualified third-party service providers",
          status: "gap",
          details: "Qualified cybersecurity personnel not employed",
          recommendation: "Employ qualified cybersecurity personnel or engage qualified third-party service providers with appropriate expertise. Personnel must have relevant cybersecurity certifications, education, and experience."
        },
        {
          id: "500.10(b)",
          control: "Utilize cybersecurity intelligence to inform the cybersecurity program",
          status: "gap",
          details: "Cybersecurity intelligence not utilized",
          recommendation: "Implement cybersecurity intelligence gathering and analysis capabilities to inform program decisions. Subscribe to threat intelligence feeds and participate in information sharing organizations."
        },
        {
          id: "500.10(c)",
          control: "Provide regular cybersecurity training to personnel",
          status: "gap",
          details: "Regular cybersecurity training not provided",
          recommendation: "Implement comprehensive cybersecurity training program for all personnel with regular updates. Training must cover cybersecurity awareness, policies, procedures, and incident response."
        },
        {
          id: "500.10(d)",
          control: "Ensure cybersecurity personnel have appropriate qualifications and experience",
          status: "gap",
          details: "Cybersecurity personnel qualifications not verified",
          recommendation: "Verify that cybersecurity personnel have appropriate qualifications and experience for their roles. Maintain records of personnel qualifications and provide ongoing professional development opportunities."
        },
        {
          id: "500.10(e)",
          control: "Implement cybersecurity personnel background checks and security clearances",
          status: "gap",
          details: "Background checks not conducted for cybersecurity personnel",
          recommendation: "Conduct appropriate background checks and security clearances for cybersecurity personnel. Ensure personnel are trustworthy and have no conflicts of interest that could compromise security."
        },
        {
          id: "500.10(f)",
          control: "Establish cybersecurity personnel roles and responsibilities",
          status: "gap",
          details: "Cybersecurity personnel roles not clearly defined",
          recommendation: "Clearly define roles and responsibilities for cybersecurity personnel. Establish reporting relationships, decision-making authority, and accountability measures for cybersecurity functions."
        },
        {
          id: "500.10(g)",
          control: "Implement cybersecurity personnel retention and succession planning",
          status: "gap",
          details: "Cybersecurity personnel retention not addressed",
          recommendation: "Implement retention strategies and succession planning for cybersecurity personnel. Ensure continuity of cybersecurity operations and knowledge transfer."
        },
        {
          id: "500.10(h)",
          control: "Establish cybersecurity personnel performance management",
          status: "gap",
          details: "Cybersecurity personnel performance management not established",
          recommendation: "Establish performance management processes for cybersecurity personnel including regular reviews, goal setting, and performance improvement plans. Link performance to cybersecurity program effectiveness."
        }
      ]
    },
    {
      name: "Third-Party Service Provider Security Policy (500.11)",
      description: "Implement policies and procedures for third-party service provider security",
      results: [
        {
          id: "500.11(a)",
          control: "Implement written policies and procedures for third-party service provider security",
          status: "gap",
          details: "Third-party security policies not implemented",
          recommendation: "Develop comprehensive written policies and procedures for managing third-party service provider security"
        },
        {
          id: "500.11(b)",
          control: "Assess the cybersecurity practices of third-party service providers",
          status: "gap",
          details: "Third-party cybersecurity assessments not conducted",
          recommendation: "Implement regular assessment process to evaluate third-party service provider cybersecurity practices"
        },
        {
          id: "500.11(c)",
          control: "Ensure third-party service providers maintain appropriate cybersecurity practices",
          status: "gap",
          details: "Third-party cybersecurity requirements not enforced",
          recommendation: "Establish contractual requirements and monitoring processes to ensure third-party cybersecurity compliance"
        }
      ]
    },
    {
      name: "Multi-Factor Authentication (500.12)",
      description: "Implement multi-factor authentication for access to information systems",
      results: [
        {
          id: "500.12(a)",
          control: "Implement multi-factor authentication for any individual accessing any information systems",
          status: "gap",
          details: "Multi-factor authentication not implemented",
          recommendation: "Implement multi-factor authentication for all individuals accessing information systems"
        },
        {
          id: "500.12(b)",
          control: "MFA must be implemented for remote access to information systems",
          status: "gap",
          details: "MFA not implemented for remote access",
          recommendation: "Ensure multi-factor authentication is specifically implemented for all remote access to information systems"
        },
        {
          id: "500.12(c)",
          control: "MFA implementation must be risk-based and appropriate for the level of risk",
          status: "gap",
          details: "MFA implementation not risk-based",
          recommendation: "Implement risk-based MFA approach with appropriate controls based on access risk levels"
        }
      ]
    },
    {
      name: "Limitations on Data Retention (500.13)",
      description: "Implement data retention policies and procedures",
      results: [
        {
          id: "500.13(a)",
          control: "Implement policies and procedures for the secure disposal of nonpublic information",
          status: "gap",
          details: "Data disposal policies not implemented",
          recommendation: "Develop comprehensive policies and procedures for secure disposal of nonpublic information"
        },
        {
          id: "500.13(b)",
          control: "Data retention policies must be based on business needs and legal requirements",
          status: "gap",
          details: "Data retention policies not aligned with business and legal requirements",
          recommendation: "Develop data retention policies that balance business needs with legal and regulatory requirements"
        },
        {
          id: "500.13(c)",
          control: "Implement secure data destruction procedures",
          status: "gap",
          details: "Secure data destruction procedures not implemented",
          recommendation: "Implement secure data destruction procedures including physical and digital destruction methods"
        }
      ]
    },
    {
      name: "Training and Monitoring (500.14)",
      description: "Provide cybersecurity training and implement monitoring capabilities",
      results: [
        {
          id: "500.14(a)",
          control: "Provide regular cybersecurity awareness training to all personnel",
          status: "gap",
          details: "Cybersecurity awareness training not provided",
          recommendation: "Implement comprehensive cybersecurity awareness training program for all personnel with regular updates"
        },
        {
          id: "500.14(b)",
          control: "Implement risk-based controls to protect against malicious code",
          status: "gap",
          details: "Malicious code protection not implemented",
          recommendation: "Implement email and web filtering, endpoint protection, and other controls to protect against malicious code"
        },
        {
          id: "500.14(c)",
          control: "For Class A companies: implement endpoint detection and response solutions",
          status: "gap",
          details: "EDR solutions not implemented for Class A companies",
          recommendation: "Implement endpoint detection and response (EDR) solutions to monitor and respond to unusual activity"
        },
        {
          id: "500.14(d)",
          control: "For Class A companies: implement centralized logging and security event solutions",
          status: "gap",
          details: "Centralized logging not implemented for Class A companies",
          recommendation: "Implement centralized logging and security information and event management (SIEM) solutions"
        }
      ]
    },
    {
      name: "Encryption of Nonpublic Information (500.15)",
      description: "Implement encryption for nonpublic information",
      results: [
        {
          id: "500.15(a)",
          control: "Implement encryption for nonpublic information in transit over external networks",
          status: "gap",
          details: "Encryption in transit not implemented",
          recommendation: "Implement strong encryption (TLS 1.2 or higher) for all nonpublic information transmitted over external networks"
        },
        {
          id: "500.15(b)",
          control: "Implement encryption for nonpublic information at rest",
          status: "gap",
          details: "Encryption at rest not implemented",
          recommendation: "Implement strong encryption for nonpublic information stored on all devices and systems"
        },
        {
          id: "500.15(c)",
          control: "Encryption must be implemented using industry-standard algorithms",
          status: "gap",
          details: "Encryption algorithms not industry-standard",
          recommendation: "Use industry-standard encryption algorithms (AES-256, RSA-2048 or higher) for all encryption implementations"
        }
      ]
    },
    {
      name: "Incident Response Plan (500.16)",
      description: "Establish incident response plan for cybersecurity events",
      results: [
        {
          id: "500.16(a)",
          control: "Establish a written incident response plan to respond to cybersecurity events",
          status: "gap",
          details: "Incident response plan not established",
          recommendation: "Develop comprehensive written incident response plan with clear procedures for detecting, responding to, and recovering from cybersecurity events"
        },
        {
          id: "500.16(b)",
          control: "Incident response plan must address confidentiality, integrity, and availability of information systems",
          status: "gap",
          details: "Incident response plan does not address CIA requirements",
          recommendation: "Ensure incident response plan specifically addresses protection of confidentiality, integrity, and availability"
        },
        {
          id: "500.16(c)",
          control: "Test incident response plan at least annually",
          status: "gap",
          details: "Incident response plan testing not conducted",
          recommendation: "Implement annual incident response plan testing including tabletop exercises and simulation drills"
        },
        {
          id: "500.16(d)",
          control: "Update incident response plan based on lessons learned from testing and actual incidents",
          status: "gap",
          details: "Incident response plan not updated based on lessons learned",
          recommendation: "Establish process to update incident response plan based on testing results and actual incident experiences"
        }
      ]
    },
    {
      name: "Notices to Superintendent (500.17)",
      description: "Notify NYDFS of cybersecurity events and other required notifications under the Second Amendment",
      results: [
        {
          id: "500.17(a)",
          control: "Notify NYDFS within 72 hours of any cybersecurity event",
          status: "gap",
          details: "72-hour notification process not established",
          recommendation: "Implement process to notify NYDFS within 72 hours of any cybersecurity event with required information including event details, impact assessment, and response actions taken."
        },
        {
          id: "500.17(b)",
          control: "Notify NYDFS of cybersecurity events affecting third-party service providers",
          status: "gap",
          details: "Third-party incident notification not established",
          recommendation: "Establish process to notify NYDFS of cybersecurity events affecting third-party service providers, including events that impact the covered entity's operations or data."
        },
        {
          id: "500.17(c)",
          control: "Submit annual certification of compliance with Part 500",
          status: "gap",
          details: "Annual certification process not established",
          recommendation: "Implement annual certification process to submit compliance certification to NYDFS, including certification by senior officer or board member of compliance with all applicable Part 500 requirements."
        },
        {
          id: "500.17(d)",
          control: "Comply with 30-day notification requirement for cybersecurity incidents",
          status: "gap",
          details: "30-day notification requirement not implemented",
          recommendation: "Implement process to notify NYDFS within 30 days of any cybersecurity incident that requires notification to any government body, self-regulatory agency, or supervisory body, or that has a reasonable likelihood of materially harming any material part of the normal operations of the covered entity."
        },
        {
          id: "500.17(e)",
          control: "Notify NYDFS of ransomware incidents immediately",
          status: "gap",
          details: "Ransomware notification process not established",
          recommendation: "Implement immediate notification process for any cybersecurity incident that results in the deployment of ransomware within a material part of the covered entity's information systems."
        },
        {
          id: "500.17(f)",
          control: "Maintain records of all notifications to NYDFS",
          status: "gap",
          details: "Notification record keeping not implemented",
          recommendation: "Implement record keeping system for all notifications sent to NYDFS, including copies of notifications, response communications, and follow-up actions taken."
        },
        {
          id: "500.17(g)",
          control: "Ensure notification content meets NYDFS requirements",
          status: "gap",
          details: "Notification content requirements not documented",
          recommendation: "Document and implement notification content requirements including event description, timeline, impact assessment, containment measures, and remediation actions taken or planned."
        }
      ]
    },
    {
      name: "Confidentiality (500.18)",
      description: "Maintain confidentiality of information provided to NYDFS",
      results: [
        {
          id: "500.18(a)",
          control: "Maintain confidentiality of information provided to NYDFS in connection with cybersecurity events",
          status: "gap",
          details: "Confidentiality procedures not established",
          recommendation: "Implement procedures to maintain confidentiality of information provided to NYDFS"
        },
        {
          id: "500.18(b)",
          control: "Ensure proper handling of sensitive information in communications with NYDFS",
          status: "gap",
          details: "Sensitive information handling procedures not established",
          recommendation: "Establish procedures for proper handling and protection of sensitive information in NYDFS communications"
        }
      ]
    },
    {
      name: "Exemptions (500.19)",
      description: "Understand and document any applicable exemptions under the Second Amendment",
      results: [
        {
          id: "500.19(a)",
          control: "Document any applicable exemptions from Part 500 requirements",
          status: "gap",
          details: "Exemption documentation not maintained",
          recommendation: "Document any applicable exemptions from Part 500 requirements with proper justification and approval. Ensure exemptions are properly documented and filed with NYDFS as required."
        },
        {
          id: "500.19(b)",
          control: "Review exemptions annually to ensure they remain applicable",
          status: "gap",
          details: "Exemption review process not established",
          recommendation: "Implement annual review process to assess continued applicability of any exemptions. Ensure exemptions are reviewed and updated as business circumstances change."
        },
        {
          id: "500.19(c)",
          control: "Understand exemption criteria for small companies and limited scope entities",
          status: "gap",
          details: "Exemption criteria not understood or documented",
          recommendation: "Document understanding of exemption criteria including: companies with fewer than 10 employees and less than $5M in gross annual revenue; companies with less than $10M in gross annual revenue and no nonpublic information; and other specific exemption categories as defined in the regulation."
        },
        {
          id: "500.19(d)",
          control: "File Notice of Exemption within 30 days of determination",
          status: "gap",
          details: "Notice of Exemption filing process not established",
          recommendation: "Implement process to file Notice of Exemption electronically within 30 days of determination that the covered entity is exempt from Part 500 requirements."
        },
        {
          id: "500.19(e)",
          control: "Understand that exemptions may be revoked if circumstances change",
          status: "gap",
          details: "Exemption revocation process not understood",
          recommendation: "Document understanding that exemptions may be revoked if the covered entity no longer qualifies for the exemption, and implement monitoring to ensure continued qualification."
        },
        {
          id: "500.19(f)",
          control: "Implement 180-day compliance period if exemption is lost",
          status: "gap",
          details: "Exemption loss compliance process not established",
          recommendation: "Implement process to comply with all applicable Part 500 requirements within 180 days if the covered entity ceases to qualify for an exemption."
        },
        {
          id: "500.19(g)",
          control: "Understand specific exemptions for certain insurance entities",
          status: "gap",
          details: "Insurance entity exemptions not understood",
          recommendation: "Document understanding of specific exemptions for persons subject to Insurance Law sections 1110 and 5904, accredited reinsurers, certified reinsurers, reciprocal jurisdiction reinsurers, and individual insurance agents in inactive status."
        },
        {
          id: "500.19(h)",
          control: "Ensure exemption status is properly maintained and documented",
          status: "gap",
          details: "Exemption status maintenance not implemented",
          recommendation: "Implement ongoing process to maintain and document exemption status, including regular review of qualification criteria and proper filing of required notices with NYDFS."
        }
      ]
    },
    {
      name: "Enforcement (500.20)",
      description: "Understand enforcement provisions and penalty factors under the Second Amendment",
      results: [
        {
          id: "500.20(a)",
          control: "Understand that this regulation will be enforced by the superintendent pursuant to applicable laws",
          status: "gap",
          details: "Enforcement provisions not understood or documented",
          recommendation: "Document understanding of enforcement provisions and ensure compliance program addresses all requirements to avoid violations"
        },
        {
          id: "500.20(b)",
          control: "Recognize that single acts or failures to act constitute violations of this Part",
          status: "gap",
          details: "Violation criteria not understood",
          recommendation: "Ensure all personnel understand that single acts or failures to act constitute violations, including failure to secure or prevent unauthorized access to nonpublic information"
        },
        {
          id: "500.20(c)",
          control: "Understand penalty factors that will be considered in enforcement actions",
          status: "gap",
          details: "Penalty factors not documented or addressed in compliance program",
          recommendation: "Document understanding of penalty factors including cooperation with superintendent, good faith, unintentional vs. intentional conduct, history of violations, harm to consumers, and consistency with nationally recognized frameworks like NIST"
        },
        {
          id: "500.20(d)",
          control: "Implement controls to address key penalty factors in compliance program",
          status: "gap",
          details: "Compliance program does not address key penalty factors",
          recommendation: "Ensure compliance program addresses key penalty factors including timely and accurate disclosures to affected consumers, consistent policies with NIST frameworks, and proper documentation of good faith efforts"
        }
      ]
    },
    {
      name: "Effective Date (500.21)",
      description: "Comply with effective dates and transitional periods",
      results: [
        {
          id: "500.21(a)",
          control: "Comply with original effective date of March 1, 2017 for Part 500",
          status: "gap",
          details: "Original effective date compliance not verified",
          recommendation: "Verify compliance with all requirements effective March 1, 2017, including annual certification requirements commencing February 15, 2018"
        },
        {
          id: "500.21(b)",
          control: "Comply with Second Amendment effective date of November 1, 2023",
          status: "gap",
          details: "Second Amendment effective date compliance not verified",
          recommendation: "Ensure compliance with all Second Amendment requirements effective November 1, 2023, including new sections 500.19(e)-(h), 500.20, 500.21, 500.22, and 500.24"
        }
      ]
    },
    {
      name: "Transitional Periods (500.22)",
      description: "Comply with transitional periods for implementation of requirements",
      results: [
        {
          id: "500.22(a)",
          control: "Comply with 180-day transitional period from original effective date",
          status: "gap",
          details: "Original 180-day transitional period compliance not verified",
          recommendation: "Verify compliance with all requirements within 180 days of March 1, 2017, except as otherwise specified in the regulation"
        },
        {
          id: "500.22(b)",
          control: "Comply with additional transitional periods for specific sections",
          status: "gap",
          details: "Additional transitional periods not tracked",
          recommendation: "Ensure compliance with additional transitional periods: 1 year for sections 500.4(b), 500.5, 500.9, 500.12, and 500.14(b); 18 months for sections 500.6, 500.8, 500.13, 500.14(a), and 500.15; 2 years for section 500.11"
        },
        {
          id: "500.22(c)",
          control: "Comply with 180-day transitional period for Second Amendment",
          status: "gap",
          details: "Second Amendment 180-day transitional period not tracked",
          recommendation: "Ensure compliance with all Second Amendment requirements within 180 days of November 1, 2023, except as otherwise specified"
        },
        {
          id: "500.22(d)",
          control: "Comply with specific transitional periods for Second Amendment sections",
          status: "gap",
          details: "Second Amendment specific transitional periods not tracked",
          recommendation: "Ensure compliance with Second Amendment transitional periods: 30 days for section 500.17; 1 year for sections 500.4, 500.15, 500.16, and 500.19(a); 18 months for sections 500.5(a)(2), 500.7, 500.14(a)(2), and 500.14(b); 2 years for sections 500.12 and 500.13(a)"
        }
      ]
    },
    {
      name: "Severability (500.23)",
      description: "Understand severability provisions and their impact on compliance",
      results: [
        {
          id: "500.23(a)",
          control: "Understand that if any provision is adjudged invalid, other provisions remain valid",
          status: "gap",
          details: "Severability provisions not understood",
          recommendation: "Document understanding that if any provision of Part 500 is adjudged invalid by a court, such judgment shall not affect the validity of other provisions"
        },
        {
          id: "500.23(b)",
          control: "Ensure compliance program addresses all provisions regardless of potential severability",
          status: "gap",
          details: "Compliance program does not account for severability",
          recommendation: "Ensure compliance program addresses all provisions of Part 500 comprehensively, as severability does not excuse non-compliance with valid provisions"
        }
      ]
    },
    {
      name: "Electronic Filing Exemptions (500.24)",
      description: "Understand and manage electronic filing exemption requirements",
      results: [
        {
          id: "500.24(a)",
          control: "Understand that electronic filing exemptions may be requested",
          status: "gap",
          details: "Electronic filing exemption process not understood",
          recommendation: "Document understanding that filers may apply for exemptions from electronic filing requirements by submitting written requests at least 30 days before the filing deadline"
        },
        {
          id: "500.24(b)",
          control: "Know the requirements for exemption requests",
          status: "gap",
          details: "Exemption request requirements not documented",
          recommendation: "Document requirements for exemption requests including DFS license number, specific filing identification, basis for exemption (undue hardship, impracticability, or good cause), and scope of exemption"
        },
        {
          id: "500.24(c)",
          control: "Understand the exemption approval process",
          status: "gap",
          details: "Exemption approval process not understood",
          recommendation: "Understand that exemptions require superintendent's written determination specifying the basis for approval and scope of exemption, and that approved exemptions require acceptable alternative filing methods"
        },
        {
          id: "500.24(d)",
          control: "Implement process for managing electronic filing exemptions if needed",
          status: "gap",
          details: "Electronic filing exemption management process not implemented",
          recommendation: "If electronic filing exemptions are needed, implement process for requesting, tracking, and managing exemptions including proper documentation and compliance with alternative filing requirements"
        }
      ]
    },
    {
      name: "Class A Company Requirements (500.25)",
      description: "Additional requirements for Class A companies with enhanced cybersecurity obligations",
      results: [
        {
          id: "500.25(a)",
          control: "Determine if entity qualifies as Class A company based on revenue and employee criteria",
          status: "gap",
          details: "Class A company determination not conducted",
          recommendation: "Conduct annual assessment to determine if entity qualifies as Class A company: $20M+ gross annual revenue in each of last two fiscal years AND either 2,000+ employees averaged over last two fiscal years OR $1B+ gross annual revenue in each of last two fiscal years from all business operations and affiliates."
        },
        {
          id: "500.25(b)",
          control: "Implement enhanced endpoint detection and response (EDR) solutions for Class A companies",
          status: "gap",
          details: "EDR solutions not implemented for Class A companies",
          recommendation: "For Class A companies, implement endpoint detection and response solutions to monitor and respond to unusual activity, including real-time monitoring, automated response capabilities, and integration with security operations center."
        },
        {
          id: "500.25(c)",
          control: "Implement centralized logging and security event management for Class A companies",
          status: "gap",
          details: "Centralized logging not implemented for Class A companies",
          recommendation: "For Class A companies, implement centralized logging and security information and event management (SIEM) solutions to aggregate, correlate, and analyze security events across all information systems."
        },
        {
          id: "500.25(d)",
          control: "Implement enhanced monitoring and detection capabilities for Class A companies",
          status: "gap",
          details: "Enhanced monitoring not implemented for Class A companies",
          recommendation: "For Class A companies, implement advanced threat detection capabilities including behavioral analytics, machine learning-based detection, and continuous monitoring of all critical systems and data."
        },
        {
          id: "500.25(e)",
          control: "Implement comprehensive incident response capabilities for Class A companies",
          status: "gap",
          details: "Enhanced incident response not implemented for Class A companies",
          recommendation: "For Class A companies, implement comprehensive incident response capabilities including 24/7 security operations center, automated incident response workflows, and advanced threat hunting capabilities."
        },
        {
          id: "500.25(f)",
          control: "Implement enhanced third-party risk management for Class A companies",
          status: "gap",
          details: "Enhanced third-party risk management not implemented for Class A companies",
          recommendation: "For Class A companies, implement enhanced third-party risk management including continuous monitoring of third-party security posture, regular security assessments, and contractual requirements for cybersecurity controls."
        },
        {
          id: "500.25(g)",
          control: "Implement enhanced cybersecurity governance for Class A companies",
          status: "gap",
          details: "Enhanced governance not implemented for Class A companies",
          recommendation: "For Class A companies, implement enhanced cybersecurity governance including dedicated cybersecurity committee, regular board reporting, and comprehensive risk management framework."
        },
        {
          id: "500.25(h)",
          control: "Implement enhanced cybersecurity training and awareness for Class A companies",
          status: "gap",
          details: "Enhanced training not implemented for Class A companies",
          recommendation: "For Class A companies, implement enhanced cybersecurity training and awareness programs including role-specific training, regular security awareness updates, and advanced threat simulation exercises."
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
  NIST_800_63B: nist80063b,
  NYDFS_500: nydfs500
};

