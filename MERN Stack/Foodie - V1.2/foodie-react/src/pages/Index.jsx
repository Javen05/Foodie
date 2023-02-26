import {
  Box,
  Button,
  DarkMode,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  LightMode,
  Menu,
  MenuButton,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  Tag,
  TagLabel,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsFilter, BsSortDownAlt } from "react-icons/bs";
import { HiSearchCircle } from "react-icons/hi";
import RestaurantCard from "../components/Restaurant";
import { MdOutlineHistory, MdTrendingUp } from "react-icons/md";

export default function Main() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch("/api/restaurant")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
      });
  }, []);

  let logSearchCalled = false;

  const searchRecommendations = () => {
    const sessionToken = localStorage.getItem("Session Token DO-NOT-SHARE");

    if (search === "" && sessionToken !== null && recommendations.length === 0) {
      fetch("/api/restaurant/log", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setRecommendations(data);
        });
    } else {
      setRecommendations([]);
    }
  };

  const searchFunction = () => {
    setRecommendations([]);

    if (
      logSearchCalled === false &&
      search !== "" &&
      localStorage.getItem("Session Token DO-NOT-SHARE") !== null
    ) {
      logSearchCalled = true;
      fetch("/api/restaurant/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
        },
        body: JSON.stringify({
          search: search,
        }),
      });
    }

    fetch("/api/restaurant/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: search,
        category: category,
        sort: sort,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
        logSearchCalled = false;
      });
  };

  let ticking = false;
  const searchbar = document.querySelector(".search-bar");

  window.addEventListener("scroll", () => {
    // cooldown scroll
    if (ticking === false) {
      window.requestAnimationFrame(() => {
        ticking = true;

        setTimeout(() => {
          if (window.scrollY > 100) {
            searchbar.style.display = "none";
          } else {
            searchbar.style.display = "block";
          }

          ticking = false;
        }, 200); // cooldown time 0.2secs
      });
    }
  });

  return (
    <Box margin="1.2rem 1rem" pt="8rem">
      <form
        onSubmit={() => {
          searchFunction();
        }}
        action="javascript:void(0)"
      >
        <Flex
          w="calc(100% - 2rem)"
          mt="-7.5rem"
          zIndex="100"
          position="fixed"
          flexDir="column"
          gap=".8rem"
          className="search-bar"
        >
          <Box
            fontSize="calc(.8rem + 1.2vmin)"
            p=".2rem .8rem"
            borderRadius=".8rem"
            borderBottomRadius="0"
            w="max-content"
            bgColor={useColorModeValue("brand.100", "brand.300")}
          >
            <b>Search</b>
          </Box>

          <Flex
            flexDir="column"
            w="100%"
            bgColor={useColorModeValue("brand.100", "brand.300")}
            padding="0.6rem"
            borderRadius="0.6rem"
            borderTopLeftRadius="0"
          >
            <Flex flexDir="row" justifyContent="space-between" flexWrap="wrap">
              <InputGroup
                bgColor="brand.50"
                borderRadius="0.6rem"
                h="2rem"
                width="calc(100% - 126px)"
                minWidth="calc(80px + 20vmin)"
                mb="0.6rem"
              >
                <LightMode>
                  <Input
                    className="search-input"
                    textColor="black"
                    borderColor="brand.200"
                    focusBorderColor="brand.800"
                    type="text"
                    placeholder="Search"
                    onClick={() => {
                      searchRecommendations();
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </LightMode>

                <InputRightElement>
                  <DarkMode>
                    <IconButton
                      variant="outline"
                      onClick={() => {
                        searchFunction();
                      }}
                      type="submit"
                      icon={
                        <HiSearchCircle
                          size="40px"
                          fill="var(--chakra-colors-brand-200)"
                        />
                      }
                    />
                  </DarkMode>
                </InputRightElement>
              </InputGroup>

              <Flex flexDir="column" flexWrap="wrap">
                <Flex
                  flexWrap="wrap"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                >
                  <Menu closeOnSelect={false}>
                    <Tooltip
                      label="Filter"
                      aria-label="Filter"
                      placement="bottom"
                      bgColor={useColorModeValue("brand.500", "brand.50")}
                    >
                      <DarkMode>
                        <MenuButton
                          as={Button}
                          variant="ghost"
                          color={useColorModeValue("brand.400", "brand.100")}
                        >
                          <BsFilter size="32px" />
                        </MenuButton>
                      </DarkMode>
                    </Tooltip>

                    <MenuList
                      borderColor="brand.200"
                      bgColor={useColorModeValue("brand.50", "purple.300")}
                    >
                      <Flex alignItems="center" flexDir="column">
                        <Box mb=".4rem" textDecor="underline">
                          <b>Filter</b>
                        </Box>
                        <Input
                          type="text"
                          w="94%"
                          value={category}
                          onChange={(event) => setCategory(event.target.value)}
                          placeholder="Type a Category"
                        />
                        <Button
                          w="94%"
                          variant="outline"
                          borderWidth=".8px"
                          mt=".6rem"
                          onClick={() => searchFunction()}
                        >
                          Go
                        </Button>
                      </Flex>
                    </MenuList>
                  </Menu>

                  <Menu closeOnSelect={false}>
                    <Tooltip
                      label="Sort"
                      aria-label="Sort"
                      placement="bottom"
                      bgColor={useColorModeValue("brand.500", "brand.50")}
                    >
                      <DarkMode>
                        <MenuButton
                          as={Button}
                          variant="ghost"
                          color={useColorModeValue("brand.400", "brand.100")}
                        >
                          <BsSortDownAlt size="30px" />
                        </MenuButton>
                      </DarkMode>
                    </Tooltip>

                    <MenuList
                      minWidth="auto"
                      borderColor="brand.200"
                      overflowY="scroll"
                      maxH="24vh"
                      //customise scrollbar
                      css={{
                        "&::-webkit-scrollbar": {
                          width: "0.8em",
                        },
                        "&::-webkit-scrollbar-track": {
                          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "rgba(0,0,0,0.2)",
                          borderRadius: "0.6rem",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          backgroundColor: "rgba(0,0,0,0.3)",
                        },
                      }}
                      bgColor={useColorModeValue("brand.100", "purple.300")}
                    >
                      <Flex flexDir="column" w="8rem">
                        <RadioGroup onChange={setSort} value={sort}>
                          <Stack ml=".8rem">
                            <Radio value="RAND()"> Random </Radio>
                            <Radio value="AVG(rating) DESC"> Ratings </Radio>
                            <Radio value="restaurants.date DESC">
                              {" "}
                              Recent{" "}
                            </Radio>
                            <Radio value="name ASC"> A - Z </Radio>
                            <Radio value="COUNT(rating) DESC"> Popular </Radio>
                          </Stack>
                        </RadioGroup>
                        <Button
                          w="80%"
                          variant="outline"
                          borderWidth="2px"
                          alignSelf="center"
                          mt=".6rem"
                          onClick={() => searchFunction()}
                        >
                          Apply
                        </Button>
                      </Flex>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          {recommendations.length > 0 && (
            <>
              <Box
                position="fixed"
                zIndex="-1"
                transform="translateY(-10rem) translateX(-1rem)"
                w="100%"
                h="100%"
                bgColor={useColorModeValue("white", "gray.800")}
                opacity=".2"
                onClick={() => {
                  setRecommendations([]);
                }}
              />

              <Box
                w="100%"
                h="max-content"
                mt=".4rem"
                borderRadius=".8rem"
                bgColor={useColorModeValue("brand.50", "brand.700")}
              >
                {recommendations.map((item) => (
                  <Button
                    key={item.searchQuery}
                    onClick={() => {
                      setSearch(item.searchQuery);
                    }}
                    w="100%"
                    flexDir="row"
                    justifyContent="space-between"
                    variant="ghost"
                    _hover={{
                      bgColor: useColorModeValue("brand.100", "brand.600"),
                    }}
                  >
                    <p>{item.searchQuery}</p>
                    <Icon
                      as={item.count === null ? MdOutlineHistory : MdTrendingUp}
                    />
                  </Button>
                ))}
              </Box>
            </>
          )}
        </Flex>
      </form>

      <Flex
        flexDir="row"
        w="100%"
        minH="80vmin"
        mt="-1.2rem"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        {restaurants.length === 0 ? (
          <>
            <Tag
              size="md"
              variant="subtle"
              borderRadius=".8rem"
              padding="1.2rem"
              h="max-content"
              w="100%"
              className="noResults"
              pos="relative"
              top="1rem"
              left="0"
              right="0"
              bottom="0"
            >
              <TagLabel>No results found</TagLabel>
            </Tag>
          </>
        ) : (
          <></>
        )}
        {restaurants.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.name} restaurant={restaurant} />
          );
        })}
      </Flex>

      <Flex justifyContent="center" margin="1rem 0" pb=".2rem">
        <Heading size="md" color="theme">
          {restaurants.length} Results
        </Heading>
      </Flex>
    </Box>
  );
}
