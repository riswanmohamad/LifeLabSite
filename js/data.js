/**
 * SkillsLab - Course Data Configuration
 * =====================================
 * Edit this file to update course content, topics, and form settings.
 * All data is centralized here for easy management.
 */

const LifeLabData = {
    // ============================================
    // SITE IDENTITY
    // ============================================
    siteInfo: {
        name: "SkillsLab",
        heroStatement: "Clear Mind. Strong Habits. Better Results.",
        tagline: "Simple steps, real support, and clear direction — built for students.",
        ctaText: "Start Your Journey — It's FREE!",
        ctaSubtext: "Limited to 20 students per batch • First come, first served"
    },

    // ============================================
    // HERO SLIDER IMAGES
    // Replace these URLs with your own images
    // Recommended size: 1920x800px or similar wide format
    // ============================================
    sliderImages: [
        {
            url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80",
            alt: "Students collaborating and learning together"
        },
        {
            url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80",
            alt: "Youth working on laptops in modern workspace"
        },
        {
            url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
            alt: "Modern office workspace with cubicles"
        }
    ],

    // ============================================
    // PROGRAM DETAILS
    // ============================================
    programDetails: {
        totalSessions: 20,
        sessionDuration: "1 to 1.5 Hours",
        mode: "Online",
        medium: "Tamil & Sinhala",
        batchSize: 20,
        price: "Completely FREE",
        certificate: true,
        extras: ["Frequent Online Quizzes", "Exciting Gifts", "Personalized Follow-up"],
        conductor: "Experienced IT Industry Professional",
        targetAudience: ["School Students (Grade 10-13)", "School Leavers & Job Seekers"]
    },

    // ============================================
    // COURSE TOPICS
    // Each topic has: icon (emoji), title, description
    // ============================================
    courseTopics: [
        {
            icon: "🎯",
            title: "Priorities in Our Life",
            description: "Learn to identify what truly matters and focus your energy on high-impact areas."
        },
        {
            icon: "⏰",
            title: "How to Make a Day Productive",
            description: "Master time management techniques to maximize your daily output and efficiency."
        },
        {
            icon: "📈",
            title: "1% Improvement Plan",
            description: "Discover the power of tiny gains and how small daily improvements compound over time."
        },
        {
            icon: "✅",
            title: "Habit Tracking",
            description: "Build lasting habits with proven tracking methods and accountability systems."
        },
        {
            icon: "🧠",
            title: "How to Study & Memorize Fast",
            description: "Learn science-backed techniques for rapid learning and long-term retention."
        },
        {
            icon: "🤖",
            title: "AI for Studies & Work",
            description: "Leverage artificial intelligence tools to enhance your learning and productivity."
        },
        {
            icon: "🔄",
            title: "4M Development Framework",
            description: "A structured approach to personal growth covering Mind, Method, Motivation, and Momentum."
        },
        {
            icon: "⚙️",
            title: "Believe in Your System, Not Goals",
            description: "Why processes beat outcomes and how to build reliable systems for success."
        },
        {
            icon: "🧩",
            title: "Different Personalities, Not a Problem",
            description: "Understand personality types and turn diversity into your greatest strength."
        },
        {
            icon: "💬",
            title: "Soft Skills Matter a Lot",
            description: "Develop communication, teamwork, and interpersonal skills that employers value."
        },
        {
            icon: "💰",
            title: "Money Handling",
            description: "Essential financial literacy for students - budgeting, saving, and smart spending."
        },
        {
            icon: "🏆",
            title: "Mastery",
            description: "The path to expertise - deliberate practice, patience, and continuous improvement."
        }
    ],

    // ============================================
    // PROGRAM HIGHLIGHTS (for display cards)
    // ============================================
    programHighlights: [
        {
            icon: "📚",
            title: "20 Sessions",
            description: "Comprehensive curriculum",
            highlighted: false
        },
        {
            icon: "🕐",
            title: "1-1.5 Hours Each",
            description: "Focused learning sessions",
            highlighted: false
        },
        {
            icon: "💻",
            title: "100% Online",
            description: "Learn from anywhere",
            highlighted: false
        },
        {
            icon: "🗣️",
            title: "Tamil & Sinhala",
            description: "Learn in your own language",
            highlighted: false
        },
        {
            icon: "👥",
            title: "20 Students/Batch",
            description: "Personalized attention",
            highlighted: false
        },
        {
            icon: "🎁",
            title: "Quizzes & Gifts",
            description: "Fun interactive learning",
            highlighted: false
        },
        {
            icon: "📜",
            title: "Certificate",
            description: "On successful completion",
            highlighted: false
        },
        {
            icon: "💯",
            title: "100% FREE",
            description: "Your future starts here",
            highlighted: true
        }
    ],

    // ============================================
    // REGISTRATION FORM CONFIGURATION
    // ============================================
    formConfig: {
        // Status dropdown options
        statusOptions: [
            { value: "", label: "-- Select Your Status --", disabled: true },
            { value: "school_10_13", label: "School Student (Grade 10-13)" },
            { value: "university", label: "University Student" },
            { value: "following_course", label: "Following a Course" },
            { value: "job_seeking", label: "Looking for a Job" },
            { value: "own_business", label: "Own Business" },
            { value: "other", label: "Other" }
        ],
        // Language understanding options (multi-select checkboxes)
        languageOptions: [
            { value: "english", label: "English" },
            { value: "tamil", label: "Tamil" },
            { value: "sinhala", label: "Sinhala" }
        ]
    },

    // ============================================
    // GOOGLE SHEETS INTEGRATION
    // ============================================
    // IMPORTANT: Replace this URL with your Google Apps Script Web App URL
    // See SETUP.md for instructions on how to set this up
    googleSheetConfig: {
        webAppUrl: "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",
        // Set to true once you've configured the Google Sheet
        isConfigured: false
    },

    // ============================================
    // NAVIGATION MENU
    // ============================================
    navigation: [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "topics", label: "Topics" },
        { id: "register", label: "Register" }
    ],

    // ============================================
    // FOOTER CONTENT
    // ============================================
    footer: {
        copyright: "© 2025 SkillsLab. All rights reserved.",
        tagline: "Empowering students to build better systems for life.",
        socialLinks: [
            // Add your social media links here
            // { platform: "facebook", url: "https://facebook.com/yourpage", icon: "📘" },
            // { platform: "instagram", url: "https://instagram.com/yourpage", icon: "📷" },
        ]
    }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LifeLabData;
}
