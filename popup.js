let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log('Tabs', tabs);
      chrome.tabs.executeScript(
        null,
        { file: "autofill.js" }, function showNotification() {
          chrome.notifications.create(
            'name-for-notification',{   
              type: 'basic', 
              iconUrl: 'infino.png', 
              title: "OK", 
              message: "Infino to the rescue!" 
            }, 
            function() {
              console.log('Notification shown')
            }  
          );
        }
          );
    });
  };