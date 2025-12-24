// Common password patterns and dictionary
const COMMON_PASSWORDS = [
    'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', '1234567',
    'letmein', 'trustno1', 'dragon', 'baseball', 'iloveyou', 'master', 'sunshine',
    'ashley', 'bailey', 'passw0rd', 'shadow', '123123', '654321', 'superman',
    'qazwsx', 'michael', 'football', 'welcome', 'jesus', 'ninja', 'mustang',
    'password1', 'admin', 'administrator', 'root', 'toor', 'pass', 'test'
];

const COMMON_PATTERNS = [
    /(.)\1{2,}/, // Repeated characters (aaa, 111)
    /^(012|123|234|345|456|567|678|789|890)+/, // Sequential numbers
    /^(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)+/i, // Sequential letters
    /^(qwerty|asdfgh|zxcvbn)+/i, // Keyboard patterns
    /(19|20)\d{2}/, // Years
    /^.{1,7}$/ // Very short passwords
];

const SUBSTITUTION_MAP = {
    '@': 'a', '4': 'a', '8': 'b', '(': 'c', '3': 'e', '1': 'i', '!': 'i',
    '0': 'o', '$': 's', '5': 's', '7': 't', '+': 't'
};

// State management
let evaluatedPassword = '';

// DOM Elements
const form = document.getElementById('securityForm');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const analyzeBtn = document.getElementById('analyzeBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsSection = document.getElementById('results');
const requirements = document.querySelectorAll('.requirement');

// Password visibility toggle
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
});

// Real-time password requirements check
passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;
    checkRequirements(password);
});

