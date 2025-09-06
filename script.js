document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    // Toggle mobile menu
    function toggleMobileMenu(show) {
        if (show) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenuOverlay.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenuOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }

    // Event listeners for mobile menu
    mobileMenuButton.addEventListener('click', () => toggleMobileMenu(true));
    mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));
    mobileMenuOverlay.addEventListener('click', () => toggleMobileMenu(false));

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link, #mobile-menu a[href^="#"]');

    // Parallax effect for hero section
    const heroSection = document.querySelector('/');
    const heroImage = heroSection.querySelector('img');
    const heroContent = heroSection.querySelector('div:first-child');

    // Intersection Observer for parallax and animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
        observer.observe(section);
    });

    // Parallax scroll effect
    window.addEventListener('scroll', () => {
        // Update active navigation
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('text-primary');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('text-primary');
            }
        });

        // Parallax effect for hero section
        if (heroImage && heroContent) {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
});

// Service content data extracted from blog.html
const serviceContent = {
    'orthopedic-sports': {
        title: 'Orthopedic and Sports Physiotherapy',
        subtitle: 'Physiotherapy assessment and treatment for musculoskeletal and sports injuries in Kanata and Stittsville',
        content: `
            <div class="prose prose-lg max-w-none text-gray-800">
                <p>We provide care for a wide range of musculoskeletal and sports conditions.</p>
                <p>Whether it's a new injury or something that's been lingering for a while. From sprains, strains, and post-surgical rehab to tendonitis, joint pain, arthritis, and repetitive strain injuries, physiotherapy could help you recover and prevent future setbacks.</p>
                
                <h3 class="text-xl mt-6 mb-3 font-bellefair text-primary">Some of the many conditions we provide care for:</h3>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li>Ligament sprains</li>
                    <li>Muscle strains</li>
                    <li>Joint pain and inflammation</li>
                    <li>Arthritis care</li>
                    <li>Repetitive strain injuries</li>
                    <li>Running injuries</li>
                    <li>Neck pain</li>
                    <li>Back pain</li>
                    <li>Chronic pain and inflammatory conditions like Fibromyalgia, Rheumatoid arthritis, Ankylosing Spondylosis</li>
                    <li>Post Surgical rehab for Joint replacements</li>
                    <li>Pre rehab to promote recovery after surgery</li>
                </ul>
                
                <p class="mt-6">We also support Athletes of all levels in managing sport-specific injuries and optimizing performance through tailored rehab and movement strategies.</p>
                
                <p>We provide physiotherapy treatment using advanced techniques like Low Level Laser, Electrotherapy, Therapeutic Ultrasound, Kinesiology Taping, Dynamic Cupping and Functional Dry Needling.</p>
                
                <p class="text-lg font-semibold text-primary mt-6">Whether you're dealing with pain or unable to get back to the activities you love—we're here to get YOU moving confidently again!</p>
            </div>
        `
    },
    'pelvic-floor': {
        title: 'Pelvic Floor Physiotherapy',
        subtitle: 'Pelvic Floor Physiotherapy for Incontinence, prolapse, and pelvic pain management in Kanata and Stittsville',
        content: `
            <div class="prose prose-lg max-w-none text-gray-800">
                <p>Pelvic floor physiotherapy is a specialized area of care that focuses on assessing and treating conditions related to the muscles, joints, and connective tissues of the pelvis.</p>
                <p>With a compassionate and individualized approach, we support individuals through all life stages—from preparing for birth to postpartum recovery to menopause and beyond—helping them regain control, reduce discomfort, and improve overall quality of life.</p>
                <p>Our one-on-one sessions ensure that you feel heard, supported, and empowered in a safe and non-judgmental space!</p>
                
                <h3 class="text-xl mt-6 mb-3 font-bellefair text-primary">Conditions Treated:</h3>
                
                <h4 class="text-lg mt-4 mb-2 font-semibold">Women</h4>
                <ul>
                    <li>Urinary incontinence (stress, urge, or mixed)</li>
                    <li>Urinary frequency, nocturia, incomplete emptying</li>
                    <li>Pelvic organ prolapse</li>
                    <li>Pessary fitting for Prolapse and Incontinence</li>
                    <li>Constipation and Straining with bowel movements</li>
                    <li>Prenatal and labour prep</li>
                    <li>Postpartum recovery- Diastasis Recti, Core Strengthening after birth</li>
                    <li>Painful bladder syndrome/interstitial cystitis</li>
                    <li>Tailbone (coccyx) pain</li>
                    <li>Pre and post-surgical pelvic rehab (e.g. hysterectomy, mesh surgery)</li>
                    <li>Menopause-related pelvic changes</li>
                    <li>Persistent low back, hip, or groin pain related to pelvic dysfunction</li>
                </ul>
                
                <h4 class="text-lg mt-4 mb-2 font-semibold">Men</h4>
                <ul>
                    <li>Urinary incontinence (post-prostatectomy or otherwise)</li>
                    <li>Bladder urgency, frequency, or incomplete emptying</li>
                    <li>Pelvic pain (including pain in the perineum, testicles, or penis)</li>
                    <li>Erectile dysfunction and sexual discomfort</li>
                    <li>Painful ejaculation</li>
                    <li>Constipation or straining with bowel movements</li>
                    <li>Chronic prostatitis / chronic pelvic pain syndrome (CPPS)</li>
                    <li>Tailbone (coccyx) pain</li>
                    <li>Post-surgical pelvic rehabilitation (e.g. prostate surgery)</li>
                    <li>Persistent Lower back, hip, or groin pain related to pelvic floor dysfunction</li>
                </ul>
            </div>
        `
    },
    'eds-hypermobility': {
        title: 'EDS/HSD Hypermobility Physiotherapy',
        subtitle: 'Physiotherapy for Ehlers-Danlos Syndrome and hypermobility spectrum disorders in Kanata and Stittsville',
        content: `
            <div class="prose prose-lg max-w-none text-gray-800">
                <p>We offer physiotherapy for individuals living with Ehlers-Danlos Syndrome (EDS) and Hypermobility Spectrum Disorders (HSD), with a focus on gentle, personalized care that supports joint stability, reduces pain, and improves overall function.</p>
                <p>Our approach is grounded in understanding the unique needs of your hypermobile bodies and fostering long-term resilience through education, movement, and support.</p>
                
                <h3 class="text-xl mt-6 mb-3 font-bellefair text-primary">Conditions commonly treated:</h3>
                <ul>
                    <li>Joint instability and frequent subluxations/dislocations</li>
                    <li>Chronic or widespread pain</li>
                    <li>Fatigue and postural dysfunction</li>
                    <li>Poor proprioception and balance issues</li>
                    <li>Pelvic floor dysfunction</li>
                    <li>Headaches and TMJ pain</li>
                    <li>Exercise intolerance and dysautonomia-related symptoms (e.g. POTS)</li>
                    <li>Recovery support after injuries or flare-ups</li>
                </ul>
                
                <p>We provide physiotherapy treatment using advanced techniques like Low Level Laser, Electrotherapy, Therapeutic Ultrasound, Kinesiology taping for joint stability, Dynamic Cupping and Functional Dry Needling as required tailored to an individual.</p>
                <p>Our care is collaborative, trauma-informed and paced to your needs, empowering you with the tools and strategies to move safely and confidently in your daily life!</p>
                <p>Whether you're newly diagnosed or navigating long-term symptoms, we're here to support you with compassionate care rooted in deep understanding of hypermobility.</p>
                
                <div class="bg-mint-light p-6 rounded-lg mt-8">
                    <h3 class="text-lg font-bellefair text-primary mb-4">Supporting individuals with EDS and Hypermobility: A Physiotherapist's Perspective</h3>
                    <p>Living with Ehlers-Danlos Syndrome (EDS) or Hypermobility Spectrum Disorders (HSD) is not easy — and if you are reading this, chances are you're already aware of that.</p>
                    <p>As a physiotherapist with a special interest in hypermobility and connective tissue disorders, I have had the privilege of working closely with people navigating these conditions. I have seen firsthand how exhausting it can be to feel like your body isn't cooperating with you — the joints that give way, the muscles that always feel tight yet weak, and the constant need to explain that your pain is real, even when it doesn't show up clearly on scans.</p>
                    <p class="font-semibold">I want you to know that I see you, and you're not alone in this!</p>
                </div>
            </div>
        `
    },
    'prenatal-postnatal': {
        title: 'Prenatal and Postnatal Physiotherapy',
        subtitle: 'Physiotherapy for pregnancy and postpartum recovery in Kanata and Stittsville',
        content: `
            <div class="prose prose-lg max-w-none text-gray-800">
                <p>Pregnancy is a time of growth and anticipation—but it can also bring discomfort, pain, or anxiety about labour and delivery. Prenatal physiotherapy offers safe, tailored care to help you stay active, manage pain, and feel more prepared for childbirth.</p>
                <p>At our clinic, we provide one-on-one, hands-on support in a calm, respectful setting. We'll guide you through changes in posture, strength, and movement, while offering tools that empower you throughout pregnancy and into birth.</p>
                
                <h3 class="text-xl mt-6 mb-3 font-bellefair text-primary">How Physiotherapy Can Help During Pregnancy:</h3>
                <ul>
                    <li>Relieve low back, hip, pelvic, or rib pain</li>
                    <li>Address pubic symphysis and SI joint discomfort</li>
                    <li>Support posture and body mechanics as your baby grows</li>
                    <li>Improve pelvic floor awareness and breathing for delivery</li>
                    <li>Manage urinary incontinence or constipation</li>
                    <li>Teach safe movement and exercises for pregnancy</li>
                    <li>Support sleep and comfort with body positioning</li>
                </ul>
                
                <h3 class="text-xl mt-6 mb-3 font-bellefair text-primary">Birth Preparation & Perineal Massage</h3>
                <p>Our birth prep sessions help you feel more confident and in control during labour. We'll work on:</p>
                <ul>
                    <li>Breathing and pushing techniques</li>
                    <li>Pelvic floor relaxation strategies</li>
                    <li>Optimal labour positions</li>
                    <li>Partner education and support techniques</li>
                </ul>
                <p>Perineal massage is taught to help increase perineal tissue flexibility and reduce the risk of tearing during vaginal birth.</p>
                
                <h3 class="text-xl mt-6 mb-3 font-bellefair text-primary">Postnatal Physiotherapy</h3>
                <p>At our clinic, we offer personalized postpartum assessments that go beyond a six-week checkup. We listen to your concerns and guide you through healing with a gentle, holistic approach.</p>
                
                <h4 class="text-lg mt-4 mb-2 font-semibold">How Physiotherapy Can Help After Birth:</h4>
                <ul>
                    <li>Reconnect with core and pelvic floor</li>
                    <li>Support healing after vaginal or C-section delivery</li>
                    <li>Scar tissue release</li>
                    <li>Physiotherapy for blocked milk ducts</li>
                    <li>Address incontinence, prolapse, or pelvic heaviness</li>
                    <li>Ease tailbone, back, or hip pain</li>
                    <li>Treat pain with intercourse</li>
                    <li>Improve posture and strength for feeding and baby care</li>
                    <li>Guide safe return to movement, running, or sport</li>
                </ul>
                
                <p class="text-lg font-semibold text-primary mt-6">The postpartum journey is different for everyone—and healing doesn't follow a strict timeline. Whether you're six weeks or six years postpartum, our physiotherapy care is here to support your recovery, rebuild your strength, and help you feel confident in your changing body!</p>
            </div>
        `
    },
    'pessary-fitting': {
        title: 'Pessary Fitting for Prolapse and Incontinence',
        subtitle: 'Pessary fitting Physiotherapy and follow-up care for prolapse and incontinence in Kanata and Stittsville',
        content: `
            <div class="prose prose-lg max-w-none text-gray-800">
                <p>A pessary is a soft, flexible medical device inserted into the vagina to help support the bladder, uterus, or rectum. It is commonly used to manage pelvic organ prolapse, urinary incontinence, urinary urgency or incomplete bladder emptying providing a non-surgical, effective option for many individuals.</p>
                
                <p>It can be a helpful option during postnatal recovery whether with symptoms of vaginal heaviness while providing care your children, or your symptoms preventing you from returning to your favourite physical activity. It could be beneficial through the menopausal transition, when hormonal changes or physical strain may weaken the pelvic floor.</p>
                
                <p>At our clinic, with advanced physiotherapy training in pessary fitting, your physiotherapist can assess, fit, and guide you through the process in a safe, comfortable, and supportive environment. We take time to ensure the pessary is the right size and type for your body and lifestyle needs.</p>
                
                <h3 class="text-xl mt-6 mb-3 font-bellefair text-primary">How we can help:</h3>
                <ul>
                    <li>Comprehensive pelvic floor assessment</li>
                    <li>Safe and personalized pessary fitting</li>
                    <li>Education on pessary care and use</li>
                    <li>Support for managing prolapse, incontinence, urgency and incomplete emptying</li>
                    <li>Integration of pelvic floor physiotherapy to improve long-term outcomes</li>
                </ul>
                
                <p class="text-lg font-semibold text-primary mt-6">Whether you are looking for an alternative to surgery or want to explore options for managing symptoms, we're here to help you feel empowered and informed every step of the way!</p>
            </div>
        `
    },
    'laser-therapy': {
        title: 'Laser Therapy',
        subtitle: 'Physiotherapy using Non-invasive LASER treatment for pain and inflammation in Kanata and Stittsville',
        content: `
            <div class="prose prose-lg max-w-none text-gray-800">
                <p>Laser therapy is a gentle, non-invasive treatment that uses focused light energy to stimulate the body's natural healing processes. In physiotherapy, laser therapy can be an effective tool to reduce pain, inflammation, and promote tissue repair. It is often used alongside techniques and exercises to help you recover faster and move better.</p>
                
                <h3 class="text-xl mt-6 mb-3 font-bellefair text-primary">Conditions Treated with Laser Therapy in Physiotherapy:</h3>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li>Acute and chronic musculoskeletal pain</li>
                    <li>Joint inflammation (e.g., arthritis, bursitis)</li>
                    <li>Tendon and ligament injuries (e.g., tendinitis, sprains)</li>
                    <li>Muscle strains and spasms</li>
                    <li>Plantar fasciitis and heel pain</li>
                    <li>Soft tissue injuries</li>
                    <li>Carpal tunnel syndrome</li>
                    <li>Nerve-related pain or irritation</li>
                    <li>Delayed wound or scar tissue healing</li>
                    <li>Post-surgical recovery support</li>
                    <li>Scar healing</li>
                </ul>
                
                <p class="text-lg font-semibold text-primary mt-6">Whether you're recovering from an injury or managing a chronic condition, laser therapy at our clinic in Kanata and Stittsville can be a safe and effective part of your physiotherapy plan!</p>
            </div>
        `
    },
    'dry-needling-cupping': {
        title: 'Dry Needling and Cupping',
        subtitle: 'Physiotherapy techniques using needles and cups for pain relief, scar mobilization and muscle recovery in Kanata and Stittsville',
        content: `
            <div class="prose prose-lg max-w-none text-gray-800">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="bg-mint-light p-4 rounded-lg">
                        <h3 class="text-lg font-bellefair text-primary mb-2">Dry Needling</h3>
                        <p>A targeted technique where thin, sterile needles are inserted into myofascial trigger points to reduce pain and improve muscle function.</p>
                    </div>
                    <div class="bg-mint-light p-4 rounded-lg">
                        <h3 class="text-lg font-bellefair text-primary mb-2">Cupping Therapy</h3>
                        <p>A manual therapy using suction cups to lift the soft tissue, increase blood flow, release scar tissue and fascial restrictions, and promote healing.</p>
                    </div>
                </div>
                
                <h3 class="text-xl mt-6 mb-3 font-bellefair text-primary">How Physiotherapy Uses Dry Needling & Cupping to Treat Conditions:</h3>
                <ul class="grid grid-cols-1 gap-2">
                    <li><strong>Headaches & Migraines</strong> – Relieve muscle tension in the neck, upper back, and scalp</li>
                    <li><strong>Chronic Muscle Tightness</strong> – Target deep trigger points that don't respond to stretching or massage</li>
                    <li><strong>Neck & Back Pain</strong> – Decompress soft tissues and release pain-causing knots</li>
                    <li><strong>Sports Injuries</strong> – Speed up recovery from strains, sprains, and overuse injuries</li>
                    <li><strong>Tendonitis & Bursitis</strong> – Reduce inflammation and promote local circulation</li>
                    <li><strong>Postural Imbalances</strong> – Address muscular restrictions contributing to poor alignment</li>
                    <li><strong>Plantar Fasciitis</strong> – Release tight calf and foot muscles to ease heel pain</li>
                    <li><strong>Scar Tissue & Fascial Adhesions</strong> – Loosen restrictions post-surgery or after injury</li>
                    <li><strong>Hypermobility Syndromes</strong> – Reduce muscle guarding and improve motor control</li>
                    <li><strong>Postnatal Recovery</strong> – Relieve tension and support tissue healing after childbirth. Improve C section scar mobilization and break scar tissue</li>
                </ul>
            </div>
        `
    },
    'virtual-physiotherapy': {
        title: 'Virtual Physiotherapy',
        subtitle: 'Online physiotherapy sessions at your convenience across Ontario',
        content: `
            <div class="prose prose-lg max-w-none text-gray-800">
                <h2 class="text-2xl font-bellefair text-primary mb-4">Virtual Physiotherapy – Compassionate Care, Wherever You Are</h2>
                <p>Our virtual physiotherapy sessions offer expert, personalized care in the comfort and safety of your own home. Whether you're a new mom adjusting to postpartum recovery, a person with hypermobility seeking gentle, guided support, or someone who is immunosuppressed and prioritizing health safety, virtual care ensures you don't have to delay the treatment you need.</p>
                
                <h3 class="text-xl mt-6 mb-3 font-bellefair text-primary">Benefits of Virtual Physiotherapy:</h3>
                <ul>
                    <li>One-on-one sessions tailored to your specific needs and pace</li>
                    <li>Guided movement, education, and self-management strategies</li>
                    <li>Safe and accessible care without the need for travel or childcare</li>
                    <li>Flexible scheduling that fits your life</li>
                    <li>Ideal for managing postpartum recovery, joint instability, fatigue, or pain flares from home</li>
                </ul>
                
                <h3 class="text-xl mt-6 mb-3 font-bellefair text-primary">Who can benefit?</h3>
                <div class="grid grid-cols-1 gap-4">
                    <div class="bg-mint-light p-4 rounded-lg">
                        <h4 class="font-semibold text-primary">Postnatal moms:</h4>
                        <p>Receive support for core recovery, pelvic floor rehab, C-section care, and breastfeeding-related strain—all while staying close to your baby.</p>
                    </div>
                    <div class="bg-mint-light p-4 rounded-lg">
                        <h4 class="font-semibold text-primary">Hypermobility spectrum / EDS patients:</h4>
                        <p>Get tailored exercises, pacing strategies, and education on joint protection that fits your day-to-day routine.</p>
                    </div>
                    <div class="bg-mint-light p-4 rounded-lg">
                        <h4 class="font-semibold text-primary">Immunosuppressed individuals:</h4>
                        <p>Maintain your health and function without the risk of clinic exposure, with care designed to meet your energy levels and physical capacity.</p>
                    </div>
                    <div class="bg-mint-light p-4 rounded-lg">
                        <h4 class="font-semibold text-primary">Older adults with mobility issues:</h4>
                        <p>Receive guidance on balance, strength, and fall prevention from home, reducing the need for travel and increasing safety.</p>
                    </div>
                    <div class="bg-mint-light p-4 rounded-lg">
                        <h4 class="font-semibold text-primary">Busy professionals:</h4>
                        <p>Fit physiotherapy into your schedule during your lunch or break time, so your recovery doesn't have to wait.</p>
                    </div>
                </div>
                
                <p class="text-lg font-semibold text-primary mt-6">With one-on-one sessions focused on your goals, virtual physiotherapy ensures that high-quality care is just a click away. Get the care you deserve—where you feel most at ease!</p>
            </div>
        `
    }
};

// Modal functions
function openServiceModal(serviceId) {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const service = serviceContent[serviceId];
    if (service) {
        modalTitle.textContent = service.title;
        modalContent.innerHTML = `
            <div class="mb-6 text-gray-500">${service.subtitle}</div>
            ${service.content}
        `;
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('serviceModal');
    if (e.target === modal) {
        closeServiceModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeServiceModal();
    }
}); 