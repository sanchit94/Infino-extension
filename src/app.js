import {html, render} from '../node_modules/lit-html/lit-html.js';
import {cache} from '../node_modules/lit-html/directives/cache.js';



document.cookie='loggedIn=s';

const isLoggedIn = document.cookie.split(';').find((el) => el.indexOf('loggedIn') > -1).split('=')[1];

const dropDownHandler = () => {

  var $dropdown = document.querySelector('.dropdown:not(.is-hoverable)');

  $dropdown.classList.toggle('is-active');

}

const dropDownBlurHandler = () => {
  console.log('Blurred');
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

const routeToHome = (e) => {
  const tabSelection = [...document.querySelectorAll('.tabs.is-toggle li')];
  const homeTab = document.querySelector('#home-screen');

  tabSelection.forEach(elem => {
    elem.classList.remove('is-active')
  });

  homeTab.classList.add('is-active');
  render(userView('home'), document.body);
}

const loginView = () => html`
<div id="main-container">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Primary title
          </h1>
          <h2 class="subtitle">
            Primary subtitle
          </h2>
        </div>
      </div>
    </section>
    <div id="login-screen">
        <div class="content">
        <h5>Enter OTP to login</h5>
        <form method="get" class="digit-group" data-group-name="digits" data-autosubmit="false" autocomplete="off">
            <input type="text" id="digit-1" name="digit-1" data-next="digit-2" />
            <input type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" />
            <input type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" />
            <span class="splitter">&ndash;</span>
            <input type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" />
            <input type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" />
            <input type="text" id="digit-6" name="digit-6" data-previous="digit-5" />
            <button type="button" class="button" @click=${loginHandler}>Submit</button>
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
  <button @blur=${dropDownBlurHandler} @click=${dropDownHandler} class="dropdown-trigger">
    <img src="assets/images/DP.png" alt="Display Picture" width="48">
  </button>
  <div class="dropdown-menu" id="dropdown-menu6" role="menu">
  <div class="dropdown-content">
  <a href="#" class="dropdown-item">
    Visit Website
  </a>
  <a href="#" class="dropdown-item">
    Settings
  </a>
  <hr/>
  <a href="#" class="dropdown-item">
    Sign Out
  </a>
</div>
  </div>
</div>
          </div>
      </header>
      <div id="parent-view" class="card-content custom-scroll">
        
      ${(currentScreen === 'home'
        ? homeScreen() 
        : rewardScreen()
      )}
      
  </div>
      
    </div>
</div>
    
`;


const homeScreen = () => html`

<div id="home-screen" class="main-screen">
<div class="content">
  Welcome
  <br>
  <b>Sanchit Sharma</b>
  <br>
  <br>
  You have added <b>12</b> finances to Infino.
</div>
<div>
    <div class="tabs is-medium">
      <ul>
        <li class="is-active"><a>Updates</a></li>
      </ul>
    </div>
    <table class="table">
      <tbody>
        <tr>
          <td>
            <span class="icon is-red">
              <i class="far fa-bell text-red"></i>
            </span>
          </td>
          <td>Latest Infino updates and news.</td>
          <td class="has-text-grey-light">Sep 20</td>
        </tr>
        <tr>
          <td>
            <span class="icon is-light">
              <i class="fas fa-exclamation text-blue"></i>
            </span>
          </td>
          <td>Infino web launch</td>
          <td class="has-text-grey-light">Sep 26</td>
        </tr>
        <tr>
            <td>
              <span class="icon is-light">
                  <i class="fas fa-arrow-up text-blue"></i>
              </span>
            </td>
            <td>Adding new features</td>
            <td class="has-text-grey-light">Oct 20</td>
          </tr>
          <tr>
            <td>
              <span class="icon is-light">
                  <i class="fas fa-arrow-up text-blue"></i>
              </span>
            </td>
            <td>One Card, less hazzle</td>
            <td class="has-text-grey-light">Oct 20</td>
          </tr>
          <tr>
            <td>
              <span class="icon is-light">
                  <i class="fas fa-arrow-up text-blue"></i>
              </span>
            </td>
            <td>One Card, less hazzle</td>
            <td class="has-text-grey-light">Oct 20</td>
          </tr>
          <tr>
            <td>
              <span class="icon is-light">
                  <i class="fas fa-arrow-up text-blue"></i>
              </span>
            </td>
            <td>One Card, less hazzle</td>
            <td class="has-text-grey-light">Oct 20</td>
          </tr>
          <tr>
            <td>
              <span class="icon is-light">
                  <i class="fas fa-arrow-up text-blue"></i>
              </span>
            </td>
            <td>One Card, less hazzle</td>
            <td class="has-text-grey-light">Oct 20</td>
          </tr>
          <tr>
            <td>
              <span class="icon is-light">
                  <i class="fas fa-arrow-up text-blue"></i>
              </span>
            </td>
            <td>One Card, less hazzle</td>
            <td class="has-text-grey-light">Oct 20</td>
          </tr>
          <tr>
            <td>
              <span class="icon is-light">
                  <i class="fas fa-arrow-up text-blue"></i>
              </span>
            </td>
            <td>One Card, less hazzle</td>
            <td class="has-text-grey-light">Oct 20</td>
          </tr>
          <tr>
            <td>
              <span class="icon is-light">
                  <i class="fas fa-arrow-up text-blue"></i>
              </span>
            </td>
            <td>One Card, less hazzle</td>
            <td class="has-text-grey-light">Oct 20</td>
          </tr>
      </tbody>
    </table>
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


let selectedView;

const loginHandler = () => {
    render(userView('home'), document.body);
}

if (isLoggedIn) {

    selectedView = () => userView('home');

} else {

    selectedView = loginView;
}


// Render the template to the document
render(selectedView(), document.body);