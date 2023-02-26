import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  SlideFade,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsFillShareFill } from "react-icons/bs";
import placeholder from "../assets/images/placeholder.png";
import ReviewPrompt from "./ReviewOrEdit";

export default function RestaurantCard({ restaurant, t }) {
  const { idRestaurant, name } = restaurant;

  const [alert, setAlert] = useState("");
  const [reviewPrompt, setReviewPrompt] = useState("");
  const [remove, setRemove] = useState("Remove");

  const removeRestaurant = (id) => {
    if (t === "B") {
      setReviewPrompt(id);
      return;

      // t === "F":
    } else if (remove === "Remove") {
      fetch("/api/list/Favourites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
        },
        body: JSON.stringify({
          idRestaurant: id,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          setRemove("Undo");
          setAlert(result.message);
        });

    } else {
      fetch("/api/list/Favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
        },
        body: JSON.stringify({
          idRestaurant: id,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          setRemove("Remove");
          setAlert(result.message);
        });

      setTimeout(() => {
        setAlert("");
      }, 1000);
    }
  };

  return (
    <SlideFade in={true} offsetY="20px">
      <Box
        borderRadius="1.2rem"
        boxShadow={useColorModeValue(
          "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
          "0 0 1rem 0 rgba(0, 0, 0, 1)"
        )}
        margin="5vmin"
        padding="1.2rem"
        pt="0.6rem"
        _hover={{
          boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.15)",
        }}
      >
        <Heading
          fontSize="1.6rem"
          mb="0.4rem"
          maxW="13rem"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          title={name}
        >
          {name}
        </Heading>

        <Image
          src={
            "https://res.cloudinary.com/dtb3ihqfr/image/upload/v1671884469/Foodie/images/restaurants/banners/" +
            restaurant.images.split(",")[0] +
            ".jpg"
          }
          fallbackSrc={placeholder}
          alt={name}
          boxSize="calc(10rem + 8vmin)"
          objectFit="cover"
          borderRadius="0.8rem"
          marginBottom="0.6rem"
          _hover={{
            opacity: "0.9",
            boxShadow: "inset 0 0 1rem 0 rgba(0, 0, 0, 0.15)",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = `/Restaurant/${idRestaurant}`)}
        />

        <Flex justifyContent="space-between">
          <Flex justifyContent="space-between" mb=".6rem">
            Added on:
            <br />
            {restaurant.date.slice(0, 10)} at {restaurant.date.slice(11)}
          </Flex>

          <Tooltip
            label="Share"
            aria-label="Share"
            placement="bottom"
            arrowSize={10}
            hasArrow={true}
            bg="brand.100"
          >
            <Button
              variant="primary"
              colorScheme="brand"
              size="sm"
              _hover={{
                color: "brand.100",
              }}
              _active={{
                color: "brand.200",
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  window.location.href.replace("/Favourites", "") +
                    `/Restaurant/${idRestaurant}`
                );
                const alert = document.querySelector(".shareAlert");
                alert.hidden = false;

                setTimeout(() => {
                  alert.hidden = true;
                }, 1500);
              }}
            >
              <Icon as={BsFillShareFill} boxSize="20px" maxW="5rem" />
            </Button>
          </Tooltip>
        </Flex>

        <Button
          w="100%"
          colorScheme={(t === "F" && remove === "Remove") ? "pink" : "teal"}
          onClick={() => removeRestaurant(idRestaurant, name)}
        >
          {t === "F" ? remove : "Complete"}
        </Button>
      </Box>

      <Alert
        status="success"
        variant="solid"
        pos="fixed"
        hidden={true}
        className="shareAlert"
        closeOnBlur={true}
        right="0"
        bottom=".8rem"
        left="0"
        zIndex="1000"
        w="max-content"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mx="auto"
        borderRadius="0.8rem"
      >
        <AlertIcon />
        <AlertTitle>Copied to clipboard!</AlertTitle>
      </Alert>

      <Alert
        status="info"
        variant="solid"
        pos="fixed"
        hidden={alert === "" ? true : false}
        right="0"
        bottom=".8rem"
        left="0"
        zIndex="1000"
        w="max-content"
        closeOnBlur={true}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mx="auto"
        borderRadius="0.8rem"
      >
        <AlertIcon />
        <AlertTitle>{alert}</AlertTitle>
      </Alert>

      <ReviewPrompt
        isOpen={reviewPrompt}
        onClose={() => setReviewPrompt("")}
        restaurant={name}
      />
    </SlideFade>
  );
}
