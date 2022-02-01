export default async function handler(req, res) {
  const { login } = JSON.parse(req.body);

  const response = await fetch(
    `https://api.github.com/users/${login}/followers`,
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
