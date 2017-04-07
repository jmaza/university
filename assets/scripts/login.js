'use strict';

document.onreadystatechange = function () {

    const myFunction = function () {

        console.log('Clicked');
        alert('Clicked');
    };

    document.getElementById('btnSubmit').addEventListener('click', myFunction);
};
