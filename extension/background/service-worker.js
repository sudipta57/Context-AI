// Background script - runs in the background, handles keyboard shortcut

const API_URL = "https://context-alpha-vert.vercel.app/api";

// Set up sidepanel behavior on install
chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Context extension installed");
  // Enable sidepanel to open on action click
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

// Listen for keyboard shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "save-memory") {
    console.log("🔥 Ctrl+Shift+S pressed! Saving page...");
    await saveCurrentPage();
  } else if (command === "open-sidepanel") {
    console.log("🔥 Ctrl+Shift+E pressed! Opening sidepanel...");
    // Get current window and open sidepanel
    const window = await chrome.windows.getCurrent();
    chrome.sidePanel.open({ windowId: window.id });
  }
});

// Main function: Save the current page as a memory
async function saveCurrentPage() {
  try {
    // Step 1: Get the API key from storage
    const { apiKey } = await chrome.storage.local.get("apiKey");

    if (!apiKey) {
      showNotification(
        "⚠️ Setup Required",
        "Please set your API key in the extension popup first."
      );
      return;
    }

    // Step 2: Get the current tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // Check if this is a valid page
    if (
      !tab.url ||
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://")
    ) {
      showNotification("⚠️ Cannot Save", "This page type cannot be saved.");
      return;
    }

    // Step 3: Inject content script if needed (for pages loaded before extension)
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content/content-script.js"],
      });
    } catch (err) {
      // Content script might already be injected, that's okay
      console.log("Content script already loaded");
    }

    // Step 4: Ask content script to capture page data
    let pageData;
    try {
      pageData = await chrome.tabs.sendMessage(tab.id, {
        action: "capturePage",
      });
    } catch (error) {
      showNotification(
        "❌ Error",
        "Cannot capture this page. Try refreshing the page first."
      );
      return;
    }

    console.log("📄 Captured page:", pageData);

    // Step 5: Show loading notification
    showNotification("⏳ Saving...", "Analyzing page with AI...");

    // Step 6: Send to your backend API
    const response = await fetch(`${API_URL}/memories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(pageData),
    });

    const result = await response.json();

    // Step 7: Show result
    if (result.success) {
      const memory = result.data.memory;
      showNotification(
        "✅ Memory Saved!",
        `${memory.title}\n\n${memory.summary}\n\nTags: ${memory.tags.join(
          ", "
        )}`
      );
      console.log("✅ Memory saved:", memory);
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    showNotification("❌ Error", `Failed to save: ${error.message}`);
  }
}

// Helper: Show a notification
function showNotification(title, message) {
  chrome.notifications.create({
    type: "basic",
    // Use a simple data URL icon instead
    iconUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23667eea'/%3E%3Ctext x='50' y='65' font-size='50' text-anchor='middle' fill='white'%3E🧠%3C/text%3E%3C/svg%3E",
    title: title,
    message: message,
    priority: 2,
  });
}

console.log("✅ Context background script loaded");
