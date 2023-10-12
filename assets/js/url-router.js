const urlPageTitle = 'Green Waste';

document.addEventListener('click', (e) => {
  const { target } = e;
  if (!target.matches('nav a')) {
    return;
  }
  e.preventDefault();
  urlRoute();
});

const urlRoutes = {
  404: {
    template: '/templates/404.html',
    title: '404 | ' + urlPageTitle,
    description: 'page not found',
  },
  '/': {
    template: '/templates/index.html',
    title: 'Home | ' + urlPageTitle,
    description: 'This is the homepage',
  },
  '/about': {
    template: '/templates/about.html',
    title: 'About | ' + urlPageTitle,
    description: 'About us page',
  },
  '/contact': {
    template: '/templates/contact.html',
    title: 'Contact | ' + urlPageTitle,
    description: 'contact page',
  },
};

const urlRoute = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  const location = window.location.pathname;
  if (location.length == 0) {
    location = '/';
  }

  const route = urlRoutes[location] || urlRoutes[404];
  const html = await fetch(route.template).then((res) => res.text());
  document.getElementById('content').innerHTML = html;
  document.title = route.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', route.description);
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

urlLocationHandler();
