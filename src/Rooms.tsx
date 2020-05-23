import * as React from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { Button } from "./components/Button";
import firebase from "firebase/app";

export const Rooms: React.FC = () => {
  // read the user details from Firestore based on the current user's ID
  const userDetailsRef = useFirestore()
    .collection("rooms")
    .doc("metadata");

  const { rooms } = useFirestoreDocData(userDetailsRef);
  console.log(rooms);

  function addRoom() {
    userDetailsRef.update({
      rooms: firebase.firestore.FieldValue.arrayUnion({
        name: `wow-${Math.random()}`
      })
    });
  }

  return (
    <div>
      {rooms.map((room: any) => (
        <div>{room.name}</div>
      ))}
      <Button onClick={() => addRoom()}>Create</Button>
    </div>
  );
};
