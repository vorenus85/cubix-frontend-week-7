import { UIelement } from "./ui.js";

export const useRender = () => {
  const { newPostEl, newPostTitleEl, newPostDescriptionEl } = UIelement;

  const renderNewPost = ({ id, title, body }, el) => {
    newPostTitleEl.innerHTML = title;
    newPostDescriptionEl.innerHTML = body;
    newPostEl.removeAttribute("hidden");
  };

  const renderPost = ({ id, title, body }, el) => {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="post-list-item mb-3" id="post-${id}">
      <div class="post-title"></div>
      <div class="post-body"></div>
    </div>
  `;

    const postEl = template.content.firstElementChild;
    postEl.querySelector(".post-title").textContent = title;
    postEl.querySelector(".post-body").textContent = body;

    el.appendChild(postEl);
  };

  const renderPostList = (list, el) => {
    list.forEach((element) => {
      renderPost(
        { id: element.id, title: element.title, body: element.body },
        el,
      );
    });
  };

  return {
    renderNewPost,
    renderPost,
    renderPostList,
  };
};
