# 🚀 Complete Setup Guide - Context Extension with Sidepanel

## 📋 Prerequisites

1. ✅ Backend API running on `http://localhost:5000`
2. ✅ Chrome browser installed
3. ✅ Sidepanel built successfully

---

## 🔧 Step-by-Step Installation

### 1️⃣ **Verify Sidepanel Build**

The sidepanel has been built and is ready at:

```
extension/sidepanel/dist/
```

If you need to rebuild:

```bash
cd extension/sidepanel
npm run build
```

### 2️⃣ **Load Extension in Chrome**

1. Open Chrome and navigate to:

   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode** (toggle in top-right corner)

3. Click **"Load unpacked"** button

4. Navigate to and select:

   ```
   D:\allInOne\Projects\Hackathon\Gen AI MSIT\Context\extension
   ```

5. The extension should appear with:
   - Name: **Context**
   - Version: **1.0.0**
   - Icon: 🧠

### 3️⃣ **Configure API Key**

**First Time Setup:**

1. Click the **Context extension icon** in Chrome toolbar (pin it if needed)
2. A popup will appear asking for your API key
3. Enter your API key (format: `ctx_xxxxx`)
4. Click **"Save API Key"**
5. You'll see a success message ✅

**Where to Get API Key:**

- Register at your backend API
- Or use an existing API key if you have one
- The key is stored securely in Chrome storage

### 4️⃣ **Open the Sidepanel**

**Method 1: Via Popup**

1. Click the Context extension icon
2. Click **"Open Sidepanel 📚"** button
3. Sidepanel slides in from the right

**Method 2: Via Keyboard Shortcut**

- Press `Ctrl+Shift+E` (Windows/Linux)
- Press `Command+Shift+E` (Mac)

**Method 3: Via Right-Click**

1. Right-click the Context extension icon
2. Select "Open Side Panel"

---

## 🎨 Using the Sidepanel

Once opened, you'll see four navigation tabs:

### 📊 **Dashboard**

- View your statistics
- See top tags and intent distribution
- Browse recent memories

### 💬 **Chat**

- Ask questions about your saved pages
- Get AI-powered answers with source citations
- Try suggested questions

### 📚 **Memories**

- Browse all saved pages
- Filter by intent (Learning, Research, Shopping, etc.)
- Search by title, tags, or summary
- Delete unwanted memories

### 🔍 **Search**

- Perform semantic search
- Adjust similarity threshold
- Find relevant memories by meaning, not just keywords

---

## 💾 Saving Pages

### **Save Current Page:**

**Method 1: Keyboard Shortcut**

- Press `Ctrl+Shift+S` on any webpage
- Page is automatically captured and analyzed

**Method 2: Extension Icon**

- Click the Context icon
- The current page is saved automatically

**What Gets Saved:**

- ✅ Page title
- ✅ URL
- ✅ Main content
- ✅ AI-generated summary
- ✅ Extracted tags
- ✅ Intent classification
- ✅ Importance rating

---

## 🔄 Complete Workflow Example

### **Scenario: Researching React**

1. **Browse React Documentation**

   - Visit `https://react.dev/learn`
   - Press `Ctrl+Shift+S` to save
   - Notification appears: "✅ Memory Saved!"

2. **Save Multiple Pages**

   - Visit React Hooks tutorial → `Ctrl+Shift+S`
   - Visit React Context tutorial → `Ctrl+Shift+S`
   - Visit React Performance tips → `Ctrl+Shift+S`

3. **Open Sidepanel**

   - Press `Ctrl+Shift+E` or click extension icon → "Open Sidepanel"

4. **View Your Memories**

   - Click **📚 Memories** tab
   - Filter by "Learning" intent
   - See all your React pages

5. **Search Semantically**

   - Click **🔍 Search** tab
   - Type: "React state management"
   - See relevant pages with similarity scores

6. **Chat with Your Knowledge**

   - Click **💬 Chat** tab
   - Ask: "What are the main React hooks I saved?"
   - Get AI answer with source citations
   - Click sources to revisit pages

7. **Check Statistics**
   - Click **📊 Dashboard** tab
   - See how many pages saved
   - View popular tags
   - Check intent distribution

---

## ⚙️ Extension Configuration

### **Keyboard Shortcuts**

| Shortcut       | Action            |
| -------------- | ----------------- |
| `Ctrl+Shift+S` | Save current page |
| `Ctrl+Shift+E` | Open sidepanel    |

**To Customize Shortcuts:**

1. Go to `chrome://extensions/shortcuts`
2. Find "Context" extension
3. Click pencil icon to edit
4. Set your preferred keys

### **Permissions**

The extension requires:

- ✅ `activeTab` - Access current page content
- ✅ `storage` - Store API key and settings
- ✅ `notifications` - Show save confirmations
- ✅ `scripting` - Inject content capture script
- ✅ `sidePanel` - Display sidepanel interface

### **API Key Storage**

Your API key is stored in:

