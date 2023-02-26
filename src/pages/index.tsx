import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import MainLayout from '../components/layouts/main-layout';
import {
  Heading,
  HeadingSize,
  Stack,
  StackDirection,
  StackSpacing,
} from '@smartive-education/design-system-component-library-team-ost';
import Head from 'next/head';
import { MumbleCard, MumbleCardVariant } from '../components/cards/mumble-card';
import { MumbleType } from '../types/mumble';
import { WriteCard, WriteCardVariant } from '../components/cards/write-card';
import { fetchMumbles } from '../helpers/qwacker-api/mumble-api-functions';
import { fetchUsers } from '../helpers/qwacker-api/user-api-functions';
import { getToken } from 'next-auth/jwt';

type PageProps = {
  count: number;
  mumbles: MumbleType[];
};

export default function PageHome({
  count: count,
  mumbles: initialMumbles,
}: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  // const [mumbles, setMumbles] = useState(initialMumbles);
  const mumbles = initialMumbles;

  return (
    <MainLayout>
      <>
        <Head>
          <title>Mumble Home</title>
        </Head>
        <div className="text-violet-600 pt-l">
          <Heading headingLevel={HeadingSize.h1}>Willkommen auf Mumble {count}</Heading>
        </div>
        <div className="text-slate-500 pt-xs pb-l">
          <Heading headingLevel={HeadingSize.h4}>
            Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel repellat dicta.
          </Heading>
        </div>
        <Stack direction={StackDirection.col} spacing={StackSpacing.s} withDivider={true}>
          <>
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <WriteCard variant={WriteCardVariant.main} handleChange={() => {}} handleSubmit={() => {}} />
            {mumbles.map((mumble) => (
              <MumbleCard key={mumble.id} variant={MumbleCardVariant.timeline} mumble={mumble} />
            ))}
          </>
        </Stack>
      </>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // eslint-disable-next-line  @typescript-eslint/no-var-requires
  const session = await getToken({ req });
  const { count, mumbles } = await fetchMumbles();
  const { users } = await fetchUsers({ accessToken: session?.accessToken as string });
  //TODO -> find/map Userdata as creator

  console.log(users);

  return {
    props: {
      count,
      mumbles,
    },
  };
};
