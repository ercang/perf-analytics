export async function postData(url = '', data = {}) {
    let bodyData = null;
    let headersObject = null;

    headersObject = {
        'Content-Type': 'application/json',
    };

    bodyData = JSON.stringify(data);

    let options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrer: 'no-referrer',
        body: bodyData
    };

    if (headersObject) {
        options.headers = headersObject;
    }

    // Default options are marked with *
    let baseUrl = 'http://localhost:80';
    if (process.env.NODE_ENV === 'production') {
        baseUrl = '';
    }

    url = baseUrl + url;

    const response = await fetch(url, options);
    return await response.json(); // parses JSON response into native JavaScript objects
}

export async function getData(url = '') {
    // Default options are marked with *
    let baseUrl = 'http://localhost:80';
    if (process.env.NODE_ENV === 'production') {
        baseUrl = '';
    }

    url = baseUrl + url;

    const response = await fetch(url);
    return await response.json(); // parses JSON response into native JavaScript objects
}