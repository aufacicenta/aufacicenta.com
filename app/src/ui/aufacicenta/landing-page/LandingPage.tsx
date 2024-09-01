import clsx from "clsx";

import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";

import styles from "./LandingPage.module.scss";
import { LandingPageProps } from "./LandingPage.types";

export const LandingPage: React.FC<LandingPageProps> = ({ className }) => (
  <div className={clsx(styles["landing-page"], className)}>
    <Grid.Container>
      <Grid.Row>
        <Grid.Col lg={10}>
          <section className={clsx(styles["landing-page__hero"])}>
            <div className={styles["landing-page__intro--desktop"]}>
              <Typography.Headline2 flat>We’ve engineered dApps in</Typography.Headline2>
              <Typography.Headline2 flat>the DeFi & GameFi ecosystems</Typography.Headline2>
              <Typography.Headline2 flat>since the birth of Ethereum.</Typography.Headline2>
            </div>
            <div className={styles["landing-page__intro--mobile"]}>
              <Typography.Headline2>
                We’ve engineered dApps in the DeFi & GameFi ecosystems since the birth of Ethereum.
              </Typography.Headline2>
            </div>
            <div className={styles["landing-page__hero--subtitle"]}>
              <Typography.Headline4 flat>
                Choose <span>Aufa</span> as your trusted partner
              </Typography.Headline4>
              <Typography.Headline4>in Web3 development.</Typography.Headline4>
            </div>
          </section>
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  </div>
);
