/**
 * Initializes the chat application when the document is ready.
 * Sends the initial greeting message to the chat API.
 */
$(document).ready(function() {

    /**
     * Initial message to be sent to the chat API.
     */
    var introMessage = "Hello, Friday! Please introduce yourself and explain a bit about what you can do."

    // Send the initial message when the document is ready
    sendMessage(introMessage);

    /**
     * Event handler for form submission.
     * Prevents the form from submitting and sends the message to the chat API.
     */
    $('form').on('submit', function(e) {
        e.preventDefault();

        var message = $('#message').val().trim();
        
        if (message) {
            // Send the message to the chat API
            sendMessage(message);
        } else {
            alert('Please enter a message.');
        }
    });

    /**
     * Sends a message to the chat API and updates the chat UI.
     * @param {string} message - The message to be sent to the chat API.
     */
    function sendMessage(message) {
        // Show the loading indicator
        $('#loading-indicator').show();

        // Send the message to the chat API
        $.ajax({
            type: 'POST',
            url: '/chat',
            contentType: 'application/json',
            data: JSON.stringify({ message: message }),
            success: function(response) {
                // Append the user message
                var chatBox = $('#chat-container');
                chatBox.append('<p class="message.user"><strong>You:</strong> ' + message + '</p>');

                // Create a new response element
                var responseElement = $('<p class="message.friday">--- <br> <strong>FRIDAY:</strong> <span class="response-text"></span></p>');
                
                // Append the response element to the chat box
                chatBox.append(responseElement);

                // Hide the loading indicator
                $('#loading-indicator').hide();

                // Clear the message input field
                $('#message').val('');
                
                // Format and set the response text
                responseElement.find('.response-text').html(formatResponse(response.content));
                chatBox.scrollTop(chatBox[0].scrollHeight);
            },
            error: function(xhr, status, error) {
                // Hide the loading indicator
                $('#loading-indicator').hide();

                // Show an error message
                alert('Error: ' + error);
            }
        });
    }

    /**
     * Formats the response text for better readability.
     * @param {string} response - The response text to be formatted.
     * @return {string} - The formatted response text.
     */
    function formatResponse(response) {
        // Replace newlines with <br> for HTML
        response = response.replace(/\n/g, '<br>'); 

        // Wrap text in <strong> tags for bold text
        response = response.replace(/(?:\*\*|__)(.*?)(?:\*\*|__)/g, '<strong>$1</strong>'); 

        // Wrap text in <em> tags for italic text
        response = response.replace(/(?:\*|_)(.*?)(?:\*|_)/g, '<em>$1</em>'); 

        // Wrap text in <code> tags for inline code
        response = response.replace(/`(.*?)`/g, '<code>$1</code>'); 

        // Return the formatted response text
        return response;
    }
});

