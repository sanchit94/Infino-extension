import {html, render} from '../node_modules/lit-html/lit-html.js';
import {cache} from '../node_modules/lit-html/directives/cache.js';



document.cookie='loggedIn=s';

const isLoggedIn = document.cookie.split(';').find((el) => el.indexOf('loggedIn') > -1).split('=')[1];

const otpChangeHandler = (e) => {
  console.log(e);
  console.log(e.target);
  if(e.keyCode === 8 || e.keyCode === 37) {
    console.log(typeof e.target);

    const previousInputId = e.target.getAttribute('data-previous');

    const prev = document.getElementById(previousInputId);
    setTimeout(() => {

      prev.focus();

    }, 50);
    
  } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {

    const nextInputId = e.target.getAttribute('data-next');
    const next = document.getElementById(nextInputId);
    if (next) {
      setTimeout(() => {

        next.focus();
  
      }, 50);
      
    } else {
      loginHandler();
    }
  }
  console.log(e.target.getAttribute('data-next'));
  
  
}

const dropDownHandler = (e) => {
  event.stopPropagation();

  var $dropdown = document.querySelector('.dropdown:not(.is-hoverable)');

  $dropdown.classList.toggle('is-active');

  document.addEventListener('click', function (event) {
    $dropdown.classList.remove('is-active');
  });

}

const dropDownBlurHandler = (e) => {
  console.log(e);
  var $dropdown = document.querySelector('.dropdown:not(.is-hoverable)');

  $dropdown.classList.remove('is-active');
}

const routeToReward = (e) => {
  const tabSelection = [...document.querySelectorAll('.tabs.is-toggle li')];
  const rewardTab = document.querySelector('#reward-screen');
  console.log(e);
  tabSelection.forEach(elem => {
    elem.classList.remove('is-active')
  });

  rewardTab.classList.add('is-active');
  
    render(userView('rewards'), document.body);

}

const loginHandler = () => {
  const formDigits = document.querySelectorAll('form.digit-group input[type="text"]');
  formDigits.forEach(elem => {
    console.log(elem.value);
  })
    render(userView('home'), document.body);
}

const routeToHome = (e) => {
  const tabSelection = [...document.querySelectorAll('.tabs.is-toggle li')];
  const homeTab = document.querySelector('#home-screen');

  tabSelection.forEach(elem => {
    elem.classList.remove('is-active')
  });

  homeTab.classList.add('is-active');
  render(userView('home'), document.body);
}

const accordionInit = () => {
    var accordion = document.querySelectorAll(".description-title");

    console.log(accordion);
    console.log(accordion[1]);
    console.log([].slice.call(accordion));
    
    
    

    for (let item of accordion){
      console.log('Event listener attached');
      
        item.addEventListener('click', accordionClick);
    }
}

const accordionClick = (event) => {
    var targetClicked =event.target;
    var classClicked = targetClicked.classList;
    while ((classClicked[0] !="description-title")){
        targetClicked = targetClicked.parentElement;
        classClicked = targetClicked.classList;
    }
    var description = targetClicked.nextElementSibling;
    var expander = targetClicked.children[0];
    if (description.style.maxHeight){
        description.style.maxHeight = null;
        expander.innerHTML = "&#10133;"
        
    }
    else {
        var allDescriptions = document.getElementsByTagName("dd");
        for (var i = 0; i < allDescriptions.length; i++){
            if (allDescriptions[i].style.maxHeight){
                allDescriptions[i].style.maxHeight = null;
                allDescriptions[i].previousElementSibling.children[0].innerHTML = "&#10133;"
            }
        }
        description.style.maxHeight = description.scrollHeight + "px";
        expander.innerHTML = "&#10134;";
        
    }
}

const loginView = () => html`
<div id="main-container">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title has-text-centered has-text-weight-light is-size-4">
            Infino Smart Card Vault
          </p>
        </div>
      </div>
    </section>
    <div id="login-screen">
        <div class="content has-text-centered">
          <p>Enter OTP to login</p>
          <form class="digit-group" data-group-name="digits" data-autosubmit="false" autocomplete="off">
              <input @keyup=${otpChangeHandler} type="text" id="digit-1" name="digit-1" data-next="digit-2" maxlength="1" />
              <input @keyup=${otpChangeHandler} type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" maxlength="1" />
              <input @keyup=${otpChangeHandler} type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" maxlength="1" />
              <span class="splitter">&ndash;</span>
              <input @keyup=${otpChangeHandler} type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" maxlength="1" />
              <input @keyup=${otpChangeHandler} type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" maxlength="1" />
              <input @keyup=${otpChangeHandler} type="text" id="digit-6" name="digit-6" data-previous="digit-5" maxlength="1" />
              <div>
                <button id="submit-button" type="button" class="button" @click=${loginHandler}>Submit</button>
              </div>
          </form>
        </div>
    </div>
</div>
`;

