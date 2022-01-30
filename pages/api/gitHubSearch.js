export default async function handler(req, res) {
  const { query, page } = JSON.parse(req.body);

  const response = await fetch(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`,
    {
      method: "GET",
      headers: {
        Authorization: ` Token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    }
  );

  const data = await response.json();

  res.send(data);
}
