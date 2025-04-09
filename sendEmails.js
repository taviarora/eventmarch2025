const admin = require("firebase-admin");
const emailjs = require("@emailjs/nodejs");

require("dotenv").config(); // Load environment variables from .env file

// Load Firebase service account key from environment variable
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

  const now = new Date();
  const indiaTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const todayDay = indiaTime.getUTCDate().toString().padStart(2, '0');
  const todayMonth = (indiaTime.getUTCMonth() + 1).toString().padStart(2, '0');

  console.log("India Date (dd-mm):", `${todayDay}-${todayMonth}`);

  const rannum_bm = Math.floor(Math.random() * 20) + 1;
  const rannum_bcard = Math.floor(Math.random() * 44) + 1;
  const rannum_acard = Math.floor(Math.random() * 13) + 1;

  try {
    const snapshot = await db.collection("Event").get();

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Data: ", JSON.stringify(data, null, 2));

      const [dataYear, dataMonth, dataDay] = data.Date.split('-');
      const eventDay = dataDay.padStart(2, '0');
      const eventMonth = dataMonth.padStart(2, '0');

      const occasion = data.Occasion;
      const fromName = data.From_Name;
      const toName = data.To_Gname;
      const toEmail = data.To_Email;
      const reminderMessage = data.Reminder_Message;

      let fileName, occasionVar, subject, message;
      const birthdayMessages = [
        "Wishing you a day filled with love, laughter, and joy. Happy Birthday!",
        "May this year bring you endless happiness and beautiful memories. Happy Birthday!",
        "Another year older, but also another year wiser. Enjoy every moment of your special day!",
        "Happy Birthday to one of the most amazing person. May all your dreams come true!",
        "On your birthday, I wish you nothing but the best! May your day be as wonderful as you are.",
        "Cheers to you on your birthday! May you continue to shine and inspire those around you.",
        "May your birthday be the start of a year filled with good luck, good health, and much happiness.",
        "Sending you oceans of love and happiness on your birthday. Have a fantastic day!",
        "Your birthday is the perfect time to celebrate the wonderful person you are. Have an amazing year ahead!",
        "I hope your day is as special as you are! Happy Birthday and here's to another fantastic year!",
        "Wishing you a year filled with new adventures, exciting opportunities, and unforgettable moments. Happy Birthday!",
        "Wishing you a birthday that's just as fabulous as you are. Let's make this year unforgettable!",
        "Happy Birthday! May this day bring a smile to your face and happiness to your heart!",
        "May your birthday be the beginning of a year filled with love, laughter, and all the things that make you smile. Have a fantastic day!",
        "Wishing you a year full of laughter, love, and all the things that make you happiest. Happy Birthday!",
        "On your birthday, I wish you an abundance of joy and a lifetime of adventures!",
        "Happy Birthday to someone who makes the world a better place just by being in it!",
        "Another year of greatness! Wishing you the most amazing birthday and year ahead.",
        "Sending you all my love on your birthday. May you have the best day ever!",
        "Happy Birthday to a true gem! Keep shining and spreading your positivity everywhere you go."
      ];

      const anniversaryMessages = [
        "Happy Anniversary to a wonderful couple! Wishing you many more years of love and happiness.",
        "May your love continue to grow stronger with every passing year. Happy Anniversary!",
        "Wishing you both a lifetime filled with love, joy, and endless memories. Happy Anniversary!",
        "Congratulations on your anniversary! May your love keep shining bright for years to come.",
        "To the perfect couple: Happy Anniversary! May your love continue to grow in the years ahead.",
        "Another year of wonderful memories, and another year to create even more. Happy Anniversary!",
        "Happy Anniversary! Your love is an inspiration, and I hope your journey together only gets better.",
        "Wishing you a happy anniversary filled with more love and more cherished memories than ever before!",
        "To the couple who defines what true love is, happy anniversary! May your bond grow even stronger.",
        "May the love you share today be just the beginning of a lifetime of happiness. Happy Anniversary!",
        "Happy Anniversary to a couple who makes love look so easy. May your love continue to flourish!",
        "May your anniversary be filled with as much love as you both share every day. Happy Anniversary!",
        "To the couple who still looks at each other like they did on day one: Happy Anniversary!",
        "Happy Anniversary to the perfect pair! May your journey together continue to be filled with love and happiness.",
        "Happy Anniversary to a couple whose love keeps growing stronger with each passing year. May your bond continue to inspire!",
        "Wishing you both a lifetime of love, joy, and happiness. Happy Anniversary!",
        "To the couple who has everything—except enough time to realize how perfect you are for each other. Happy Anniversary!",
        "May your love story continue to be written with beautiful chapters and happy memories. Happy Anniversary!",
        "Happy Anniversary to the couple who has made love, laughter, and happiness a way of life.",
        "To a love that has stood the test of time, Happy Anniversary! I wish you both endless joy and happiness ahead."
      ];

      // Check for exact match
      if (eventDay === todayDay && eventMonth === todayMonth) {
        switch (occasion) {
          case "Birthday":
            fileName = `b${rannum_bcard}.JPG`;
            occasionVar = "Birthdays";
            message = birthdayMessages[rannum_bm - 1];
            subject = `Happy Birthday - ${toName}`;
            break;
          case "Anniversary":
            fileName = `a${rannum_acard}.JPG`;
            occasionVar = "Anniversaries";
            message = anniversaryMessages[rannum_bm - 1];
            subject = `Happy Anniversary - ${toName}`;
            break;
          case "Reminder":
            fileName = "reminder.jpg";
            occasionVar = "Reminders";
            message = reminderMessage;
            subject = `Reminder - ${reminderMessage}`;
            break;
          default:
            return;
        }

        console.log("Sending occasion email for:", occasionVar);
        sendEmail(toEmail, message, subject, fromName, toName, fileName, occasionVar);
      }

      // Send REMINDER 2 days before (only if today matches D-2)
      if (occasion === "Reminder") {
        const eventDate = new Date(`${dataYear}-${dataMonth}-${dataDay}`);
        const reminderDate = new Date(eventDate);
        reminderDate.setDate(reminderDate.getDate() - 2);

        const reminderDay = reminderDate.getUTCDate().toString().padStart(2, '0');
        const reminderMonth = (reminderDate.getUTCMonth() + 1).toString().padStart(2, '0');

        if (reminderDay === todayDay && reminderMonth === todayMonth) {
          fileName = "reminder.jpg";
          occasionVar = "Reminders";
          message = reminderMessage;
          subject = `Upcoming Reminder - ${reminderMessage}`;

          console.log("Sending 2-day advance reminder email.");
          sendEmail(toEmail, message, subject, fromName, toName, fileName, occasionVar);
        }
      }
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}