const userView = (currentScreen) => html`

<div id="main-container">
  <div class="card">
    <header class="card-header">
        <div class="tabs is-toggle">
          <ul>
            <li id="home-screen" @click=${routeToHome} class="is-active">
              <a>
                <span>Home</span>
              </a>
            </li>
            <li id="reward-screen" @click=${routeToReward}>
              <a>
                <span>Rewards</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="dp-block">


        <div class="dropdown is-right">
        <div @click=${dropDownHandler} class="dropdown-trigger">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
            <img src="assets/images/DP.png" alt="Display Picture" width="48">
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu2" role="menu">
          <div class="dropdown-content">
            <a target="_blank" class="dropdown-item">
              My Rewards
            </a>
            <a href="mailto:hello@getinfino.com?Subject=Honest%20Feedback" target="_blank" class="dropdown-item">
              Send Feedback
            </a>
            <hr class="dropdown-divider">
            <a href="#" class="dropdown-item">Sign out</a>
          </div>
        </div>
      </div>
      </header>
      <div id="parent-view" class="card-content custom-scroll">
        
      ${(currentScreen === 'home'
        ? homeScreen()
        // : rewardScreen()
        : altView()
      )}
      
  </div>
      
    </div>
</div>
    
`;


const homeScreen = () => html`

<div id="home-screen" class="main-screen">
<div class="content is-size-3">
  Welcome
  <br>
  <b class="is-size-2">Sanchit Sharma</b>
  <br>
  <br>
  You have added <b>12</b> finances to Infino.
</div>

</div>

`;

