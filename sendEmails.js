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
  
  //const rannum_am = Math.floor(Math.random() * 20) + 1;
 // console.log("Random number generated: ", rannum_am);

  const rannum_bm = Math.floor(Math.random() * 20) + 1;
  console.log("Random number generated: ", rannum_bm);

  const rannum_bcard = Math.floor(Math.random() * 44) + 1;
  console.log("Random number generated: ", rannum_bcard);

  const rannum_acard = Math.floor(Math.random() * 13) + 1;
  console.log("Random number generated: ", rannum_acard);

  try {
    const snapshot = await db.collection("Event").get();

    console.log("Snapshot: ", JSON.stringify(snapshot, null, 2));

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Data: ", JSON.stringify(data, null, 2));
      if (data.Date === todayFormatted) {
        const fromname = data.From_Name;
        const toname = data.To_Name;
        const occasion1 = data.Occasion;


        console.log(fileName);
        const message = `Happy ${data.Occasion}, ${data.To_Name}!`;
        //const occasionvar='Birthdays';
        console.log(occasion1);

        var occasionvar;
        var fileName;
        console.log(rannum_bcard);

        var message1, message2, message3,message4, message5, message6,message7, message8, message9,message10, message11, message12,message13, message14, message15,message16, message17, message18,message19, message20, message50;

        if (occasion1 === "Birthday") {
          fileName = "b" + rannum_bcard + ".JPG";
          occasionvar = "Birthdays";
          message1 = "Wishing you a day filled with love, laughter, and joy. Happy Birthday!";
          message2 = "May this year bring you endless happiness and beautiful memories. Happy Birthday!";
          message3 = "Another year older, but also another year wiser. Enjoy every moment of your special day!";
          message4 = "Happy Birthday to one of the most amazing person. May all your dreams come true!";
          message5 = "On your birthday, I wish you nothing but the best! May your day be as wonderful as you are.";
          message6 = "Cheers to you on your birthday! May you continue to shine and inspire those around you.";
          message7 = "May your birthday be the start of a year filled with good luck, good health, and much happiness.";
          message8 = "Sending you oceans of love and happiness on your birthday. Have a fantastic day!";
          message9 = "Your birthday is the perfect time to celebrate the wonderful person you are. Have an amazing year ahead!";
          message10 = "I hope your day is as special as you are! Happy Birthday and here's to another fantastic year!";
          message11 = "Wishing you a year filled with new adventures, exciting opportunities, and unforgettable moments. Happy Birthday!";
          message12 = "Wishing you a birthday thats just as fabulous as you are. Lets make this year unforgettable!";
          message13 = "Happy Birthday! May this day bring a smile to your face and happiness to your heart!";
          message14 = "May your birthday be the beginning of a year filled with love, laughter, and all the things that make you smile. Have a fantastic day!";
          message15 = "Wishing you a year full of laughter, love, and all the things that make you happiest. Happy Birthday!";
          message16 = "On your birthday, I wish you an abundance of joy and a lifetime of adventures!";
          message17 = "Happy Birthday to someone who makes the world a better place just by being in it!";
          message18 = "Another year of greatness! Wishing you the most amazing birthday and year ahead.";
          message19 = "Sending you all my love on your birthday. May you have the best day ever!";
          message20 = "Happy Birthday to a true gem! Keep shining and spreading your positivity everywhere you go.";
        }
        else if (occasion1 === "Anniversary") {
          fileName = "a" + rannum_acard + ".JPG";
          occasionvar = "Anniversaries"; // Fixed typo: "Anniversarys" -> "Anniversaries"
          message1 = "Happy Anniversary to a wonderful couple! Wishing you many more years of love and happiness.";
          message2 = "May your love continue to grow stronger with every passing year. Happy Anniversary!!";
          message3 = "Wishing you both a lifetime filled with love, joy, and endless memories. Happy Anniversary!";
          message4 = "Congratulations on your anniversary! May your love keep shining bright for years to come.";
          message5 = "To the perfect couple: Happy Anniversary! May your love continue to grow in the years ahead.";
          message6 = "Another year of wonderful memories, and another year to create even more. Happy Anniversary!";
          message7 = "Happy Anniversary! Your love is an inspiration, and I hope your journey together only gets better.";
          message8 = "Wishing you a happy anniversary filled with more love and more cherished memories than ever before!";
          message9 = "To the couple who defines what true love is, happy anniversary! May your bond grow even stronger.";
          message10 = "May the love you share today be just the beginning of a lifetime of happiness. Happy Anniversary!";
          message11 = "Happy Anniversary to a couple who makes love look so easy. May your love continue to flourish!";
          message12 = "May your anniversary be filled with as much love as you both share every day. Happy Anniversary!";
          message13 = "To the couple who still looks at each other like they did on day one: Happy Anniversary!";
          message14 = "Happy Anniversary to the perfect pair! May your journey together continue to be filled with love and happiness.";
          message15 = "Happy Anniversary to a couple whose love keeps growing stronger with each passing year. May your bond continue to inspire those around you";
          message16 = "Wishing you both a lifetime of love, joy, and happiness. Happy Anniversary to a couple who makes love look effortless!";
          message17 = "To the couple who has everything—except enough time to stop and realize how perfect you are for each other. Happy Anniversary!";
          message18 = "May your love story continue to be written with beautiful chapters and happy memories. Wishing you both a very Happy Anniversary!";
          message19 = "Happy Anniversary to the couple who has made love, laughter, and happiness a way of life. Here to many more years of amazing adventures together!";
          message20 = "To a love that has stood the test of time, Happy Anniversary! I wish you both endless joy and more years of happiness ahead.";

        }
        else if (occasion1 === "Reminder") 
        {
          fileName = "reminder" + ".JPG";
          occasionvar = "Reminders"; 
          rannum_bm=50;
        }

        console.log(occasionvar);
        const messagevar = eval('message' + rannum_bm);

        sendEmail(data.To_Email, messagevar, `Special Occasion: Happy ${data.Occasion}!`, fromname, toname, fileName, occasionvar);
      }
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

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
