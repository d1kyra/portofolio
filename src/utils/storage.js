// LocalStorage & State Management Layer for d1kyra_aio

export const DEFAULT_ARTICLES = [
  {
    id: 'art-1',
    date: '2026-06-27',
    tag: 'Laporan PKL',
    title: 'Laporan PKL Hari Pertama — Adaptasi Lingkungan Baru',
    content: 'Tanggal 27 Juni hari pertama pkl, aku awalnya bingung dan canggung karena tempat pkl nya berbeda dari teman-teman yang lain, tapi setelah beberapa menit aku mulai bisa beradaptasi karena disana juga ada siswa pkl dari sekolah lain yang baik dan asik diajak bicara.',
    author: 'Kyra',
    views: 142,
    readTime: '3 min read'
  },
  {
    id: 'art-2',
    date: '2026-06-28',
    tag: 'Laporan PKL',
    title: 'Laporan PKL Hari Kedua — Pembagian Tim Frontend & Backend',
    content: 'Tanggal 28 Juni hari kedua pkl, hari ini kami dibagi menjadi 2 tim yaitu tim front end dan back end, jujur aku lebih suka front end tapi pembimbing pkl menyuruhku masuk ke tim back end bersama dua orang lainnya untuk membuat sistem informasi.',
    author: 'Kyra',
    views: 98,
    readTime: '2 min read'
  },
  {
    id: 'art-3',
    date: '2026-06-29',
    tag: 'Laporan PKL',
    title: 'Laporan PKL Hari Ketiga — Mempelajari Alur Dokumentasi',
    content: 'Tanggal 29 Juni hari ketiga pkl, hari ini kami diminta untuk membaca dan menelaah dokumentasi arsitektur sistem informasi yang akan dikerjakan, sekaligus mempersiapkan lingkungan database lokal.',
    author: 'Kyra',
    views: 85,
    readTime: '2 min read'
  },
  {
    id: 'art-4',
    date: '2026-06-30',
    tag: 'Refleksi Diri',
    title: 'Laporan PKL Hari Terakhir Minggu Pertama & Ide Platform',
    content: 'Tanggal 30 Juni hari terakhir pkl di minggu ini, jujur hari ini aku excited di pagi hari namun setelah istirahat mulai lelah. Untuk mengisi waktu, saya kepikiran buat merapikan web d1kyra agar tampilannya lebih modern, responsif, dan menyatu antara portofolio dan manajemen catatan.',
    author: 'Kyra',
    views: 210,
    readTime: '4 min read'
  },
  {
    id: 'art-5',
    date: '2026-07-15',
    tag: 'Tech & Tips',
    title: 'Eksplorasi Web Audio API & Framer Motion di React',
    content: 'Membangun pemutar audio ambience ambient (Rain, Cafe, Cosmic Synthwave) langsung di browser menggunakan AudioContext Web Audio API tanpa dependensi file MP3 besar, dipadukan dengan transisi halus Framer Motion.',
    author: 'Kyra',
    views: 315,
    readTime: '5 min read'
  }
];

export const DEFAULT_NOTES = [
  {
    id: 'note-1',
    date: '2026-08-24',
    color: 'lilac',
    title: 'Belajar Integrasi UI Modern & Date Picker',
    content: 'Menerapkan fitur Date Picker, filter tanggal otomatis, dan badge kalender pada halaman artikel & note d1kyra.',
    createdAt: '08:50',
    pinned: true
  },
  {
    id: 'note-2',
    date: '2026-08-24',
    color: 'mint',
    title: 'Target Kuliah ITB 🎓',
    content: 'Fokus belajar pemrograman web (HTML, CSS, JS, React) dan matematika untuk persiapan masuk Teknik Informatika Institut Teknologi Bandung!',
    createdAt: '08:55',
    pinned: true
  },
  {
    id: 'note-3',
    date: '2026-08-25',
    color: 'peach',
    title: 'Kopi & Fokus Ngoding ☕',
    content: 'Beli Spanish Latte atau Americano favorit untuk nemenin ngoding sistem informasi PKL dan portofolio terpadu.',
    createdAt: '09:00',
    pinned: false
  },
  {
    id: 'note-4',
    date: '2026-08-26',
    color: 'sky',
    title: 'Refactor Tailwind & Dark Mode Sync',
    content: 'Pastikan CSS variables dan tailwind classes tersinkronisasi mulus saat toggle tema terang/gelap.',
    createdAt: '14:20',
    pinned: false
  }
];

