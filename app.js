// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Global variables
let currentIntensity = 'medium';
let selectedCategories = ['performance', 'style', 'logic'];
let roastCount = 1337;

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.nav-menu.mobile');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu.mobile .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Roast templates for different categories and intensities
const roastTemplates = {
    mild: {
        performance: [
            "Your code runs, but it's taking the scenic route to get there.",
            "I've seen faster algorithms written on stone tablets.",
            "This code is like a Sunday drive - it'll get there eventually.",
            "Your loops are more relaxed than a yoga class.",
            "Performance-wise, this code is taking a coffee break."
        ],
        style: [
            "Your code style is... unique. Like a fingerprint, but messier.",
            "I see you've invented your own coding conventions. How creative!",
            "Your indentation looks like it was done during an earthquake.",
            "This code has more mixed styles than a fashion disaster.",
            "Your variable names are as clear as mud, but at least it's consistent mud."
        ],
        logic: [
            "Your logic is sound, if we lived in an alternate universe.",
            "I can see what you were trying to do... from a very far distance.",
            "Your code logic is like a maze - confusing but eventually leads somewhere.",
            "This logic is more twisted than a pretzel factory.",
            "Your conditional statements are having an identity crisis."
        ],
        security: [
            "Your security is tighter than a screen door on a submarine.",
            "I've seen more security in a cardboard box.",
            "Your code is as secure as leaving your keys in the car.",
            "This has more holes than Swiss cheese.",
            "Your input validation is more like input suggestion."
        ]
    },
    medium: {
        performance: [
            "This code is slower than Internet Explorer trying to load a GIF.",
            "I've seen snails write faster algorithms than this.",
            "Your code performance is like watching paint dry in slow motion.",
            "This runs with all the speed of a three-legged turtle in molasses.",
            "Your algorithm complexity is O(please-make-it-stop).",
            "This code is so slow, it's going backwards in time."
        ],
        style: [
            "Your code style looks like it was formatted by a drunk monkey.",
            "I've seen more consistency in a toddler's finger painting.",
            "Your indentation is more random than a lottery number generator.",
            "This code has the readability of ancient hieroglyphics.",
            "Your variable names were clearly chosen by throwing darts at a dictionary.",
            "This code style is what happens when you let autocorrect write your program."
        ],
        logic: [
            "Your logic has more holes than a block of Swiss cheese in a shooting range.",
            "I've seen more coherent thoughts from a Magic 8-Ball.",
            "Your conditional logic is having a midlife crisis.",
            "This code logic is more tangled than headphone wires in a pocket.",
            "Your algorithm is like GPS directions written by someone who's never left their house.",
            "This logic flow is more confusing than IKEA assembly instructions."
        ],
        security: [
            "Your security is about as effective as a chocolate teapot.",
            "I've seen bank vaults with fewer security holes than this code.",
            "Your input validation is more like input wishful thinking.",
            "This code is so insecure, it makes public WiFi look like Fort Knox.",
            "Your authentication is weaker than a wet paper towel.",
            "This has more backdoors than a sketchy neighborhood."
        ]
    },
    savage: {
        performance: [
            "This code is so slow, heat death of the universe will occur before it finishes executing.",
            "I've seen glaciers move faster than your algorithm. Literally.",
            "Your code performance is what happens when you ask a sloth to run a marathon.",
            "This is so inefficient, it makes bubble sort look like a speed demon.",
            "Your algorithm has the performance characteristics of a potato trying to run Crysis.",
            "This code is slower than a Windows 95 machine trying to mine Bitcoin.",
            "I'm pretty sure this code violates several laws of physics with how slow it is."
        ],
        style: [
            "Your code style looks like it was written during a magnitude 9 earthquake by someone having a seizure.",
            "I've seen more organization in a tornado-hit trailer park.",
            "Your indentation strategy appears to be 'throw spaghetti at the wall and see what sticks.'",
            "This code has the readability of a ransom note written in crayon by a blindfolded toddler.",
            "Your variable naming convention seems to be 'mash keyboard until something appears.'",
            "This code style is what happens when you let a cat walk across your keyboard for 8 hours straight.",
            "I've seen more structure in a house of cards during an earthquake."
        ],
        logic: [
            "Your logic is so flawed, it makes flat-earth theory look reasonable.",
            "I've seen more coherent reasoning from a broken Magic 8-Ball filled with alphabet soup.",
            "Your conditional logic has more plot holes than a B-grade horror movie.",
            "This algorithm is more lost than a tourist in a foreign country without Google Translate.",
            "Your code logic is what happens when you ask a goldfish to solve quantum mechanics.",
            "This flow control is more chaotic than a toddler's birthday party after too much sugar.",
            "Your logic is so backwards, it's probably running in reverse time."
        ],
        security: [
            "Your security is so bad, it makes leaving your front door open with a 'Rob Me' sign look secure.",
            "I've seen more protection from a tissue paper umbrella in a hurricane.",
            "Your code is so insecure, hackers are probably feeling sorry for you.",
            "This has more vulnerabilities than a Windows XP machine connected directly to the dark web.",
            "Your input validation is like asking a fox to guard the henhouse while you're on vacation.",
            "This code is so insecure, it probably hacks itself just to feel something.",
            "Your authentication system is weaker than a house of cards in a wind tunnel."
        ]
    }
};

