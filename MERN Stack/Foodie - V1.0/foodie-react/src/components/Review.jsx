import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  AlertIcon,
  Alert,
  FormHelperText,
} from "@chakra-ui/react";

const ReviewPrompt = ({ isOpen, onClose, restaurant }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const limit = 100;
  const [isError, setIsError] = useState(false);

  const wordCounter = (str) => {
    if (!str.trim()) return 0;
    return str.trim().split(/\s+/).length; //split whitespaces
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (wordCounter(value) > limit) {
      setIsError(true);
      return;
    }
    setComment(value);
    setIsError(false);
  };

  const idRestaurant = window.location.pathname.split("/")[2];

  const handleSubmit = () => {
    fetch("/api/review/edit/" + idRestaurant, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + sessionStorage.getItem("Session Token DO-NOT-SHARE"),
      },
      body: JSON.stringify({
        rating: rating,
        review: comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setStatus(data.status);
          setMessage(data.message);

          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 1000);
        } else {
          if (data.code === "ER_DUP_ENTRY") {
            setStatus("warning");
            setMessage("You can only review a restaurant once.");
          } else if (data.message === "Invalid token") {
            setStatus("info");
            setMessage("Login to review a restaurant.");
          } else {
            setStatus("error");
            setMessage(data.message);
          }
        }
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Review for {restaurant}</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <Input
              type="range"
              min="0"
              max="5"
              cursor="pointer"
              style={{
                background: `linear-gradient(to right, #FFC600 0%, #FFF700 ${
                  rating * 20
                }%, #ccc ${rating * 20}%)`,
              }}
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            />

            {rating > 0 && <FormLabel mt={2}>You rated: {rating}</FormLabel>}
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Comment:</FormLabel>

            <Textarea value={comment} onChange={handleChange} />

            {isError === false ? (
              <FormHelperText>
                {wordCounter(comment)} / 100 Words
              </FormHelperText>
            ) : (
              <FormHelperText color="red.500" fontWeight="bold">
                {wordCounter(comment)} / 100 Words
              </FormHelperText>
            )}
          </FormControl>
        </ModalBody>

        <Alert status={status ? status : "info"} hidden={message === ""}>
          <AlertIcon />
          {message}
        </Alert>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewPrompt;