function checkRequirements(password) {
    const checks = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        numbers: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)
    };

    requirements.forEach(req => {
        const type = req.getAttribute('data-requirement');
        if (checks[type]) {
            req.classList.add('met');
            req.querySelector('.requirement-icon').textContent = '✓';
        } else {
            req.classList.remove('met');
            req.querySelector('.requirement-icon').textContent = '○';
        }
    });
}

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log('Form submitted'); // Debug log
    
    const password = passwordInput.value;
    const formData = new FormData(form);
    
    // Debug: Check if all fields are filled
    console.log('Password:', password ? 'Entered' : 'Empty');
    console.log('Reuse:', formData.get('reuse'));
    console.log('Password Manager:', formData.get('passwordManager'));
    console.log('MFA:', formData.get('mfa'));
    
    // Validate all fields are filled
    if (!password) {
        alert('Please enter a password');
        return;
    }
    
    if (!formData.get('reuse')) {
        alert('Please answer: Do you reuse this password?');
        return;
    }
    
    if (!formData.get('passwordManager')) {
        alert('Please answer: Do you use a password manager?');
        return;
    }
    
    if (!formData.get('mfa')) {
        alert('Please answer: Is MFA enabled?');
        return;
    }
    
    // Show loading state
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `
        <svg class="loading" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
        </svg>
        Analyzing...
    `;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store evaluated password and mask input
    evaluatedPassword = password;
    passwordInput.value = '••••••••••••';
    passwordInput.disabled = true;
    
    // Calculate password strength
    const strengthScore = calculatePasswordStrength(password);
    
    // Build user profile
    const userProfile = {
        passwordStrength: strengthScore,
        passwordLength: password.length,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumbers: /[0-9]/.test(password),
        hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password),
        isCommonPassword: isCommonPassword(password),
        hasCommonPatterns: hasCommonPatterns(password),
        reusesPassword: formData.get('reuse') === 'yes',
        usesPasswordManager: formData.get('passwordManager') === 'yes',
        hasMFA: formData.get('mfa') === 'yes',
        timestamp: new Date().toISOString()
    };
    
    console.log('User Profile:', userProfile); // Debug log
    
    // Get LLM assessment
    const llmResponse = await mockLLMAssessment(userProfile);
    
    console.log('LLM Response:', llmResponse); // Debug log
    
    // Display results
    displayResults(strengthScore, llmResponse, userProfile);
    
    // Reset button state
    analyzeBtn.disabled = false;
    analyzeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
        </svg>
        Analyze Security Posture
    `;
    
    // Hide form, show results
    form.style.display = 'none';
    resultsSection.style.display = 'block';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
});

// Password strength calculation
function calculatePasswordStrength(password) {
    let score = 0;
    
    // Length scoring (max 40 points)
    if (password.length >= 16) score += 40;
    else if (password.length >= 12) score += 30;
    else if (password.length >= 8) score += 20;
    else score += 10;
    
    // Character diversity (max 30 points)
    if (/[a-z]/.test(password)) score += 5;
    if (/[A-Z]/.test(password)) score += 5;
    if (/[0-9]/.test(password)) score += 5;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)) score += 10;
    
    // Check for multiple character types (5 points)
    const types = [/[a-z]/, /[A-Z]/, /[0-9]/, /[!@#$%^&*]/];
    const typesUsed = types.filter(regex => regex.test(password)).length;
    if (typesUsed >= 3) score += 5;
    
    // Penalties for common passwords (max -30 points)
    if (isCommonPassword(password)) score -= 30;
    
    // Penalties for common patterns (max -20 points)
    if (hasCommonPatterns(password)) score -= 20;
    
    // Bonus for entropy/randomness (max 20 points)
    const entropy = calculateEntropy(password);
    if (entropy > 4) score += 20;
    else if (entropy > 3) score += 10;
    
    return Math.max(0, Math.min(100, score));
}

function isCommonPassword(password) {
    const lowerPassword = password.toLowerCase();
    const normalized = normalizePassword(lowerPassword);
    
    return COMMON_PASSWORDS.some(common => 
        lowerPassword.includes(common) || normalized.includes(common)
    );
}

function hasCommonPatterns(password) {
    return COMMON_PATTERNS.some(pattern => pattern.test(password));
}

function normalizePassword(password) {
    let normalized = password.toLowerCase();
    for (const [sub, original] of Object.entries(SUBSTITUTION_MAP)) {
        normalized = normalized.replace(new RegExp(sub.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), original);
    }
    return normalized;
}

function calculateEntropy(password) {
    const uniqueChars = new Set(password).size;
    return uniqueChars / password.length;
}

// Mock LLM Assessment Function
async function mockLLMAssessment(profile) {
    // This simulates an API call to an LLM like GPT-4, Claude, or local model
    // In production, this would be a real API endpoint
    
    const prompt = buildLLMPrompt(profile);
    
    // Simulate LLM processing time
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate contextual response based on profile
    return generateContextualResponse(profile);
}

function buildLLMPrompt(profile) {
    return `You are a cybersecurity advisor. Analyze this user's password and security profile:

Password Strength Score: ${profile.passwordStrength}/100
Password Length: ${profile.passwordLength} characters
Character Types: ${[
    profile.hasUppercase && 'Uppercase',
    profile.hasLowercase && 'Lowercase', 
    profile.hasNumbers && 'Numbers',
    profile.hasSpecialChars && 'Special Characters'
].filter(Boolean).join(', ')}
Common Password: ${profile.isCommonPassword ? 'Yes' : 'No'}
Common Patterns: ${profile.hasCommonPatterns ? 'Yes' : 'No'}
Password Reuse: ${profile.reusesPassword ? 'Yes' : 'No'}
Uses Password Manager: ${profile.usesPasswordManager ? 'Yes' : 'No'}
MFA Enabled: ${profile.hasMFA ? 'Yes' : 'No'}

Provide:
1. Overall risk level (low/medium/high)
2. Specific vulnerabilities identified
3. 5-7 actionable security recommendations prioritized by impact