```javascript
chrome.storage.local.set({ apiKey: "ctx_xxxxx" });
```

**To View/Update via Console:**

```javascript
// View current key
chrome.storage.local.get("apiKey", (result) => {
  console.log(result.apiKey);
});

// Update key
chrome.storage.local.set({ apiKey: "ctx_new_key" });

// Remove key
chrome.storage.local.remove("apiKey");
```

---

## 🐛 Troubleshooting

### **Sidepanel Won't Open**

❌ **Problem:** Clicking extension icon does nothing

✅ **Solutions:**

1. Verify extension is loaded at `chrome://extensions/`
2. Check if "Context" extension shows errors
3. Click "Reload" on the extension card
4. Check browser console for errors
5. Verify `sidepanel/dist/` folder exists

### **API Key Not Working**

❌ **Problem:** "Invalid API key" error

✅ **Solutions:**

1. Verify backend is running: `http://localhost:5000`
2. Check API key format starts with `ctx_`
3. Test API key with curl:
   ```bash
   curl -H "x-api-key: ctx_xxxxx" http://localhost:5000/api/memories
   ```
4. Re-enter API key in popup

### **No Memories Showing**

❌ **Problem:** Sidepanel is empty

✅ **Solutions:**

1. Save at least one page first (`Ctrl+Shift+S`)
2. Check if backend is running
3. Verify API key is set correctly
4. Check browser console for API errors
5. Look at Network tab (F12) for failed requests

### **Chat Not Responding**

❌ **Problem:** Chat shows error or hangs

✅ **Solutions:**

1. Verify backend `/api/chat` endpoint works
2. Check if you have saved memories (chat needs context)
3. Look for error message below chat input
4. Refresh sidepanel (close and reopen)
5. Check backend logs for errors

### **Build Errors**

❌ **Problem:** `npm run build` fails

✅ **Solutions:**

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear npm cache: `npm cache clean --force`
4. Update Node.js to latest version
5. Check for Tailwind CSS errors in console

---

## 🎯 Quick Reference

### **File Structure**

```
extension/
├── manifest.json              # Extension config ✅ Updated
├── background/
│   └── service-worker.js      # Background script ✅ Updated
├── popup/
│   ├── popup.html             # Popup UI ✅ Updated
│   ├── popup.js               # Popup logic ✅ Updated
│   └── popup.css              # Popup styles ✅ Updated
├── content/
│   └── content-script.js      # Page content capture
└── sidepanel/
    └── dist/                  # Built React app ✅ Ready
        ├── index.html
        └── assets/
```

### **API Endpoints Used**

- `POST /api/memories` - Save new memory
- `GET /api/memories` - Fetch all memories
- `GET /api/memories/stats` - Get statistics
- `POST /api/search/semantic` - Semantic search
- `POST /api/chat` - RAG chat
- `GET /api/auth/verify-api-key` - Verify API key

### **Chrome APIs Used**

- `chrome.sidePanel.open()` - Open sidepanel
- `chrome.storage.local` - Store API key
- `chrome.tabs.sendMessage()` - Communicate with content script
- `chrome.notifications.create()` - Show notifications
- `chrome.commands.onCommand` - Handle keyboard shortcuts

---

## 📱 Development Mode

### **Testing Changes**

1. **Sidepanel Changes:**

   ```bash
   cd extension/sidepanel
   npm run dev
   ```

   Temporarily update `manifest.json`:

   ```json
   "side_panel": {
     "default_path": "http://localhost:5173"
   }
   ```

2. **Extension Changes:**

   - Make your changes
   - Go to `chrome://extensions/`
   - Click reload icon on Context extension
   - Test immediately

3. **Before Production:**

   ```bash
   cd extension/sidepanel
   npm run build
   ```

   Revert `manifest.json`:

   ```json
   "side_panel": {
     "default_path": "sidepanel/dist/index.html"
   }
   ```

---

## 🎉 Success Checklist

- [ ] Extension loaded in Chrome
- [ ] API key configured
- [ ] Backend running on port 5000
- [ ] Can save pages with `Ctrl+Shift+S`
- [ ] Can open sidepanel with `Ctrl+Shift+E`
- [ ] Dashboard shows statistics
- [ ] Can browse memories
- [ ] Semantic search works
- [ ] Chat responds with AI answers
- [ ] All four views accessible

---

## 🆘 Need Help?

**Console Debugging:**

```javascript
// In sidepanel (Right-click → Inspect)
chrome.storage.local.get("apiKey", console.log);

// In background script (Extensions page → "service worker")
console.log("Background running");

// In content script (Page console)
console.log("Content script loaded");
```

**Check Manifest Errors:**

```
chrome://extensions/?errors=<extension-id>
```

**View Extension Storage:**

```
chrome://settings/content/all?search=context
```

---

## 🚀 You're All Set!

Your Context extension with sidepanel is now fully integrated and ready to use!

Start saving pages, building your knowledge base, and chatting with your memories! 🧠✨
