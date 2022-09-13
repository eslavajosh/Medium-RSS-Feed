import React, { useState, useEffect } from "react";
import articleService from "./articleService";
import "./App.css";

function App() {
  const [articles, setArticles] = useState();
  // const [bookmark, setBookmark] = useState("Bookmark");

  useEffect(() => {
    articleService.getRssFeed().then(onGetRssSuccess).catch(onGetRssError);
  }, []);

  const onGetRssSuccess = (response) => {
    const articleItems = response.data.items;

    articleItems.filter((item) => item.title.length > 0).slice(0, 10);

    setArticles(articleItems);
  };

  const onGetRssError = (error) => {
    console.log("error", error);
  };

  const onBookmarkClick = (event) => {
    // const target = event.target.value;
    // target.setBookmark("Bookmarked");
    // console.log("target", target);
  };

  const ConvertStringToHTML = (str) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  console.log(articles);

  return (
    <React.Fragment>
      {articles
        ? articles.map((item) => (
            <div className="big">
              <article className="article">
                <div className="article-box">
                  <img width="1000" height="900" alt="" src={item.thumbnail} />
                </div>
                <div className="article-content">
                  <h4 className="article-desc">{item.author}</h4>

                  <h1 className="article-title">{item.title}</h1>

                  <p className="article-desc text-muted">
                    published {item.pubDate}
                  </p>
                  <div className="text-muted">
                    #{item?.categories[0]} #{item?.categories[1]} #
                    {item?.categories[2]} #{item?.categories[3]} #
                    {item?.categories[4]}
                  </div>

                  <button
                    className="article-save"
                    type="button"
                    onClick={onBookmarkClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-bookmark"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />{" "}
                    </svg>
                    Bookmark
                  </button>
                  <h4>
                    <a href={item.link} className="article-link">
                      Read More
                    </a>
                  </h4>
                </div>
              </article>
            </div>
          ))
        : "No Article"}
      ;
    </React.Fragment>
  );
}

export default App;
