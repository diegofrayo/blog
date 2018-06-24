// npm libs
import React from 'react';
import { Link } from 'react-router-dom'

// styles
import styles from './styles.less';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      entries: [
        {
          id: 1,
          title: 'Conectando Firebase Hosting con un dominio propio de Go Daddy!',
          date: '23/Junio/2018',
          tags: ['tutorial', 'firebase', 'go daddy'],
          slug: 'conectando-firebase-hosting-con-un-dominio-propio-de-go-daddy'
        },
      ],
    };
  }

  render() {

    const entries = this.state.entries.map(entry => (
      <article className={styles.entry} key={entry.id}>
        <p className={styles.date}>{entry.date}</p>
        <Link to={`/${entry.slug}`} className={styles.title}>{entry.title}</Link>
        <section className={styles['tags-container']}>
          {entry.tags.map(tag => <span key={`${entry.id}-${tag}`} className={styles.tag}>{tag}</span>)}
        </section>
      </article>
    ));

    return (
      <section>
        <h1 className={styles['main-title']}>Entradas</h1>
        <section className={styles['entries-container']}>{entries}</section>
      </section>
    );
  }
}

export default Home;
