import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.js'
import DB2Service from './db2-service.js'

document.querySelector('#app').innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src=${viteLogo} class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Content Repurposer Pro</h1>
    <p>Turn 1 video into 10+ pieces of content. Monetize smarter, not harder.</p>
    <div class="status-badge">
      <span class="badge demo">🚀 Live Demo</span>
      <span class="status-text">GitHub Pages Deployment</span>
    </div>
  </div>
  <button id="counter" type="button" class="counter"></button>
  <button id="db-test" type="button" class="db-test">Test Database</button>
  <div id="db-result"></div>

  <div class="demo-content-form">
    <h3>🚀 Try Content Repurposing</h3>
    <p>Enter some content below to see how it would be processed:</p>
    <input type="text" id="content-title" placeholder="Content title (e.g., 'My Product Launch')" class="content-input">
    <textarea id="content-text" placeholder="Paste your content here... (articles, scripts, social posts, etc.)" class="content-textarea"></textarea>
    <div class="form-actions">
      <button id="process-content" class="process-btn">🎯 Repurpose Content</button>
      <button id="clear-content" class="clear-btn">Clear</button>
    </div>
    <div id="process-result" class="process-result"></div>
  </div>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Documentation</h2>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src=${viteLogo} alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img class="button-icon" src="${javascriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`

setupCounter(document.querySelector('#counter'))

// DB2 Database functionality
const dbService = new DB2Service()
const dbTestButton = document.querySelector('#db-test')
const dbResult = document.querySelector('#db-result')

dbTestButton.addEventListener('click', async () => {
  dbResult.textContent = 'Testing database connection...'
  dbTestButton.disabled = true

  try {
    const result = await dbService.testConnection()
    if (result.success) {
      dbResult.innerHTML = `<div style="color: green;">✅ ${result.message}</div>`
    } else if (result.error === 'DEMO_MODE') {
      dbResult.innerHTML = `
        <div style="color: orange; background: #fff3cd; padding: 12px; border-radius: 8px; border: 1px solid #ffeaa7;">
          <strong>📋 Demo Mode</strong><br>
          ${result.message}<br><br>
          <strong>To enable full DB2 functionality:</strong><br>
          • Deploy to a server with Node.js backend<br>
          • Configure DB2 credentials in environment variables<br>
          • Use a platform like Vercel, Netlify Functions, or Heroku
        </div>`
    } else {
      dbResult.innerHTML = `<div style="color: red;">❌ ${result.message}</div>`
    }
  } catch (error) {
    dbResult.innerHTML = `<div style="color: red;">❌ Connection failed: ${error.message}</div>`
  } finally {
    dbTestButton.disabled = false
  }
})

// Demo content processing functionality
const processButton = document.getElementById('process-content')
const clearButton = document.getElementById('clear-content')
const processResult = document.getElementById('process-result')
const contentTitle = document.getElementById('content-title')
const contentText = document.getElementById('content-text')

processButton.addEventListener('click', async () => {
  const title = contentTitle.value.trim()
  const text = contentText.value.trim()

  if (!title || !text) {
    processResult.innerHTML = '<div style="color: orange;">⚠️ Please enter both a title and content to repurpose.</div>'
    return
  }

  processButton.disabled = true
  processButton.textContent = '🔄 Processing...'
  processResult.innerHTML = '<div style="color: blue;">🤖 AI is analyzing your content...</div>'

  // Simulate processing delay
  setTimeout(() => {
    const repurposedContent = generateRepurposedContent(title, text)
    processResult.innerHTML = repurposedContent
    processButton.disabled = false
    processButton.textContent = '🎯 Repurpose Content'
  }, 2000)
})

clearButton.addEventListener('click', () => {
  contentTitle.value = ''
  contentText.value = ''
  processResult.innerHTML = ''
})

function generateRepurposedContent(title, content) {
  // Demo repurposing logic - in real app this would use AI
  const wordCount = content.split(' ').length
  const readingTime = Math.ceil(wordCount / 200) // Average reading speed

  return `
    <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-top: 16px;">
      <h4 style="color: #2c3e50; margin-top: 0;">📊 Content Analysis Complete!</h4>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 16px 0;">

        <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #3498db;">
          <h5 style="margin: 0; color: #3498db;">📝 Original Content</h5>
          <p style="margin: 8px 0; font-size: 24px; font-weight: bold;">${wordCount} words</p>
          <p style="margin: 0; color: #7f8c8d;">~${readingTime} min read</p>
        </div>

        <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #e74c3c;">
          <h5 style="margin: 0; color: #e74c3c;">🔄 Repurposing Ideas</h5>
          <ul style="margin: 8px 0; padding-left: 20px;">
            <li>Twitter Thread (280 chars each)</li>
            <li>LinkedIn Article</li>
            <li>Blog Post</li>
            <li>YouTube Script</li>
          </ul>
        </div>

        <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #27ae60;">
          <h5 style="margin: 0; color: #27ae60;">💰 Monetization Potential</h5>
          <p style="margin: 8px 0; font-size: 18px; font-weight: bold;">$50-200/month</p>
          <p style="margin: 0; color: #7f8c8d;">Estimated earnings</p>
        </div>

      </div>

      <div style="background: #ecf0f1; padding: 16px; border-radius: 8px; margin-top: 16px;">
        <h5 style="margin: 0 0 12px 0; color: #2c3e50;">🎯 Next Steps:</h5>
        <ol style="margin: 0; padding-left: 20px;">
          <li>Connect to DB2 database for persistent storage</li>
          <li>Integrate AI service (OpenAI/Claude) for smart repurposing</li>
          <li>Add social media posting automation</li>
          <li>Track performance analytics</li>
        </ol>
      </div>

      <p style="margin: 16px 0 0 0; font-size: 14px; color: #7f8c8d;">
        <strong>Note:</strong> This is a demo. Full functionality requires backend deployment with database and AI services.
      </p>
    </div>
  `
}
