import { UIelement } from "./modules/ui.js";
import { render } from "./modules/render.js";
import { postService } from "./modules/service.js";
import { events } from "./modules/events.js";

export const myApp = () => {
  const { postListEl, postsListWithDetailsEl } = UIelement;

  const { listPostsService } = postService();
  const { renderPostList } = render();
  const { submit, deletePost } = events();

  const doRenderPostList = async () => {
    const list = await listPostsService();
    renderPostList(
      list.slice(0, 10),
      { showTitle: true, showDelete: true },
      postListEl,
    );
  };

  const doRenderPostWithDetailsList = async () => {
    const list = await listPostsService();
    renderPostList(
      list.slice(0, 5),
      { showTitle: true, showDescription: true, showId: true },
      postsListWithDetailsEl,
    );
  };

  const init = () => {
    submit();
    deletePost();
    doRenderPostList();
    doRenderPostWithDetailsList();
  };

  return {
    init,
  };
};