Format as JSON with keys: riskLevel, vulnerabilities, recommendations`;
}

function generateContextualResponse(profile) {
    let riskScore = 100 - profile.passwordStrength;
    
    // Adjust risk based on security practices
    if (profile.reusesPassword) riskScore += 20;
    if (!profile.usesPasswordManager) riskScore += 10;
    if (!profile.hasMFA) riskScore += 15;
    
    // Determine risk level
    let riskLevel;
    if (riskScore <= 30) riskLevel = 'low';
    else if (riskScore <= 60) riskLevel = 'medium';
    else riskLevel = 'high';
    
    // Build recommendations based on specific issues
    const recommendations = [];
    
    // Password strength recommendations
    if (profile.passwordStrength < 70) {
        if (profile.passwordLength < 12) {
            recommendations.push({
                priority: 'high',
                text: 'Increase password length to at least 12-16 characters. Longer passwords exponentially increase crack time and provide better protection against brute-force attacks.'
            });
        }
        
        if (!profile.hasSpecialChars) {
            recommendations.push({
                priority: 'high',
                text: 'Add special characters (!@#$%^&*) to your password. This increases the character pool and makes password cracking significantly more difficult.'
            });
        }
        
        if (profile.isCommonPassword) {
            recommendations.push({
                priority: 'critical',
                text: 'Your password contains common words or patterns found in breach databases. Replace it immediately with a truly random passphrase or use a password generator.'
            });
        }
        
        if (profile.hasCommonPatterns) {
            recommendations.push({
                priority: 'high',
                text: 'Avoid sequential patterns (123, abc) or keyboard patterns (qwerty). These are among the first combinations attackers try during password cracking attempts.'
            });
        }
    }
    
    // Security practice recommendations
    if (profile.reusesPassword) {
        recommendations.push({
            priority: 'critical',
            text: 'Never reuse passwords across multiple sites. If one service is breached, attackers will try your credentials on other platforms (credential stuffing attacks). Use unique passwords for each account.'
        });
    }
    
    if (!profile.usesPasswordManager) {
        recommendations.push({
            priority: 'high',
            text: 'Adopt a reputable password manager (1Password, Bitwarden, LastPass). This allows you to maintain unique, complex passwords for every account without memorization burden.'
        });
    }
    
    if (!profile.hasMFA) {
        recommendations.push({
            priority: 'critical',
            text: 'Enable Multi-Factor Authentication (MFA) immediately. Even if your password is compromised, MFA blocks 99.9% of automated attacks. Prefer authenticator apps or hardware keys over SMS.'
        });
    }
    
    // General best practices
    if (recommendations.length < 5) {
        recommendations.push({
            priority: 'medium',
            text: 'Consider using a passphrase instead of a password. Example: "correct-horse-battery-staple" is both memorable and secure due to its length and randomness.'
        });
        
        recommendations.push({
            priority: 'medium',
            text: 'Regularly audit your accounts at haveibeenpwned.com to check if your credentials have appeared in known data breaches.'
        });
        
        recommendations.push({
            priority: 'low',
            text: 'Enable login alerts and review active sessions regularly. This helps you detect unauthorized access attempts early.'
        });
    }
    
    // Sort by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    
    return {
        riskLevel,
        riskScore: Math.min(100, riskScore),
        vulnerabilities: identifyVulnerabilities(profile),
        recommendations: recommendations.slice(0, 7)
    };
}

function identifyVulnerabilities(profile) {
    const vulnerabilities = [];
    
    if (profile.passwordStrength < 50) vulnerabilities.push('Weak password strength');
    if (profile.isCommonPassword) vulnerabilities.push('Common password detected');
    if (profile.hasCommonPatterns) vulnerabilities.push('Predictable patterns found');
    if (profile.reusesPassword) vulnerabilities.push('Password reuse across sites');
    if (!profile.usesPasswordManager) vulnerabilities.push('Manual password management');
    if (!profile.hasMFA) vulnerabilities.push('No multi-factor authentication');
    if (profile.passwordLength < 12) vulnerabilities.push('Password too short');
    
    return vulnerabilities;
}

// Display results
function displayResults(strengthScore, llmResponse, profile) {
    // Update strength meter
    const strengthMeterFill = document.getElementById('strengthMeterFill');
    const strengthScoreEl = document.getElementById('strengthScore');
    const strengthText = document.getElementById('strengthText');
    
    strengthMeterFill.style.width = `${strengthScore}%`;
    strengthScoreEl.textContent = `${strengthScore}/100`;
    
    if (strengthScore >= 80) {
        strengthText.textContent = 'Strong: Your password demonstrates excellent security characteristics.';
        strengthText.style.color = 'var(--success)';
    } else if (strengthScore >= 60) {
        strengthText.textContent = 'Moderate: Your password is acceptable but has room for improvement.';
        strengthText.style.color = 'var(--warning)';
    } else if (strengthScore >= 40) {
        strengthText.textContent = 'Weak: Your password is vulnerable and should be strengthened.';
        strengthText.style.color = 'var(--warning)';
    } else {
        strengthText.textContent = 'Very Weak: Your password is highly vulnerable to attacks.';
        strengthText.style.color = 'var(--danger)';
    }
    
    // Update risk badge
    const riskBadge = document.getElementById('riskBadge');
    const riskLevel = document.getElementById('riskLevel');
    
    riskBadge.className = `risk-badge ${llmResponse.riskLevel}`;
    riskLevel.textContent = llmResponse.riskLevel.toUpperCase();
    
    // Display recommendations
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = '';
    
    llmResponse.recommendations.forEach(rec => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        
        let iconColor = 'var(--info)';
        if (rec.priority === 'critical') iconColor = 'var(--danger)';
        else if (rec.priority === 'high') iconColor = 'var(--warning)';
        else if (rec.priority === 'medium') iconColor = 'var(--info)';
        else iconColor = 'var(--success)';
        
        item.innerHTML = `
            <div class="recommendation-icon" style="color: ${iconColor};">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            </div>
            <div class="recommendation-text">${rec.text}</div>
        `;
        
        recommendationsContainer.appendChild(item);
    });
    
    // Display score breakdown
    const breakdownGrid = document.getElementById('breakdownGrid');
    breakdownGrid.innerHTML = '';
    
    const breakdownData = [
        {
            label: 'Password Strength',
            value: `${strengthScore}/100`,
            status: strengthScore >= 70 ? 'good' : strengthScore >= 40 ? 'warning' : 'danger'
        },
        {
            label: 'Password Reuse',
            value: profile.reusesPassword ? 'Yes' : 'No',
            status: profile.reusesPassword ? 'danger' : 'good'
        },
        {
            label: 'Password Manager',
            value: profile.usesPasswordManager ? 'Yes' : 'No',
            status: profile.usesPasswordManager ? 'good' : 'warning'
        },
        {
            label: 'MFA Status',
            value: profile.hasMFA ? 'Enabled' : 'Disabled',
            status: profile.hasMFA ? 'good' : 'danger'
        }
    ];
    
    breakdownData.forEach(item => {
        const breakdownItem = document.createElement('div');
        breakdownItem.className = 'breakdown-item';
        breakdownItem.innerHTML = `
            <span class="breakdown-label">${item.label}</span>
            <span class="breakdown-value ${item.status}">${item.value}</span>
        `;
        breakdownGrid.appendChild(breakdownItem);
    });
}

// Reset functionality
resetBtn.addEventListener('click', () => {
    form.reset();
    passwordInput.value = '';
    passwordInput.disabled = false;
    passwordInput.type = 'password';
    form.style.display = 'block';
    resultsSection.style.display = 'none';
    evaluatedPassword = '';
    
    requirements.forEach(req => {
        req.classList.remove('met');
        req.querySelector('.requirement-icon').textContent = '○';
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
