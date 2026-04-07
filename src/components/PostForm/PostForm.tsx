import { useContext } from "react";
import { useFormik } from "formik";
import { PostContext } from "../../context/PostContext";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import { FormContainer, StyledTextarea, Footer } from "./PostFormStyled";

const PostForm = () => {
  const { createNewPost } = useContext(PostContext);
  const { t } = useTranslation(); // Рекомендуемый способ использования i18next в компонентах

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: (values, { resetForm }) => {
      const clearPostText = values.text.trim();
      if (clearPostText.length === 0) return;

      createNewPost(clearPostText);
      resetForm();
    },
  });

  const isPostTextEmpty = formik.values.text.trim().length === 0;

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <StyledTextarea
        name="text"
        placeholder={t("postForm.InputFieldPostForm")}
        value={formik.values.text}
        onChange={formik.handleChange}
      />

      <Footer>
        <Button type="submit" isDisabled={isPostTextEmpty}>
          {t("postForm.publishButton")}
        </Button>
      </Footer>
    </FormContainer>
  );
};

export default PostForm;
