import type { TableOfContents } from "fumadocs-core/toc";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlocksPage } from "../../../components/blocks/blocks-page";
import { Installer } from "../../../components/installer";
import { getMDXComponents } from "../../../components/mdx";
import { PatternsPage } from "../../../components/patterns/patterns-page";
import { PoweredBy } from "../../../components/powered-by";
import { Preview } from "../../../components/preview";
import { source } from "../../../lib/source";
import HomePage from "./home";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  if (!params.slug) {
    return <HomePage />;
  }

  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;
  const type = page.data.info.path.startsWith("blocks") ? "block" : "component";
  const isBlocksPage = page.slugs[0] === "blocks";
  const isPatternsPage = page.slugs[0] === "patterns";
  const toc: TableOfContents = page.data.installer
    ? [
        { title: "Installation", url: "#installation", depth: 2 },
        ...page.data.toc,
      ]
    : page.data.toc;

  if (isPatternsPage) {
    return (
      <PatternsPage
        activePath={`/${page.slugs.join("/")}`}
        description={page.data.description}
        previewPath={page.data.installer}
        title={page.data.title}
      >
        <MDX components={getMDXComponents()} />
      </PatternsPage>
    );
  }

  if (isBlocksPage) {
    return (
      <BlocksPage
        activePath={`/${page.slugs.join("/")}`}
        description={page.data.description}
        previewPath={page.data.installer}
        title={page.data.title}
      >
        <MDX components={getMDXComponents()} />
      </BlocksPage>
    );
  }

  return (
    <DocsPage
      full={page.data.full ?? page.slugs.includes("blocks")}
      tableOfContent={{
        footer: <PoweredBy packages={page.data.dependencies} />,
        style: "clerk",
      }}
      toc={toc}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      {page.data.installer ? (
        <>
          <Preview
            layout={page.data.previewLayout}
            path={page.data.installer}
            size={page.data.previewSize}
            type={type}
          />
          <h2 id="installation">Installation</h2>
          <Installer packageName={page.data.installer} />
        </>
      ) : null}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    return {
      title: "Zeron UI",
    };
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
