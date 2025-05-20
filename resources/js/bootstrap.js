import axios from 'axios';

window.axios = axios;
window.axios.defaults.withCredentials = true; // send cookies
window.axios.defaults.xsrfCookieName = 'XSRF-TOKEN'; // default
window.axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'; // default
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const tokenMeta = document.head.querySelector('meta[name="csrf-token"]');
if (tokenMeta) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = tokenMeta.content;
}
