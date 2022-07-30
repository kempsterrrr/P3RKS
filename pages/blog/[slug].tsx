import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SyntaxHighlighter from "react-syntax-highlighter";

interface PostProps {
  frontMatter: {
    title: string;
  };
  mdxSource: MDXRemoteSerializeResult;
}

const Post: React.FC<PostProps> = ({ frontMatter: { title }, mdxSource }) => {
  return (
    <div className="mt-5 max-w-[1400px] w-[100%]">
      <h1>{title}</h1>
      <MDXRemote {...mdxSource} components={{ SyntaxHighlighter }} />
    </div>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }: any) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".mdx"),
    "utf-8"
  );
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);
  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};
