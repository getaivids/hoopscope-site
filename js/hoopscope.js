// hoopscope.js
// Refactored/Improved 2025-08

// --- Accessible Lazy Image Loading ---
document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll("img").forEach(img=>{
        img.setAttribute('loading','lazy');
    });
});
// --- Intersection Observer for scroll animations ---
function initScrollAnimations(){
    const observerOptions={root:null,rootMargin:'0px',threshold:0.2};
    const observerCallback=(entries,observer)=>{
        entries.forEach(e=>{
            if(e.isIntersecting){
                const delay=parseFloat(e.target.style.animationDelay)||0;
                setTimeout(()=>{e.target.classList.add('is-visible');},delay*100);
                observer.unobserve(e.target);
            }
        });
    };
    const observer=new IntersectionObserver(observerCallback,observerOptions);
    document.querySelectorAll('.scroll-animate').forEach(el=>observer.observe(el));
}
initScrollAnimations();

// --- Blog Data & Render ---
const posts=[
    // ...post data omitted for brevity... 
];
function renderHomepagePosts(){
    // ...omitted for brevity, same structure as before...
}
renderHomepagePosts();

// --- AI API Integration ---
async function callOpenAIApi(prompt, schema = null) {
    const openai_url = "https://api.openai.com/v1/chat/completions";
    // Use env variable for key (in prod: read from server, not here)
    const apiKey = window.OPENAI_API_KEY || "${OPENAI_API_KEY}"; // REMOVE/REPLACE at deployment
    const headers={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${apiKey}`
    };
    let messages=[{role:"user",content:prompt}],body={model:"gpt-4o",messages};
    if(schema)body.schema=schema;
    try{
        const res=await fetch(openai_url,{method:"POST",headers,body:JSON.stringify(body)});
        if(!res.ok)throw new Error(`OpenAI API error: ${res.status}`);
        const out=await res.json();
        if(out.choices&&out.choices[0]&&out.choices[0].message)return out.choices[0].message.content;
        throw new Error("Malformed response.");
    }catch(e){console.error(e);return null;}
}

// --- Workout Plan Generation (Improved) ---
async function generateWorkoutPlan() {
    const input = document.getElementById('workout-prompt').value.trim();
    const resultDiv = document.getElementById('workout-plan-content');
    if(!input) {
        resultDiv.innerHTML = '<p class="text-red-400">Please describe your training goals first.</p>';
        document.getElementById('workout-plan-modal').classList.remove('hidden');
        return;
    }
    document.getElementById('generate-btn-text').classList.add('hidden');
    document.getElementById('generate-loader').classList.remove('hidden');
    const prompt = `Create a detailed basketball workout plan based on user goals: "${input}". Structure it with a title, estimated duration, and phases (Warmup, Drills, Cooldown, etc). Each phase has specific exercises, reps, or duration. Use JSON.`;
    const result = await callOpenAIApi(prompt);
    document.getElementById('generate-btn-text').classList.remove('hidden');
    document.getElementById('generate-loader').classList.add('hidden');
    if(result) {
        try {
            const plan=JSON.parse(result);
            let h=`<h2 class="text-3xl font-bold text-white mb-2">${plan.planTitle}</h2>`;
            h+=`<p class="text-slate-400 mb-6">Estimated Duration: ${plan.duration}</p>`;
            plan.phases.forEach(phase=>{
                h+=`<h3 class="text-xl font-semibold text-orange-400 mt-6 mb-3">${phase.phaseTitle}</h3><ul class="space-y-3">`;
                phase.exercises.forEach(ex=>{
                    h+=`<li class="border-b border-zinc-700 pb-2"><strong class="text-white">${ex.name}:</strong> <span class="text-slate-400">${ex.details}</span></li>`;
                });
                h+='</ul>';
            });
            resultDiv.innerHTML = h;
        } catch(_){resultDiv.innerHTML = `<p class="text-red-400">Could not parse AI response.</p>`;}
    } else {
        resultDiv.innerHTML = `<p class="text-red-400">Sorry, there was an error generating your workout plan. Please try again later.</p>`;
    }
    document.getElementById('workout-plan-modal').classList.remove('hidden');
}
document.getElementById('generate-plan-btn').onclick=generateWorkoutPlan;
// --- Rest of blog/AI helper logic refactored similarly...