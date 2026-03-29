import { useContext } from "react";
import { useFormik } from "formik";
import { PostContext } from "../../context/PostContext";
import Button from "../Button/Button";

const PostForm = () => {
  const { createPost } = useContext(PostContext);

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: (values, { resetForm }) => {
      const clearPostText = values.text.trim();

      if (clearPostText.length === 0) {
        return;
      }

      createPost(clearPostText);
      resetForm(); 
    },
  });

  const isPostTextEmpty = formik.values.text.trim().length === 0;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-gray-900 p-5 mt-4 rounded-xl border border-gray-800"
    >
      <textarea
        name="text"
        className="w-full bg-transparent min-h-[50px] text-white placeholder-gray-500 outline-none p-2 focus:ring-2 focus:ring-blue-500"
        placeholder="Что у вас нового?"
        value={formik.values.text}
        onChange={formik.handleChange}
      />

      <div className="flex justify-end mt-2 border-t border-gray-800 pt-2">
        <Button isDisabled={isPostTextEmpty}>Опубликовать</Button>
      </div>
    </form>
  );
};

export default PostForm;