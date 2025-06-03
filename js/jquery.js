$(document).ready(function() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
    });
    $('.task-list').on('click', '.task-item', function() {
        $(this).toggleClass('completed')
               .find('.status')
               .text(function(_, text) {
                   return text === 'Complete' ? 'Pending' : 'Complete';
               })
               .toggleClass('btn-success btn-outline-secondary');
        if ($(this).hasClass('completed')) {
            $(this).fadeOut(300).fadeIn(300);
        }
    });
    $('#profile-form').submit(function(e) {
        e.preventDefault();
        const name = $('#name').val();
        $('.profile-header h3').text(`${name}'s Profile`);
        $('.avatar').css('background-color', getRandomColor());
        $('<div class="alert alert-success">Profile saved!</div>')
            .insertBefore('#profile-form')
            .delay(2000)
            .fadeOut();
    });
    $('.menu-toggle').click(function() {
        $('.nav').slideToggle();
    });
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        const formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/submit-contact',
            data: formData,
            success: function() {
                $('#contact-form').slideUp();
                $('<div class="alert alert-success">Message sent! We\'ll contact you soon.</div>')
                    .insertBefore('#contact-form')
                    .delay(3000)
                    .fadeOut();
            }
        });
    });
});

function getRandomColor() {
    const colors = ['#00bfff', '#87ceeb', '#1e90ff', '#4682b4'];
    return colors[Math.floor(Math.random() * colors.length)];
}