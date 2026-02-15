// Optimized for speed - minimal blocking operations
document.addEventListener('DOMContentLoaded',function(){
    // Mobile menu
    const m=document.getElementById('mobileMenuBtn'),n=document.getElementById('navLinks');
    if(m&&n){
        m.addEventListener('click',()=>{
            n.classList.toggle('active');
            m.textContent=n.classList.contains('active')?'✕':'☰';
        });
        n.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>{
            n.classList.remove('active');
            m.textContent='☰';
        }));
    }
    
    // Services dropdown toggle for mobile
    const d=document.getElementById('servicesDropdown');
    if(d){
        const t=d.querySelector('.dropdown-toggle');
        if(t){
            t.addEventListener('click',(e)=>{
                if(window.innerWidth<=968){
                    e.preventDefault();
                    d.classList.toggle('active');
                }
            });
        }
    }
    
    // Header scroll - throttled
    let l=0,t=document.getElementById('header');
    if(t){
        let r=null;
        window.addEventListener('scroll',()=>{
            if(r)return;
            r=requestAnimationFrame(()=>{
                let c=window.pageYOffset;
                if(c>100){
                    if(c>l)t.classList.add('hidden');
                    else t.classList.remove('hidden');
                }else t.classList.remove('hidden');
                l=c;r=null;
            });
        });
    }
    
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(b=>{
        b.addEventListener('click',()=>{
            let i=b.parentElement,a=i.classList.contains('active');
            i.parentElement.querySelectorAll('.faq-item').forEach(f=>f.classList.remove('active'));
            if(!a)i.classList.add('active');
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener('click',function(e){
            e.preventDefault();
            let t=document.querySelector(this.getAttribute('href'));
            if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
        });
    });
});

const form = document.getElementById('contact-form');
const statusElement = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusElement.textContent = "Sending...";

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    message: form.message.value
  };

  try {
    const response = await fetch('/.netlify/functions/send-clicksend', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if(result.success){
      statusElement.textContent = "Message sent successfully!";
      form.reset();
    } else {
      statusElement.textContent = "Failed to send message. Try again later.";
    }
  } catch (err) {
    statusElement.textContent = "Error sending message.";
    console.error(err);
  }
});