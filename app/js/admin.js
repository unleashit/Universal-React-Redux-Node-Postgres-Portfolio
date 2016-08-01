(function() {
    'use strict';

    function filePicker(elem) {
        var inputs = document.querySelectorAll(elem + ' input');
        if (!inputs.length) return;
        var fField = inputs[0];
        var readonly = inputs[1];

        fField.addEventListener('change', function(e) {
            var numFiles = this.files[0] ? this.files.length : 1;
            var label = this.value.replace(/\\/g, '/').replace(/.*\//, '');

            var msg = numFiles > 1 ? numFiles + ' files selected' : label;
            readonly.value = msg;
        });
    }

    // function confirmDelete(cls) {
    //     var elems = document.querySelectorAll(cls);
    //
    //     var html = '<div style="position:absolute;top:0;bottom:0;left:0;right:0;">'
    //     html += '<div class="confirm-modal" style="margin:200px auto;height: 140px; width: 300px; background-color: #555; color: #ddd; padding:20px;">Are you sure?';
    //     html += '<button data-choice="yes">Yes</button><button data-choice="no">No</button></div>';
    //     html += '</div>';
    //
    //     Array.prototype.slice.call(elems).addEventListener('click', function(e) {
    //         e.preventDefault();
    //         document.body.firstChild.insertBefore(html, firstChild);
    //         var modal = document.querySelector('confirm-modal');
    //         modal.addEventListener('click', function(evt) {
    //             console.log('clicked', evt.target);
    //         })
    //     })
    //
    //
    // }

    filePicker('.main-image-picker');
    filePicker('.mobile-image-picker');
    filePicker('.gallery-images-picker');

    //confirmDelete('.confirm-delete');


})();
