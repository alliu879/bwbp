import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from '@material-ui/core';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { Organization } from '../interfaces/organization';

type HomeProps = {
  orgs: Organization[];
};

const Home: React.FC<HomeProps> = ({ orgs }) => {
  const router = useRouter();

  // const orgs = [
  //   {
  //     id: 0,
  //     name: 'Blueprint',
  //     organizationType: 'National',
  //     workType: 'Direct Service',
  //   },
  //   {
  //     id: 1,
  //     name: 'Redprint',
  //     organizationType: 'Local',
  //     workType: 'Nothing',
  //   },
  // ];

  return (
    <Layout>
      <div className={styles.pageFlex}>
        <Typography variant="h4">Organizations</Typography>
        <div className={styles.pageContent}>
          <div className={styles.leftCol}>
            <div className={styles.cards}>
              {orgs.length !== 0 ? (
                orgs.map((org) => (
                  <Card className={styles.card} key={org.id}>
                    <CardActionArea
                      onClick={() => router.push(`/orgs/${org.id}`)}
                    >
                      <CardContent>
                        <Typography variant="h5">{org.name}</Typography>
                        <Typography variant="body2">
                          {org.organizationType}
                          {org.organizationType && org.workType ? ' • ' : null}
                          {org.workType}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))
              ) : (
                <Typography>No Organizations</Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resp = await fetch('https://next-js-ws.glitch.me/orgs');
    const orgs = await resp.json();
    if (!orgs) {
      return {
        notFound: true,
      };
    }
    return {
      props: { orgs },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
