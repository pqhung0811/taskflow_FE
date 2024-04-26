import React from "react";
import Loading from "./Loading";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
} from "mdbreact";
import Wrapper from "../assets/wrappers/TeamMember";
import { BsPerson } from "react-icons/bs";
import UserAvatar from "./UserAvatar";

export default function TeamMember({ member }) {
  //console.log(member);

  function getInitials(fullName) {
    return fullName.substring(0, 1);
  }

  return (
    <Wrapper>
      <div className="team-member">
        {/*<div className="initial">{getInitials(member.name)}</div>*/}
        <UserAvatar id={member.id} name={member.name} />

        <div className="team-member-info">
          <h3>{member.name}</h3>
          <p>{member.email}</p>
        </div>
      </div>
    </Wrapper>
  );
}
