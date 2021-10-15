import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { ImageLoader } from "../../../components";
import { ACCOUNT_EDIT } from "../../../constants";
import { displayDate } from "../../../helpers";
import { AppState, ProfileState } from "../../../redux";

const _UserProfile: React.FC<UserProfileProps> = (props) => {
  const profile = useSelector<AppState, ProfileState>((state) => state.profile);

  return (
    <div className="user-profile">
      <div className="user-profile-block">
        <div className="user-profile-banner">
          <div className="user-profile-banner-wrapper">
            <ImageLoader alt="Banner" className="user-profile-banner-img" src={profile.banner || ""} />
          </div>
          <div className="user-profile-avatar-wrapper">
            <ImageLoader alt="Avatar" className="user-profile-img" src={profile.avatar || ""} />
          </div>
          <button
            className="button button-small user-profile-edit"
            onClick={() => props.history.push(ACCOUNT_EDIT)}
            type="button">
            Edit Account
          </button>
        </div>
        <div className="user-profile-details">
          <h2 className="user-profile-name">{profile.fullname}</h2>
          <span>Email</span>
          <br />
          <h5>{profile.email}</h5>
          <span>Address</span>
          <br />
          {profile.address ? <h5>{profile.address}</h5> : <h5 className="text-subtle text-italic">Address not set</h5>}
          <span>Mobile</span>
          <br />
          {profile.mobile ? (
            <h5>{profile.mobile.value}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Mobile not set</h5>
          )}
          <span>Date Joined</span>
          <br />
          {profile.dateJoined ? (
            <h5>{displayDate(profile.dateJoined)}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Not available</h5>
          )}
        </div>
      </div>
    </div>
  );
};

type UserProfileProps = RouteComponentProps & {
  history: {
    push: (path: string) => void;
  };
};

export const UserAccountTab = withRouter(_UserProfile);
