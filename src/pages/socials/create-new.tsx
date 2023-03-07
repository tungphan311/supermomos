import { BANNERS } from "@/commons/constants/banners";
import CreateForm from "@/modules/socials/components/CraeteForm";
import { Container } from "react-bootstrap";

type CreateNewSocialPageProps = {
  banners: string[];
};

export default function CreateNewSocialPage({
  banners,
}: CreateNewSocialPageProps) {
  return (
    <Container>
      <CreateForm banners={banners} />
    </Container>
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
