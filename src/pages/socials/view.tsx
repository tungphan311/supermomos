import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import styles from "@/styles/Social.module.css";
import Image from "next/image";
import { SocialFields } from "@/commons/types/social";
import axios from "@/commons/utils/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ViewSocialPage({ banner, title }: SocialFields) {
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    const getSocialEvent = async () => {
      try {
        const res = await axios.get(`/api/social/${id}`);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSocialEvent();
  }, [id]);

  return (
    <>
      <Head>
        <title>Social Event</title>
        <meta name="description" content="A Social Event" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Row style={{ flexDirection: "row-reverse", position: "relative" }}>
            <Col xs={12} md={6} lg={5} className={styles.eventWrapper}>
              <div className={styles.eventTitle}>{title}</div>
            </Col>
            <Col xs={12} md={6} lg={7}>
              <div className={styles.showBanner}>
                <Image
                  src={banner}
                  alt="selected banner"
                  fill
                  className={styles.selectedBanner}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
