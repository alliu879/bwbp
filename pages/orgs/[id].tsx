import { Button, Chip } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Organization } from '../../interfaces/organization';
import styles from '../../styles/Organization.module.css';

// TODO: your (Part 2b) edits in this vicinity
type OrgProfileProps = {
  org: Organization;
};

// TODO: your (Part 2b) edits in this vicinity
const OrgProfile: React.FunctionComponent<OrgProfileProps> = ({ org }) => {
  const router = useRouter();

  const demographics = (category: string, groups: string[]): JSX.Element => {
    return (
      <div className={styles.demographic}>
        {category}
        <div className={styles.demographicTags}>
          {groups.length !== 0 ? (
            groups.map((group) => <Chip label={group} variant="outlined" />)
          ) : (
            <Chip label="None" variant="outlined" />
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout title={`${org.name} Profile`}>
      <div className={styles.orgMargins}>
        <div className={styles.titleColumns}>
          <div className={styles.leftColumn}>
            <h2 className={styles.Header}>{org.name}</h2>
            <h3 className={styles.subHeader}>
              {org.workType}
              {org.workType && org.organizationType ? ' • ' : null}
              {org.organizationType}
            </h3>
            {/* Location */}
            <h3 className={styles.infoHeader}>Location</h3>
            <p className={styles.info}>
              <b>Type:</b> Headquarters
            </p>
            {org.address && <p className={styles.info}>{org.address}</p>}
            {/* Basics */}
            {(org?.website || org?.ein) && (
              <h3 className={styles.infoHeader}>Basics</h3>
            )}
            {org.website && (
              <p className={styles.info}>
                <b>Site:</b> {org.website}
              </p>
            )}
            {org.ein && (
              <p className={styles.info}>
                <b>EIN:</b> {org.ein}
              </p>
            )}
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.rightContent}>
              <h3 className={styles.audienceHeader}>Audience Demographics</h3>
              <div className={styles.demographicSection}>
                {demographics('Orientation', org.lgbtqDemographic)}
                {demographics('Background', org.raceDemographic)}
                {demographics('Age Range', org.ageDemographic)}
              </div>
              <h3 className={styles.audienceHeader}>Our Mission</h3>
              {org.missionStatement && (
                <p className={styles.infoContent}>{org.missionStatement}</p>
              )}
              <h3 className={styles.audienceHeader}>Our History</h3>
              {org.shortHistory && (
                <p className={styles.infoContent}>{org.shortHistory}</p>
              )}
            </div>
            {/* // TODO: your (Part 2a/b) edits in this vicinity */}
            <div className={styles.nextButton}>
              <Button variant="contained" disableElevation>
                Next
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.orgImages}>
          {/* TODO: some of your (Part 1) edits in this vicinity */}
          <img
            src="https://1mktxg24rspz19foqjixu9rl-wpengine.netdna-ssl.com/wp-content/uploads/2020/01/eia-berkeley-Cover.png"
            alt="Organization"
          />
        </div>
      </div>
    </Layout>
  );
};

export default OrgProfile;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id as string | undefined;

    if (!id) {
      return { notFound: true };
    }

    const resp = await fetch('https://next-js-ws.glitch.me/orgs');
    const orgs = await resp.json();

    // TODO: your (Part 2b) edits in this vicinity
    return {
      props: { org: orgs[Number(id)] },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
