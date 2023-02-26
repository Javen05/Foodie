import React, { useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Modal,
  Text,
} from "@chakra-ui/react";

export default function OnBoarding() {
  const [onboardingCompleted, setOnboardingCompleted] = useState(
    localStorage.getItem("onboarding") === "completed"
  );

  if (onboardingCompleted) {
    return null;
  }

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboarding", "completed");
    location.reload();
  };

  const toggleSlide = () => {
    setSlide((slide + 1) % slides.length);
  };

  const [slide, setSlide] = useState(0);
  const slides = [
    {
      title: "Hello, Foodie!",
      text: "We notice its your first time here, would you like a tutorial?",
    },
    {
      title: "To create an Account,",
      text: "Click on the Top Right Icon which resembles an account, then click on Register.",
    },
    {
      title: "To Login,",
      text: "Once an Account is created, fill in your credentials in the login page.",
    },
    {
      title: "To edit your Account particulars,",
      text: "Click on the Account Icon once you are logged in. Then, click on Profile.",
    },
    {
      title: "To find a Restaurant,",
      text: "Type a Restaurant's name and press enter. You may choose to use the filters and sort to assist your with search.",
    },
    {
      title: "Favourites:",
      text: "Saves your desired restaurants to a list to keep track of them. (Account Required)",
    },
    {
      title: "Bookmarks:",
      text: "Saves restaurants that you are eyeing try out. After visiting the restaurant, it is removed from the list.",
    },
    {
      title: "Review and Vote:",
      text: "Every User is allowed to Review any Restaurant once. However, you are expected to follow our community guidelines. Your Reviews and Votes can be changed.",
    },
    {
      title: "Done!",
      text: "You are all set! We hope you enjoy your time here.",
    },
  ];

  return (
    <Modal isOpen={true} onClose={handleOnboardingComplete}>
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0,0,0,0.7)"
        zIndex="100"
      />

      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="white"
        color="black"
        w="50%"
        h="30%"
        minW="80vmin"
        minH="224px"
        overflow="scroll"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        borderRadius="xl"
        p="4"
        zIndex="101"
      >
        <Flex justifyContent="flex-end">
          <CloseButton onClick={handleOnboardingComplete} />
        </Flex>

        <Heading as="h2" size="lg" mb="4" position="relative">
          {slides[slide].title}
        </Heading>

        <Text>{slides[slide].text}</Text>

        <Flex position="absolute" bottom="0" right="0" p="4">
          <Button onClick={toggleSlide} colorScheme="blue">
            Next
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
}
