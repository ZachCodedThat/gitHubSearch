export default async function handler(req, res) {
  const { login } = JSON.parse(req.body);
  try {
    const response = await fetch(`https://api.github.com/users/${login}`, {
      method: "GET",
      headers: {
        Authorization: ` Token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    res.send(data);
  } catch (err) {
    console.log(err);
  }
}

// my inital solution was off because i was unaware of the additonal information
// behind the url endpoint within the main user search. I was able to get the
// actual totals of Followers and Following among other information.