export const PREDEFINED_PROFILES = {
  kyraa: {
    fullName: 'Muhammad Dwiky Rahman (Kyra)',
    role: 'Siswa PKL & Frontend Web Developer • Target ITB',
    location: 'Indonesia',
    avatar: '',
    bio: '"Fokus belajar pemrograman web modern, matematika, dan bersiap masuk Teknik Informatika ITB!"',
    about: 'Halo! Saya Kyra, siswa PKL yang aktif mengembangkan proyek sistem informasi dan antarmuka web modern d1kyra. Saya menyukai perpaduan desain glassmorphism yang bersih dengan logika JavaScript & React yang interaktif. Selain ngoding, saya gemar menikmati kopi Spanish Latte untuk menjaga fokus belajar.',
    skills: [
      { name: 'React & Vite', level: 90, category: 'Frontend' },
      { name: 'Tailwind CSS & UI Glassmorphism', level: 95, category: 'Frontend' },
      { name: 'JavaScript ES6+ & TypeScript', level: 88, category: 'Frontend' },
      { name: 'Supabase & Firebase Backend', level: 78, category: 'Backend' },
      { name: 'Git & GitHub Collaboration', level: 85, category: 'Tools' },
      { name: 'Sistem Informasi PKL', level: 82, category: 'General' },
    ],
    skillTags: ['🌐 Frontend React', '✨ JavaScript ES6+', '🎨 UI/UX & Glassmorphism', '☕ Spanish Latte Enthusiast', '🎯 Target Informatika ITB', '📊 Sistem Informasi PKL'],
    activities: [
      { title: 'Pengembangan Platform d1kyra All-In-One', desc: 'Menggabungkan Portofolio_V5 dan sistem artikel/catatan/Spotify hub menjadi satu platform modern React.' },
      { title: 'Praktik Kerja Lapangan (PKL)', desc: 'Mengerjakan proyek sistem informasi dan dokumentasi laporan kegiatan harian.' },
      { title: 'Persiapan Masuk Informatika ITB', desc: 'Pendalaman materi logika algoritma, matematika saintek, dan arsitektur web modern.' }
    ]
  },
  admin: {
    fullName: 'Super Administrator Sistem',
    role: 'Lead DevOps & Security Specialist',
    location: 'Main Server Data Center',
    avatar: '',
    bio: '"Menjaga keandalan infrastruktur, proteksi sesi autentikasi, dan audit sistem d1kyra 24/7."',
    about: 'Bertanggung jawab penuh atas pemeliharaan dan keamanan ekosistem platform d1kyra. Mengelola akun-akun terdaftar, memastikan sesi terenkripsi dengan aman, dan memonitor kinerja server data secara berkala.',
    skills: [
      { name: 'Cybersecurity & Auth Guard', level: 95, category: 'Security' },
      { name: 'DevOps & Cloud Server', level: 90, category: 'DevOps' },
      { name: 'Database Management', level: 92, category: 'Backend' }
    ],
    skillTags: ['🛡️ Cybersecurity & Auth Guard', '⚡ DevOps & Cloud Server', '🗄️ Database Management', '👑 Super Admin Privileges', '📊 Audit & System Log'],
    activities: [
      { title: 'Rilis Keamanan d1kyra Multi-Account', desc: 'Penerapan autentikasi ganda Email/Username dan proteksi halaman internal.' },
      { title: 'Arsitektur Sesi Terenkripsi', desc: 'Audit dan integrasi penyimpanan data sesi mandiri per pengguna.' }
    ]
  }
};

export const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    slug: 'd1kyra-aio-platform',
    title: 'd1kyra All-In-One Web Platform',
    description: 'Platform terintegrasi yang menggabungkan portofolio interaktif, sistem artikel & catatan harian PKL, dan command center Spotify & audio fokus.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    category: 'React & Web App',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Web Audio API', 'Supabase'],
    demoUrl: 'https://d1kyra.vercel.app',
    githubUrl: 'https://github.com/d1kyra/d1kyra-aio',
    features: [
      'Procedural Ambient Sound Generator (Rain, Cafe, Synthwave, Waves)',
      'Real-time Articles & Daily Notes Manager with Category Filter',
      'Glassmorphic Responsive UI with Dark/Light Mode',
      'Admin Dashboard with Protected Auth'
    ]
  },
  {
    id: 'proj-2',
    slug: 'sistem-informasi-pkl',
    title: 'Sistem Informasi & Manajemen PKL',
    description: 'Aplikasi manajemen logbook kegiatan, presensi, dan penilaian siswa PKL berbasis web interaktif.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    category: 'Fullstack',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    demoUrl: '#',
    githubUrl: 'https://github.com/d1kyra/pkl-system',
    features: [
      'Logbook harian dengan verifikasi pembimbing',
      'Ekspor laporan PDF otomatis',
      'Dashboard statistik kehadiran'
    ]
  },
  {
    id: 'proj-3',
    slug: 'glassmorphism-portfolio-showcase',
    title: 'Interactive 3D Glass Portfolio',
    description: 'Website portofolio modern dengan efek 3D card tilt, particle background, dan audio feedback.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    category: 'Frontend & UI/UX',
    techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Lucide Icons'],
    demoUrl: '#',
    githubUrl: 'https://github.com/d1kyra/portfolio-v5',
    features: [
      'Smooth scroll & active route tracking',
      'Interactive skill progression radar',
      'Visitor guestbook with instant comments'
    ]
  }
];

