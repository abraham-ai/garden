import React, { useState, useEffect } from 'react'

import useWindowDimensions from '../hooks/useWindowDimensions'

// import AppLogo from '../../components/AppLogo/AppLogo'
import Header from '../app/components/Header'

import { Typography, Button } from 'antd'
const { Title, Text } = Typography

import styles from '../styles/About.module.css'

import { FaDiscord } from 'react-icons/fa'
import { BsTwitter } from 'react-icons/bs'

export function AppLink({ title, description, icon }) {
  return (
    <>
      <div className="appLink">
        <span className="iconWrapper">{icon}</span>
        <span className="appLinkInfoWrapper">
          <Title className="title" level={3}>
            {title}
          </Title>
          <Text className="tag">{description}</Text>
        </span>
      </div>
    </>
  )
}

export function ButtonLink({
  text,
  link,
  color = 'white',
  textColor = 'white',
  type = '',
}) {
  const [windowWidth, setWindowWidth] = useState(0)
  const { width = 0 } = useWindowDimensions()

  const target = text === 'GARDEN' ? '_self' : '_blank'

  useEffect(() => {
    setWindowWidth(width)
  }, [width])

  return (
    <Button
      shape='round'
      target={target}
      href={link}
      className={
        `${windowWidth < 930}`
          ? `cta-button ${type} block`
          : `cta-button ${type}`
      }
      style={{ background: color, color: textColor }}
    >
      <Text>{text}</Text>
    </Button>
  )
}

export function TabletTitle() {
  return (
    <div className="splashTextSloganWrapper">
      <Title className="splashTextSlogan" level={2}>
        CREATE, REMIX
      </Title>

      <Title className="splashTextSlogan" level={2}>
        & SHARE
        <Text className="splashTextAccent" italic>
          AI ART{' '}
        </Text>
      </Title>
    </div>
  )
}

export function MobileTitle() {
  return (
    <div className="splashTextSloganWrapper">
      <Title className="splashTextSlogan" level={2}>
        CREATE <i>&</i> SHARE
      </Title>

      <Title className="splashTextSlogan" level={2}>
        <Text className="splashTextAccent" italic>
          AI ART{' '}
        </Text>
      </Title>
    </div>
  )
}

