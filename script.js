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