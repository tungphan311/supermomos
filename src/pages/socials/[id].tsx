import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import styles from "@/styles/Social.module.css";
import Image from "next/image";
import { SocialFields } from "@/commons/types/social";
import axios from "@/commons/utils/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { formatDate, formatTime } from "@/commons/utils";

export default function ViewSocialPage() {
  const [social, setSocial] = useState<SocialFields>();
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    const getSocialEvent = async () => {
      try {
        const res = await axios.get(`/api/social/${id}`);
        const data = res.data;
        setSocial({
          title: data.title,
          banner: data.banner,
          startAt: data.startAt,
          venue: data.venue,
          capacity: data.capacity,
          description: data.description,
          price: data.price,
          isManualApprove: data.isManualApprove,
          privacy: data.privacy,
          tags: data.tags,
          time: new Date(),
        });
      } catch (error) {
        console.log(error);
      }
    };

    getSocialEvent();
  }, [id]);

  if (!social) return null;

  const { title, banner, startAt, venue, capacity, price, description } =
    social;

  return (
    <>
      <Head>
        <title>Social Event</title>
        <meta name="description" content="A Social Event" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container style={{ color: "#333", padding: "100px 0" }}>
          <Row>
            <Col className={styles.eventWrapper} xs={12} md={6} lg={5}>
              <div style={{ width: 600 }}>
                <span className={styles.eventTitle}>{title}</span>
              </div>
              <div className="mt-4 d-flex align-items-center">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={48}
                  height={48}
                />
                <span
                  className={[styles.eventTime, styles.eventDetail].join(" ")}
                >
                  {formatDate(startAt)}
                </span>

                <Image
                  src="/assets/icons/clock.svg"
                  alt="time"
                  width={48}
                  height={48}
                  className="ms-4"
                />
                <span
                  className={[styles.eventTime, styles.eventDetail].join(" ")}
                >
                  {formatTime(startAt)}
                </span>
              </div>
              <div className="mt-3 d-flex align-items-center">
                <Image
                  src="/assets/icons/location-marker.svg"
                  alt="location"
                  width={24}
                  height={24}
                />
                <span className={styles.eventDetail}>{venue}</span>
              </div>
              <div className="d-flex align-items-center">
                <Image
                  src="/assets/icons/user-group.svg"
                  alt="people"
                  width={24}
                  height={24}
                />
                <span className={styles.eventDetail}>
                  {capacity} {capacity > 1 ? "people" : "person"}
                </span>

                <Image
                  src="/assets/icons/currency-dollar.svg"
                  alt="price"
                  width={24}
                  height={24}
                  className="ms-4"
                />
                <span className={styles.eventDetail}>${price}</span>
              </div>
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

          <Col xs={12} md={6} className="mt-4">
            <p className={styles.description}>{description}</p>
          </Col>
        </Container>
      </main>
    </>
  );
}

// TODO: should implement getStaticPaths and getStaticProps to pre-render all social event page
// export async function getStaticPaths() {
//   const ids: string[] = await getAllIds();
//   const paths: string[] = [];
//   ids.forEach((id) => {
//     paths.push(`/gunluk/${id}`);
//   });
//   return {
//     paths,
//     fallback: false, // can also be true or 'blocking'
//   };
// }

// export async function getStaticProps({ params }: any) {
//   const { slug } = params;
//   const res = await axios.get(`/api/social/${slug}`);

//   return {
//     props: {
//       ...res.data,
//     },
//   };
// }