// Code analysis patterns
const codePatterns = {
    performance: [
        /for.*in.*range.*len/gi,
        /\.length.*for.*loop/gi,
        /nested.*for.*loop/gi,
        /O$$n\^2$$/gi,
        /while.*true/gi,
        /recursive.*without.*memoization/gi
    ],
    style: [
        /var\s+[a-z]/gi,
        /function\s*$$\s*$$/gi,
        /if.*==.*true/gi,
        /else.*return.*false/gi,
        /console\.log/gi,
        /[a-z]+[0-9]+/gi
    ],
    logic: [
        /if.*true.*==.*true/gi,
        /return.*true.*else.*return.*false/gi,
        /x\s*=\s*x\s*\+\s*1/gi,
        /TODO/gi,
        /FIXME/gi,
        /hack/gi
    ],
    security: [
        /eval\(/gi,
        /innerHTML/gi,
        /document\.write/gi,
        /sql.*injection/gi,
        /password.*plain/gi,
        /admin.*admin/gi
    ]
};

// DOM Elements
const codeInput = document.getElementById('codeInput');
const roastButton = document.getElementById('roastButton');
const roastOutput = document.getElementById('roastOutput');
const roastScore = document.getElementById('roastScore');
const roastActions = document.getElementById('roastActions');
const loadingOverlay = document.getElementById('loadingOverlay');
const languageSelect = document.getElementById('languageSelect');
const roastCountElement = document.getElementById('roastCount');

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Initialize intensity buttons
    document.querySelectorAll('.intensity-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.intensity-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentIntensity = this.dataset.intensity;
        });
    });

    // Initialize category checkboxes
    document.querySelectorAll('.checkbox-label input').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const category = this.dataset.category;
            if (this.checked) {
                if (!selectedCategories.includes(category)) {
                    selectedCategories.push(category);
                }
            } else {
                selectedCategories = selectedCategories.filter(cat => cat !== category);
            }
        });
    });

    // Roast button click
    roastButton.addEventListener('click', roastCode);

    // Animate roast count
    animateCounter();
});

// Smooth scroll to roast section
function scrollToRoast() {
    document.getElementById('roast').scrollIntoView({
        behavior: 'smooth'
    });
}

// Animate counter
function animateCounter() {
    let current = 1000;
    const target = roastCount;
    const increment = (target - current) / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        roastCountElement.textContent = Math.floor(current).toLocaleString();
    }, 50);
}

