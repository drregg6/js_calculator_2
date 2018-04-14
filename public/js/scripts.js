var numbers = document.querySelectorAll('.number');

numbers.forEach(function(number) {
    number.addEventListener('mousedown', function(ev) {
        console.log(this);
        
        this.classList.add('number-pressed');
    });
    number.addEventListener('mouseup', function(ev) {
        this.classList.remove('number-pressed');
    })
});