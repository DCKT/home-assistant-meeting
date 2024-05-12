const options = {};
const optionsForm = document.getElementById("optionsForm");
const data = await chrome.storage.sync.get("options");

Object.assign(options, data.options);
optionsForm.homeAssistantApiUrl.value = options.homeAssistantApiUrl;
optionsForm.homeAssistantApiToken.value = options.homeAssistantApiToken;
optionsForm.homeAssistantEntity.value = options.homeAssistantEntity;

optionsForm.addEventListener("submit", (event) => {
  options.homeAssistantApiUrl = optionsForm.homeAssistantApiUrl.value;
  options.homeAssistantApiToken = optionsForm.homeAssistantApiToken.value;
  options.homeAssistantEntity = optionsForm.homeAssistantEntity.value;
  chrome.storage.sync.set({ options });
});
