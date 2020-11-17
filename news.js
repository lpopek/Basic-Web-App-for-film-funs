const newsContainer = document.getElementById('news-container');
const loadButton = document.getElementById('refresh-btn');

const options = {
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
    params: {pageNumber: '1', pageSize: '10', q: 'cinema', autoCorrect: 'true', fromPublishedDate:'2019-05-16T05:50:06'},
    headers: {
      'x-rapidapi-key': '7dae46d9bemshf95e9c4f1c0ea67p1ea1dbjsn6c79b8496c1a',
      'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
    }
  };



async function loadPosts() {
    news = Array();
    await axios.request(options).then(response => {news = response.data.value;});  
    news.forEach(post => {
        const postElement = createPost(post);
        newsContainer.appendChild(postElement);
    }
    );
}

function createPost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('news-post');
    postElement.innerHTML = `
            <h1 class="news-title"><a class="source" href="${post.webpageUrl}">${post.title}</a></h1>
            <p class="icon"> <img src="${post.url}" id="miniature">
        `;
    return postElement;
}

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

loadButton.addEventListener("click", ()=>loadPosts());