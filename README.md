# 🔐 Secure Password & Account Policy Advisor

**Developed by Vishal | Cybersecurity Portfolio Project**

## 🎯 Project Overview

A sophisticated web application designed to evaluate password strength, assess account security posture, and provide AI-powered personalized security recommendations. This tool demonstrates expertise in security awareness engineering, risk assessment, and user education—critical skills for cybersecurity analysts and security awareness professionals.

---

## 🚀 Live Demo

Open `index.html` in any modern web browser. No server setup required!

---

## 📋 Features

### Core Functionality

1. **Advanced Password Strength Analysis**
   - Real-time password requirement validation
   - Multi-factor scoring algorithm (length, complexity, entropy)
   - Common password detection against breach databases
   - Pattern recognition for sequential and keyboard patterns
   - Leetspeak normalization to catch substitution tricks

2. **Comprehensive Security Posture Assessment**
   - Password reuse evaluation
   - Password manager adoption check
   - Multi-Factor Authentication (MFA) status verification
   - Risk score calculation combining all factors

3. **AI-Powered Recommendations**
   - Contextual security advice based on specific vulnerabilities
   - Prioritized action items (critical → high → medium → low)
   - Educational explanations for each recommendation
   - Industry best practices alignment

4. **Professional UX/UI**
   - Premium glassmorphism design with gradient accents
   - Responsive layout for all device sizes
   - Real-time visual feedback on password requirements
   - Animated strength meter and risk indicators
   - Accessibility-focused design

---

## 🏗️ Project Structure

```
password-advisor/
│
├── index.html          # Main HTML structure
├── styles.css          # Premium styling with CSS variables
├── script.js           # Core logic and LLM simulation
└── README.md           # This file
```

---

## 🔧 Technical Implementation

### Frontend Architecture

**HTML (`index.html`)**
- Semantic HTML5 structure
- Form validation with required fields
- SVG icons for scalability
- Metadata for SEO and social sharing

**CSS (`styles.css`)**
- CSS custom properties for themability
- Flexbox and Grid for responsive layouts
- Glassmorphism effects with backdrop-filter
- Smooth transitions and animations
- Mobile-first responsive design

**JavaScript (`script.js`)**
- Vanilla JavaScript (no dependencies)
- Object-oriented state management
- Real-time input validation
- Rule-based password strength algorithm
- Mock LLM integration architecture

---

## 🧠 Password Strength Algorithm

The scoring system evaluates multiple dimensions:

### 1. Length Analysis (40 points max)
```javascript
≥16 characters → 40 points
≥12 characters → 30 points
≥8 characters  → 20 points
<8 characters  → 10 points
```

### 2. Character Diversity (30 points max)
- Lowercase letters: +5 points
- Uppercase letters: +5 points
- Numbers: +5 points
- Special characters: +10 points
- Multiple types (3+): +5 bonus

### 3. Common Password Detection (-30 points)
Checks against database of:
- Top 100 most common passwords
- Dictionary words
- Leetspeak variations (p@ssw0rd → password)

### 4. Pattern Recognition (-20 points)
Detects:
- Repeated characters (aaa, 111)
- Sequential numbers (123, 789)
- Sequential letters (abc, xyz)
- Keyboard patterns (qwerty, asdfgh)
- Date patterns (1990, 2024)

### 5. Entropy Calculation (20 points max)
Measures randomness:
```javascript
entropy = unique_characters / total_length
High entropy (>4) → +20 points
Medium entropy (>3) → +10 points
```

**Final Score**: `max(0, min(100, total_score))`

---

## 🤖 LLM Integration Architecture

### Mock LLM Function

The `mockLLMAssessment()` function simulates a production LLM API call:

```javascript
async function mockLLMAssessment(profile) {
    const prompt = buildLLMPrompt(profile);
    
    // In production, this would be:
    // const response = await fetch('/api/llm/analyze', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ prompt, profile })
    // });
    
    return generateContextualResponse(profile);
}
```

### Example LLM Prompt

```
You are a cybersecurity advisor. Analyze this user's password and security profile:

Password Strength Score: 45/100
Password Length: 8 characters
Character Types: Uppercase, Lowercase, Numbers
Common Password: Yes
Common Patterns: Yes
Password Reuse: Yes
Uses Password Manager: No
MFA Enabled: No

Provide:
1. Overall risk level (low/medium/high)
2. Specific vulnerabilities identified
3. 5-7 actionable security recommendations prioritized by impact

Format as JSON with keys: riskLevel, vulnerabilities, recommendations
```

