import { BANNERS } from "@/commons/constants/banners";
import CreateForm from "@/modules/socials/components/CreateForm";
import Head from "next/head";
import { Container } from "react-bootstrap";

type CreateNewSocialPageProps = {
  banners: string[];
};

export default function CreateNewSocialPage({
  banners,
}: CreateNewSocialPageProps) {
  return (
    <>
      <Head>
        <title>Create new social</title>
        <meta name="description" content="Create new social page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <CreateForm banners={banners} />
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const banners = BANNERS;

  return {
    props: {
      banners,
    },
  };
}
