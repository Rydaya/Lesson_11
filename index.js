//9 карточек туда вывести несколько полей: title, body, 
//userId по нажатию на консоль выводить инфу о пользователе


function getURL(resourse) {
	return `https://jsonplaceholder.typicode.com/${resourse}`
}

function get(url, callback) {
	let xhttp = new XMLHttpRequest();
	xhttp.open('get', url);
	xhttp.onload = function() {
		let json = JSON.parse(xhttp.response);
		callback(json);
	}
	xhttp.send();
};

function makeCard(title, body, userId) {
	let $card = document.createElement('div');
	$card.classList.add('card');

	let $cardTitle = document.createElement('div');
	$cardTitle.classList.add('card-title');
	$cardTitle.innerHTML = title;
	$card.appendChild($cardTitle);

	let $cardBody = document.createElement('div');
	$cardBody.classList.add('card-body');
	$cardBody.innerHTML = body;
	$card.appendChild($cardBody);

	let $cardId = document.createElement('button');
	$cardId.classList.add('card-userId');
	$cardId.innerHTML = `About user ${userId}`;
	$card.appendChild($cardId);
	return $card;
}

function makeCardAfterClick(name, username, email) {
	let $cardUser = document.createElement('div');
	$cardUser.classList.add('card-user');

	let $cardUserName = document.createElement('div');
	$cardUserName.classList.add('card-username');
	$cardUserName.innerHTML = `Username: ${username}`;

	let $cardName = document.createElement('div');
	$cardName.classList.add('card-name');
	$cardName.innerHTML = `Full name: ${name}`;

	let $cardEmail = document.createElement('div');
	$cardEmail.classList.add('card-email');
	$cardEmail.innerHTML = `E-mail: ${email}`;

	$cardUser.appendChild($cardUserName);
	$cardUser.appendChild($cardName);
	$cardUser.appendChild($cardEmail);

	return $cardUser;
}

function toggle(el) {
  el.style.display = (el.style.display == 'none') ? 'block' : 'none'
}

get(getURL('posts'), function(posts) {

	for(let post of posts.slice(0, 9)) {
		let $post = document.createElement('div');
		$post.classList.add('wrapper');

		$post.appendChild(makeCard(post.title, post.body, post.userId));

		$post.addEventListener('click', function() {

			get(getURL('users/' + post.userId), function(user) {

				let $user = document.createElement('div');
				$user.classList.add('user-wrapper');

				$post.appendChild($user);
				$user.appendChild(makeCardAfterClick(user.name, user.username, user.email));
				let $buttons = document.getElementsByClassName('.card-userId');
				for(let hiddenButton of $buttons) {
					toggle(hiddenButton);
				}
			});
		}, {once: true});
		document.body.appendChild($post);
	}
});

