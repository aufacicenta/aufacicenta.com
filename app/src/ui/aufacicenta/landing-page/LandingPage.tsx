/* eslint-disable no-irregular-whitespace */
import clsx from "clsx";
import anime from "animejs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { Button } from "ui/button/Button";
import { AufaPagePath } from "ui/icons/AufaPagePath";

import styles from "./LandingPage.module.scss";
import { LandingPageProps } from "./LandingPage.types";

export const LandingPage: React.FC<LandingPageProps> = ({ className }) => {
  useLayoutEffect(() => {
    gsap.config({});

    gsap.registerPlugin(ScrollTrigger);

    const ellipseElement = document.querySelector(".aufa-page-path ellipse");
    const trigger = document.querySelector(".aufa-page-path");
    const animePath = anime.path(".aufa-page-path path");

    const aboutContent = document.querySelector(".about-content");
    aboutContent?.setAttribute("style", `min-height: ${trigger?.clientHeight}px`);

    const ellipseAnimation = anime({
      targets: ellipseElement,
      easing: "easeInOutSine",
      translateX: animePath("x"),
      translateY: animePath("y"),
      duration: 1000,
      direction: "normal",
      loop: false,
      autoplay: false,
      fill: ["#4a4b6c", "#9396ED"],
      stroke: ["#4a4b6c", "#9396ED"],
    });

    ScrollTrigger.create({
      trigger,
      markers: false,
      scrub: 0,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        ellipseAnimation.seek(ellipseAnimation.duration * self.progress * 0.6);
      },
    });

    const split = document.querySelectorAll(".intro-text");

    const masks: HTMLSpanElement[] = [];

    const runTextAppearAnimation = () => {
      split.forEach((target) => {
        const mask = document.createElement("span");

        mask.className = "mask";
        target.append(mask);
        masks.push(mask);

        gsap.to(mask, {
          scaleX: 0,
          transformOrigin: "right center",
          ease: "circ.in",
          scrollTrigger: {
            trigger: target,
            markers: false,
            scrub: 0.5,
            start: `-=700`,
            end: "bottom center",
          },
        });
      });
    };

    function newTriggers() {
      ScrollTrigger.getAll().forEach(($trigger, i) => {
        $trigger.kill();
        masks[i].remove();
      });

      runTextAppearAnimation();
    }

    window.addEventListener("resize", newTriggers);

    runTextAppearAnimation();
  }, []);

  return (
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
              <Button size="l">Let's Sync</Button>
            </section>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>

      <Grid.Container className={clsx(styles["landing-page__overflow-visible"])}>
        <section className={clsx(styles["landing-page__about"], "about-content")}>
          <div className={clsx(styles["landing-page__about--aufa-page-path-trigger"])}>
            <AufaPagePath className={clsx(styles["landing-page__about--aufa-page-path-svg"], "aufa-page-path")} />
          </div>
          <div className={styles["landing-page__about--content"]}>
            <Grid.Row>
              <Grid.Col lg={5}>
                <Typography.Headline2
                  flat
                  className={clsx(styles["landing-page__about--content-highlight"], "intro-text")}
                >
                  <span>Aufacicenta</span> Provides
                </Typography.Headline2>
                <Typography.Headline2 className={clsx("intro-text")}>Solid Web3 Experience</Typography.Headline2>
                <Typography.Headline4 className={clsx("intro-text")}>
                  Move your company towards the new internet economy with peace of mind.
                </Typography.Headline4>
                <Typography.TextLead flat className={clsx("intro-text")}>
                  Professional Smart-contract Development & Consultancy
                </Typography.TextLead>
                <Typography.Description className={clsx("intro-text")}>
                  Solidity & Rust implementations on EVM Chains, Bitcoin & Web Assembly VMs
                </Typography.Description>
                <Typography.TextLead flat className={clsx("intro-text")}>
                  dApp Development
                </Typography.TextLead>
                <Typography.Description className={clsx("intro-text")}>
                  Modern frontend interfaces with seamless connection to EVM & Web Assembly VM compatible wallets.
                </Typography.Description>
                <div className={clsx(styles["landing-page__about--content-button"], "intro-text")}>
                  <Button variant="outlined">See Our Latest Work</Button>
                </div>
              </Grid.Col>
            </Grid.Row>
            {/* <Grid.Row justify="end">
              <Grid.Col lg={6}>
                <Typography.Headline2>We Bring In The Resources</Typography.Headline2>
                <Typography.Headline4>
                  We gather the optimal people and skills to make your project succeed.
                </Typography.Headline4>
              </Grid.Col>
            </Grid.Row> */}
          </div>
        </section>
      </Grid.Container>

      <Grid.Container fluid>
        <section className={clsx(styles["landing-page__hero"])} />
      </Grid.Container>
    </div>
  );
};
