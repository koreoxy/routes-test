const urlPageTitle = 'Green Waste';

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation();
};

// const routes = {
//   404: '/pages/404.html',
//   '/': '/pages/index.html',
//   '/about': '/pages/about.html',
//   '/contact': '/pages/contact.html',
// };

const routes = {
  404: {
    template: '/pages/404.html',
    title: '404 | ' + urlPageTitle,
    description: 'page not found',
  },
  '/': {
    template: '/pages/index.html',
    title: 'Home | ' + urlPageTitle,
    description: 'This is the homepage',
  },
  '/about': {
    template: '/pages/about.html',
    title: 'About | ' + urlPageTitle,
    description: 'About us page',
  },
  '/contact': {
    template: '/pages/contact.html',
    title: 'Contact | ' + urlPageTitle,
    description: 'contact page',
  },
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  const html = await fetch(route.template).then((res) => res.text());
  document.getElementById('main-page').innerHTML = html;

  document.title = route.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', route.description);
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
