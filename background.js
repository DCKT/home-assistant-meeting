(async function () {
  const { options } = await chrome.storage.sync.get("options");

  let HA_API_URL = options.homeAssistantApiUrl;
  let HA_ENTITY = options.homeAssistantEntity;
  let HA_API_TOKEN = options.homeAssistantApiToken;

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.options?.newValue?.homeAssistantApiUrl) {
      HA_API_URL = changes.options.newValue.homeAssistantApiUrl;
    }
    if (area === "sync" && changes.options?.newValue?.homeAssistantApiToken) {
      HA_API_TOKEN = changes.options.newValue.homeAssistantApiToken;
    }
    if (area === "sync" && changes.options?.newValue?.homeAssistantEntity) {
      HA_ENTITY = changes.options.newValue.homeAssistantEntity;
    }
  });

  async function updateEntity(state) {
    const body = { state: state };

    return await fetch(`${HA_API_URL}/api/states/${HA_ENTITY}`, {
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HA_API_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  const hasActiveTab = async () => {
    const meetTab = await chrome.tabs.query({
      url: "https://meet.google.com/*",
    });
    const zoomTab = await chrome.tabs.query({ url: "https://zoom.us/*" });

    return meetTab.length || zoomTab.length;
  };

  const onTabCreation = async (tab) => {
    const hasActiveTab = await hasActiveTab();

    if (hasActiveTab) {
      await updateEntity("on");
    }
  };
  const onTabDeletion = async (tab) => {
    const hasActiveTab = await hasActiveTab();
    if (!hasActiveTab) {
      await updateEntity("off");
    }
  };

  chrome.tabs.onCreated.addListener(onTabCreation);
  chrome.tabs.onRemoved.addListener(onTabDeletion);
})();
