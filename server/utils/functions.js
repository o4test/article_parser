const isUrl = require('is-url');
const { JSDOM } = require('jsdom');
const requestPromise = require('request-promise');

const Functions = {

  /**
   * Add functions to the response object
   * add sendJson & sendError to more comfortable use
   *
   * @param request
   * @param response
   * @param next
   */
  addFunctionsResponse(request, response, next) {
    response['sendJson'] = (data, message) => {
      let res = {data};
      if (message) {res.message = message;}
      response.json(res);
    };

    response['sendError'] = (error) => response.json({error});
    next();
  },


  /**
   * Tries to parse article by current url
   *
   * @param url
   * @returns {Promise}
   */
  parseArticle(url) {
    return new Promise((resolve, reject) => {
      // If it's not valid url, send error
      if (!isUrl(url)) {
        return reject('Wrong Url');
      }

      // Try to get current article
      return requestPromise(url).then((html) => {
        // create JSDOM instance by put html string there
        const pageDom = new JSDOM(html);
        // Get title and content blocks
        const articleTitle = pageDom.window.document.querySelectorAll('h2.headline')[0];
        const articleBody = pageDom.window.document.querySelectorAll('.article-entity')[0];

        // If we didn't find anything, send error
        if (!articleBody || !articleTitle) {
          return reject('Cannot find content block');
        }

        // get article title
        const title = articleTitle.textContent;

        // get paragraphs of this article
        const textNodes = articleBody.querySelectorAll('.body-copy p');
        const paragraphs = [];

        // Fetch text from the nodes
        for(let article of textNodes) {
          if (!article.textContent) {
            continue;
          }

          paragraphs.push(article.textContent);
        }

        // Resolve final data
        resolve({paragraphs, title});

      }).catch((err) => {
        console.log(err);
        reject(`Cannot connect to the ${url}`)
      });
    });

  },
};

module.exports = Functions;