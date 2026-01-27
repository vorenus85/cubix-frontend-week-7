export const useService = () => {
  const createPostService = async ({ title, body }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return await response.json();
  };

  const updatePostService = async ({ id, title, body }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title,
          body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );

    return await response.json();
  };

  const listPostsService = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    return await response.json();
  };

  return {
    createPostService,
    updatePostService,
    listPostsService,
  };
};
