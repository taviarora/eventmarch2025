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

console.log(serviceAccount);

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
//console.log(process.env);
const firebaseConfig = FIREBASE_CONFIG;
//const firebaseConfig = JSON.parse(FIREBASE_CONFIG);

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

  try {
    const snapshot = await db.collection("Event").get();

    console.log("Snapshot: ", JSON.stringify(snapshot, null, 2));

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Data: ", JSON.stringify(data, null, 2));
      if (data.Date === todayFormatted) {
        const fromname1 = data.From_Name;
        const toname1 = data.To_Name;
        const fileName = "1.png";
        const message = `Happy ${data.Occasion}, ${data.To_Name}!`;
        sendEmail(data.To_Email, message, `Happy ${data.Occasion}!`);
      }
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

function sendEmail(toEmail, message, subject) {
  console.log("ID ", EMAILJS_USER_ID);

  // try {
  //   emailjs.init(EMAILJS_USER_ID);
  //   console.log("Initialized EmailJS with user ID:", EMAILJS_USER_ID);
  // } catch (initError) {
  //   console.error("Error initializing EmailJS:", initError);
  //   return; // Exit the function if initialization fails
  // }

  console.log("Sending email to ", toEmail);

  emailjs.init(EMAILJS_USER_ID);

  // emailjs
  //   .send(
  //     EMAILJS_SERVICE_ID,
  //     EMAILJS_TEMPLATE_ID,
  //     {
  //       message: "Test Message",
  //       subject: "Test Subject",
  //       to_email: "malikaarora2202@gmail.com",
  //     },
  //     {
  //       publicKey: "qcbXaXrWGMaIRt6_o",
  //       privateKey: "g1HH-DK2771AldTTDT3Tk"
  //     }
  //   )
  //   .then(() => console.log("Email sent!"))
  //   .catch((error) => console.error("Error sending email:", error));

  // ,
  //   {
  //     publicKey: "qcbXaXrWGMaIRt6_o",
  //     privateKey: serviceAccount.private_key
  //   }
  emailjs
    .send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        message,
        subject,

        from_name: `{fromname1}`,
        to_name: `${toname1}`, 
        from_email: "tpsarora@gmail.com", // Hardcoded sender's email
        email: "tpsarora@gmail.com", // Send to the recipient email
        link: "https://taviarora.github.io/eventmarch2025/Birthdays/1.png",
      },
      {
        publicKey: "qcbXaXrWGMaIRt6_o",
        privateKey: "g1HH-DK2771AldTTDT3Tk",
      }
    )
    .then(() => console.log("Email sent!"))
    .catch((error) => console.error("Error sending email:", error));
}

sendEmails();