export default function EdenArtFrontPage() {
  const [windowWidth, setWindowWidth] = useState(0)
  const { width = 0 } = useWindowDimensions()

  useEffect(() => {
    setWindowWidth(width)
  }, [width])

  const videoURL =
    'https://eden-art.s3.amazonaws.com/eden-landing-mobile-real2real_seed_7_pass_lantent-blending.mp4'

  return (
      <div className={styles.homeWrapper}>
        <section className={styles.sectionWrapper}>
          {/* <AppLogo size="medium" logo="eden" /> */}

          <Header />

          <div className={styles.socialBtnsWrapper}>
            <a className={styles.socialBtn} href={'https://discord.gg/4dSYwDT'}>
              <FaDiscord />
            </a>
            <a
              className={styles.socialBtn}
              href={'https://twitter.com/Eden_Art_'}
              style={{ margin: '0 10px' }}
            >
              <BsTwitter />
            </a>
          </div>
        </section>

        <section className="sectionAboveTheFold">
          {windowWidth < 930 ? (
            <article className={styles.sectionWrapper, styles.videoSplash}>
              <div className={styles.edenSplashVideoOverlay} />
              <video
                className={styles.edenSplashVideoAboveTheFold}
                src={`${videoURL}`}
                preload="auto"
                muted={true}
                autoPlay={true}
                loop={true}
                // poster={`${PRD_URL}${
                //   intermediate_sha[intermediate_sha.length - 1]
                // }`}
              />
            </article>
          ) : (
            ''
          )}

          <div className={styles.sectionWrapper, styles.infoWrapper}>
            <div className={styles.sectionCenterWrapper}>
              {windowWidth < 930 ? (
                <MobileTitle />
              ) : (
                <>
                  <Title className={styles.splashTextSlogan} level={2}>
                    Create, remix, and share
                  </Title>
                  <Title
                    className={styles.splashTextSlogan}
                    level={2}
                    style={{
                      paddingBottom: 30,
                      fontStyle: 'italic',
                      color: '#8C7CF0',
                    }}
                  >
                    AI-generated art
                  </Title>
                </>
              )}

              {windowWidth < 930 ? (
                <Text className={styles.splashTextDescription}>
                  {'Eden is a community of artists, technologist and machine learners building an open-source social platform for generative AI.'}
                </Text>
              ) : (
                <>
                  <Text className={styles.splashTextDescription}>
                    {/* 'rgb(166, 166, 166)' */}
                    {'Eden is a community of artists, creative technologists, and machine learners building an open-source social platform for generative AI.'}
                  </Text>
                </>
              )}

              <article className={styles.ctaBtnsWrapper}>
                <div
                  className={styles.buttonWrapper}
                  style={{
                    display: 'flex',
                    zIndex: 50,
                    width: '100%',
                  }}
                >
                  {windowWidth < 930 ? (
                    <>
                      <ButtonLink
                        text={'GARDEN'}
                        link={'/garden'}
                        color={'#8c7cf0'}
                        textColor={'white'}
                        type="main-link"
                      />
                      <ButtonLink
                        text={'EXAMPLES'}
                        link={'https://examples.eden.art'}
                        color={'#0c163b'}
                        type="accent-link"
                      />
                    </>
                  ) : (
                    <>
                      <ButtonLink
                        text={'GARDEN'}
                        link={'/garden'}
                        textColor={'#0c163b'}
                        color={'white'}
                        type="main-link"
                      />
                      <ButtonLink
                        text={'EXAMPLES'}
                        link={'https://examples.eden.art'}
                        color={'#8C7CF0'}
                        textColor={'white'}
                      />
                    </>
                  )}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.sectionWrapper, styles.firstDescription}>
          <article className={styles.infoWrapper}>
            <div className={styles.info, styles.odd}>
              <span className={styles.descriptionWrapper}>
                <Text className={styles.description}>
                  <i>For artists</i> 
                 {' Create and share your art, get inspired by and collaborate with other artists. Own your profile and your creations.'}
                </Text>
              </span>

              <video
                className={styles.edenSplashVideo}
                preload="auto"
                muted={true}
                autoPlay={true}
                loop={true}
                src="https://eden-art.s3.amazonaws.com/eden-real2real_seed_2004_latent-blending.mp4"
              />
            </div>

            <div className={styles.info, styles.even}>
              <video
                className={styles.edenSplashVideo}
                preload="auto"
                muted={true}
                autoPlay={true}
                loop={true}
                src="https://eden-art.s3.amazonaws.com/eden-real2real_seed_2025_latent-blending.mp4"
              />

              <span className={styles.descriptionWrapper}>
                <Text className={styles.description}>
                  <i>For developers</i>
                  {'Build applications with ease, connect new techniques and models to a shared ecosystem.'}
                </Text>
              </span>
            </div>

            <div className={styles.info, styles.odd}>
              <div>
                <span className={styles.descriptionWrapper}>
                  <Text className={styles.description}>
                    <i>For collectors</i>
                    {'Discover, curate, and tell stories with your collections. Make the garden beautiful.'}
                  </Text>
                </span>
              </div>

              <video
                className={styles.edenSplashVideo}
                preload="auto"
                muted={true}
                autoPlay={true}
                loop={true}
                src="https://eden-art.s3.amazonaws.com/eden-real2real_seed_2026_latent-blending.mp4"
              />
            </div>
          </article>
        </section>

        <section className={styles.sectionWrapper, styles.visitGarden}>
          <a className={styles.ctaBtnMain, styles.mainLink} href={'/garden'}>
            <Title level={2}>{'VISIT GARDEN'}</Title>
          </a>
        </section>
      </div>
  )
}
