import React from "react";
import Head from "next/head";
import { Box, Container, Heading, Image } from "theme-ui";
import type { NextPage } from "next";
import { keyframes } from "@emotion/react";

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Has Nick Run?</title>
        <meta
          name="description"
          content="Track al my runs everyday, to make sure I stay in shape."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 20,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Heading sx={{ fontSize: 6, marginRight: "10px" }}>
            HAS NICK RUN?
          </Heading>
          <Image
            src="https://images.unsplash.com/profile-fb-1564898041-cf64f94d6bc9.jpg?auto=format&fit=crop&w=60&h=60&q=60&crop=faces&bg=fff"
            alt="Nick Mandylas"
            sx={{
              borderRadius: "50%",
              border: "3px solid #000",
              animation: `${rotation} 15s infinite linear`,
            }}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Home;
