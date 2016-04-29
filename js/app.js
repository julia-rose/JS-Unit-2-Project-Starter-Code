/*
  Please add all Javascript code to this file.
*/

// replace current news source on click of a different source
$('.news-source').on('click', function(e) {
	e.preventDefault();
	var text = $(e.target).text();
	var url = '';

	$('.current-source').text(text);

	// clear the currently displayed articles
	$('#main').empty();

	// call the new source's API
	// if Reddit
	if (text === 'Reddit') {
		url = 'https://www.reddit.com/top.json';
	}
	// if Mashable
	else if (text === 'Mashable') {
		url = 'http://feedr-api.wdidc.org/mashable.json';
	}
	// 
	// if Digg
	else if (text === 'Digg') {
		url = 'http://feedr-api.wdidc.org/digg.json';
	}
	makeAPICall(url);
})

// make API call to Mashable
function makeAPICall(url) {
	$.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: handleSuccess
  });
}

function handleSuccess(response) {
	var articlesArray;
	var articleImage;
	var articleTitle;
	var articleUrl;
	var articleSub;
	var articleNum; 

	// if Reddit
	if ($('.current-source').text() === 'Reddit') {

		articlesArray = response.data.children;

		articlesArray.forEach(function(item) {
			let article = $('<article class="article"></article>');
			let featImg = $('<section class="featuredImage"></section>');
			let content = $('<section class="articleContent"></article>');
			let clearfix = $('<div class="clearfix"></div>');

			articleImage = item.data.preview ? item.data.preview.images[0].source.url : 'images/article_placeholder_1.jpg';
			articleTitle = item.data.title;
			articleUrl = item.data.url;
			articleSub = item.data.domain;
			articleNum = item.data.num_comments;

			var image = $('<img />').attr('src', articleImage);
			featImg.append(image);

			var title = $('<h3></h3').text(articleTitle);

			var url = $('<a></a>').attr('href', articleUrl);
			url.append(title);
			content.append(url);

			var subtitle = $('<h6></h6>').text(articleSub);
			content.append(subtitle);

			var number = $('<section class="impressions"></section>').text(articleNum);

			article.append(featImg);
			article.append(content);
			article.append(number);
			article.append(clearfix);
			$('#main').append(article);
		});
	}
	// if Mashable
	else if ($('.current-source').text() === 'Mashable') {

		articlesArray = response.new;

		articlesArray.forEach(function(item) {
			let article = $('<article class="article"></article>');
			let featImg = $('<section class="featuredImage"></section>');
			let content = $('<section class="articleContent"></article>');
			let clearfix = $('<div class="clearfix"></div>');

			articleImage =  item.responsive_images[0].image;
			articleTitle = item.title;
			articleUrl = item.link;
			articleSub = item.channel;
			articleNum = item.shares.total;

			var image = $('<img />').attr('src', articleImage);
			featImg.append(image);

			var title = $('<h3></h3').text(articleTitle);

			var url = $('<a></a>').attr('href', articleUrl);
			url.append(title);
			content.append(url);

			var subtitle = $('<h6></h6>').text(articleSub);
			content.append(subtitle);

			var number = $('<section class="impressions"></section>').text(articleNum);

			article.append(featImg);
			article.append(content);
			article.append(number);
			article.append(clearfix);
			$('#main').append(article);
		});
	}
	// if Digg
	else if ($('.current-source').text() === 'Digg') {

		articlesArray = response.data.feed;

		articlesArray.forEach(function(item) {
			let article = $('<article class="article"></article>');
			let featImg = $('<section class="featuredImage"></section>');
			let content = $('<section class="articleContent"></article>');
			let clearfix = $('<div class="clearfix"></div>');

			articleImage = item.content.media.images[0].url;
			articleTitle = item.content.title_alt;
			articleUrl = item.content.original_url;
			articleSub = item.content.tags[0].display;
			articleNum = item.diggs.count;

			var image = $('<img />').attr('src', articleImage);
			featImg.append(image);

			var title = $('<h3></h3').text(articleTitle);

			var url = $('<a></a>').attr('href', articleUrl);
			url.append(title);
			content.append(url);

			var subtitle = $('<h6></h6>').text(articleSub);
			content.append(subtitle);

			var number = $('<section class="impressions"></section>').text(articleNum);

			article.append(featImg);
			article.append(content);
			article.append(number);
			article.append(clearfix);
			$('#main').append(article);
		});
	}
};










