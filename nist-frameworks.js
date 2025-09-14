// NIST Cybersecurity Framework (CSF) - Comprehensive Controls
export const nistCSF = {
  name: "NIST Cybersecurity Framework (CSF)",
  description: "A voluntary framework for managing and reducing cybersecurity risk",
  categories: [
    {
      name: "IDENTIFY",
      description: "The organization's current cybersecurity risks are understood",
      results: [
        // Asset Management (ID.AM) - 7 controls
        { id: "ID.AM-01", control: "Inventories of hardware managed by the organization are maintained", status: "gap", details: "Hardware inventory not maintained", recommendation: "Implement comprehensive hardware inventory management system" },
        { id: "ID.AM-02", control: "Inventories of software, services, and systems managed by the organization are maintained", status: "gap", details: "Software inventory not maintained", recommendation: "Deploy software discovery and inventory tools for all managed systems" },
        { id: "ID.AM-03", control: "Representations of the organization's authorized network communication and internal and external network data flows are maintained", status: "gap", details: "Network data flow documentation not maintained", recommendation: "Create and maintain network communication and data flow diagrams" },
        { id: "ID.AM-04", control: "Inventories of services provided by suppliers are maintained", status: "gap", details: "Supplier service inventory not maintained", recommendation: "Document all services provided by suppliers and third parties" },
        { id: "ID.AM-05", control: "Assets are prioritized based on classification, criticality, resources, and impact on the mission", status: "gap", details: "Asset prioritization not implemented", recommendation: "Implement risk-based asset prioritization system" },
        { id: "ID.AM-07", control: "Inventories of data and corresponding metadata for designated data types are maintained", status: "gap", details: "Data inventory not maintained", recommendation: "Implement comprehensive data inventory and metadata management" },
        { id: "ID.AM-08", control: "Systems, hardware, software, services, and data are managed throughout their life cycles", status: "gap", details: "Lifecycle management not implemented", recommendation: "Implement comprehensive asset lifecycle management processes" },
        
        // Risk Assessment (ID.RA) - 10 controls
        { id: "ID.RA-01", control: "Vulnerabilities in assets are identified, validated, and recorded", status: "gap", details: "Vulnerability identification not performed", recommendation: "Implement vulnerability assessment and management process" },
        { id: "ID.RA-02", control: "Cyber threat intelligence is received from information sharing forums and sources", status: "gap", details: "Threat intelligence sharing not implemented", recommendation: "Participate in threat intelligence sharing forums and sources" },
        { id: "ID.RA-03", control: "Internal and external threats to the organization are identified and recorded", status: "gap", details: "Threat identification not performed", recommendation: "Implement threat identification and documentation process" },
        { id: "ID.RA-04", control: "Potential impacts and likelihoods of threats exploiting vulnerabilities are identified and recorded", status: "gap", details: "Risk impact assessment not performed", recommendation: "Implement risk impact and likelihood assessment process" },
        { id: "ID.RA-05", control: "Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk and inform risk response prioritization", status: "gap", details: "Risk analysis not performed", recommendation: "Implement comprehensive risk analysis and prioritization process" },
        { id: "ID.RA-06", control: "Risk responses are chosen, prioritized, planned, tracked, and communicated", status: "gap", details: "Risk response management not implemented", recommendation: "Implement risk response selection, planning, and tracking process" },
        { id: "ID.RA-07", control: "Changes and exceptions are managed, assessed for risk impact, recorded, and tracked", status: "gap", details: "Change and exception management not implemented", recommendation: "Implement change and exception risk assessment process" },
        { id: "ID.RA-08", control: "Processes for receiving, analyzing, and responding to vulnerability disclosures are established", status: "gap", details: "Vulnerability disclosure process not established", recommendation: "Establish vulnerability disclosure response process" },
        { id: "ID.RA-09", control: "The authenticity and integrity of hardware and software are assessed prior to acquisition and use", status: "gap", details: "Hardware/software authenticity assessment not performed", recommendation: "Implement pre-acquisition authenticity and integrity assessment" },
        { id: "ID.RA-10", control: "Critical suppliers are assessed prior to acquisition", status: "gap", details: "Supplier assessment not performed", recommendation: "Implement critical supplier pre-acquisition assessment process" },
        
        // Improvement (ID.IM) - 4 controls
        { id: "ID.IM-01", control: "Improvements are identified from evaluations", status: "gap", details: "Evaluation-based improvements not identified", recommendation: "Implement process to identify improvements from evaluations" },
        { id: "ID.IM-02", control: "Improvements are identified from security tests and exercises, including those done in coordination with suppliers and relevant third parties", status: "gap", details: "Test-based improvements not identified", recommendation: "Implement process to identify improvements from security tests and exercises" },
        { id: "ID.IM-03", control: "Improvements are identified from execution of operational processes, procedures, and activities", status: "gap", details: "Operational improvements not identified", recommendation: "Implement process to identify improvements from operational execution" },
        { id: "ID.IM-04", control: "Incident response plans and other cybersecurity plans are improved", status: "gap", details: "Plan improvements not implemented", recommendation: "Implement process to improve incident response and cybersecurity plans" }
      ]
    },
    {
      name: "PROTECT",
      description: "Develop and implement appropriate safeguards to ensure delivery of critical services",
      results: [
        // Identity Management, Authentication, and Access Control (PR.AC) - 7 controls
        { id: "PR.AC-01", control: "Identities and credentials are managed", status: "gap", details: "Identity and credential management not implemented", recommendation: "Implement centralized identity and credential management system" },
        { id: "PR.AC-02", control: "Physical access is controlled", status: "gap", details: "Physical access controls not implemented", recommendation: "Deploy physical access control systems" },
        { id: "PR.AC-03", control: "Remote access is managed", status: "gap", details: "Remote access management not implemented", recommendation: "Implement secure remote access solutions" },
        { id: "PR.AC-04", control: "Access permissions are managed", status: "gap", details: "Access permission management not implemented", recommendation: "Establish role-based access control system" },
        { id: "PR.AC-05", control: "Network integrity is protected", status: "gap", details: "Network integrity protection not implemented", recommendation: "Deploy network monitoring and protection tools" },
        { id: "PR.AC-06", control: "Identities are proofed and bound", status: "gap", details: "Identity proofing and binding not implemented", recommendation: "Implement multi-factor authentication and identity verification" },
        { id: "PR.AC-07", control: "Users, devices, and other assets are authenticated", status: "gap", details: "Authentication systems not implemented", recommendation: "Deploy enterprise authentication solution" },
        
        // Awareness and Training (PR.AT) - 5 controls
        { id: "PR.AT-01", control: "All users are informed and trained", status: "gap", details: "User training and awareness not implemented", recommendation: "Implement comprehensive user training program" },
        { id: "PR.AT-02", control: "Privileged users understand roles and responsibilities", status: "gap", details: "Privileged user training not implemented", recommendation: "Train privileged users on roles and responsibilities" },
        { id: "PR.AT-03", control: "Third-party stakeholders understand roles and responsibilities", status: "gap", details: "Third-party training not implemented", recommendation: "Train third-party stakeholders on roles" },
        { id: "PR.AT-04", control: "Senior executives understand roles and responsibilities", status: "gap", details: "Executive training not implemented", recommendation: "Train executives on cybersecurity roles" },
        { id: "PR.AT-05", control: "Physical and security personnel understand roles and responsibilities", status: "gap", details: "Security personnel training not implemented", recommendation: "Train security personnel on roles" },
        
        // Data Security (PR.DS) - 8 controls
        { id: "PR.DS-01", control: "Data-at-rest is protected", status: "gap", details: "Data-at-rest protection not implemented", recommendation: "Implement data-at-rest encryption" },
        { id: "PR.DS-02", control: "Data-in-transit is protected", status: "gap", details: "Data-in-transit protection not implemented", recommendation: "Implement data-in-transit encryption" },
        { id: "PR.DS-03", control: "Assets are formally managed", status: "gap", details: "Asset management not implemented", recommendation: "Implement formal asset management process" },
        { id: "PR.DS-04", control: "Adequate capacity is ensured", status: "gap", details: "Capacity management not implemented", recommendation: "Implement capacity management processes" },
        { id: "PR.DS-05", control: "Protections against data leaks are implemented", status: "gap", details: "Data leak prevention not implemented", recommendation: "Implement data leak prevention tools" },
        { id: "PR.DS-06", control: "Integrity checking mechanisms are used", status: "gap", details: "Integrity checking not implemented", recommendation: "Implement data integrity checking mechanisms" },
        { id: "PR.DS-07", control: "Development and testing environments are separate", status: "gap", details: "Environment separation not implemented", recommendation: "Separate development and testing environments" },
        { id: "PR.DS-08", control: "Integrity checking mechanisms are used", status: "gap", details: "Integrity checking mechanisms not implemented", recommendation: "Implement integrity checking mechanisms" },
        
        // Platform Security (PR.PT) - 4 controls
        { id: "PR.PT-01", control: "Audit/log records are determined", status: "gap", details: "Audit log determination not implemented", recommendation: "Determine required audit log records" },
        { id: "PR.PT-02", control: "Removable media is protected", status: "gap", details: "Removable media protection not implemented", recommendation: "Implement removable media protection" },
        { id: "PR.PT-03", control: "Access to systems and assets is controlled", status: "gap", details: "System access control not implemented", recommendation: "Implement system access controls" },
        { id: "PR.PT-04", control: "Communications and control networks are protected", status: "gap", details: "Network protection not implemented", recommendation: "Protect communications and control networks" },
        
        // Technology Infrastructure Resilience (PR.IT) - 4 controls
        { id: "PR.IT-01", control: "Technology infrastructure resilience is maintained", status: "gap", details: "Infrastructure resilience not maintained", recommendation: "Implement technology infrastructure resilience measures" },
        { id: "PR.IT-02", control: "Technology infrastructure resilience is tested", status: "gap", details: "Infrastructure resilience testing not performed", recommendation: "Test technology infrastructure resilience regularly" },
        { id: "PR.IT-03", control: "Technology infrastructure resilience is improved", status: "gap", details: "Infrastructure resilience improvement not implemented", recommendation: "Implement continuous improvement for infrastructure resilience" },
        { id: "PR.IT-04", control: "Technology infrastructure resilience is communicated", status: "gap", details: "Infrastructure resilience communication not implemented", recommendation: "Communicate infrastructure resilience status and improvements" }
      ]
    },
    {
      name: "DETECT",
      description: "Develop and implement appropriate activities to identify the occurrence of a cybersecurity event",
      results: [
        // Continuous Monitoring (DE.CM) - 8 controls
        { id: "DE.CM-01", control: "The network is monitored to detect potential cybersecurity events", status: "gap", details: "Network monitoring not implemented", recommendation: "Implement network monitoring for cybersecurity events" },
        { id: "DE.CM-02", control: "The physical environment is monitored to detect potential cybersecurity events", status: "gap", details: "Physical environment monitoring not implemented", recommendation: "Implement physical environment monitoring" },
        { id: "DE.CM-03", control: "Personnel activity is monitored to detect potential cybersecurity events", status: "gap", details: "Personnel activity monitoring not implemented", recommendation: "Implement personnel activity monitoring" },
        { id: "DE.CM-04", control: "Malicious code is detected", status: "gap", details: "Malicious code detection not implemented", recommendation: "Implement malicious code detection tools" },
        { id: "DE.CM-05", control: "Unauthorized mobile code is detected", status: "gap", details: "Unauthorized mobile code detection not implemented", recommendation: "Implement unauthorized mobile code detection" },
        { id: "DE.CM-06", control: "External service provider activity is monitored", status: "gap", details: "External provider monitoring not implemented", recommendation: "Monitor external service provider activity" },
        { id: "DE.CM-07", control: "Monitoring for unauthorized personnel, connections, devices, and software", status: "gap", details: "Unauthorized activity monitoring not implemented", recommendation: "Implement monitoring for unauthorized activities" },
        { id: "DE.CM-08", control: "Vulnerability scans are performed", status: "gap", details: "Vulnerability scanning not performed", recommendation: "Perform regular vulnerability scans" },
        
        // Adverse Event Analysis (DE.AE) - 5 controls
        { id: "DE.AE-01", control: "Baseline network operations are established", status: "gap", details: "Network baseline not established", recommendation: "Establish network performance and behavior baselines" },
        { id: "DE.AE-02", control: "Detected events are analyzed", status: "gap", details: "Event analysis not performed", recommendation: "Implement security event correlation and analysis" },
        { id: "DE.AE-03", control: "Event data are collected and correlated", status: "gap", details: "Data correlation not implemented", recommendation: "Deploy security information and event management system" },
        { id: "DE.AE-04", control: "Impact of events is determined", status: "gap", details: "Impact assessment not performed", recommendation: "Establish incident impact assessment procedures" },
        { id: "DE.AE-05", control: "Incident alert thresholds are established", status: "gap", details: "Alert thresholds not established", recommendation: "Define and configure security alert thresholds" }
      ]
    },
    {
      name: "RESPOND",
      description: "Develop and implement appropriate activities to take action regarding a detected cybersecurity incident",
      results: [
        // Management (RS.MA) - 3 controls
        { id: "RS.MA-01", control: "Response plan is executed during or after incident", status: "gap", details: "Incident response execution not implemented", recommendation: "Develop and test incident response procedures" },
        { id: "RS.MA-02", control: "Response plan is updated", status: "gap", details: "Response plan updates not implemented", recommendation: "Update response plans based on lessons learned" },
        { id: "RS.MA-03", control: "Response plan is tested", status: "gap", details: "Response plan testing not performed", recommendation: "Test response plans regularly" },
        
        // Analysis (RS.AN) - 5 controls
        { id: "RS.AN-01", control: "Notifications from detection systems are investigated", status: "gap", details: "Detection notification investigation not performed", recommendation: "Investigate detection system notifications" },
        { id: "RS.AN-02", control: "The impact of the incident is understood", status: "gap", details: "Incident impact understanding not performed", recommendation: "Understand incident impact on organization" },
        { id: "RS.AN-03", control: "Forensics are performed", status: "gap", details: "Forensic analysis not performed", recommendation: "Perform forensic analysis when appropriate" },
        { id: "RS.AN-04", control: "Incidents are categorized", status: "gap", details: "Incident categorization not performed", recommendation: "Categorize incidents for appropriate response" },
        { id: "RS.AN-05", control: "Processes are established to receive, analyze and respond to vulnerabilities", status: "gap", details: "Vulnerability response processes not established", recommendation: "Establish vulnerability response processes" },
        
        // Reporting and Communication (RS.CO) - 5 controls
        { id: "RS.CO-01", control: "Personnel know their roles", status: "gap", details: "Response team training not provided", recommendation: "Train personnel on incident response roles" },
        { id: "RS.CO-02", control: "Events are reported consistent with criteria", status: "gap", details: "Event reporting not implemented", recommendation: "Establish event reporting criteria and procedures" },
        { id: "RS.CO-03", control: "Information is shared consistent with response plans", status: "gap", details: "Information sharing not implemented", recommendation: "Implement secure information sharing protocols" },
        { id: "RS.CO-04", control: "Coordination with stakeholders occurs", status: "gap", details: "Stakeholder coordination not implemented", recommendation: "Establish stakeholder communication procedures" },
        { id: "RS.CO-05", control: "Voluntary information sharing occurs with external stakeholders", status: "gap", details: "External sharing not implemented", recommendation: "Develop external information sharing agreements" },
        
        // Mitigation (RS.MI) - 5 controls
        { id: "RS.MI-01", control: "Incidents are contained", status: "gap", details: "Incident containment not implemented", recommendation: "Contain incidents to prevent further damage" },
        { id: "RS.MI-02", control: "Incidents are mitigated", status: "gap", details: "Incident mitigation not implemented", recommendation: "Mitigate incidents to reduce impact" },
        { id: "RS.MI-03", control: "Newly identified vulnerabilities are mitigated or documented as accepted risks", status: "gap", details: "Vulnerability mitigation not implemented", recommendation: "Mitigate or document new vulnerabilities" },
        { id: "RS.MI-04", control: "Incident response activities are coordinated", status: "gap", details: "Response coordination not implemented", recommendation: "Coordinate incident response activities" },
        { id: "RS.MI-05", control: "Incident response activities are improved", status: "gap", details: "Response improvement not implemented", recommendation: "Implement continuous improvement for incident response" }
      ]
    },
    {
      name: "RECOVER",
      description: "Develop and implement appropriate activities to maintain plans for resilience",
      results: [
        // Incident Recovery Plan Execution (RC.RP) - 6 controls
        { id: "RC.RP-01", control: "Recovery plan is executed during or after incident", status: "gap", details: "Recovery execution not implemented", recommendation: "Develop and test disaster recovery procedures" },
        { id: "RC.RP-02", control: "Recovery plan is updated", status: "gap", details: "Recovery plan updates not implemented", recommendation: "Update recovery plans based on lessons learned" },
        { id: "RC.RP-03", control: "The integrity of backups and other restoration assets is verified before using them for restoration", status: "gap", details: "Backup integrity verification not performed", recommendation: "Verify backup and restoration asset integrity before use" },
        { id: "RC.RP-04", control: "Critical mission functions and cybersecurity risk management are considered to establish post-incident operational norms", status: "gap", details: "Post-incident operational norms not established", recommendation: "Establish post-incident operational norms considering critical functions" },
        { id: "RC.RP-05", control: "The integrity of restored assets is verified, systems and services are restored, and normal operating status is confirmed", status: "gap", details: "Asset restoration verification not performed", recommendation: "Verify restored asset integrity and confirm normal operating status" },
        { id: "RC.RP-06", control: "The end of incident recovery is declared based on criteria, and incident-related documentation is completed", status: "gap", details: "Recovery completion declaration not implemented", recommendation: "Establish criteria for declaring recovery completion and document incidents" },
        
        // Incident Recovery Communication (RC.CO) - 4 controls
        { id: "RC.CO-01", control: "Recovery activities are coordinated with internal and external parties", status: "gap", details: "Recovery coordination not implemented", recommendation: "Coordinate recovery activities with internal and external parties" },
        { id: "RC.CO-02", control: "Recovery activities and progress in restoring operational capabilities are communicated to designated internal and external stakeholders", status: "gap", details: "Recovery progress communication not implemented", recommendation: "Communicate recovery activities and progress to stakeholders" },
        { id: "RC.CO-03", control: "Public updates on incident recovery are shared using approved methods and messaging", status: "gap", details: "Public recovery updates not implemented", recommendation: "Share public updates on incident recovery using approved methods" },
        { id: "RC.CO-04", control: "Recovery activities are communicated to external stakeholders", status: "gap", details: "External stakeholder communication not implemented", recommendation: "Communicate recovery activities to external stakeholders" }
      ]
    },
    {
      name: "GOVERN",
      description: "The organization's cybersecurity risk management strategy, expectations, and policy are established, communicated, and monitored",
      results: [
        // Organizational Context (GV.OC) - 5 controls
        { id: "GV.OC-01", control: "The organizational mission is understood and informs cybersecurity risk management", status: "gap", details: "Mission understanding not established", recommendation: "Establish understanding of organizational mission and its impact on cybersecurity risk management" },
        { id: "GV.OC-02", control: "Internal and external stakeholders are understood, and their needs and expectations regarding cybersecurity risk management are understood and considered", status: "gap", details: "Stakeholder understanding not established", recommendation: "Identify and understand internal and external stakeholders and their cybersecurity expectations" },
        { id: "GV.OC-03", control: "Legal, regulatory, and contractual requirements regarding cybersecurity — including privacy and civil liberties obligations — are understood and managed", status: "gap", details: "Legal requirements not managed", recommendation: "Establish process to understand and manage legal, regulatory, and contractual cybersecurity requirements" },
        { id: "GV.OC-04", control: "Critical objectives, capabilities, and services that external stakeholders depend on or expect from the organization are understood and communicated", status: "gap", details: "External dependencies not understood", recommendation: "Identify and communicate critical objectives, capabilities, and services expected by external stakeholders" },
        { id: "GV.OC-05", control: "Outcomes, capabilities, and services that the organization depends on are understood and communicated", status: "gap", details: "Internal dependencies not understood", recommendation: "Identify and communicate outcomes, capabilities, and services the organization depends on" },
        
        // Risk Management Strategy (GV.RM) - 7 controls
        { id: "GV.RM-01", control: "Risk management objectives are established and agreed to by organizational stakeholders", status: "gap", details: "Risk management objectives not established", recommendation: "Establish and gain stakeholder agreement on risk management objectives" },
        { id: "GV.RM-02", control: "Risk appetite and risk tolerance statements are established, communicated, and maintained", status: "gap", details: "Risk appetite and tolerance statements not established", recommendation: "Develop, communicate, and maintain risk appetite and tolerance statements" },
        { id: "GV.RM-03", control: "Cybersecurity risk management activities and outcomes are included in enterprise risk management processes", status: "gap", details: "Enterprise risk management integration not implemented", recommendation: "Integrate cybersecurity risk management into enterprise risk management processes" },
        { id: "GV.RM-04", control: "Strategic direction that describes appropriate risk response options is established and communicated", status: "gap", details: "Risk response strategy not established", recommendation: "Establish and communicate strategic direction for risk response options" },
        { id: "GV.RM-05", control: "Lines of communication across the organization are established for cybersecurity risks, including risks from suppliers and other third parties", status: "gap", details: "Risk communication channels not established", recommendation: "Establish communication channels for cybersecurity risks across the organization and with third parties" },
        { id: "GV.RM-06", control: "A standardized method for calculating, documenting, categorizing, and prioritizing cybersecurity risks is established and communicated", status: "gap", details: "Risk assessment methodology not established", recommendation: "Develop and communicate standardized risk assessment methodology" },
        { id: "GV.RM-07", control: "Strategic opportunities (i.e., positive risks) are characterized and are included in organizational cybersecurity risk discussions", status: "gap", details: "Positive risk management not implemented", recommendation: "Include strategic opportunities and positive risks in cybersecurity risk discussions" },
        
        // Roles, Responsibilities, and Authorities (GV.RR) - 4 controls
        { id: "GV.RR-01", control: "Organizational leadership is responsible and accountable for cybersecurity risk and fosters a culture that is risk-aware, ethical, and continually improving", status: "gap", details: "Leadership accountability not established", recommendation: "Establish leadership accountability for cybersecurity risk and foster risk-aware culture" },
        { id: "GV.RR-02", control: "Roles, responsibilities, and authorities related to cybersecurity risk management are established, communicated, understood, and enforced", status: "gap", details: "Role definition and enforcement not implemented", recommendation: "Define, communicate, and enforce cybersecurity risk management roles and responsibilities" },
        { id: "GV.RR-03", control: "Adequate resources are allocated commensurate with the cybersecurity risk strategy, roles, responsibilities, and policies", status: "gap", details: "Resource allocation not implemented", recommendation: "Allocate adequate resources to support cybersecurity risk management strategy" },
        { id: "GV.RR-04", control: "Cybersecurity is included in human resources practices", status: "gap", details: "HR cybersecurity integration not implemented", recommendation: "Integrate cybersecurity considerations into human resources practices" },
        
        // Policy (GV.PO) - 2 controls
        { id: "GV.PO-01", control: "Policy for managing cybersecurity risks is established based on organizational context, cybersecurity strategy, and priorities and is communicated and enforced", status: "gap", details: "Cybersecurity policy establishment not implemented", recommendation: "Develop, communicate, and enforce cybersecurity risk management policy" },
        { id: "GV.PO-02", control: "Policy for managing cybersecurity risks is reviewed, updated, communicated, and enforced to reflect changes in requirements, threats, technology, and organizational mission", status: "gap", details: "Policy maintenance not implemented", recommendation: "Establish process for regular policy review, updates, and communication" },
        
        // Oversight (GV.OV) - 3 controls
        { id: "GV.OV-01", control: "Cybersecurity risk management strategy outcomes are reviewed to inform and adjust strategy and direction", status: "gap", details: "Strategy outcome review not implemented", recommendation: "Implement regular review of cybersecurity risk management strategy outcomes" },
        { id: "GV.OV-02", control: "The cybersecurity risk management strategy is reviewed and adjusted to ensure coverage of organizational requirements and risks", status: "gap", details: "Strategy adjustment not implemented", recommendation: "Review and adjust cybersecurity risk management strategy to ensure comprehensive coverage" },
        { id: "GV.OV-03", control: "Organizational cybersecurity risk management performance is evaluated and reviewed for adjustments needed", status: "gap", details: "Performance evaluation not implemented", recommendation: "Implement regular evaluation and review of cybersecurity risk management performance" },
        
        // Cybersecurity Supply Chain Risk Management (GV.SC) - 10 controls
        { id: "GV.SC-01", control: "A cybersecurity supply chain risk management program, strategy, objectives, policies, and processes are established and agreed to by organizational stakeholders", status: "gap", details: "Supply chain risk management program not established", recommendation: "Establish comprehensive cybersecurity supply chain risk management program" },
        { id: "GV.SC-02", control: "Cybersecurity roles and responsibilities for suppliers, customers, and partners are established, communicated, and coordinated internally and externally", status: "gap", details: "Supplier roles not established", recommendation: "Establish and communicate cybersecurity roles for suppliers, customers, and partners" },
        { id: "GV.SC-03", control: "Cybersecurity supply chain risk management is integrated into cybersecurity and enterprise risk management, risk assessment, and improvement processes", status: "gap", details: "Supply chain integration not implemented", recommendation: "Integrate supply chain risk management into enterprise risk management processes" },
        { id: "GV.SC-04", control: "Suppliers are known and prioritized by criticality", status: "gap", details: "Supplier prioritization not implemented", recommendation: "Identify and prioritize suppliers by criticality" },
        { id: "GV.SC-05", control: "Requirements to address cybersecurity risks in supply chains are established, prioritized, and integrated into contracts and other types of agreements with suppliers and other relevant third parties", status: "gap", details: "Contract requirements not established", recommendation: "Establish and integrate cybersecurity requirements into supplier contracts" },
        { id: "GV.SC-06", control: "Planning and due diligence are performed to reduce risks before entering into formal supplier or other third-party relationships", status: "gap", details: "Due diligence not performed", recommendation: "Implement planning and due diligence processes for supplier relationships" },
        { id: "GV.SC-07", control: "The risks posed by a supplier, their products and services, and other third parties are understood, recorded, prioritized, assessed, responded to, and monitored over the course of the relationship", status: "gap", details: "Supplier risk monitoring not implemented", recommendation: "Implement ongoing monitoring and assessment of supplier risks" },
        { id: "GV.SC-08", control: "Relevant suppliers and other third parties are included in incident planning, response, and recovery activities", status: "gap", details: "Supplier incident involvement not implemented", recommendation: "Include suppliers in incident planning, response, and recovery activities" },
        { id: "GV.SC-09", control: "Supply chain security practices are integrated into cybersecurity and enterprise risk management programs, and their performance is monitored throughout the technology product and service life cycle", status: "gap", details: "Lifecycle monitoring not implemented", recommendation: "Integrate supply chain security practices and monitor throughout product lifecycle" },
        { id: "GV.SC-10", control: "Cybersecurity supply chain risk management plans include provisions for activities that occur after the conclusion of a partnership or service agreement", status: "gap", details: "Post-agreement provisions not established", recommendation: "Include post-agreement provisions in supply chain risk management plans" }
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
