function changeValue( value ) {

    return function changeValueForElement( field ) {

        const _nativeElementSet =
            Object.getOwnPropertyDescriptor( window.HTMLInputElement.prototype, 'value' ).set;

        _nativeElementSet.call( field, value );
        field.dispatchEvent( new Event( 'input', { bubbles: true } ) );
        field.dispatchEvent( new Event( 'focus', { bubbles: true } ) );
        field.dispatchEvent( new Event( 'keydown', { bubbles: true } ) );
        field.dispatchEvent( new Event( 'blur', { bubbles: true } ) );

    }

}

function changeValueForSelect( field, value ) {
  const _nativeElementSet =
            Object.getOwnPropertyDescriptor( window.HTMLSelectElement.prototype, 'value' ).set;
  console.log(_nativeElementSet);
  _nativeElementSet.call( field, value );
  field.selectedIndex = value;
  
  field.dispatchEvent( new Event( 'change', { bubbles: true } ) );
        field.dispatchEvent( new Event( 'focus', { bubbles: true } ) );
        field.dispatchEvent( new Event( 'keydown', { bubbles: true } ) );
        field.dispatchEvent( new Event( 'blur', { bubbles: true } ) );
} 

function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to. 
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child. 
  //"execCommand()" only works when there exists selected text, and the text is inside 
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur(). 
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor 
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}

(function doSomeMagic() {

    if (localStorage.getItem(window.location.origin)) {

      fetch('https://demo3211583.mockable.io/api/autofill', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', 
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        const { name: field, cNumber, select, expiry } = res;
        const selector = 'input[name="' + field + '"]';
        let ccFields = [ ...document.querySelectorAll(selector) ];
        let monthField = document.querySelector('select[name="' + select + '"');
        
        if (!ccFields.length) {
            ccFields = [ ...document.querySelectorAll(`#${ field }`) ];
        }

        if (!monthField) {
          monthField = document.querySelector(`select#${select}`);
        }

        ccFields.forEach( changeValue( cNumber ) );
        changeValueForSelect(monthField, Number(expiry));
      })

    } else {
    alert('Autofill is not supported yet on this website, but you can help!');
    fetch('https://demo3211583.mockable.io/api/autofill', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', 
    })
    .then(res => res.json())
    .then(res => {
      const { name: field, cNumber } = res;
      copyTextToClipboard(cNumber);
      const args = document.querySelectorAll("input");
      [...args].forEach(el => {
        el.addEventListener('change', (e) => {
          console.log(e.target.value, "Target value");
          console.log(cNumber, 'Credit Card Number');
          if (e.target.value === cNumber) {
            const nameAttribute = el.getAttribute('name');
          if (nameAttribute) {
            localStorage.setItem(window.location.origin, nameAttribute);
            console.log('The input ' + nameAttribute + ' was changed');
          } else {
            localStorage.setItem(window.location.origin, el.getAttribute('id'));
            console.log('The input ' + el.getAttribute('id') + ' was changed');
          }
          }
        })
      })
    });
    
  }
  })();