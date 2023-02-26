import { Flex, Heading, Tag, TagLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RestaurantCard from "../components/Restaurant2";
import { useAuth } from "../context/AuthContext";

export default function Favourites() {
  const user = useAuth().user;

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/list/favourites", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "Session Token DO-NOT-SHARE"
          )}`,
        },
      });
      const data = await response.json();
      setRestaurants(data);
    })();
  }, [user]);

  return (
    <Flex flexDir="column" w="100%" minH="80vmin" mt="-1.2rem" flexWrap="wrap">
      <Heading size="lg" m="1.2rem" mt="2rem">
        {user === null ? <></> : user.username + "'s" + " "}
        Favourites
      </Heading>

      {restaurants.success === false ? (
        <Tag
          size="md"
          variant="subtle"
          borderRadius=".8rem"
          padding="1.2rem"
          h="max-content"
          w="100%-1.6rem"
          m=".8rem"
          pos="relative"
          left="0"
          right="0"
          bottom="0"
        >
          <TagLabel>Feature only available for logged in Users.</TagLabel>
        </Tag>
      ) : (
        <Flex
          flexDir="row"
          flexWrap="wrap"
          w="100%"
          justifyContent="space-around"
        >
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.name}
              restaurant={restaurant}
              t="F"
            />
          ))}
        </Flex>
      )}

      {restaurants.length === 0 ? (
        <>
          <Tag
            size="md"
            variant="subtle"
            borderRadius=".8rem"
            padding="1.2rem"
            h="max-content"
            w="100%-1.6rem"
            m=".8rem"
            pos="relative"
            left="0"
            right="0"
            bottom="0"
          >
            <TagLabel>No Restaurants in List</TagLabel>
          </Tag>
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
}
