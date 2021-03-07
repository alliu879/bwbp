import { Button, Chip } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Organization } from '../../interfaces/organization';
import styles from '../../styles/Organization.module.css';

const orgs: Organization[] = [
  {
    name: 'Blueprint',
    organizationType: 'National',
    workType: 'Direct Service',
    address: '123 Bancroft St., Berkeley, CA',
    ein: '1234567890',
    lgbtqDemographic: [],
    raceDemographic: [],
    ageDemographic: [],
    missionStatement: 'asdasdfasdfsadfasdf',
    shortHistory: 'asdfasdfasdfasdfasdf',
  },
  {
    name: 'Redprint',
    organizationType: 'Grassroots',
    workType: 'Nothing',
    address: '789 Blake St., Berkeley, CA',
    ein: '0987654321',
    lgbtqDemographic: [],
    raceDemographic: [],
    ageDemographic: [],
    missionStatement: 'asdasdfasdfsadfasdf',
    shortHistory: 'asdfasdfasdfasdfasdf',
  },
];

const OrgProfile: React.FunctionComponent = () => {
  const router = useRouter();
  const org = orgs[Number(router.query.id)];

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
        <div className={styles.orgImages}>
          <img
            src="https://1mktxg24rspz19foqjixu9rl-wpengine.netdna-ssl.com/wp-content/uploads/2020/01/eia-berkeley-Cover.png"
            alt="Organization"
          />
        </div>
        <div className={styles.editButton}>
          <Button
            variant="contained"
            className={styles.editButtonStyles}
            disableElevation
          >
            Edit
          </Button>
        </div>
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
            {/* Members */}
            <h3 className={styles.infoHeader}>Members</h3>
            <p className={styles.info}>Ace Chen, President</p>
            <p className={styles.info}>Grace Ng, Internal Vice President</p>
            <p className={styles.info}>Gibson Chu, External Vice President</p>
            <p className={styles.info}>Erin Song, Vice President of Projects</p>
            <p className={styles.info}>
              Franco Monterrosa, Vice President of Technology
            </p>
            <p className={styles.info}>
              Joelene Latief, Vice President of Design
            </p>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrgProfile;
