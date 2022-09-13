import axios from "axios"


const getRssFeed = async () => {
    const config = {
      method: "GET",
      url: "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/backchannel",
      headers: { "Content-Type": "application/json" },
    };
    return axios(config);
  };

  // const loadArticles = async () => {
  //   //     fetch(mediumRssFeed, { headers: { Accept: "application/json" } })
  //   //       .then((res) => res.json())

  const articleService = {getRssFeed};
  export default articleService;