const twilio = require('twilio');

async function sendWhatsappMsg(message, to) {
    const encodedSid = 'QUM5MGYyOWU3YzEwMTQyYmNjODg0YTNlODIxNzFhOGNiZQ==';
    const encodedToken = 'OTc5M2UyNmFjYmRiNmY0MDRlY2RlZGY2Njk2NzBhMTc=';

    // Decode from base64
    const Sid = Buffer.from(encodedSid, 'base64').toString('utf-8');
    const t = Buffer.from(encodedToken, 'base64').toString('utf-8');

    console.log('Decoded SID:', Sid);
    console.log('Decoded Token:', t);

    // Create Twilio client
    const client = new twilio(Sid, t);

    try {
        const messageSent = await client.messages.create({
            body: message,
            from: 'whatsapp:+12765313651',  // Twilio WhatsApp number
            to: `whatsapp:${to}`            // Recipient's WhatsApp number (include country code)
        });
        console.log("Message sent with SID:", messageSent.sid);
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

// Example usage:


async function sendEmail(toEmail, message, subject, fromname, toname, fileName, occasionvar) {
  try {
    console.log("ID ", EMAILJS_USER_ID);
    console.log("Sending email to ", toEmail);
    console.log("File path ", `https://taviarora.github.io/eventmarch2025/${occasionvar}/${fileName}`);

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
        link: `https://taviarora.github.io/eventmarch2025/${occasionvar}/${fileName}`,
        // link: `https://taviarora.github.io/eventmarch2025/Birthdays/${fileName}`,
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
