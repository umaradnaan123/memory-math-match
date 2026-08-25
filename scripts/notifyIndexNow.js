const host = "memory-math-match.vercel.app";
const key = "b6be6336e890472491ccbd5eb2e3a890";
const keyLocation = `https://${host}/${key}.txt`;

const urlList = [
  `https://${host}/`,
  `https://${host}/about`,
  `https://${host}/benefits-of-memory-games`,
  `https://${host}/benefits-of-mental-math`,
  `https://${host}/boost-iq-with-games`,
  `https://${host}/contact`,
  `https://${host}/daily-brain-training`,
  `https://${host}/faq`,
  `https://${host}/how-to-play`,
  `https://${host}/improve-concentration`,
  `https://${host}/memory-improvement-techniques`,
  `https://${host}/privacy-policy`,
  `https://${host}/terms`,
  `https://${host}/blog`,
  `https://${host}/blog/best-memory-games-for-kids-cognitive-benefits-rules`,
  `https://${host}/blog/fun-ways-to-learn-mathematics-gamification-pedagogy`,
  `https://${host}/blog/how-memory-games-improve-learning-focus-classrooms`
];

async function notifyIndexNow() {
  console.log("Notifying IndexNow engine about built pages...");
  
  const payload = {
    host,
    key,
    keyLocation,
    urlList
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`IndexNow success: Status ${response.status} (${response.statusText})`);
    } else {
      console.error(`IndexNow failed: Status ${response.status} (${response.statusText})`);
      const text = await response.text();
      console.error(`Details: ${text}`);
    }
  } catch (error) {
    console.error("Error occurred while sending IndexNow notification:", error);
  }
}

notifyIndexNow();
