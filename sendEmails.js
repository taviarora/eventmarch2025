const admin = require("firebase-admin");
//global.location = { protocol: 'http:' };

//const emailjs = require("@emailjs/browser");
//const emailjs = require("emailjs-com");
const emailjs = require("@emailjs/nodejs");

require("dotenv").config(); // Load environment variables from .env file

// Load Firebase service account key from environment variable
// console.log("Printing env ",process.env);
// console.log("Printing env ",process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const serviceAccountKey = Buffer.from(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
  "base64"
).toString("utf8");
const serviceAccount = JSON.parse(serviceAccountKey);

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCfbqC-893YBqhgR5OR0eHyX-EXzCIoTC8",
  authDomain: "jwdatabase-f0e20.firebaseapp.com",
  databaseURL: "https://jwdatabase-f0e20-default-rtdb.firebaseio.com",
  projectId: "jwdatabase-f0e20",
  storageBucket: "jwdatabase-f0e20.appspot.com",
  messagingSenderId: "1335908909",
  appId: "1:1335908909:web:0c132d7c79008c490c36a4",
  measurementId: "G-BQG1N754TN",
};

const EMAILJS_SERVICE_ID = "service_jitwsrj";
const EMAILJS_TEMPLATE_ID = "template_m0u22pm";
const EMAILJS_USER_ID = "qcbXaXrWGMaIRt6_o";

// Load Firebase config from environment variables
const firebaseConfig = FIREBASE_CONFIG;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function sendEmails() {
  console.log("Sending emails...");

  const today = new Date();
  const indiaTimeOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const indiaTime = new Date(today.getTime() + indiaTimeOffset);
  const todayFormatted = indiaTime.toISOString().split("T")[0];

  console.log("India Date:", todayFormatted);

  // Generate a random number between 1 and 3
  const ran_num = Math.floor(Math.random() * 3) + 1;
  console.log("Random number generated: ", ran_num);

  try {
    const snapshot = await db.collection("Event").get();

    console.log("Snapshot: ", JSON.stringify(snapshot, null, 2));

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Data: ", JSON.stringify(data, null, 2));
      if (data.Date === todayFormatted) {
        const fromname = data.From_Name;
        const toname = data.To_Name;

        const fileName = ran_num + ".png";
        console.log(fileName);
        const message = `Happy ${data.Occasion}, ${data.To_Name}!`;
        const message1 ='Happy Birthday-1';
        const message2 ='Happy Birthday-2';
        const message3 ='Happy Birthday-3';
        const messagevar = eval('message' + ran_num);
        // Use ran_num for any specific condition or logic (just an example)
        //if (ran_num === 1) 
       // {
          // Send email with a custom subject
       //   sendEmail(data.To_Email, message, `Special Occasion: Happy ${data.Occasion}!`, fromname, toname, fileName);
       // } 
       // else if (ran_num === 2) 
       // {
          // Send a different subject or additional details
        //  sendEmail(data.To_Email, message, `Celebrating ${data.Occasion}!`, fromname, toname, fileName);
       // } 
       // else 
        //{
          // Default message or subject
        //  sendEmail(data.To_Email, message, `Cheers for ${data.Occasion}!`, fromname, toname, fileName);
        //}
        
        sendEmail(data.To_Email, messagevar, `Special Occasion: Happy ${data.Occasion}!`, fromname, toname, fileName);
      }
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

async function sendEmail(toEmail, message, subject, fromname, toname, fileName) {
  try {
    console.log("ID ", EMAILJS_USER_ID);
    console.log("Sending email to ", toEmail);

    emailjs.init(EMAILJS_USER_ID);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        message,
        subject,
        from_name: fromname,
        to_name: toname,
        from_email: "tpsarora@gmail.com", // Hardcoded sender's email
        email: toEmail, // Send to the recipient email
        link: `https://taviarora.github.io/eventmarch2025/Birthdays/${fileName}`,
      },
      {
        publicKey: "qcbXaXrWGMaIRt6_o",
        privateKey: "g1HH-DK2771AldTTDT3Tk"
      }
    );

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

sendEmails();
