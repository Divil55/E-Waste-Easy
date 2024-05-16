const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { MongoClient } = require("mongodb");
const User = require("../server/models/User");
const Dealer = require("./models/Dealer");
const Drop = require("./models/Drops");
const Pickup = require("./models/Pickup");
const MongoStore = require("connect-mongo");
const { scrapePrice, scrapeExchangeRate, scrapeAllPrices } = require('./JS/scrapper');
const metals = require("./metals.json");
const prices = require('./prices.json');
const uri =
  "mongodb+srv://surakattulagoutham20csm:kE7Gj2HOuFXkjOmP@e-waste.ok1tsmi.mongodb.net/?retryWrites=true&w=majority&appName=E-Waste";
const key = "ewasteeasy";

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB:", err);
    return;
  }
  console.log("Connected to MongoDB client");
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// Session middleware
const sessionStorage = MongoStore.create({
  mongoUrl: uri,
  collectionName: "sessions",
  ttl: 60 * 60 * 24, // 1 day,
  autoRemove: "native",
});

/**
 * session establishment
 */
// app.use(
//   session({
//     key: "user_sid",
//     secret: key,
//     resave: false,
//     saveUninitialized: false,
//     store: sessionStorage,
//     cookie: {
//       expires: 100 * 60 * 60 * 24,
//     },
//   })
// );

// app.get("/authenticationEndpoint", async (req, res) => {
//   try {
//     // Log session data for debugging
//     console.log("Session data:", req.session);

//     // Check if the user is logged in
//     if (req.session.userId) {
//       // User is authenticated
//       console.log("Authenticated user ID:", req.session.userId);
//       res.sendStatus(200);
//     } else {
//       // User is not authenticated
//       console.log("User is not authenticated");
//       res.sendStatus(401);
//     }
//   } catch (error) {
//     console.error("Error checking authentication status:", error);
//     res.sendStatus(500); // Internal server error
//   }
// });

