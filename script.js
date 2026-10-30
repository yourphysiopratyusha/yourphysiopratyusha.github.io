document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('site-nav');
    function setMenu(open) {
        if (!menuBtn || !nav) return;
        nav.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
    }
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
        nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    }

    // Active nav link: by page, or by section while scrolling the home page
    const links = nav ? [...nav.querySelectorAll('a:not(.nav-book)')] : [];
    const page = location.pathname.split('/').pop() || 'index.html';
    if (page !== 'index.html') {
        links.forEach(a => { if (a.getAttribute('href') === page) a.classList.add('active'); });
    } else if (links.length) {
        const targets = links
            .map(a => ({ a, el: document.querySelector((a.getAttribute('href') || '').replace(/^\//, '')) }))
            .filter(t => t.el && t.a.getAttribute('href').includes('#'));
        const update = () => {
            let current = null;
            targets.forEach(t => { if (window.scrollY >= t.el.offsetTop - 140) current = t; });
            links.forEach(a => a.classList.toggle('active', !!current && a === current.a));
        };
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    // Reveal on scroll
    const items = document.querySelectorAll('[data-reveal]');
    if (items.length && 'IntersectionObserver' in window) {
        items.forEach((el, i) => { el.style.transitionDelay = (i % 5) * 70 + 'ms'; });
        const io = new IntersectionObserver(es => es.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        }), { threshold: 0.12 });
        items.forEach(el => io.observe(el));
    } else {
        items.forEach(el => el.classList.add('in'));
    }

    // "Is this for me?" picker
    const list = document.getElementById('picker-list');
    if (list) {
        const answers = [
            { label: 'Hypermobile, or living with EDS / HSD', tag: 'EDS / HSD Hypermobility', title: 'Gentle care for hypermobile bodies', body: "Whether you're newly diagnosed or navigating long-term symptoms, care focuses on joint stability, pain reduction and overall function, paced to your needs.", chips: ['Subluxations', 'Widespread pain', 'POTS', 'Proprioception'], cta: 'Explore hypermobility care', service: 'eds-hypermobility' },
            { label: 'Noticing leakage, heaviness or pelvic pain', tag: 'Pelvic Floor Physiotherapy', title: 'Pelvic health, for all genders', body: 'Assessment and treatment for incontinence, prolapse and pelvic pain, with pessary fitting available. One-on-one sessions in a safe and non-judgmental space.', chips: ['Incontinence', 'Prolapse', 'Pessary fitting', 'Menopause'], cta: 'Explore pelvic health', service: 'pelvic-floor' },
            { label: 'Pregnant or postpartum', tag: 'Prenatal & Postnatal', title: 'Support through pregnancy and after', body: "From birth preparation to postpartum recovery. Whether you're six weeks or six years postpartum, care is here to help you rebuild your strength.", chips: ['Birth prep', 'C-section recovery', 'Diastasis recti'], cta: 'See prenatal & postnatal care', service: 'prenatal-postnatal' },
            { label: 'Dealing with an injury or ongoing pain', tag: 'Orthopedic & Sports', title: 'Get moving confidently again', body: 'Sprains, strains, arthritis, running injuries, neck and back pain, and rehab before or after surgery, for athletes of all levels.', chips: ['Sports injuries', 'Back pain', 'Post-surgical rehab'], cta: 'See orthopedic care', service: 'orthopedic-sports' },
            { label: 'Unable to come in person', tag: 'Virtual Physiotherapy', title: 'Care from home, across Ontario', body: 'One-on-one virtual sessions for postpartum recovery, hypermobility, immunosuppressed individuals, older adults and busy professionals.', chips: ['No travel', 'Flexible scheduling'], cta: 'Learn about virtual care', service: 'virtual-physiotherapy' },
        ];
        const $ = id => document.getElementById(id);
        const buttons = answers.map((a, i) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'opt';
            b.innerHTML = '<span></span><span class="arr"></span>';
            b.firstChild.textContent = a.label;
            b.addEventListener('click', () => pick(i));
            list.appendChild(b);
            return b;
        });
        function pick(i) {
            const a = answers[i];
            buttons.forEach((b, j) => {
                b.setAttribute('aria-pressed', String(i === j));
                b.querySelector('.arr').textContent = i === j ? '→' : '';
            });
            $('ans-tag').textContent = a.tag;
            $('ans-title').textContent = a.title;
            $('ans-body').textContent = a.body;
            $('ans-chips').replaceChildren(...a.chips.map(c => Object.assign(document.createElement('span'), { textContent: c })));
            const cta = $('ans-cta');
            cta.textContent = a.cta + ' →';
            cta.onclick = () => openServiceModal(a.service);
        }
        pick(0);
    }
});

// Service content data extracted from blog.html
const serviceContent = {
    'orthopedic-sports': {
        title: 'Orthopedic and Sports Physiotherapy',
        subtitle: 'Physiotherapy assessment and treatment for musculoskeletal and sports injuries in Kanata and Stittsville, Ottawa',
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
        subtitle: 'Pelvic Floor Physiotherapy for Incontinence, prolapse, and pelvic pain management in Kanata and Stittsville, Ottawa',
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
        subtitle: 'Physiotherapy for Ehlers-Danlos Syndrome and hypermobility spectrum disorders in Kanata and Stittsville, Ottawa',
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
                    <p>I want you to know that I see you, and you're not alone in this!</p>

                    <h3 class="text-lg mt-6 mb-2 font-bellefair">Why Your Body Feels the Way It Does</h3>
                    <p>With EDS and hypermobility, the collagen in your connective tissues isn't as strong or structured as it should be. This can lead to joints that move too much, muscles that work overtime to stabilize, and a nervous system that's often on high alert — which makes sense, because if your body doesn't feel stable, your brain starts working overtime to protect you.</p>
                    
                    <p>You might experience:</p>
                    <ul>
                        <li>Frequent sprains, strains, subluxations or dislocations</li>
                        <li>Pain that moves around or lingers</li>
                        <li>Fatigue and muscle tightness that just never seems to go away</li>
                        <li>Dizziness or light-headedness with certain positions</li>
                        <li>Anxiety around movement or fear of injury</li>
                        <li>Delayed healing and sensitivity to touch or pressure</li>
                    </ul>
                    <p>Most of the people I see have gone through years of trying to figure out what's going on — often misdiagnosed, misunderstood, or told to "just be careful."</p>
                    <p>But careful isn't the same as supported. And that's where physiotherapy comes in.</p>

                    <h3 class="text-lg mt-6 mb-2 font-bellefair">How Physiotherapy Can Help — From Someone Who Gets It</h3>
                    <p>My approach is gentle, tailored, and always collaborative. <strong>YOU</strong> are the expert of your body — I'm just here to help guide and support it.</p>

                    <h4 class="text-base mt-4 mb-2 font-semibold">🧠 We Start with Understanding</h4>
                    <p>First, I help you better understand how hypermobility affects your body. Together, we identify your unique patterns and talk about what's happening beneath the pain. This often includes conversations about pacing, energy conservation, and nervous system regulation — things that don't always get enough attention in traditional rehab.</p>

                    <h4 class="text-base mt-4 mb-2 font-semibold">🏋️‍♀️ We Build Strength (Slowly and Safely)</h4>
                    <p>Strength training is a cornerstone of managing hypermobility, but it must be done right. We'll start small — maybe just holding a muscle contraction or using bodyweight — and progress gently, always with your body's feedback in mind. The goal is to create more control around the joints and help your body feel safe again in movement.</p>

                    <h4 class="text-base mt-4 mb-2 font-semibold">🦶 We Train Your Body's Awareness</h4>
                    <p>Many people with EDS or HSD struggle with proprioception — your body's ability to sense where it is in space. We work on balance, joint positioning, and coordination to reduce injury risk and help you feel more grounded and confident in your movement.</p>

                    <h4 class="text-base mt-4 mb-2 font-semibold">🌿 We Manage Pain Holistically</h4>
                    <p>I use a combination of techniques like soft tissue release as needed using cupping or dry needling, breath work, and gentle joint care. We also address the nervous system — because living with chronic pain or instability often affects your whole being, not just your body.</p>

                    <h4 class="text-base mt-4 mb-2 font-semibold">🧭 We Create a Life You Can Move Freely In</h4>
                    <p>Whether your goal is to return to physical activities/sports, chase your toddler, stand or sit at work without pain, or just feel a little more in control of your body — I'm here to support you in building a movement routine that works with your body, not against it.</p>

                    <h3 class="text-lg mt-6 mb-2 font-bellefair">You Deserve to Feel Supported in Your Body</h3>
                    <p>You've probably been told to "strengthen your core" or "avoid certain movements" without a clear plan or understanding of what that means for YOU. That's not good enough — and you deserve better.</p>
                    <p>My role as your physiotherapist is not to push you or "fix" you, but to walk beside you and offer tools, strategies, and encouragement so you can feel stronger, steadier, and more at home in your body.</p>
                    <p>With the right approach, hypermobility doesn't have to hold you back. It just needs the right kind of support ☺</p>
                    
                    <p class="mt-6 font-semibold">If you're living with EDS or HSD and looking for someone who understands the nuances of your condition, I'd love to help. Let's work together to build a plan that feels right for you!</p>
                </div>
            </div>
        `
    },
    'prenatal-postnatal': {
        title: 'Prenatal and Postnatal Physiotherapy',
        subtitle: 'Physiotherapy for pregnancy and postpartum recovery in Kanata and Stittsville, Ottawa',
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
        subtitle: 'Pessary fitting Physiotherapy and follow-up care for prolapse and incontinence in Kanata and Stittsville, Ottawa',
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
        subtitle: 'Physiotherapy using Non-invasive LASER treatment for pain and inflammation in Kanata and Stittsville, Ottawa',
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
                
                <p class="text-lg font-semibold text-primary mt-6">Whether you're recovering from an injury or managing a chronic condition, laser therapy at our clinic in Kanata and Stittsville, Ottawa can be a safe and effective part of your physiotherapy plan!</p>
            </div>
        `
    },
    'dry-needling-cupping': {
        title: 'Dry Needling and Cupping',
        subtitle: 'Physiotherapy techniques using needles and cups for pain relief, scar mobilization and muscle recovery in Kanata and Stittsville, Ottawa',
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
        modal.hidden = false;
        document.body.classList.add('overflow-hidden');
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('overflow-hidden');
}

// Close modal when clicking outside
document.addEventListener('click', function (e) {
    const modal = document.getElementById('serviceModal');
    if (modal && e.target === modal) {
        closeServiceModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeServiceModal();
    }
}); 