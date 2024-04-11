"use client";
import React, { useState } from "react";
import { Button, Modal, Box, Typography, Stack } from "@mui/material";

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 16,
    p: 4,
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box justifyContent={"center"} alignItems={"center"} sx={style}>
          <Typography
            id="modal-modal-title"
            textAlign={"center"}
            variant="h6"
            component="h2"
          >
            Please select your type of post
          </Typography>
          <Stack flexDirection={"row"} gap={3}>
            <Box
              width={"150px"}
              height={"100px"}
              border={"1px solid green"}
              id="modal-modal-description"
              textAlign={"center"}
              sx={{ mt: 2 }}
            >
              Strength
            </Box>
            <Box
              width={"150px"}
              height={"100px"}
              border={"1px solid green"}
              textAlign={"center"}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              Cardio
            </Box>
            <Box
              width={"150px"}
              height={"100px"}
              border={"1px solid green"}
              textAlign={"center"}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              Yoga
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePost;
