// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for contact button click
    document.getElementById('contactButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action of anchor tag
        sendEmail(); // Call the function to send email
    });

    // Function to send email
    function sendEmail() {
        var emailAddress = 'contact@example.com'; // Your email address
        var subject = 'Inquiry from Fun Adventure Game'; // Email subject
        var body = 'Dear Support Team,\n\n'; // Email body
        body += 'I have a question / feedback regarding Fun Adventure Game:\n\n'; // Additional information

        var mailtoUrl = 'mailto:' + encodeURIComponent(emailAddress) +
                        '?subject=' + encodeURIComponent(subject) +
                        '&body=' + encodeURIComponent(body);

        window.location.href = mailtoUrl; // Open default email client
    }
});