### Example LLM Response

```json
{
  "riskLevel": "high",
  "riskScore": 75,
  "vulnerabilities": [
    "Weak password strength",
    "Common password detected",
    "Predictable patterns found",
    "Password reuse across sites",
    "No multi-factor authentication",
    "Password too short"
  ],
  "recommendations": [
    {
      "priority": "critical",
      "text": "Your password contains common words or patterns found in breach databases. Replace it immediately with a truly random passphrase or use a password generator."
    },
    {
      "priority": "critical",
      "text": "Never reuse passwords across multiple sites. If one service is breached, attackers will try your credentials on other platforms (credential stuffing attacks)."
    },
    {
      "priority": "critical",
      "text": "Enable Multi-Factor Authentication (MFA) immediately. Even if your password is compromised, MFA blocks 99.9% of automated attacks."
    },
    {
      "priority": "high",
      "text": "Increase password length to at least 12-16 characters. Longer passwords exponentially increase crack time."
    },
    {
      "priority": "high",
      "text": "Adopt a reputable password manager (1Password, Bitwarden, LastPass) to maintain unique, complex passwords for every account."
    }
  ]
}
```

---

## 🎓 Security Analyst Relevance

### How This Project Demonstrates Security Analyst Skills

#### 1. **Security Awareness & User Education**
- **Skill**: Translating technical security concepts into user-friendly guidance
- **Application**: The app educates users on password hygiene, MFA importance, and credential reuse risks
- **Real-world parallel**: SOC analysts must train employees on phishing awareness, secure practices

#### 2. **Risk Assessment & Scoring**
- **Skill**: Quantifying security posture through multi-factor risk models
- **Application**: Combines password strength + user behavior into an overall risk score
- **Real-world parallel**: Vulnerability scoring (CVSS), threat intelligence prioritization

#### 3. **Policy Development & Enforcement**
- **Skill**: Understanding and implementing password policies
- **Application**: Enforces NIST 800-63B guidelines (length > complexity, no periodic resets)
- **Real-world parallel**: Creating and auditing corporate password policies, compliance checks

#### 4. **Threat Modeling & Attack Simulation**
- **Skill**: Understanding adversary tactics (credential stuffing, brute-force, dictionary attacks)
- **Application**: Algorithm detects patterns attackers would exploit first
- **Real-world parallel**: Penetration testing, red team exercises

#### 5. **Data-Driven Decision Making**
- **Skill**: Using breach databases and threat intelligence to inform recommendations
- **Application**: Common password list derived from HaveIBeenPwned, rockyou.txt
- **Real-world parallel**: Threat feeds, SIEM correlation rules, IOC databases

#### 6. **Configuration Auditing**
- **Skill**: Checking security controls are properly enabled
- **Application**: Verifies MFA status, password manager usage
- **Real-world parallel**: CIS benchmark audits, security configuration assessments

#### 7. **Incident Response Preparedness**
- **Skill**: Understanding credential compromise attack chains
- **Application**: Explains why MFA stops 99.9% of automated attacks
- **Real-world parallel**: Credential-based attack investigations, post-breach analysis

---

## 📊 Use Cases in Security Operations

### 1. Onboarding Security Training
- New employee orientation
- Interactive password policy education
- Self-service security checkup

### 2. Security Awareness Campaigns
- Password hygiene workshops
- Cybersecurity awareness month activities
- Gamified security training

### 3. Configuration Audits
- Self-assessment tool for employees
- Identify high-risk user behaviors
- Pre-audit remediation guidance

### 4. Incident Response
- Post-breach password reset education
- Credential compromise recovery guidance
- User impact assessment

---

## 🔒 Security & Privacy

### Privacy-First Design
- **Zero server communication**: All processing happens client-side
- **No data storage**: Passwords never logged, stored, or transmitted
- **No analytics**: No tracking pixels, cookies, or telemetry
- **Open source**: Fully auditable code

### Production Deployment Considerations
If deploying this tool for real users:

