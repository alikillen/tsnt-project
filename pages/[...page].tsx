import { builder, BuilderComponent } from "@builder.io/react";

builder.init("0d4841c690ec4d35a982f6795bd361ea");

const MyComponent = (props) => (
  <>
    {/* <YourHeader /> */}
    {props.content ? (
      <BuilderComponent content={props.content} model='page' />
    ) : (
      <Your404Page />
    )}
    {/* <YourFooter /> */}
  </>
);

export default MyComponent;

// Get page data
// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const GetStaticProps = async (context) => {
  const content = await builder
    .get("page", { url: context.resolvedUrl })
    .promise();

  return {
    props: { content },
    revalidate: true,
    notFound: !content,
  };
};

// List all Builder pages
// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const GetStaticPaths = async () => {
  const results = await builder.getAll("page", {
    fields: "data.url",
    key: "all-pages",
    limit: 200,
    options: {
      noTargeting: true,
    },
  });

  return {
    paths: results.map((item) => ({
      params: {
        page: item.data.url.substr(1), // Remove preceeding slash
      },
    })),
    fallback: true,
  };
};
