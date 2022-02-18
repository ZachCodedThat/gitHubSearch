export default async function handler(req, res) {
  const { query, page } = JSON.parse(req.body);
  try {
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
  } catch (err) {
    console.log(err);
  }
}

// This is the internal api endpoint that I call in place of the github api. This is to obscure the GH api token and is good practice.

// I originally fetched the data directly from the component which provided the results wanted but exposes my token on every network request.
//   I explored some other ways like GSP and GSSP but I decided to go with the API endpoint becasue I could not find a clean way to set state variables from the other two methods.
//   it can be done but for the scope of this project the API endpoint is fine.