export const DEFAULT_CERTIFICATES = [
  {
    id: 'cert-1',
    title: 'Praktik Kerja Lapangan (PKL) Web Development',
    issuer: 'Instansi Mitra PKL',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1000&auto=format&fit=crop',
    description: 'Penyelesaian program PKL di bidang pengembangan web dan sistem informasi.'
  },
  {
    id: 'cert-2',
    title: 'Frontend Web Development Masterclass',
    issuer: 'Online Tech Academy',
    date: '2025',
    image: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=1000&auto=format&fit=crop',
    description: 'Sertifikasi kompetensi HTML5, CSS3, Modern JavaScript ES6+, dan React.'
  },
  {
    id: 'cert-3',
    title: 'UI/UX Design & Glassmorphism Fundamentals',
    issuer: 'Design Community',
    date: '2025',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop',
    description: 'Penguasaan prinsip desain modern, tipografi, warna harmonis, dan hierarki visual.'
  }
];

// --- Storage API Helpers ---

export function getStoredArticles() {
  try {
    const data = localStorage.getItem('d1kyra_articles');
    return data ? JSON.parse(data) : DEFAULT_ARTICLES;
  } catch (e) {
    return DEFAULT_ARTICLES;
  }
}

export function saveStoredArticles(articles) {
  try {
    localStorage.setItem('d1kyra_articles', JSON.stringify(articles));
  } catch (e) {
    console.error('Error saving articles', e);
  }
}

export function getStoredNotes() {
  try {
    const data = localStorage.getItem('d1kyra_notes');
    return data ? JSON.parse(data) : DEFAULT_NOTES;
  } catch (e) {
    return DEFAULT_NOTES;
  }
}

export function saveStoredNotes(notes) {
  try {
    localStorage.setItem('d1kyra_notes', JSON.stringify(notes));
  } catch (e) {
    console.error('Error saving notes', e);
  }
}

export function getStoredProfile(username = 'kyraa') {
  try {
    const key = `d1kyra_profile_${username.toLowerCase()}`;
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return PREDEFINED_PROFILES[username.toLowerCase()] || PREDEFINED_PROFILES.kyraa;
  } catch (e) {
    return PREDEFINED_PROFILES.kyraa;
  }
}

export function saveStoredProfile(username = 'kyraa', profileData) {
  try {
    const key = `d1kyra_profile_${username.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(profileData));
  } catch (e) {
    console.error('Error saving profile', e);
  }
}

export function getStoredProjects() {
  try {
    const data = localStorage.getItem('d1kyra_projects');
    return data ? JSON.parse(data) : DEFAULT_PROJECTS;
  } catch (e) {
    return DEFAULT_PROJECTS;
  }
}

export function saveStoredProjects(projects) {
  try {
    localStorage.setItem('d1kyra_projects', JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects', e);
  }
}

export function getStoredCertificates() {
  try {
    const data = localStorage.getItem('d1kyra_certificates');
    return data ? JSON.parse(data) : DEFAULT_CERTIFICATES;
  } catch (e) {
    return DEFAULT_CERTIFICATES;
  }
}

export function saveStoredCertificates(certs) {
  try {
    localStorage.setItem('d1kyra_certificates', JSON.stringify(certs));
  } catch (e) {
    console.error('Error saving certificates', e);
  }
}

export const DEFAULT_GUESTBOOK = [
  {
    id: 'cmt-1',
    name: 'Alex Pratama',
    message: 'Website all-in-one nya keren banget! Suara ambient hujan nya ngebantu banget pas ngoding.',
    created_at: '28 Feb 2026',
    likes: 4
  },
  {
    id: 'cmt-2',
    name: 'Nadia Salsabila',
    message: 'Laporan PKL nya rapi dan inspiratif. Semangat persiapan masuk Informatika ITB!',
    created_at: '1 Mar 2026',
    likes: 7
  }
];

export function getStoredGuestbook() {
  try {
    const data = localStorage.getItem('d1kyra_guestbook');
    return data ? JSON.parse(data) : DEFAULT_GUESTBOOK;
  } catch (e) {
    return DEFAULT_GUESTBOOK;
  }
}

export function saveStoredGuestbook(comments) {
  try {
    localStorage.setItem('d1kyra_guestbook', JSON.stringify(comments));
  } catch (e) {
    console.error('Error saving guestbook', e);
  }
}

export function getStoredContactMessages() {
  try {
    const data = localStorage.getItem('d1kyra_contact_inbox');
    return data ? JSON.parse(data) : [
      {
        id: 'msg-1',
        name: 'Budi Santoso',
        email: 'budi@techfirm.id',
        message: 'Halo Kyra, tertarik untuk diskusi mengenai proyek web React & UI. Salam sukses!',
        date: '1 Mar 2026'
      }
    ];
  } catch (e) {
    return [];
  }
}

export function saveStoredContactMessages(messages) {
  try {
    localStorage.setItem('d1kyra_contact_inbox', JSON.stringify(messages));
  } catch (e) {
    console.error('Error saving contact messages', e);
  }
}


