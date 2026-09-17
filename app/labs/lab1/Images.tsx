export default function Images() {
  return (
    <div id="wd-images">
      <h4>Image tag</h4>
      Loading an image from the internet:
      <br />
      <img
        id="wd-starship"
        width="400px"
        alt="Starship"
        src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
      />
      <br />
      Loading a local image:
      <br />
      <img
        id="wd-teslabot"
        src="/images/teslabot.jpg"
        height="200px"
        alt="Tesla Bot (Optimus) humanoid robot"
      />

    <br />
      Loading a remote image:
      <br />
      <img
        id="wd-ai-image"
        width="200px"
        alt="The Blue Marble: Earth photographed by NASA's Apollo 17 crew"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/960px-The_Earth_seen_from_Apollo_17.jpg"
      />

    <br />
      Loading a personal image:
      <br />
      <img
        id="wd-your-image"
        height="300px"
        alt="My favorite sport is soccer/football."
        src="https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Football_in_Bloomington%2C_Indiana%2C_1995.jpg/960px-Football_in_Bloomington%2C_Indiana%2C_1995.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"
      />
    </div>
  );
}

