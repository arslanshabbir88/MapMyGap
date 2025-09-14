// NIST Cybersecurity Framework (CSF) - Comprehensive Controls
export const nistCSF = {
  name: "NIST Cybersecurity Framework (CSF)",
  description: "A voluntary framework for managing and reducing cybersecurity risk",
  categories: [
    {
      name: "IDENTIFY",
      description: "Develop an organizational understanding to manage cybersecurity risk",
      results: [
        // Asset Management (ID.AM) - 6 controls
        { id: "ID.AM-1", control: "Physical devices and systems within the organization are inventoried", status: "gap", details: "Physical asset inventory not maintained", recommendation: "Implement comprehensive physical device and system inventory" },
        { id: "ID.AM-2", control: "Software platforms and applications within the organization are inventoried", status: "gap", details: "Software inventory not maintained", recommendation: "Deploy software discovery and inventory tools" },
        { id: "ID.AM-3", control: "Organizational communication and data flows are mapped", status: "gap", details: "Data flow mapping not performed", recommendation: "Create data flow diagrams and communication maps" },
        { id: "ID.AM-4", control: "External information systems are catalogued", status: "gap", details: "External system catalog not maintained", recommendation: "Document all external system connections and dependencies" },
        { id: "ID.AM-5", control: "Resources are prioritized based on their classification", status: "gap", details: "Resource prioritization not implemented", recommendation: "Implement risk-based resource classification system" },
        { id: "ID.AM-6", control: "Cybersecurity roles and responsibilities are established", status: "gap", details: "Cybersecurity roles not defined", recommendation: "Define and document cybersecurity roles and responsibilities" },
        
        // Risk Assessment (ID.RA) - 5 controls
        { id: "ID.RA-1", control: "Asset vulnerabilities are identified and documented", status: "gap", details: "Vulnerability identification not performed", recommendation: "Implement vulnerability assessment process" },
        { id: "ID.RA-2", control: "Cyber threat intelligence is received from information sharing forums", status: "gap", details: "Threat intelligence sharing not implemented", recommendation: "Participate in threat intelligence sharing" },
        { id: "ID.RA-3", control: "Threats to assets are identified and documented", status: "gap", details: "Threat identification not performed", recommendation: "Document identified threats to assets" },
        { id: "ID.RA-4", control: "Potential business impacts are identified", status: "gap", details: "Business impact assessment not performed", recommendation: "Assess potential business impacts" },
        { id: "ID.RA-5", control: "Risks are identified and documented", status: "gap", details: "Risk identification not performed", recommendation: "Document identified risks" },
        
        // Improvement (ID.IM) - 3 controls
        { id: "ID.IM-1", control: "Cybersecurity risk management processes are established", status: "gap", details: "Risk management processes not established", recommendation: "Establish formal risk management processes" },
        { id: "ID.IM-2", control: "Cybersecurity risk management processes are updated", status: "gap", details: "Risk process updates not implemented", recommendation: "Establish process for updating risk management" },
        { id: "ID.IM-3", control: "Cybersecurity risk management processes are improved", status: "gap", details: "Risk process improvement not implemented", recommendation: "Implement continuous improvement for risk management processes" }
      ]
    },
    {
      name: "PROTECT",
      description: "Develop and implement appropriate safeguards to ensure delivery of critical services",
      results: [
        // Identity Management, Authentication, and Access Control (PR.AC) - 7 controls
        { id: "PR.AC-1", control: "Identities and credentials are managed", status: "gap", details: "Identity and credential management not implemented", recommendation: "Implement centralized identity and credential management system" },
        { id: "PR.AC-2", control: "Physical access is controlled", status: "gap", details: "Physical access controls not implemented", recommendation: "Deploy physical access control systems" },
        { id: "PR.AC-3", control: "Remote access is managed", status: "gap", details: "Remote access management not implemented", recommendation: "Implement secure remote access solutions" },
        { id: "PR.AC-4", control: "Access permissions are managed", status: "gap", details: "Access permission management not implemented", recommendation: "Establish role-based access control system" },
        { id: "PR.AC-5", control: "Network integrity is protected", status: "gap", details: "Network integrity protection not implemented", recommendation: "Deploy network monitoring and protection tools" },
        { id: "PR.AC-6", control: "Identities are proofed and bound", status: "gap", details: "Identity proofing and binding not implemented", recommendation: "Implement multi-factor authentication and identity verification" },
        { id: "PR.AC-7", control: "Users, devices, and other assets are authenticated", status: "gap", details: "Authentication systems not implemented", recommendation: "Deploy enterprise authentication solution" },
        
        // Awareness and Training (PR.AT) - 5 controls
        { id: "PR.AT-1", control: "All users are informed and trained", status: "gap", details: "User training and awareness not implemented", recommendation: "Implement comprehensive user training program" },
        { id: "PR.AT-2", control: "Privileged users understand roles and responsibilities", status: "gap", details: "Privileged user training not implemented", recommendation: "Train privileged users on roles and responsibilities" },
        { id: "PR.AT-3", control: "Third-party stakeholders understand roles and responsibilities", status: "gap", details: "Third-party training not implemented", recommendation: "Train third-party stakeholders on roles" },
        { id: "PR.AT-4", control: "Senior executives understand roles and responsibilities", status: "gap", details: "Executive training not implemented", recommendation: "Train executives on cybersecurity roles" },
        { id: "PR.AT-5", control: "Physical and security personnel understand roles and responsibilities", status: "gap", details: "Security personnel training not implemented", recommendation: "Train security personnel on roles" },
        
        // Data Security (PR.DS) - 8 controls
        { id: "PR.DS-1", control: "Data-at-rest is protected", status: "gap", details: "Data-at-rest protection not implemented", recommendation: "Implement data-at-rest encryption" },
        { id: "PR.DS-2", control: "Data-in-transit is protected", status: "gap", details: "Data-in-transit protection not implemented", recommendation: "Implement data-in-transit encryption" },
        { id: "PR.DS-3", control: "Assets are formally managed", status: "gap", details: "Asset management not implemented", recommendation: "Implement formal asset management process" },
        { id: "PR.DS-4", control: "Adequate capacity is ensured", status: "gap", details: "Capacity management not implemented", recommendation: "Implement capacity management processes" },
        { id: "PR.DS-5", control: "Protections against data leaks are implemented", status: "gap", details: "Data leak prevention not implemented", recommendation: "Implement data leak prevention tools" },
        { id: "PR.DS-6", control: "Integrity checking mechanisms are used", status: "gap", details: "Integrity checking not implemented", recommendation: "Implement data integrity checking mechanisms" },
        { id: "PR.DS-7", control: "Development and testing environments are separate", status: "gap", details: "Environment separation not implemented", recommendation: "Separate development and testing environments" },
        { id: "PR.DS-8", control: "Integrity checking mechanisms are used", status: "gap", details: "Integrity checking mechanisms not implemented", recommendation: "Implement integrity checking mechanisms" },
        
        // Platform Security (PR.PT) - 4 controls
        { id: "PR.PT-1", control: "Audit/log records are determined", status: "gap", details: "Audit log determination not implemented", recommendation: "Determine required audit log records" },
        { id: "PR.PT-2", control: "Removable media is protected", status: "gap", details: "Removable media protection not implemented", recommendation: "Implement removable media protection" },
        { id: "PR.PT-3", control: "Access to systems and assets is controlled", status: "gap", details: "System access control not implemented", recommendation: "Implement system access controls" },
        { id: "PR.PT-4", control: "Communications and control networks are protected", status: "gap", details: "Network protection not implemented", recommendation: "Protect communications and control networks" },
        
        // Technology Infrastructure Resilience (PR.IT) - 4 controls
        { id: "PR.IT-1", control: "Technology infrastructure resilience is maintained", status: "gap", details: "Infrastructure resilience not maintained", recommendation: "Implement technology infrastructure resilience measures" },
        { id: "PR.IT-2", control: "Technology infrastructure resilience is tested", status: "gap", details: "Infrastructure resilience testing not performed", recommendation: "Test technology infrastructure resilience regularly" },
        { id: "PR.IT-3", control: "Technology infrastructure resilience is improved", status: "gap", details: "Infrastructure resilience improvement not implemented", recommendation: "Implement continuous improvement for infrastructure resilience" },
        { id: "PR.IT-4", control: "Technology infrastructure resilience is communicated", status: "gap", details: "Infrastructure resilience communication not implemented", recommendation: "Communicate infrastructure resilience status and improvements" }
      ]
    },
    {
      name: "DETECT",
      description: "Develop and implement appropriate activities to identify the occurrence of a cybersecurity event",
      results: [
        // Continuous Monitoring (DE.CM) - 8 controls
        { id: "DE.CM-1", control: "The network is monitored to detect potential cybersecurity events", status: "gap", details: "Network monitoring not implemented", recommendation: "Implement network monitoring for cybersecurity events" },
        { id: "DE.CM-2", control: "The physical environment is monitored to detect potential cybersecurity events", status: "gap", details: "Physical environment monitoring not implemented", recommendation: "Implement physical environment monitoring" },
        { id: "DE.CM-3", control: "Personnel activity is monitored to detect potential cybersecurity events", status: "gap", details: "Personnel activity monitoring not implemented", recommendation: "Implement personnel activity monitoring" },
        { id: "DE.CM-4", control: "Malicious code is detected", status: "gap", details: "Malicious code detection not implemented", recommendation: "Implement malicious code detection tools" },
        { id: "DE.CM-5", control: "Unauthorized mobile code is detected", status: "gap", details: "Unauthorized mobile code detection not implemented", recommendation: "Implement unauthorized mobile code detection" },
        { id: "DE.CM-6", control: "External service provider activity is monitored", status: "gap", details: "External provider monitoring not implemented", recommendation: "Monitor external service provider activity" },
        { id: "DE.CM-7", control: "Monitoring for unauthorized personnel, connections, devices, and software", status: "gap", details: "Unauthorized activity monitoring not implemented", recommendation: "Implement monitoring for unauthorized activities" },
        { id: "DE.CM-8", control: "Vulnerability scans are performed", status: "gap", details: "Vulnerability scanning not performed", recommendation: "Perform regular vulnerability scans" },
        
        // Adverse Event Analysis (DE.AE) - 5 controls
        { id: "DE.AE-1", control: "Baseline network operations are established", status: "gap", details: "Network baseline not established", recommendation: "Establish network performance and behavior baselines" },
        { id: "DE.AE-2", control: "Detected events are analyzed", status: "gap", details: "Event analysis not performed", recommendation: "Implement security event correlation and analysis" },
        { id: "DE.AE-3", control: "Event data are collected and correlated", status: "gap", details: "Data correlation not implemented", recommendation: "Deploy security information and event management system" },
        { id: "DE.AE-4", control: "Impact of events is determined", status: "gap", details: "Impact assessment not performed", recommendation: "Establish incident impact assessment procedures" },
        { id: "DE.AE-5", control: "Incident alert thresholds are established", status: "gap", details: "Alert thresholds not established", recommendation: "Define and configure security alert thresholds" }
      ]
    },
    {
      name: "RESPOND",
      description: "Develop and implement appropriate activities to take action regarding a detected cybersecurity incident",
      results: [
        // Management (RS.MA) - 3 controls
        { id: "RS.MA-1", control: "Response plan is executed during or after incident", status: "gap", details: "Incident response execution not implemented", recommendation: "Develop and test incident response procedures" },
        { id: "RS.MA-2", control: "Response plan is updated", status: "gap", details: "Response plan updates not implemented", recommendation: "Update response plans based on lessons learned" },
        { id: "RS.MA-3", control: "Response plan is tested", status: "gap", details: "Response plan testing not performed", recommendation: "Test response plans regularly" },
        
        // Analysis (RS.AN) - 5 controls
        { id: "RS.AN-1", control: "Notifications from detection systems are investigated", status: "gap", details: "Detection notification investigation not performed", recommendation: "Investigate detection system notifications" },
        { id: "RS.AN-2", control: "The impact of the incident is understood", status: "gap", details: "Incident impact understanding not performed", recommendation: "Understand incident impact on organization" },
        { id: "RS.AN-3", control: "Forensics are performed", status: "gap", details: "Forensic analysis not performed", recommendation: "Perform forensic analysis when appropriate" },
        { id: "RS.AN-4", control: "Incidents are categorized", status: "gap", details: "Incident categorization not performed", recommendation: "Categorize incidents for appropriate response" },
        { id: "RS.AN-5", control: "Processes are established to receive, analyze and respond to vulnerabilities", status: "gap", details: "Vulnerability response processes not established", recommendation: "Establish vulnerability response processes" },
        
        // Reporting and Communication (RS.CO) - 5 controls
        { id: "RS.CO-1", control: "Personnel know their roles", status: "gap", details: "Response team training not provided", recommendation: "Train personnel on incident response roles" },
        { id: "RS.CO-2", control: "Events are reported consistent with criteria", status: "gap", details: "Event reporting not implemented", recommendation: "Establish event reporting criteria and procedures" },
        { id: "RS.CO-3", control: "Information is shared consistent with response plans", status: "gap", details: "Information sharing not implemented", recommendation: "Implement secure information sharing protocols" },
        { id: "RS.CO-4", control: "Coordination with stakeholders occurs", status: "gap", details: "Stakeholder coordination not implemented", recommendation: "Establish stakeholder communication procedures" },
        { id: "RS.CO-5", control: "Voluntary information sharing occurs with external stakeholders", status: "gap", details: "External sharing not implemented", recommendation: "Develop external information sharing agreements" },
        
        // Mitigation (RS.MI) - 5 controls
        { id: "RS.MI-1", control: "Incidents are contained", status: "gap", details: "Incident containment not implemented", recommendation: "Contain incidents to prevent further damage" },
        { id: "RS.MI-2", control: "Incidents are mitigated", status: "gap", details: "Incident mitigation not implemented", recommendation: "Mitigate incidents to reduce impact" },
        { id: "RS.MI-3", control: "Newly identified vulnerabilities are mitigated or documented as accepted risks", status: "gap", details: "Vulnerability mitigation not implemented", recommendation: "Mitigate or document new vulnerabilities" },
        { id: "RS.MI-4", control: "Incident response activities are coordinated", status: "gap", details: "Response coordination not implemented", recommendation: "Coordinate incident response activities" },
        { id: "RS.MI-5", control: "Incident response activities are improved", status: "gap", details: "Response improvement not implemented", recommendation: "Implement continuous improvement for incident response" }
      ]
    },
    {
      name: "RECOVER",
      description: "Develop and implement appropriate activities to maintain plans for resilience",
      results: [
        // Incident Recovery Plan Execution (RC.RP) - 6 controls
        { id: "RC.RP-1", control: "Recovery plan is executed during or after incident", status: "gap", details: "Recovery execution not implemented", recommendation: "Develop and test disaster recovery procedures" },
        { id: "RC.RP-2", control: "Recovery plan is updated", status: "gap", details: "Recovery plan updates not implemented", recommendation: "Update recovery plans based on lessons learned" },
        { id: "RC.RP-3", control: "The integrity of backups and other restoration assets is verified before using them for restoration", status: "gap", details: "Backup integrity verification not performed", recommendation: "Verify backup and restoration asset integrity before use" },
        { id: "RC.RP-4", control: "Critical mission functions and cybersecurity risk management are considered to establish post-incident operational norms", status: "gap", details: "Post-incident operational norms not established", recommendation: "Establish post-incident operational norms considering critical functions" },
        { id: "RC.RP-5", control: "The integrity of restored assets is verified, systems and services are restored, and normal operating status is confirmed", status: "gap", details: "Asset restoration verification not performed", recommendation: "Verify restored asset integrity and confirm normal operating status" },
        { id: "RC.RP-6", control: "The end of incident recovery is declared based on criteria, and incident-related documentation is completed", status: "gap", details: "Recovery completion declaration not implemented", recommendation: "Establish criteria for declaring recovery completion and document incidents" },
        
        // Incident Recovery Communication (RC.CO) - 4 controls
        { id: "RC.CO-1", control: "Recovery activities are coordinated with internal and external parties", status: "gap", details: "Recovery coordination not implemented", recommendation: "Coordinate recovery activities with internal and external parties" },
        { id: "RC.CO-2", control: "Recovery activities and progress in restoring operational capabilities are communicated to designated internal and external stakeholders", status: "gap", details: "Recovery progress communication not implemented", recommendation: "Communicate recovery activities and progress to stakeholders" },
        { id: "RC.CO-3", control: "Public updates on incident recovery are shared using approved methods and messaging", status: "gap", details: "Public recovery updates not implemented", recommendation: "Share public updates on incident recovery using approved methods" },
        { id: "RC.CO-4", control: "Recovery activities are communicated to external stakeholders", status: "gap", details: "External stakeholder communication not implemented", recommendation: "Communicate recovery activities to external stakeholders" }
      ]
    },
    {
      name: "GOVERN",
      description: "Establish, communicate, and monitor the organization's cybersecurity risk management strategy, expectations, and policies",
      results: [
        // Organizational Context (GV.OC)
        { id: "GV.OC-1", control: "The organization's mission, objectives, stakeholders, and obligations are understood and communicated", status: "gap", details: "Organizational context understanding", recommendation: "Document and communicate organizational mission, objectives, and stakeholder obligations" },
        { id: "GV.OC-2", control: "Legal, regulatory, and contractual requirements are understood and managed", status: "gap", details: "Legal and regulatory compliance", recommendation: "Establish processes to understand and manage legal, regulatory, and contractual requirements" },
        { id: "GV.OC-3", control: "The organization's role in the supply chain is understood and communicated", status: "gap", details: "Supply chain role identification", recommendation: "Document and communicate the organization's role and responsibilities in the supply chain" },
        { id: "GV.OC-4", control: "Dependencies and critical functions for delivery of services are identified and communicated", status: "gap", details: "Critical function identification", recommendation: "Identify and communicate dependencies and critical functions for service delivery" },
        { id: "GV.OC-5", control: "Outcomes, capabilities, and services that the organization depends on are understood and communicated", status: "gap", details: "External dependency identification", recommendation: "Identify and communicate external outcomes, capabilities, and services the organization depends on" },
        
        // Risk Management Strategy (GV.RM)
        { id: "GV.RM-1", control: "Risk management objectives are established and agreed to by organizational stakeholders", status: "gap", details: "Risk management objectives", recommendation: "Establish and gain stakeholder agreement on risk management objectives" },
        { id: "GV.RM-2", control: "Risk appetite and risk tolerance statements are established, communicated, and maintained", status: "gap", details: "Risk appetite and tolerance", recommendation: "Develop, communicate, and maintain risk appetite and tolerance statements" },
        { id: "GV.RM-3", control: "Cybersecurity risk management activities and outcomes are included in enterprise risk management processes", status: "gap", details: "Enterprise risk management integration", recommendation: "Integrate cybersecurity risk management into enterprise risk management processes" },
        { id: "GV.RM-4", control: "Strategic direction that describes appropriate risk response options is established and communicated", status: "gap", details: "Risk response strategy", recommendation: "Establish and communicate strategic direction for risk response options" },
        { id: "GV.RM-5", control: "Lines of communication across the organization are established for cybersecurity risks, including risks from suppliers and other third parties", status: "gap", details: "Risk communication channels", recommendation: "Establish communication channels for cybersecurity risks across the organization and with third parties" },
        { id: "GV.RM-6", control: "A standardized method for calculating, documenting, categorizing, and prioritizing cybersecurity risks is established and communicated", status: "gap", details: "Risk assessment methodology", recommendation: "Develop and communicate standardized risk assessment methodology" },
        { id: "GV.RM-7", control: "Strategic opportunities (i.e., positive risks) are characterized and are included in organizational cybersecurity risk discussions", status: "gap", details: "Positive risk management", recommendation: "Include strategic opportunities and positive risks in cybersecurity risk discussions" },
        
        // Roles, Responsibilities, and Authorities (GV.RR)
        { id: "GV.RR-1", control: "Organizational leadership is responsible and accountable for cybersecurity risk and fosters a culture that is risk-aware, ethical, and continually improving", status: "gap", details: "Leadership accountability", recommendation: "Establish leadership accountability for cybersecurity risk and foster risk-aware culture" },
        { id: "GV.RR-2", control: "Roles, responsibilities, and authorities related to cybersecurity risk management are established, communicated, understood, and enforced", status: "gap", details: "Role definition and enforcement", recommendation: "Define, communicate, and enforce cybersecurity risk management roles and responsibilities" },
        { id: "GV.RR-3", control: "Adequate resources are allocated commensurate with the cybersecurity risk strategy, roles, responsibilities, and policies", status: "gap", details: "Resource allocation", recommendation: "Allocate adequate resources to support cybersecurity risk management strategy" },
        { id: "GV.RR-4", control: "Cybersecurity is included in human resources practices", status: "gap", details: "HR cybersecurity integration", recommendation: "Integrate cybersecurity considerations into human resources practices" },
        
        // Policy (GV.PO)
        { id: "GV.PO-1", control: "Policy for managing cybersecurity risks is established based on organizational context, cybersecurity strategy, and priorities and is communicated and enforced", status: "gap", details: "Cybersecurity policy establishment", recommendation: "Develop, communicate, and enforce cybersecurity risk management policy" },
        { id: "GV.PO-2", control: "Policy for managing cybersecurity risks is reviewed, updated, communicated, and enforced to reflect changes in requirements, threats, technology, and organizational mission", status: "gap", details: "Policy maintenance", recommendation: "Establish process for regular policy review, updates, and communication" },
        
        // Oversight (GV.OV)
        { id: "GV.OV-1", control: "Cybersecurity risk management strategy outcomes are reviewed to inform and adjust strategy and direction", status: "gap", details: "Strategy outcome review", recommendation: "Implement regular review of cybersecurity risk management strategy outcomes" },
        { id: "GV.OV-2", control: "The cybersecurity risk management strategy is reviewed and adjusted to ensure coverage of organizational requirements and risks", status: "gap", details: "Strategy adjustment", recommendation: "Review and adjust cybersecurity risk management strategy to ensure comprehensive coverage" },
        
        // Cybersecurity Supply Chain Risk Management (GV.SC)
        { id: "GV.SC-1", control: "Processes to identify, assess, and manage supply chain risks are established and implemented", status: "gap", details: "Supply chain risk management", recommendation: "Establish and implement supply chain risk identification, assessment, and management processes" },
        { id: "GV.SC-2", control: "Suppliers and third-party partners are evaluated and selected based on their ability to meet cybersecurity requirements", status: "gap", details: "Supplier evaluation", recommendation: "Evaluate and select suppliers based on cybersecurity capability" },
        { id: "GV.SC-3", control: "Contracts with suppliers and third-party partners include cybersecurity requirements", status: "gap", details: "Contract cybersecurity requirements", recommendation: "Include cybersecurity requirements in supplier and third-party contracts" },
        { id: "GV.SC-4", control: "Supply chain risks are monitored and managed throughout the supplier relationship", status: "gap", details: "Ongoing supply chain monitoring", recommendation: "Implement ongoing monitoring and management of supply chain risks" }
      ]
    }
  ]
};

// NIST 800-53 Controls - Comprehensive Controls
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
