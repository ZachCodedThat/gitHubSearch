# [![Website](https://img.shields.io/website?label=GitHubSearch&url=https%3A%2F%2Fwww.zacharyp.dev%2F)](https://hardcore-minsky-40cee8.netlify.app/) 👈 Check it out!!

## GitHub Search

<font size ="5">- Provides full auto updating search for users and displays relevant information to the page.</font>

<br>

<font size ="3">- Paginated results limited to 10 users a page and only as many pages needed to display all the results

- Note: GH's api only allows up to the first 1000 results to be hit. I have provided some influence in narrowing down search params
  - I beleive that given the scope of the project needing to handle over 1000 results is unecessary.
- There is small fun bug/easter egg/feature? surronding page number please let me know if you find it!</font>

<br>
    
<font size ="3">- Using some state and a useEffect I control the frequency of when the API is called and added deBounce to the query params to fine tune when the API fires.
  - I am using a token on the backend to extend privllages allowing the app to hit the API hit by a user multiple times without running into the limiter 
    - Note: There is still an upper limit (Somewhere in the realm of 40-50 calls in a min/30seconds according to a few stress tests) However for the use case again I do not see this being a hinderance. If the application handled more than just usernames / was a production level product more stringant checks on the API would be put in place.</font>
    
<br>

<font size ="3">- I wanted to practice some raw CSS so i chose to forgo a design library.

- As of this iteration there is a full web app and a mobile variant based around the iphone 12 max screen, this gave me the widest range of device coverage I would extend this to cover as many devices as possible if this were a production level app. </font>

### Built using:

<img align="left" alt="Visual Studio Code" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" title="VScode"/>
<img align="left" alt="NextJS" width="50px" src="https://api.iconify.design/akar-icons/nextjs-fill.svg?color=white" title="Next.JS" />

<img align="left" alt="React" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" title="React" />

<br />
<br />

---

[website]: https://zacharyp.dev
[websitecontact]: https://www.zacharyp.dev/contact
[twitter]: https://twitter.com/TweetZachBack
[linkedin]: https://www.linkedin.com/in/zachary-przybilski/
[blog]: https://dev.to/zacharyp
