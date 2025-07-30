// Hoopscope Main JS (improved)
// All async AI functions now use OpenAI API securely
// See README for API proxy instructions.
// Lazy loading, error handling, accessibility, and responsive enhancements included

const posts = [
  { title: "The Biomechanics of an Unshakeable Handle", author: "Dr. Evelyn Reed", date: "September 18, 2025", category: "Analytics", image: "https://images.unsplash.com/photo-1598136397221-717618571b56?q=80&w=2070&auto=format&fit=crop", content: `<h1>The Science of Ball Control..</h1>`},
  { title: "Beyond the Arc: How Shot-Selection Defines Modern Offenses", author: "Alex Rivera", date: "July 5, 2025", category: "Analytics", image: "https://images.unsplash.com/photo-1608245449223-342757f43769?q=80&w=2070&auto=format&fit=crop", content: "<h1>The Three-Point Revolution...</h1>"},
  { title: "A Day in the Life: Off-Season Training with a Pro", author: "Jasmine Chen", date: "June 28, 2025", category: "Pro Insights", image: "https://images.unsplash.com/photo-1594488541269-c4b5a73c3374?q=80&w=1974&auto=format&fit=crop", content: "<h2>It's More Than Just Practice...</h2>"}
];

function createPostElement(post, index) {
  const contentSnippet = post.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';
  // Use loading="lazy" for performance
  return `<div class="card-bg rounded-2xl overflow-hidden flex flex-col scroll-animate" tabindex="0">
      <a href="hoopscope-blog-final.html" class="block hover:opacity-80 transition-opacity">
        <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x400/111111/444444?text=No+Image';">
      </a>
      <div class="p-6 flex flex-col flex-grow">
        <span class="text-orange-400 font-semibold text-sm">${post.category}</span>
        <h3 class="text-xl font-bold text-white my-2">${post.title}</h3>
        <p class="text-slate-400 text-sm mb-4 flex-grow">${contentSnippet}</p>
        <div class="flex items-center justify-between text-xs text-slate-500 mt-auto">
          <span>By ${post.author} &bull; ${post.date}</span>
          <button data-index="${index}" class="ai-blog-btn text-orange-400 font-semibold flex items-center gap-1 focus:ring-2 ring-orange-500 rounded hover:text-orange-300">✨ Ask AI</button>
        </div>
      </div>
    </div>`;
}

function renderHomepagePosts() {
  const grid = document.getElementById('blog-grid-homepage');
  if (!grid) return;
  grid.innerHTML = posts.slice(0, 3).map(createPostElement).join('');
}
document.addEventListener('DOMContentLoaded', () => {
  renderHomepagePosts();
  // Intersection observer for animation
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .2});
  document.querySelectorAll('.scroll-animate').forEach(el => io.observe(el));
});

// --- AI features ---
async function callOpenAIApi(prompt, schema = undefined) {
  try {
    // The API URL and key must be proxied by your backend for security, not hardcoded
    const response = await fetch('/api/openai-completions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({prompt, schema})
    });
    if (!response.ok) throw new Error('OpenAI API Error: ' + response.status);
    const result = await response.json();
    return result.text;
  } catch (error) {
    return 'Analysis not available: ' + error.message;
  }
}

// Workout plan generator
document.getElementById('generate-plan-btn').addEventListener('click', async () => {
  const userInput = document.getElementById('workout-prompt').value;
  const workoutPlanContent = document.getElementById('workout-plan-content');
  if (!userInput.trim()) {
    workoutPlanContent.innerHTML = `<p class="text-red-400">Please describe your training goals first.</p>`;
    document.getElementById('workout-plan-modal').classList.remove('hidden');
    return;
  }
  document.getElementById('generate-btn-text').classList.add('hidden');
  document.getElementById('generate-loader').classList.remove('hidden');
  const prompt = `Create a detailed basketball workout plan for: "${userInput}". Include clear phases and instructions.`;
  const plan = await callOpenAIApi(prompt);
  workoutPlanContent.innerHTML = `<pre>${plan}</pre>`;
  document.getElementById('generate-btn-text').classList.remove('hidden');
  document.getElementById('generate-loader').classList.add('hidden');
  document.getElementById('workout-plan-modal').classList.remove('hidden');
});

document.getElementById('close-workout-modal-btn').addEventListener('click', () => document.getElementById('workout-plan-modal').classList.add('hidden'));
// Blog summary AI
document.getElementById('blog-grid-homepage').addEventListener('click', async e => {
  const btn = e.target.closest('.ai-blog-btn');
  if (!btn) return;
  e.preventDefault();
  const idx = btn.dataset.index;
  const content = posts[idx].content.replace(/<[^>]*>?/gm, '');
  document.getElementById('blog-helper-modal').classList.remove('hidden');
  document.getElementById('blog-helper-output').textContent = 'Generating...';
  const result = await callOpenAIApi(`Summarize in 3 bullets: ${content}`);
  document.getElementById('blog-helper-output').textContent = result;
});
document.getElementById('close-blog-helper-modal-btn').addEventListener('click', () => document.getElementById('blog-helper-modal').classList.add('hidden'));

document.getElementById('blog-helper-ask-btn').addEventListener('click', async () => {
  const input = document.getElementById('blog-helper-prompt');
  const question = input.value;
  if (!question.trim()) return;
  document.getElementById('blog-helper-output').textContent = 'Thinking...';
  // Context: last article summary used
  const context = posts[0].content.replace(/<[^>]*>?/gm, ''); // In final version, store last used
  const result = await callOpenAIApi(`${question}\nArticle: ${context}`);
  document.getElementById('blog-helper-output').textContent = result;
  input.value = '';
});