1. **Use HTTPS**: Encrypt all connections (Let's Encrypt)
2. **Content Security Policy**: Prevent XSS attacks
3. **Subresource Integrity**: Verify external resources (if any)
4. **CORS Configuration**: Restrict API access if server-side
5. **Rate Limiting**: Prevent brute-force attempts on API
6. **Input Sanitization**: Already implemented, but verify on backend

---

## 🎨 Customization

### Theming
Modify CSS variables in `styles.css`:

```css
:root {
    --primary: #667eea;          /* Main brand color */
    --secondary: #764ba2;        /* Accent color */
    --bg-primary: #0f172a;       /* Dark background */
    /* ... more variables ... */
}
```

### LLM Integration
Replace `mockLLMAssessment()` in `script.js`:

```javascript
async function mockLLMAssessment(profile) {
    const response = await fetch('https://your-api.com/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            prompt: buildLLMPrompt(profile),
            model: 'gpt-4',
            temperature: 0.7
        })
    });
    
    return await response.json();
}
```

### Common Password Database
Update `COMMON_PASSWORDS` array in `script.js` with your own list.

---

## 🧪 Testing Scenarios

### Weak Password Examples
| Password | Expected Result | Key Issues |
|----------|----------------|------------|
| `password123` | High Risk (20-30/100) | Common word, predictable pattern |
| `qwerty2024` | High Risk (25-35/100) | Keyboard pattern, year pattern |
| `Pa$$w0rd` | Medium Risk (40-50/100) | Common + leetspeak |
| `abc123456` | High Risk (15-25/100) | Sequential, short |

### Strong Password Examples
| Password | Expected Result | Key Features |
|----------|----------------|--------------|
| `T7$mK#9pLq2!vXz` | Low Risk (85-95/100) | Random, long, diverse |
| `correct-horse-battery-staple` | Low Risk (75-85/100) | Passphrase, memorable |
| `Zx9!mK#7pLq2$vT8` | Low Risk (90-100/100) | Maximum entropy |

### Security Posture Combinations
1. **Best Case**: Strong password + No reuse + Password manager + MFA = Low Risk
2. **Medium Case**: Moderate password + No reuse + No manager + MFA = Medium Risk
3. **Worst Case**: Weak password + Reuse + No manager + No MFA = High Risk

---

## 📚 References & Further Reading

### Standards & Guidelines
- [NIST SP 800-63B: Digital Identity Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [CIS Controls v8: Access Control Management](https://www.cisecurity.org/controls/v8)

### Research Papers
- "The Tangled Web of Password Reuse" (Das et al., 2014)
- "Fast, Lean, and Accurate: Modeling Password Guessability" (Kelley et al., 2012)

### Tools & Resources
- [Have I Been Pwned](https://haveibeenpwned.com/) - Breach database
- [Bitwarden](https://bitwarden.com/) - Open-source password manager
- [Zxcvbn](https://github.com/dropbox/zxcvbn) - Dropbox's password strength estimator

---

## 🛠️ Future Enhancements

### Planned Features
- [ ] Integrate with HaveIBeenPwned API for real breach checks
- [ ] Add support for passphrase generation
- [ ] Implement actual LLM API integration (OpenAI, Anthropic, local Ollama)
- [ ] Multi-language support (i18n)
- [ ] Dark/light theme toggle
- [ ] Export security report as PDF
- [ ] Browser extension version
- [ ] Corporate dashboard for aggregated user data (anonymized)

### Advanced Features
- [ ] Passwordless authentication education module
- [ ] FIDO2/WebAuthn demonstration
- [ ] Phishing simulation integration
- [ ] Security key recommendation engine
- [ ] Time-to-crack estimation with GPU benchmarks

---

## 📞 Contact & Attribution

**Developer**: Vishal  
**Project Type**: Cybersecurity Portfolio  
**Purpose**: Security Awareness & User Education  
**License**: MIT (Open Source)

### Portfolio Integration
This project demonstrates:
- ✅ Full-stack security engineering
- ✅ User education & awareness training
- ✅ Risk assessment methodologies
- ✅ Policy development & compliance
- ✅ Clean code practices
- ✅ Professional UI/UX design

---

## 🙏 Acknowledgments

- Password breach data: HaveIBeenPwned
- Security guidelines: NIST, OWASP
- Design inspiration: Modern glassmorphism trends
- Testing: Real-world password audit experiences

---

## 📄 License

MIT License - Free to use, modify, and distribute with attribution.

```
Copyright (c) 2024 Vishal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

**Built with 🔒 by Vishal | Securing the Digital World, One Password at a Time**
