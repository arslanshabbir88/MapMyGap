const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Mock API endpoint for local development
app.post('/analyze', async (req, res) => {
  try {
    const { fileContent, framework } = req.body;

    if (!fileContent || !framework) {
      return res.status(400).json({ error: 'Missing file content or framework.' });
    }

    // Framework data for local development
    const frameworkSourceData = {
      NIST_CSF: {
        categories: [
          { 
            name: 'Govern (GV)', 
            description: 'Establish and monitor the organization\'s cybersecurity risk management strategy, expectations, and policy.', 
            results: [
              { id: 'GV.RM-01', control: 'An organizational risk management strategy is established.'},
              { id: 'GV.SC-04', control: 'Cybersecurity is integrated into the organization\'s enterprise risk management portfolio.'}
            ]
          },
          { 
            name: 'Identify (ID)', 
            description: 'Understand the current assets, risks, and responsibilities.', 
            results: [
              { id: 'ID.AM-1', control: 'Physical devices and systems within the organization are inventoried.'},
              { id: 'ID.RA-1', control: 'Asset vulnerabilities are identified and documented.'},
              { id: 'ID.RA-5', control: 'Threats, both internal and external, are identified and documented.'}
            ]
          },
          { 
            name: 'Protect (PR)', 
            description: 'Implement safeguards to ensure delivery of critical services.', 
            results: [
              { id: 'PR.AC-4', control: 'Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties.'},
              { id: 'PR.AC-5', control: 'Identity and access are verified for all users, devices, and other assets.'},
              { id: 'PR.DS-2', control: 'Data-in-transit is protected.'}
            ]
          },
          { 
            name: 'Detect (DE)', 
            description: 'Discover and analyze cybersecurity events.', 
            results: [
              { id: 'DE.CM-1', control: 'Networks and systems are monitored to detect potential cybersecurity events.'},
              { id: 'DE.AE-2', control: 'The impact of events is analyzed.'}
            ]
          },
          { 
            name: 'Respond (RS)', 
            description: 'Take action regarding a detected cybersecurity incident.', 
            results: [
              { id: 'RS.RP-1', control: 'A response plan is executed.'},
              { id: 'RS.CO-2', control: 'Incidents are reported to appropriate internal and external stakeholders.'}
            ]
          },
          { 
            name: 'Recover (RC)', 
            description: 'Restore assets and operations affected by a cybersecurity incident.', 
            results: [
              { id: 'RC.RP-1', control: 'A recovery plan is executed.'},
              { id: 'RC.IM-2', control: 'Recovery plans incorporate lessons learned.'}
            ]
          }
        ]
      },
      NIST_800_53: {
        categories: [
          { 
            name: 'Access Control (AC)', 
            description: 'Limit system access to authorized users, processes acting on behalf of users, or devices.', 
            results: [
              { id: 'AC-1', control: 'Access Control Policy and Procedures'},
              { id: 'AC-2', control: 'Account Management'},
              { id: 'AC-3', control: 'Access Enforcement'},
              { id: 'AC-4', control: 'Information Flow Enforcement'}
            ]
          },
          { 
            name: 'Awareness and Training (AT)', 
            description: 'Ensure that managers and users of organizational systems are made aware of the security risks.', 
            results: [
              { id: 'AT-1', control: 'Awareness and Training Policy and Procedures'},
              { id: 'AT-2', control: 'Security Awareness Training'}
            ]
          },
          { 
            name: 'Configuration Management (CM)', 
            description: 'Establish and maintain baseline configurations and inventories of organizational systems.', 
            results: [
              { id: 'CM-1', control: 'Configuration Management Policy and Procedures'},
              { id: 'CM-2', control: 'Baseline Configuration'},
              { id: 'CM-8', control: 'System Component Inventory'}
            ]
          },
          { 
            name: 'Contingency Planning (CP)', 
            description: 'Establish, maintain, and effectively implement a contingency plan for the system.', 
            results: [
              { id: 'CP-1', control: 'Contingency Planning Policy and Procedures'},
              { id: 'CP-2', control: 'Contingency Plan'}
            ]
          },
          { 
            name: 'Identification and Authentication (IA)', 
            description: 'Identify and authenticate organizational users (or processes acting on behalf of users).', 
            results: [
              { id: 'IA-1', control: 'Identification and Authentication Policy and Procedures'},
              { id: 'IA-2', control: 'Identification and Authentication (Organizational Users)'}
            ]
          },
          { 
            name: 'Incident Response (IR)', 
            description: 'Establish an operational incident handling capability for organizational systems.', 
            results: [
              { id: 'IR-1', control: 'Incident Response Policy and Procedures'},
              { id: 'IR-8', control: 'Incident Response Plan'}
            ]
          },
          { 
            name: 'Risk Assessment (RA)', 
            description: 'Periodically assess the risk to organizational operations, assets, and individuals.', 
            results: [
              { id: 'RA-1', control: 'Risk Assessment Policy and Procedures'},
              { id: 'RA-3', control: 'Risk Assessment'}
            ]
          },
          { 
            name: 'System and Information Integrity (SI)', 
            description: 'Protect the integrity of information and systems.', 
            results: [
              { id: 'SI-1', control: 'System and Information Integrity Policy and Procedures'},
              { id: 'SI-2', control: 'Flaw Remediation'},
              { id: 'SI-4', control: 'Information System Monitoring'}
            ]
          }
        ]
      }
    };

    // For local development, we'll simulate AI analysis with mock data
    const mockAnalysis = frameworkSourceData[framework];
    if (!mockAnalysis) {
      return res.status(400).json({ error: 'Framework not supported.' });
    }

    // Simulate AI analysis by adding status, details, and recommendations
    const analyzedCategories = mockAnalysis.categories.map(category => ({
      ...category,
      results: category.results.map(result => {
        // Simple mock logic based on content analysis
        const hasRelevantContent = fileContent.toLowerCase().includes(result.control.toLowerCase().split(' ').slice(0, 3).join(' '));
        const hasPartialContent = fileContent.toLowerCase().includes(result.control.toLowerCase().split(' ').slice(0, 2).join(' '));
        
        let status, details, recommendation;
        
        if (hasRelevantContent) {
          status = 'covered';
          details = 'This control appears to be adequately addressed in your document.';
          recommendation = 'Continue maintaining current practices for this control.';
        } else if (hasPartialContent) {
          status = 'partial';
          details = 'This control is partially addressed but may need additional coverage.';
          recommendation = 'Consider expanding your documentation to fully cover this control requirement.';
        } else {
          status = 'gap';
          details = 'This control is not addressed in your current document.';
          recommendation = 'Develop and implement policies and procedures to address this control requirement.';
        }
        
        return {
          ...result,
          status,
          details,
          recommendation
        };
      })
    }));

    // Return mock AI response format
    res.status(200).json({
      candidates: [{
        content: {
          parts: [{
            text: JSON.stringify(analyzedCategories, null, 2)
          }]
        }
      }]
    });

  } catch (error) {
    console.error('Error in /analyze:', error);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
  console.log('This is a mock server for local development.');
});
