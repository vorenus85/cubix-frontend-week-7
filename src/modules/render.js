import { UIelement } from "./ui.js";

const postTemplate = (id) => {
  return `
    <div class="post-list-item mb-3" id="post-${id}">
      <span class="post-title"></span>
      <span class="post-description"></span>
      <span class="post-id"></span>
      <span class="post-action"></span>
    </div>
  `;
};

export const render = () => {
  const { newPostEl, newPostTitleEl, newPostDescriptionEl } = UIelement;

  const renderNewPost = ({ id, title, body }, el) => {
    newPostTitleEl.innerHTML = title;
    newPostDescriptionEl.innerHTML = body;
    newPostEl.removeAttribute("hidden");
  };

  const renderPost = (
    { id, title, body },
    { showTitle, showDescription, showId, showDelete },
    el,
  ) => {
    const template = document.createElement("template");
    template.innerHTML = postTemplate(id);

    const postEl = template.content.firstElementChild;
    if (showTitle) {
      postEl.querySelector(".post-title").textContent = title;
    }
    if (showDescription) {
      postEl.querySelector(".post-description").textContent = " - " + body;
    }
    if (showId) {
      postEl.querySelector(".post-id").textContent = `(${id})`;
    }
    if (showDelete) {
      const actionEl = postEl.querySelector(".post-action");

      const btn = document.createElement("button");
      btn.className = "delete-post btn btn-danger btn-sm";
      btn.dataset.id = id;
      btn.textContent = "Delete";

      actionEl.appendChild(btn);
    }

    el.appendChild(postEl);
  };

  const renderPostList = (
    list,
    { showTitle, showDescription, showId, showDelete },
    el,
  ) => {
    list.forEach((element) => {
      renderPost(
        { id: element.id, title: element.title, body: element.body },
        { showTitle, showDescription, showId, showDelete },
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