app.post("/signup", async (req, res) => {
  try {
    console.log("in post request");
    const {
      fullName,
      userName,
      phone,
      email,
      password,
      confirmPassword,
      address,
      postalCode,
    } = req.body;
    console.log(fullName);
    // Check if the email is already registered
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
      console.log("Exist");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      userName,
      phone,
      email,
      password: hashedPassword,
      address,
      postalCode,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/dealersignup", async (req, res) => {
  try {
    console.log("in post request");
    const {
      facilityName,
      userName,
      phone,
      email,
      password,
      confirmPassword,
      address,
      postalCode,
    } = req.body;
    // Check if the email is already registered
    const existingUser = await Dealer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Dealer({
      facilityName,
      userName,
      phone,
      email,
      password: hashedPassword,
      address,
      postalCode,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/userlogin", async (req, res) => {
  try {
    const { userName, password } = req.body;
    // console.log(email);
    // Check if the user exists
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create session
    // req.session.userId = user._id; // Store user ID in session

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/change-password", async (req, res) => {
  try {
    const { userName, password } = req.body;
    // console.log(email);
    // Check if the user exists
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create session
    // req.session.userId = user._id; // Store user ID in session

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/dealerlogin", async (req, res) => {
  try {
    const { userName, password } = req.body;
    // console.log(email);
    // Check if the user exists
    const user = await Dealer.findOne({ userName });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create session
    // req.session.userId = user._id; // Store user ID in session

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/drop", async (req, res) => {
  try {
    const { userName, itemsList, dealerUserName, status } = req.body;
    const newDrop = new Drop({ userName, itemsList, dealerUserName, status });
    await newDrop.save();
    res.status(201).json({ message: "Drop request submitted successfully" });
  } catch (error) {
    console.error("Error submitting drop request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/pickup", async (req, res) => {
  try {
    console.log(req.body);
    const { lat, lon, userName, itemsList, dealerUserName, status } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userAddress = user.address;
    const newPickup = new Pickup({
      lat,
      lon,
      userName,
      userAddress,
      itemsList,
      dealerUserName,
      status,
    });
    await newPickup.save();
    res.status(201).json({ message: "Pickup request submitted successfully" });
  } catch (error) {
    console.error("Error submitting pickup request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/pickup-requests/:dealerUsername", async (req, res) => {
  try {
    const dealerUsername = req.params.dealerUsername;
    // console.log(dealerUsername);
    const pickupRequests = await Pickup.find({
      dealerUserName: dealerUsername,
      status: 1,
    });
    // console.log(pickupRequests);
    res.status(200).json(pickupRequests);
  } catch (error) {
    console.error("Error fetching pickup requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/all-pickups/:dealerUsername", async (req, res) => {
  try {
    const dealerUsername = req.params.dealerUsername;
    const pickupRequests = await Pickup.find({
      dealerUserName: dealerUsername,
    });
    // console.log(pickupRequests);
    res.status(200).json(pickupRequests);
  } catch (error) {
    console.error("Error fetching pickup requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/drop-requests/:dealerUsername", async (req, res) => {
  try {
    const dealerUsername = req.params.dealerUsername;
    // console.log(dealerUsername);
    const dropRequests = await Drop.find({
      dealerUserName: dealerUsername,
      status: 1,
    });
    res.status(200).json(dropRequests);
  } catch (error) {
    console.error("Error fetching pickup requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/all-drops/:dealerUsername", async (req, res) => {
  try {
    const dealerUsername = req.params.dealerUsername;
    const dropRequests = await Drop.find({ dealerUserName: dealerUsername });
    res.status(200).json(dropRequests);
  } catch (error) {
    console.error("Error fetching pickup requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/dashboard-data/:dealerUsername", async (req, res) => {
  try {
    const dealerUsername = req.params.dealerUsername;

    // Count pending drop requests (status 1 or 2)
    const pendingDropsCount = await Drop.countDocuments({
      dealerUserName: dealerUsername,
      status: { $in: [1, 2] },
    });

    // Count pending pickup requests (status 1 or 2)
    const pendingPickupsCount = await Pickup.countDocuments({
      dealerUserName: dealerUsername,
      status: { $in: [1, 2] },
    });

    // Count total drop requests (status 3)
    const totalDropsCount = await Drop.countDocuments({
      dealerUserName: dealerUsername,
    });

    // Count total pickup requests (status 3)
    const totalPickupsCount = await Pickup.countDocuments({
      dealerUserName: dealerUsername,
    });

    res.status(200).json({
      pendingDrops: pendingDropsCount,
      pendingPickups: pendingPickupsCount,
      totalDrops: totalDropsCount,
      totalPickups: totalPickupsCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(
  "/accept-pickup-request/:dealerUsername/:userName",
  async (req, res) => {
    try {
      const dealerUsername = req.params.dealerUsername;
      const userName = req.params.userName;
      // console.log("In server side");
      // console.log(dealerUsername);
      // console.log(userName);
      // Find the pickup request to update
      const pickupRequest = await Pickup.findOneAndUpdate(
        { dealerUserName: dealerUsername, userName: userName, status: 1 },
        { $set: { status: 2 } },
        { new: true }
      );
      // console.log(pickupRequest);
      if (!pickupRequest) {
        return res
          .status(404)
          .json({ error: "Pickup request not found or already accepted" });
      }

      res.status(200).json({
        message: "Pickup request accepted successfully",
        pickupRequest,
      });
    } catch (error) {
      console.error("Error accepting pickup request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.post("/accept-drop-request/:dealerUsername/:userName", async (req, res) => {
  try {
    const dealerUsername = req.params.dealerUsername;
    const userName = req.params.userName;
    const dropRequest = await Drop.findOneAndUpdate(
      { dealerUserName: dealerUsername, userName: userName, status: 1 },
      { $set: { status: 2 } },
      { new: true }
    );
    if (!dropRequest) {
      return res
        .status(404)
        .json({ error: "Drop request not found or already accepted" });
    }

    res
      .status(200)
      .json({ message: "Drop request accepted successfully", dropRequest });
  } catch (error) {
    console.error("Error accepting drop request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/pickup-requests-extraction/:dealerUsername", async (req, res) => {
  try {
    const dealerUsername = req.params.dealerUsername;
    // console.log(dealerUsername);
    const pickupRequests = await Pickup.find({
      dealerUserName: dealerUsername,
      status: 2,
    });
    // console.log(pickupRequests);
    res.status(200).json(pickupRequests);
  } catch (error) {
    console.error("Error fetching pickup requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/drop-requests-extraction/:dealerUsername", async (req, res) => {
  try {
    const dealerUsername = req.params.dealerUsername;
    // console.log(dealerUsername);
    const dropRequests = await Drop.find({
      dealerUserName: dealerUsername,
      status: 2,
    });
    res.status(200).json(dropRequests);
  } catch (error) {
    console.error("Error fetching pickup requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(
  "/accept-drop-request-extraction/:dealerUsername/:userName",
  async (req, res) => {
    try {
      const dealerUsername = req.params.dealerUsername;
      const userName = req.params.userName;
      console.log(req.body);
      const disposedItems = req.body;
      var totalAmount = 0;
        for (const item in disposedItems) {
            for (const metal in metals[item]) {
                    totalAmount += disposedItems[item] * prices[metal] * metals[item][metal];
            }
        }
        console.log(totalAmount);
        const finalAmount = Math.ceil((totalAmount*0.75)/50);
        console.log(finalAmount);
      const dropRequest = await Drop.findOneAndUpdate(
        { dealerUserName: dealerUsername, userName: userName, status: 2 },
        { $set: { status: 3 } },
        { new: true }
      );
      const rewards = await User.findOne(
        {userName: userName}
      )
      const updateReward = rewards.reward + finalAmount;
      const reward = await User.findOneAndUpdate(
        {userName: userName},
        {$set: {reward: updateReward}},
        {new: true}
      )
      if (!dropRequest) {
        return res
          .status(404)
          .json({ error: "Drop request not found or already accepted" });
      }

      res
        .status(200)
        .json({ message: "Drop request accepted successfully", dropRequest });
    } catch (error) {
      console.error("Error accepting drop request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.post(
  "/accept-pickup-request-extraction/:dealerUsername/:userName",
  async (req, res) => {
    try {
      const dealerUsername = req.params.dealerUsername;
      const userName = req.params.userName;
      console.log(req.body);
      const disposedItems = req.body;
      var totalAmount = 0;
        for (const item in disposedItems) {
            for (const metal in metals[item]) {
                    totalAmount += disposedItems[item] * prices[metal] * metals[item][metal];
            }
        }
        console.log(totalAmount);
        const finalAmount = Math.ceil((totalAmount*0.75)/50);
        console.log(finalAmount);
      const pickupRequest = await Pickup.findOneAndUpdate(
        { dealerUserName: dealerUsername, userName: userName, status: 2 },
        { $set: { status: 3 } },
        { new: true }
      );
      const rewards = await User.findOne(
        {userName: userName}
      )
      const updateReward = rewards.reward + finalAmount;
      const reward = await User.findOneAndUpdate(
        {userName: userName},
        {$set: {reward: updateReward}},
        {new: true}
      )
      console.log(pickupRequest);
      if (!pickupRequest) {
        return res
          .status(404)
          .json({ error: "Pickup request not found or already accepted" });
      }

      res.status(200).json({
        message: "Pickup request accepted successfully",
        pickupRequest,
      });
    } catch (error) {
      console.error("Error accepting pickup request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.get("/user-profile/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    // console.log(userName);
    const dropRequests = await Drop.find({
      userName: userName,
    });
    const pickupRequests = await Pickup.find({
      userName: userName,
    });

    const userProfile = {
      dropRequests,
      pickupRequests,
    };
    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/change-password/:userName", async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const userName = req.params.userName;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
    console.log("upadated");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/change-mobile-number/:userName", async (req, res) => {
  try {
    const { oldMobile, newMobile } = req.body;
    const userName = req.params.userName;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMobileValid = (oldMobile === user.phone)
    if (!isMobileValid) {
      return res.status(401).json({ error: "Current mobile number is incorrect" });
    }
    user.phone = newMobile;
    await user.save();

    res.status(200).json({ message: "Mobile number updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/get-rewards/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    // console.log(userName);
    const user = await User.findOne({
      userName: userName,
    });
    const rewards = user.reward;
    res.status(200).json(rewards);
  } catch (error) {
    console.error("Error fetching rewards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/redeem/:userName/:code", async (req, res) => {
  try {
    console.log("server side redeem")
    const userName = req.params.userName;
    const code = req.params.code;
    console.log("in redeem server"+userName);
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.reward = user.reward - code;
    await user.save();
    res.status(200).json({ message: "Mobile number updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