const rewardScreen = () => html`

<div class="main-screen" id="reward-screen">
<table class="table">
<tbody>
  <tr>
    <td>
      <div class="bank-image is-red">
        <img src="assets/images/Axis-Bank-PNG-Icon-715x715@3x.png" alt="Bank Name" width="20">
      </div>
    </td>
    <td>
      <span class="bank-name">Axis Bank</span>
      <br>
      <span class="card-number-masked has-text-grey-light">********594</span>
    </td>
    <td>
      <span class="card-issuer">VISA</span>
      <br>
      <span class="card-type has-text-grey-light">Credit</span>
    </td>
    <td>
      <span class="savings-amount">&#8377; 2,500</span>
      <br>
      <span class="has-text-grey-light is-size-7">Est. Reward</span>
    </td>
  </tr>
  <tr>
    <td>
      <div class="bank-image is-light">
        <img src="assets/images/HDFC.png" alt="Bank Name" width="20">
      </div>
    </td>
    <td>
      <span class="bank-name">Axis Bank</span>
      <br>
      <span class="card-number-masked has-text-grey-light">********594</span>
    </td>
    <td>
      <span class="card-issuer">VISA</span>
      <br>
      <span class="card-type has-text-grey-light">Credit</span>
    </td>
    <td>
      <span class="savings-amount">&#8377; 2,500</span>
      <br>
      <span class="has-text-grey-light is-size-7">Est. Reward</span>
    </td>
  </tr>
  <tr>
    <td>
      <div class="bank-image is-light">
        <img src="assets/images/HDFC.png" alt="Bank Name" width="20">
      </div>
    </td>
    <td>
      <span class="bank-name">Axis Bank</span>
      <br>
      <span class="card-number-masked has-text-grey-light">********594</span>
    </td>
    <td>
      <span class="card-issuer">VISA</span>
      <br>
      <span class="card-type has-text-grey-light">Credit</span>
    </td>
    <td>
      <span class="savings-amount">&#8377; 2,500</span>
      <br>
      <span class="has-text-grey-light is-size-7">Est. Reward</span>
    </td>
  </tr>
  <tr>
    <td>
      <div class="bank-image is-light">
        <img src="assets/images/HDFC.png" alt="Bank Name" width="20">
      </div>
    </td>
    <td>
      <span class="bank-name">Axis Bank</span>
      <br>
      <span class="card-number-masked has-text-grey-light">********594</span>
    </td>
    <td>
      <span class="card-issuer">VISA</span>
      <br>
      <span class="card-type has-text-grey-light">Credit</span>
    </td>
    <td>
      <span class="savings-amount">&#8377; 2,500</span>
      <br>
      <span class="has-text-grey-light is-size-7">Est. Reward</span>
    </td>
  </tr>
  <tr>
    <td>
      <div class="bank-image is-red">
        <img src="assets/images/Axis-Bank-PNG-Icon-715x715@3x.png" alt="Bank Name" width="20">
      </div>
    </td>
    <td>
      <span class="bank-name">Axis Bank</span>
      <br>
      <span class="card-number-masked has-text-grey-light">********594</span>
    </td>
    <td>
      <span class="card-issuer">VISA</span>
      <br>
      <span class="card-type has-text-grey-light">Credit</span>
    </td>
    <td>
      <span class="savings-amount">&#8377; 2,500</span>
      <br>
      <span class="has-text-grey-light is-size-7">Est. Reward</span>
    </td>
  </tr>
  <tr>
    <td>
      <div class="bank-image is-red">
        <img src="assets/images/HDFC.png" alt="Bank Name" width="20">
      </div>
    </td>
    <td>
      <span class="bank-name">Axis Bank</span>
      <br>
      <span class="card-number-masked has-text-grey-light">********594</span>
    </td>
    <td>
      <span class="card-issuer">VISA</span>
      <br>
      <span class="card-type has-text-grey-light">Credit</span>
    </td>
    <td>
      <span class="savings-amount">&#8377; 2,500</span>
      <br>
      <span class="has-text-grey-light is-size-7">Est. Reward</span>
    </td>
  </tr>
  <tr>
    <td>
      <div class="bank-image is-red">
        <img src="assets/images/Axis-Bank-PNG-Icon-715x715@3x.png" alt="Bank Name" width="20">
      </div>
    </td>
    <td>
      <span class="bank-name">Axis Bank</span>
      <br>
      <span class="card-number-masked has-text-grey-light">********594</span>
    </td>
    <td>
      <span class="card-issuer">VISA</span>
      <br>
      <span class="card-type has-text-grey-light">Credit</span>
    </td>
    <td>
      <span class="savings-amount">&#8377; 2,500</span>
      <br>
      <span class="has-text-grey-light is-size-7">Est. Reward</span>
    </td>
  </tr>
  <tr>
    <td>
      <div class="bank-image is-red">
        <img src="assets/images/HDFC.png" alt="Bank Name" width="20">
      </div>
    </td>
    <td>
      <span class="bank-name">Axis Bank</span>
      <br>
      <span class="card-number-masked has-text-grey-light">********594</span>
    </td>
    <td>
      <span class="card-issuer">VISA</span>
      <br>
      <span class="card-type has-text-grey-light">Credit</span>
    </td>
    <td>
      <span class="savings-amount">&#8377; 2,500</span>
      <br>
      <span class="has-text-grey-light is-size-7">Est. Reward</span>
    </td>
  </tr>
  <tr>
    <td>
      <div class="bank-image is-red">
        <img src="assets/images/Axis-Bank-PNG-Icon-715x715@3x.png" alt="Bank Name" width="20">
      </div>
    </td>
    <td>
      <span class="bank-name">Axis Bank</span>
      <br>
      <span class="card-number-masked has-text-grey-light">********594</span>
    </td>
    <td>
      <span class="card-issuer">VISA</span>
      <br>
      <span class="card-type has-text-grey-light">Credit</span>
    </td>
    <td>
      <span class="savings-amount">&#8377; 2,500</span>
      <br>
      <span class="has-text-grey-light is-size-7">Est. Reward</span>
    </td>
  </tr>
</tbody>
</table>
</div>

`;

const altView = () => html`
<div class="main-content">
<dt @click=${accordionClick} class="description-title">Dragon <span class="expand-collapse">&#10133;</span></dt>
<dd class="description">This is quite obviously the best of all the creatures. My one true love.
<p> Examples include Smaug (The Hobbit), Tintaglia (The Liveship Traders) and Spyro (Spyro video games).</p></dd>
<dt @click=${accordionClick} class="description-title">Mermaid<span class="expand-collapse">&#10133;</span></dt>
<dd class="description">Mermaids in stories are either super cute or super scary. They're popular in YA at the moment.
<p>Examples include Ariel (The Little Mermaid), Sh'eenaz (The Witcher).</p></dd>
<dt @click=${accordionClick} class="description-title">Siren<span class="expand-collapse">&#10133;</span></dt>
<dd class="description">Sirens are not the same as mermaids. They are totally badass and lure men to their deaths.
<p> Sirens don't usually get names.... sad face.</p></dd>
<dt @click=${accordionClick} class="description-title">Pegasus<span class="expand-collapse">&#10133;</span></dt>
<dd class="description">Better than a horse.
<p>I think these appear in Greek mythology?</p></dd>
</div>
`;


let selectedView;

if (isLoggedIn) {

    selectedView = () => userView('home');

} else {

    selectedView = loginView;
}


// Render the template to the document
render(selectedView(), document.body);