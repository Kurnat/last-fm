// const {OAuth2Client} = require('google-auth-library');
// const http = require('http');
// const url = require('url');
// const open = require('open');
// const destroyer = require('server-destroy');
//
// // Download your OAuth2 configuration from the Google
// const keys = require('./oauth2.keys.json');
//
// /**
//  * Start by acquiring a pre-authenticated oAuth2 client.
//  */
// async function main() {
//     console.log(1)
//     const oAuth2Client = await getAuthenticatedClient();
//     console.log(2)
//     // Make a simple request to the People API using our pre-authenticated client. The `request()` method
//     // takes an GaxiosOptions object.  Visit https://github.com/JustinBeckwith/gaxios.
//     const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
//     const res = await oAuth2Client.request({url});
//     console.log(res.data);
//
//     // After acquiring an access_token, you may want to check on the audience, expiration,
//     // or original scopes requested.  You can do that with the `getTokenInfo` method.
//     const tokenInfo = await oAuth2Client.getTokenInfo(
//         oAuth2Client.credentials.access_token
//     );
//     console.log(tokenInfo);
// }
//
// /**
//  * Create a new OAuth2Client, and go through the OAuth2 content
//  * workflow.  Return the full client to the callback.
//  */
// function getAuthenticatedClient() {
//     return new Promise((resolve, reject) => {
//         // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
//         // which should be downloaded from the Google Developers Console.
//         console.log(3)
//         const oAuth2Client = new OAuth2Client(
//             keys.web.client_id,
//             keys.web.client_secret,
//             keys.web.redirect_uris[0]
//         );
//         console.log(4)
//         // Generate the url that will be used for the consent dialog.
//         const authorizeUrl = oAuth2Client.generateAuthUrl({
//             access_type: 'offline',
//             scope: 'https://www.googleapis.com/auth/userinfo.profile',
//         });
//
//         // Open an http server to accept the oauth callback. In this simple example, the
//         // only request to our webserver is to /oauth2callback?code=<code>
//         const server = http
//             .createServer(async (req, res) => {
//                 try {
// // if (true){
//                         console.log('https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=602930048282-nbnsuqgrvosrfegajt1pma4cntpf1uqp.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000&flowName=GeneralOAuthFlow')
//                         // acquire the code from the querystring, and close the web server.
//                         const qs = new url.URL(req.url, 'http://localhost:3000')
//                             .searchParams;
//                         const code = qs.get('code');
//                         console.log(`Code is ${code}`);
//                         res.end('Authentication successful! Please return to the console.');
//                         server.destroy();
//
//                         // Now that we have the code, use that to acquire tokens.
//                         const r = await oAuth2Client.getToken('4/0AY0e-g4cpqHrU2kUm-cw4vhwdOYFVFV68CajiYg9oxCIdaRXcMq8ga6VYOVB5VuBrC2RyA');
//                         // Make sure to set the credentials on the OAuth2 client.
//
//                     console.log('r', r)
//                         oAuth2Client.setCredentials(r.tokens);
//                         console.info('Tokens acquired.');
//                         resolve(oAuth2Client);
//                     console.log(5)
//                 } catch (e) {
//                     reject(e);
//                 }
//             })
//             .listen(3000, () => {
//                 // open the browser to the authorize url to start the workflow
//                 open(authorizeUrl, {wait: false}).then(cp => cp.unref());
//             });
//         destroyer(server);
//     });
// }
//
// main().catch(console.error);

//bldschool-calendar
// 602930048282-rokregjste6uv32k4dmbv1k2f6ln4p43.apps.googleusercontent.com
// 6edi_TWNwEI2gf3Wnc_xuq-l

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file credentials.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './credentials.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {

    console.log(credentials)
    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming 10 events:');
            events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            });
        } else {
            console.log('No upcoming events found.');
        }
    });
}
