import { Head } from "next/document";
import React, { FC, PropsWithChildren } from "react";

type TLayoutProps = {
  title: string;
  keywords: string;
  description: string;
  children: typeof React.Children;
};

const Layout: FC<PropsWithChildren<TLayoutProps>> = ({
  title,
  keywords,
  description,
  children,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};
Layout.defaultProps = {
  title: "Lorem ipsum dolor sit.",
  keywords: "Lorem ipsum dolor sit.",
  description: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
};
export default Layout;
