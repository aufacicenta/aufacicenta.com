import clsx from "clsx";

import { Grid } from "ui/grid/Grid";
import { Typography } from "ui/typography/Typography";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import { AufacicentaLogoTextOnly } from "ui/icons/AufacicentaLogoTextOnly";

import { FooterProps } from "./Footer.types";
import styles from "./Footer.module.scss";

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const routes = useRoutes();

  return (
    <footer className={clsx(styles.footer, className)}>
      <Grid.Container>
        <Grid.Row>
          <Grid.Col lg={6} sm={6} xs={6}>
            <div className={styles.footer__left}>
              <div className={styles["footer__left--item"]} />
            </div>
          </Grid.Col>
          <Grid.Col lg={6} sm={6} xs={6}>
            <div className={styles.footer__right}>
              <div className={clsx(styles["footer__right--item"])}>
                <Typography.Link href={routes.home()}>
                  <AufacicentaLogoTextOnly className={clsx(styles.footer__logo, "logo")} />
                </Typography.Link>
              </div>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </footer>
  );
};
