import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  CloseButton,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Skeleton,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  Tooltip,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  IoMdArrowRoundBack,
  IoMdBookmark,
  IoMdCreate,
  IoMdHeart,
} from "react-icons/io";
import { BiCollapse, BiExpand } from "react-icons/bi";
import { MdUpdate, MdTrendingUp } from "react-icons/md";
import { GiRoundStar } from "react-icons/gi";
import { Link } from "react-router-dom";
import placeholder from "../assets/images/placeholder.png";
import Rating from "../components/Rating";
import ReviewPrompt from "../components/Review";
import EditReview from "../components/EditReview";
import ReviewProfile from "../components/ReviewProfile";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { motion } from "framer-motion";

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState(null);
  const [review, setReview] = useState(null);
  const [branches, setBranches] = useState(null);
  const [upvotes, setUpvotes] = useState(new Map());
  const idRestaurant = window.location.pathname.split("/")[2];

  const [image, setImage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(0);

  const [hasReview, setHasReview] = useState(false);
  const [alert, setAlert] = useState("");

  const [exist, setExist] = useState(true);
  const [ratio, setRatio] = useState(0);
  const [percent, setPercent] = useState(0);

  const [reviewFilter, setReviewFilter] = useState([1, 2, 3, 4, 5]);
  const [reviewSort, setReviewSort] = useState("Latest");

  const [expOrCol, setExpOrCol] = useState("E");
  const color = useColorModeValue("white", "black");

  if (idRestaurant === undefined) {
    fetch("/api/restaurant")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const random = Math.floor(Math.random() * data.length);
        window.location.href = window.location.href + `/${random + 1}`;
      });

    return (
      <Flex
        height="80vh"
        justifyContent="center"
        alignItems="center"
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <CircularProgress
          isIndeterminate
          color="brand.300"
          size="60px"
          thickness="8px"
        />
      </Flex>
    );
  }

  useEffect(() => {
    fetch("/api/restaurant/" + idRestaurant)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.restaurant[0].name === null) {
          setExist(false);
          return;
        }

        setImage(data.restaurant[0].images.split(","));

        setRestaurant(data.restaurant[0]);

        setCategories(data.categories);

        setBranches(data.branches);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/review/edit/" + idRestaurant, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
        },
      });
      const data = await response.json();

      if (data.some((item) => item.restaurants === restaurant.name)) {
        setHasReview(true);
      }
    };
    fetchData();
  }, [review]);

  const expandReviewBox = (expOrCol) => {
    const reviewBox = document.getElementById("reviewBox");

    if (expOrCol === "E") {
      reviewBox.style.cssText = `max-height: 100%; width: 100%; margin: 0; position: fixed; top: 0; left: 0; z-index: 1000; border-radius: 0; background-color: ${color};`;
      setExpOrCol("C");
    } else {
      reviewBox.style.cssText =
        "max-height: 40rem; width: 98%; margin: 2rem 0;";
      setExpOrCol("E");
    }
  };

  const addUpvote = (idRestaurant, idAccount, vote) => {
    fetch("/api/upvote/edit/" + idRestaurant, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
      },
      body: JSON.stringify({
        idAccount: idAccount,
        vote: vote,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAlert(data.message);

        setTimeout(() => {
          setAlert("");
        }, 2000);

        fetch("/api/upvote/" + idRestaurant)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setUpvotes(new Map());

            for (const item of data) {
              setUpvotes((prevUpvotes) => {
                return new Map([...prevUpvotes, [item.idAccount, item.ratio]]);
              });
            }
          });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const revRes = await fetch("/api/review/" + idRestaurant);
      const revData = await revRes.json();
      await setReview(revData);
      calcStats(revData);

      const upvRes = await fetch("/api/upvote/" + idRestaurant);
      const upvData = await upvRes.json();
      await setUpvotes(new Map());

      for (const item of upvData) {
        setUpvotes((prevUpvotes) => {
          return new Map([...prevUpvotes, [item.idAccount, item.ratio]]);
        });
      }
    };

    fetchData();
  }, [restaurant]);

  const calcStats = (review) => {
    (review.length > 0)
    ? (setPercent(
        Math.round(
          (review.filter((review) => review.rating > 2).length /
            review.length) *
            100
        )
      ),
      setRatio(
        (
          review.reduce(
            (total, review) => (total += parseInt(review.rating)),
            0
          ) / review.length
        ).toFixed(2)
      ))
    : (setPercent("?"), setRatio("?"));
  };

  const addToList = (type) => {
    if (!localStorage.getItem("Session Token DO-NOT-SHARE")) {
      setAlert("Login to use this feature.");

      setTimeout(() => {
        setAlert("");
      }, 1500);

      return;
    }

    fetch("/api/list/" + type, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
      },
      body: JSON.stringify({
        idRestaurant: idRestaurant,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.code === "ER_DUP_ENTRY") {
          fetch("/api/list/" + type, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
            },
            body: JSON.stringify({
              idRestaurant: idRestaurant,
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              setAlert(result.message);

              setTimeout(() => {
                setAlert("");
              }, 1500);
            });
        } else {
          setAlert(result.message);

          setTimeout(() => {
            setAlert("");
          }, 1500);
        }
      });
  };

  const [i, setI] = useState(0);

  const nextImage = () => {
    if (i < image.length - 1) {
      setI(i + 1);
    } else {
      setI(0);
    }
  };

  return (
    <Box margin="1.2rem 1rem">
      <Tooltip label="Go back" aria-label="Go back" placement="left">
        <Button
          as={Link}
          to="/"
          variant="outline"
          borderWidth="0.15rem"
          position="fixed"
          zIndex="99"
          top="8rem"
          right="1rem"
          colorScheme="brand"
          backgroundColor={useColorModeValue("white", "gray.800")}
          size="sm"
        >
          <IoMdArrowRoundBack size="20px" />
        </Button>
      </Tooltip>

      {restaurant ? (
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          margin="1rem 0"
        >
          <Flex
            h="24rem"
            w="100%"
            align="center"
            justify="center"
            onClick={nextImage}
            cursor="pointer"
          >
            <motion.div
              layoutId={idRestaurant}
              variants={{
                initial: {
                  scale: 1.2,
                  transformOrigin: "center",
                },
                shrink: {
                  scale: 1,
                  transition: {
                    delay: 0.4,
                  },
                },
              }}
              initial="initial"
              animate="shrink"
              exit="shrink"
            >
              <Image
                src={
                  "https://res.cloudinary.com/dtb3ihqfr/image/upload/v1671884469/Foodie/images/restaurants/banners/" +
                  image[i] +
                  ".jpg"
                }
                fallbackSrc={placeholder}
                alt={restaurant.name}
                bgColor={useColorModeValue("brand.50", "brand.900")}
                w="100%"
                maxHeight="24rem"
                borderRadius="0.8rem"
                objectFit="scale-down"
                mb=".2rem"
              />
            </motion.div>
          </Flex>

          <Tag
            pos="absolute"
            top="60vmin"
            right="1.8rem"
            tabIndex={0}
            onKeyDown={nextImage}
            aria-label="Next image"
          >
            {i + 1} / {image.length}
          </Tag>

          <Heading size="xl" margin=".8rem 0">
            {restaurant.name}
          </Heading>

          <Box size="md" margin="0">
            Published on {restaurant.date}
          </Box>

          <Flex gap="1.2vmin" justifyContent="center" w="98%" flexWrap="wrap">
            <Flex
              flexDir="column"
              margin="2rem 0"
              gap="1rem"
              w="calc(80% + 1rem)"
              minH="8rem"
              borderWidth="0.2rem"
              borderColor={useColorModeValue("brand.300", "brand.50")}
              p=".8rem"
              borderRadius=".8rem"
            >
              <Heading size="md">Description:</Heading>
              <Box>
                <em>{restaurant.description}</em>
              </Box>
            </Flex>

            <Flex
              flexDir="column"
              margin="2rem 0"
              gap="2rem"
              minWidth="calc(20% - 2rem)"
              minH="8rem"
              borderWidth="0.2rem"
              borderColor={useColorModeValue("brand.300", "brand.50")}
              p=".8rem"
              borderRadius=".8rem"
            >
              <Heading size="md">Save this Restaurant:</Heading>
              <Flex gap=".8rem" justify="center" flexWrap="wrap">
                <Tooltip
                  label="Favourite"
                  aria-label="Save to Favourites"
                  placement="bottom"
                >
                  <Button
                    onClick={() => addToList("favourites")}
                    colorScheme="purple"
                    variant="solid"
                    size="sm"
                  >
                    <IoMdHeart size="20px" />
                  </Button>
                </Tooltip>

                <Tooltip
                  label="Bookmark"
                  aria-label="Save to Bookmarks"
                  placement="bottom"
                >
                  <Button
                    onClick={() => addToList("bookmarks")}
                    colorScheme="cyan"
                    variant="solid"
                    size="sm"
                  >
                    <IoMdBookmark
                      size="20px"
                      color={useColorModeValue("white")}
                    />
                  </Button>
                </Tooltip>
              </Flex>
            </Flex>

            <Flex
              flexDir="column"
              margin="2rem 0"
              gap="1rem"
              width="100%"
              minH="8rem"
              borderWidth="0.2rem"
              borderColor={useColorModeValue("brand.300", "brand.50")}
              p=".8rem"
              borderRadius=".8rem"
              tabIndex={0}
              _focus={{
                boxShadow: "0 0 0 4px #1E90FF",
              }}
            >
              <Heading size="md">Categories:</Heading>
              <Flex gap=".8rem" justifyContent="center" flexWrap="wrap">
                {categories ? (
                  categories.map((category) => {
                    return (
                      <Flex
                        as={Tag}
                        key={category.category}
                        category={category}
                        colorScheme="purple"
                        m="0.8rem 0"
                        justifyContent="center"
                        p=".6rem"
                        borderRadius="full"
                      >
                        {category.category}
                      </Flex>
                    );
                  })
                ) : (
                  <></>
                )}
              </Flex>
            </Flex>

            <Alert
              status="success"
              variant="solid"
              pos="fixed"
              hidden={alert ? false : true}
              className="added"
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
              <AlertTitle>{alert}</AlertTitle>
              <CloseButton onClick={() => setAlert("")} />
            </Alert>
          </Flex>

          <Flex
            id="reviewBox"
            flexDir="column"
            margin="2rem 0"
            gap=".6rem"
            w="98%"
            maxH="40rem"
            borderWidth="0.2rem"
            borderColor={useColorModeValue("brand.300", "brand.50")}
            p=".8rem"
            borderRadius=".8rem"
          >
            <Flex w="100%" flexDir="row" justifyContent="space-between">
              <Heading size="md" as="u" textUnderlineOffset="0.2rem">
                Reviews
              </Heading>
              <Tooltip
                label={expOrCol === "C" ? "Collapse" : "Expand"}
                aria-label="Expand Reviews"
                placement="left"
              >
                <Button
                  p="0"
                  colorScheme="purple"
                  variant={expOrCol === "C" ? "solid" : "outline"}
                  onClick={() => expandReviewBox(expOrCol)}
                >
                  <Icon
                    boxSize={expOrCol === "C" ? "1.35rem" : "1.25rem"}
                    as={expOrCol === "C" ? BiCollapse : BiExpand}
                  />
                </Button>
              </Tooltip>
            </Flex>

            {review ? (
              <Flex
                w="100%"
                flexDir="row"
                align="center"
                justifyContent="space-around"
                flexWrap="wrap"
                gap="1rem"
              >
                <Flex align="center" flexDir="row">
                  <CircularProgress
                    value={ratio * 20}
                    color={"orange"}
                    size="4rem"
                  >
                    <CircularProgressLabel>
                      <Text as="b">{ratio}</Text>
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Flex flexDir="row" mt="1.2rem">
                    <Text>/5</Text>
                    <Icon as={GiRoundStar} mt=".26rem" color="orange" />
                  </Flex>
                </Flex>
                <Flex
                  align="center"
                  flexDir="column"
                  display={percent === "?" ? "none" : "flex"}
                >
                  <CircularProgress
                    value={percent ? percent : review.length * 10}
                    color={percent ? "green.400" : "red.400"}
                  >
                    <CircularProgressLabel>
                      {percent ? <>{percent}% </> : review.length}
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Text fontSize="sm" color="gray.500" m="0.2rem">
                    {percent ? (
                      <>of {review.length} reviews are positive</>
                    ) : (
                      <>
                        <b>Negative</b> reviews
                      </>
                    )}
                  </Text>
                </Flex>
                <Flex gap=".8rem" justifyContent="center" flexWrap="wrap">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Tag
                      as={Button}
                      key={rating}
                      variant={
                        reviewFilter.includes(rating) ? "solid" : "outline"
                      }
                      colorScheme="orange"
                      onClick={() => {
                        if (reviewFilter.length === 5) {
                          setReviewFilter([rating]);
                        } else if (reviewFilter.includes(rating)) {
                          setReviewFilter(
                            reviewFilter.filter((item) => item !== rating)
                          );
                        } else {
                          setReviewFilter([...reviewFilter, rating]);
                        }
                      }}
                    >
                      <TagLabel>{rating}</TagLabel>
                      <TagRightIcon as={GiRoundStar} />
                    </Tag>
                  ))}
                </Flex>
                <Flex gap="1rem" justifyContent="center" flexWrap="wrap">
                  {[
                    ["Latest", MdUpdate],
                    ["Popular", MdTrendingUp],
                  ].map((sortBy) => (
                    <Button
                      as={Tag}
                      key={sortBy[0]}
                      variant={reviewSort == sortBy[0] ? "solid" : "outline"}
                      colorScheme="teal"
                      onClick={() => setReviewSort(sortBy[0])}
                    >
                      <TagLabel>{sortBy[0]}</TagLabel>
                      <TagRightIcon as={sortBy[1]} />
                    </Button>
                  ))}
                </Flex>
              </Flex>
            ) : (
              <></>
            )}

            <Tooltip
              label={
                localStorage.getItem("Session Token DO-NOT-SHARE")
                  ? ""
                  : "Login to write a Review"
              }
              aria-label="Write a review"
              placement="top"
            >
              <Button
                p="10px"
                colorScheme="purple"
                borderLeftWidth={10}
                borderRightWidth={10}
                borderColor={useColorModeValue("brand.300", "brand.50")}
                isDisabled={
                  localStorage.getItem("Session Token DO-NOT-SHARE")
                    ? false
                    : true
                }
                onClick={
                  hasReview === true
                    ? () => setIsEditModalOpen(true)
                    : () => setIsModalOpen(true)
                }
                gap=".8rem"
              >
                {hasReview === true ? <p>Edit Review</p> : <p>Write Review</p>}

                <Icon as={IoMdCreate} size="20px" />
              </Button>
            </Tooltip>

            <ReviewPrompt
              restaurant={restaurant.name}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            <EditReview
              restaurant={restaurant.name}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            />
            <ReviewProfile
              isOpen={profileModalOpen}
              onClose={() => setProfileModalOpen("")}
            />

            <Flex
              gap=".8rem"
              justifyContent="center"
              flexWrap="wrap"
              bg
              overflowY="scroll"
              overflowX="scroll"
              css={{
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": {
                  width: "0.6rem",
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: useColorModeValue(
                    "rgba(0,0,0,0.2)",
                    "rgba(255,255,255,0.2)"
                  ),
                  borderRadius: "0.6rem",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: useColorModeValue(
                    "rgba(0,0,0,0.3)",
                    "rgba(255,255,255,0.3)"
                  ),
                },
              }}
            >
              {review ? (
                review
                  .filter((review) =>
                    reviewFilter.some((rating) => review.rating == rating)
                  )
                  .sort((a, b) => {
                    if (reviewSort !== "Latest") {
                      return (
                        (upvotes.get(b.idAccount) || 0) -
                        (upvotes.get(a.idAccount) || 0)
                      );
                    }
                  })
                  .map((review, cIndex) => {
                    const username = review.username;

                    return (
                      <Flex
                        w="98%"
                        bgColor="brand.50"
                        key={cIndex}
                        review={review}
                        flexDir="row"
                        color="black"
                        m="0.8rem 0.2rem"
                        justifyContent="center"
                        p=".8rem"
                        borderRadius="1.2rem"
                      >
                        <Button
                          m="0"
                          p="0"
                          variant="primary"
                          onClick={() => setProfileModalOpen(username)}
                        >
                          <Avatar
                            name={review.username.replace(
                              review.username[review.username.length - 2],
                              " "
                            )}
                            size="md"
                          />
                        </Button>

                        <Flex w="100%" flexDir="column" color="black">
                          <Box fontWeight="bold" fontSize="1.2rem" ml="1.8vmin">
                            {review.username}
                          </Box>

                          <Box w="calc(6rem + 10vmin)">
                            <Rating rating={review.rating} />
                          </Box>

                          <Box fontSize="1.2rem" ml="2vmin">
                            {review.review}
                          </Box>

                          <Flex gap="0.8rem" ml="1.8vmin">
                            <>Posted on: </>
                            {review.date.slice(0, 10)}
                            {review.edited == "T" ? <i>Edited</i> : ""}
                          </Flex>
                        </Flex>

                        <Flex
                          flexDir="column"
                          justifyContent="space-around"
                          alignItems="center"
                          ml="1.8vmin"
                        >
                          <IconButton
                            aria-label="Upvote"
                            icon={<ImArrowUp />}
                            onClick={() =>
                              addUpvote(
                                review.idRestaurant,
                                review.idAccount,
                                "L"
                              )
                            }
                          />
                          <Flex>{upvotes.get(review.idAccount)}</Flex>
                          <IconButton
                            aria-label="Downvote"
                            icon={<ImArrowDown />}
                            onClick={() =>
                              addUpvote(
                                review.idRestaurant,
                                review.idAccount,
                                "D"
                              )
                            }
                          />
                        </Flex>
                      </Flex>
                    );
                  })
              ) : (
                <></>
              )}
            </Flex>
          </Flex>

          {branches.length !== 0 ? (
            <Flex
              flexDir="column"
              margin="2rem 0"
              gap="1rem"
              w="98%"
              borderWidth="0.2rem"
              borderColor={useColorModeValue("brand.300", "brand.50")}
              p=".8rem"
              borderRadius=".8rem"
            >
              <Heading size="md">Branches:</Heading>
              <Flex ml="1.2rem" gap="2.4rem" flexWrap="wrap" color="black">
                {branches ? (
                  branches.map((branch, index) => {
                    return (
                      <Flex
                        alignItems="center"
                        key={index}
                        branch={branch}
                        m="0.8rem 0"
                        p=".6rem"
                        borderRadius=".8rem"
                        bgColor="brand.50"
                        flexDir="column"
                        overflowX="scroll"
                        css={{
                          // hide scrollbar
                          "&::-webkit-scrollbar": {
                            width: "0",
                          },
                        }}
                        tabIndex="0"
                      >
                        <b>
                          <Text as="u">{branch.branch}</Text>
                        </b>
                        <br />
                        {branch.titles &&
                          branch.contents &&
                          branch.titles.split(",").map((title, index) => {
                            return (
                              <Flex
                                key={index}
                                flexDir="row"
                                gap="0.8rem"
                                justifyContent="space-between"
                                w="100%"
                              >
                                <Text as="kbd">{title}:</Text>
                                <Text>{branch.contents.split(",")[index]}</Text>
                              </Flex>
                            );
                          })}
                      </Flex>
                    );
                  })
                ) : (
                  <></>
                )}
              </Flex>
            </Flex>
          ) : (
            <></>
          )}

          {restaurant.menu ? (
            <>
              <Heading size="md" mb="0.8rem" textDecor="underline">
                Menu
              </Heading>

              <Tooltip label="Click to enlarge" placement="top">
                <ChakraLink
                  w="100%"
                  h="auto"
                  borderRadius=".8rem"
                  href={
                    "https://res.cloudinary.com/dtb3ihqfr/image/upload/v1671884469/Foodie/images/restaurants/menu/" +
                    restaurant.menu +
                    ".jpg"
                  }
                  isExternal
                >
                  <Image
                    src={
                      "https://res.cloudinary.com/dtb3ihqfr/image/upload/v1671884469/Foodie/images/restaurants/menu/" +
                      restaurant.menu +
                      ".jpg"
                    }
                    w="100%"
                    h="max-content"
                    borderRadius=".8rem"
                    fallbackSrc={placeholder}
                    alt={restaurant.menu}
                    bgColor="grey"
                    objectFit="scale-up"
                    cursor="pointer"
                    title="Click to enlarge"
                  />
                </ChakraLink>
              </Tooltip>
            </>
          ) : (
            // return nothing if no menu
            <></>
          )}
        </Flex>
      ) : (
        <>
          {exist ? (
            <Skeleton height="24rem" />
          ) : (
            <Flex
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              h="100%"
            >
              Restaurant not found.
            </Flex>
          )}
        </>
      )}
    </Box>
  );
}
