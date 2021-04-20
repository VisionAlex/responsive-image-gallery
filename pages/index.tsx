import Head from "next/head";
import styled from "styled-components";
import { getPhotos } from "../lib/api";
import { GetServerSideProps } from "next";
import { PexelPhoto } from "../next-env";
import { useState } from "react";

const Title = styled.h1`
  text-align: center;
`;

const ImgList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  @media (max-aspect-ratio: 1/1) and (max-width: 480px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.li`
  height: 40vh;
  flex-grow: 1;
  @media (max-aspect-ratio: 1/1) {
    height: 30vh;
  }

  @media (max-height: 480px) {
    height: 80vh;
  }
  @media (max-aspect-ratio: 1/1) and (max-width: 480px) {
    height: auto;
    width: 100%;
  }
`;

const ImageItem = styled.img`
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;

  @media (max-aspect-ratio: 1/1) and (max-width: 480px) {
    width: 100%;
    max-height: 75vh;
    min-width: 0;
  }
`;

export default function Home({ data }: { data: PexelPhoto[] }) {
  const [photos, setPhotos] = useState(data);
  return (
    <>
      <Head>
        <title>Photo Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>Photo Gallery</Title>
        <section>
          <ImgList>
            {photos.map((photo) => (
              <ImageContainer>
                <ImageItem src={photo.src.medium} alt={photo.url} />
              </ImageContainer>
            ))}
            <ImageContainer style={{ flexGrow: 10 }}></ImageContainer>
          </ImgList>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data: PexelPhoto[] = await getPhotos();
  return {
    props: {
      data,
    },
  };
};
