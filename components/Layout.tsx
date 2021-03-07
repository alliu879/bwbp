import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Layout.module.css';

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'NBJC',
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className={styles.navbar}>
          <Link href="/">
            <a>
              <h1>NBJC</h1>
            </a>
          </Link>
          <div className={styles.nav}>
            <Link href="/about">
              <a className={styles.link}>About</a>
            </Link>
          </div>
        </nav>
      </header>
      {children}
      <footer className={styles.footer} />
    </div>
  );
};

export default Layout;
