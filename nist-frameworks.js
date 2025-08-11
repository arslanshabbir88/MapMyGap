// NIST Cybersecurity Framework (CSF) Controls
export const nistCSF = {
  name: "NIST Cybersecurity Framework (CSF)",
  description: "A voluntary framework for managing and reducing cybersecurity risk",
  categories: [
    {
      name: "IDENTIFY",
      description: "Develop an organizational understanding to manage cybersecurity risk",
      results: [
        { id: "ID.AM-1", control: "Physical devices and systems within the organization are inventoried", status: "gap", details: "Asset management for physical devices", recommendation: "Implement comprehensive asset inventory system" },
        { id: "ID.AM-2", control: "Software platforms and applications within the organization are inventoried", status: "gap", details: "Software asset management", recommendation: "Deploy software discovery and inventory tools" },
        { id: "ID.AM-3", control: "Organizational communication and data flows are mapped", status: "gap", details: "Data flow documentation", recommendation: "Create data flow diagrams and communication maps" },
        { id: "ID.AM-4", control: "External information systems are catalogued", status: "gap", details: "External system inventory", recommendation: "Document all external system connections and dependencies" },
        { id: "ID.AM-5", control: "Resources are prioritized based on their classification", status: "gap", details: "Resource prioritization", recommendation: "Implement risk-based resource classification system" },
        { id: "ID.AM-6", control: "Cybersecurity roles and responsibilities are established", status: "gap", details: "Role definition", recommendation: "Define and document cybersecurity roles and responsibilities" }
      ]
    },
    {
      name: "PROTECT",
      description: "Develop and implement appropriate safeguards to ensure delivery of critical services",
      results: [
        { id: "PR.AC-1", control: "Identities and credentials are managed", status: "gap", details: "Identity and access management", recommendation: "Implement centralized identity management system" },
        { id: "PR.AC-2", control: "Physical access is controlled", status: "gap", details: "Physical security controls", recommendation: "Deploy physical access control systems" },
        { id: "PR.AC-3", control: "Remote access is managed", status: "gap", details: "Remote access security", recommendation: "Implement secure remote access solutions" },
        { id: "PR.AC-4", control: "Access permissions are managed", status: "gap", details: "Permission management", recommendation: "Establish role-based access control system" },
        { id: "PR.AC-5", control: "Network integrity is protected", status: "gap", details: "Network security", recommendation: "Deploy network monitoring and protection tools" },
        { id: "PR.AC-6", control: "Identities are proofed and bound", status: "gap", details: "Identity verification", recommendation: "Implement multi-factor authentication" },
        { id: "PR.AC-7", control: "Users, devices, and other assets are authenticated", status: "gap", details: "Authentication systems", recommendation: "Deploy enterprise authentication solution" }
      ]
    },
    {
      name: "DETECT",
      description: "Develop and implement appropriate activities to identify the occurrence of a cybersecurity event",
      results: [
        { id: "DE.AE-1", control: "Baseline network operations are established", status: "gap", details: "Network baseline", recommendation: "Establish network performance and behavior baselines" },
        { id: "DE.AE-2", control: "Detected events are analyzed", status: "gap", details: "Event analysis", recommendation: "Implement security event correlation and analysis" },
        { id: "DE.AE-3", control: "Event data are collected and correlated", status: "gap", details: "Data correlation", recommendation: "Deploy security information and event management system" },
        { id: "DE.AE-4", control: "Impact of events is determined", status: "gap", details: "Impact assessment", recommendation: "Establish incident impact assessment procedures" },
        { id: "DE.AE-5", control: "Incident alert thresholds are established", status: "gap", details: "Alert thresholds", recommendation: "Define and configure security alert thresholds" }
      ]
    },
    {
      name: "RESPOND",
      description: "Develop and implement appropriate activities to take action regarding a detected cybersecurity incident",
      results: [
        { id: "RS.RP-1", control: "Response plan is executed during or after incident", status: "gap", details: "Incident response execution", recommendation: "Develop and test incident response procedures" },
        { id: "RS.CO-1", control: "Personnel know their roles", status: "gap", details: "Response team training", recommendation: "Train personnel on incident response roles" },
        { id: "RS.CO-2", control: "Events are reported consistent with criteria", status: "gap", details: "Event reporting", recommendation: "Establish event reporting criteria and procedures" },
        { id: "RS.CO-3", control: "Information is shared consistent with response plans", status: "gap", details: "Information sharing", recommendation: "Implement secure information sharing protocols" },
        { id: "RS.CO-4", control: "Coordination with stakeholders occurs", status: "gap", details: "Stakeholder coordination", recommendation: "Establish stakeholder communication procedures" },
        { id: "RS.CO-5", control: "Voluntary information sharing occurs with external stakeholders", status: "gap", details: "External sharing", recommendation: "Develop external information sharing agreements" }
      ]
    },
    {
      name: "RECOVER",
      description: "Develop and implement appropriate activities to maintain plans for resilience",
      results: [
        { id: "RC.RP-1", control: "Recovery plan is executed during or after incident", status: "gap", details: "Recovery execution", recommendation: "Develop and test disaster recovery procedures" },
        { id: "RC.IM-1", control: "Recovery plans incorporate lessons learned", status: "gap", details: "Lessons learned integration", recommendation: "Establish post-incident review process" },
        { id: "RC.IM-2", control: "Recovery strategies are updated", status: "gap", details: "Strategy updates", recommendation: "Implement continuous improvement for recovery strategies" }
      ]
    }
  ]
};

