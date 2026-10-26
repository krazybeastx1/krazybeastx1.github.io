// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: 'Karthikeswar J',
  fullName: 'Janyavula Karthikeswar',
  handle: 'krazybeastx1',
  location: 'India',
  email: 'karthikeswarj@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nameiskarthik1/',
  aliases: ['Karthikeswar', 'KrazyBeastX'],
  roles: [
    'Penetration Tester',
    'Security Researcher',
    'Red Team Learner',
    'CTF Player',
  ],
  tagline: 'I break things on purpose, then write down exactly how.',
  bio: [
    'Security researcher focused on web, API, and Active Directory attack paths. Most of my time goes into Linux terminals, Burp Suite, and lab environments — turning findings into clear, reproducible reports.',
    'Currently interning in offensive security, ranked in the top 1% globally on TryHackMe, and building tooling in Python , Go and C++ to make attack-path work less manual.',
  ],
  resume: './KarthikeswarJ.pdf',
};

// Opens the visitor's default mail client with a prefilled subject.
export const mailto = `mailto:${profile.email}?subject=${encodeURIComponent('Hello Karthikeswar — portfolio enquiry')}`;

export const stats = [
  { value: 'Top 1%', label: 'TryHackMe global' },
  { value: '#242', label: 'HTB Season 11 · 6000+ players' },
  { value: '#7', label: 'HTB Cyber Apocalypse 2026 · team' },
  { value: '4', label: 'Security certifications' },
  { value: '141', label: 'PwnSeC CTF 2026'},
];

export const socials = [
  { id: 'github', label: 'GitHub', handle: '@krazybeastx1', href: 'https://github.com/krazybeastx1' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'in/nameiskarthik1', href: 'https://www.linkedin.com/in/nameiskarthik1/' },
  {
    id: 'htb',
    label: 'Hack The Box',
    handle: 'Pro Hacker · 1241178',
    href: 'https://app.hackthebox.com/users/1241178',
  },
  { id: 'thm', label: 'TryHackMe', handle: 'nameiskarthik1', href: 'https://tryhackme.com/p/nameiskarthik1' },
  { id: 'blog', label: 'Blog', handle: 'krazybeastx.gitbook.io', href: 'https://krazybeastx.gitbook.io/home' },
];

export const skillGroups = [
  {
    title: 'Security tooling',
    caption: 'daily drivers',
    items: ['Burp Suite', 'Nmap', 'Metasploit', 'Wireshark', 'Hydra', 'Gobuster', 'FFUF', 'Splunk', 'ELK Stack'],
  },
  {
    title: 'Domains',
    caption: 'what I test',
    items: ['VAPT', 'Web Security', 'API Security', 'Network Security', 'Active Directory', 'OWASP Top 10'],
  },
  {
    title: 'Languages',
    caption: 'what I write',
    items: ['Python', 'C++', 'Bash', 'JavaScript', 'Go', 'PowerShell'],
  },
  {
    title: 'Platforms',
    caption: 'where I work',
    items: ['Linux', 'Windows', 'macOS', 'Docker', 'Kubernetes', 'Git'],
  },
];

export const experience = [
  {
    company: 'Seckio',
    role: 'Penetration Testing Intern',
    period: 'Jul 2026 — Oct 2026',
    points: [
      'Performed web and API penetration testing with Burp Suite and OWASP methodology.',
      'Identified, documented, and retested vulnerabilities with remediation guidance.',
      'Ran static security testing on Android applications — APK components and security configuration.',
    ],
  },
];