// Main roast function
async function roastCode() {
    const code = codeInput.value.trim();

    if (!code) {
        showError('Please enter some code to roast!');
        return;
    }

    if (selectedCategories.length === 0) {
        showError('Please select at least one roast category!');
        return;
    }

    // Show loading
    showLoading();

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    // Analyze code and generate roast
    const analysis = analyzeCode(code);
    const roastResult = generateRoast(analysis);

    // Display results
    displayRoast(roastResult);

    // Hide loading
    hideLoading();

    // Update roast count
    roastCount++;
    roastCountElement.textContent = roastCount.toLocaleString();
}

// Analyze code for issues
function analyzeCode(code) {
    const analysis = {
        issues: [],
        score: 0,
        language: languageSelect.value
    };

    selectedCategories.forEach(category => {
        const patterns = codePatterns[category] || [];
        const issues = [];

        patterns.forEach(pattern => {
            const matches = code.match(pattern);
            if (matches) {
                issues.push({
                    type: category,
                    matches: matches.length,
                    severity: Math.min(matches.length, 3)
                });
            }
        });

        if (issues.length > 0) {
            analysis.issues.push(...issues);
        }
    });

    // Calculate score based on issues found
    const totalIssues = analysis.issues.reduce((sum, issue) => sum + issue.severity, 0);
    analysis.score = Math.min(Math.max(totalIssues * 1.5, 3), 10);

    // Add some randomness for more variety
    analysis.score += (Math.random() - 0.5) * 2;
    analysis.score = Math.max(1, Math.min(10, analysis.score));

    return analysis;
}

// Generate roast based on analysis
function generateRoast(analysis) {
    const roasts = [];

    selectedCategories.forEach(category => {
        const templates = roastTemplates[currentIntensity][category];
        if (templates) {
            const randomRoast = templates[Math.floor(Math.random() * templates.length)];
            roasts.push({
                category: category,
                text: randomRoast
            });
        }
    });

    // Add some general roasts based on score
    if (analysis.score > 8) {
        roasts.push({
            category: 'general',
            text: getHighScoreRoast()
        });
    } else if (analysis.score < 3) {
        roasts.push({
            category: 'general',
            text: getLowScoreRoast()
        });
    }

    return {
        roasts: roasts,
        score: Math.round(analysis.score * 10) / 10,
        language: analysis.language
    };
}

// Get high score roast
function getHighScoreRoast() {
    const highScoreRoasts = [
        "Congratulations! You've achieved the rare perfect storm of bad coding practices.",
        "This code is so bad, it's actually impressive. Like watching a train wreck in slow motion.",
        "I didn't know it was possible to violate this many coding principles in so few lines.",
        "This code is a masterclass in what not to do. You should teach a course!",
        "I'm genuinely amazed. This code breaks rules I didn't even know existed."
    ];
    return highScoreRoasts[Math.floor(Math.random() * highScoreRoasts.length)];
}

// Get low score roast
function getLowScoreRoast() {
    const lowScoreRoasts = [
        "Well, this is disappointingly decent. I was hoping for more chaos.",
        "Your code is almost... good? That's not why we're here!",
        "I hate to admit it, but this code doesn't give me much to work with.",
        "This is surprisingly well-written. Are you sure you're a real developer?",
        "I'm running out of things to complain about. This is awkward."
    ];
    return lowScoreRoasts[Math.floor(Math.random() * lowScoreRoasts.length)];
}

