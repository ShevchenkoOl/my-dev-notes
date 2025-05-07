// Якщо потрібно добавити декілька класів одночасно:
// 1. Через шаблонную строку:

// className={`${styles.youTube} ${styles.socialIcon}`}

// 2. Через массив и join():

// className={[styles.youTube, styles.socialIcon].join(' ')}

// 3. Можно использовать библиотеку clsx или classnames, например:
// npm install clsx

// import clsx from 'clsx';
// className={clsx(styles.youTube, styles.socialIcon)}

// 4. використання інлайн стилів:
// <p style={{ textAlign: "center" }}