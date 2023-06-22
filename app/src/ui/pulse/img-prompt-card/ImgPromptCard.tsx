import clsx from "clsx";
import Countdown from "react-countdown";

import { Card } from "ui/card/Card";
import { Grid } from "ui/grid/Grid";
import { Typography } from "ui/typography/Typography";
import pulse from "providers/pulse";
import { Icon } from "ui/icon/Icon";
import near from "providers/near";
import date from "providers/date";

import { ImgPromptCardProps } from "./ImgPromptCard.types";
import styles from "./ImgPromptCard.module.scss";

export const ImgPromptCard: React.FC<ImgPromptCardProps> = ({
  marketId,
  marketContractValues,
  className,
  datesElement,
}) => {
  const { market, resolutionWindow, buySellTimestamp, resolution } = marketContractValues;

  const marketClosesIn = date.client(market.ends_at - buySellTimestamp!).minutes();

  const getDatesElement = () => {
    if (!datesElement) {
      return (
        <>
          <Typography.Description className={styles["img-prompt-card__start-end-time--text"]}>
            <span>Event starts</span>
            <span>{date.fromTimestampWithOffset(market.starts_at, market.utc_offset)}</span>
          </Typography.Description>
          <Typography.Description className={styles["img-prompt-card__start-end-time--text"]}>
            <span>Event ends</span> <span>{date.fromTimestampWithOffset(market.ends_at, market.utc_offset)}</span>
          </Typography.Description>
          <Typography.MiniDescription align="right">
            *market closes {marketClosesIn} minutes <strong>after event starts</strong>.
          </Typography.MiniDescription>
          <Typography.Description flat={!resolutionWindow} className={styles["img-prompt-card__start-end-time--text"]}>
            <span>Resolution date</span>
            <span>{resolutionWindow ? date.fromTimestampWithOffset(resolutionWindow, market.utc_offset) : "TBD*"}</span>
          </Typography.Description>
          {!resolutionWindow && (
            <Typography.MiniDescription align="right">
              *when event ends and DAO proposals are published.
            </Typography.MiniDescription>
          )}
        </>
      );
    }

    return datesElement;
  };

  return (
    <Card className={clsx(styles["img-prompt-card"], className)}>
      <Card.Content>
        <Grid.Row>
          <Grid.Col lg={7}>
            <Card>
              <Card.Content className={styles["img-prompt-card__current-img-card--box"]}>
                <div className={styles["img-prompt-card__current-img-card--file"]}>
                  <img src="/prompt-wars/toast.jpg" alt="current" />
                </div>
              </Card.Content>
            </Card>
          </Grid.Col>
          <Grid.Col lg={5}>
            <div className={styles["img-prompt-card__right-column"]}>
              <Card className={styles["img-prompt-card__current-result-element"]}>
                <Card.Content className={styles["img-prompt-card__current-result-element--time-left"]}>
                  <Typography.Description>Time left</Typography.Description>
                  <Typography.Headline3 flat>
                    <Countdown date={Date.now() - 1000000} />
                  </Typography.Headline3>
                </Card.Content>
              </Card>
              <div className={styles["img-prompt-card__start-end-time"]}>
                {getDatesElement()}

                <Typography.Description className={styles["img-prompt-card__start-end-time--text"]}>
                  <span>Resolution mechanism</span>
                  {/* @TODO update to Switchboard feed URL */}
                  <Typography.Anchor
                    href={`${pulse.getConfig().resolutionMechanism.baseUrl}/${resolution.feed_id}`}
                    target="_blank"
                    truncate
                  >
                    {resolution.feed_id}
                    <Icon name="icon-launch" />
                  </Typography.Anchor>
                </Typography.Description>
                <Typography.Description className={styles["img-prompt-card__start-end-time--text"]}>
                  <span>Contract</span>
                  <Typography.Anchor
                    href={`${near.getConfig().explorerUrl}/accounts/${marketId}`}
                    target="_blank"
                    truncate
                  >
                    {marketId}
                    <Icon name="icon-launch" />
                  </Typography.Anchor>
                </Typography.Description>
              </div>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Card.Content>
    </Card>
  );
};
