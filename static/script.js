$(document).ready(function() {
    $('form').on('submit', function(e) {
        e.preventDefault();

        var message = $('#message').val().trim();
        
        if (message) {
            $('#loading-indicator').show(); // Show the loading indicator
            $.ajax({
                type: 'POST',
                url: '/chat',
                contentType: 'application/json',
                data: JSON.stringify({ message: message }),
                success: function(response) {
                    var chatBox = $('#chat-container');
                    chatBox.append('<p><strong>You:</strong> ' + message + '</p>');
                    var responseElement = $('<p><strong>FRIDAY:</strong> <span class="response-text"></span></p>');
                    chatBox.append(responseElement);
                    $('#loading-indicator').hide(); // Hide the loading indicator
                    $('#message').val('');
                    responseElement.find('.response-text').html(formatResponse(response.content)); // Directly set the formatted HTML
                },
                error: function(xhr, status, error) {
                    $('#loading-indicator').hide(); // Hide the loading indicator
                    alert('Error: ' + error);
                }
            });
        } else {
            alert('Please enter a message.');
        }
    });

    function formatResponse(response) {
        // Format the response text for better readability
        response = response.replace(/\n/g, '<br>'); // Replace newlines with <br> for HTML
        response = response.replace(/(?:\*\*|__)(.*?)(?:\*\*|__)/g, '<strong>$1</strong>'); // Bold text
        response = response.replace(/(?:\*|_)(.*?)(?:\*|_)/g, '<em>$1</em>'); // Italic text
        response = response.replace(/`(.*?)`/g, '<code>$1</code>'); // Inline code
        return response;
    }
});