// NIST 800-53 Controls (Selected Key Controls)
export const nist80053 = {
  name: "NIST SP 800-53",
  description: "Security and Privacy Controls for Information Systems and Organizations",
  categories: [
    {
      name: "Access Control (AC)",
      description: "Control access to information systems",
      results: [
        { id: "AC-1", control: "Access Control Policy and Procedures", status: "gap", details: "Access control policy documentation", recommendation: "Develop comprehensive access control policy" },
        { id: "AC-2", control: "Account Management", status: "gap", details: "User account lifecycle management", recommendation: "Implement automated account management system" },
        { id: "AC-3", control: "Access Enforcement", status: "gap", details: "Access control enforcement", recommendation: "Deploy access control enforcement mechanisms" },
        { id: "AC-4", control: "Information Flow Enforcement", status: "gap", details: "Information flow controls", recommendation: "Implement data flow monitoring and controls" },
        { id: "AC-5", control: "Separation of Duties", status: "gap", details: "Duty separation", recommendation: "Establish role-based duty separation" },
        { id: "AC-6", control: "Least Privilege", status: "gap", details: "Privilege minimization", recommendation: "Implement principle of least privilege" },
        { id: "AC-7", control: "Unsuccessful Logon Attempts", status: "gap", details: "Failed login handling", recommendation: "Configure account lockout policies" },
        { id: "AC-8", control: "System Use Notification", status: "gap", details: "System use warnings", recommendation: "Implement system use notification banners" },
        { id: "AC-10", control: "Concurrent Session Control", status: "gap", details: "Session management", recommendation: "Configure concurrent session limits" },
        { id: "AC-11", control: "Session Lock", status: "gap", details: "Session locking", recommendation: "Implement automatic session locking" },
        { id: "AC-12", control: "Session Termination", status: "gap", details: "Session termination", recommendation: "Configure automatic session termination" },
        { id: "AC-14", control: "Permitted Actions Without Identification", status: "gap", details: "Anonymous access controls", recommendation: "Define and limit anonymous access" },
        { id: "AC-17", control: "Remote Access", status: "gap", details: "Remote access security", recommendation: "Implement secure remote access controls" },
        { id: "AC-18", control: "Wireless Access", status: "gap", details: "Wireless security", recommendation: "Deploy wireless security controls" },
        { id: "AC-19", control: "Access Control for Mobile Devices", status: "gap", details: "Mobile device access", recommendation: "Implement mobile device management" },
        { id: "AC-20", control: "Use of External Information Systems", status: "gap", details: "External system access", recommendation: "Establish external system access controls" },
        { id: "AC-21", control: "Information Sharing", status: "gap", details: "Information sharing controls", recommendation: "Implement secure information sharing protocols" },
        { id: "AC-22", control: "Publicly Accessible Content", status: "gap", details: "Public content controls", recommendation: "Establish public content review procedures" }
      ]
    },
    {
      name: "Audit and Accountability (AU)",
      description: "Create, protect, and retain information system audit records",
      results: [
        { id: "AU-1", control: "Audit and Accountability Policy and Procedures", status: "gap", details: "Audit policy documentation", recommendation: "Develop comprehensive audit policy" },
        { id: "AU-2", control: "Audit Events", status: "gap", details: "Audit event definition", recommendation: "Define auditable events and activities" },
        { id: "AU-3", control: "Content of Audit Records", status: "gap", details: "Audit record content", recommendation: "Specify required audit record content" },
        { id: "AU-4", control: "Audit Storage Capacity", status: "gap", details: "Audit storage management", recommendation: "Configure adequate audit storage capacity" },
        { id: "AU-5", control: "Response to Audit Processing Failures", status: "gap", details: "Audit failure handling", recommendation: "Implement audit failure response procedures" },
        { id: "AU-6", control: "Audit Review, Analysis, and Reporting", status: "gap", details: "Audit analysis", recommendation: "Establish audit review and analysis procedures" },
        { id: "AU-7", control: "Audit Reduction and Report Generation", status: "gap", details: "Audit reporting", recommendation: "Implement automated audit reporting" },
        { id: "AU-8", control: "Time Stamps", status: "gap", details: "Time synchronization", recommendation: "Deploy time synchronization services" },
        { id: "AU-9", control: "Protection of Audit Information", status: "gap", details: "Audit data protection", recommendation: "Implement audit data protection controls" },
        { id: "AU-10", control: "Non-repudiation", status: "gap", details: "Non-repudiation controls", recommendation: "Deploy digital signature and timestamping" },
        { id: "AU-11", control: "Audit Record Retention", status: "gap", details: "Audit retention", recommendation: "Establish audit record retention policies" },
        { id: "AU-12", control: "Audit Generation", status: "gap", details: "Audit generation", recommendation: "Configure system audit generation capabilities" }
      ]
    },
    {
      name: "Configuration Management (CM)",
      description: "Establish and maintain baseline configurations",
      results: [
        { id: "CM-1", control: "Configuration Management Policy and Procedures", status: "gap", details: "Configuration management policy", recommendation: "Develop configuration management policy" },
        { id: "CM-2", control: "Baseline Configuration", status: "gap", details: "Baseline configuration establishment", recommendation: "Establish system baseline configurations" },
        { id: "CM-3", control: "Configuration Change Control", status: "gap", details: "Change control procedures", recommendation: "Implement configuration change control process" },
        { id: "CM-4", control: "Security Impact Analysis", status: "gap", details: "Security impact assessment", recommendation: "Establish security impact analysis procedures" },
        { id: "CM-5", control: "Access Restrictions for Change", status: "gap", details: "Change access restrictions", recommendation: "Implement change access restrictions" },
        { id: "CM-6", control: "Configuration Settings", status: "gap", details: "Configuration settings management", recommendation: "Establish secure configuration settings" },
        { id: "CM-7", control: "Least Functionality", status: "gap", details: "Functionality restrictions", recommendation: "Implement least functionality principle" },
        { id: "CM-8", control: "Information System Component Inventory", status: "gap", details: "Component inventory", recommendation: "Maintain system component inventory" },
        { id: "CM-9", control: "Configuration Management Plan", status: "gap", details: "Configuration management planning", recommendation: "Develop configuration management plan" },
        { id: "CM-10", control: "Software Usage Restrictions", status: "gap", details: "Software usage controls", recommendation: "Implement software usage restrictions" },
        { id: "CM-11", control: "User-Installed Software", status: "gap", details: "User software installation", recommendation: "Control user software installation" }
      ]
    },
    {
      name: "Contingency Planning (CP)",
      description: "Establish, maintain, and implement contingency planning",
      results: [
        { id: "CP-1", control: "Contingency Planning Policy and Procedures", status: "gap", details: "Contingency planning policy", recommendation: "Develop contingency planning policy" },
        { id: "CP-2", control: "Contingency Plan", status: "gap", details: "Contingency plan development", recommendation: "Develop comprehensive contingency plan" },
        { id: "CP-3", control: "Contingency Training", status: "gap", details: "Contingency training", recommendation: "Implement contingency training program" },
        { id: "CP-4", control: "Contingency Plan Testing", status: "gap", details: "Contingency plan testing", recommendation: "Establish contingency plan testing procedures" },
        { id: "CP-6", control: "Alternate Storage Site", status: "gap", details: "Alternate storage facilities", recommendation: "Establish alternate storage site" },
        { id: "CP-7", control: "Alternate Processing Site", status: "gap", details: "Alternate processing facilities", recommendation: "Establish alternate processing site" },
        { id: "CP-8", control: "Telecommunications Services", status: "gap", details: "Telecommunications continuity", recommendation: "Implement telecommunications continuity" },
        { id: "CP-9", control: "Information System Backup", status: "gap", details: "System backup procedures", recommendation: "Establish system backup procedures" },
        { id: "CP-10", control: "Information System Recovery and Reconstitution", status: "gap", details: "System recovery procedures", recommendation: "Implement system recovery procedures" }
      ]
    },
    {
      name: "Identification and Authentication (IA)",
      description: "Identify and authenticate organizational users",
      results: [
        { id: "IA-1", control: "Identification and Authentication Policy and Procedures", status: "gap", details: "IA policy documentation", recommendation: "Develop identification and authentication policy" },
        { id: "IA-2", control: "Identification and Authentication (Organizational Users)", status: "gap", details: "User identification and authentication", recommendation: "Implement user identification and authentication" },
        { id: "IA-3", control: "Device Identification and Authentication", status: "gap", details: "Device identification and authentication", recommendation: "Implement device identification and authentication" },
        { id: "IA-4", control: "Identifier Management", status: "gap", details: "Identifier management", recommendation: "Establish identifier management procedures" },
        { id: "IA-5", control: "Authenticator Management", status: "gap", details: "Authenticator management", recommendation: "Implement authenticator management" },
        { id: "IA-6", control: "Authenticator Feedback", status: "gap", details: "Authenticator feedback", recommendation: "Implement authenticator feedback mechanisms" },
        { id: "IA-7", control: "Cryptographic Module Authentication", status: "gap", details: "Cryptographic module authentication", recommendation: "Implement cryptographic module authentication" },
        { id: "IA-8", control: "Identification and Authentication (Non-Organizational Users)", status: "gap", details: "Non-organizational user authentication", recommendation: "Implement non-organizational user authentication" }
      ]
    },
    {
      name: "Incident Response (IR)",
      description: "Establish incident response capability",
      results: [
        { id: "IR-1", control: "Incident Response Policy and Procedures", status: "gap", details: "Incident response policy", recommendation: "Develop incident response policy" },
        { id: "IR-2", control: "Incident Response Training", status: "gap", details: "Incident response training", recommendation: "Implement incident response training program" },
        { id: "IR-3", control: "Incident Response Testing", status: "gap", details: "Incident response testing", recommendation: "Establish incident response testing procedures" },
        { id: "IR-4", control: "Incident Handling", status: "gap", details: "Incident handling procedures", recommendation: "Implement incident handling procedures" },
        { id: "IR-5", control: "Incident Monitoring", status: "gap", details: "Incident monitoring", recommendation: "Implement incident monitoring capabilities" },
        { id: "IR-6", control: "Incident Reporting", status: "gap", details: "Incident reporting procedures", recommendation: "Establish incident reporting procedures" },
        { id: "IR-7", control: "Incident Response Assistance", status: "gap", details: "Incident response assistance", recommendation: "Establish incident response assistance procedures" },
        { id: "IR-8", control: "Incident Response Plan", status: "gap", details: "Incident response plan", recommendation: "Develop comprehensive incident response plan" }
      ]
    },
    {
      name: "Maintenance (MA)",
      description: "Perform periodic and timely maintenance",
      results: [
        { id: "MA-1", control: "System Maintenance Policy and Procedures", status: "gap", details: "System maintenance policy", recommendation: "Develop system maintenance policy" },
        { id: "MA-2", control: "Controlled Maintenance", status: "gap", details: "Controlled maintenance procedures", recommendation: "Implement controlled maintenance procedures" },
        { id: "MA-3", control: "Maintenance Tools", status: "gap", details: "Maintenance tool controls", recommendation: "Control maintenance tools and equipment" },
        { id: "MA-4", control: "Nonlocal Maintenance", status: "gap", details: "Nonlocal maintenance controls", recommendation: "Implement nonlocal maintenance controls" },
        { id: "MA-5", control: "Maintenance Personnel", status: "gap", details: "Maintenance personnel controls", recommendation: "Establish maintenance personnel controls" },
        { id: "MA-6", control: "Timely Maintenance", status: "gap", details: "Timely maintenance procedures", recommendation: "Implement timely maintenance procedures" }
      ]
    },
    {
      name: "Media Protection (MP)",
      description: "Protect information system media",
      results: [
        { id: "MP-1", control: "Media Protection Policy and Procedures", status: "gap", details: "Media protection policy", recommendation: "Develop media protection policy" },
        { id: "MP-2", control: "Media Access", status: "gap", details: "Media access controls", recommendation: "Implement media access controls" },
        { id: "MP-3", control: "Media Marking", status: "gap", details: "Media marking procedures", recommendation: "Implement media marking procedures" },
        { id: "MP-4", control: "Media Storage", status: "gap", details: "Media storage controls", recommendation: "Implement media storage controls" },
        { id: "MP-5", control: "Media Transport", status: "gap", details: "Media transport controls", recommendation: "Implement media transport controls" },
        { id: "MP-6", control: "Media Sanitization", status: "gap", details: "Media sanitization procedures", recommendation: "Implement media sanitization procedures" },
        { id: "MP-7", control: "Media Use", status: "gap", details: "Media use controls", recommendation: "Implement media use controls" }
      ]
    },
    {
      name: "System and Communications Protection (SC)",
      description: "Monitor, control, and protect communications",
      results: [
        { id: "SC-1", control: "System and Communications Protection Policy and Procedures", status: "gap", details: "SC policy documentation", recommendation: "Develop system and communications protection policy" },
        { id: "SC-2", control: "Application Partitioning", status: "gap", details: "Application partitioning", recommendation: "Implement application partitioning" },
        { id: "SC-3", control: "Security Function Isolation", status: "gap", details: "Security function isolation", recommendation: "Implement security function isolation" },
        { id: "SC-4", control: "Information in Shared System Resources", status: "gap", details: "Shared resource protection", recommendation: "Protect information in shared resources" },
        { id: "SC-5", control: "Denial of Service Protection", status: "gap", details: "DoS protection", recommendation: "Implement denial of service protection" },
        { id: "SC-7", control: "Boundary Protection", status: "gap", details: "Boundary protection", recommendation: "Implement boundary protection mechanisms" },
        { id: "SC-8", control: "Transmission Confidentiality and Integrity", status: "gap", details: "Transmission protection", recommendation: "Implement transmission confidentiality and integrity" },
        { id: "SC-9", control: "Transmission Confidentiality", status: "gap", details: "Transmission confidentiality", recommendation: "Implement transmission confidentiality" },
        { id: "SC-10", control: "Network Disconnect", status: "gap", details: "Network disconnect capability", recommendation: "Implement network disconnect capability" },
        { id: "SC-11", control: "Trusted Path", status: "gap", details: "Trusted path implementation", recommendation: "Implement trusted path mechanisms" },
        { id: "SC-12", control: "Cryptographic Key Establishment and Management", status: "gap", details: "Cryptographic key management", recommendation: "Implement cryptographic key management" },
        { id: "SC-13", control: "Cryptographic Protection", status: "gap", details: "Cryptographic protection", recommendation: "Implement cryptographic protection" },
        { id: "SC-15", control: "Collaborative Computing Devices", status: "gap", details: "Collaborative computing controls", recommendation: "Implement collaborative computing controls" },
        { id: "SC-17", control: "Public Key Infrastructure Certificates", status: "gap", details: "PKI certificate management", recommendation: "Implement PKI certificate management" },
        { id: "SC-18", control: "Mobile Code", status: "gap", details: "Mobile code controls", recommendation: "Implement mobile code controls" },
        { id: "SC-19", control: "Voice Over Internet Protocol", status: "gap", details: "VoIP security controls", recommendation: "Implement VoIP security controls" },
        { id: "SC-20", control: "Secure Name / Address Resolution Service", status: "gap", details: "Secure name resolution", recommendation: "Implement secure name resolution service" },
        { id: "SC-21", control: "Secure Name / Address Resolution Service (Recursive or Caching Resolver)", status: "gap", details: "Secure recursive resolution", recommendation: "Implement secure recursive resolution" },
        { id: "SC-22", control: "Architecture and Provisioning for Name / Address Resolution Service", status: "gap", details: "Name resolution architecture", recommendation: "Implement secure name resolution architecture" },
        { id: "SC-23", control: "Session Authenticity", status: "gap", details: "Session authenticity", recommendation: "Implement session authenticity mechanisms" },
        { id: "SC-24", control: "Fail in Known State", status: "gap", details: "Fail in known state", recommendation: "Implement fail in known state mechanisms" },
        { id: "SC-25", control: "Thin Nodes", status: "gap", details: "Thin node implementation", recommendation: "Implement thin node architecture" },
        { id: "SC-26", control: "Honeypots", status: "gap", details: "Honeypot implementation", recommendation: "Implement honeypot mechanisms" },
        { id: "SC-27", control: "Platform-Independent Applications", status: "gap", details: "Platform-independent applications", recommendation: "Implement platform-independent applications" },
        { id: "SC-28", control: "Protection of Information at Rest", status: "gap", details: "Information at rest protection", recommendation: "Implement information at rest protection" },
        { id: "SC-29", control: "Heterogeneity", status: "gap", details: "System heterogeneity", recommendation: "Implement system heterogeneity" },
        { id: "SC-30", control: "Virtualization Techniques", status: "gap", details: "Virtualization security", recommendation: "Implement virtualization security controls" },
        { id: "SC-31", control: "Covert Channel Analysis", status: "gap", details: "Covert channel analysis", recommendation: "Implement covert channel analysis" },
        { id: "SC-32", control: "Information System Partitioning", status: "gap", details: "System partitioning", recommendation: "Implement system partitioning" },
        { id: "SC-33", control: "Transmission Preparation Integrity", status: "gap", details: "Transmission preparation integrity", recommendation: "Implement transmission preparation integrity" },
        { id: "SC-34", control: "Non-Modifiable Executables", status: "gap", details: "Non-modifiable executables", recommendation: "Implement non-modifiable executables" },
        { id: "SC-35", control: "Honeyclients", status: "gap", details: "Honeyclient implementation", recommendation: "Implement honeyclient mechanisms" },
        { id: "SC-36", control: "Distributed Processing and Storage", status: "gap", details: "Distributed processing security", recommendation: "Implement distributed processing security" },
        { id: "SC-37", control: "Out-of-Band Channels", status: "gap", details: "Out-of-band channel security", recommendation: "Implement out-of-band channel security" },
        { id: "SC-38", control: "Operations Security", status: "gap", details: "Operations security", recommendation: "Implement operations security" },
        { id: "SC-39", control: "Process Isolation", status: "gap", details: "Process isolation", recommendation: "Implement process isolation" },
        { id: "SC-40", control: "Wireless Link Protection", status: "gap", details: "Wireless link protection", recommendation: "Implement wireless link protection" },
        { id: "SC-41", control: "Port and I/O Device Access", status: "gap", details: "Port and I/O device access", recommendation: "Implement port and I/O device access controls" },
        { id: "SC-42", control: "Sensor Capability and Data", status: "gap", details: "Sensor capability and data", recommendation: "Implement sensor capability and data controls" },
        { id: "SC-43", control: "Usage Restrictions", status: "gap", details: "Usage restrictions", recommendation: "Implement usage restrictions" },
        { id: "SC-44", control: "Detonation Chambers", status: "gap", details: "Detonation chamber implementation", recommendation: "Implement detonation chamber mechanisms" }
      ]
    }
  ]
};

// Export all frameworks
export const allFrameworks = {
  "NIST CSF": nistCSF,
  "NIST 800-53": nist80053
};
