import randomcolor from 'randomcolor';

const now = new Date().getTime();

export default {
  users: [
    { name: 'Bart', color: randomcolor({ luminosity: 'dark' }) },
    { name: 'Lisa', color: randomcolor({ luminosity: 'dark' }) },
  ],
  messages: [
    { ID: 1, userName: 'Bart', createdAt: now, join: true },
    { ID: 2, userName: 'Lisa', createdAt: now + 1000, join: true },
    { ID: 3, userName: 'Bart', createdAt: now + 3000, content: 'Hello Lisa! How are you ?' },
    { ID: 4, userName: 'Lisa', createdAt: now + 6000, content: 'Fine! And you ?' },
    { ID: 5, userName: 'Bart', createdAt: now + 10000, content: '_Great!_ Did **you** know that we can use `markdown` here ([doc](https://fr.wikipedia.org/wiki/Markdown)) ?' },
    { ID: 6, userName: 'Lisa', createdAt: now + 15000, content: 'Amazing! I saw that we can put emoji too :heart: :smiley: :thumbsup: !' },
  ],
};
