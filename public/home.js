(function() {

    function filePicker(elem) {
        var inputs = document.querySelectorAll(elem + ' input');
        if (!inputs.length) return;
        var fField = inputs[0];
        var readonly = inputs[1];

        fField.addEventListener('change', function(e) {
            numFiles = this.files[0] ? this.files.length : 1;
            label = this.value.replace(/\\/g, '/').replace(/.*\//, '');

            msg = numFiles > 1 ? numFiles + ' files selected' : label;
            readonly.value = msg;
        });
    }

    filePicker('.main-image-picker');
    filePicker('.gallery-images-picker');

})();