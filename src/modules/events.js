import { UIelement } from "./ui.js";
import { render } from "./render.js";
import { postService } from "./service.js";

export const events = () => {
  const {
    formEl,
    newFormPostIdEl,
    newFormPostTitleEl,
    newFormPostDescriptionEl,
    postListEl,
  } = UIelement;
  const { renderNewPost } = render();
  const { createPostService, updatePostService, deletePostService } =
    postService();

  const deletePost = () => {
    postListEl.addEventListener("click", async (e) => {
      e.preventDefault();
      if (e.target.classList.contains("delete-post")) {
        const id = e.target.dataset.id;
        const status = await deletePostService(id);
        if (status) {
          e.target.closest(".post-list-item").remove();
        }
      }
    });
  };

  const submit = () => {
    formEl.addEventListener("submit", async (event) => {
      event.preventDefault();

      const postId = newFormPostIdEl.value;
      const postTitle = newFormPostTitleEl.value;
      const postBody = newFormPostDescriptionEl.value;

      if (postId) {
        const { id, title, body } = await updatePostService({
          id: postId,
          title: postTitle,
          body: postBody,
        });

        renderNewPost({ id, title, body });
      } else {
        const { id, title, body } = await createPostService({
          title: postTitle,
          body: postBody,
        });
        renderNewPost({ id, title, body });
      }
    });
  };

  return {
    submit,
    deletePost,
  };
};
