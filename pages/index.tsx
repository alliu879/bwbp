import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from '@material-ui/core';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const router = useRouter();

  const orgs = [
    {
      id: 0,
      name: 'Blueprint',
      organizationType: 'National',
      workType: 'Direct Service',
    },
    {
      id: 1,
      name: 'Redprint',
      organizationType: 'Local',
      workType: 'Nothing',
    },
  ];

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
