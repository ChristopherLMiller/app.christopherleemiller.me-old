import Card from '../components/Card';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import NextSEO from 'next-seo';
import { MODELS_QUERY, ALL_MANUFACTURERS_QUERY, ALL_SCALES_QUERY } from '../utils/query';
import { PER_PAGE, SEPARATOR, SITE_TITLE } from '../config';
import { Query } from 'react-apollo';
import ModelListing from '../components/models/ModelListing';
import { StyledModelListings, StyledModelPage } from '../components/styles/Models';
import { Sidebar } from '../components/Sidebar';
import { SidebarList } from '../components/SidebarList';
import { fetchGraphQL } from '../utils/functions';
import { SFC } from 'react';

const title = 'Models';
const description = 'Whether it plane, car or tank, its all here!';

interface ModelsPageTypes {
  query: {
    page: string,
    scale: string,
    company: string,
    completed: string,
  }
}

const ModelsPage: SFC<ModelsPageTypes> = ({ query }) => {
  // set a default value for page if non provided
  const page = parseFloat(query.page) || 1;
  let completed = '';

  if (query.completed == 'yes') {
    completed = 'true';
  } else if (query.completed == 'no') {
    completed = 'false';
  }

  const manufacturers = fetchGraphQL(ALL_MANUFACTURERS_QUERY);
  console.log(completed);


  return (
    <>
      <NextSEO
        config={{
          title: `${SITE_TITLE}${SEPARATOR}${title}`,
          description,
          openGraph: {
            title: `${SITE_TITLE}${SEPARATOR}${title}`,
            description,
          },
        }}
      />
      <Header title={title} description={description} />

      <main>
        <Query query={MODELS_QUERY} variables={{
          start: page * PER_PAGE - PER_PAGE,
          limit: PER_PAGE,
          scale: query.scale,
          manufacturer: query.company,
          completed: completed,
        }}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              console.log(`Fetch Error: ${error}`);
              return (
                <Card>
                  <h3>Unable to fetch models</h3>
                  <p>{error.message}</p>
                </Card>
              );
            }

            return (
              <StyledModelPage>
                <StyledModelListings>
                  {data.models.map(model => (
                    <ModelListing key={model.id} model={model} />
                  ))}
                </StyledModelListings>
                <Sidebar title="Filters">
                  <SidebarList title="Brand" query={ALL_MANUFACTURERS_QUERY} property="company" />
                  <SidebarList title="Scale" query={ALL_SCALES_QUERY} property="scale" />
                  <SidebarList title="completed" items={[{ id: 1, slug: 'yes', title: 'Yes' }, { id: 0, slug: 'no', title: 'No' }]} />
                </Sidebar>
              </StyledModelPage>
            );
          }}
        </Query>
      </main>
      <Footer />
    </>
  );
}

export default ModelsPage;
