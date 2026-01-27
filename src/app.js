import { UIelement } from "./modules/ui.js";
import { useRender } from "./modules/render.js";
import { useService } from "./modules/service.js";

export const myApp = () => {
  const {
    postListEl,
    formEl,
    newFormPostIdEl,
    newFormPostTitleEl,
    newFormPostDescriptionEl,
  } = UIelement;

  const { createPostService, updatePostService, listPostsService } =
    useService();
  const { renderNewPost, renderPostList } = useRender();

  // to events
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

  const doRenderPostList = async () => {
    const list = await listPostsService();
    await renderPostList(list, postListEl);
  };

  const init = () => {
    submit();
    doRenderPostList();
  };

  return {
    init,
  };
};