export const projects = [
  {
    name: 'OmenHound',
    tag: 'Active Directory',
    category: 'Active Directory',
    stack: ['Go', 'LDAP', 'Neo4j', 'BloodHound'],
    summary:
      'BloodHound-style attack-path mapper rewritten in Go. Collects domain data, models relationships in a graph, and generates abuse commands from a dynamic engine — with audit logging and controlled credential operations.',
    details: [
      'Collects Active Directory data and maps potential attack paths across domain environments.',
      'Ships a web UI and a dynamic abuse-command engine for attack-path investigation, with audit logging and controlled credential operations.',
      'Implements LDAP/LDAPS collection, graph-based relationship analysis in Neo4j, and BloodHound CE-compatible import/export.',
    ],
    href: 'https://github.com/krazybeastx1/omenhound',
  },
  {
    name: 'Kracker',
    tag: 'Offensive tooling',
    category: 'Tooling',
    stack: ['C++', 'OpenSSL', 'Multithreading'],
    summary:
      'High-performance hash cracker supporting MD5, SHA1, SHA256, and SHA512. Dictionary, brute-force, and hybrid modes with rule-based mangling, tuned for throughput across threads.',
    details: [
      'Supports MD5, SHA1, SHA256, and SHA512 hashing algorithms.',
      'Implements dictionary, brute-force, and hybrid attacks with rule-based mangling techniques.',
      'Optimises cracking performance with multithreading and OpenSSL cryptographic libraries.',
    ],
    href: 'https://github.com/krazybeastx1/Kracker',
  },
  {
    name: 'CTF Vulnerable Machine',
    tag: 'Lab / Boot2Root',
    category: 'Lab',
    stack: ['Active Directory', 'Windows Server', 'PowerShell'],
    summary:
      'Themed Boot2Root environment with guided objectives and realistic enterprise attack paths — built to teach enumeration, privilege escalation, and lateral movement end to end.',
    details: [
      'Themed environment with guided learning objectives and realistic attack scenarios.',
      'Designed attack paths that simulate enterprise penetration testing scenarios.',
      'Built on Active Directory, Windows Server, and PowerShell.',
    ],
    href: 'https://github.com/krazybeastx1',
  },
];

export const certifications = [
  {
    name: 'Certified Cyber Security Analyst',
    short: 'C3SA',
    issuer: 'CyberWarfare Labs',
    date: 'Oct 2026',
    id: 'C3SA-6ad730cfa3c90917486e9b6b4d9',
  },
  { name: 'eLearnSecurity Junior Penetration Tester', short: 'eJPTv2', issuer: 'INE Security', date: 'May 2026' },
  { name: 'Certified AppSec Practitioner', short: 'CAP', issuer: 'The SecOps Group', date: 'Jan 2026' },
  {
    name: 'Certified Threat Intelligence & Governance Analyst',
    short: 'CTIGA',
    issuer: 'The RedTeam Leader',
    date: 'Jan 2026',
  },
];

// LinkedIn "Licenses & certifications" section — where the badges are verified.
export const certificationsUrl = `${profile.linkedin}details/certifications/`;

export const achievements = [
  { title: 'Pro Hacker', detail: 'Hack The Box rank' },
  { title: 'Top 1% globally', detail: 'TryHackMe platform ranking' },
  { title: 'Rank 242 / 6000+', detail: 'Hack The Box Season 11' },
  { title: 'Rank 7 / 6000+ teams', detail: 'HTB Cyber Apocalypse CTF 2026 — The Salt Crown' },
];

export const education = {
  degree: 'B.Tech, Computer Science & Engineering',
  school: 'Lovely Professional University',
  year: 'Graduated 2024',
};

// Freelance services — every item maps to work already described in the
// profile/resume above. Scope is agreed in writing before any testing starts.
export const services = [
  {
    title: 'Web application testing',
    blurb:
      'Manual testing against the OWASP Top 10 — authentication, access control, injection, and business-logic paths — with Burp Suite as the primary proxy.',
    tags: ['OWASP Top 10', 'Burp Suite', 'Manual review'],
  },
  {
    title: 'API security testing',
    blurb:
      'Endpoint discovery, broken object-level authorization, auth/session handling, and input validation across REST APIs, mapped to the requests that prove each finding.',
    tags: ['REST', 'BOLA / IDOR', 'Auth flows'],
  },
  {
    title: 'Android app static analysis',
    blurb:
      'APK teardown — manifest and component exposure, exported activities and providers, insecure storage and configuration — documented with remediation steps.',
    tags: ['APK', 'Manifest', 'Config review'],
  },
  {
    title: 'Active Directory review',
    blurb:
      'Domain data collection and attack-path mapping with LDAP and graph analysis, so privilege-escalation routes and risky relationships are visible before an attacker finds them.',
    tags: ['LDAP', 'Attack paths', 'Neo4j'],
  },
  {
    title: 'Reporting & retesting',
    blurb:
      'Findings written so a developer can reproduce them: severity, evidence, impact, and a fix. Retest once remediation lands so the report closes cleanly.',
    tags: ['Reproduction', 'Remediation', 'Retest'],
  },
  {
    title: 'Security tooling & automation',
    blurb:
      'Small, focused tools in Go, Python, C++, or Bash — collectors, parsers, and checkers that remove the repetitive parts of an assessment.',
    tags: ['Go', 'Python', 'Automation'],
  },
];
