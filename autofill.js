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

(function doSomeMagic() {
   
    if (localStorage.getItem(window.location.origin)) {
        
        const field = localStorage.getItem(window.location.origin);
        const selector = 'input[name="' + field + '"]';
        let ccFields = [ ...document.querySelectorAll(selector) ];
        
        if (!ccFields.length) {
            ccFields = [ ...document.querySelectorAll(`#${ field }`) ];
        }

        ccFields.forEach( changeValue( '4675134148534491' ) );

    } else {
    alert('Autofill is not supported yet, but you can help!');
    const args = document.querySelectorAll("input");
    [...args].forEach(el => {
      el.addEventListener('change', () => {
        const nameAttribute = el.getAttribute('name');
        const selector = 'input[name="' + nameAttribute + '"]';
        if (nameAttribute) {
          localStorage.setItem(window.location.origin, nameAttribute);
          console.log('The input ' + nameAttribute + ' was changed');
        } else {
          localStorage.setItem(window.location.origin, el.getAttribute('id'));
          console.log('The input ' + el.getAttribute('id') + ' was changed');
        }
      })
    })
  }
  })();