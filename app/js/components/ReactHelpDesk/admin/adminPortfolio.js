export default function filePicker(elem) {
    var inputs = document.querySelectorAll(elem + ' input');
    if (!inputs.length) return;
    var fField = inputs[0];
    var readonly = inputs[1];

    fField.addEventListener('change', function (e) {
        const numFiles = this.files[0] ? this.files.length : 1;
        const label = this.value.replace(/\\/g, '/').replace(/.*\//, '');

        const msg = numFiles > 1 ? numFiles + ' files selected' : label;
        readonly.value = msg;
    });
}