// Display roast results
function displayRoast(result) {
    // Update score
    const scoreElement = roastScore.querySelector('.score-value');
    scoreElement.textContent = `${result.score}/10`;
    scoreElement.style.color = getScoreColor(result.score);

    // Create roast HTML
    let roastHTML = '<div class="roast-result">';

    result.roasts.forEach(roast => {
        roastHTML += `
            <div class="roast-item">
                <div class="roast-category">${roast.category.toUpperCase()}</div>
                <div class="roast-text">${roast.text}</div>
            </div>
        `;
    });

    roastHTML += '</div>';

    // Display results
    roastOutput.innerHTML = roastHTML;
    roastActions.style.display = 'flex';

    // Scroll to results
    roastOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Get color based on score
function getScoreColor(score) {
    if (score >= 8) return '#ff4757';
    if (score >= 6) return '#ffa502';
    if (score >= 4) return '#f1c40f';
    return '#2ed573';
}

// Show loading overlay
function showLoading() {
    loadingOverlay.style.display = 'flex';
    roastButton.disabled = true;
    roastButton.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Roasting...</span>';
}

// Hide loading overlay
function hideLoading() {
    loadingOverlay.style.display = 'none';
    roastButton.disabled = false;
    roastButton.innerHTML = '<span><i class="fas fa-fire"></i> Roast My Code!</span>';
}

// Show error message
function showError(message) {
    roastOutput.innerHTML = `
        <div class="error-message" style="color: #ff4757; text-align: center; padding: 2rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
            <p>${message}</p>
        </div>
    `;
}

// Share roast function
function shareRoast() {
    const roastText = document.querySelector('.roast-result');
    if (roastText) {
        const text = `Check out my code roast results! 🔥\n\nScore: ${roastScore.querySelector('.score-value').textContent}\n\nVisit CodeRoast to roast your own code!`;

        if (navigator.share) {
            navigator.share({
                title: 'My Code Roast Results',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(text).then(() => {
                alert('Roast results copied to clipboard!');
            }).catch(() => {
                alert('Unable to copy to clipboard. Please copy manually.');
            });
        }
    }
}

// Save roast function
function saveRoast() {
    const roastData = {
        timestamp: new Date().toISOString(),
        score: roastScore.querySelector('.score-value').textContent,
        roasts: Array.from(document.querySelectorAll('.roast-item')).map(item => ({
            category: item.querySelector('.roast-category').textContent,
            text: item.querySelector('.roast-text').textContent
        })),
        code: codeInput.value,
        language: languageSelect.value
    };

    // Save to localStorage
    const savedRoasts = JSON.parse(localStorage.getItem('savedRoasts') || '[]');
    savedRoasts.push(roastData);
    localStorage.setItem('savedRoasts', JSON.stringify(savedRoasts));

    alert('Roast saved successfully!');
}

// New roast function
function newRoast() {
    codeInput.value = '';
    roastOutput.innerHTML = `
        <div class="placeholder-roast">
            <i class="fas fa-fire-flame-curved"></i>
            <p>Submit your code above to see the roast results here!</p>
            <p class="placeholder-subtitle">Don't worry, we'll be gentle... NOT! 😈</p>
        </div>
    `;
    roastActions.style.display = 'none';
    roastScore.querySelector('.score-value').textContent = '-/10';
    roastScore.querySelector('.score-value').style.color = '#ffa502';

    // Scroll back to input
    codeInput.scrollIntoView({ behavior: 'smooth' });
    codeInput.focus();
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add some Easter eggs
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function (e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.length === konamiSequence.length &&
        konamiCode.every((code, index) => code === konamiSequence[index])) {

        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);

        console.log('🎉 Konami Code activated! You found the secret developer mode! 🎉');
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Add some random code snippets to the floating animation
const additionalCodeSnippets = [
    "// This should work",
    "catch (Exception ex) { }",
    "SELECT * FROM users;",
    "while(true) { break; }",
    "int i = 0; i++;",
    "// Magic number",
    "TODO: Refactor this"
];

// Randomly update floating code snippets
setInterval(() => {
    const codeSnippets = document.querySelectorAll('.code-snippet');
    if (codeSnippets.length > 0) {
        const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const randomCode = additionalCodeSnippets[Math.floor(Math.random() * additionalCodeSnippets.length)];
        randomSnippet.textContent = randomCode;
    }
}, 5000);