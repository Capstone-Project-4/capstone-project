import {
    Button,
    Card,
    FormControl,
    Grid,
    RadioGroup,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import PollModule from "./PollModule";
  import { retrieveUser } from "../auth";
  
  function PollsComponent({ handleOpenSnackbar, communityId, isCommunityHead }) {
    const [selectedValue, setSelectedValue] = useState(""); // State to store the selected value
  
    const [pollVoteEntities, setPollVoteEntities] = useState([]);
  
    useEffect(() => {
      getActivePoll();
    }, []);
  
    function getActivePoll() {
      fetch("http://localhost:5000/api/polls/active/" + communityId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + retrieveUser().jwtToken,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error("404 Error");
            } else {
              throw new Error("Network response was not ok");
            }
          }
          return response.text().then((text) => (text ? JSON.parse(text) : {}));
        })
        .then((data) => {
          console.log(data);
          if (data.pollId !== undefined) {
            data.allRequests;
            data.allRequests.forEach((request) => {
              console.log(request.user);
              setPollVoteEntities((prevItems) => {
                // Check if the email already exists in the array
                const emailExists = prevItems.some(
                  (item) => item.email === request.user.email
                );
  
                // If the email doesn't exist, add the new user
                if (!emailExists) {
                  return [
                    ...prevItems,
                    {
                      name: request.user.firstName + " " + request.user.lastName,
                      currentVotes: 0,
                      email: request.user.email,
                    },
                  ];
                }
  
                // If email exists, return the previous array unchanged
                return prevItems;
              });
            });
          }
        })
        .catch((error) => {
          if (error.message === "404 Error") {
            console.log("User Dows Not Have a Community");
          } else {
            console.error("Error during login:", error);
            handleOpenSnackbar("An error occurred. Please try again.");
          }
        });
    }
  
    const [maxVotes, setMaxVotes] = useState(0); // State variable for max votes
  
    useEffect(() => {
      // Get the max value of currentVotes from pollVoteEntities
      const max = Math.max(
        ...pollVoteEntities.map((entity) => entity.currentVotes)
      );
      setMaxVotes(max); // Save the max value in the state variable
    }, [pollVoteEntities]); // Re-run when pollVoteEntities changes
  
    const handleChange = (event) => {
      const selectedEmail = event.target.value; // Get the email of the selected entity
      const previousEmail = selectedValue; // Store the previous selected value
  
      if (selectedEmail !== previousEmail) {
        // Update the votes for the previously selected entity (decrement the vote)
        setPollVoteEntities((prevEntities) =>
          prevEntities.map((entity) =>
            entity.email === previousEmail
              ? { ...entity, currentVotes: entity.currentVotes - 1 }
              : entity
          )
        );
  
        // Update the votes for the newly selected entity (increment the vote)
        setPollVoteEntities((prevEntities) =>
          prevEntities.map((entity) =>
            entity.email === selectedEmail
              ? { ...entity, currentVotes: entity.currentVotes + 1 }
              : entity
          )
        );
      }
  
      setSelectedValue(selectedEmail); // Update selected value state
      console.log("Selected Value: ", selectedEmail); // Log the selected value
    };
  
    return (
      <Grid item xs={12} sm={6}>
        <Card
          sx={{
            backgroundColor: "#ECECEC",
            height: "300px",
            padding: 1,
            overflowY: "scroll",
          }}
        >
          <Card sx={{ padding: 2 }}>
            <Typography sx={{ marginBottom: 2 }}>
              Who should get the money?
            </Typography>
            <FormControl fullWidth>
              <RadioGroup value={selectedValue} onChange={handleChange}>
                {pollVoteEntities.map((entity) => (
                  <PollModule
                    key={entity.email}
                    email={entity.email}
                    name={entity.name}
                    totalVotes={maxVotes}
                    numberOfVotes={entity.currentVotes}
                  />
                ))}
              </RadioGroup>
              {isCommunityHead && (
                <Button variant="contained" color="error" sx={{ marginY: 2 }}>
                  End Poll
                </Button>
              )}
            </FormControl>
          </Card>
        </Card>
      </Grid>
    );
  }
  
  export default PollsComponent;
  