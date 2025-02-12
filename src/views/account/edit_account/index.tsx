import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { Boundary, ImageLoader } from "../../../components";
import { useDocumentTitle, useFileHandler, useModal, useScrollTop } from "../../../hooks";
import { AppState, AuthState, Credentials, Mobile, ProfileState, setLoading, updateProfile } from "../../../redux";

import { ConfirmModal } from "./ConfirmModal";
import { EditForm } from "./EditForm";

const FormSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(4, "Full name should be at least 4 characters.")
    .max(60, "Full name should be only be 4 characters long.")
    .required("Full name is required"),
  email: Yup.string().email("Email is not valid.").required("Email is required."),
  address: Yup.string(),
  mobile: Yup.object().shape({
    country: Yup.string(),
    countryCode: Yup.string(),
    dialCode: Yup.string(),
    value: Yup.string(),
  }),
});

export type EditAccountForm = {
  fullname: string;
  email: string;
  address?: string;
  mobile?: Mobile;
};

export const EditAccount: React.FC = () => {
  useDocumentTitle("Edit Account | Salinaka");
  useScrollTop();

  const modal = useModal();
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(setLoading(false));
    },
    [dispatch]
  );

  const { profile, auth, isLoading } = useSelector<
    AppState,
    { profile: ProfileState; auth: AuthState; isLoading: boolean }
  >((state) => ({
    profile: state.profile,
    auth: state.auth,
    isLoading: state.app.loading,
  }));

  const initFormikValues: EditAccountForm = {
    fullname: profile.fullname || "",
    email: profile.email || "",
    address: profile.address || "",
    mobile: profile.mobile,
  };

  const { imageFile, isFileLoading, onFileChange } = useFileHandler({ avatar: [], banner: [] });

  const update = (form: EditAccountForm, credentials: Credentials = {}) => {
    dispatch(
      updateProfile.started({
        updates: {
          fullname: form.fullname,
          email: form.email,
          address: form.address,
          mobile: form.mobile,
          avatar: profile.avatar,
          banner: profile.banner,
        },
        files: {
          bannerFile: imageFile.banner?.[0]?.file,
          avatarFile: imageFile.avatar?.[0]?.file,
        },
        credentials,
      })
    );
  };

  const onConfirmUpdate = (form: EditAccountForm, password: string | undefined) => {
    if (password) {
      update(form, { email: form.email, password });
    }
  };

  const onSubmitUpdate = (form: EditAccountForm) => {
    // check if data has changed
    // @ts-ignore
    const fieldsChanged = Object.keys(form).some((key) => profile[key] !== form[key]);

    if (fieldsChanged || Boolean(imageFile.banner?.[0]?.file || imageFile.avatar?.[0]?.file)) {
      if (form.email !== profile.email) {
        modal.onOpenModal();
      } else {
        update(form);
      }
    }
  };

  return (
    <Boundary>
      <div className="edit-user">
        <h3 className="text-center">Edit Account Details</h3>
        <Formik
          initialValues={initFormikValues}
          validateOnChange
          validationSchema={FormSchema}
          onSubmit={onSubmitUpdate}>
          {() => (
            <>
              <div className="user-profile-banner">
                <div className="user-profile-banner-wrapper">
                  <ImageLoader
                    alt="Banner"
                    className="user-profile-banner-img"
                    src={imageFile.banner?.[0]?.url || profile.banner || ""}
                  />
                  {isFileLoading ? (
                    <div className="loading-wrapper">
                      <LoadingOutlined />
                    </div>
                  ) : (
                    <label className="edit-button edit-banner-button" htmlFor="edit-banner">
                      <input
                        accept="image/x-png,image/jpeg"
                        disabled={isLoading}
                        hidden
                        id="edit-banner"
                        onChange={(e) => onFileChange(e, { name: "banner", type: "single" })}
                        type="file"
                      />
                      <EditOutlined />
                    </label>
                  )}
                </div>
                <div className="user-profile-avatar-wrapper">
                  <ImageLoader
                    alt="Avatar"
                    className="user-profile-img"
                    src={imageFile.avatar?.[0]?.url || profile.avatar || ""}
                  />
                  {isFileLoading ? (
                    <div className="loading-wrapper">
                      <LoadingOutlined />
                    </div>
                  ) : (
                    <label className="edit-button edit-avatar-button" htmlFor="edit-avatar">
                      <input
                        accept="image/x-png,image/jpeg"
                        disabled={isLoading}
                        hidden
                        id="edit-avatar"
                        onChange={(e) => onFileChange(e, { name: "avatar", type: "single" })}
                        type="file"
                      />
                      <EditOutlined />
                    </label>
                  )}
                </div>
              </div>
              <EditForm authProvider={auth?.provider ?? "unknown"} isLoading={isLoading} />
              <ConfirmModal onConfirmUpdate={onConfirmUpdate} modal={modal} />
            </>
          )}
        </Formik>
      </div>
    </Boundary>
  );
};
