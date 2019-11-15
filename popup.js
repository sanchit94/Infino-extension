$(function() {

  const tabSelection = [...document.querySelectorAll('.tabs.is-toggle li')];

const navigator = (id) => {
  const screens = [...document.querySelectorAll('.main-screen')];
  const currentScreen = document.getElementById(id);
  screens.forEach(elem => {
    elem.classList.add('is-hidden');
  });

  currentScreen.classList.remove('is-hidden');
}

tabSelection.map(elem => {
  elem.addEventListener('click', () => {
    console.log(elem.classList);
    const isActive = [...elem.classList].find((element) => {
      return element === 'is-active';
    });
    if (isActive) {
      return;
    } else {

      tabSelection.forEach(element => {
        element.classList.remove('is-active');
      })

      elem.classList.add('is-active');      
    }
  })
});

tabSelection.map(elem => {
  elem.addEventListener('click', () => {
    const navigateTo = elem.getAttribute('to');
    console.log('Clicked', navigateTo);
    navigator(navigateTo);
  })
})

// doSomething.onclick = function(element) {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       console.log('Tabs', tabs);
//       chrome.tabs.executeScript(
//         null,
//         { file: "autofill.js" }, function showNotification() {
//           chrome.notifications.create(
//             'name-for-notification',{   
//               type: 'basic', 
//               iconUrl: 'infino.png', 
//               title: "OK", 
//               message: "Infino to the rescue!" 
//             }, 
//             function() {
//               console.log('Notification shown')
//             }  
//           );
//         }
//           );
//     });
//   };

  // doSomething.onclick = function(element) {
  //  fetch('https://fetchrss.com/rss/5dcbe5c88a93f8336b8b45685dcbe5a58a93f8206b8b4567.xml', {
  //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //   mode: 'cors', 
  // })
  // .then(console.log)
  
  // }


  

});