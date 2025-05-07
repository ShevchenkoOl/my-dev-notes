// Прокрутка по странице з використанням хеш (#):

// npm install react-router-hash-link

import { HashLink } from 'react-router-hash-link';

<HashLink to="/courses#kids">Детские курсы и расписание →</HashLink>

// В courses.jsx:

{/* <div id="kids">
  <h3>Детские курсы</h3>
</div> */}